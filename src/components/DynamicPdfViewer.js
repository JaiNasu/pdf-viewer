// /components/DynamicPdfViewer.js

'use client'; // ✅ CRITICAL: This must be the first line.

import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('@/components/PdfViewer'), {
    ssr: false, // ✅ CRITICAL: This disables server-side rendering for the component.
});

export default PdfViewer;