import Image from "next/image";

// /app/page.js (or whatever your page is)

// ✅ CRITICAL: Make sure you import the DYNAMIC wrapper.
import DynamicPdfViewer from '@/components/DynamicPdfViewer';

export default function MyPage() {
  return (
    <main>
      <h1>My Document</h1>
      
      {/* Use the dynamic loader component here */}
      <DynamicPdfViewer fileUrl="/latex/main.pdf" />
    </main>
  );
}