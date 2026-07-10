"use client";

import React, { useState } from "react";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export interface FaqAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: FaqItem[];
  title?: string;
}

export function FaqAccordion({
  items = [],
  title,
  className,
  ...props
}: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`w-full max-w-3xl mx-auto py-8 relative font-sans ${className || ""}`} {...props}>
      {title && (
        <h2 className="gsap-title text-center font-headline-xl text-headline-xl mb-12 text-primary">
          {title}
        </h2>
      )}
      
      <ul className="w-full mx-auto list-none p-0 flex flex-col border border-outline-variant/15 rounded-3xl overflow-hidden shadow-sm bg-white/70 backdrop-blur-md">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <li
              key={index}
              className={`w-full relative transition-all duration-300 ease-in border-b border-outline-variant/10 last:border-b-0`}
            >
              <button
                className={`flex flex-row items-center justify-start w-full min-h-[60px] py-5 relative m-0 px-6 pl-14 cursor-pointer border-0 border-l-[6px] transition-all duration-300 text-left outline-none text-base md:text-lg font-body-md ${
                  isActive 
                    ? "border-l-primary bg-surface-mint/40 text-primary font-bold" 
                    : "border-l-accent-green/20 bg-transparent text-text-main hover:border-l-accent-green hover:text-primary hover:bg-surface-mint/10"
                }`}
                onClick={() => toggleItem(index)}
                aria-expanded={isActive}
              >
                {/* Plus/Minus Icon */}
                <span 
                  className={`absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-300 leading-none ${
                    isActive 
                      ? "text-[28px] md:text-[34px] font-normal text-primary" 
                      : "text-[20px] md:text-[24px] font-normal text-accent-green/70"
                  }`}
                >
                  {isActive ? "−" : "+"}
                </span>
                
                <span className="pr-8 select-none">{item.question}</span>
                
                {/* Chevron */}
                <span 
                  className={`absolute right-6 block w-2 h-2 border-t-[2.5px] border-r-[2.5px] transition-transform duration-300 ease-in-out ${
                    isActive 
                      ? "rotate-[-44deg] border-primary" 
                      : "rotate-[133deg] border-accent-green/60"
                  }`}
                />
              </button>

              <div 
                className={`grid transition-all duration-300 ease-in-out w-full border-0 border-l-[6px] ${
                  isActive 
                    ? "grid-rows-[1fr] border-l-primary bg-surface-mint/40" 
                    : "grid-rows-[0fr] border-l-accent-green/20 bg-transparent"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-row items-start justify-start w-full px-6 pl-14 pb-6 pt-1 text-sm md:text-base font-normal text-text-muted leading-relaxed font-body-md">
                    <span className="opacity-95">{item.answer}</span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FaqAccordion;
