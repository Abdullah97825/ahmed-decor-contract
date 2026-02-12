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
        "relative bg-card border-2 border-charcoal shadow-[4px_4px_0px_#3C4146] overflow-hidden",
        className
      )}
    >
      {/* Gold accent bar — thick top strip */}
      <div className="h-1 bg-gold" />

      <div className="p-6">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-charcoal/10">
          <div className="flex items-center justify-center w-9 h-9 border-2 border-charcoal bg-gold/10 text-charcoal">
            {icon}
          </div>
          <h2 className="text-base font-black uppercase tracking-wider text-charcoal">{title}</h2>
        </div>

        {/* Section content */}
        {children}
      </div>
    </div>
  );
}
