"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import Image from "next/image";
import dynamic from "next/dynamic";
import AnimatedButton from "../components/ui/animated-button";
import NotchNavbar from "../components/ui/notch-navbar";
import { LogoCloud } from "../components/ui/logo-cloud";
import { StackedSteps } from "../components/ui/stacked-steps";
import { EcosystemShowcase } from "../components/ui/ecosystem-showcase";
import { PlatformNetwork } from "../components/ui/platform-network";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const [leftColumnHeight, setLeftColumnHeight] = useState<number | null>(null);

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

    // ─── 4. Pricing cards stagger ───────────────────────────────────────────
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

    // ─── 5. Count-up stats ──────────────────────────────────────────────────
    const stats = gsap.utils.toArray<HTMLElement>("[data-count]");
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

    // ─── 6. Architecture stagger items ──────────────────────────────────────
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

    // ─── 7. Developer section ───────────────────────────────────────────────
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

    // ─── 9. Glass cards ────────────────────────────────────────────────────
    const glassCards = gsap.utils.toArray<HTMLElement>(".glass-card");
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

    // ─── 10. Engine cards ───────────────────────────────────────────────────
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


    // ─── 12. Final CTA section ──────────────────────────────────────────────
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
  }, { scope: containerRef });




  return (
    <div ref={containerRef}>
      <NotchNavbar />

      <main className="relative overflow-x-hidden">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center pt-24 pb-16 w-full organic-bg ambient-hero overflow-visible relative">
          <div className="max-w-container-max mx-auto px-grid-margin relative">
            <div className="absolute top-0 right-0 h-90 w-90 rounded-full bg-accent-green/10 blur-3xl z-0"></div>
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
                <AnimatedButton variant="outline" className="px-8 py-3 rounded-full font-body-md text-body-md hero-animate pointer-events-auto text-sm" onClick={(e) => handleNavClick(e, '#signal-blocks')}>
                  Explore Signals
                </AnimatedButton>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-4xl border border-outline-variant/15 bg-white/90 p-4 shadow-sm hero-animate">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-text-muted">Latency</p>
                  <p className="mt-2 text-xl font-bold text-primary">24 ms</p>
                </div>
                <div className="rounded-4xl border border-outline-variant/15 bg-white/90 p-4 shadow-sm hero-animate">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-text-muted">Scope coverage</p>
                  <p className="mt-2 text-xl font-bold text-primary">1-3</p>
                </div>
                <div className="rounded-4xl border border-outline-variant/15 bg-white/90 p-4 shadow-sm hero-animate">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-text-muted">Compliance</p>
                  <p className="mt-2 text-xl font-bold text-primary">CSRD + SEC</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 relative hero-animate h-full flex items-center justify-center">
              {leftColumnHeight && <HeroInteractiveFlow containerHeight={leftColumnHeight} />}
            </div>

          </div>
          </div>
        </section>

        {/* Logo Marquee — trust strip between Hero and Social Proof */}
        <LogoCloud />

        {/* Social Proof */}
        <section id="social-proof" className="py-6">
          <div className="max-w-container-max mx-auto px-grid-margin">
            <div className="flow-soft relative overflow-hidden rounded-[40px] border border-outline-variant/20 bg-white p-6 shadow-[0_40px_90px_rgba(3,36,22,0.08)]">
              <div className="absolute -right-10 top-12 h-48 w-48 rounded-full bg-accent-green/10 blur-3xl"></div>
              <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] items-center">
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
        <section id="platform-engine" className="px-grid-margin py-12 md:py-16">
          <div className="max-w-container-max mx-auto grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-center">
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
        <section id="pulse" className="px-grid-margin py-12 md:py-16">
          <div className="max-w-container-max mx-auto grid gap-8 lg:grid-cols-[0.95fr_1.05fr] items-start">
            <div className="flow-soft relative overflow-hidden rounded-[40px] border border-outline-variant/20 bg-primary text-on-primary p-10 shadow-[0_28px_90px_rgba(3,36,22,0.16)]">
              <div className="absolute -right-10 top-8 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
              <div className="absolute left-8 bottom-12 h-28 w-28 rounded-full border border-white/15 bg-white/5"></div>
              <p className="font-label-caps text-label-caps uppercase text-accent-green/80">Signal intelligence</p>
              <h2 className="gsap-title mt-4 font-headline-xl text-headline-xl max-md:text-headline-lg leading-tight">Watch your carbon footprint move from data to decisions.</h2>
              <p className="mt-6 max-w-xl font-body-xl text-on-primary/80">Track every emission source and compliance alert in one place with live graphs, AI-driven recommendations, and dispatch-ready summaries.</p>
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
            <div className="grid gap-4">
              <div className="glass-card rounded-4xl border border-outline-variant/20 bg-white/95 p-8 shadow-sm">
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
              <div className="flow-soft rounded-[40px] border border-outline-variant/20 bg-white p-8 shadow-[0_20px_40px_rgba(3,36,22,0.08)]">
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
        <section className="px-grid-margin py-12 md:py-16">
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
        <section id="signal-blocks" className="px-grid-margin py-12 md:py-16">
          <div className="flow-soft relative overflow-hidden rounded-[40px] border border-outline-variant/20 bg-white p-8 md:p-12 shadow-[0_24px_80px_rgba(3,36,22,0.05)]">
            <div className="ambient-grid-panel absolute inset-0"></div>
            <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
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
        <section id="features" className="px-grid-margin py-12 md:py-16 max-w-container-max mx-auto">
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
        <section id="architecture" className="bg-background text-text-main py-4 md:py-6 overflow-hidden">
          <EcosystemShowcase />
        </section>

        <StackedSteps />
        {/* Code Section */}
        <section id="developers" className="px-grid-margin py-12 md:py-16 max-w-container-max mx-auto">
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

        {/* Pricing Section */}
        <section id="pricing" className="px-grid-margin py-12 md:py-16 max-w-container-max mx-auto">
          <div className="text-center space-y-4 mb-12">
            <p className="font-label-caps text-label-caps text-accent-green uppercase">Flexible Plans</p>
            <h2 className="gsap-title font-headline-xl text-headline-xl">Sized for your operations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="pricing-card bg-white p-10 rounded-3xl border border-outline-variant/10 shadow-sm flex flex-col justify-between transition-all duration-400">
              <div>
                <h3 className="font-headline-lg text-[24px] mb-2">Developer</h3>
                <p className="font-body-md text-text-muted mb-6">Perfect for staging & small team experiments.</p>
                <p className="font-stat-display text-stat-display text-primary mb-6">$0 <span className="text-[16px] font-normal text-text-muted">/ month</span></p>
                <ul className="space-y-4 mb-8 text-body-md text-text-main">
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> Up to 5 projects
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> 5,000 API requests/mo
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> Community support
                  </li>
                </ul>
              </div>
              <AnimatedButton variant="secondary" className="w-full py-3 rounded-full">Get Started</AnimatedButton>
            </div>
            {/* Growth Plan */}
            <div className="pricing-card section-card group bg-white p-10 rounded-3xl border-2 border-accent-green shadow-md flex flex-col justify-between relative transition-all duration-400">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-accent-green text-white px-4 py-1 rounded-full text-xs font-bold font-label-caps tracking-wider">Popular</div>
              <div>
                <h3 className="font-headline-lg text-[24px] mb-2">Growth</h3>
                <p className="font-body-md text-text-muted mb-6">For scaling engineering organizations.</p>
                <p className="font-stat-display text-stat-display text-primary mb-6">$499 <span className="text-[16px] font-normal text-text-muted">/ month</span></p>
                <ul className="space-y-4 mb-8 text-body-md text-text-main">
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> Unlimited projects
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> Real-time compliance reporting
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> 100,000 API requests/mo
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> 24/7 Email & Slack support
                  </li>
                </ul>
              </div>
              <AnimatedButton variant="solid" className="w-full py-3 rounded-full">Start Free Trial</AnimatedButton>
            </div>
            {/* Enterprise Plan */}
            <div className="pricing-card bg-white p-10 rounded-3xl border border-outline-variant/10 shadow-sm flex flex-col justify-between transition-all duration-400">
              <div>
                <h3 className="font-headline-lg text-[24px] mb-2">Enterprise</h3>
                <p className="font-body-md text-text-muted mb-6">Custom architecture for global supply chains.</p>
                <p className="font-stat-display text-stat-display text-primary mb-6">Custom</p>
                <ul className="space-y-4 mb-8 text-body-md text-text-main">
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> Dedicated compliance officer
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> Unlimited API volume
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> Custom integrations & SLA
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> Zero-carbon consulting included
                  </li>
                </ul>
              </div>
              <AnimatedButton variant="secondary" className="w-full py-3 rounded-full" onClick={(e) => handleNavClick(e, '#contact')}>Contact Sales</AnimatedButton>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-grid-margin py-12 md:py-16 max-w-4xl mx-auto">
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
        <section id="contact" className="px-grid-margin py-12 md:py-16">
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
              <li><a className="text-body-md text-text-muted hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleNavClick(e, '#pricing')}>Pricing</a></li>
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
    </div>
  );
}
