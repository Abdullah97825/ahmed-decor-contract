"use client";

import { useState, useCallback } from "react";
import {
  User,
  Palette,
  FlowerIcon as EngravingIcon,
  DoorOpen,
  StickyNote,
  Flame,
  Droplets,
  RectangleHorizontal,
  Layers,
  Plus,
  Trash2,
  Printer,
  Zap,
  Columns3,
  PanelTop,
  Banknote,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
// Select removed — marble/material now use checkboxes
import { Checkbox } from "@/components/ui/checkbox";
import { SectionCard } from "@/components/section-card";
import { Logo } from "@/components/logo";
import { PrintableContract } from "@/components/printable-contract";
import {
  ContractData,
  NoteRow,
  ColorRow,
  EngravingRow,
  DoorNote,
  ManufacturingNote,
  DrawerRow,
  TowerCabinetRow,
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
  type ListKey = "stoveNotes" | "sinkNotes" | "marbleNotes" | "materialNotes" | "colors" | "engravings" | "doors" | "electricalNotes" | "manufacturingNotes" | "drawers" | "towerCabinets" | "frontPaymentNotes";

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
                    dir="rtl"
                    className="text-right"
                  />
                </div>
              </div>
            </SectionCard>

            {/* ====== STOVE ====== */}
            <SectionCard
              title="الطباخ"
              icon={<Flame className="w-5 h-5" />}
            >
              <div className="space-y-3">
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
              </div>
            </SectionCard>

            {/* ====== SINK ====== */}
            <SectionCard
              title="الحوض"
              icon={<Droplets className="w-5 h-5" />}
            >
              <div className="space-y-3">
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
              </div>
            </SectionCard>

            {/* ====== MARBLE ====== */}
            <SectionCard
              title="المرمر"
              icon={<RectangleHorizontal className="w-5 h-5" />}
            >
              <div className="space-y-3">
                <div className="mb-3">
                  <Input
                    placeholder="لون المرمر"
                    value={data.marble.color}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        marble: { ...prev.marble, color: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-2">نوع المرمر:</p>
                  <div className="flex flex-wrap gap-4">
                    {([
                      ["quartzSpanish", "كوارتز اسباني"],
                      ["quartzNormal", "كوارتز عادي"],
                      ["synthetic", "صناعي"],
                    ] as const).map(([key, label]) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={data.marble.types[key]}
                          onCheckedChange={(checked) =>
                            setData((prev) => ({
                              ...prev,
                              marble: {
                                ...prev.marble,
                                types: { ...prev.marble.types, [key]: !!checked },
                              },
                            }))
                          }
                        />
                        <span className="text-sm font-bold text-charcoal">{label}</span>
                      </label>
                    ))}
                  </div>
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

            {/* ====== MANUFACTURING MATERIAL ====== */}
            <SectionCard
              title="مادة التصنيع"
              icon={<Layers className="w-5 h-5" />}
            >
              <div className="space-y-3">
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-2">نوع مادة التصنيع:</p>
                  <div className="flex flex-wrap gap-4">
                    {([
                      ["mdf", "MDF"],
                      ["plywood", "Plywood"],
                    ] as const).map(([key, label]) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={data.material.types[key]}
                          onCheckedChange={(checked) =>
                            setData((prev) => ({
                              ...prev,
                              material: {
                                ...prev.material,
                                types: { ...prev.material.types, [key]: !!checked },
                              },
                            }))
                          }
                        />
                        <span className="text-sm font-bold text-charcoal">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {data.materialNotes.map((row, idx) => (
                  <div key={row.id} className="flex gap-2 items-start group mb-2">
                    <span className="flex items-center justify-center w-7 h-9 text-xs font-bold text-muted-foreground shrink-0">
                      {idx + 1}
                    </span>
                    <Input
                      placeholder="ملاحظة..."
                      value={row.note}
                      onChange={(e) =>
                        updateRow<NoteRow>("materialNotes", row.id, "note", e.target.value)
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                      onClick={() => removeRow("materialNotes", row.id)}
                      disabled={data.materialNotes.length <= 1}
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
                    addRow("materialNotes", () => ({
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
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-2">نوع المقبض:</p>
                  <div className="flex flex-wrap gap-4">
                    {([
                      ["gola", "(Gola) كولا"],
                      ["jPull", "(J-Pull) حفر"],
                      ["push", "(Push) كبس"],
                      ["handle", "(Handle) يدة"],
                    ] as const).map(([key, label]) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={data.doorInfo.handleTypes[key]}
                          onCheckedChange={(checked) =>
                            setData((prev) => ({
                              ...prev,
                              doorInfo: {
                                ...prev.doorInfo,
                                handleTypes: { ...prev.doorInfo.handleTypes, [key]: !!checked },
                              },
                            }))
                          }
                        />
                        <span className="text-sm font-bold text-charcoal">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

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

            {/* ====== ELECTRICAL APPLIANCES ====== */}
            <SectionCard
              title="كهربائيات"
              icon={<Zap className="w-5 h-5" />}
            >
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground mb-2">
                  حدد الأجهزة الكهربائية المطلوب تجهيز أماكن لها
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    ["oven", "فرن"],
                    ["microwave", "مايكروويف"],
                    ["dishwasher", "غسالة صحون"],
                    ["washingMachine", "غسالة ملابس"],
                  ] as const).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={data.electricalAppliances[key]}
                        onCheckedChange={(checked) =>
                          setData((prev) => ({
                            ...prev,
                            electricalAppliances: {
                              ...prev.electricalAppliances,
                              [key]: !!checked,
                            },
                          }))
                        }
                      />
                      <span className="text-sm font-bold text-charcoal">{label}</span>
                    </label>
                  ))}
                </div>
                {data.electricalNotes.map((row, idx) => (
                  <div key={row.id} className="flex gap-2 items-start group">
                    <span className="flex items-center justify-center w-7 h-9 text-xs font-bold text-muted-foreground shrink-0">
                      {idx + 1}
                    </span>
                    <Input
                      placeholder="ملاحظة..."
                      value={row.note}
                      onChange={(e) =>
                        updateRow<NoteRow>("electricalNotes", row.id, "note", e.target.value)
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                      onClick={() => removeRow("electricalNotes", row.id)}
                      disabled={data.electricalNotes.length <= 1}
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
                    addRow("electricalNotes", () => ({
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

            {/* ====== DRAWERS ====== */}
            <SectionCard
              title="مجرات"
              icon={<Columns3 className="w-5 h-5" />}
            >
              <div className="space-y-3">
                <div className="hidden sm:grid grid-cols-[0.6fr_0.6fr_1fr_auto] gap-2 text-xs font-black uppercase text-muted-foreground px-1">
                  <span>عدد المجرات</span>
                  <span>عدد الوجوه</span>
                  <span>ملاحظات</span>
                  <span className="w-9" />
                </div>
                <Separator className="hidden sm:block" />

                {data.drawers.map((row, idx) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-1 sm:grid-cols-[0.6fr_0.6fr_1fr_auto] gap-2 items-start group"
                  >
                    <Input
                      placeholder="عدد المجرات"
                      type="number"
                      min="0"
                      value={row.drawerCount}
                      onChange={(e) =>
                        updateRow<DrawerRow>("drawers", row.id, "drawerCount", e.target.value)
                      }
                    />
                    <Input
                      placeholder="عدد الوجوه"
                      type="number"
                      min="0"
                      value={row.faceCount}
                      onChange={(e) =>
                        updateRow<DrawerRow>("drawers", row.id, "faceCount", e.target.value)
                      }
                    />
                    <Input
                      placeholder="ملاحظات (اختياري)"
                      value={row.notes}
                      onChange={(e) =>
                        updateRow<DrawerRow>("drawers", row.id, "notes", e.target.value)
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors self-center"
                      onClick={() => removeRow("drawers", row.id)}
                      disabled={data.drawers.length <= 1}
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
                    addRow("drawers", () => ({
                      id: generateId(),
                      drawerCount: "",
                      faceCount: "",
                      notes: "",
                    }))
                  }
                >
                  <Plus className="w-4 h-4" />
                  إضافة صف
                </Button>
              </div>
            </SectionCard>

            {/* ====== TOWER CABINETS ====== */}
            <SectionCard
              title="كابينات عمودية"
              icon={<PanelTop className="w-5 h-5" />}
            >
              <div className="space-y-3">
                <div className="hidden sm:grid grid-cols-[0.8fr_0.8fr_0.5fr_1fr_auto] gap-2 text-xs font-black uppercase text-muted-foreground px-1">
                  <span>النوع</span>
                  <span>الموقع</span>
                  <span>القياس</span>
                  <span>ملاحظات</span>
                  <span className="w-9" />
                </div>
                <Separator className="hidden sm:block" />

                {data.towerCabinets.map((row, idx) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-1 sm:grid-cols-[0.8fr_0.8fr_0.5fr_1fr_auto] gap-2 items-start group"
                  >
                    <Input
                      placeholder="النوع"
                      value={row.type}
                      onChange={(e) =>
                        updateRow<TowerCabinetRow>("towerCabinets", row.id, "type", e.target.value)
                      }
                    />
                    <Input
                      placeholder="الموقع"
                      value={row.location}
                      onChange={(e) =>
                        updateRow<TowerCabinetRow>("towerCabinets", row.id, "location", e.target.value)
                      }
                    />
                    <Input
                      placeholder="القياس"
                      value={row.size}
                      onChange={(e) =>
                        updateRow<TowerCabinetRow>("towerCabinets", row.id, "size", e.target.value)
                      }
                    />
                    <Input
                      placeholder="ملاحظات (اختياري)"
                      value={row.notes}
                      onChange={(e) =>
                        updateRow<TowerCabinetRow>("towerCabinets", row.id, "notes", e.target.value)
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors self-center"
                      onClick={() => removeRow("towerCabinets", row.id)}
                      disabled={data.towerCabinets.length <= 1}
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
                    addRow("towerCabinets", () => ({
                      id: generateId(),
                      type: "",
                      location: "",
                      size: "",
                      notes: "",
                    }))
                  }
                >
                  <Plus className="w-4 h-4" />
                  إضافة كابينة
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
                      placeholder="مثال: تركيب إضاءة LED داخلية، فتحة للساحبة بقياس 60 سم، ..."
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

            {/* ====== FRONT PAYMENT ====== */}
            <SectionCard
              title="العربون"
              icon={<Banknote className="w-5 h-5" />}
            >
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={data.frontPayment.received}
                    onCheckedChange={(checked) =>
                      setData((prev) => ({
                        ...prev,
                        frontPayment: {
                          ...prev.frontPayment,
                          received: !!checked,
                        },
                      }))
                    }
                  />
                  <span className="text-sm font-bold text-charcoal">تم استلام العربون</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
                  <Input
                    placeholder="المبلغ"
                    value={data.frontPayment.amount}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        frontPayment: {
                          ...prev.frontPayment,
                          amount: e.target.value,
                        },
                      }))
                    }
                  />
                  <div className="flex gap-2">
                    {([
                      ["دينار", "دينار عراقي"],
                      ["دولار", "دولار"],
                    ] as const).map(([value, label]) => (
                      <label key={value} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={data.frontPayment.currency === value}
                          onCheckedChange={(checked) =>
                            setData((prev) => ({
                              ...prev,
                              frontPayment: {
                                ...prev.frontPayment,
                                currency: checked ? value : "",
                              },
                            }))
                          }
                        />
                        <span className="text-sm font-bold text-charcoal whitespace-nowrap">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {data.frontPaymentNotes.map((row, idx) => (
                  <div key={row.id} className="flex gap-2 items-start group mb-2">
                    <span className="flex items-center justify-center w-7 h-9 text-xs font-bold text-muted-foreground shrink-0">
                      {idx + 1}
                    </span>
                    <Input
                      placeholder="ملاحظة..."
                      value={row.note}
                      onChange={(e) =>
                        updateRow<NoteRow>("frontPaymentNotes", row.id, "note", e.target.value)
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                      onClick={() => removeRow("frontPaymentNotes", row.id)}
                      disabled={data.frontPaymentNotes.length <= 1}
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
                    addRow("frontPaymentNotes", () => ({
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

            {/* ====== TOTAL PRICE ====== */}
            <SectionCard
              title="السعر الإجمالي"
              icon={<Calculator className="w-5 h-5" />}
            >
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>السعر الكلي</Label>
                    <Input
                      placeholder="السعر الإجمالي للعقد"
                      value={data.totalPrice}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          totalPrice: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>المبلغ المدفوع</Label>
                    <Input
                      placeholder="إجمالي المبلغ المدفوع (شامل العربون)"
                      value={data.totalPaid}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          totalPaid: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                {data.frontPayment.amount && (
                  <p className="text-xs text-muted-foreground">
                    العربون المستلم: {data.frontPayment.amount} {data.frontPayment.currency === "دينار" ? "دينار عراقي" : data.frontPayment.currency === "دولار" ? "دولار" : ""}
                  </p>
                )}
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
