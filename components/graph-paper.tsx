"use client";

import { Printer, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";

export function GraphPaper() {
  return (
    <>
      {/* ====== SCREEN VIEW ====== */}
      <div className="no-print min-h-screen bg-cream">
        <div className="fixed inset-0 pointer-events-none opacity-[0.06]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#3C4146" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-grid)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Logo size="lg" className="justify-center mb-4" />
            <div className="inline-block bg-charcoal text-gold px-8 py-3 border-2 border-charcoal shadow-[3px_3px_0px_#F2D000]">
              <span className="text-sm font-black uppercase tracking-[0.2em]">ورقة رسم</span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="relative bg-card border-2 border-charcoal shadow-[4px_4px_0px_#3C4146] overflow-hidden">
              <div className="h-1 bg-gold" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-charcoal/10">
                  <div className="flex items-center justify-center w-9 h-9 border-2 border-charcoal bg-gold/10 text-charcoal">
                    <ClipboardList className="w-5 h-5" />
                  </div>
                  <h2 className="text-base font-black uppercase tracking-wider text-charcoal">عن ورقة الرسم</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  ورقة رسم مخصصة لرسم المخططات الأولية في موقع الزبون.
                  تحتوي على شبكة مربعات لتسهيل رسم المخططات والقياسات.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  يُطبع صفحتان من ورقة الرسم. يمكنك أيضاً طباعة{" "}
                  <Link href="/survey" className="text-charcoal font-bold underline underline-offset-4 decoration-gold decoration-2 hover:text-gold transition-colors">
                    استمارة الكشف الأولي
                  </Link>{" "}
                  لجمع المعلومات.
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-2 pb-8">
              <Button
                size="lg"
                onClick={() => window.print()}
                className="bg-gold border-3 border-charcoal text-charcoal font-black text-base uppercase tracking-wider px-12 py-7 shadow-[6px_6px_0px_#3C4146] hover:bg-gold-hover hover:text-charcoal hover:shadow-[2px_2px_0px_#3C4146] hover:translate-x-[4px] hover:translate-y-[4px] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all duration-100"
              >
                <Printer className="w-5 h-5" />
                طباعة ورقة الرسم
              </Button>
            </div>

            <div className="text-center pb-8">
              <Link href="/survey" className="text-xs text-muted-foreground hover:text-charcoal transition-colors underline underline-offset-4 ml-4">
                استمارة الكشف الأولي
              </Link>
              <Link href="/" className="text-xs text-muted-foreground hover:text-charcoal transition-colors underline underline-offset-4">
                ← العودة لعقد التصنيع
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ====== PRINT VIEW ====== */}
      <style jsx global>{`
        @media print {
          .graph-page {
            page-break-after: always;
          }
          .graph-page:last-child {
            page-break-after: auto;
          }
        }
      `}</style>
      <div className="hidden print-only">
        <DimensionsPage />
        <GraphPage pageNum={2} />
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

        {/* Notes line spanning full width */}
        <div style={{ display: "flex", gap: "8px", padding: "4px 0", borderBottom: "1.5px solid #C8C0B4", minHeight: "24px" }}>
          <span style={{ fontWeight: 700, color: "#6B7280", whiteSpace: "nowrap", fontSize: "9pt" }}>ملاحظات:</span>
        </div>
      </div>

      {/* Grid area — fills remaining space */}
      <div style={{ position: "relative", flex: 1 }}>
        <svg
          width="100%"
          height="100%"
          style={{ display: "block" }}
        >
          <defs>
            <pattern id="small-grid-1" width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M 18 0 L 0 0 0 18" fill="none" stroke="#9CA3AF" strokeWidth="0.7" opacity="0.8" />
            </pattern>
            <pattern id="major-grid-1" width="90" height="90" patternUnits="userSpaceOnUse">
              <rect width="90" height="90" fill="url(#small-grid-1)" />
              <path d="M 90 0 L 0 0 0 90" fill="none" stroke="#6B7280" strokeWidth="1.2" opacity="0.9" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#major-grid-1)" />
          <rect width="100%" height="100%" fill="none" stroke="#3C4146" strokeWidth="1.5" opacity="0.3" />
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
          viewBox="0 0 720 960"
          style={{ display: "block" }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Small grid */}
            <pattern id={`small-grid-${pageNum}`} width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M 18 0 L 0 0 0 18" fill="none" stroke="#9CA3AF" strokeWidth="0.7" opacity="0.8" />
            </pattern>
            {/* Major grid every 5 cells */}
            <pattern id={`major-grid-${pageNum}`} width="90" height="90" patternUnits="userSpaceOnUse">
              <rect width="90" height="90" fill={`url(#small-grid-${pageNum})`} />
              <path d="M 90 0 L 0 0 0 90" fill="none" stroke="#6B7280" strokeWidth="1.2" opacity="0.9" />
            </pattern>
          </defs>
          <rect width="720" height="960" fill={`url(#major-grid-${pageNum})`} />
          {/* Border */}
          <rect width="720" height="960" fill="none" stroke="#3C4146" strokeWidth="1.5" opacity="0.3" />
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
