"use client";

import { Printer } from "lucide-react";
import Link from "next/link";

export function GraphPaper() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 8mm 10mm; }
          .graph-page-wrapper {
            padding-top: 0 !important;
            background: white !important;
            min-height: auto !important;
          }
          .graph-page-card {
            max-width: none !important;
            margin: 0 !important;
            box-shadow: none !important;
          }
          .graph-page {
            page-break-after: always;
          }
          .graph-page:last-child {
            page-break-after: auto;
          }
        }
      `}} />

      {/* Floating top bar (hidden on print) */}
      <div className="no-print" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px", background: "#3C4146", borderBottom: "3px solid #F2D000" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/" style={{ fontSize: "12px", color: "#9CA3AF", textDecoration: "underline", textUnderlineOffset: "4px" }}>← الرئيسية</Link>
          <Link href="/survey" style={{ fontSize: "12px", color: "#9CA3AF", textDecoration: "underline", textUnderlineOffset: "4px" }}>استمارة الكشف</Link>
        </div>
        <button
          onClick={() => window.print()}
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 20px", fontFamily: "var(--font-cairo), Cairo, sans-serif", fontSize: "13px", fontWeight: 900, border: "2px solid #F2D000", background: "#F2D000", color: "#3C4146", cursor: "pointer", letterSpacing: "0.05em" }}
        >
          <Printer style={{ width: 16, height: 16 }} />
          طباعة
        </button>
      </div>

      {/* Pages shown directly */}
      <div className="graph-page-wrapper" style={{ paddingTop: "52px", background: "#e5e5e5", minHeight: "100vh" }}>
        <div className="graph-page-card" style={{ maxWidth: "210mm", margin: "0 auto", background: "white", boxShadow: "0 2px 20px rgba(0,0,0,0.15)" }}>
          <DimensionsPage />
        </div>
        <div className="no-print" style={{ height: "24px" }} />
        <div className="graph-page-card" style={{ maxWidth: "210mm", margin: "0 auto", background: "white", boxShadow: "0 2px 20px rgba(0,0,0,0.15)" }}>
          <GraphPage pageNum={2} />
        </div>
        <div className="no-print" style={{ height: "24px" }} />
      </div>
    </>
  );
}

/** Page 1: Dimensions — stove/sink fields in top third, graph paper in bottom two thirds */
function DimensionsPage() {
  return (
    <div className="graph-page" style={{ fontFamily: "var(--font-cairo), Cairo, sans-serif", display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header */}
      <div
        dir="rtl"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "8px",
          borderBottom: "2px solid #F2D000",
          marginBottom: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <GraphLogo />
          <span style={{ fontSize: "9pt", color: "#6B7280", fontWeight: 600 }}>القياسات</span>
        </div>
        <span style={{ fontSize: "9pt", color: "#6B7280" }}>صفحة 1</span>
      </div>

      {/* Dimensions fields area — top third */}
      <div dir="rtl" style={{ marginBottom: "4px" }}>
        {/* Stove & Sink side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "6px" }}>
          {/* Stove column */}
          <div style={{ border: "2px solid #3C4146", overflow: "hidden" }}>
            <div style={{ height: "3px", background: "#F2D000" }} />
            <div style={{ padding: "10px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", paddingBottom: "6px", borderBottom: "2px solid rgba(60,65,70,0.1)" }}>
                <div style={{ width: "24px", height: "24px", border: "2px solid #3C4146", background: "rgba(242,208,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3C4146" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" /></svg>
                </div>
                <span style={{ fontSize: "10pt", fontWeight: 900, color: "#3C4146" }}>الطباخ</span>
              </div>
              <DimField label="سنتر الطباخ" />
              <DimField label="قياس الطباخ (سم)" />
            </div>
          </div>

          {/* Sink column */}
          <div style={{ border: "2px solid #3C4146", overflow: "hidden" }}>
            <div style={{ height: "3px", background: "#F2D000" }} />
            <div style={{ padding: "10px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", paddingBottom: "6px", borderBottom: "2px solid rgba(60,65,70,0.1)" }}>
                <div style={{ width: "24px", height: "24px", border: "2px solid #3C4146", background: "rgba(242,208,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3C4146" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" /><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" /></svg>
                </div>
                <span style={{ fontSize: "10pt", fontWeight: 900, color: "#3C4146" }}>الحوض</span>
              </div>
              <DimField label="سنتر الحوض" />
              <DimField label="قياس الحوض (سم)" />
            </div>
          </div>
        </div>

        {/* Kitchen Height & Annex Height side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "6px" }}>
          {/* Kitchen Height */}
          <div style={{ border: "2px solid #3C4146", overflow: "hidden" }}>
            <div style={{ height: "3px", background: "#F2D000" }} />
            <div style={{ padding: "10px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", paddingBottom: "6px", borderBottom: "2px solid rgba(60,65,70,0.1)" }}>
                <div style={{ width: "24px", height: "24px", border: "2px solid #3C4146", background: "rgba(242,208,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3C4146" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M2 12h20" /><path d="M17 7l-5-5-5 5" /><path d="M17 17l-5 5-5-5" /></svg>
                </div>
                <span style={{ fontSize: "10pt", fontWeight: 900, color: "#3C4146" }}>ارتفاع المطبخ</span>
              </div>
              <DimField label="ارتفاع المطبخ (سم)" />
            </div>
          </div>

          {/* Annex Height */}
          <div style={{ border: "2px solid #3C4146", overflow: "hidden" }}>
            <div style={{ height: "3px", background: "#F2D000" }} />
            <div style={{ padding: "10px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", paddingBottom: "6px", borderBottom: "2px solid rgba(60,65,70,0.1)" }}>
                <div style={{ width: "24px", height: "24px", border: "2px solid #3C4146", background: "rgba(242,208,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3C4146" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M2 12h20" /><path d="M17 7l-5-5-5 5" /><path d="M17 17l-5 5-5-5" /></svg>
                </div>
                <span style={{ fontSize: "10pt", fontWeight: 900, color: "#3C4146" }}>ارتفاع الملحق</span>
              </div>
              <div style={{ display: "flex", gap: "16px", padding: "5px 0", flexWrap: "wrap" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "9pt" }}>
                  <span style={{ fontSize: "12pt", lineHeight: 1 }}>☐</span> الى السقف
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "9pt" }}>
                  <span style={{ fontSize: "12pt", lineHeight: 1 }}>☐</span> دبل ملحق
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "9pt" }}>
                  <span style={{ fontSize: "12pt", lineHeight: 1 }}>☐</span> ستاندارد
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes line spanning full width */}
        <div style={{ display: "flex", gap: "8px", padding: "4px 0", borderBottom: "1.5px solid #C8C0B4", minHeight: "24px" }}>
          <span style={{ fontWeight: 700, color: "#6B7280", whiteSpace: "nowrap", fontSize: "9pt" }}>ملاحظات:</span>
        </div>
      </div>

      {/* Grid area */}
      <div style={{ position: "relative" }}>
        <svg
          width="100%"
          viewBox="-0.6 -0.6 721.2 721.2"
          preserveAspectRatio="xMidYMid meet"
          style={{ display: "block" }}
        >
          <defs>
            <pattern id="small-grid-1" width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M 18 0 L 0 0 0 18" fill="none" stroke="#7B8794" strokeWidth="0.7" />
            </pattern>
            <pattern id="major-grid-1" width="90" height="90" patternUnits="userSpaceOnUse">
              <rect width="90" height="90" fill="url(#small-grid-1)" />
              <path d="M 90 0 L 0 0 0 90" fill="none" stroke="#4B5563" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="720" height="720" fill="url(#major-grid-1)" />
          <line x1="720" y1="0" x2="720" y2="720" stroke="#4B5563" strokeWidth="1.2" />
          <line x1="0" y1="720" x2="720" y2="720" stroke="#4B5563" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Footer */}
      <div
        dir="rtl"
        style={{
          marginTop: "6px",
          borderTop: "1px solid #F2D000",
          paddingTop: "4px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "7pt", color: "#9CA3AF" }}>الاسم: ____________________ التاريخ: ____________</span>
        <span dir="ltr" style={{ fontSize: "7pt", color: "#9CA3AF", letterSpacing: "0.1em", fontWeight: 700 }}>AHMED DECOR</span>
      </div>
    </div>
  );
}

function DimField({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", gap: "6px", padding: "5px 0", borderBottom: "1.5px solid #C8C0B4", minHeight: "26px" }}>
      <span style={{ fontWeight: 700, color: "#6B7280", whiteSpace: "nowrap", fontSize: "9pt" }}>{label}:</span>
    </div>
  );
}

function GraphPage({ pageNum }: { pageNum: number }) {
  return (
    <div className="graph-page" style={{ fontFamily: "var(--font-cairo), Cairo, sans-serif" }}>
      {/* Compact header */}
      <div
        dir="rtl"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "8px",
          borderBottom: "2px solid #F2D000",
          marginBottom: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <GraphLogo />
          <span style={{ fontSize: "9pt", color: "#6B7280", fontWeight: 600 }}>استمارة كشف أولي — ورقة رسم</span>
        </div>
        <span style={{ fontSize: "9pt", color: "#6B7280" }}>صفحة {pageNum}</span>
      </div>

      {/* Grid area */}
      <div style={{ position: "relative" }}>
        <svg
          width="100%"
          viewBox="-0.6 -0.6 721.2 991.2"
          style={{ display: "block" }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Small grid */}
            <pattern id={`small-grid-${pageNum}`} width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M 18 0 L 0 0 0 18" fill="none" stroke="#7B8794" strokeWidth="0.7" />
            </pattern>
            {/* Major grid every 5 cells */}
            <pattern id={`major-grid-${pageNum}`} width="90" height="90" patternUnits="userSpaceOnUse">
              <rect width="90" height="90" fill={`url(#small-grid-${pageNum})`} />
              <path d="M 90 0 L 0 0 0 90" fill="none" stroke="#4B5563" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="720" height="990" fill={`url(#major-grid-${pageNum})`} />
          <line x1="720" y1="0" x2="720" y2="990" stroke="#4B5563" strokeWidth="1.2" />
          <line x1="0" y1="990" x2="720" y2="990" stroke="#4B5563" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Compact footer */}
      <div
        dir="rtl"
        style={{
          marginTop: "6px",
          borderTop: "1px solid #F2D000",
          paddingTop: "4px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "7pt", color: "#9CA3AF" }}>الاسم: ____________________ التاريخ: ____________</span>
        <span dir="ltr" style={{ fontSize: "7pt", color: "#9CA3AF", letterSpacing: "0.1em", fontWeight: 700 }}>AHMED DECOR</span>
      </div>
    </div>
  );
}

function GraphLogo() {
  const text = "AHMED DECOR";
  return (
    <span dir="ltr" style={{ fontWeight: 900, fontSize: "0.75rem", letterSpacing: "0.05em", userSelect: "none" }}>
      {text.split("").map((char, i) =>
        char === " " ? (
          <span key={i} style={{ display: "inline-block", width: "0.2rem" }} />
        ) : (
          <span key={i} style={{ color: char === "E" ? "#F2D000" : "#3C4146" }}>{char}</span>
        )
      )}
    </span>
  );
}
