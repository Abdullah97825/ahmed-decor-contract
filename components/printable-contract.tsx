import { ContractData } from "@/lib/types";
import { LogoPrint } from "@/components/logo";

interface PrintableContractProps {
  data: ContractData;
}

export function PrintableContract({ data }: PrintableContractProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("ar-IQ-u-nu-latn", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const filledStoveNotes = data.stoveNotes.filter((r) => r.note);
  const filledSinkNotes = data.sinkNotes.filter((r) => r.note);
  const filledMarbleNotes = data.marbleNotes.filter((r) => r.note);
  const filledMaterialNotes = data.materialNotes.filter((r) => r.note);
  const filledColors = data.colors.filter((r) => r.code || r.notes);
  const filledEngravings = data.engravings.filter((r) => r.code || r.notes);
  const filledDoors = data.doors.filter((r) => r.note);
  const hasHandleTypes = data.doorInfo.handleTypes.gola || data.doorInfo.handleTypes.jPull || data.doorInfo.handleTypes.push || data.doorInfo.handleTypes.handle;
  const filledDrawers = data.drawers.filter(
    (r) => r.drawerCount || r.faceCount || r.notes
  );
  const filledTowerCabinets = data.towerCabinets.filter(
    (r) => r.type || r.location || r.size || r.notes
  );
  const filledManufacturingNotes = data.manufacturingNotes.filter(
    (r) => r.note
  );
  const filledFrontPaymentNotes = data.frontPaymentNotes.filter((r) => r.note);
  const filledElectricalNotes = data.electricalNotes.filter((r) => r.note);
  const hasElectrical = data.electricalAppliances.oven || data.electricalAppliances.microwave || data.electricalAppliances.dishwasher || data.electricalAppliances.washingMachine || filledElectricalNotes.length > 0;
  const hasMarbleTypes = data.marble.types.quartzSpanish || data.marble.types.quartzNormal || data.marble.types.synthetic;
  const hasMaterialTypes = data.material.types.mdf || data.material.types.plywood;

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
      {/* ===== HEADER ===== */}
      <div
        style={{
          textAlign: "center",
          paddingBottom: "16px",
          borderBottom: "2px solid #F2D000",
          marginBottom: "20px",
        }}
      >
        <LogoPrint className="justify-center mb-2" />
        <h1
          style={{
            fontSize: "18pt",
            fontWeight: 800,
            color: "#3C4146",
            margin: "8px 0 4px",
            letterSpacing: "0.5px",
          }}
        >
          عقد تصنيع
        </h1>
        <p
          style={{
            fontSize: "10pt",
            color: "#6B7280",
          }}
        >
          التاريخ: {formatDate(data.customer.date)}
        </p>
      </div>

      {/* ===== CUSTOMER INFO ===== */}
      <CSection title="معلومات الزبون" icon="user">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px 24px",
        }}
      >
        <InfoField label="اسم الزبون" value={data.customer.name} />
        <InfoField label="رقم الهاتف" value={data.customer.phone} />
        <InfoField label="العنوان" value={data.customer.address} />
        <InfoField label="تاريخ العقد" value={formatDate(data.customer.date)} />
      </div>
      </CSection>

      {/* ===== STOVE ===== */}
      <CSection title="الطباخ" icon="flame">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px 24px",
          marginBottom: filledStoveNotes.length > 0 ? "10px" : "20px",
        }}
      >
        <InfoField label="سنتر الطباخ" value={data.stove.center} />
        <InfoField label="قياس الطباخ (سم)" value={data.stove.size} />
      </div>
      {filledStoveNotes.length > 0 && (
        <NotesList notes={filledStoveNotes} />
      )}
      </CSection>

      {/* ===== SINK ===== */}
      <CSection title="الحوض" icon="droplets">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px 24px",
          marginBottom: filledSinkNotes.length > 0 ? "10px" : "20px",
        }}
      >
        <InfoField label="سنتر الحوض" value={data.sink.center} />
        <InfoField label="قياس الحوض (سم)" value={data.sink.size} />
      </div>
      {filledSinkNotes.length > 0 && (
        <NotesList notes={filledSinkNotes} />
      )}
      </CSection>

      {/* ===== MARBLE ===== */}
      <CSection title="المرمر" icon="marble">
      <div
        style={{
          marginBottom: filledMarbleNotes.length > 0 ? "10px" : "20px",
        }}
      >
        <InfoField label="لون المرمر" value={data.marble.color} />
        {hasMarbleTypes && (
          <div style={{ display: "flex", gap: "24px", padding: "6px 0", borderBottom: "1px dotted #D1D5DB", flexWrap: "wrap" }}>
            <span style={{ fontWeight: 700, color: "#6B7280", whiteSpace: "nowrap" }}>نوع المرمر:</span>
            {([
              [data.marble.types.quartzSpanish, "كوارتز اسباني"],
              [data.marble.types.quartzNormal, "كوارتز عادي"],
              [data.marble.types.synthetic, "صناعي"],
            ] as const).map(([checked, label]) => (
              <div key={label} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ width: "14px", height: "14px", border: "2px solid #3C4146", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10pt", fontWeight: 700 }}>
                  {checked ? "✓" : ""}
                </span>
                <span style={{ fontSize: "10pt" }}>{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {filledMarbleNotes.length > 0 && (
        <NotesList notes={filledMarbleNotes} />
      )}
      </CSection>

      {/* ===== MANUFACTURING MATERIAL ===== */}
      <CSection title="مادة التصنيع" icon="layers">
      <div
        style={{
          marginBottom: filledMaterialNotes.length > 0 ? "10px" : "20px",
        }}
      >
        {hasMaterialTypes ? (
          <div style={{ display: "flex", gap: "24px", padding: "6px 0", borderBottom: "1px dotted #D1D5DB" }}>
            <span style={{ fontWeight: 700, color: "#6B7280", whiteSpace: "nowrap" }}>مادة التصنيع:</span>
            {([
              [data.material.types.mdf, "MDF"],
              [data.material.types.plywood, "Plywood"],
            ] as const).map(([checked, label]) => (
              <div key={label} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ width: "14px", height: "14px", border: "2px solid #3C4146", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10pt", fontWeight: 700 }}>
                  {checked ? "✓" : ""}
                </span>
                <span style={{ fontSize: "10pt" }}>{label}</span>
              </div>
            ))}
          </div>
        ) : (
          <InfoField label="مادة التصنيع" value="" />
        )}
      </div>
      {filledMaterialNotes.length > 0 && (
        <NotesList notes={filledMaterialNotes} />
      )}
      </CSection>

      {/* ===== COLORS ===== */}
      <CSection title="الألوان" icon="palette">
      {filledColors.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
            fontSize: "10pt",
          }}
        >
          <thead>
            <tr>
              <Th>#</Th>
              <Th>رمز اللون</Th>
              <Th>ملاحظات</Th>
            </tr>
          </thead>
          <tbody>
            {filledColors.map((row, i) => (
              <tr key={row.id}>
                <Td align="center">{i + 1}</Td>
                <Td>{row.code || "—"}</Td>
                <Td>{row.notes || "—"}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyNotice />
      )}
      </CSection>

      {/* ===== ENGRAVINGS ===== */}
      <CSection title="النقشات" icon="flower">
      {filledEngravings.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
            fontSize: "10pt",
          }}
        >
          <thead>
            <tr>
              <Th>#</Th>
              <Th>رمز النقشة</Th>
              <Th>ملاحظات</Th>
            </tr>
          </thead>
          <tbody>
            {filledEngravings.map((row, i) => (
              <tr key={row.id}>
                <Td align="center">{i + 1}</Td>
                <Td>{row.code || "—"}</Td>
                <Td>{row.notes || "—"}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyNotice />
      )}
      </CSection>

      {/* ===== DOORS ===== */}
      <CSection title="الأبواب" icon="door">
      <div style={{ marginBottom: filledDoors.length > 0 ? "10px" : "20px" }}>
        {hasHandleTypes && (
          <div style={{ display: "flex", gap: "24px", padding: "6px 0", borderBottom: "1px dotted #D1D5DB", marginBottom: "8px", flexWrap: "wrap" }}>
            <span style={{ fontWeight: 700, color: "#6B7280", whiteSpace: "nowrap" }}>نوع المقبض:</span>
            {([
              [data.doorInfo.handleTypes.gola, "(Gola) كولا"],
              [data.doorInfo.handleTypes.jPull, "(J-Pull) حفر"],
              [data.doorInfo.handleTypes.push, "(Push) كبس"],
              [data.doorInfo.handleTypes.handle, "(Handle) يدة"],
            ] as const).map(([checked, label]) => (
              <div key={label} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ width: "14px", height: "14px", border: "2px solid #3C4146", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10pt", fontWeight: 700 }}>
                  {checked ? "✓" : ""}
                </span>
                <span style={{ fontSize: "10pt" }}>{label}</span>
              </div>
            ))}
          </div>
        )}
        {filledDoors.length > 0 ? (
          <div>
            {filledDoors.map((row, i) => (
              <div
                key={row.id}
                style={{
                  display: "flex",
                  gap: "8px",
                  padding: "6px 0",
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    color: "#6B7280",
                    minWidth: "24px",
                  }}
                >
                  {i + 1}.
                </span>
                <span>{row.note}</span>
              </div>
            ))}
          </div>
        ) : (
          !hasHandleTypes && <EmptyNotice />
        )}
      </div>
      </CSection>

      {/* ===== ELECTRICAL APPLIANCES ===== */}
      <CSection title="كهربائيات" icon="zap">
      {hasElectrical ? (
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 24px", marginBottom: filledElectricalNotes.length > 0 ? "10px" : "0" }}>
            {([
              [data.electricalAppliances.oven, "فرن"],
              [data.electricalAppliances.microwave, "مايكروويف"],
              [data.electricalAppliances.dishwasher, "غسالة صحون"],
              [data.electricalAppliances.washingMachine, "غسالة ملابس"],
            ] as const).map(([checked, label]) => (
              <div key={label} style={{ display: "flex", gap: "8px", alignItems: "center", padding: "4px 0" }}>
                <span style={{ width: "14px", height: "14px", border: "2px solid #3C4146", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10pt", fontWeight: 700 }}>
                  {checked ? "✓" : ""}
                </span>
                <span style={{ fontSize: "10pt" }}>{label}</span>
              </div>
            ))}
          </div>
          {filledElectricalNotes.length > 0 && (
            <NotesList notes={filledElectricalNotes} />
          )}
        </div>
      ) : (
        <EmptyNotice />
      )}
      </CSection>

      {/* ===== DRAWERS ===== */}
      <CSection title="مجرات" icon="drawer">
      {filledDrawers.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px", fontSize: "10pt" }}>
          <thead>
            <tr>
              <Th>#</Th>
              <Th>عدد المجرات</Th>
              <Th>عدد الوجوه</Th>
              <Th>ملاحظات</Th>
            </tr>
          </thead>
          <tbody>
            {filledDrawers.map((row, i) => (
              <tr key={row.id}>
                <Td align="center">{i + 1}</Td>
                <Td align="center">{row.drawerCount || "—"}</Td>
                <Td align="center">{row.faceCount || "—"}</Td>
                <Td>{row.notes || "—"}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyNotice />
      )}
      </CSection>

      {/* ===== TOWER CABINETS ===== */}
      <CSection title="كابينات عمودية" icon="cabinet">
      {filledTowerCabinets.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px", fontSize: "10pt" }}>
          <thead>
            <tr>
              <Th>#</Th>
              <Th>النوع</Th>
              <Th>الموقع</Th>
              <Th>القياس</Th>
              <Th>ملاحظات</Th>
            </tr>
          </thead>
          <tbody>
            {filledTowerCabinets.map((row, i) => (
              <tr key={row.id}>
                <Td align="center">{i + 1}</Td>
                <Td>{row.type || "—"}</Td>
                <Td>{row.location || "—"}</Td>
                <Td align="center">{row.size || "—"}</Td>
                <Td>{row.notes || "—"}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyNotice />
      )}
      </CSection>

      {/* ===== MANUFACTURING NOTES ===== */}
      <CSection title="ملاحظات التصنيع" icon="note">
      {filledManufacturingNotes.length > 0 ? (
        <div style={{ marginBottom: "20px" }}>
          {filledManufacturingNotes.map((row, i) => (
            <div
              key={row.id}
              style={{
                display: "flex",
                gap: "8px",
                padding: "6px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  color: "#6B7280",
                  minWidth: "24px",
                }}
              >
                {i + 1}.
              </span>
              <span style={{ whiteSpace: "pre-wrap" }}>{row.note}</span>
            </div>
          ))}
        </div>
      ) : (
        <EmptyNotice />
      )}
      </CSection>

      {/* ===== FRONT PAYMENT ===== */}
      <CSection title="العربون" icon="banknote">
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "24px", padding: "6px 0", borderBottom: "1px dotted #D1D5DB", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span style={{ fontWeight: 700, color: "#6B7280", whiteSpace: "nowrap" }}>الحالة:</span>
            <span style={{ width: "14px", height: "14px", border: "2px solid #3C4146", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10pt", fontWeight: 700 }}>
              {data.frontPayment.received ? "✓" : ""}
            </span>
            <span style={{ fontWeight: 500 }}>{data.frontPayment.received ? "تم الاستلام" : "لم يتم الاستلام"}</span>
          </div>
        </div>
        <InfoField label="المبلغ" value={data.frontPayment.amount ? `${data.frontPayment.amount} ${data.frontPayment.currency === "دينار" ? "دينار عراقي" : data.frontPayment.currency === "دولار" ? "دولار" : ""}` : ""} />
        {filledFrontPaymentNotes.length > 0 && (
          <NotesList notes={filledFrontPaymentNotes} />
        )}
      </div>
      </CSection>

      {/* ===== TOTAL PRICE ===== */}
      <CSection title="السعر الإجمالي" icon="calculator">
      <div style={{ marginBottom: "20px" }}>
        <InfoField label="السعر الكلي" value={data.totalPrice ? `${data.totalPrice} ${data.frontPayment.currency === "دينار" ? "دينار عراقي" : data.frontPayment.currency === "دولار" ? "دولار" : ""}` : ""} />
        <InfoField label="المبلغ المدفوع" value={data.totalPaid ? `${data.totalPaid} ${data.frontPayment.currency === "دينار" ? "دينار عراقي" : data.frontPayment.currency === "دولار" ? "دولار" : ""}` : ""} />
        {data.totalPrice && data.totalPaid && (
          <InfoField label="المبلغ المتبقي" value={`${(Number(data.totalPrice.replace(/,/g, "")) - Number(data.totalPaid.replace(/,/g, ""))).toLocaleString()} ${data.frontPayment.currency === "دينار" ? "دينار عراقي" : data.frontPayment.currency === "دولار" ? "دولار" : ""}`} />
        )}
      </div>
      </CSection>

      {/* ===== LEGAL NOTES ===== */}
      <div
        style={{
          breakInside: "avoid",
          border: "2px solid #3C4146",
          marginBottom: "14px",
          overflow: "hidden",
        }}
      >
        <div style={{ height: "4px", background: "#F2D000" }} />
        <div
          style={{
            padding: "12px 16px",
            fontSize: "9pt",
            color: "#4B5563",
            lineHeight: 1.8,
          }}
        >
          <p style={{ fontWeight: 700, marginBottom: "6px", color: "#3C4146", fontSize: "9.5pt" }}>ملاحظات قانونية:</p>
          <ol style={{ margin: 0, paddingInlineStart: "18px" }}>
            <li style={{ marginBottom: "4px" }}>بتوقيع هذا العقد، يُقر الزبون بموافقته على التصاميم وجميع المستندات المرفقة بهذا العقد.</li>
            <li>بتوقيع هذا العقد، يتحمل الزبون المسؤولية الكاملة عن أي أضرار تلحق بالمنتجات نتيجة التخزين بعد تأخره في استلام الطلبات المُصنّعة.</li>
          </ol>
        </div>
      </div>

      {/* ===== SIGNATURES ===== */}
      <div
        style={{
          breakInside: "avoid",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          marginTop: "32px",
          paddingTop: "24px",
          borderTop: "2px solid #F2D000",
        }}
      >
        <SignatureBlock label="توقيع الزبون" />
        <SignatureBlock label="توقيع المصنع" />
      </div>
    </div>
  );
}

/* ===== Helper components ===== */

function CSection({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{ breakInside: "avoid", border: "2px solid #3C4146", marginBottom: "14px", overflow: "hidden" }}>
      <div style={{ height: "4px", background: "#F2D000" }} />
      <div style={{ padding: "14px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", paddingBottom: "8px", borderBottom: "2px solid rgba(60,65,70,0.1)" }}>
          <div style={{ width: "28px", height: "28px", border: "2px solid #3C4146", background: "rgba(242,208,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <CIcon name={icon} />
          </div>
          <h2 style={{ fontSize: "11pt", fontWeight: 900, textTransform: "uppercase" as const, letterSpacing: "0.05em", color: "#3C4146", margin: 0 }}>{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}

function CIcon({ name }: { name: string }) {
  const s = 14;
  const p = { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: "#3C4146", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const icons: Record<string, React.ReactNode> = {
    user: <svg {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    ruler: <svg {...p}><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" /><path d="m14.5 12.5 2-2" /><path d="m11.5 9.5 2-2" /><path d="m8.5 6.5 2-2" /><path d="m17.5 15.5 2-2" /></svg>,
    flame: <svg {...p}><path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" /></svg>,
    droplets: <svg {...p}><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" /><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" /></svg>,
    marble: <svg {...p}><rect width="20" height="12" x="2" y="6" rx="2" /></svg>,
    layers: <svg {...p}><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.84z" /><path d="m2 12 8.58 3.91a2 2 0 0 0 1.66 0L21 12" /><path d="m2 17 8.58 3.91a2 2 0 0 0 1.66 0L21 17" /></svg>,
    palette: <svg {...p}><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" /><circle cx="13.5" cy="6.5" r=".5" fill="#3C4146" /><circle cx="17.5" cy="10.5" r=".5" fill="#3C4146" /><circle cx="6.5" cy="12.5" r=".5" fill="#3C4146" /><circle cx="8.5" cy="7.5" r=".5" fill="#3C4146" /></svg>,
    flower: <svg {...p}><circle cx="12" cy="12" r="3" /><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5" /><path d="M12 7.5V9" /><path d="M7.5 12H9" /><path d="M16.5 12H15" /><path d="M12 16.5V15" /></svg>,
    door: <svg {...p}><path d="M11 20H2" /><path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z" /><path d="M11 4H8a2 2 0 0 0-2 2v14" /><path d="M14 12h.01" /><path d="M22 20h-3" /></svg>,
    note: <svg {...p}><path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" /><path d="M15 3v5a1 1 0 0 0 1 1h5" /></svg>,
    zap: <svg {...p}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>,
    drawer: <svg {...p}><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 12h18" /><path d="M10 8h4" /><path d="M10 16h4" /></svg>,
    cabinet: <svg {...p}><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M12 3v18" /><path d="M9 8h-1" /><path d="M16 8h-1" /><path d="M9 16h-1" /><path d="M16 16h-1" /></svg>,
    banknote: <svg {...p}><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>,
    calculator: <svg {...p}><rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="16" x2="16" y1="14" y2="18" /><line x1="8" x2="8.01" y1="10" y2="10" /><line x1="12" x2="12.01" y1="10" y2="10" /><line x1="16" x2="16.01" y1="10" y2="10" /><line x1="8" x2="8.01" y1="14" y2="14" /><line x1="12" x2="12.01" y1="14" y2="14" /><line x1="8" x2="8.01" y1="18" y2="18" /><line x1="12" x2="12.01" y1="18" y2="18" /></svg>,
  };
  return <>{icons[name] || null}</>;
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        padding: "6px 0",
        borderBottom: "1px dotted #D1D5DB",
      }}
    >
      <span style={{ fontWeight: 700, color: "#6B7280", whiteSpace: "nowrap" }}>
        {label}:
      </span>
      <span style={{ fontWeight: 500 }}>{value || "—"}</span>
    </div>
  );
}

function Th({ children, align }: { children: React.ReactNode; align?: string }) {
  return (
    <th
      style={{
        backgroundColor: "#3C4146",
        color: "#FFFDF5",
        fontWeight: 700,
        padding: "8px 12px",
        textAlign: (align as React.CSSProperties["textAlign"]) || "right",
        fontSize: "9pt",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align,
}: {
  children: React.ReactNode;
  align?: string;
}) {
  return (
    <td
      style={{
        padding: "7px 12px",
        borderBottom: "1px solid #E5E7EB",
        textAlign: (align as React.CSSProperties["textAlign"]) || "right",
      }}
    >
      {children}
    </td>
  );
}

function EmptyNotice() {
  return (
    <p
      style={{
        color: "#9CA3AF",
        fontStyle: "italic",
        fontSize: "10pt",
        marginBottom: "20px",
        padding: "8px 0",
        borderBottom: "1px dotted #D1D5DB",
      }}
    >
      لا توجد ملاحظات
    </p>
  );
}

function NotesList({ notes }: { notes: { id: string; note: string }[] }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      {notes.map((row, i) => (
        <div
          key={row.id}
          style={{
            display: "flex",
            gap: "8px",
            padding: "4px 0",
            borderBottom: "1px solid #E5E7EB",
            fontSize: "10pt",
          }}
        >
          <span
            style={{
              fontWeight: 700,
              color: "#6B7280",
              minWidth: "24px",
            }}
          >
            {i + 1}.
          </span>
          <span>{row.note}</span>
        </div>
      ))}
    </div>
  );
}

function SignatureBlock({ label }: { label: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontWeight: 700, marginBottom: "40px", color: "#3C4146" }}>
        {label}
      </p>
      <div
        style={{
          borderBottom: "2px solid #3C4146",
          width: "80%",
          margin: "0 auto",
        }}
      />
    </div>
  );
}
