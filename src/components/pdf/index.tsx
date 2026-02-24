"use client";
import dynamic from "next/dynamic";
import { Font } from "@react-pdf/renderer";

Font.register({
  family: "Ubuntu",
  fonts: [
    {
      fontStyle: "normal",
      fontWeight: 400,
      src: "https://fonts.gstatic.com/s/ubuntu/v20/4iCs6KVjbNBYlgo6eA.ttf",
    },
    {
      fontStyle: "italic",
      fontWeight: 400,
      src: "https://fonts.gstatic.com/s/ubuntu/v20/4iCu6KVjbNBYlgoKeg7z.ttf",
    },
    {
      fontStyle: "normal",
      fontWeight: 700,
      src: "https://fonts.gstatic.com/s/ubuntu/v20/4iCv6KVjbNBYlgoCxCvTtw.ttf",
    },
  ],
});

export { ResumeDocument } from "./resume/document";
export type { ResumeData } from "./resume/document";

function LoadingScreen() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: "#0a0a0a",
        gap: 24,
      }}
    >
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .pdf-loader-ring {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 3px solid rgba(124, 58, 237, 0.15);
          border-top-color: #7c3aed;
          animation: spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .pdf-loader-glow {
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%);
          animation: pulse 2s ease-in-out infinite;
        }
        .pdf-loader-text {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.5px;
          background: linear-gradient(90deg, #64748b, #a78bfa, #7c3aed, #a78bfa, #64748b);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 2.5s linear infinite;
        }
        .pdf-loader-bar {
          width: 120px;
          height: 3px;
          border-radius: 4px;
          background: rgba(124, 58, 237, 0.1);
          overflow: hidden;
          position: relative;
        }
        .pdf-loader-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: -40%;
          width: 40%;
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(90deg, transparent, #7c3aed, transparent);
          animation: shimmer 1.5s ease-in-out infinite;
        }
      `}</style>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="pdf-loader-glow" />
        <div className="pdf-loader-ring" />
      </div>
      <div className="pdf-loader-text">Generating Resume...</div>
      <div className="pdf-loader-bar" />
    </div>
  );
}

export const PDFViewer = dynamic(() => import("@react-pdf/renderer").then((m) => m.PDFViewer), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((m) => m.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  },
);
