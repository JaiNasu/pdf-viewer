// /components/PDFViewer.js

'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
// Correct path
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure the worker to load PDF files.
// This is essential for react-pdf to work.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function goToPrevPage() {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  }

  function goToNextPage() {
    setPageNumber((prevPageNumber) =>
      Math.min(prevPageNumber + 1, numPages)
    );
  }

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
        <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
          Prev
        </button>
        <p style={{ margin: '0 1rem' }}>
          Page {pageNumber} of {numPages}
        </p>
        <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
          Next
        </button>
      </nav>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    </div>
  );
}