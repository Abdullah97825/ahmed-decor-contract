"use client";

import { useState, useCallback } from "react";
import {
  User,
  Ruler,
  Palette,
  FlowerIcon as EngravingIcon,
  DoorOpen,
  Plus,
  Trash2,
  Printer,
  Sparkles,
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
  ColorRow,
  EngravingRow,
  DoorNote,
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
  function addRow<T extends { id: string }>(
    key: "dimensions" | "colors" | "engravings" | "doors",
    factory: () => T
  ) {
    setData((prev) => ({
      ...prev,
      [key]: [...(prev[key] as unknown as T[]), factory()],
    }));
  }

  function removeRow(key: "dimensions" | "colors" | "engravings" | "doors", id: string) {
    setData((prev) => ({
      ...prev,
      [key]: (prev[key] as unknown as { id: string }[]).filter((r) => r.id !== id),
    }));
  }

  function updateRow<T extends { id: string }>(
    key: "dimensions" | "colors" | "engravings" | "doors",
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
        {/* Decorative background pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="wood-grain"
                x="0"
                y="0"
                width="200"
                height="200"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 50 Q50 45 100 50 T200 50"
                  fill="none"
                  stroke="#8B6914"
                  strokeWidth="1"
                />
                <path
                  d="M0 100 Q50 95 100 100 T200 100"
                  fill="none"
                  stroke="#8B6914"
                  strokeWidth="0.5"
                />
                <path
                  d="M0 150 Q50 145 100 150 T200 150"
                  fill="none"
                  stroke="#8B6914"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wood-grain)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Logo size="lg" className="justify-center mb-3" />
            <div className="inline-flex items-center gap-2 bg-charcoal text-cream px-5 py-2 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-gold" />
              عقد تصنيع مطبخ
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
                <div className="hidden sm:grid grid-cols-[1fr_0.7fr_0.7fr_1fr_auto] gap-2 text-xs font-semibold text-muted-foreground px-1">
                  <span>الجدار / القسم</span>
                  <span>الطول (م)</span>
                  <span>الارتفاع (م)</span>
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
                      placeholder="الطول"
                      type="number"
                      step="0.01"
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
                      placeholder="الارتفاع"
                      type="number"
                      step="0.01"
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
                      className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity self-center"
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
                  className="mt-2 border-dashed border-gold/40 text-gold-hover hover:bg-gold/5 hover:text-gold"
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
              </div>
            </SectionCard>

            {/* ====== COLORS ====== */}
            <SectionCard
              title="الألوان"
              icon={<Palette className="w-5 h-5" />}
            >
              <div className="space-y-3">
                <div className="hidden sm:grid grid-cols-[0.8fr_1fr_auto] gap-2 text-xs font-semibold text-muted-foreground px-1">
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
                      className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity self-center"
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
                  className="mt-2 border-dashed border-gold/40 text-gold-hover hover:bg-gold/5 hover:text-gold"
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
                <div className="hidden sm:grid grid-cols-[0.8fr_1fr_auto] gap-2 text-xs font-semibold text-muted-foreground px-1">
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
                      className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity self-center"
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
                  className="mt-2 border-dashed border-gold/40 text-gold-hover hover:bg-gold/5 hover:text-gold"
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
                      className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
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
                  className="mt-2 border-dashed border-gold/40 text-gold-hover hover:bg-gold/5 hover:text-gold"
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

            {/* ====== PRINT BUTTON ====== */}
            <div className="flex justify-center pt-4 pb-12">
              <Button
                size="lg"
                onClick={handlePrint}
                className="bg-gold hover:bg-gold-hover text-charcoal font-bold text-base px-10 py-6 rounded-xl shadow-lg shadow-gold/20 hover:shadow-gold/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
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
