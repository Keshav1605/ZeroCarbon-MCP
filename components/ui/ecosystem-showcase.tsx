"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

// Types
type CardId = "claude" | "cursor" | "windsurf" | "http";

interface IntegrationInfo {
  id: CardId;
  title: string;
  subtitle: string;
  category: string;
  iconName: string;
  iconColor: string;
  logo: React.ReactNode;
}

// Custom SVGs for Logos
const ClaudeLogo = ({ className = "fill-[#cc785c]" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`w-6 h-6 animate-pulse ${className}`} aria-hidden="true">
    <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
  </svg>
);

const CursorLogo = ({ className = "fill-slate-900" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`w-6 h-6 ${className}`} aria-hidden="true">
    <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
  </svg>
);

const WindsurfLogo = ({ className = "fill-[#00c0a9]" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`w-6 h-6 ${className}`} aria-hidden="true">
    <path d="M23.55 5.067c-1.2038-.002-2.1806.973-2.1806 2.1765v4.8676c0 .972-.8035 1.7594-1.7597 1.7594-.568 0-1.1352-.286-1.4718-.7659l-4.9713-7.1003c-.4125-.5896-1.0837-.941-1.8103-.941-1.1334 0-2.1533.9635-2.1533 2.153v4.8957c0 .972-.7969 1.7594-1.7596 1.7594-.57 0-1.1363-.286-1.4728-.7658L.4076 5.1598C.2822 4.9798 0 5.0688 0 5.2882v4.2452c0 .2147.0656.4228.1884.599l5.4748 7.8183c.3234.462.8006.9298 1.3509.9298 1.3771.313 2.6446-.747 2.6446-2.0977v-4.893c0-.972.7875-1.7593 1.7596-1.7593h.003a1.798 1.798 0 0 1 1.4718.7658l4.9723 7.0994c.4135.5905 1.05.941 1.8093.941 1.1587 0 2.1515-.9645 2.1515-2.153v-4.8948c0-.972.7875-1.7594 1.7596-1.7594h.194a.22.22 0 0 0 .2204-.2202v-4.622a.22.22 0 0 0-.2203-.2203Z" />
  </svg>
);

const HttpBridgeLogo = ({ className = "stroke-[#0EA5E9] fill-[#0EA5E9]/10" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`w-6 h-6 fill-none stroke-2 ${className}`} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 8v7M12 8L5 15M12 8l7 7" />
    <rect x="9" y="2" width="6" height="6" rx="1.5" />
    <rect x="2" y="15" width="6" height="6" rx="1.5" />
    <rect x="9" y="15" width="6" height="6" rx="1.5" />
    <rect x="16" y="15" width="6" height="6" rx="1.5" />
  </svg>
);

const renderLogo = (id: CardId, isSelected: boolean) => {
  switch (id) {
    case "claude":
      return <ClaudeLogo className={isSelected ? "fill-[#e89a7d]" : "fill-[#cc785c]"} />;
    case "cursor":
      return <CursorLogo className={isSelected ? "fill-white" : "fill-slate-900"} />;
    case "windsurf":
      return <WindsurfLogo className={isSelected ? "fill-[#00dfc4]" : "fill-[#00c0a9]"} />;
    case "http":
      return <HttpBridgeLogo className={isSelected ? "stroke-white fill-white/10" : "stroke-[#0EA5E9] fill-[#0EA5E9]/10"} />;
  }
};

const integrations: IntegrationInfo[] = [
  {
    id: "claude",
    title: "Claude 3.5",
    subtitle: "AI Assistant",
    category: "AI AGENT",
    iconName: "terminal",
    iconColor: "text-amber-500",
    logo: null as any,
  },
  {
    id: "cursor",
    title: "Cursor",
    subtitle: "IDE Integration",
    category: "IDE INTEGRATION",
    iconName: "code",
    iconColor: "text-emerald-500",
    logo: null as any,
  },
  {
    id: "windsurf",
    title: "Windsurf",
    subtitle: "AI IDE",
    category: "AI IDE",
    iconName: "waves",
    iconColor: "text-cyan-500",
    logo: null as any,
  },
  {
    id: "http",
    title: "HTTP Bridge",
    subtitle: "Custom Integration",
    category: "CUSTOM INTEGRATION",
    iconName: "lan",
    iconColor: "text-sky-500",
    logo: null as any,
  },
];

export function EcosystemShowcase() {
  const [activeCard, setActiveCard] = useState<CardId | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close panel on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveCard(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCardClick = (id: CardId) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <LayoutGroup id="ecosystem-layout-group">
      <div 
        ref={containerRef}
        className="max-w-container-max mx-auto px-grid-margin grid grid-cols-1 lg:grid-cols-2 gap-16 items-start text-text-main py-8"
      >
        {/* Left Side Column */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <div className="space-y-3">
            <p className="font-label-caps text-label-caps text-accent-green uppercase">
              Integration Hub
            </p>
            <h2 className="gsap-title font-headline-xl text-headline-xl max-md:text-headline-lg text-text-main leading-tight">
              Broad Ecosystem Support
            </h2>
            <p className="font-body-xl text-body-xl text-text-muted max-w-xl">
              Connect your favorite AI tools, IDEs, and platforms to ZeroCarbon MCP. One bridge. Unlimited possibilities.
            </p>
          </div>

          {/* Cards Grid (Left side, remaining in same place as buttons) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
            {integrations.map((integration) => {
              const isSelected = activeCard === integration.id;
              const isAnySelected = activeCard !== null;
              const isDimmed = isAnySelected && !isSelected;

              return (
                <motion.div
                  key={`left-${integration.id}`}
                  layoutId={`card-container-${integration.id}`}
                  initial={{ opacity: 1, scale: 1, y: 0 }}
                  onClick={() => handleCardClick(integration.id)}
                  whileHover={{ 
                    scale: isSelected ? 1.08 : 1.03, 
                    y: -6,
                    boxShadow: "0 12px 30px rgba(46,92,68,0.12)"
                  }}
                  animate={{
                    y: isSelected ? 0 : [0, -4, 0],
                    opacity: isDimmed ? 0.55 : 1,
                    scale: isSelected ? 1.08 : 1.0,
                    z: isSelected ? 30 : 0,
                  }}
                  transition={isSelected ? {
                    type: "tween",
                    ease: [0.22, 1, 0.36, 1],
                    duration: 0.5
                  } : {
                    y: {
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut",
                      delay: integrations.indexOf(integration) * 0.5
                    },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.35, ease: "easeOut" },
                  }}
                  className={`relative p-5 rounded-2xl cursor-pointer select-none transition-all duration-300 border flex items-center justify-between gap-4 shadow-sm h-24 ${
                    isSelected
                      ? "bg-primary text-on-primary border-accent-green shadow-[0_0_25px_rgba(46,92,68,0.35)] z-20"
                      : "bg-white border-outline-variant/20 hover:border-accent-green/40 hover:shadow-[0_0_15px_rgba(46,92,68,0.1)] text-text-main"
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={`${integration.title} integration details`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCardClick(integration.id);
                    }
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 flex items-center justify-center rounded-xl transition-colors duration-300 ${
                      isSelected ? "bg-white/10 text-white" : "bg-surface-mint text-accent-green"
                    }`}>
                      {renderLogo(integration.id, isSelected)}
                    </div>
                    <div>
                      <h3 className={`font-headline-lg text-[20px] ${isSelected ? "text-white" : "text-text-main"}`}>
                        {integration.title}
                      </h3>
                      <p className={`font-body-md text-xs mt-0.5 ${isSelected ? "text-primary-fixed-dim/80" : "text-text-muted"}`}>
                        {integration.subtitle}
                      </p>
                    </div>
                  </div>
                  <motion.span 
                    animate={{ x: isSelected ? 4 : 0 }}
                    className={`material-symbols-outlined text-xl transition-colors ${
                      isSelected ? "text-accent-green" : "text-text-muted group-hover:text-primary"
                    }`}
                  >
                    arrow_forward
                  </motion.span>
                </motion.div>
              );
            })}
          </div>

          {/* Statistics Grid (Preserves the exact count-up mechanism via data-count attributes) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 max-w-xl">
            <div>
              <p 
                className="font-stat-display text-stat-display text-accent-green font-bold text-[40px] leading-[48px]" 
                data-count="500" 
                data-count-suffix="+"
              >
                0
              </p>
              <p className="font-body-md text-text-muted text-sm mt-1">Emission Factors</p>
            </div>
            <div>
              <p 
                className="font-stat-display text-stat-display text-accent-green font-bold text-[40px] leading-[48px]" 
                data-count="24" 
                data-count-prefix="" 
                data-count-divider="/" 
                data-count-suffix="7"
              >
                0
              </p>
              <p className="font-body-md text-text-muted text-sm mt-1">Audit Support</p>
            </div>
            <div>
              <p 
                className="font-stat-display text-stat-display text-accent-green font-bold text-[40px] leading-[48px]" 
                data-count="99" 
                data-count-suffix=".9%"
              >
                0
              </p>
              <p className="font-body-md text-text-muted text-sm mt-1">Uptime SLA</p>
            </div>
            <div>
              <p 
                className="font-stat-display text-stat-display text-accent-green font-bold text-[40px] leading-[48px]" 
                data-count="200" 
                data-count-suffix="+"
              >
                0
              </p>
              <p className="font-body-md text-text-muted text-sm mt-1">Enterprise Teams</p>
            </div>
          </div>
        </div>

        {/* Right Side Column: Interactive showcase or accordion panel */}
        <div className="w-full relative h-full">
          {/* Desktop/Tablet Panel Container */}
          <div className="hidden md:block w-full bg-white border border-outline-variant/15 rounded-[40px] p-6 shadow-sm min-h-[500px] flex flex-col">
            <div className="text-center mb-8">
              <p className="font-label-caps text-label-caps text-text-muted uppercase">
                Click any integration to see how it works with ZeroCarbon MCP
              </p>
            </div>

            {/* Horizontal Row of synced Cards */}
            <div className="grid grid-cols-4 gap-4 relative z-10">
              {integrations.map((integration) => {
                const isSelected = activeCard === integration.id;
                const isAnySelected = activeCard !== null;
                const isDimmed = isAnySelected && !isSelected;

                return (
                  <motion.div
                    key={`right-row-${integration.id}`}
                    initial={{ opacity: 1, scale: 1 }}
                    onClick={() => handleCardClick(integration.id)}
                    whileHover={{ scale: isSelected ? 1.08 : 1.03, y: -4 }}
                    animate={{
                      opacity: isDimmed ? 0.55 : 1,
                      scale: isSelected ? 1.08 : 1.0,
                    }}
                    className={`p-4 rounded-xl cursor-pointer transition-all border flex flex-col items-center text-center gap-2 ${
                      isSelected
                        ? "bg-primary text-on-primary border-accent-green shadow-[0_0_20px_rgba(46,92,68,0.25)]"
                        : "bg-surface-mint/30 border-outline-variant/15 text-text-main hover:bg-surface-mint/50 hover:border-accent-green/30"
                    }`}
                  >
                    <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${
                      isSelected ? "bg-white/10 text-white" : "bg-surface-mint text-accent-green"
                    }`}>
                      {renderLogo(integration.id, isSelected)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{integration.title}</h4>
                      <p className={`font-body-md text-[10px] ${isSelected ? "text-primary-fixed-dim/75" : "text-text-muted"}`}>
                        {integration.subtitle}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* SVG Connecting Paths */}
            <div className="relative h-9 w-full -mt-1 pointer-events-none overflow-visible">
              <svg className="w-full h-full" viewBox="0 0 400 36" fill="none" preserveAspectRatio="none">
                {/* Dotted paths connecting horizontal cards (positioned at 12.5%, 37.5%, 62.5%, 87.5% width) to Center (50%, 100%) */}
                {[50, 150, 250, 350].map((xStart, index) => {
                  const cardId = integrations[index].id;
                  const isActive = activeCard === cardId;
                  
                  // Cubic bezier path to center bottom
                  const pathD = `M ${xStart} 0 C ${xStart} 18, 200 18, 200 36`;

                  return (
                    <g key={`path-${cardId}`}>
                      {/* Base path */}
                      <motion.path
                        d={pathD}
                        stroke={isActive ? "#2E5C44" : "#e3e3e0"}
                        strokeWidth={isActive ? 2 : 1.5}
                        strokeDasharray={isActive ? "none" : "4 4"}
                        initial={{ opacity: 0.5 }}
                        animate={isActive ? { strokeWidth: [2, 3, 2], opacity: [0.8, 1, 0.8] } : { opacity: 0.5 }}
                        transition={isActive ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : undefined}
                      />
                      {/* Moving pulse dot along active path */}
                      {isActive && (
                        <motion.circle
                          r="4"
                          fill="#2E5C44"
                          className="shadow-sm filter drop-shadow-[0_0_4px_#2E5C44]"
                        >
                          <animateMotion
                            path={pathD}
                            dur="2s"
                            repeatCount="indefinite"
                            calcMode="linear"
                          />
                        </motion.circle>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Expanded Premium Dark Panel */}
            <div className="relative flex-grow flex flex-col justify-start">
              <AnimatePresence mode="wait">
                {activeCard ? (
                  <motion.div
                    key={activeCard}
                    initial={{ opacity: 0, scale: 0.94, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 10 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full bg-primary text-white border border-white/5 rounded-3xl p-6 shadow-2xl flex-grow flex flex-col relative select-none"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                      <div>
                        <h3 className="font-headline-lg text-[22px] text-white flex items-center gap-2">
                          {activeCard === "claude" && "Claude 3.5 + ZeroCarbon MCP"}
                          {activeCard === "cursor" && "Cursor IDE Integration"}
                          {activeCard === "windsurf" && "Windsurf AI Agent"}
                          {activeCard === "http" && "HTTP Bridge"}
                        </h3>
                        <p className="font-body-md text-xs text-primary-fixed-dim/80 mt-1">
                          {activeCard === "claude" && "Ask. Analyze. Act on carbon data."}
                          {activeCard === "cursor" && "Embedded AI assistance with real-time compliance ledger."}
                          {activeCard === "windsurf" && "Active climate accounting automation agent."}
                          {activeCard === "http" && "ZeroCarbon MCP API Gateway and HTTP Bridge."}
                        </p>
                      </div>
                      
                      {/* Close button */}
                      <button
                        onClick={() => setActiveCard(null)}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
                        aria-label="Close integration panel"
                      >
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                    </div>

                    {/* Specific Panel Content */}
                    <div className="flex-grow">
                      {activeCard === "claude" && <ClaudeWorkflowContent />}
                      {activeCard === "cursor" && <CursorWorkflowContent />}
                      {activeCard === "windsurf" && <WindsurfWorkflowContent />}
                      {activeCard === "http" && <HttpBridgeWorkflowContent />}
                    </div>

                    {/* Secure Private Footer */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-white/50">
                      <span className="material-symbols-outlined text-sm text-accent-green">lock</span>
                      <span>Secure • Private • Enterprise Ready</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative w-full flex flex-col items-center justify-center text-text-muted/60 p-6 text-center border border-dashed border-outline-variant/20 rounded-3xl min-h-[360px]"
                  >
                    <span className="material-symbols-outlined text-4xl mb-3 text-accent-green/30">
                      insights
                    </span>
                    <p className="font-body-md text-sm max-w-xs">
                      Select an integration tool to view the live workflow sequence and ledger queries.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Accordion View (Rendered under grid in tablet/mobile) */}
          <div className="block md:hidden space-y-4">
            <AnimatePresence>
              {activeCard && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full bg-primary text-white border border-white/5 rounded-2xl overflow-hidden shadow-2xl p-5"
                >
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
                    <h3 className="font-semibold text-base">
                      {activeCard === "claude" && "Claude 3.5 + ZeroCarbon"}
                      {activeCard === "cursor" && "Cursor Integration"}
                      {activeCard === "windsurf" && "Windsurf AI Agent"}
                      {activeCard === "http" && "HTTP Bridge Details"}
                    </h3>
                    <button
                      onClick={() => setActiveCard(null)}
                      className="text-white/60 hover:text-white"
                      aria-label="Close details"
                    >
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                  </div>
                  
                  <div className="text-sm">
                    {activeCard === "claude" && <ClaudeWorkflowContent />}
                    {activeCard === "cursor" && <CursorWorkflowContent />}
                    {activeCard === "windsurf" && <WindsurfWorkflowContent />}
                    {activeCard === "http" && <HttpBridgeWorkflowContent />}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 text-[10px] text-white/40">
                    <span className="material-symbols-outlined text-[12px] text-accent-green">lock</span>
                    <span>Secure • Private • Enterprise Ready</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </LayoutGroup>
  );
}

// ==========================================
// 1. CLAUDE WORKFLOW CONTENT
// ==========================================
function ClaudeWorkflowContent() {
  const [dotsVisible, setDotsVisible] = useState(true);
  const [responseVisible, setResponseVisible] = useState(false);
  const [workflowStep, setWorkflowStep] = useState(0);

  useEffect(() => {
    // Phase 1: Typing dots pulse
    const timer1 = setTimeout(() => {
      setDotsVisible(false);
      setResponseVisible(true);
    }, 1500);

    // Phase 2: Stagger steps every 180ms
    const stepTimers: NodeJS.Timeout[] = [];
    for (let i = 1; i <= 5; i++) {
      const t = setTimeout(() => {
        setWorkflowStep(i);
      }, 1500 + i * 180);
      stepTimers.push(t);
    }

    return () => {
      clearTimeout(timer1);
      stepTimers.forEach(clearTimeout);
    };
  }, []);

  const stepsList = [
    "Intent Recognition",
    "MCP Tool Selection",
    "Carbon Ledger Query",
    "Emission Calculation",
    "Verified Response",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full items-stretch">
      {/* Left Column: Chat Conversation */}
      <div className="flex flex-col justify-between bg-black/35 rounded-2xl p-4 border border-white/5 h-[280px]">
        <div className="space-y-4 flex-grow overflow-y-auto">
          {/* User Prompt */}
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center select-none text-white/70">
              <span className="material-symbols-outlined text-[15px]">person</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[85%]">
              <p className="text-xs text-white/95 leading-relaxed font-mono">
                How much electricity did Mumbai office consume last month?
              </p>
            </div>
          </div>

          {/* Claude Response */}
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 flex items-center justify-center select-none">
                <ClaudeLogo className="w-6 h-6 fill-[#cc785c]" />
              </div>
              <div className="bg-amber-600/10 border border-amber-600/25 rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[85%] flex flex-col justify-center min-h-[44px]">
                {dotsVisible && (
                  <div className="flex items-center gap-1.5 py-1">
                    <span className="text-[10px] font-mono text-amber-500/80 mr-1">Claude is thinking</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                )}
                {responseVisible && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-amber-100/90 leading-relaxed font-mono"
                  >
                    Let me check the electricity consumption for Mumbai office for last month...
                  </motion.p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Card */}
        <AnimatePresence>
          {workflowStep >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0b1410] border border-accent-green/30 rounded-xl p-3 mt-4 flex items-center justify-between shadow-[0_4px_20px_rgba(46,92,68,0.2)]"
            >
              <div>
                <span className="text-[9px] uppercase tracking-wider font-label-caps text-accent-green font-bold">Facility Ledger</span>
                <h4 className="font-semibold text-xs text-white">Mumbai Office</h4>
                <p className="text-[10px] text-white/50 mt-0.5">Scope 2 emissions</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-accent-green flex items-center gap-1 justify-end font-sans">
                  12.4 <span className="text-xs font-normal text-white/70">MWh</span>
                </div>
                <span className="inline-flex items-center gap-1 rounded bg-accent-green/20 px-1.5 py-0.5 text-[8px] font-medium text-accent-green border border-accent-green/30">
                  <span className="w-1 h-1 rounded-full bg-accent-green animate-pulse"></span>
                  Verified
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Column: Workflow Steps */}
      <div className="bg-black/20 rounded-2xl p-5 border border-white/5 flex flex-col justify-between h-[280px] overflow-hidden">
        <div>
          <span className="text-[9px] uppercase tracking-wider font-label-caps text-white/40 block mb-4">
            ZeroCarbon Agent Execution Pipeline
          </span>
          <div className="relative space-y-4">
            {stepsList.map((stepName, index) => {
              const stepNum = index + 1;
              const isCompleted = workflowStep >= stepNum;
              const isCurrent = workflowStep === stepNum - 1;

              return (
                <div key={`step-${stepNum}`} className="flex items-center gap-4 relative z-10">
                  {/* Step bubble */}
                  <div className="relative">
                    <motion.div
                      animate={isCompleted ? { 
                        borderColor: "#2E5C44", 
                        backgroundColor: "#032416"
                      } : isCurrent ? {
                        borderColor: "#e3e3e0",
                        backgroundColor: "#1a1c1a"
                      } : {
                        borderColor: "rgba(255,255,255,0.1)",
                        backgroundColor: "rgba(3, 36, 22, 0)"
                      }}
                      className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-mono relative"
                    >
                      {isCompleted ? (
                        <span className="material-symbols-outlined text-sm text-accent-green">check</span>
                      ) : (
                        <span className={isCurrent ? "text-white animate-pulse" : "text-white/30"}>{stepNum}</span>
                      )}
                      
                      {/* Pulse circle for completion */}
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0.8 }}
                          animate={{ scale: 1.4, opacity: 0 }}
                          transition={{ duration: 0.6 }}
                          className="absolute inset-0 rounded-full border border-accent-green pointer-events-none"
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Step Label */}
                  <div className="flex-grow">
                    <p className={`text-xs font-mono font-medium transition-colors ${
                      isCompleted ? "text-accent-green" : isCurrent ? "text-white font-bold" : "text-white/30"
                    }`}>
                      {stepName}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Connecting line background */}
            <div className="absolute left-[13px] top-[14px] bottom-[14px] w-0.5 bg-white/5 z-0" />
            {/* Animated connection line progress */}
            <motion.div 
              className="absolute left-[13px] top-[14px] w-0.5 bg-accent-green z-0 origin-top"
              animate={{ 
                height: `${Math.min(100, Math.max(0, (workflowStep - 1) * 25))}%` 
              }}
              transition={{ duration: 0.25, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. CURSOR WORKFLOW CONTENT
// ==========================================
function CursorWorkflowContent() {
  const [editorText, setEditorText] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const fullCode = `const result = await mcp.calculateCarbon({
  scope: 2,
  facilityId: 'mumbai'
});`;

  useEffect(() => {
    // Type code character-by-character
    let currentIdx = 0;
    const typingInterval = setInterval(() => {
      if (currentIdx <= fullCode.length) {
        setEditorText(fullCode.slice(0, currentIdx));
        currentIdx++;
      } else {
        clearInterval(typingInterval);
        
        // After typing is complete, show terminal output line by line
        const lines = [
          "$ node test-mcp.js",
          "Initializing ZeroCarbon MCP connection...",
          "✓ Connected to mcp://localhost:3000",
          "Call: calculateCarbon({ facilityId: 'mumbai' })",
          "API Query: https://api.zerocarbon.com/v1/ledger...",
          "Result: 12.4 MWh (Scope 2) - Verified"
        ];
        
        lines.forEach((line, idx) => {
          setTimeout(() => {
            setTerminalLines(prev => [...prev, line]);
          }, idx * 300);
        });
      }
    }, 25);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full items-stretch font-mono">
      {/* Left: VS Code style editor */}
      <div className="bg-[#0b1410] border border-white/5 rounded-2xl p-4 flex flex-col justify-start h-[280px] relative overflow-hidden select-none">
        {/* Editor window buttons */}
        <div className="flex gap-1.5 mb-4 border-b border-white/5 pb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
          <span className="text-[10px] text-white/30 ml-2 font-sans select-none">test-mcp.js</span>
        </div>
        <div className="text-xs leading-relaxed text-slate-300 flex-grow whitespace-pre-wrap">
          {editorText}
          <span className="w-1.5 h-4 bg-accent-green inline-block ml-0.5 animate-pulse" />
        </div>
      </div>

      {/* Right: Pipeline & Terminal */}
      <div className="bg-black/25 border border-white/5 rounded-2xl p-4 flex flex-col justify-between h-[280px] overflow-hidden select-none">
        {/* Pipeline Nodes */}
        <div>
          <span className="text-[9px] uppercase tracking-wider font-label-caps text-white/40 block mb-3">
            Execution Flow
          </span>
          <div className="grid grid-cols-5 gap-1 items-center text-center text-[10px]">
            <div className="p-1 rounded bg-white/5 border border-white/10 text-white font-bold">Dev</div>
            <div className="text-accent-green select-none">→</div>
            <div className="p-1 rounded bg-accent-green/20 border border-accent-green/30 text-accent-green font-bold">Plugin</div>
            <div className="text-accent-green select-none">→</div>
            <div className="p-1 rounded bg-primary border border-accent-green text-white font-bold shadow-sm">MCP Core</div>
          </div>
        </div>

        {/* Console/Terminal Log output */}
        <div className="bg-black/50 border border-white/5 rounded-xl p-3 flex-grow mt-3 flex flex-col justify-end font-mono text-[11px] overflow-hidden min-h-[140px]">
          <div className="space-y-1.5 overflow-y-auto">
            {terminalLines.map((line, idx) => {
              const isCommand = line.startsWith("$");
              const isSuccess = line.startsWith("✓") || line.includes("Verified");
              return (
                <div 
                  key={idx} 
                  className={
                    isCommand 
                      ? "text-slate-400" 
                      : isSuccess 
                      ? "text-accent-green" 
                      : "text-slate-300/80"
                  }
                >
                  {line}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. WINDSURF WORKFLOW CONTENT
// ==========================================
function WindsurfWorkflowContent() {
  const [plannerStep, setPlannerStep] = useState(0);

  useEffect(() => {
    // Planner checklists check off every 800ms
    const timerList: NodeJS.Timeout[] = [];
    for (let i = 1; i <= 3; i++) {
      const t = setTimeout(() => {
        setPlannerStep(i);
      }, i * 700);
      timerList.push(t);
    }
    return () => timerList.forEach(clearTimeout);
  }, []);

  const planningTasks = [
    { label: "Calculate Scope 3", desc: "Identify supply chain emissions" },
    { label: "Analyze suppliers", desc: "Correlate vendor carbon tokens" },
    { label: "Create report", desc: "Publish audit-ready ESG bundle" }
  ];

  const workflowBlocks = [
    "AI Agent",
    "Planner",
    "ZeroCarbon Tools",
    "Report Generator",
    "Completed"
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full items-stretch">
      {/* Left: AI Planning Panel */}
      <div className="bg-black/35 border border-white/5 rounded-2xl p-5 flex flex-col justify-start h-[280px] overflow-hidden select-none">
        <span className="text-[9px] uppercase tracking-wider font-label-caps text-white/40 block mb-4">
          Windsurf Agent Plan
        </span>
        
        <div className="space-y-3 flex-grow">
          {planningTasks.map((task, idx) => {
            const taskNum = idx + 1;
            const isCompleted = plannerStep >= taskNum;
            const isCurrent = plannerStep === taskNum - 1;

            return (
              <div 
                key={idx} 
                className={`p-3 rounded-xl border transition-all duration-300 ${
                  isCompleted 
                    ? "bg-accent-green/10 border-accent-green/30 text-white" 
                    : isCurrent 
                    ? "bg-white/5 border-white/15 text-white shadow-sm"
                    : "bg-transparent border-white/5 text-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">{taskNum}.</span>
                    <span className="font-semibold text-xs font-mono">{task.label}</span>
                  </div>
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-sm text-accent-green">check_circle</span>
                  ) : isCurrent ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-green animate-ping" />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  )}
                </div>
                <p className={`text-[10px] mt-1 font-mono transition-colors ${
                  isCompleted ? "text-white/60" : isCurrent ? "text-white/70" : "text-white/10"
                }`}>
                  {task.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Workflow visual block diagram */}
      <div className="bg-black/20 border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-[280px] overflow-hidden select-none">
        <div>
          <span className="text-[9px] uppercase tracking-wider font-label-caps text-white/40 block mb-4">
            Pipeline Topology
          </span>
          <div className="space-y-3 relative">
            {workflowBlocks.map((block, idx) => {
              const stepNum = idx + 1;
              const isCompleted = plannerStep >= Math.min(3, Math.ceil(stepNum / 1.5));
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0.1, y: 5 }}
                  animate={{ 
                    opacity: isCompleted ? 1 : 0.25, 
                    y: 0,
                    scale: isCompleted ? 1 : 0.98
                  }}
                  className={`p-2.5 rounded-lg border text-center font-mono text-xs relative z-10 ${
                    idx === 4 && plannerStep >= 3
                      ? "bg-accent-green text-white border-accent-green shadow-sm"
                      : isCompleted
                      ? "bg-primary border-accent-green/40 text-white"
                      : "bg-transparent border-white/5 text-white/20"
                  }`}
                >
                  {block}
                </motion.div>
              );
            })}
            
            {/* Background line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-white/5 z-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. HTTP BRIDGE WORKFLOW CONTENT
// ==========================================
function HttpBridgeWorkflowContent() {
  const [flowPosition, setFlowPosition] = useState(0);

  useEffect(() => {
    // Flow positions: 0 (Client) -> 1 (HTTP Bridge) -> 2 (MCP Server) -> 3 (Carbon Calc) -> 4 (Ledger) -> 5 (Response)
    const interval = setInterval(() => {
      setFlowPosition(prev => {
        if (prev >= 5) {
          return 5;
        }
        return prev + 1;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const flowNodes = [
    { label: "Client", icon: "desktop_windows" },
    { label: "HTTP Bridge", icon: "lan" },
    { label: "MCP Server", icon: "dns" },
    { label: "Calculator", icon: "calculate" },
    { label: "Ledger", icon: "storage" },
    { label: "Response", icon: "check_circle" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full items-stretch">
      {/* Left: Request details */}
      <div className="bg-[#0b1410] border border-white/5 rounded-2xl p-4 flex flex-col justify-start h-[280px] overflow-hidden select-none font-mono">
        <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
          <span className="text-[10px] text-accent-green font-bold uppercase tracking-wider">POST Request</span>
          <span className="text-[10px] text-white/30">API endpoint</span>
        </div>
        <div className="space-y-3 text-[11px] leading-relaxed text-slate-300">
          <div>
            <span className="text-white/40">URL:</span>{" "}
            <span className="text-amber-200">https://api.zerocarbon.com/v1/calculate</span>
          </div>
          <div>
            <span className="text-white/40">Headers:</span>
            <div className="pl-4 text-slate-400">
              Content-Type: application/json<br />
              Authorization: Bearer zc_live_99f...
            </div>
          </div>
          <div>
            <span className="text-white/40">Payload:</span>
            <div className="pl-4 text-emerald-200/90 whitespace-pre">
{`{
  "facility": "mumbai",
  "scope": 2,
  "period": "last_month"
}`}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Flow timeline & Response card */}
      <div className="bg-black/20 border border-white/5 rounded-2xl p-4 flex flex-col justify-between h-[280px] overflow-hidden select-none">
        <div>
          <span className="text-[9px] uppercase tracking-wider font-label-caps text-white/40 block mb-4">
            Network Request Flow
          </span>
          <div className="grid grid-cols-3 gap-3">
            {flowNodes.map((node, idx) => {
              const isActive = flowPosition >= idx;
              const isCurrent = flowPosition === idx;

              return (
                <div
                  key={idx}
                  className={`p-2 rounded-lg border text-center transition-all duration-300 flex flex-col items-center justify-center gap-1.5 ${
                    isCurrent
                      ? "bg-accent-green border-accent-green text-white shadow-sm scale-105"
                      : isActive
                      ? "bg-primary border-accent-green/30 text-white"
                      : "bg-transparent border-white/5 text-white/20"
                  }`}
                >
                  <span className={`material-symbols-outlined text-base ${
                    isCurrent ? "text-white animate-pulse" : isActive ? "text-accent-green" : "text-white/10"
                  }`}>
                    {node.icon}
                  </span>
                  <span className="font-mono text-[9px] truncate max-w-full">{node.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Response Card sliding up */}
        <div className="flex-grow flex items-end">
          <AnimatePresence>
            {flowPosition >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-[#0b1410] border border-accent-green/20 rounded-xl p-3 font-mono text-[10px] text-slate-300 shadow-md whitespace-pre overflow-y-auto max-h-[105px]"
              >
                <div className="flex justify-between items-center text-white/30 border-b border-white/5 pb-1 mb-1.5 font-sans">
                  <span>RESPONSE payload</span>
                  <span className="text-accent-green">200 OK</span>
                </div>
{`{
  "status": "success",
  "data": {
    "facility": "mumbai_hq",
    "emissions_co2e_kg": 420.5,
    "audit_hash": "0x9c4f...a3e8"
  }
}`}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
