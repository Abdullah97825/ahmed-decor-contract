"use client";

import { useState, useCallback } from "react";
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
  Plus,
  Trash2,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { SectionCard } from "@/components/section-card";
import { Logo } from "@/components/logo";
import { PrintableContract } from "@/components/printable-contract";
import {
  ContractData,
  DimensionRow,
  NoteRow,
  ColorRow,
  EngravingRow,
  DoorNote,
  ManufacturingNote,
  createEmptyContract,
  generateId,
} from "@/lib/types";

export function ContractForm() {
  const [data, setData] = useState<ContractData>(createEmptyContract);

  // -- Customer updaters
  const updateCustomer = useCallback(
    (field: keyof ContractData["customer"], value: string) => {
      setData((prev) => ({
        ...prev,
        customer: { ...prev.customer, [field]: value },
      }));
    },
    []
  );

  // -- Generic list helpers
  type ListKey = "dimensions" | "stoveNotes" | "sinkNotes" | "marbleNotes" | "colors" | "engravings" | "doors" | "manufacturingNotes";

  function addRow<T extends { id: string }>(
    key: ListKey,
    factory: () => T
  ) {
    setData((prev) => ({
      ...prev,
      [key]: [...(prev[key] as unknown as T[]), factory()],
    }));
  }

  function removeRow(key: ListKey, id: string) {
    setData((prev) => ({
      ...prev,
      [key]: (prev[key] as unknown as { id: string }[]).filter((r) => r.id !== id),
    }));
  }

  function updateRow<T extends { id: string }>(
    key: ListKey,
    id: string,
    field: keyof T,
    value: string
  ) {
    setData((prev) => ({
      ...prev,
      [key]: (prev[key] as unknown as T[]).map((r) =>
        r.id === id ? { ...r, [field]: value } : r
      ),
    }));
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* ====== SCREEN FORM ====== */}
      <div className="no-print min-h-screen bg-cream">
        {/* Decorative background — blueprint dot grid */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.06]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="dot-grid"
                x="0"
                y="0"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="#3C4146" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-grid)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <Logo size="lg" className="justify-center mb-4" />
            <div className="inline-block bg-charcoal text-gold px-8 py-3 border-2 border-charcoal shadow-[3px_3px_0px_#F2D000]">
              <span className="text-sm font-black uppercase tracking-[0.2em]">عقد تصنيع</span>
            </div>
          </div>

          <div className="space-y-6">
            {/* ====== CUSTOMER INFO ====== */}
            <SectionCard
              title="معلومات الزبون"
              icon={<User className="w-5 h-5" />}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cust-name">اسم الزبون</Label>
                  <Input
                    id="cust-name"
                    placeholder="الاسم الكامل"
                    value={data.customer.name}
                    onChange={(e) => updateCustomer("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cust-phone">رقم الهاتف</Label>
                  <Input
                    id="cust-phone"
                    placeholder="07XX XXX XXXX"
                    value={data.customer.phone}
                    onChange={(e) => updateCustomer("phone", e.target.value)}
                    dir="ltr"
                    className="text-left"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cust-address">العنوان</Label>
                  <Input
                    id="cust-address"
                    placeholder="المدينة، الحي، الشارع"
                    value={data.customer.address}
                    onChange={(e) => updateCustomer("address", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cust-date">تاريخ العقد</Label>
                  <Input
                    id="cust-date"
                    type="date"
                    value={data.customer.date}
                    onChange={(e) => updateCustomer("date", e.target.value)}
                    dir="ltr"
                    className="text-left"
                  />
                </div>
              </div>
            </SectionCard>

            {/* ====== KITCHEN DIMENSIONS ====== */}
            <SectionCard
              title="قياسات المطبخ"
              icon={<Ruler className="w-5 h-5" />}
            >
              <div className="space-y-3">
                {/* Column headers */}
                <div className="hidden sm:grid grid-cols-[1fr_0.7fr_0.7fr_1fr_auto] gap-2 text-xs font-black uppercase text-muted-foreground px-1">
                  <span>الجدار / القسم</span>
                  <span>الطول (سم)</span>
                  <span>الارتفاع (سم)</span>
                  <span>ملاحظات</span>
                  <span className="w-9" />
                </div>
                <Separator className="hidden sm:block" />

                {data.dimensions.map((row, idx) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-1 sm:grid-cols-[1fr_0.7fr_0.7fr_1fr_auto] gap-2 items-start group"
                  >
                    <div className="sm:hidden text-xs font-semibold text-muted-foreground mb-1">
                      قياس {idx + 1}
                    </div>
                    <Input
                      placeholder="مثال: جدار رئيسي"
                      value={row.label}
                      onChange={(e) =>
                        updateRow<DimensionRow>(
                          "dimensions",
                          row.id,
                          "label",
                          e.target.value
                        )
                      }
                    />
                    <Input
                      placeholder="سم"
                      type="number"
                      step="0.1"
                      min="0"
                      value={row.length}
                      onChange={(e) =>
                        updateRow<DimensionRow>(
                          "dimensions",
                          row.id,
                          "length",
                          e.target.value
                        )
                      }
                      dir="ltr"
                      className="text-left"
                    />
                    <Input
                      placeholder="سم"
                      type="number"
                      step="0.1"
                      min="0"
                      value={row.height}
                      onChange={(e) =>
                        updateRow<DimensionRow>(
                          "dimensions",
                          row.id,
                          "height",
                          e.target.value
                        )
                      }
                      dir="ltr"
                      className="text-left"
                    />
                    <Input
                      placeholder="ملاحظات (اختياري)"
                      value={row.notes}
                      onChange={(e) =>
                        updateRow<DimensionRow>(
                          "dimensions",
                          row.id,
                          "notes",
                          e.target.value
                        )
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors self-center"
                      onClick={() => removeRow("dimensions", row.id)}
                      disabled={data.dimensions.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 border-2 border-charcoal bg-transparent text-charcoal font-black uppercase tracking-wider text-xs hover:bg-charcoal hover:text-cream shadow-[2px_2px_0px_#F2D000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100"
                  onClick={() =>
                    addRow("dimensions", () => ({
                      id: generateId(),
                      label: "",
                      length: "",
                      height: "",
                      notes: "",
                    }))
                  }
                >
                  <Plus className="w-4 h-4" />
                  إضافة قياس
                </Button>

                {/* -- Stove sub-section -- */}
                <Separator className="my-4" />
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="w-4 h-4 text-charcoal" />
                  <span className="text-sm font-black text-charcoal">الطباخ</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  <Input
                    placeholder="سنتر الطباخ"
                    value={data.stove.center}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        stove: { ...prev.stove, center: e.target.value },
                      }))
                    }
                  />
                  <Input
                    placeholder="قياس الطباخ (سم)"
                    type="number"
                    step="0.1"
                    min="0"
                    value={data.stove.size}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        stove: { ...prev.stove, size: e.target.value },
                      }))
                    }
                    dir="ltr"
                    className="text-left"
                  />
                </div>
                {data.stoveNotes.map((row, idx) => (
                  <div key={row.id} className="flex gap-2 items-start group mb-2">
                    <span className="flex items-center justify-center w-7 h-9 text-xs font-bold text-muted-foreground shrink-0">
                      {idx + 1}
                    </span>
                    <Input
                      placeholder="ملاحظة..."
                      value={row.note}
                      onChange={(e) =>
                        updateRow<NoteRow>("stoveNotes", row.id, "note", e.target.value)
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                      onClick={() => removeRow("stoveNotes", row.id)}
                      disabled={data.stoveNotes.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-1 border-2 border-charcoal bg-transparent text-charcoal font-black uppercase tracking-wider text-xs hover:bg-charcoal hover:text-cream shadow-[2px_2px_0px_#F2D000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100"
                  onClick={() =>
                    addRow("stoveNotes", () => ({
                      id: generateId(),
                      note: "",
                    }))
                  }
                >
                  <Plus className="w-4 h-4" />
                  إضافة ملاحظة
                </Button>

                {/* -- Sink sub-section -- */}
                <Separator className="my-4" />
                <div className="flex items-center gap-2 mb-3">
                  <Droplets className="w-4 h-4 text-charcoal" />
                  <span className="text-sm font-black text-charcoal">الحوض</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  <Input
                    placeholder="سنتر الحوض"
                    value={data.sink.center}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        sink: { ...prev.sink, center: e.target.value },
                      }))
                    }
                  />
                  <Input
                    placeholder="قياس الحوض (سم)"
                    type="number"
                    step="0.1"
                    min="0"
                    value={data.sink.size}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        sink: { ...prev.sink, size: e.target.value },
                      }))
                    }
                    dir="ltr"
                    className="text-left"
                  />
                </div>
                {data.sinkNotes.map((row, idx) => (
                  <div key={row.id} className="flex gap-2 items-start group mb-2">
                    <span className="flex items-center justify-center w-7 h-9 text-xs font-bold text-muted-foreground shrink-0">
                      {idx + 1}
                    </span>
                    <Input
                      placeholder="ملاحظة..."
                      value={row.note}
                      onChange={(e) =>
                        updateRow<NoteRow>("sinkNotes", row.id, "note", e.target.value)
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                      onClick={() => removeRow("sinkNotes", row.id)}
                      disabled={data.sinkNotes.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-1 border-2 border-charcoal bg-transparent text-charcoal font-black uppercase tracking-wider text-xs hover:bg-charcoal hover:text-cream shadow-[2px_2px_0px_#F2D000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100"
                  onClick={() =>
                    addRow("sinkNotes", () => ({
                      id: generateId(),
                      note: "",
                    }))
                  }
                >
                  <Plus className="w-4 h-4" />
                  إضافة ملاحظة
                </Button>

                {/* -- Marble sub-section -- */}
                <Separator className="my-4" />
                <div className="flex items-center gap-2 mb-3">
                  <RectangleHorizontal className="w-4 h-4 text-charcoal" />
                  <span className="text-sm font-black text-charcoal">المرمر</span>
                </div>
                <div className="mb-3">
                  <Input
                    placeholder="لون المرمر"
                    value={data.marble.color}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        marble: { color: e.target.value },
                      }))
                    }
                  />
                </div>
                {data.marbleNotes.map((row, idx) => (
                  <div key={row.id} className="flex gap-2 items-start group mb-2">
                    <span className="flex items-center justify-center w-7 h-9 text-xs font-bold text-muted-foreground shrink-0">
                      {idx + 1}
                    </span>
                    <Input
                      placeholder="ملاحظة..."
                      value={row.note}
                      onChange={(e) =>
                        updateRow<NoteRow>("marbleNotes", row.id, "note", e.target.value)
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                      onClick={() => removeRow("marbleNotes", row.id)}
                      disabled={data.marbleNotes.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-1 border-2 border-charcoal bg-transparent text-charcoal font-black uppercase tracking-wider text-xs hover:bg-charcoal hover:text-cream shadow-[2px_2px_0px_#F2D000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100"
                  onClick={() =>
                    addRow("marbleNotes", () => ({
                      id: generateId(),
                      note: "",
                    }))
                  }
                >
                  <Plus className="w-4 h-4" />
                  إضافة ملاحظة
                </Button>
              </div>
            </SectionCard>

            {/* ====== COLORS ====== */}
            <SectionCard
              title="الألوان"
              icon={<Palette className="w-5 h-5" />}
            >
              <div className="space-y-3">
                <div className="hidden sm:grid grid-cols-[0.8fr_1fr_auto] gap-2 text-xs font-black uppercase text-muted-foreground px-1">
                  <span>رمز اللون</span>
                  <span>ملاحظات (الاستخدام)</span>
                  <span className="w-9" />
                </div>
                <Separator className="hidden sm:block" />

                {data.colors.map((row, idx) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-1 sm:grid-cols-[0.8fr_1fr_auto] gap-2 items-start group"
                  >
                    <div className="sm:hidden text-xs font-semibold text-muted-foreground mb-1">
                      لون {idx + 1}
                    </div>
                    <Input
                      placeholder="رمز اللون"
                      value={row.code}
                      onChange={(e) =>
                        updateRow<ColorRow>(
                          "colors",
                          row.id,
                          "code",
                          e.target.value
                        )
                      }
                    />
                    <Input
                      placeholder="مثال: للأبواب العلوية"
                      value={row.notes}
                      onChange={(e) =>
                        updateRow<ColorRow>(
                          "colors",
                          row.id,
                          "notes",
                          e.target.value
                        )
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors self-center"
                      onClick={() => removeRow("colors", row.id)}
                      disabled={data.colors.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 border-2 border-charcoal bg-transparent text-charcoal font-black uppercase tracking-wider text-xs hover:bg-charcoal hover:text-cream shadow-[2px_2px_0px_#F2D000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100"
                  onClick={() =>
                    addRow("colors", () => ({
                      id: generateId(),
                      code: "",
                      notes: "",
                    }))
                  }
                >
                  <Plus className="w-4 h-4" />
                  إضافة لون
                </Button>
              </div>
            </SectionCard>

            {/* ====== ENGRAVINGS ====== */}
            <SectionCard
              title="النقشات"
              icon={<EngravingIcon className="w-5 h-5" />}
            >
              <div className="space-y-3">
                <div className="hidden sm:grid grid-cols-[0.8fr_1fr_auto] gap-2 text-xs font-black uppercase text-muted-foreground px-1">
                  <span>رمز النقشة</span>
                  <span>ملاحظات</span>
                  <span className="w-9" />
                </div>
                <Separator className="hidden sm:block" />

                {data.engravings.map((row, idx) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-1 sm:grid-cols-[0.8fr_1fr_auto] gap-2 items-start group"
                  >
                    <div className="sm:hidden text-xs font-semibold text-muted-foreground mb-1">
                      نقشة {idx + 1}
                    </div>
                    <Input
                      placeholder="رمز النقشة"
                      value={row.code}
                      onChange={(e) =>
                        updateRow<EngravingRow>(
                          "engravings",
                          row.id,
                          "code",
                          e.target.value
                        )
                      }
                    />
                    <Input
                      placeholder="ملاحظات (اختياري)"
                      value={row.notes}
                      onChange={(e) =>
                        updateRow<EngravingRow>(
                          "engravings",
                          row.id,
                          "notes",
                          e.target.value
                        )
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors self-center"
                      onClick={() => removeRow("engravings", row.id)}
                      disabled={data.engravings.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 border-2 border-charcoal bg-transparent text-charcoal font-black uppercase tracking-wider text-xs hover:bg-charcoal hover:text-cream shadow-[2px_2px_0px_#F2D000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100"
                  onClick={() =>
                    addRow("engravings", () => ({
                      id: generateId(),
                      code: "",
                      notes: "",
                    }))
                  }
                >
                  <Plus className="w-4 h-4" />
                  إضافة نقشة
                </Button>
              </div>
            </SectionCard>

            {/* ====== DOORS ====== */}
            <SectionCard
              title="الأبواب"
              icon={<DoorOpen className="w-5 h-5" />}
            >
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground mb-2">
                  أضف ملاحظات حول أنواع المقابض والأبواب المطلوبة (push, gola
                  finger pull, j-pull, الخ)
                </p>

                {data.doors.map((row, idx) => (
                  <div
                    key={row.id}
                    className="flex gap-2 items-start group"
                  >
                    <span className="flex items-center justify-center w-7 h-9 text-xs font-bold text-muted-foreground shrink-0">
                      {idx + 1}
                    </span>
                    <Textarea
                      placeholder="مثال: أبواب علوية - مقبض gola finger pull"
                      value={row.note}
                      onChange={(e) =>
                        updateRow<DoorNote>(
                          "doors",
                          row.id,
                          "note",
                          e.target.value
                        )
                      }
                      className="min-h-[2.5rem]"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                      onClick={() => removeRow("doors", row.id)}
                      disabled={data.doors.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 border-2 border-charcoal bg-transparent text-charcoal font-black uppercase tracking-wider text-xs hover:bg-charcoal hover:text-cream shadow-[2px_2px_0px_#F2D000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100"
                  onClick={() =>
                    addRow("doors", () => ({
                      id: generateId(),
                      note: "",
                    }))
                  }
                >
                  <Plus className="w-4 h-4" />
                  إضافة ملاحظة
                </Button>
              </div>
            </SectionCard>

            {/* ====== MANUFACTURING NOTES ====== */}
            <SectionCard
              title="ملاحظات التصنيع"
              icon={<StickyNote className="w-5 h-5" />}
            >
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  أي تفاصيل إضافية تخص التصنيع لا تندرج تحت الأقسام الأخرى
                </p>

                {data.manufacturingNotes.map((row, idx) => (
                  <div
                    key={row.id}
                    className="flex gap-2 items-start group"
                  >
                    <span className="flex items-center justify-center w-7 h-9 text-xs font-bold text-muted-foreground shrink-0">
                      {idx + 1}
                    </span>
                    <Textarea
                      placeholder="مثال: تركيب إضاءة LED داخلية، فتحة للشفاط بقياس 60 سم، ..."
                      value={row.note}
                      onChange={(e) =>
                        updateRow<ManufacturingNote>(
                          "manufacturingNotes",
                          row.id,
                          "note",
                          e.target.value
                        )
                      }
                      className="min-h-[2.5rem]"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                      onClick={() => removeRow("manufacturingNotes", row.id)}
                      disabled={data.manufacturingNotes.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 border-2 border-charcoal bg-transparent text-charcoal font-black uppercase tracking-wider text-xs hover:bg-charcoal hover:text-cream shadow-[2px_2px_0px_#F2D000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100"
                  onClick={() =>
                    addRow("manufacturingNotes", () => ({
                      id: generateId(),
                      note: "",
                    }))
                  }
                >
                  <Plus className="w-4 h-4" />
                  إضافة ملاحظة
                </Button>
              </div>
            </SectionCard>

            {/* ====== PRINT BUTTON ====== */}
            <div className="flex justify-center pt-6 pb-12">
              <Button
                size="lg"
                onClick={handlePrint}
                className="bg-gold border-3 border-charcoal text-charcoal font-black text-base uppercase tracking-wider px-12 py-7 shadow-[6px_6px_0px_#3C4146] hover:bg-gold-hover hover:text-charcoal hover:shadow-[2px_2px_0px_#3C4146] hover:translate-x-[4px] hover:translate-y-[4px] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all duration-100"
              >
                <Printer className="w-5 h-5" />
                طباعة العقد
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ====== PRINT VIEW (hidden on screen) ====== */}
      <div className="hidden print-only">
        <PrintableContract data={data} />
      </div>
    </>
  );
}
