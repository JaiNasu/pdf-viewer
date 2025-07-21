// /components/PdfViewer.js
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './PDFViewer.css';

// Set the worker source from a CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// A recursive component to render the bookmarks
function Outline({ items, onItemClick }) {
  if (!items || items.length === 0) {
    return <li>No bookmarks found.</li>;
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={`${item.title}-${index}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); onItemClick(item); }}>
            {item.title}
          </a>
          {item.items && item.items.length > 0 && (
            <Outline items={item.items} onItemClick={onItemClick} />
          )}
        </li>
      ))}
    </ul>
  );
}



export default function PDFViewer({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [outline, setOutline] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [scale, setScale] = useState(1.0);
  const [layout, setLayout] = useState('single'); // 'single' or 'double'
  const containerRef = useRef(null);
  const [isColorInverted, setIsColorInverted] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to calculate and update layout and scale
  const updateLayout = useCallback(async () => {
    if (!pdf || !containerRef.current) {
      return;
    }

    const layoutThreshold = 1.9;

    const containerWidth = containerRef.current.offsetWidth;
    const page = await pdf.getPage(1);
    const pageWidth = page.getViewport({ scale: 1 }).width;
    const pageGap = 16;

    if (containerWidth > pageWidth * layoutThreshold + pageGap) {
      setLayout('double');
      setScale((containerWidth - pageGap) / (pageWidth * 2));
    } else {
      setLayout('single');
      setScale(containerWidth / pageWidth);
    }
  }, [pdf]);

  // Update layout on window resize
  useEffect(() => {
    const handleResize = () => {
      setTimeout(updateLayout, 300);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateLayout]);

  const onDocumentLoadSuccess = useCallback(async (pdfProxy) => {
    setPdf(pdfProxy);
    setNumPages(pdfProxy.numPages);
    const outlineData = await pdfProxy.getOutline();
    setOutline(outlineData);
  }, []);
    
  // Call updateLayout when the pdf object is ready
  useEffect(() => {
    if(pdf) {
      updateLayout();
    }
  }, [pdf, updateLayout]);


  const handleBookmarkClick = async (item) => {
    if (!pdf) {
        console.error("PDF object not available.");
        return;
    }

    try {
        let pageIndex = null;

        // The 'dest' property can be a string (named destination) or an array (explicit destination).
        if (typeof item.dest === 'string') {
            // Resolve string destination to an array
            const destArray = await pdf.getDestination(item.dest);
            if (destArray) {
                pageIndex = await pdf.getPageIndex(destArray[0]);
            }
        } else if (Array.isArray(item.dest)) {
            // Resolve array destination
            pageIndex = await pdf.getPageIndex(item.dest[0]);
        }

        if (pageIndex === null) {
            console.error("Could not determine page for bookmark:", item);
            return;
        }

        let pageNumberToFind = pageIndex + 1;

        // Adjust for double page layout
        if (layout === 'double' && pageNumberToFind % 2 === 0) {
            pageNumberToFind -= 1;
        }

        const pageElement = document.getElementById(`page_${pageNumberToFind}`);
        if (pageElement) {
            pageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.error(`Could not find page element for ID: page_${pageNumberToFind}`);
        }
    } catch (error) {
        console.error("Error handling bookmark click:", error);
    }
  };

  const toggleColorInversion = () => {
    setIsColorInverted(prevState => !prevState);
  };


  // Function to render pages based on the current layout
  const renderPages = () => {
    if (!numPages) {
      return null;
    }

    if (layout === 'double') {
      const pagePairs = [];
      for (let i = 1; i <= numPages; i += 2) {
        pagePairs.push(
          <div id={`page_${i}`} key={`page-wrapper_${i}`} className="pdf-page-pair">
            <Page
              pageNumber={i}
              renderAnnotationLayer={true}
              renderTextLayer={true}
              scale={scale}
            />
            {i + 1 <= numPages && (
              <Page
                pageNumber={i + 1}
                renderAnnotationLayer={true}
                renderTextLayer={true}
                scale={scale}
              />
            )}
          </div>
        );
      }
      return pagePairs;
    }

    // Single page layout
    return Array.from(new Array(numPages), (el, index) => (
      <div id={`page_${index + 1}`} key={`page-wrapper_${index + 1}`}>
        <Page
          pageNumber={index + 1}
          renderAnnotationLayer={true}
          renderTextLayer={true}
          scale={scale}
        />
      </div>
    ));
  };


  if (!isClient) {
    return <div>Loading PDF viewer...</div>;
  }

  return (
    <div className={`pdf-viewer-container ${isColorInverted ? 'color-inverted' : ''}`}>
      <aside className="pdf-sidebar">
      <div className="sidebar-controls">
            <button onClick={toggleColorInversion}>
              {isColorInverted ? 'Revert Colors' : 'Invert Colors'}
            </button>
        </div>
        <h4>Bookmarks</h4>
        <Outline items={outline} onItemClick={handleBookmarkClick} />
      </aside>

      <main className="pdf-main-content" ref={containerRef}>
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
          externalLinkTarget="_blank"
        >
          {renderPages()}
        </Document>
      </main>
    </div>
  );
}