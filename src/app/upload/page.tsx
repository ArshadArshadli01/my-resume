"use client";

import { useState, useCallback } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import type { FilePondFile, FilePondErrorDescription } from "filepond";

import "filepond/dist/filepond.min.css";

registerPlugin(FilePondPluginFileValidateType);

/* ─── Types ──────────────────────────────────────────────────────────── */

type PdfResumeJson = {
  person: {
    name: string;
    role: string;
    email: string;
    location: string;
    avatar?: string;
  };
  social: { name: string; link: string }[];
  intro: { show: boolean; text: string };
  skills: {
    show: boolean;
    items: { title: string; description: string }[];
  };
  work: {
    show: boolean;
    items: {
      company: string;
      role: string;
      timeframe: string;
      achievements: string[];
    }[];
  };
  education: {
    show: boolean;
    items: { name: string; description: string }[];
  };
  languages: {
    show: boolean;
    items: { name: string; proficiency: string }[];
  };
  softSkills: { show: boolean; items: string[] };
};

type SectionKey = keyof Omit<PdfResumeJson, "person" | "social">;

const SECTION_META: { key: SectionKey; icon: string; label: string }[] = [
  { key: "intro", icon: "📝", label: "Introduction" },
  { key: "skills", icon: "🛠️", label: "Technical Skills" },
  { key: "work", icon: "💼", label: "Work Experience" },
  { key: "education", icon: "🎓", label: "Education" },
  { key: "languages", icon: "🌐", label: "Languages" },
  { key: "softSkills", icon: "🤝", label: "Soft Skills" },
];

/* ─── Component ──────────────────────────────────────────────────────── */

export default function UploadPage() {
  const [resumeData, setResumeData] = useState<PdfResumeJson | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(),
  );
  const [generating, setGenerating] = useState(false);

  /* ── JSON handler ────────────────────────────────────────────────── */
  const handleJsonLoad = useCallback(
    (_err: FilePondErrorDescription | null, file: FilePondFile) => {
      if (_err) return;
      const actualFile = file.file as File;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const json = JSON.parse(text);
          if (!json.person || !json.person.name) {
            alert("Invalid resume JSON: missing 'person.name' field.");
            return;
          }
          setResumeData(json as PdfResumeJson);
          setExpandedSections(new Set());
        } catch {
          alert("Invalid JSON file. Please check the file format and try again.");
        }
      };
      reader.readAsText(actualFile);
    },
    [],
  );

  /* ── Toggle helpers ──────────────────────────────────────────────── */
  const toggleSection = (key: SectionKey) => {
    if (!resumeData) return;
    setResumeData((prev) => {
      if (!prev) return prev;
      const section = prev[key];
      return { ...prev, [key]: { ...section, show: !section.show } };
    });
  };

  const toggleExpand = (key: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  /* ── Generate PDF ──────────────────────────────────────────────────── */
  const handleGenerate = () => {
    if (!resumeData) return;
    setGenerating(true);
    try {
      sessionStorage.setItem("__resume_pdf_data", JSON.stringify(resumeData));
      window.open("/resume/generate", "_blank");
    } catch {
      alert("Failed to store resume data. The JSON may be too large.");
    } finally {
      setGenerating(false);
    }
  };

  /* ── Download JSON ─────────────────────────────────────────────────── */
  const handleDownload = () => {
    if (!resumeData) return;
    const blob = new Blob([JSON.stringify(resumeData, null, 4)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume-pdf-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="upload-page">
      <style>{pageStyles}</style>

      <h1 className="up-heading">📄 Resume PDF Generator</h1>
      <p className="up-subtitle">
        Upload your <strong>resume-pdf-data.json</strong> to preview, customize
        sections, and generate a PDF resume. The avatar is read from the JSON.
        {" "}
        <a
          href="/sample-pdf-data.json"
          download="sample-pdf-data.json"
          className="up-sample-link"
        >
          ⬇ Download sample JSON
        </a>
      </p>

      {/* ── Upload Area ──────────────────────────────────────────── */}
      <div className="up-upload-card">
        <h3 className="up-upload-label">📋 Upload Resume JSON</h3>
        <FilePond
          allowMultiple={false}
          acceptedFileTypes={["application/json", ".json"]}
          fileValidateTypeDetectType={(source, type) =>
            new Promise((resolve) => {
              if (
                type === "application/json" ||
                (source instanceof File && source.name.endsWith(".json"))
              ) {
                resolve("application/json");
              } else {
                resolve(type);
              }
            })
          }
          labelIdle='Drag & Drop your <strong>resume JSON</strong> or <span class="filepond--label-action">Browse</span>'
          onaddfile={handleJsonLoad}
          onremovefile={() => setResumeData(null)}
          credits={false}
        />
      </div>

      {/* ── All Sections ─────────────────────────────────────────── */}
      {resumeData && (
        <>
          {/* ── Person Info ──────────────────────────────────────── */}
          <CollapsibleCard
            title="👤 Person"
            expanded={expandedSections.has("person")}
            onToggle={() => toggleExpand("person")}
          >
            <div className="up-person-top">
              {resumeData.person.avatar && (
                <img
                  src={resumeData.person.avatar}
                  alt="Avatar"
                  className="up-avatar-img"
                />
              )}
              <div className="up-info-grid">
                <InfoRow label="Name" value={resumeData.person.name} />
                <InfoRow label="Role" value={resumeData.person.role} />
                <InfoRow label="Email" value={resumeData.person.email} />
                <InfoRow label="Location" value={resumeData.person.location || "—"} />
              </div>
            </div>
          </CollapsibleCard>

          {/* ── Social Links ─────────────────────────────────────── */}
          <CollapsibleCard
            title="🔗 Social Links"
            badge={`${resumeData.social.length}`}
            expanded={expandedSections.has("social")}
            onToggle={() => toggleExpand("social")}
          >
            <div className="up-social-list">
              {resumeData.social.map((s, i) => (
                <a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="up-social-item"
                >
                  <span className="up-social-name">{s.name}</span>
                  <span className="up-social-link">↗</span>
                </a>
              ))}
            </div>
          </CollapsibleCard>

          {/* ── Toggleable Sections ──────────────────────────────── */}
          {SECTION_META.map(({ key, icon, label }) => {
            const section = resumeData[key];
            const expanded = expandedSections.has(key);

            return (
              <CollapsibleCard
                key={key}
                title={`${icon} ${label}`}
                expanded={expanded}
                onToggle={() => toggleExpand(key)}
                showToggle
                visible={section.show}
                onVisibilityToggle={() => toggleSection(key)}
              >
                <SectionContent sectionKey={key} data={resumeData} />
              </CollapsibleCard>
            );
          })}

          {/* ── Actions ──────────────────────────────────────────── */}
          <div className="up-actions-row">
            <button
              type="button"
              className="up-btn up-btn-primary"
              onClick={handleGenerate}
              disabled={generating}
            >
              {generating ? "⏳ Generating..." : "🚀 Generate PDF"}
            </button>
            <button
              type="button"
              className="up-btn up-btn-secondary"
              onClick={handleDownload}
            >
              ⬇ Download JSON
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Collapsible Card ───────────────────────────────────────────────── */

function CollapsibleCard({
  title,
  badge,
  expanded,
  onToggle,
  showToggle,
  visible,
  onVisibilityToggle,
  children,
}: {
  title: string;
  badge?: string;
  expanded: boolean;
  onToggle: () => void;
  showToggle?: boolean;
  visible?: boolean;
  onVisibilityToggle?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className={`up-card ${showToggle && !visible ? "up-card-hidden" : ""}`}>
      <div className="up-card-header" onClick={onToggle}>
        <div className="up-card-title-row">
          <span className="up-card-chevron">{expanded ? "▼" : "▶"}</span>
          <span className="up-card-title">{title}</span>
          {badge && <span className="up-card-badge">{badge}</span>}
        </div>
        <div className="up-card-actions" onClick={(e) => e.stopPropagation()}>
          {showToggle && onVisibilityToggle && (
            <button
              type="button"
              className={`up-vis-btn ${visible ? "up-vis-on" : "up-vis-off"}`}
              onClick={onVisibilityToggle}
            >
              {visible ? "✓ Visible" : "✗ Hidden"}
            </button>
          )}
        </div>
      </div>
      {expanded && <div className="up-card-body">{children}</div>}
    </div>
  );
}

/* ─── Info Row ───────────────────────────────────────────────────────── */

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="up-info-row">
      <span className="up-info-label">{label}</span>
      <span className="up-info-value">{value}</span>
    </div>
  );
}

/* ─── Section Content Renderers ──────────────────────────────────────── */

function SectionContent({
  sectionKey,
  data,
}: {
  sectionKey: SectionKey;
  data: PdfResumeJson;
}) {
  switch (sectionKey) {
    case "intro":
      return <p className="up-text-block">{data.intro.text}</p>;

    case "skills":
      return (
        <div className="up-skills-grid">
          {data.skills.items.map((s, i) => (
            <div key={i} className="up-skill-item">
              <strong>{s.title}</strong>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      );

    case "work":
      return (
        <div className="up-work-list">
          {data.work.items.map((w, i) => (
            <div key={i} className="up-work-item">
              <div className="up-work-header">
                <strong>{w.company}</strong>
                <span className="up-work-meta">
                  {w.role} · {w.timeframe}
                </span>
              </div>
              <ul className="up-work-achievements">
                {w.achievements.map((a, j) => (
                  <li key={j}>{a}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case "education":
      return (
        <div className="up-edu-list">
          {data.education.items.map((e, i) => (
            <div key={i} className="up-edu-item">
              <strong>{e.name}</strong>
              <p>{e.description}</p>
            </div>
          ))}
        </div>
      );

    case "languages":
      return (
        <div className="up-lang-list">
          {data.languages.items.map((l, i) => (
            <div key={i} className="up-lang-item">
              <strong>{l.name}</strong>
              <span>{l.proficiency}</span>
            </div>
          ))}
        </div>
      );

    case "softSkills":
      return (
        <div className="up-tags">
          {data.softSkills.items.map((s, i) => (
            <span key={i} className="up-tag">
              {s}
            </span>
          ))}
        </div>
      );

    default:
      return null;
  }
}

/* ─── Styles ─────────────────────────────────────────────────────────── */

const pageStyles = `
  .upload-page {
    --up-bg: #0a0a0f;
    --up-surface: rgba(255,255,255,0.04);
    --up-surface-hover: rgba(255,255,255,0.07);
    --up-border: rgba(255,255,255,0.08);
    --up-text: #e2e8f0;
    --up-text-muted: #94a3b8;
    --up-text-dim: #64748b;
    --up-accent: #7c3aed;
    --up-accent-light: #a78bfa;
    --up-accent-bg: rgba(124,58,237,0.12);
    --up-accent-border: rgba(124,58,237,0.3);

    max-width: 900px;
    margin: 0 auto;
    padding: 48px 24px 96px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: var(--up-text);
  }

  /* ── Light mode overrides ─────────────────────────────────── */
  [data-theme="light"] .upload-page {
    --up-bg: #f8fafc;
    --up-surface: rgba(0,0,0,0.03);
    --up-surface-hover: rgba(0,0,0,0.06);
    --up-border: rgba(0,0,0,0.1);
    --up-text: #1e293b;
    --up-text-muted: #475569;
    --up-text-dim: #94a3b8;
    --up-accent: #7c3aed;
    --up-accent-light: #6d28d9;
    --up-accent-bg: rgba(124,58,237,0.08);
    --up-accent-border: rgba(124,58,237,0.2);
  }



  .up-heading {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 8px;
    background: linear-gradient(135deg, var(--up-accent-light), var(--up-accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .up-subtitle {
    font-size: 15px;
    color: var(--up-text-muted);
    margin-bottom: 32px;
    line-height: 1.6;
  }
  .up-sample-link {
    color: var(--up-accent-light);
    text-decoration: underline;
    font-weight: 600;
    font-size: 14px;
  }
  .up-sample-link:hover {
    color: #c4b5fd;
  }

  /* ── Upload Card ────────────────────────────────────────── */
  .up-upload-card {
    background: var(--up-surface);
    border: 1px solid var(--up-border);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 32px;
  }
  .up-upload-label {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    color: var(--up-text);
  }

  /* ── Person Top (avatar + grid) ─────────────────────────── */
  .up-person-top {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    padding-top: 14px;
  }
  .up-avatar-img {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--up-accent-border);
    flex-shrink: 0;
  }

  /* ── Collapsible Card ───────────────────────────────────── */
  .up-card {
    background: var(--up-surface);
    border: 1px solid var(--up-border);
    border-radius: 12px;
    margin-bottom: 12px;
    overflow: hidden;
    transition: opacity 0.2s ease;
  }
  .up-card-hidden { opacity: 0.5; }
  .up-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 20px;
    cursor: pointer;
    user-select: none;
    transition: background 0.15s ease;
  }
  .up-card-header:hover { background: var(--up-surface-hover); }
  .up-card-title-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .up-card-chevron {
    font-size: 10px;
    color: var(--up-text-dim);
    width: 16px;
  }
  .up-card-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--up-text);
  }
  .up-card-badge {
    font-size: 11px;
    font-weight: 700;
    background: var(--up-accent-bg);
    color: var(--up-accent-light);
    padding: 2px 8px;
    border-radius: 99px;
  }
  .up-card-actions {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .up-card-body {
    padding: 0 20px 16px;
    border-top: 1px solid var(--up-border);
  }

  /* ── Visibility Toggle ──────────────────────────────────── */
  .up-vis-btn {
    padding: 5px 14px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
    border: 1px solid;
  }
  .up-vis-on {
    background: var(--up-accent-bg);
    color: var(--up-accent-light);
    border-color: var(--up-accent-border);
  }
  .up-vis-off {
    background: transparent;
    color: var(--up-text-dim);
    border-color: var(--up-border);
  }

  /* ── Info Grid ──────────────────────────────────────────── */
  .up-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    flex: 1;
  }
  @media (max-width: 640px) {
    .up-info-grid { grid-template-columns: 1fr; }
    .up-person-top { flex-direction: column; align-items: center; }
  }
  .up-info-row {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .up-info-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--up-text-dim);
  }
  .up-info-value {
    font-size: 14px;
    color: var(--up-text);
  }

  /* ── Social ─────────────────────────────────────────────── */
  .up-social-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-top: 14px;
  }
  .up-social-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    border-radius: 8px;
    background: var(--up-surface);
    border: 1px solid var(--up-border);
    text-decoration: none;
    color: var(--up-text);
    font-size: 13px;
    transition: background 0.15s ease;
  }
  .up-social-item:hover { background: var(--up-surface-hover); }
  .up-social-link {
    color: var(--up-accent-light);
    font-size: 14px;
  }

  /* ── Intro ──────────────────────────────────────────────── */
  .up-text-block {
    font-size: 14px;
    line-height: 1.7;
    color: var(--up-text-muted);
    padding-top: 14px;
    margin: 0;
  }

  /* ── Skills Grid ────────────────────────────────────────── */
  .up-skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding-top: 14px;
  }
  @media (max-width: 640px) {
    .up-skills-grid { grid-template-columns: 1fr; }
  }
  .up-skill-item {
    padding: 10px 14px;
    border-radius: 8px;
    background: var(--up-surface);
    border: 1px solid var(--up-border);
    font-size: 13px;
  }
  .up-skill-item strong { color: var(--up-text); font-size: 13px; }
  .up-skill-item p {
    margin: 4px 0 0;
    color: var(--up-text-muted);
    font-size: 12px;
    line-height: 1.5;
  }

  /* ── Work ────────────────────────────────────────────────── */
  .up-work-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-top: 14px;
  }
  .up-work-item {
    padding: 14px 16px;
    border-radius: 10px;
    background: var(--up-surface);
    border: 1px solid var(--up-border);
  }
  .up-work-header {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 8px;
  }
  .up-work-header strong { font-size: 14px; color: var(--up-text); }
  .up-work-meta {
    font-size: 12px;
    color: var(--up-accent-light);
    font-weight: 500;
  }
  .up-work-achievements {
    margin: 0;
    padding-left: 18px;
    font-size: 12px;
    line-height: 1.6;
    color: var(--up-text-muted);
  }
  .up-work-achievements li { margin-bottom: 4px; }

  /* ── Education ──────────────────────────────────────────── */
  .up-edu-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 14px;
  }
  .up-edu-item {
    padding: 10px 14px;
    border-radius: 8px;
    background: var(--up-surface);
    border: 1px solid var(--up-border);
  }
  .up-edu-item strong { font-size: 13px; color: var(--up-text); }
  .up-edu-item p {
    margin: 4px 0 0;
    font-size: 12px;
    color: var(--up-text-muted);
  }

  /* ── Languages ──────────────────────────────────────────── */
  .up-lang-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 14px;
  }
  .up-lang-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 14px;
    border-radius: 8px;
    background: var(--up-surface);
    border: 1px solid var(--up-border);
    font-size: 13px;
  }
  .up-lang-item strong { color: var(--up-text); }
  .up-lang-item span { color: var(--up-text-muted); font-size: 12px; }

  /* ── Tags ────────────────────────────────────────────────── */
  .up-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding-top: 14px;
  }
  .up-tag {
    padding: 6px 14px;
    border-radius: 99px;
    background: var(--up-accent-bg);
    color: var(--up-accent-light);
    font-size: 13px;
    font-weight: 500;
    border: 1px solid var(--up-accent-border);
  }

  /* ── Actions ─────────────────────────────────────────────── */
  .up-actions-row {
    display: flex;
    gap: 16px;
    margin-top: 32px;
  }
  @media (max-width: 640px) {
    .up-actions-row { flex-direction: column; }
  }
  .up-btn {
    flex: 1;
    padding: 16px 24px;
    font-size: 16px;
    font-weight: 700;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    border: none;
  }
  .up-btn:hover { transform: translateY(-1px); }
  .up-btn:active { transform: translateY(0); }
  .up-btn-primary {
    background: linear-gradient(135deg, var(--up-accent), #6d28d9);
    color: #fff;
    box-shadow: 0 4px 24px rgba(124,58,237,0.3);
  }
  .up-btn-secondary {
    background: var(--up-surface);
    color: var(--up-accent-light);
    border: 1px solid var(--up-accent-border);
  }
  .up-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  /* ── FilePond overrides ─────────────────────────────────── */
  .upload-page .filepond--root { font-family: inherit; }
  .upload-page .filepond--panel-root {
    background: var(--up-surface) !important;
    border: 1px dashed var(--up-border) !important;
    border-radius: 10px !important;
  }
  .upload-page .filepond--drop-label {
    color: var(--up-text-muted) !important;
    font-size: 13px !important;
  }
  .upload-page .filepond--label-action {
    color: var(--up-accent-light) !important;
    text-decoration: underline !important;
  }
  .upload-page .filepond--item-panel {
    background: var(--up-accent) !important;
    border-radius: 8px !important;
  }

  /* ── Light mode FilePond + button overrides ─────────────── */
  [data-theme="light"] .upload-page .filepond--drop-label {
    color: var(--up-text-muted) !important;
  }
  [data-theme="light"] .upload-page .filepond--panel-root {
    background: var(--up-surface) !important;
    border-color: var(--up-border) !important;
  }
  [data-theme="light"] .up-btn-primary {
    box-shadow: 0 4px 24px rgba(124,58,237,0.18);
  }
  [data-theme="light"] .up-btn-secondary {
    color: var(--up-accent);
  }
  [data-theme="light"] .up-heading {
    background: linear-gradient(135deg, #7c3aed, #4f46e5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
