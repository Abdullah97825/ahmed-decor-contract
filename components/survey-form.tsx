"use client";

import { Printer } from "lucide-react";
import Link from "next/link";

export function SurveyForm() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 10mm 12mm; }
          .survey-page-wrapper {
            padding-top: 0 !important;
            background: white !important;
            min-height: auto !important;
          }
          .survey-page-card {
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
        }
      `}} />

      {/* Floating top bar (hidden on print) */}
      <div className="no-print" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px", background: "#3C4146", borderBottom: "3px solid #F2D000" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/" style={{ fontSize: "12px", color: "#9CA3AF", textDecoration: "underline", textUnderlineOffset: "4px" }}>← الرئيسية</Link>
          <Link href="/graph-paper" style={{ fontSize: "12px", color: "#9CA3AF", textDecoration: "underline", textUnderlineOffset: "4px" }}>ورقة الرسم</Link>
        </div>
        <button
          onClick={() => window.print()}
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 20px", fontFamily: "var(--font-cairo), Cairo, sans-serif", fontSize: "13px", fontWeight: 900, border: "2px solid #F2D000", background: "#F2D000", color: "#3C4146", cursor: "pointer", letterSpacing: "0.05em" }}
        >
          <Printer style={{ width: 16, height: 16 }} />
          طباعة
        </button>
      </div>

      {/* Survey shown directly */}
      <div className="survey-page-wrapper" style={{ paddingTop: "52px", background: "#e5e5e5", minHeight: "100vh" }}>
        <div className="survey-page-card" style={{ maxWidth: "210mm", margin: "0 auto", padding: "20mm 15mm", background: "white", boxShadow: "0 2px 20px rgba(0,0,0,0.15)" }}>
          <PrintableSurvey />
        </div>
        <div className="no-print" style={{ height: "24px" }} />
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

      {/* Marble */}
      <PrintSection title="المرمر" icon="marble">
        <BlankField label="لون المرمر" />
        <div style={{ display: "flex", gap: "24px", padding: "8px 0", marginBottom: "4px" }}>
          <span style={{ fontWeight: 700, color: "#6B7280", fontSize: "10pt" }}>نوع المرمر:</span>
          <CheckboxOption label="كوارتز اسباني" />
          <CheckboxOption label="كوارتز عادي" />
          <CheckboxOption label="صناعي" />
        </div>
        <BlankNoteLines count={1} />
      </PrintSection>

      {/* Material */}
      <PrintSection title="مادة التصنيع" icon="layers">
        <div style={{ display: "flex", gap: "24px", padding: "8px 0", marginBottom: "4px" }}>
          <span style={{ fontWeight: 700, color: "#6B7280", fontSize: "10pt" }}>المادة:</span>
          <CheckboxOption label="MDF" />
          <CheckboxOption label="Plywood" />
        </div>
        <BlankNoteLines count={1} />
      </PrintSection>

      {/* Colors */}
      <PrintSection title="الألوان" icon="palette">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px", marginBottom: "8px" }}>
          <BlankField label="لون الارضي" />
          <BlankField label="لون الملحق" />
        </div>
        <BlankNoteLines count={1} />
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
        <div style={{ display: "flex", gap: "24px", padding: "8px 0", marginBottom: "4px" }}>
          <span style={{ fontWeight: 700, color: "#6B7280", fontSize: "10pt" }}>نوع المقبض:</span>
          <CheckboxOption label="(Gola) كولا" />
          <CheckboxOption label="(J-Pull) حفر" />
          <CheckboxOption label="(Push) كبس" />
          <CheckboxOption label="(Handle) يدة" />
        </div>
        <BlankNoteLines count={1} />
      </PrintSection>

      {/* Electrical Appliances */}
      <PrintSection title="كهربائيات" icon="zap">
        <div style={{ display: "flex", gap: "24px", padding: "8px 0", marginBottom: "4px", flexWrap: "wrap" }}>
          <CheckboxOption label="فرن" />
          <CheckboxOption label="مايكرويف" />
          <CheckboxOption label="غسالة صحون" />
          <CheckboxOption label="غسالة ملابس" />
        </div>
        <BlankNoteLines count={1} />
      </PrintSection>

      {/* Drawers */}
      <PrintSection title="مجرات" icon="drawer">
        <BlankTable
          headers={["#", "عدد المجرات", "عدد الوجوه", "ملاحظات"]}
          rows={2}
          colWidths={["8%", "28%", "28%", "36%"]}
        />
      </PrintSection>

      {/* Tower Cabinets */}
      <PrintSection title="كابينات عمودية" icon="cabinet">
        <BlankTable
          headers={["#", "نوع الكابينة", "موقعها", "قياسها", "ملاحظات"]}
          rows={2}
          colWidths={["6%", "24%", "22%", "22%", "26%"]}
        />
      </PrintSection>

      {/* General Notes */}
      <PrintSection title="ملاحظات عامة" icon="note">
        <BlankNoteLines count={4} lineHeight="28px" />
      </PrintSection>

      {/* Front Payment */}
      <PrintSection title="العربون" icon="banknote">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "24px", padding: "8px 0" }}>
            <CheckboxOption label="تم استلام عربون" />
          </div>
          <BlankField label="قيمة العربون" />
        </div>
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
    palette: <svg {...common}><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" /><circle cx="13.5" cy="6.5" r=".5" fill="#3C4146" /><circle cx="17.5" cy="10.5" r=".5" fill="#3C4146" /><circle cx="6.5" cy="12.5" r=".5" fill="#3C4146" /><circle cx="8.5" cy="7.5" r=".5" fill="#3C4146" /></svg>,
    flower: <svg {...common}><circle cx="12" cy="12" r="3" /><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5" /><path d="M12 7.5V9" /><path d="M7.5 12H9" /><path d="M16.5 12H15" /><path d="M12 16.5V15" /></svg>,
    door: <svg {...common}><path d="M11 20H2" /><path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z" /><path d="M11 4H8a2 2 0 0 0-2 2v14" /><path d="M14 12h.01" /><path d="M22 20h-3" /></svg>,
    note: <svg {...common}><path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" /><path d="M15 3v5a1 1 0 0 0 1 1h5" /></svg>,
    marble: <svg {...common}><rect width="20" height="12" x="2" y="6" rx="2" /></svg>,
    banknote: <svg {...common}><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01" /><path d="M18 12h.01" /></svg>,
    layers: <svg {...common}><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.84z" /><path d="m2 12 8.58 3.91a2 2 0 0 0 1.66 0L21 12" /><path d="m2 17 8.58 3.91a2 2 0 0 0 1.66 0L21 17" /></svg>,
    zap: <svg {...common}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>,
    drawer: <svg {...common}><rect x="2" y="4" width="20" height="7" rx="1" /><rect x="2" y="13" width="20" height="7" rx="1" /><path d="M10 8h4" /><path d="M10 16.5h4" /></svg>,
    cabinet: <svg {...common}><rect x="3" y="2" width="18" height="20" rx="1" /><path d="M3 12h18" /><path d="M12 2v20" /><path d="M10 7h1" /><path d="M10 17h1" /><path d="M13 7h1" /><path d="M13 17h1" /></svg>,
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
