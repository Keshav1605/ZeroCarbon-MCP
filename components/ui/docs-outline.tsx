"use client";

import React from "react";
import { motion } from "framer-motion";

export interface OutlineItem {
  id: string;
  label: string;
}

export interface DocsOutlineProps {
  items: OutlineItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
}

export function DocsOutline({ items = [], activeId = "", onSelect }: DocsOutlineProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (onSelect) {
      onSelect(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        const offset = 90; // Header offset
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block fixed top-24 bottom-0 right-8 w-60 py-4 px-4 overflow-y-auto z-10 select-none">
      <div className="space-y-4">
        <h5 className="font-body-md text-[10px] font-bold text-neutral-400 dark:text-text-muted tracking-[0.16em] uppercase">
          On this page
        </h5>

        <div className="relative pl-0">
          {/* Continuous vertical track line (skiper60 style) */}
          <div className="absolute left-0 top-1 bottom-1 w-[1.5px] bg-neutral-200/60 dark:bg-outline-variant/15" />

          <ul className="space-y-3 list-none p-0 m-0 relative">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id} className="pl-4 relative flex items-center min-h-[24px]">
                  {/* Sliding Active Indicator Line (skiper60 style) */}
                  {isActive && (
                    <motion.div
                      layoutId="outline-active-indicator"
                      className="absolute left-[-1.5px] top-0 bottom-0 w-[3px] bg-accent-green rounded-full shadow-[0_0_8px_rgba(46,92,68,0.5)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleLinkClick(e, item.id)}
                    className={`text-xs font-semibold block transition-colors duration-200 hover:text-neutral-800 dark:hover:text-text-main leading-normal cursor-pointer select-none ${
                      isActive
                        ? "text-accent-green font-bold"
                        : "text-neutral-400 dark:text-text-muted"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default DocsOutline;
