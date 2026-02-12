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

  const filledDimensions = data.dimensions.filter(
    (r) => r.label || r.length || r.height
  );
  const filledStoveNotes = data.stoveNotes.filter((r) => r.note);
  const filledSinkNotes = data.sinkNotes.filter((r) => r.note);
  const filledMarbleNotes = data.marbleNotes.filter((r) => r.note);
  const filledColors = data.colors.filter((r) => r.code || r.notes);
  const filledEngravings = data.engravings.filter((r) => r.code || r.notes);
  const filledDoors = data.doors.filter((r) => r.note);
  const filledManufacturingNotes = data.manufacturingNotes.filter(
    (r) => r.note
  );

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
      <div style={{ breakInside: "avoid" }}>
      <SectionTitle>معلومات الزبون</SectionTitle>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px 24px",
          marginBottom: "20px",
        }}
      >
        <InfoField label="اسم الزبون" value={data.customer.name} />
        <InfoField label="رقم الهاتف" value={data.customer.phone} />
        <InfoField label="العنوان" value={data.customer.address} />
        <InfoField label="تاريخ العقد" value={formatDate(data.customer.date)} />
      </div>
      </div>

      {/* ===== DIMENSIONS ===== */}
      <div style={{ breakInside: "avoid" }}>
      <SectionTitle>قياسات المطبخ</SectionTitle>
      {filledDimensions.length > 0 ? (
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
              <Th>الجدار / القسم</Th>
              <Th>الطول (سم)</Th>
              <Th>الارتفاع (سم)</Th>
              <Th>ملاحظات</Th>
            </tr>
          </thead>
          <tbody>
            {filledDimensions.map((row, i) => (
              <tr key={row.id}>
                <Td align="center">{i + 1}</Td>
                <Td>{row.label || "—"}</Td>
                <Td align="center">{row.length || "—"}</Td>
                <Td align="center">{row.height || "—"}</Td>
                <Td>{row.notes || "—"}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyNotice />
      )}
      </div>

      {/* ===== STOVE ===== */}
      <div style={{ breakInside: "avoid" }}>
      <SectionTitle>الطباخ</SectionTitle>
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
      </div>

      {/* ===== SINK ===== */}
      <div style={{ breakInside: "avoid" }}>
      <SectionTitle>الحوض</SectionTitle>
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
      </div>

      {/* ===== MARBLE ===== */}
      <div style={{ breakInside: "avoid" }}>
      <SectionTitle>المرمر</SectionTitle>
      <div
        style={{
          marginBottom: filledMarbleNotes.length > 0 ? "10px" : "20px",
        }}
      >
        <InfoField label="لون المرمر" value={data.marble.color} />
      </div>
      {filledMarbleNotes.length > 0 && (
        <NotesList notes={filledMarbleNotes} />
      )}
      </div>

      {/* ===== COLORS ===== */}
      <div style={{ breakInside: "avoid" }}>
      <SectionTitle>الألوان</SectionTitle>
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
      </div>

      {/* ===== ENGRAVINGS ===== */}
      <div style={{ breakInside: "avoid" }}>
      <SectionTitle>النقشات</SectionTitle>
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
      </div>

      {/* ===== DOORS ===== */}
      <div style={{ breakInside: "avoid" }}>
      <SectionTitle>الأبواب</SectionTitle>
      {filledDoors.length > 0 ? (
        <div style={{ marginBottom: "20px" }}>
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
        <EmptyNotice />
      )}
      </div>

      {/* ===== MANUFACTURING NOTES ===== */}
      <div style={{ breakInside: "avoid" }}>
      <SectionTitle>ملاحظات التصنيع</SectionTitle>
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
      </div>

      {/* ===== SIGNATURES ===== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          marginTop: "48px",
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "13pt",
        fontWeight: 800,
        color: "#3C4146",
        marginBottom: "10px",
        paddingBottom: "6px",
        borderBottom: "1px solid #E5DDD0",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: "4px",
          height: "18px",
          backgroundColor: "#F2D000",
          borderRadius: "0",
        }}
      />
      {children}
    </h2>
  );
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
