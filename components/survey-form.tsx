"use client";

import {
  User,
  Ruler,
  Palette,
  FlowerIcon as EngravingIcon,
  DoorOpen,
  StickyNote,
  Flame,
  Droplets,
  RectangleHorizontal,
  Layers,
  Printer,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";

export function SurveyForm() {
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
              <span className="text-sm font-black uppercase tracking-[0.2em]">استمارة كشف أولي</span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="relative bg-card border-2 border-charcoal shadow-[4px_4px_0px_#3C4146] overflow-hidden">
              <div className="h-1 bg-gold" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-charcoal/10">
                  <div className="flex items-center justify-center w-9 h-9 border-2 border-charcoal bg-gold/10 text-charcoal">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h2 className="text-base font-black uppercase tracking-wider text-charcoal">عن هذه الاستمارة</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  هذه الاستمارة مخصصة لفريق العمل الميداني لجمع المعلومات الأولية من موقع الزبون.
                  تتضمن حقول فارغة لتعبئتها يدوياً أثناء الزيارة الميدانية، بالإضافة إلى خانات اختيار لنوع المرمر ومادة التصنيع.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  اطبع هذه الاستمارة قبل التوجه للموقع. يمكنك أيضاً طباعة{" "}
                  <Link href="/graph-paper" className="text-charcoal font-bold underline underline-offset-4 decoration-gold decoration-2 hover:text-gold transition-colors">
                    ورقة الرسم
                  </Link>{" "}
                  لرسم المخططات الأولية.
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
                طباعة الاستمارة
              </Button>
            </div>

            <div className="text-center pb-8">
              <Link href="/" className="text-xs text-muted-foreground hover:text-charcoal transition-colors underline underline-offset-4">
                ← العودة لعقد التصنيع
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ====== PRINT VIEW ====== */}
      <div className="hidden print-only">
        <PrintableSurvey />
      </div>
    </>
  );
}

/* ===== PRINT COMPONENTS ===== */

function PrintableSurvey() {
  return (
    <div
      dir="rtl"
      style={{
        fontFamily: "var(--font-cairo), Cairo, sans-serif",
        color: "#1a1a1a",
        fontSize: "11pt",
        lineHeight: 1.7,
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", paddingBottom: "16px", borderBottom: "2px solid #F2D000", marginBottom: "20px" }}>
        <PrintLogo />
        <h1 style={{ fontSize: "18pt", fontWeight: 800, color: "#3C4146", margin: "8px 0 4px", letterSpacing: "0.5px" }}>
          استمارة كشف أولي
        </h1>
        <p style={{ fontSize: "10pt", color: "#6B7280" }}>
          التاريخ: ____________________
        </p>
      </div>

      {/* Customer Info */}
      <PrintSection title="معلومات الزبون" icon="user">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
          <BlankField label="اسم الزبون" />
          <BlankField label="رقم الهاتف" />
          <BlankField label="العنوان" />
          <BlankField label="تاريخ الزيارة" />
        </div>
      </PrintSection>

      {/* Kitchen Dimensions */}
      <PrintSection title="قياسات المطبخ" icon="ruler">
        <BlankTable
          headers={["#", "الجدار / القسم", "الطول (سم)", "الارتفاع (سم)", "ملاحظات"]}
          rows={4}
          colWidths={["8%", "28%", "18%", "18%", "28%"]}
        />
      </PrintSection>

      {/* Stove */}
      <PrintSection title="الطباخ" icon="flame">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px", marginBottom: "8px" }}>
          <BlankField label="سنتر الطباخ" />
          <BlankField label="قياس الطباخ (سم)" />
        </div>
        <BlankNoteLines count={2} />
      </PrintSection>

      {/* Sink */}
      <PrintSection title="الحوض" icon="droplets">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px", marginBottom: "8px" }}>
          <BlankField label="سنتر الحوض" />
          <BlankField label="قياس الحوض (سم)" />
        </div>
        <BlankNoteLines count={2} />
      </PrintSection>

      {/* Marble */}
      <PrintSection title="المرمر" icon="marble">
        <BlankField label="لون المرمر" />
        <div style={{ display: "flex", gap: "24px", padding: "8px 0", marginBottom: "4px" }}>
          <span style={{ fontWeight: 700, color: "#6B7280", fontSize: "10pt" }}>نوع المرمر:</span>
          <CheckboxOption label="كوارتز اسباني" />
          <CheckboxOption label="كوارتز عادي" />
          <CheckboxOption label="صناعي" />
        </div>
        <BlankNoteLines count={2} />
      </PrintSection>

      {/* Material */}
      <PrintSection title="مادة التصنيع" icon="layers">
        <div style={{ display: "flex", gap: "24px", padding: "8px 0", marginBottom: "4px" }}>
          <span style={{ fontWeight: 700, color: "#6B7280", fontSize: "10pt" }}>المادة:</span>
          <CheckboxOption label="MDF" />
          <CheckboxOption label="Plywood" />
        </div>
        <BlankNoteLines count={2} />
      </PrintSection>

      {/* Colors */}
      <PrintSection title="الألوان" icon="palette">
        <BlankTable
          headers={["#", "اللون", "ملاحظات (الاستخدام)"]}
          rows={2}
          colWidths={["8%", "42%", "50%"]}
        />
      </PrintSection>

      {/* Engravings */}
      <PrintSection title="النقشات" icon="flower">
        <BlankTable
          headers={["#", "النقشة", "ملاحظات"]}
          rows={2}
          colWidths={["8%", "42%", "50%"]}
        />
      </PrintSection>

      {/* Doors */}
      <PrintSection title="الأبواب" icon="door">
        <p style={{ fontSize: "9pt", color: "#6B7280", marginBottom: "8px" }}>
          أنواع المقابض والأبواب المطلوبة (push, gola finger pull, j-pull, الخ)
        </p>
        <BlankNoteLines count={2} />
      </PrintSection>

      {/* General Notes */}
      <PrintSection title="ملاحظات عامة" icon="note">
        <BlankNoteLines count={4} lineHeight="28px" />
      </PrintSection>

      {/* Footer */}
      <div style={{ breakInside: "avoid", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", marginTop: "32px", paddingTop: "24px", borderTop: "2px solid #F2D000" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontWeight: 700, marginBottom: "40px", color: "#3C4146" }}>توقيع الموظف</p>
          <div style={{ borderBottom: "2px solid #3C4146", width: "80%", margin: "0 auto" }} />
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontWeight: 700, marginBottom: "40px", color: "#3C4146" }}>توقيع الزبون</p>
          <div style={{ borderBottom: "2px solid #3C4146", width: "80%", margin: "0 auto" }} />
        </div>
      </div>
    </div>
  );
}

/* ===== Helper components ===== */

function PrintLogo() {
  const text = "AHMED DECOR";
  return (
    <div dir="ltr" style={{ fontWeight: 900, fontSize: "1.5rem", letterSpacing: "0.05em", userSelect: "none", textAlign: "center", marginBottom: "8px" }}>
      {text.split("").map((char, i) =>
        char === " " ? (
          <span key={i} style={{ display: "inline-block", width: "0.375rem" }} />
        ) : (
          <span key={i} style={{ color: char === "E" ? "#F2D000" : "#3C4146" }}>{char}</span>
        )
      )}
    </div>
  );
}

function PrintSection({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        breakInside: "avoid",
        border: "2px solid #3C4146",
        marginBottom: "14px",
        overflow: "hidden",
      }}
    >
      {/* Gold top bar */}
      <div style={{ height: "4px", background: "#F2D000" }} />
      <div style={{ padding: "14px 18px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", paddingBottom: "8px", borderBottom: "2px solid rgba(60,65,70,0.1)" }}>
          <div style={{
            width: "28px", height: "28px",
            border: "2px solid #3C4146",
            background: "rgba(242,208,0,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <PrintIcon name={icon} />
          </div>
          <h2 style={{ fontSize: "11pt", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#3C4146", margin: 0 }}>
            {title}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
}

function PrintIcon({ name }: { name: string }) {
  const size = 14;
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "#3C4146", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const icons: Record<string, React.ReactNode> = {
    user: <svg {...common}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    ruler: <svg {...common}><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" /><path d="m14.5 12.5 2-2" /><path d="m11.5 9.5 2-2" /><path d="m8.5 6.5 2-2" /><path d="m17.5 15.5 2-2" /></svg>,
    palette: <svg {...common}><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" /><circle cx="13.5" cy="6.5" r=".5" fill="#3C4146" /><circle cx="17.5" cy="10.5" r=".5" fill="#3C4146" /><circle cx="6.5" cy="12.5" r=".5" fill="#3C4146" /><circle cx="8.5" cy="7.5" r=".5" fill="#3C4146" /></svg>,
    flower: <svg {...common}><circle cx="12" cy="12" r="3" /><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5" /><path d="M12 7.5V9" /><path d="M7.5 12H9" /><path d="M16.5 12H15" /><path d="M12 16.5V15" /></svg>,
    door: <svg {...common}><path d="M11 20H2" /><path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z" /><path d="M11 4H8a2 2 0 0 0-2 2v14" /><path d="M14 12h.01" /><path d="M22 20h-3" /></svg>,
    note: <svg {...common}><path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" /><path d="M15 3v5a1 1 0 0 0 1 1h5" /></svg>,
    flame: <svg {...common}><path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" /></svg>,
    droplets: <svg {...common}><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" /><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" /></svg>,
    marble: <svg {...common}><rect width="20" height="12" x="2" y="6" rx="2" /></svg>,
    layers: <svg {...common}><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.84z" /><path d="m2 12 8.58 3.91a2 2 0 0 0 1.66 0L21 12" /><path d="m2 17 8.58 3.91a2 2 0 0 0 1.66 0L21 17" /></svg>,
  };
  return <>{icons[name] || null}</>;
}

function BlankField({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", gap: "8px", padding: "6px 0", borderBottom: "1.5px solid #C8C0B4", minHeight: "32px" }}>
      <span style={{ fontWeight: 700, color: "#6B7280", whiteSpace: "nowrap", fontSize: "10pt" }}>{label}:</span>
    </div>
  );
}

function BlankTable({ headers, rows, colWidths }: { headers: string[]; rows: number; colWidths: string[] }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "12px", fontSize: "10pt" }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th
              key={i}
              style={{
                backgroundColor: "#3C4146",
                color: "#FFFDF5",
                fontWeight: 700,
                padding: "6px 10px",
                textAlign: i === 0 ? "center" : "right",
                fontSize: "9pt",
                whiteSpace: "nowrap",
                width: colWidths[i],
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }, (_, i) => (
          <tr key={i}>
            {headers.map((_, j) => (
              <td
                key={j}
                style={{
                  padding: "10px 10px",
                  borderBottom: "1.5px solid #C8C0B4",
                  textAlign: j === 0 ? "center" : "right",
                  color: j === 0 ? "#6B7280" : "transparent",
                  fontWeight: j === 0 ? 700 : 400,
                  fontSize: j === 0 ? "9pt" : "10pt",
                  height: "32px",
                }}
              >
                {j === 0 ? i + 1 : ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function BlankNoteLines({ count, lineHeight = "24px" }: { count: number; lineHeight?: string }) {
  return (
    <div style={{ marginBottom: "8px" }}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: "8px",
            padding: "4px 0",
            borderBottom: "1.5px solid #C8C0B4",
            minHeight: lineHeight,
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: 700, color: "#6B7280", minWidth: "20px", fontSize: "9pt" }}>
            {i + 1}.
          </span>
        </div>
      ))}
    </div>
  );
}

function CheckboxOption({ label }: { label: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "10pt" }}>
      <span style={{ fontSize: "14pt", lineHeight: 1 }}>☐</span>
      <span>{label}</span>
    </span>
  );
}
