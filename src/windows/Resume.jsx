import React, { useState } from "react";
import WindowWrapper from "../hoc/WindowWrapper";
import { Download } from "lucide-react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Resume = () => {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col border border-gray-700 shadow-2xl bg-[#1c1c1e] text-white w-full h-full">

      {/* Top Bar */}
      <div className="flex items-end px-4 py-2 bg-[#2c2c2e] border-b border-gray-700">
        <a
          href="/Jayanta_Chungkrang_Resume.pdf"
          download="Jayanta_Chungkrang_Resume.pdf"
          className="px-3 py-1 rounded-lg bg-[#3a3a3c] hover:bg-[#4a4a4c] cursor-pointer flex items-center gap-2"
        >
          <span>Download Resume</span>
          <Download size={18} />
        </a>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto flex justify-center">
        <div className="py-6 flex justify-center">
          <Document
            file="/Jayanta_Chungkrang_Resume.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              pageNumber={1}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              width={750}  
            />
          </Document>
        </div>
      </div>

    </div>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
