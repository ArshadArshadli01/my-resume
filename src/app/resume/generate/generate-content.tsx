"use client";

import { useEffect, useState } from "react";
import { PDFViewer, ResumeDocument } from "@/components/pdf";
import type { ResumeData } from "@/components/pdf";

export default function GeneratePdfContent() {
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const raw = sessionStorage.getItem("__resume_pdf_data");
            if (!raw) {
                setError(
                    "No resume data found. Please go to /upload and upload your files first.",
                );
                return;
            }

            const json = JSON.parse(raw);

            const data: ResumeData = {
                person: {
                    name: json.person?.name ?? "",
                    role: json.person?.role ?? "",
                    email: json.person?.email ?? "",
                    location: json.person?.location ?? "",
                    avatar: json.person?.avatar || undefined,
                },
                social: (json.social ?? []).map(
                    (s: { name: string; link: string }) => ({
                        name: s.name,
                        link: s.link,
                    }),
                ),
                intro: {
                    show_pdf: json.intro?.show ?? true,
                    show_site: false,
                    text: json.intro?.text ?? "",
                },
                skills: {
                    show_pdf: json.skills?.show ?? true,
                    show_site: false,
                    items: json.skills?.items ?? [],
                },
                work: {
                    show_pdf: json.work?.show ?? true,
                    show_site: false,
                    items: json.work?.items ?? [],
                },
                education: {
                    show_pdf: json.education?.show ?? true,
                    show_site: false,
                    items: json.education?.items ?? [],
                },
                languages: {
                    show_pdf: json.languages?.show ?? true,
                    show_site: false,
                    items: json.languages?.items ?? [],
                },
                softSkills: {
                    show_pdf: json.softSkills?.show ?? true,
                    show_site: false,
                    items: json.softSkills?.items ?? [],
                },
            };

            setResumeData(data);
        } catch {
            setError("Failed to parse resume data from session.");
        }
    }, []);

    if (error) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                    color: "#e2e8f0",
                    fontFamily: "sans-serif",
                    gap: 16,
                    backgroundColor: "#0a0a0a",
                }}
            >
                <h2 style={{ color: "#f87171" }}>⚠ {error}</h2>
                <a
                    href="/upload"
                    style={{
                        color: "#a78bfa",
                        textDecoration: "underline",
                        fontSize: 16,
                    }}
                >
                    ← Go to Upload Page
                </a>
            </div>
        );
    }

    if (!resumeData) return null;

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
