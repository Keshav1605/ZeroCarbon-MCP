"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import Image from "next/image";
import dynamic from "next/dynamic";
import AnimatedButton from "../components/ui/animated-button";
import NotchNavbar from "../components/ui/notch-navbar";
import { LogoCloud } from "../components/ui/logo-cloud";
const StackedSteps = dynamic(() => import("../components/ui/stacked-steps").then(mod => mod.StackedSteps), {
  ssr: false,
  loading: () => <div className="min-h-[400px] w-full bg-surface-container-low animate-pulse rounded-[40px] flex items-center justify-center text-text-muted">Loading steps...</div>
});

const EcosystemShowcase = dynamic(() => import("../components/ui/ecosystem-showcase").then(mod => mod.EcosystemShowcase), {
  ssr: false,
  loading: () => <div className="min-h-[400px] w-full bg-surface-container-low animate-pulse rounded-[40px] flex items-center justify-center text-text-muted">Loading ecosystem...</div>
});

const PlatformNetwork = dynamic(() => import("../components/ui/platform-network").then(mod => mod.PlatformNetwork), {
  ssr: false,
  loading: () => <div className="min-h-[400px] w-full bg-surface-container-low animate-pulse rounded-[40px] flex items-center justify-center text-text-muted">Loading network...</div>
});

const McpFlow = dynamic(() => import("../components/ui/mcp-flow"), {
  ssr: false,
  loading: () => <div className="w-full aspect-4/3 bg-surface-mint/30 animate-pulse rounded-[40px] flex items-center justify-center text-text-muted">Loading visualization...</div>
});

const HeroInteractiveFlow = dynamic(() => import("../components/ui/HeroInteractiveFlow"), {
  ssr: false,
  loading: () => <div className="w-full max-w-5xl aspect-video mx-auto bg-surface-mint/30 animate-pulse rounded-2xl flex items-center justify-center text-text-muted">Loading flow...</div>
});

const FaqAccordion = dynamic(() => import("../components/ui/faq-accordion"), {
  ssr: true,
});

// Register GSAP plugins once at module level
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const [leftColumnHeight, setLeftColumnHeight] = useState<number | null>(null);
  const [isMcpModalOpen, setIsMcpModalOpen] = useState(false);
  const [activeMcpTab, setActiveMcpTab] = useState("claude");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Get lenis instance for programmatic scrollTo calls
  const lenis = useLenis();

  // Measure left column height
  useEffect(() => {
    const updateHeight = () => {
      if (leftColumnRef.current) {
        setLeftColumnHeight(leftColumnRef.current.offsetHeight);
      }
    };

    // Initial measurement
    updateHeight();

    // Update on resize
    const resizeObserver = new ResizeObserver(updateHeight);
    if (leftColumnRef.current) {
      resizeObserver.observe(leftColumnRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // Note: Lenis <-> GSAP sync is handled globally in ScrollProvider (single RAF loop)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(targetId, {
        offset: -80,
        duration: 1.4,
        // Expo easing — fast start, silky landing, matching Lenis's own curve
        easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      });
    }
  };



  useGSAP(() => {
    if (typeof window === "undefined") return;

    // Respect user's reduced-motion OS preference — skip all JS animations
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // ─── Shared defaults ────────────────────────────────────────────────────
    // force3D: true ensures GSAP always uses 3D transforms (translateZ(0)),
    // which forces the browser to paint these elements on the GPU compositor
    // layer — preventing jank caused by main-thread repaints during scroll.
    const defaults = {
      force3D: true,
      // clearProps: "transform,opacity" — after animation completes, remove
      // will-change and transform from the inline style so the GPU layer is
      // released. Using "all" would strip useful inherited CSS too.
      clearProps: "transform,opacity",
    };

    // ─── 1. Hero entrance — fires immediately on mount ───────────────────────
    // autoAlpha: smoother than opacity alone — also sets visibility:hidden
    // so off-screen elements don't receive pointer events before animating in.
    gsap.fromTo(
      ".hero-animate",
      { autoAlpha: 0, y: 48, force3D: true },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.13,
        ease: "expo.out",    // exponential: blazing fast start, incredibly soft landing
        clearProps: "transform,opacity,visibility",
        force3D: true,
      }
    );

    // ─── 2. Section title clip-path reveals ────────────────────────────────
    const titles = gsap.utils.toArray<HTMLElement>(".gsap-title");
    titles.forEach((title) => {
      gsap.fromTo(
        title,
        { clipPath: "inset(0 100% 0 0)", autoAlpha: 0, y: 16, force3D: true },
        {
          clipPath: "inset(0 0% 0 0)",
          autoAlpha: 1,
          y: 0,
          duration: 1.15,
          ease: "expo.out",
          force3D: true,
          clearProps: "transform,opacity,visibility,clip-path",
          scrollTrigger: {
            trigger: title,
            start: "top 82%",
            once: true,
          },
        }
      );
    });

    // ─── 3. Feature cards stagger ───────────────────────────────────────────
    if (document.querySelector(".feature-card")) {
      gsap.fromTo(
        ".feature-card",
        { autoAlpha: 0, y: 52, force3D: true },
        {
          ...defaults,
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: { each: 0.13, ease: "power1.inOut" },
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#features",
            start: "top 82%",
            once: true,
          },
        }
      );
    }

    // ─── 4. Pricing cards stagger ───────────────────────────────────────────
    if (document.querySelector(".pricing-card")) {
      gsap.fromTo(
        ".pricing-card",
        { autoAlpha: 0, y: 52, force3D: true },
        {
          ...defaults,
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: { each: 0.13, ease: "power1.inOut" },
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#pricing",
            start: "top 82%",
            once: true,
          },
        }
      );
    }

    // ─── 5. Count-up stats ──────────────────────────────────────────────────
    const stats = gsap.utils.toArray<HTMLElement>("[data-count]");
    if (stats.length > 0 && document.querySelector("#architecture")) {
      stats.forEach((el) => {
        const target = Number(el.getAttribute("data-count") ?? "0");
        const suffix = el.getAttribute("data-count-suffix") ?? "";
        const prefix = el.getAttribute("data-count-prefix") ?? "";
        const divider = el.getAttribute("data-count-divider") ?? "";
        const counter = { val: 0 };

        gsap.to(counter, {
          val: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#architecture",
            start: "top 80%",
            once: true,
          },
          onUpdate: () => {
            const current = Math.round(counter.val);
            el.textContent = divider
              ? `${current}${divider}${suffix}`
              : `${prefix}${current}${suffix}`;
          },
        });
      });
    }

    // ─── 6. Architecture stagger items ──────────────────────────────────────
    if (document.querySelector("#architecture .stagger-item")) {
      gsap.fromTo(
        "#architecture .stagger-item",
        { autoAlpha: 0, y: 36, force3D: true },
        {
          ...defaults,
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#architecture",
            start: "top 80%",
            once: true,
          },
        }
      );
    }

    // ─── 7. Developer section ───────────────────────────────────────────────
    if (document.querySelector("#developers")) {
      gsap.fromTo(
        "#developers > div > div",
        { autoAlpha: 0, y: 28, force3D: true },
        {
          ...defaults,
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: { each: 0.09, ease: "power1.inOut" },
          scrollTrigger: {
            trigger: "#developers",
            start: "top 82%",
            once: true,
          },
        }
      );
    }

    // ─── 7b. Code lines typewriter reveal ────────────────────────────────────
    gsap.fromTo(
      ".code-line",
      { autoAlpha: 0, x: -12, force3D: true },
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#developers",
          start: "top 78%",
          once: true,
        },
      }
    );

    // ─── 7c. Sandbox 3D mouse tilt ──────────────────────────────────────────
    const codePanel = document.querySelector(".code-panel") as HTMLElement | null;
    if (codePanel) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = codePanel.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const dx = x - xc;
        const dy = y - yc;
        
        gsap.to(codePanel, {
          rotateY: (dx / xc) * 8, // max 8 deg tilt
          rotateX: -(dy / yc) * 8,
          x: (dx / xc) * 4,
          y: (dy / yc) * 4,
          duration: 0.35,
          ease: "power2.out",
          transformPerspective: 1200,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(codePanel, {
          rotateY: 0,
          rotateX: 0,
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      };

      codePanel.addEventListener("mousemove", handleMouseMove);
      codePanel.addEventListener("mouseleave", handleMouseLeave);
    }

    // ─── 8. Brand boxes (social proof) ──────────────────────────────────────
    if (document.querySelector(".brand-box")) {
      gsap.fromTo(
        ".brand-box",
        { autoAlpha: 0, y: 28, scale: 0.96, force3D: true },
        {
          ...defaults,
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: "expo.out",
          stagger: { each: 0.08, ease: "power1.inOut" },
          scrollTrigger: {
            trigger: "#social-proof",
            start: "top 82%",
            once: true,
          },
        }
      );
    }

    // ─── 9. Glass cards ────────────────────────────────────────────────────
    const glassCards = gsap.utils.toArray<HTMLElement>(".glass-card");
    if (glassCards.length > 0) {
      glassCards.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 36, force3D: true },
          {
            ...defaults,
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              once: true,
            },
          }
        );
      });
    }

    // ─── 10. Engine cards ───────────────────────────────────────────────────
    if (document.querySelector("[id='platform-engine'] .group")) {
      gsap.fromTo(
        "[id='platform-engine'] .group",
        { autoAlpha: 0, y: 36, scale: 0.97, force3D: true },
        {
          ...defaults,
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "expo.out",
          stagger: { each: 0.1, ease: "power1.inOut" },
          scrollTrigger: {
            trigger: "#platform-engine",
            start: "top 82%",
            once: true,
          },
        }
      );
    }


    // ─── 12. Final CTA section ──────────────────────────────────────────────
    if (document.querySelector("#contact")) {
      gsap.fromTo(
        "#contact",
        { autoAlpha: 0, y: 36, force3D: true },
        {
          ...defaults,
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#contact",
            start: "top 82%",
            once: true,
          },
        }
      );
    }
  }, { scope: containerRef });




  return (
    <div ref={containerRef}>
      <NotchNavbar />

      <main className="relative overflow-x-hidden">
        {/* Hero Section */}
        <section id="hero" className="flex items-center w-full organic-bg ambient-hero overflow-visible relative min-h-[100dvh] py-16 md:py-24 w-full">
          <div className="max-w-container-max mx-auto px-grid-margin relative">
            <div className="absolute top-0 right-0 h-90 w-90 rounded-full bg-accent-green/5 blur-2xl z-0"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
            <div ref={leftColumnRef} className="lg:col-span-5 space-y-5 relative z-30 pointer-events-none">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-green/20 bg-surface-mint/90 px-3 py-1.5 text-xs font-semibold text-accent-green shadow-sm hero-animate pointer-events-auto">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-green animate-pulse"></span>
                ZeroCarbon MCP launch
              </div>
              <div className="space-y-3">
                <h2 className="font-display-md text-4xl sm:text-5xl md:text-6xl font-bold italic text-primary tracking-tight leading-none mb-1 hero-animate">
                  ZeroCarbon MCP
                </h2>
                <h1 className="font-display-lg text-display-lg max-md:text-headline-xl leading-[1.02] hero-animate">
                  Turn every carbon signal into operational action.
                </h1>
                <p className="font-body-xl text-body-xl text-text-muted max-w-2xl hero-animate text-sm">
                  A new MCP built to unify AI agents, carbon telemetry, and compliance workflows in one animated control plane.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <AnimatedButton variant="solid" className="px-8 py-3 rounded-full font-body-md text-body-md flex items-center justify-center gap-2 hover:shadow-xl hero-animate pointer-events-auto text-sm" onClick={(e) => handleNavClick(e, '#contact')}>
                  Request a Demo
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </AnimatedButton>
                <div onClick={() => setIsMcpModalOpen(true)} className="inline-flex items-center gap-1 bg-white dark:bg-surface-container border border-neutral-200 dark:border-outline-variant/15 rounded-full px-5 py-2.5 shadow-sm hover:shadow-md transition-all duration-300 hero-animate pointer-events-auto text-sm cursor-pointer group">
                  <span className="font-body-md font-bold text-neutral-800 dark:text-text-main pr-1.5 select-none">
                    Add to my AI
                  </span>
                  
                  {/* Icons row */}
                  <div className="flex items-center gap-1.5 border-l border-neutral-200 dark:border-outline-variant/20 pl-3 mr-1">
                    {/* Claude/Anthropic (Orange Asterisk/Flower) */}
                    <span className="hover:scale-110 transition-transform duration-200 flex items-center" title="Claude / Anthropic">
                      <svg className="w-3.5 h-3.5 text-[#D97706]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2a1 1 0 011 1v6.59l4.66-4.66a1 1 0 111.41 1.41L14.41 11H21a1 1 0 110 2h-6.59l4.66 4.66a1 1 0 01-1.41 1.41L13 14.41V21a1 1 0 11-2 0v-6.59l-4.66 4.66a1 1 0 01-1.41-1.41L9.59 13H3a1 1 0 110-2h6.59L4.93 6.34a1 1 0 011.41-1.41L11 9.59V3a1 1 0 011-1z" />
                      </svg>
                    </span>
                    
                    {/* Vercel (Black Triangle) */}
                    <span className="hover:scale-110 transition-transform duration-200 flex items-center" title="Vercel">
                      <svg className="w-3.5 h-3.5 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1L24 22H0L12 1z" />
                      </svg>
                    </span>

                    {/* OpenAI/ChatGPT (Green Spiral) */}
                    <span className="hover:scale-110 transition-transform duration-200 flex items-center" title="OpenAI / ChatGPT">
                      <svg className="w-3.5 h-3.5 text-[#10a37f]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.7 10.9a5.5 5.5 0 00-.7-2.9 5.6 5.6 0 00-2.3-2.1c-.2-.1-.4-.2-.7-.2h-.2c0-.4-.1-.8-.3-1.1a5.6 5.6 0 00-3.6-3.1 5.3 5.3 0 00-3.5.2c-.3.1-.5.3-.7.5l-.2.1c-.2-.2-.5-.4-.8-.5a5.5 5.5 0 00-5.8 1.1 5.5 5.5 0 00-1.4 3.7c0 .1 0 .2.1.4l-.1.1a5.5 5.5 0 00-.8 3.5 5.5 5.5 0 002.3 4.1c.2.1.4.2.7.2.1.2.2.4.3.6a5.5 5.5 0 003.8 2.7 5.4 5.4 0 003.1-.3l.7-.4.2-.1c.2.2.5.4.8.5a5.5 5.5 0 005.8-1.1 5.5 5.5 0 001.4-3.7c0-.2 0-.3-.1-.5v-.1c.3.1.5.1.8.1a5.5 5.5 0 004-1.9 5.5 5.5 0 001.2-3.7z" />
                      </svg>
                    </span>

                    {/* Robot head/Copilot (Gray) */}
                    <span className="hover:scale-110 transition-transform duration-200 flex items-center" title="AI Agents / Copilot">
                      <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 10h-1.25A4.75 4.75 0 0012 14.75v0A4.75 4.75 0 007.25 10H6a4 4 0 00-4 4v2a4 4 0 004 4h12a4 4 0 004-4v-2a4 4 0 00-4-4z" />
                        <circle cx="12" cy="5" r="3" />
                      </svg>
                    </span>
                  </div>

                  {/* Dropdown Chevron */}
                  <span className="material-symbols-outlined text-xs text-neutral-400 ml-1 transition-transform duration-200 group-hover:translate-y-0.5">
                    expand_more
                  </span>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-4xl border border-outline-variant/15 bg-surface/90 p-4 shadow-sm hero-animate">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-text-muted">Latency</p>
                  <p className="mt-2 text-xl font-bold text-primary">24 ms</p>
                </div>
                <div className="rounded-4xl border border-outline-variant/15 bg-surface/90 p-4 shadow-sm hero-animate">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-text-muted">Scope coverage</p>
                  <p className="mt-2 text-xl font-bold text-primary">1-3</p>
                </div>
                <div className="rounded-4xl border border-outline-variant/15 bg-surface/90 p-4 shadow-sm hero-animate">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-text-muted">Compliance</p>
                  <p className="mt-2 text-xl font-bold text-primary">CSRD + SEC</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 relative hero-animate h-full flex items-center justify-center min-h-[350px] md:min-h-[500px]">
              <HeroInteractiveFlow containerHeight={leftColumnHeight || 500} />
            </div>

          </div>
          </div>
        </section>

        {/* Social Proof with Logo Marquee */}
        <section id="social-proof" className="min-h-[100dvh] py-16 md:py-24 w-full flex flex-col justify-between py-10">
          <LogoCloud />
          <div className="max-w-container-max mx-auto px-grid-margin flex-1 w-full flex flex-col mt-10">
            <div className="flow-soft flex-1 flex flex-col justify-center relative overflow-hidden rounded-[40px] border border-outline-variant/20 bg-white p-8 lg:p-12 shadow-[0_40px_90px_rgba(3,36,22,0.08)]">
              <div className="absolute -right-10 top-12 h-48 w-48 rounded-full bg-accent-green/5 blur-2xl"></div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr] items-center">
                <div className="space-y-4">
                  <p className="font-label-caps text-xs uppercase text-accent-green">Trusted by modern AI teams</p>
                  <h2 className="gsap-title font-headline-lg text-[2rem] leading-tight text-text-main">Built to scale carbon intelligence across product and operations.</h2>
                  <p className="max-w-xl font-body-md text-text-muted text-sm">ZeroCarbon MCP delivers live signals, actionable carbon guidance, and policy-safe workflow automation.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="brand-box float-animation rounded-[28px] border border-outline-variant/15 bg-surface-mint/90 p-4 text-center" style={{ animationDelay: "0s" }}>
                    <span className="material-symbols-outlined text-2xl text-accent-green">bolt</span>
                    <p className="mt-2 text-xs font-semibold text-primary">Speed-first</p>
                  </div>
                  <div className="brand-box float-animation rounded-[28px] border border-outline-variant/15 bg-surface-mint/90 p-4 text-center" style={{ animationDelay: "0.2s" }}>
                    <span className="material-symbols-outlined text-2xl text-accent-green">shield</span>
                    <p className="mt-2 text-xs font-semibold text-primary">Compliance-ready</p>
                  </div>
                  <div className="brand-box float-animation rounded-[28px] border border-outline-variant/15 bg-surface-mint/90 p-4 text-center" style={{ animationDelay: "0.4s" }}>
                    <span className="material-symbols-outlined text-2xl text-accent-green">trending_up</span>
                    <p className="mt-2 text-xs font-semibold text-primary">Impact-driven</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[28px] bg-primary/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Live streams</p>
                  <p className="mt-2 text-2xl font-bold text-primary">84%</p>
                </div>
                <div className="rounded-[28px] bg-primary/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Auto rules</p>
                  <p className="mt-2 text-2xl font-bold text-primary">42</p>
                </div>
                <div className="rounded-[28px] bg-primary/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Verified audits</p>
                  <p className="mt-2 text-2xl font-bold text-primary">12k</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Engine */}
        <section id="platform-engine" className="px-grid-margin min-h-[100dvh] py-16 md:py-24 w-full flex flex-col justify-center">
          <div className="max-w-container-max mx-auto grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="font-label-caps text-label-caps uppercase text-accent-green">Platform engine</p>
                <h2 className="gsap-title font-headline-xl text-headline-xl max-md:text-headline-lg leading-tight text-text-main">
                  A live network for carbon decisions, not just reporting.
                </h2>
                <p className="max-w-xl font-body-xl text-body-xl text-text-muted leading-relaxed">
                  ZeroCarbon MCP stitches carbon telemetry, agent triggers, and audit workflows together with one interface that keeps every stakeholder aligned.
                </p>
              </div>

              {/* Feature List with Soft Dividers and Hover Interactions */}
              <div className="border-t border-outline-variant/10 divide-y divide-outline-variant/10">
                {[
                  {
                    title: "Live Signals",
                    description: "Ingest real-time carbon data from devices, cloud, and applications.",
                    icon: "sensors",
                  },
                  {
                    title: "Smart Automation",
                    description: "Trigger agent actions and route workflows automatically.",
                    icon: "bolt",
                  },
                  {
                    title: "Policy & Controls",
                    description: "Enforce governance, compliance, and business rules at scale.",
                    icon: "verified_user",
                  },
                  {
                    title: "Unified Visibility",
                    description: "One interface for metrics, audits, and stakeholder alignment.",
                    icon: "visibility",
                  },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="group py-5 flex items-center justify-between gap-6 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 border border-outline-variant/5 flex items-center justify-center shrink-0 group-hover:bg-accent-green/5 group-hover:border-accent-green/10 transition-colors duration-300">
                        <span className="material-symbols-outlined text-[19px] text-accent-green group-hover:scale-110 transition-transform duration-300">
                          {feature.icon}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-body-md font-medium text-sm text-text-main group-hover:text-accent-green transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="font-body-md text-xs text-text-muted mt-1 leading-normal max-w-md">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-text-muted/40 text-sm group-hover:translate-x-1 group-hover:text-accent-green transition-all duration-300">
                      arrow_forward
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Interactive Node Network Showcase */}
            <PlatformNetwork />
          </div>
        </section>

        {/* Quick Answer */}
        <section id="pulse" className="px-grid-margin min-h-[100dvh] py-16 md:py-24 w-full flex flex-col justify-center">
          <div className="max-w-container-max mx-auto grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] items-stretch min-h-[60vh] w-full">
            <div className="flow-soft relative overflow-hidden rounded-[40px] border border-outline-variant/20 bg-primary text-on-primary p-10 shadow-[0_28px_90px_rgba(3,36,22,0.16)] flex flex-col justify-between">
              <div className="absolute -right-10 top-8 h-40 w-40 rounded-full bg-white/5 blur-2xl"></div>
              <div>
                <p className="font-label-caps text-label-caps uppercase text-accent-green/80">Signal intelligence</p>
                <h2 className="gsap-title mt-4 font-headline-xl text-headline-xl max-md:text-headline-lg leading-tight">Watch your carbon footprint move from data to decisions.</h2>
                <p className="mt-6 max-w-xl font-body-xl text-on-primary/80">Track every emission source and compliance alert in one place with live graphs, AI-driven recommendations, and dispatch-ready summaries.</p>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[32px] border border-white/15 bg-white/10 p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/70">Alerts</p>
                  <p className="mt-4 text-3xl font-bold">12</p>
                </div>
                <div className="rounded-[32px] border border-white/15 bg-white/10 p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/70">Automations</p>
                  <p className="mt-4 text-3xl font-bold">33</p>
                </div>
                <div className="rounded-[32px] border border-white/15 bg-white/10 p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/70">Risk score</p>
                  <p className="mt-4 text-3xl font-bold">4.8 / 5</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="glass-card flex-1 rounded-[40px] border border-outline-variant/20 bg-white/95 p-8 lg:p-10 shadow-sm flex flex-col justify-center">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-label-caps text-label-caps uppercase text-text-muted">Streamlined workflow</p>
                    <p className="mt-3 text-xl font-semibold text-primary">AI-first carbon orchestration</p>
                  </div>
                  <span className="rounded-full bg-surface-mint px-4 py-2 text-sm font-semibold text-accent-green">Live</span>
                </div>
                <div className="mt-8 grid gap-3">
                  <div className="rounded-[24px] bg-surface-mint/80 p-4">
                    <p className="text-sm text-text-muted">Auto classifies emissions across tools</p>
                  </div>
                  <div className="rounded-[24px] bg-surface-mint/80 p-4">
                    <p className="text-sm text-text-muted">Pushes policy-safe summaries to stakeholders</p>
                  </div>
                </div>
              </div>
              <div className="flow-soft flex-1 rounded-[40px] border border-outline-variant/20 bg-white p-8 lg:p-10 shadow-[0_20px_40px_rgba(3,36,22,0.08)] flex flex-col justify-center">
                <p className="font-label-caps text-label-caps uppercase text-accent-green">Trusted by</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[28px] border border-outline-variant/15 bg-surface-mint/80 p-4 text-center">
                    <p className="font-semibold text-primary">AI Labs</p>
                  </div>
                  <div className="rounded-[28px] border border-outline-variant/15 bg-surface-mint/80 p-4 text-center">
                    <p className="font-semibold text-primary">Supply chains</p>
                  </div>
                  <div className="rounded-[28px] border border-outline-variant/15 bg-surface-mint/80 p-4 text-center">
                    <p className="font-semibold text-primary">Audit teams</p>
                  </div>
                  <div className="rounded-[28px] border border-outline-variant/15 bg-surface-mint/80 p-4 text-center">
                    <p className="font-semibold text-primary">Engineering</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Answer */}
        <section className="px-grid-margin min-h-[100dvh] py-16 md:py-24 w-full flex flex-col justify-center">
          <div className="bg-surface-mint rounded-[48px] p-12 md:p-24 text-center max-w-5xl mx-auto space-y-8">
            <p className="font-label-caps text-label-caps text-accent-green tracking-widest uppercase">Quick Answer</p>
            <h2 className="gsap-title font-headline-xl text-headline-xl max-md:text-headline-lg leading-tight">What is ZeroCarbon MCP?</h2>
            <p className="font-body-xl text-body-xl text-text-main max-w-2xl mx-auto opacity-80">
              ZeroCarbon MCP is the industry&apos;s first AI-native operating system designed to automate carbon referrals, 
              calculate Scope 1-3 emissions in real-time, and maintain continuous regulatory compliance for engineering-heavy enterprises.
            </p>
          </div>
        </section>

        {/* Signal Blocks */}
        <section id="signal-blocks" className="px-grid-margin min-h-[100dvh] py-16 md:py-24 w-full flex flex-col justify-center">
          <div className="flow-soft relative overflow-hidden rounded-[40px] border border-outline-variant/20 bg-white p-8 md:p-12 shadow-[0_24px_80px_rgba(3,36,22,0.05)]">
            <div className="ambient-grid-panel absolute inset-0"></div>
            <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="space-y-5">
                <p className="font-label-caps text-label-caps text-accent-green uppercase">Built for modern operators</p>
                <h2 className="gsap-title font-headline-xl text-headline-xl max-md:text-headline-lg leading-tight text-text-main">A launchpad for carbon-aware product teams.</h2>
                <p className="max-w-xl font-body-xl text-body-xl text-text-muted">
                  From infrastructure data to executive reporting, ZeroCarbon MCP turns climate work into a seamless operational layer.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="glass-card rounded-[24px] border border-outline-variant/20 bg-white/90 p-6 shadow-sm">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-surface-mint text-accent-green">
                    <span className="material-symbols-outlined">bolt</span>
                  </div>
                  <h3 className="font-headline-lg text-[22px]">Fast setup</h3>
                  <p className="mt-3 font-body-md text-text-muted">Deploy across your stack in minutes with no heavy migration work.</p>
                </div>
                <div className="glass-card rounded-[24px] border border-outline-variant/20 bg-white/90 p-6 shadow-sm">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-surface-mint text-accent-green">
                    <span className="material-symbols-outlined">insights</span>
                  </div>
                  <h3 className="font-headline-lg text-[22px]">Executive clarity</h3>
                  <p className="mt-3 font-body-md text-text-muted">Turn raw carbon streams into concise, decision-ready dashboards.</p>
                </div>
                <div className="glass-card rounded-[24px] border border-outline-variant/20 bg-white/90 p-6 shadow-sm md:col-span-2">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-headline-lg text-[22px]">Audit-ready workflows</h3>
                      <p className="mt-2 font-body-md text-text-muted">Every action is logged, reviewed, and ready for compliance teams.</p>
                    </div>
                    <div className="rounded-full border border-accent-green/20 bg-surface-mint px-4 py-2 text-sm font-semibold text-accent-green">
                      Zero-friction
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="px-grid-margin max-w-container-max mx-auto min-h-[100dvh] py-16 md:py-24 w-full flex flex-col justify-center">
          <div className="text-center space-y-4 mb-12">
            <p className="font-label-caps text-label-caps text-accent-green uppercase">Platform Features</p>
            <h2 className="gsap-title font-headline-xl text-headline-xl">Engineered for absolute accuracy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card section-card group bg-white p-10 rounded-3xl border border-outline-variant/10 shadow-sm transition-all duration-400">
              <div className="card-icon w-12 h-12 flex items-center justify-center rounded-xl bg-surface-mint text-accent-green mb-8">
                <span className="material-symbols-outlined">data_usage</span>
              </div>
              <h3 className="font-headline-lg text-[24px] mb-4">Consolidate tools</h3>
              <p className="font-body-md text-text-muted">Unify siloed sustainability trackers, cloud billings, and supply chain data into a single, high-fidelity ledger.</p>
            </div>
            <div className="feature-card section-card group bg-white p-10 rounded-3xl border border-outline-variant/10 shadow-sm transition-all duration-400">
              <div className="card-icon w-12 h-12 flex items-center justify-center rounded-xl bg-surface-mint text-accent-green mb-8">
                <span className="material-symbols-outlined">description</span>
              </div>
              <h3 className="font-headline-lg text-[24px] mb-4">AI Documentation</h3>
              <p className="font-body-md text-text-muted">Automate the generation of ESG reports and audit trails using LLMs trained on climate accounting standards.</p>
            </div>
            <div className="feature-card section-card group bg-white p-10 rounded-3xl border border-outline-variant/10 shadow-sm transition-all duration-400">
              <div className="card-icon w-12 h-12 flex items-center justify-center rounded-xl bg-surface-mint text-accent-green mb-8">
                <span className="material-symbols-outlined">security</span>
              </div>
              <h3 className="font-headline-lg text-[24px] mb-4">Real-time compliance</h3>
              <p className="font-body-md text-text-muted">Stay ahead of CSRD and SEC mandates with live emission monitoring and proactive compliance alerting.</p>
            </div>
          </div>
        </section>

        {/* Ecosystem */}
        <section id="architecture" className="bg-background text-text-main min-h-[100dvh] py-16 md:py-24 w-full flex flex-col justify-center">
          <EcosystemShowcase />
        </section>

        <StackedSteps />
        {/* Code Section */}
        <section id="developers" className="px-grid-margin max-w-container-max mx-auto min-h-[100dvh] py-16 md:py-24 w-full flex flex-col justify-center">
          <div className="bg-surface-container-low rounded-[48px] p-8 md:p-16 border border-outline-variant/10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 relative group">
              {/* Ambient Glow Blob */}
              <div className="absolute -inset-3 bg-gradient-to-r from-accent-green/20 to-teal-500/20 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none"></div>
              
              <div className="code-panel bg-[#0b1410] rounded-2xl p-6 font-mono text-[14px] text-on-primary shadow-2xl overflow-hidden relative border border-white/5 select-none transform-gpu">
                <div className="flex gap-1.5 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <p className="code-line text-white/40 mb-4">// Initializing ZeroCarbon MCP</p>
                <p className="code-line mb-1 text-blue-300">const <span className="text-white">zeroCarbon</span> = new <span className="text-teal-300">MCPCore</span>({'{'}</p>
                <p className="code-line pl-4">auditMode: <span className="text-amber-200">&apos;real-time&apos;</span>,</p>
                <p className="code-line pl-4 text-white">compliance: [<span className="text-amber-200">&apos;CSRD&apos;</span>, <span className="text-amber-200">&apos;SEC&apos;</span>],</p>
                <p className="code-line pl-4 text-white">scopeTracking: <span className="text-amber-200">&apos;3_FULL&apos;</span></p>
                <p className="code-line text-blue-300">{'}'});</p>
                <p className="code-line mt-4 text-blue-300">await <span className="text-white">zeroCarbon</span>.connect(<span className="text-amber-200">&apos;infrastructure&apos;</span>);</p>
                <p className="code-line text-teal-400 mt-2">✓ Ledger ready. Monitoring 4,129 endpoints.</p>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <p className="font-label-caps text-label-caps text-accent-green uppercase">Developer First</p>
              <h2 className="gsap-title font-headline-xl text-headline-xl">An MCP Core designed for how developers actually work.</h2>
              <ul className="space-y-5">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent-green">check_circle</span>
                  <span className="font-body-md font-bold">API-First Architecture</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent-green">check_circle</span>
                  <span className="font-body-md font-bold">Git-Integrated Workflows</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent-green">check_circle</span>
                  <span className="font-body-md font-bold">Automated Security Patching</span>
                </li>
              </ul>
            </div>
          </div>
        </section>


        {/* FAQ */}
        <section id="faq" className="px-grid-margin max-w-4xl mx-auto py-24 md:py-32 w-full flex flex-col justify-center">
          <FaqAccordion 
            title="Frequently asked questions"
            items={[
              { 
                question: "Is my data secure with ZeroCarbon?", 
                answer: "Yes. ZeroCarbon MCP uses enterprise-grade AES-256 encryption and is SOC2 Type II compliant. We never train our AI on your sensitive financial or infrastructure data." 
              },
              { 
                question: "Which cloud providers do you support?", 
                answer: "We offer native integrations for AWS, Google Cloud, and Microsoft Azure, along with generic webhooks for private data centers." 
              },
              { 
                question: "Can it handle Scope 3 emissions?", 
                answer: "Absolutely. Scope 3 is our specialty. Our AI engine scans purchase orders and supply chain contracts to automatically categorize and calculate indirect emissions." 
              }
            ]}
          />
        </section>

        {/* Final CTA */}
        <section id="contact" className="px-grid-margin min-h-[100dvh] py-16 md:py-24 w-full flex flex-col justify-center">
          <div className="cta-shell bg-primary text-on-primary rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBePr2E7EDaeuOTgkBstVxeaD7kEbSc3jTtQo8MtS06eSACutQ8BleHLS3U144QmfxR9iiz6gZpVrrmqFHekjyzAVw6OuzvtjncyRhYNSx2SLRUMZBMk-pPZn4BnHNE__wf9012x0xTHs0FE2TScdd35OCDIGLdW26GKfutb1vwJJ_WbAh8iKwX7VzVJx7nL9ple2U0I-ltJS47FS4woYcmLIe6-06EajLMSYm4BD-EmmLxeiKLWrg" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto space-y-12">
              <h2 className="gsap-title font-display-lg text-display-lg max-md:text-headline-xl">Bring carbon intelligence back into your workflow.</h2>
              <p className="font-body-xl text-body-xl opacity-80">Join 200+ sustainable engineering teams reducing their compliance load by 60%.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <AnimatedButton variant="secondary" className="px-12 py-6 rounded-full font-body-md text-body-md shadow-2xl" onClick={(e) => handleNavClick(e, '#contact')}>
                  Request Demo
                </AnimatedButton>
                <AnimatedButton variant="outline" className="border-white/30 text-white hover:bg-white/10 px-12 py-6 rounded-full font-body-md text-body-md [--shine:rgba(255,255,255,0.4)]">
                  Read Documentation
                </AnimatedButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface-mint py-20 px-grid-margin">
        <div className="max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1 space-y-6">
            <div className="font-headline-lg text-[24px] font-bold text-primary">ZeroCarbon MCP</div>
            <p className="font-body-md text-text-muted">The AI-native OS for sustainable engineering teams.</p>
          </div>
          <div>
            <p className="font-label-caps text-primary mb-6">Product</p>
            <ul className="space-y-4">
              <li><a className="text-body-md text-text-muted hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleNavClick(e, '#features')}>Solutions</a></li>
              <li><a className="text-body-md text-text-muted hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleNavClick(e, '#architecture')}>Architecture</a></li>
            </ul>
          </div>
          <div>
            <p className="font-label-caps text-primary mb-6">Resources</p>
            <ul className="space-y-4">
              <li><a className="text-body-md text-text-muted hover:text-primary transition-colors" href="#">Documentation</a></li>
              <li><a className="text-body-md text-text-muted hover:text-primary transition-colors" href="#">API Reference</a></li>
              <li><a className="text-body-md text-text-muted hover:text-primary transition-colors" href="#">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <p className="font-label-caps text-primary mb-6">Legal</p>
            <ul className="space-y-4">
              <li><a className="text-body-md text-text-muted hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="text-body-md text-text-muted hover:text-primary transition-colors" href="#">Terms of Service</a></li>
              <li><a className="text-body-md text-text-muted hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleNavClick(e, '#faq')}>FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-container-max mx-auto mt-20 pt-10 border-t border-outline-variant/30 flex justify-between items-center text-body-md text-text-muted">
          <p>© 2024 ZeroCarbon MCP. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" aria-label="ZeroCarbon MCP Public Portal" className="hover:text-primary transition-colors">
              <span className="material-symbols-outlined" aria-hidden="true">public</span>
            </a>
            <a href="#" aria-label="ZeroCarbon MCP Terminal Console" className="hover:text-primary transition-colors">
              <span className="material-symbols-outlined" aria-hidden="true">terminal</span>
            </a>
          </div>
        </div>
      </footer>
      {/* Enterprise-grade JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://zerocarbon-mcp.vercel.app/#organization",
                "name": "ZeroCarbon MCP",
                "url": "https://zerocarbon-mcp.vercel.app",
                "logo": "https://zerocarbon-mcp.vercel.app/logo.png"
              },
              {
                "@type": "WebSite",
                "@id": "https://zerocarbon-mcp.vercel.app/#website",
                "url": "https://zerocarbon-mcp.vercel.app",
                "name": "ZeroCarbon MCP",
                "publisher": {
                  "@id": "https://zerocarbon-mcp.vercel.app/#organization"
                }
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://zerocarbon-mcp.vercel.app/#software",
                "name": "ZeroCarbon MCP",
                "operatingSystem": "All",
                "applicationCategory": "BusinessApplication",
                "description": "Enterprise Carbon Operating System powered by Model Context Protocol (MCP). Consolidate telemetry and compliance workflows.",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                }
              }
            ]
          })
        }}
      />
      {/* MCP Connect Modal */}
      <AnimatePresence>
        {isMcpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMcpModalOpen(false)}
              className="absolute inset-0 bg-[#0B0F0D]/60 backdrop-blur-md"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-4xl h-[650px] max-h-[85vh] bg-white dark:bg-surface-container border border-neutral-200/60 dark:border-outline-variant/15 rounded-3xl shadow-[0_32px_90px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200/60 dark:border-outline-variant/15 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent-green/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-accent-green text-[22px]">
                      monitoring
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display-md text-base font-bold text-neutral-800 dark:text-text-main flex items-center gap-2">
                      Connect AI Agent (MCP)
                    </h3>
                    <p className="text-[10px] text-text-muted mt-0.5 tracking-wider uppercase font-bold">
                      INTEGRATE CURSOR, CLAUDE, OR GEMINI CLI FOR LOCAL DEVELOPMENT
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsMcpModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-surface-mint/15 text-neutral-400 hover:text-neutral-600 dark:hover:text-text-main transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              {/* Scrollable Container */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {/* Step 1 Card */}
                <div className="bg-surface-mint/50 dark:bg-surface-container-low/50 border border-accent-green/10 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-neutral-800 dark:text-text-main flex items-center gap-2">
                      Step 1: Download MCP Bridge Client Script
                      <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-accent-green/10 text-accent-green border border-accent-green/10">
                        REQUIRED
                      </span>
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Download <code className="font-mono text-accent-green">zerocarbon-mcp-client.js</code> and save it to a folder on your computer (e.g., <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">C:\mcp\zerocarbon-mcp-client.js</code> or <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">~/mcp/zerocarbon-mcp-client.js</code>).
                    </p>
                  </div>
                  <a
                    href="/zerocarbon-mcp-client.js"
                    download="zerocarbon-mcp-client.js"
                    className="bg-[#00875A] hover:bg-[#006C48] text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm shrink-0 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">download</span>
                    Download Script (.js)
                  </a>
                </div>

                {/* 4 Steps Instructions */}
                <div className="border border-neutral-200/60 dark:border-outline-variant/15 p-5 rounded-2xl space-y-3 bg-neutral-50/30 dark:bg-[#121c17]/10">
                  <h4 className="text-xs font-bold text-neutral-800 dark:text-text-main flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-accent-green">
                      assignment
                    </span>
                    How to Connect Your AI Agent (4 Steps):
                  </h4>
                  <ol className="list-decimal list-inside text-xs text-text-muted space-y-2 leading-relaxed pl-1">
                    <li>
                      <span className="font-bold text-neutral-700 dark:text-text-main pl-1">Download:</span> Click the button above to download <code className="font-mono text-accent-green">zerocarbon-mcp-client.js</code> to your local machine.
                    </li>
                    <li>
                      <span className="font-bold text-neutral-700 dark:text-text-main pl-1">Node.js Requirement:</span> Ensure Node.js (v18+) is installed on your machine (<code className="font-mono">node -v</code>).
                    </li>
                    <li>
                      <span className="font-bold text-neutral-700 dark:text-text-main pl-1">Select AI Editor below:</span> Choose your platform tab below (Claude Desktop, Cursor, Claude Code, Gemini CLI) and copy the configuration.
                    </li>
                    <li>
                      <span className="font-bold text-neutral-700 dark:text-text-main pl-1">Set File Path:</span> In your AI editor configuration, replace <code className="font-mono text-accent-green">/path/to/zerocarbon-mcp-client.js</code> with the actual file path where you saved the downloaded script.
                    </li>
                  </ol>
                </div>

                {/* Horizontal Tab bar */}
                <div className="flex items-center gap-2 border-b border-neutral-200/60 dark:border-outline-variant/15 pb-2 overflow-x-auto select-none">
                  {[
                    { id: "claude", label: "CLAUDE DESKTOP" },
                    { id: "cursor", label: "CURSOR IDE" },
                    { id: "claude-code", label: "CLAUDE CODE" },
                    { id: "gemini", label: "GEMINI / CLIS" },
                    { id: "api", label: "API / CURL" },
                  ].map((tab) => {
                    const isActive = activeMcpTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveMcpTab(tab.id)}
                        className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 border ${
                          isActive
                            ? "bg-neutral-50 dark:bg-surface-container-low border-neutral-300 dark:border-outline-variant/30 text-neutral-800 dark:text-text-main shadow-sm"
                            : "bg-transparent border-transparent text-neutral-500 dark:text-text-muted hover:text-neutral-800 dark:hover:text-text-main"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Tab content */}
                <div className="space-y-4">
                  {activeMcpTab === "claude" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-neutral-800 dark:text-text-main">
                          1. Locate Claude Desktop config file:
                        </p>
                        <ul className="list-disc list-inside text-xs text-text-muted space-y-1.5 pl-1 leading-relaxed">
                          <li>
                            Windows: <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">%APPDATA%\Claude\claude_desktop_config.json</code>
                          </li>
                          <li>
                            macOS: <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">~/Library/Application Support/Claude/claude_desktop_config.json</code>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-bold text-neutral-800 dark:text-text-main">
                          2. Paste this configuration into the file:
                        </p>
                        <div className="relative group">
                          <pre className="text-xs text-accent-green font-mono p-4 bg-neutral-50 dark:bg-surface-container-low border border-neutral-200 dark:border-outline-variant/15 rounded-xl overflow-x-auto">
{`{
  "mcpServers": {
    "zerocarbon-mcp": {
      "command": "node",
      "args": [
        "/path/to/zerocarbon-mcp-client.js"
      ],
      "env": {
        "ZEROCARBON_API_KEY": "zc_test_f079482xxxxxxxxxxxxxxxxxxxxxxxx",
        "ZEROCARBON_API_URL": "https://zerocarbon-mcp.onrender.com/api/v1/mcp"
      }
    }
  }
}`}
                          </pre>
                          <button
                            onClick={() => handleCopy(`{\n  "mcpServers": {\n    "zerocarbon-mcp": {\n      "command": "node",\n      "args": [\n        "/path/to/zerocarbon-mcp-client.js"\n      ],\n      "env": {\n        "ZEROCARBON_API_KEY": "zc_test_f079482xxxxxxxxxxxxxxxxxxxxxxxx",\n        "ZEROCARBON_API_URL": "https://zerocarbon-mcp.onrender.com/api/v1/mcp"\n      }\n    }\n  }\n}`, "claude-json")}
                            className="absolute top-3 right-3 p-1.5 rounded-lg border border-neutral-200 bg-white dark:bg-surface hover:bg-neutral-100 dark:border-outline-variant/15 dark:hover:bg-surface-mint/15 transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px] text-neutral-500">
                              {copiedText === "claude-json" ? "done" : "content_copy"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeMcpTab === "cursor" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-neutral-800 dark:text-text-main">
                          1. Open Cursor Settings:
                        </p>
                        <p className="text-xs text-text-muted">
                          Navigate to <span className="font-semibold text-neutral-700 dark:text-text-main">Settings &rarr; Features &rarr; MCP</span> and click <span className="font-semibold text-neutral-700 dark:text-text-main">+ Add New MCP Server</span>.
                        </p>
                      </div>

                      <div className="grid gap-3">
                        {[
                          { label: "SERVER NAME", value: "ZeroCarbon", id: "cursor-name" },
                          { label: "TYPE", value: "command", id: "cursor-type", noCopy: true },
                          { label: "COMMAND", value: "node", id: "cursor-cmd" },
                          { label: "ARGUMENTS (JSON STRING)", value: "/path/to/zerocarbon-mcp-client.js", id: "cursor-args" },
                          { label: "ENVIRONMENT VARIABLES (ENV)", value: "ZEROCARBON_API_KEY = zc_2a982b2b0xxxxxxxxxxxxxxxxxxxxxxxx ZEROCARBON_API_URL = https://zerocarbon-mcp.onrender.com/api/v1/mcp", id: "cursor-env" },
                        ].map((field) => (
                          <div key={field.label} className="p-4 bg-neutral-50 dark:bg-surface-container-low border border-neutral-200 dark:border-outline-variant/15 rounded-xl flex items-center justify-between gap-4">
                            <div className="space-y-1 min-w-0 flex-1">
                              <p className="text-[10px] font-bold text-neutral-400 dark:text-text-muted tracking-wider">
                                {field.label}
                              </p>
                              <p className="font-mono text-xs font-bold text-neutral-800 dark:text-text-main break-all select-all leading-normal">
                                {field.value}
                              </p>
                            </div>
                            {!field.noCopy && (
                              <button
                                onClick={() => handleCopy(field.value, field.id)}
                                className="p-1.5 rounded-lg border border-neutral-200 bg-white dark:bg-surface hover:bg-neutral-100 dark:border-outline-variant/15 dark:hover:bg-surface-mint/15 transition-colors cursor-pointer shrink-0"
                              >
                                <span className="material-symbols-outlined text-[16px] text-neutral-500">
                                  {copiedText === field.id ? "done" : "content_copy"}
                                </span>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeMcpTab === "claude-code" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-neutral-800 dark:text-text-main">
                          Install via Claude CLI:
                        </p>
                        <p className="text-xs text-text-muted">
                          Run the following command directly inside your terminal window to bind ZeroCarbon:
                        </p>
                        <div className="relative group">
                          <pre className="text-xs text-accent-green font-mono p-4 bg-neutral-50 dark:bg-surface-container-low border border-neutral-200 dark:border-outline-variant/15 rounded-xl overflow-x-auto whitespace-pre-wrap break-all pr-12">
                            {`claude mcp add zerocarbon node /path/to/zerocarbon-mcp-client.js --env ZEROCARBON_API_KEY=zc_2a982b2b0xxxxxxxxxxxxxxxxxxxxxxxx ZEROCARBON_API_URL=https://zerocarbon-mcp.onrender.com/api/v1/mcp`}
                          </pre>
                          <button
                            onClick={() => handleCopy(`claude mcp add zerocarbon node /path/to/zerocarbon-mcp-client.js --env ZEROCARBON_API_KEY=zc_2a982b2b0xxxxxxxxxxxxxxxxxxxxxxxx ZEROCARBON_API_URL=https://zerocarbon-mcp.onrender.com/api/v1/mcp`, "claude-code-cli")}
                            className="absolute top-3 right-3 p-1.5 rounded-lg border border-neutral-200 bg-white dark:bg-surface hover:bg-neutral-100 dark:border-outline-variant/15 dark:hover:bg-surface-mint/15 transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px] text-neutral-500">
                              {copiedText === "claude-code-cli" ? "done" : "content_copy"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeMcpTab === "gemini" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-neutral-800 dark:text-text-main">
                          Launch with Local Environment Settings:
                        </p>
                        <p className="text-xs text-text-muted">
                          Execute the command line below directly in your CLI tool terminal (e.g. Gemini Code Assist CLI, mcp-cli):
                        </p>
                        <div className="relative group">
                          <pre className="text-xs text-accent-green font-mono p-4 bg-neutral-50 dark:bg-surface-container-low border border-neutral-200 dark:border-outline-variant/15 rounded-xl overflow-x-auto">
{`# Windows Powershell
$env:ZEROCARBON_API_KEY="zc_2a982b2b0xxxxxxxxxxxxxxxxxxxxxxxx"; $env:ZEROCARBON_API_URL="https://zerocarbon-mcp.onrender.com/api/v1/mcp"

# macOS / Linux
export ZEROCARBON_API_KEY="zc_2a982b2b0xxxxxxxxxxxxxxxxxxxxxxxx"
export ZEROCARBON_API_URL="https://zerocarbon-mcp.onrender.com/api/v1/mcp"
node /path/to/zerocarbon-mcp-client.js`}
                          </pre>
                          <button
                            onClick={() => handleCopy(`$env:ZEROCARBON_API_KEY="zc_2a982b2b0xxxxxxxxxxxxxxxxxxxxxxxx"; $env:ZEROCARBON_API_URL="https://zerocarbon-mcp.onrender.com/api/v1/mcp"\n\nexport ZEROCARBON_API_KEY="zc_2a982b2b0xxxxxxxxxxxxxxxxxxxxxxxx"\nexport ZEROCARBON_API_URL="https://zerocarbon-mcp.onrender.com/api/v1/mcp"\nnode /path/to/zerocarbon-mcp-client.js`, "gemini-cli")}
                            className="absolute top-3 right-3 p-1.5 rounded-lg border border-neutral-200 bg-white dark:bg-surface hover:bg-neutral-100 dark:border-outline-variant/15 dark:hover:bg-surface-mint/15 transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px] text-neutral-500">
                              {copiedText === "gemini-cli" ? "done" : "content_copy"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeMcpTab === "api" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-neutral-800 dark:text-text-main">
                          List Available Tools (cURL):
                        </p>
                        <p className="text-xs text-text-muted">
                          Execute tools manually using JSON-RPC requests via HTTP POST:
                        </p>
                        <div className="relative group">
                          <pre className="text-xs text-accent-green font-mono p-4 bg-neutral-50 dark:bg-surface-container-low border border-neutral-200 dark:border-outline-variant/15 rounded-xl overflow-x-auto">
{`curl -X POST \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer zc_2a982b2b0xxxxxxxxxxxxxxxxxxxxxxxx" \\
  -d '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' \\
  https://zerocarbon-mcp.onrender.com/api/v1/mcp`}
                          </pre>
                          <button
                            onClick={() => handleCopy(`curl -X POST \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer zc_2a982b2b0xxxxxxxxxxxxxxxxxxxxxxxx" \\\n  -d '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' \\\n  https://zerocarbon-mcp.onrender.com/api/v1/mcp`, "api-curl")}
                            className="absolute top-3 right-3 p-1.5 rounded-lg border border-neutral-200 bg-white dark:bg-surface hover:bg-neutral-100 dark:border-outline-variant/15 dark:hover:bg-surface-mint/15 transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px] text-neutral-500">
                              {copiedText === "api-curl" ? "done" : "content_copy"}
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 mt-4 pt-4 border-t border-neutral-200/50 dark:border-outline-variant/10">
                        <p className="text-xs font-bold text-neutral-800 dark:text-text-main flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-accent-green">
                            chat_bubble
                          </span>
                          TEST DISCOVERY PROMPT:
                        </p>
                        <div className="flex items-start gap-2 p-3 bg-accent-green/5 border border-accent-green/10 rounded-xl">
                          <p className="text-xs text-neutral-700 dark:text-text-muted italic flex-1 leading-relaxed">
                            "Describe what tools you offer from ZeroCarbon and list my latest audit records summary."
                          </p>
                          <button
                            onClick={() => handleCopy("Describe what tools you offer from ZeroCarbon and list my latest audit records summary.", "api-prompt")}
                            className="p-1.5 rounded-lg border border-accent-green/20 bg-white dark:bg-surface hover:bg-accent-green/5 transition-colors cursor-pointer shrink-0"
                          >
                            <span className="material-symbols-outlined text-[16px] text-accent-green">
                              {copiedText === "api-prompt" ? "done" : "content_copy"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-8 py-5 border-t border-neutral-200/60 dark:border-outline-variant/15 shrink-0 bg-neutral-50/50 dark:bg-surface-container-low/50">
                <span className="text-[10px] text-text-muted">
                  ZeroCarbon MCP is standard-compliant & secured.
                </span>
                <button
                  onClick={() => setIsMcpModalOpen(false)}
                  className="bg-[#00875A] hover:bg-[#006C48] text-white font-bold px-6 py-2 rounded-full text-xs transition-colors shadow-sm cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
