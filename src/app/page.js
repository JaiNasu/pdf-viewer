import Image from "next/image";

// /app/view-pdf/page.jsx

import PDFViewer from '@/components/PDFViewer';

export default function ViewPDFPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        PDF
        </h1>
      
      {/* The fileUrl points to the PDF in the /public folder */}
      <PdfViewer fileUrl="/pdf/main.pdf" />
    </main>
  );
}