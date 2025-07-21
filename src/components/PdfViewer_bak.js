// /components/PDFViewer.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './PDFViewer.css'; // Import the new styles

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
          {/* If the item has nested bookmarks, render them recursively */}
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

  // Ensure the component only renders on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // When the document loads, get the page count and the outline
  const onDocumentLoadSuccess = useCallback(async (pdfProxy) => {
    setPdf(pdfProxy);
    setNumPages(pdfProxy.numPages);
    const outlineData = await pdfProxy.getOutline();
    setOutline(outlineData);
  }, []);

  // When a bookmark is clicked, scroll to that page
  const handleBookmarkClick = async (item) => {
    if (!pdf) return;

    // The 'dest' property can be a string or an array. We resolve it to a page index.
    const pageIndex = Array.isArray(item.dest)
      ? await pdf.getPageIndex(item.dest[0])
      : item.pageNumber - 1; // Fallback for simple outlines

    const pageNumber = pageIndex + 1;

    // Find the page element and scroll to it
    const pageElement = document.getElementById(`page_${pageNumber}`);
    if (pageElement) {
      pageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Avoid SSR issues by showing a loader
  if (!isClient) {
    return <div>Loading PDF viewer...</div>;
  }

  return (
    <div className="pdf-viewer-container">
      {/* Sidebar for bookmarks */}
      <aside className="pdf-sidebar">
        <h4>Bookmarks</h4>
        <Outline items={outline} onItemClick={handleBookmarkClick} />
      </aside>

      {/* Main content for scrolling through PDF pages */}
      <main className="pdf-main-content">
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <div id={`page_${index + 1}`} key={`page-wrapper_${index + 1}`}>
              <Page
                pageNumber={index + 1}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </div>
          ))}
        </Document>
      </main>
    </div>
  );
}