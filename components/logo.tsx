import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const CHARCOAL = "#3C4146";
const GOLD = "#F2D000";

function colorizeText(text: string) {
  return text.split("").map((char, i) => (
    <span
      key={i}
      style={{ color: char.toUpperCase() === "E" ? GOLD : CHARCOAL }}
    >
      {char}
    </span>
  ));
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg tracking-wide",
    md: "text-2xl tracking-wider",
    lg: "text-4xl tracking-widest",
  };

  return (
    <div dir="ltr" className={cn("font-black select-none", sizeClasses[size], className)}>
      <span className="inline-flex">{colorizeText("AHMED")}</span>
      <span className="mx-1.5" />
      <span className="inline-flex">{colorizeText("DECOR")}</span>
    </div>
  );
}

/** Minimal print version — always uses charcoal + gold, no extra styling */
export function LogoPrint({ className }: { className?: string }) {
  return (
    <div dir="ltr" className={cn("font-black text-2xl tracking-wider select-none", className)}>
      <span className="inline-flex">{colorizeText("AHMED")}</span>
      <span className="mx-1.5" />
      <span className="inline-flex">{colorizeText("DECOR")}</span>
    </div>
  );
}
