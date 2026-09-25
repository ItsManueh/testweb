"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { BrandIcon } from "@/components/BrandIcon";
import type { SiteLink } from "@/config/site";

export function LinkCard({ item }: { item: SiteLink }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(item.href);
      setCopied(true);
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative" style={{ "--brand": item.brand } as CSSProperties}>
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer me"
        className="surface-card brand-tint group flex items-center gap-4 rounded-4xl border py-4 pl-5 pr-12 transition-all duration-300 hover:-translate-y-0.5 sm:pr-24"
      >
        <span className="brand-chip grid size-10 shrink-0 place-items-center rounded-xl">
          <BrandIcon name={item.icon} className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-display text-lg font-bold tracking-tight">
              {item.label}
            </span>
            {item.tag ? (
              <span className="brand-pill rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest">
                {item.tag}
              </span>
            ) : null}
          </span>
          <span className="mt-0.5 block text-sm text-muted-foreground">
            {item.sublabel}
          </span>
        </span>
        <span className="absolute right-5 top-1/2 -translate-y-1/2">
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--brand)]"
          />
        </span>
      </a>
      <button
        type="button"
        onClick={copyLink}
        aria-label={`Copy ${item.label} link`}
        className="absolute right-12 top-1/2 hidden -translate-y-1/2 cursor-pointer rounded-full border border-border/70 p-2 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary sm:block"
      >
        {copied ? (
          <Check aria-hidden="true" className="size-4" />
        ) : (
          <Copy aria-hidden="true" className="size-4" />
        )}
      </button>
    </div>
  );
}
