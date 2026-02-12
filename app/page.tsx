import Link from "next/link";
import { Logo } from "@/components/logo";

const forms = [
  {
    href: "/contract",
    title: "عقد تصنيع",
    subtitle: "إنشاء عقد تصنيع مطبخ أو ديكور جديد",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
      </svg>
    ),
  },
  {
    href: "/survey",
    title: "استمارة كشف أولي",
    subtitle: "استمارة فارغة لتسجيل قياسات الموقع",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
        <path d="m14.5 12.5 2-2" /><path d="m11.5 9.5 2-2" /><path d="m8.5 6.5 2-2" /><path d="m17.5 15.5 2-2" />
      </svg>
    ),
  },
  {
    href: "/graph-paper",
    title: "ورقة رسم بياني",
    subtitle: "ورقة مربعات للرسم اليدوي في الموقع",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" /><path d="M3 15h18" /><path d="M9 3v18" /><path d="M15 3v18" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cream"
      style={{
        backgroundImage: `radial-gradient(circle, #3C414620 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    >
      {/* Header */}
      <div className="pt-16 pb-10 flex flex-col items-center gap-6">
        <Logo size="lg" />
        <div className="text-center">
          <h1 className="text-charcoal text-xl font-bold tracking-wide">
            أحمد ديكور — نظام النماذج
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            اختر النموذج المطلوب للبدء
          </p>
        </div>
      </div>

      {/* Cards grid */}
      <div className="max-w-2xl mx-auto px-6 pb-20 flex flex-col gap-5">
        {forms.map((form) => (
          <Link
            key={form.href}
            href={form.href}
            className="group block border-2 border-charcoal bg-white shadow-[4px_4px_0px_#3C4146] hover:shadow-[6px_6px_0px_#F2D000] hover:border-gold transition-all duration-150"
          >
            {/* Gold accent bar */}
            <div className="h-1 bg-gold" />
            <div className="flex items-center gap-5 p-6">
              {/* Icon box */}
              <div className="flex-shrink-0 w-14 h-14 border-2 border-charcoal bg-gold-light flex items-center justify-center text-charcoal group-hover:bg-gold group-hover:text-charcoal transition-colors duration-150">
                {form.icon}
              </div>
              {/* Text */}
              <div className="flex-1 min-w-0">
                <h2 className="text-charcoal text-lg font-black tracking-wide">
                  {form.title}
                </h2>
                <p className="text-muted-foreground text-sm mt-0.5">
                  {form.subtitle}
                </p>
              </div>
              {/* Arrow */}
              <svg
                className="flex-shrink-0 w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors -scale-x-100"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </Link>
        ))}

        {/* Standalone files note */}
        <div className="mt-4 border-2 border-dashed border-charcoal/20 bg-warm-gray/50 p-5">
          <p className="text-muted-foreground text-xs font-bold mb-2 tracking-wide">
            ملفات HTML مستقلة
          </p>
          <div className="flex flex-wrap gap-3 text-xs">
            {[
              { name: "contract.html", label: "العقد" },
              { name: "survey-form.html", label: "استمارة الكشف" },
              { name: "graph-paper.html", label: "ورقة الرسم" },
            ].map((f) => (
              <span key={f.name} className="text-charcoal/60 font-mono">
                {f.name}
                <span className="text-charcoal/40 mr-1">({f.label})</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
