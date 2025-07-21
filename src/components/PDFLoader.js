// components/PdfLoader.js

'use client'; // This is a client component

import dynamic from 'next/dynamic';

// Dynamically import the PDFViewer component with SSR disabled
const PDFViewer = dynamic(() => import('@/components/PdfViewer_bak'), {
  ssr: false,
  loading: () => <p style={{ padding: '20px' }}>Loading PDF viewer...</p>,
});

// This component simply passes the 'fileUrl' prop to the dynamically imported PDFViewer
export default function PdfLoader({ fileUrl }) {
  return <PDFViewer fileUrl={fileUrl} />;
}