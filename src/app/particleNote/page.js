'use client';

// /app/page.js


import Image from "next/image";
import dynamic from 'next/dynamic';

// Dynamically import the PDFViewer with SSR turned off
const PDFViewer = dynamic(() => import('../../components/PdfViewer'), {
  ssr: false,
});

export default function Home() {
  const pdfFile = '/latex/particle-note/main.pdf'; // Make sure this PDF is in your /public directory

  return (
    <main>
      <h1 style={{ textAlign: 'center' }}>Continuous PDF Viewer</h1>
      <PDFViewer fileUrl={pdfFile} />
    </main>
  );
}