"use client";

import { PDFViewer, ResumeDocument } from "@/components/pdf";
import type { ResumeData } from "@/components/pdf";
import pdfJson from "@/resources/resume-pdf-data.json";

const resumeData: ResumeData = {
  person: {
    name: pdfJson.person.name,
    role: pdfJson.person.role,
    email: pdfJson.person.email,
    location: pdfJson.person.location,
    avatar: pdfJson.person.avatar
      ? `${typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}${pdfJson.person.avatar}`
      : undefined,
  },
  social: pdfJson.social,
  intro: {
    show_pdf: pdfJson.intro.show,
    show_site: false,
    text: pdfJson.intro.text,
  },
  skills: {
    show_pdf: pdfJson.skills.show,
    show_site: false,
    items: pdfJson.skills.items,
  },
  work: {
    show_pdf: pdfJson.work.show,
    show_site: false,
    items: pdfJson.work.items,
  },
  education: {
    show_pdf: pdfJson.education.show,
    show_site: false,
    items: pdfJson.education.items,
  },
  languages: {
    show_pdf: pdfJson.languages.show,
    show_site: false,
    items: pdfJson.languages.items,
  },
  softSkills: {
    show_pdf: pdfJson.softSkills.show,
    show_site: false,
    items: pdfJson.softSkills.items,
  },
};

export default function ResumePage() {
  return (
    <PDFViewer
      style={{
        width: "100vw",
        height: "100vh",
        border: "none",
        margin: 0,
        padding: 0,
      }}
    >
      <ResumeDocument resume={resumeData} />
    </PDFViewer>
  );
}
