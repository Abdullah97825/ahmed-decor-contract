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
        <GraphPage pageNum={1} />
        <GraphPage pageNum={2} />
      </div>
    </>
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
              <path d="M 18 0 L 0 0 0 18" fill="none" stroke="#C8C0B4" strokeWidth="0.5" opacity="0.5" />
            </pattern>
            {/* Major grid every 5 cells */}
            <pattern id={`major-grid-${pageNum}`} width="90" height="90" patternUnits="userSpaceOnUse">
              <rect width="90" height="90" fill={`url(#small-grid-${pageNum})`} />
              <path d="M 90 0 L 0 0 0 90" fill="none" stroke="#9CA3AF" strokeWidth="1" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="720" height="960" fill={`url(#major-grid-${pageNum})`} />
          {/* Border */}
          <rect width="720" height="960" fill="none" stroke="#3C4146" strokeWidth="1.5" opacity="0.3" />
        </svg>
      </div>

      {/* Compact footer */}
      <div
        dir="ltr"
        style={{
          marginTop: "6px",
          borderTop: "1px solid #F2D000",
          paddingTop: "4px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "7pt", color: "#9CA3AF", letterSpacing: "0.1em", fontWeight: 700 }}>AHMED DECOR</span>
        <span style={{ fontSize: "7pt", color: "#9CA3AF" }}>الاسم: ____________________ التاريخ: ____________</span>
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
