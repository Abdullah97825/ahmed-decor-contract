"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface SectionCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SectionCard({ title, icon, children, className }: SectionCardProps) {
  return (
    <div
      className={cn(
        "relative bg-card rounded-xl border border-border shadow-sm overflow-hidden",
        className
      )}
    >
      {/* Gold accent bar on the right (RTL) */}
      <div className="absolute top-0 right-0 bottom-0 w-1 bg-gold" />

      <div className="p-6">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gold/10 text-gold">
            {icon}
          </div>
          <h2 className="text-lg font-bold text-charcoal">{title}</h2>
        </div>

        {/* Section content */}
        {children}
      </div>
    </div>
  );
}
