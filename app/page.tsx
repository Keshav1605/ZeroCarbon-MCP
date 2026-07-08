"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePanelTab, setActivePanelTab] = useState<"signals" | "actions" | "compliance">("signals");
  const [panelInput, setPanelInput] = useState("");
  const [panelMessages, setPanelMessages] = useState([
    { id: 1, role: "assistant", text: "I detected a carbon spike in your last deployment window." },
    { id: 2, role: "assistant", text: "Want me to draft a mitigation note for operations?" },
  ]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lssPanelRef = useRef<HTMLDivElement>(null);
  
  const lenis = useLenis();

  // Sync GSAP ScrollTrigger with Lenis
  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  // Navbar Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(targetId, {
        offset: -80,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  const handlePanelSend = () => {
    const value = panelInput.trim();
    if (!value) return;

    const replyText = activePanelTab === "actions"
      ? `Routing “${value}” into your automation layer.`
      : activePanelTab === "compliance"
        ? `Compiling compliance context for “${value}”.`
        : `I’ve logged “${value}” and linked it to the latest signal.`;

    setPanelMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", text: value },
      { id: Date.now() + 1, role: "assistant", text: replyText },
    ]);
    setPanelInput("");
  };

  const handleLssWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const panel = lssPanelRef.current;
    if (!panel) return;

    const atTop = panel.scrollTop <= 0;
    const atBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight;

    if ((event.deltaY > 0 && !atBottom) || (event.deltaY < 0 && !atTop)) {
      event.preventDefault();
      event.stopPropagation();
      panel.scrollTop += event.deltaY;
    }
  };

  useGSAP(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // If user prefers reduced motion, avoid scroll animations and just let CSS/initial layout handle the page.
    if (prefersReducedMotion) return;

    // 1. Hero animations on load
    gsap.fromTo(

      ".hero-animate",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all",
      }
    );

    // 2. Title reveals using clip-path mask
const titles = gsap.utils.toArray<HTMLElement>(".gsap-title");
    titles.forEach((title) => {
      gsap.fromTo(

        title,
        { clipPath: "inset(0 100% 0 0)", opacity: 0, y: 20 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            once: true,
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // 3. Feature Cards Stagger Slide-Up
    gsap.fromTo(
      ".feature-card",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#features",
          start: "top 80%",
          once: true,
          toggleActions: "play none none reverse",
        },
      }
    );

    // 4. Pricing Cards Stagger Slide-Up
    gsap.fromTo(
      ".pricing-card",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#pricing",
          start: "top 80%",
          once: true,
          toggleActions: "play none none reverse",
        },
      }
    );

    // 5. How It Works steps stagger
    gsap.fromTo(
      ".how-item",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#how-it-works",
          start: "top 80%",
          once: true,
          toggleActions: "play none none reverse",
        },
      }
    );

    // 6. Count-up stats (ecosystem section) - tasteful and low-cost
    const stats = gsap.utils.toArray<HTMLElement>("[data-count]");
    if (stats.length > 0) {
      stats.forEach((el) => {
        const target = Number(el.getAttribute("data-count") ?? "0");
        const suffix = el.getAttribute("data-count-suffix") ?? "";
        const prefix = el.getAttribute("data-count-prefix") ?? "";
        const divider = el.getAttribute("data-count-divider") ?? "";

        gsap.fromTo(
          el,
          {
            // start at 0 but keep formatting consistent
            innerText: "0",
          },
          {
            innerText: String(target),
            duration: 1,
            ease: "power2.out",
            snap: { innerText: 1 },
            stagger: 0,
            scrollTrigger: {
              trigger: "#architecture",
              start: "top 80%",
              once: true,
            },
            onUpdate: () => {
              const current = Number(el.innerText.replace(/[^0-9.]/g, "")) || 0;
              if (divider) {
                el.innerText = `${current}${divider}${suffix}`;
              } else {
                el.innerText = `${prefix}${current}${suffix}`;
              }
            },
          }
        );
      });
    }


    // 7. Additional scroll reveals (architecture, developers, final CTA)
    gsap.fromTo(
      "#architecture .stagger-item",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#architecture",
          start: "top 80%",
          once: true,
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      "#developers > div > div",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "#developers",
          start: "top 80%",
          once: true,
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".floating-chip",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.12,
        delay: 0.2,
      }
    );

    gsap.fromTo(
      ".glass-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: "#signal-blocks",
          start: "top 80%",
          once: true,
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".hero-panel, .brand-box, .engine-card, .timeline-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: "#hero",
          start: "top 85%",
          once: true,
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".brand-box",
      { opacity: 0, y: 30, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "#social-proof",
          start: "top 80%",
          once: true,
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".engine-card",
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#platform-engine",
          start: "top 80%",
          once: true,
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".timeline-card",
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: "#how-it-works",
          start: "top 80%",
          once: true,
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      "#contact",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
          once: true,
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);


  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div ref={containerRef}>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'navbar-scrolled py-2' : 'py-4'}`} id="navbar">
        <div className="max-w-container-max mx-auto px-grid-margin flex justify-between items-center h-16">
          <div className="font-headline-lg text-[24px] font-bold text-primary tracking-tight">ZeroCarbon MCP</div>
          <div className="hidden md:flex items-center gap-8">
            <a className="font-body-md text-body-md hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleNavClick(e, '#hero')}>Home</a>
            <a className="font-body-md text-body-md hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleNavClick(e, '#features')}>Features</a>
            <a className="font-body-md text-body-md hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleNavClick(e, '#pricing')}>Pricing</a>
            <a className="font-body-md text-body-md hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleNavClick(e, '#developers')}>Developers</a>
            <a className="font-body-md text-body-md hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleNavClick(e, '#faq')}>FAQ</a>
            <button className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-body-md text-body-md font-bold hover:bg-opacity-90 transition-all" onClick={(e) => handleNavClick(e, '#contact')}>Request a Demo</button>
          </div>
          <button className="md:hidden">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="hero" className="pt-40 pb-12 px-grid-margin max-w-container-max mx-auto organic-bg ambient-hero overflow-hidden">
          <div className="absolute top-0 right-0 h-90 w-90 rounded-full bg-accent-green/10 blur-3xl"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-accent-green/20 bg-surface-mint/90 px-4 py-2 text-sm font-semibold text-accent-green shadow-sm">
                <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse"></span>
                ZeroCarbon MCP launch
              </div>
              <div className="space-y-6">
                <h1 className="font-display-lg text-display-lg max-md:text-headline-xl leading-[1.02] hero-animate">
                  Turn every carbon signal into operational action.
                </h1>
                <p className="font-body-xl text-body-xl text-text-muted max-w-2xl hero-animate">
                  A new MCP built to unify AI agents, carbon telemetry, and compliance workflows in one animated control plane.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                <button className="shine bg-primary text-on-primary px-10 py-5 rounded-full font-body-md text-body-md font-bold flex items-center justify-center gap-2 hover:shadow-xl transition-all hero-animate" onClick={(e) => handleNavClick(e, '#contact')}>
                  Request a Demo
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
                <button className="border border-primary/20 text-primary px-10 py-5 rounded-full font-body-md text-body-md font-semibold hover:bg-primary/5 transition-all hero-animate" onClick={(e) => handleNavClick(e, '#signal-blocks')}>
                  Explore Signals
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-4xl border border-outline-variant/15 bg-white/90 p-5 shadow-sm hero-animate">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-text-muted">Latency</p>
                  <p className="mt-3 text-2xl font-bold text-primary">24 ms</p>
                </div>
                <div className="rounded-4xl border border-outline-variant/15 bg-white/90 p-5 shadow-sm hero-animate">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-text-muted">Scope coverage</p>
                  <p className="mt-3 text-2xl font-bold text-primary">1-3</p>
                </div>
                <div className="rounded-4xl border border-outline-variant/15 bg-white/90 p-5 shadow-sm hero-animate">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-text-muted">Compliance</p>
                  <p className="mt-3 text-2xl font-bold text-primary">CSRD + SEC</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 relative hero-animate">
              <div className="hero-panel flow-soft relative overflow-hidden rounded-[48px] border border-outline-variant/20 bg-white/85 p-2 shadow-[0_30px_90px_rgba(3,36,22,0.12)] backdrop-blur-xl">
                <div className="absolute -left-12 top-6 h-32 w-32 rounded-full bg-accent-green/10 blur-2xl"></div>
                <div className="absolute right-8 top-12 h-24 w-24 rounded-full border border-accent-green/20"></div>
                <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#07130d] p-2 shadow-inner min-h-[520px]">
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#0f1b14] px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400"></span>
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400"></span>
                      <span className="h-2.5 w-2.5 rounded-full bg-green-400"></span>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                      LSS • Live
                    </div>
                  </div>
                  <div
                    ref={lssPanelRef}
                    onWheel={handleLssWheel}
                    className="h-[400px] overflow-y-auto overflow-x-hidden overscroll-contain px-3 py-3 pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/15"
                    data-lenis-prevent="true"
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/10 p-1.5">
                        {(["signals", "actions", "compliance"] as const).map((tab) => (
                          <button
                            key={tab}
                            type="button"
                            onClick={() => setActivePanelTab(tab)}
                            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all ${activePanelTab === tab ? "bg-accent-green text-white shadow-sm" : "bg-transparent text-white/70 hover:bg-white/10"}`}
                          >
                            {tab === "signals" ? "Signals" : tab === "actions" ? "Actions" : "Compliance"}
                          </button>
                        ))}
                      </div>

                      <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-white/12 to-white/6 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.24em] text-white/60">ZeroCarbon MCP launch</p>
                            <p className="mt-1 text-lg font-semibold text-white">Operational carbon intelligence, now live</p>
                            <p className="mt-2 text-sm text-white/70">A launch-ready control plane for agents, telemetry, and compliance workflows.</p>
                          </div>
                          <span className="rounded-full bg-accent-green/20 px-3 py-1 text-xs font-semibold text-accent-green">Launching</span>
                        </div>

                        <div className="mt-4 grid gap-2 sm:grid-cols-3">
                          <div className="rounded-2xl border border-white/10 bg-[#07130d]/60 p-2.5">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">Latency</p>
                            <p className="mt-1 text-base font-semibold text-white">24 ms</p>
                          </div>
                          <div className="rounded-2xl border border-white/10 bg-[#07130d]/60 p-2.5">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">Contexts</p>
                            <p className="mt-1 text-base font-semibold text-white">4.2k</p>
                          </div>
                          <div className="rounded-2xl border border-white/10 bg-[#07130d]/60 p-2.5">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">Policy sync</p>
                            <p className="mt-1 text-base font-semibold text-white">92%</p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[24px] border border-white/10 bg-white/10 p-3">
                        {activePanelTab === "signals" && (
                          <>
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <p className="text-[10px] uppercase tracking-[0.24em] text-white/60">Live signal stream</p>
                                <p className="mt-1 text-lg font-semibold text-white">Carbon forecasts and alerts</p>
                              </div>
                              <span className="rounded-full bg-accent-green/20 px-3 py-1 text-xs font-semibold text-accent-green">Connected</span>
                            </div>
                            <div className="mt-4 overflow-hidden rounded-[20px] border border-white/10 bg-white/95 shadow-sm">
                              <div className="hero-chart h-44 px-4 pt-4">
                                <div className="chart-grid"></div>
                                <div className="hero-chart-line hero-chart-line-1"></div>
                                <div className="hero-chart-line hero-chart-line-2"></div>
                                <div className="hero-chart-point hero-chart-point-1"></div>
                                <div className="hero-chart-point hero-chart-point-2"></div>
                                <div className="hero-chart-point hero-chart-point-3"></div>
                                <div className="hero-chart-marker hero-chart-marker-1">42%</div>
                                <div className="hero-chart-marker hero-chart-marker-2">68%</div>
                              </div>
                            </div>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                              <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                                <p className="text-xs text-white/70">Data freshness</p>
                                <p className="mt-2 text-base font-bold text-white"><span className="text-accent-green">5</span> sec</p>
                              </div>
                              <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                                <p className="text-xs text-white/70">Policy hits</p>
                                <p className="mt-2 text-base font-bold text-white"><span className="text-accent-green">14</span></p>
                              </div>
                            </div>
                          </>
                        )}

                        {activePanelTab === "actions" && (
                          <>
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <p className="text-[10px] uppercase tracking-[0.24em] text-white/60">Agent actions</p>
                                <p className="mt-1 text-lg font-semibold text-white">Instant playbooks</p>
                              </div>
                              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">Ready</span>
                            </div>
                            <div className="mt-4 space-y-2">
                              <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white/80">Open mitigation draft for compliance review</div>
                              <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white/80">Route the event into Slack and Jira</div>
                              <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white/80">Summarize the risk to leadership</div>
                            </div>
                          </>
                        )}

                        {activePanelTab === "compliance" && (
                          <>
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <p className="text-[10px] uppercase tracking-[0.24em] text-white/60">Compliance view</p>
                                <p className="mt-1 text-lg font-semibold text-white">Policy-safe status</p>
                              </div>
                              <span className="rounded-full bg-accent-green/20 px-3 py-1 text-xs font-semibold text-accent-green">Audit-ready</span>
                            </div>
                            <div className="mt-4 space-y-2">
                              <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white/80">CSRD checklist 92% complete</div>
                              <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white/80">SEC evidence chain synced</div>
                              <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white/80">3 reviewers pending sign-off</div>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="rounded-[24px] border border-white/10 bg-white/5 p-3 text-white">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.24em] text-white/60">Assistant</p>
                            <p className="mt-1 text-sm font-semibold text-white">Try a prompt</p>
                          </div>
                          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">Live</span>
                        </div>
                        <div className="mt-4 min-h-[220px] space-y-2 overflow-hidden rounded-[20px] border border-white/10 bg-[#07130d] p-3">
                          {panelMessages.map((message) => (
                            <div key={message.id} className={`rounded-2xl px-3 py-2 text-sm ${message.role === "user" ? "ml-6 bg-accent-green/20 text-white" : "mr-6 bg-white/10 text-white/80"}`}>
                              {message.text}
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 flex gap-2">
                          <input
                            value={panelInput}
                            onChange={(event) => setPanelInput(event.target.value)}
                            onKeyDown={(event) => event.key === "Enter" && handlePanelSend()}
                            placeholder="Ask the panel to act..."
                            className="flex-1 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none"
                          />
                          <button
                            type="button"
                            onClick={handlePanelSend}
                            className="rounded-full bg-accent-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-green/90"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 left-6 grid gap-3 sm:grid-cols-3">
                  <div className="hero-chip float-animation rounded-[20px] border border-outline-variant/20 bg-white/90 px-4 py-3 text-sm font-semibold text-primary shadow-sm" style={{ animationDelay: "0s" }}>
                    Secure discovery
                  </div>
                  <div className="hero-chip float-animation rounded-[20px] border border-outline-variant/20 bg-white/90 px-4 py-3 text-sm font-semibold text-primary shadow-sm" style={{ animationDelay: "0.2s" }}>
                    Compliance-ready
                  </div>
                  <div className="hero-chip float-animation rounded-[20px] border border-outline-variant/20 bg-white/90 px-4 py-3 text-sm font-semibold text-primary shadow-sm" style={{ animationDelay: "0.4s" }}>
                    Agent-native
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section id="social-proof" className="py-10">
          <div className="max-w-container-max mx-auto px-grid-margin">
            <div className="flow-soft relative overflow-hidden rounded-[40px] border border-outline-variant/20 bg-white p-10 shadow-[0_40px_90px_rgba(3,36,22,0.08)]">
              <div className="absolute -right-10 top-12 h-48 w-48 rounded-full bg-accent-green/10 blur-3xl"></div>
              <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-center">
                <div className="space-y-6">
                  <p className="font-label-caps text-label-caps uppercase text-accent-green">Trusted by modern AI teams</p>
                  <h2 className="text-headline-xl font-headline-xl leading-tight">Built to scale carbon intelligence across product and operations.</h2>
                  <p className="max-w-xl font-body-xl text-body-xl text-text-muted">ZeroCarbon MCP delivers live signals, actionable carbon guidance, and policy-safe workflow automation for companies shipping sustainable AI and cloud products.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="brand-box float-animation rounded-[28px] border border-outline-variant/15 bg-surface-mint/90 p-6 text-center" style={{ animationDelay: "0s" }}>
                    <span className="material-symbols-outlined text-[28px] text-accent-green">bolt</span>
                    <p className="mt-4 text-sm font-semibold text-primary">Speed-first</p>
                  </div>
                  <div className="brand-box float-animation rounded-[28px] border border-outline-variant/15 bg-surface-mint/90 p-6 text-center" style={{ animationDelay: "0.2s" }}>
                    <span className="material-symbols-outlined text-[28px] text-accent-green">shield</span>
                    <p className="mt-4 text-sm font-semibold text-primary">Compliance-ready</p>
                  </div>
                  <div className="brand-box float-animation rounded-[28px] border border-outline-variant/15 bg-surface-mint/90 p-6 text-center" style={{ animationDelay: "0.4s" }}>
                    <span className="material-symbols-outlined text-[28px] text-accent-green">trending_up</span>
                    <p className="mt-4 text-sm font-semibold text-primary">Impact-driven</p>
                  </div>
                </div>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[28px] bg-primary/5 p-6">
                  <p className="text-sm uppercase tracking-[0.18em] text-text-muted">Live streams</p>
                  <p className="mt-4 text-3xl font-bold text-primary">84%</p>
                </div>
                <div className="rounded-[28px] bg-primary/5 p-6">
                  <p className="text-sm uppercase tracking-[0.18em] text-text-muted">Auto rules</p>
                  <p className="mt-4 text-3xl font-bold text-primary">42</p>
                </div>
                <div className="rounded-[28px] bg-primary/5 p-6">
                  <p className="text-sm uppercase tracking-[0.18em] text-text-muted">Verified audits</p>
                  <p className="mt-4 text-3xl font-bold text-primary">12k</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Engine */}
        <section id="platform-engine" className="px-grid-margin py-12 md:py-16">
          <div className="max-w-container-max mx-auto grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-center">
            <div className="space-y-6">
              <p className="font-label-caps text-label-caps uppercase text-accent-green">Platform engine</p>
              <h2 className="font-headline-xl text-headline-xl max-md:text-headline-lg leading-tight">A live network for carbon decisions, not just reporting.</h2>
              <p className="max-w-xl font-body-xl text-body-xl text-text-muted">ZeroCarbon MCP stitches carbon telemetry, agent triggers, and audit workflows together with one interface that keeps every stakeholder aligned.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="engine-card rounded-[32px] border border-outline-variant/15 bg-white p-8 shadow-sm">
                  <span className="font-label-caps text-label-caps uppercase text-text-muted">Automated</span>
                  <h3 className="mt-4 font-headline-lg text-[22px]">Policy-safe alerts</h3>
                  <p className="mt-4 font-body-md text-text-muted">Every detected carbon spike is enriched with actions, context, and stakeholder routing.</p>
                </div>
                <div className="engine-card rounded-[32px] border border-outline-variant/15 bg-white p-8 shadow-sm">
                  <span className="font-label-caps text-label-caps uppercase text-text-muted">Connected</span>
                  <h3 className="mt-4 font-headline-lg text-[22px]">Agent-native workflows</h3>
                  <p className="mt-4 font-body-md text-text-muted">Send signals to AI agents, engineering tools, and compliance systems without manual hand-offs.</p>
                </div>
              </div>
            </div>
            <div className="flow-soft relative overflow-hidden rounded-[40px] border border-outline-variant/20 bg-surface-mint/80 p-10 shadow-[0_20px_40px_rgba(3,36,22,0.08)]">
              <div className="absolute left-6 top-6 h-28 w-28 rounded-full bg-accent-green/10 blur-3xl"></div>
              <div className="relative grid gap-6">
                <div className="engine-node-card rounded-[32px] bg-white p-6 shadow-sm">
                  <p className="font-label-caps text-label-caps uppercase text-text-muted">Node</p>
                  <p className="mt-3 text-xl font-semibold text-primary">Carbon stream index</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="engine-node-card rounded-[32px] bg-white p-6 shadow-sm">
                    <p className="font-label-caps text-label-caps uppercase text-text-muted">Action</p>
                    <p className="mt-3 text-xl font-semibold text-primary">Dispatch rule</p>
                  </div>
                  <div className="engine-node-card rounded-[32px] bg-white p-6 shadow-sm">
                    <p className="font-label-caps text-label-caps uppercase text-text-muted">Metric</p>
                    <p className="mt-3 text-xl font-semibold text-primary">Scope exposure</p>
                  </div>
                </div>
                <div className="engine-network relative rounded-4xl bg-primary/5 p-8">
                  <div className="engine-bubble engine-bubble-1">Model</div>
                  <div className="engine-bubble engine-bubble-2">Ledger</div>
                  <div className="engine-bubble engine-bubble-3">Audit</div>
                  <div className="engine-bubble engine-bubble-4">Compliance</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Answer */}
        <section id="pulse" className="px-grid-margin py-12 md:py-16">
          <div className="max-w-container-max mx-auto grid gap-8 lg:grid-cols-[0.95fr_1.05fr] items-start">
            <div className="flow-soft relative overflow-hidden rounded-[40px] border border-outline-variant/20 bg-primary text-on-primary p-10 shadow-[0_28px_90px_rgba(3,36,22,0.16)]">
              <div className="absolute -right-10 top-8 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
              <div className="absolute left-8 bottom-12 h-28 w-28 rounded-full border border-white/15 bg-white/5"></div>
              <p className="font-label-caps text-label-caps uppercase text-accent-green/80">Signal intelligence</p>
              <h2 className="mt-4 font-headline-xl text-headline-xl max-md:text-headline-lg leading-tight">Watch your carbon footprint move from data to decisions.</h2>
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
                <h2 className="font-headline-xl text-headline-xl max-md:text-headline-lg leading-tight">A launchpad for carbon-aware product teams.</h2>
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
        <section id="architecture" className="bg-primary text-on-primary py-12 md:py-16 overflow-hidden">
          <div className="max-w-container-max mx-auto px-grid-margin grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-4">

                <p className="font-label-caps text-label-caps text-primary-fixed opacity-70 uppercase">Integration Hub</p>
                <h2 className="gsap-title font-headline-xl text-headline-xl">Broad Ecosystem Support</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-on-primary-fixed-variant/20 p-4 rounded-xl flex items-center gap-3 border border-white/5">
                  <span className="material-symbols-outlined text-primary-fixed">terminal</span>
                  <span className="font-body-md">Claude 3.5</span>
                </div>
                <div className="bg-on-primary-fixed-variant/20 p-4 rounded-xl flex items-center gap-3 border border-white/5">
                  <span className="material-symbols-outlined text-primary-fixed">code</span>
                  <span className="font-body-md">Cursor</span>
                </div>
                <div className="bg-on-primary-fixed-variant/20 p-4 rounded-xl flex items-center gap-3 border border-white/5">
                  <span className="material-symbols-outlined text-primary-fixed">waves</span>
                  <span className="font-body-md">Windsurf</span>
                </div>
                <div className="bg-on-primary-fixed-variant/20 p-4 rounded-xl flex items-center gap-3 border border-white/5">
                  <span className="material-symbols-outlined text-primary-fixed">lan</span>
                  <span className="font-body-md">HTTP Bridge</span>
                </div>
              </div>
              <div className="flex gap-16 pt-6">
              <div>
                  <p className="font-stat-display text-stat-display text-primary-fixed" data-count="500" data-count-suffix="+">0</p>
                  <p className="font-body-md text-primary-fixed/60">Emission Factors</p>
                </div>
                <div>
                  <p className="font-stat-display text-stat-display text-primary-fixed" data-count="24" data-count-prefix="" data-count-divider="/" data-count-suffix="7">0</p>
                  <p className="font-body-md text-primary-fixed/60">Audit Support</p>
                </div>

              </div>
            </div>
            <div className="relative group stagger-item" style={{ transitionDelay: '200ms' }}>
              <div className="flow-soft rounded-[40px] overflow-hidden shadow-2xl relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Neural sustainability network illustration" className="w-full aspect-4/3 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1BQbrQ_6WpbvTn8YQhoiVdUi2QG8rygmz4M0bW1u8XWMSO-YZ9dWKVuQXyiqyYFFIghtSp8kTJg0LwmnWByZHybykPxIdjtMwF32RjrGvsR3mQf0jz5smppkFLfRQJFPvXRE7ggzaLZc2NflI35fjKB-trzRZmRDlnL24xHF18rWonjX-EDeCk_bRazd82syRs8qbYe7nE9skJ6FlNu7wEz5f8qlHvJEWiMTBABcXZYfvD-NBsoWi_hGyr_QFGhAO" />
                <div className="absolute inset-0 bg-linear-to-tr from-primary/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="px-grid-margin py-12 md:py-16 max-w-container-max mx-auto">
          <div className="text-center space-y-4 mb-12">
            <p className="font-label-caps text-label-caps text-accent-green uppercase">The Path To Zero</p>
            <h2 className="gsap-title font-headline-xl text-headline-xl">Simplicity in every step</h2>
          </div>
          <div className="relative grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="hidden lg:block">
              <div className="timeline-line absolute left-16 top-0 h-full w-px bg-accent-green/10"></div>
              <div className="timeline-node top-[8%]">1</div>
              <div className="timeline-node top-[32%]">2</div>
              <div className="timeline-node top-[56%]">3</div>
              <div className="timeline-node top-[80%]">4</div>
            </div>
            <div className="space-y-8">
              <div className="timeline-card float-animation p-8 rounded-[32px] border border-outline-variant/10 bg-white shadow-sm" style={{ animationDelay: "0s" }}>
                <span className="timeline-badge">01</span>
                <h4 className="font-headline-lg text-[22px] mt-4">Install &amp; Connect</h4>
                <p className="mt-3 font-body-md text-text-muted">Deploy our lightweight agent across your cloud stack in minutes.</p>
              </div>
              <div className="timeline-card float-animation p-8 rounded-[32px] border border-outline-variant/10 bg-white shadow-sm" style={{ animationDelay: "0.2s" }}>
                <span className="timeline-badge">02</span>
                <h4 className="font-headline-lg text-[22px] mt-4">Discover Tools</h4>
                <p className="mt-3 font-body-md text-text-muted">AI automatically maps every software tool to its energy footprint.</p>
              </div>
              <div className="timeline-card float-animation p-8 rounded-[32px] border border-outline-variant/10 bg-white shadow-sm" style={{ animationDelay: "0.4s" }}>
                <span className="timeline-badge">03</span>
                <h4 className="font-headline-lg text-[22px] mt-4">Calculate Emissions</h4>
                <p className="mt-3 font-body-md text-text-muted">Compute real-time Scope 1, 2, and 3 data with certified accuracy.</p>
              </div>
              <div className="timeline-card float-animation p-8 rounded-[32px] border border-outline-variant/10 bg-white shadow-sm" style={{ animationDelay: "0.6s" }}>
                <span className="timeline-badge">04</span>
                <h4 className="font-headline-lg text-[22px] mt-4">Store in Ledger</h4>
                <p className="mt-3 font-body-md text-text-muted">Immutable audit logs saved to our carbon ledger for reporting.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Code Section */}
        <section id="developers" className="px-grid-margin py-12 md:py-16 max-w-container-max mx-auto">
          <div className="bg-surface-container-low rounded-[48px] p-8 md:p-16 border border-outline-variant/10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <div className="code-panel bg-[#0b1410] rounded-2xl p-6 font-mono text-[14px] text-on-primary shadow-2xl overflow-hidden relative">
                <div className="flex gap-1.5 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <p className="text-white/40 mb-4">// Initializing ZeroCarbon MCP</p>
                <p className="mb-1 text-blue-300">const <span className="text-white">zeroCarbon</span> = new <span className="text-teal-300">MCPCore</span>({'{'}</p>
                <p className="pl-4">auditMode: <span className="text-amber-200">&apos;real-time&apos;</span>,</p>
                <p className="pl-4 text-white">compliance: [<span className="text-amber-200">&apos;CSRD&apos;</span>, <span className="text-amber-200">&apos;SEC&apos;</span>],</p>
                <p className="pl-4 text-white">scopeTracking: <span className="text-amber-200">&apos;3_FULL&apos;</span></p>
                <p className="text-blue-300">{'}'});</p>
                <p className="mt-4 text-blue-300">await <span className="text-white">zeroCarbon</span>.connect(<span className="text-amber-200">&apos;infrastructure&apos;</span>);</p>
                <p className="text-teal-400 mt-2">✓ Ledger ready. Monitoring 4,129 endpoints.</p>
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
              <button className="w-full bg-surface-mint text-primary py-3 rounded-full font-bold hover:bg-primary hover:text-on-primary transition-all">Get Started</button>
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
              <button className="w-full bg-primary text-on-primary py-3 rounded-full font-bold hover:bg-opacity-90 transition-all">Start Free Trial</button>
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
              <button className="w-full bg-surface-mint text-primary py-3 rounded-full font-bold hover:bg-primary hover:text-on-primary transition-all" onClick={(e) => handleNavClick(e, '#contact')}>Contact Sales</button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-grid-margin py-12 md:py-16 max-w-4xl mx-auto">
          <h2 className="gsap-title font-headline-xl text-headline-xl mb-16 text-center">Frequently asked questions</h2>
          <div className="space-y-0 divide-y divide-outline-variant/20">
            {/* FAQ 1 */}
            <div className={`group py-6 ${openFaq === 1 ? 'open' : ''}`}>
              <button className="w-full flex justify-between items-center text-left cursor-pointer" onClick={() => toggleFaq(1)}>
                <h4 className="font-headline-lg text-[22px]">Is my data secure with ZeroCarbon?</h4>
                <span className={`material-symbols-outlined transition-transform duration-300 ${openFaq === 1 ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === 1 ? 'max-h-40 mt-4' : 'max-h-0'}`}>
                <p className="font-body-md text-text-muted">Yes. ZeroCarbon MCP uses enterprise-grade AES-256 encryption and is SOC2 Type II compliant. We never train our AI on your sensitive financial or infrastructure data.</p>
              </div>
            </div>
            {/* FAQ 2 */}
            <div className={`group py-6 ${openFaq === 2 ? 'open' : ''}`}>
              <button className="w-full flex justify-between items-center text-left cursor-pointer" onClick={() => toggleFaq(2)}>
                <h4 className="font-headline-lg text-[22px]">Which cloud providers do you support?</h4>
                <span className={`material-symbols-outlined transition-transform duration-300 ${openFaq === 2 ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === 2 ? 'max-h-40 mt-4' : 'max-h-0'}`}>
                <p className="font-body-md text-text-muted">We offer native integrations for AWS, Google Cloud, and Microsoft Azure, along with generic webhooks for private data centers.</p>
              </div>
            </div>
            {/* FAQ 3 */}
            <div className={`group py-6 border-b border-outline-variant/20 ${openFaq === 3 ? 'open' : ''}`}>
              <button className="w-full flex justify-between items-center text-left cursor-pointer" onClick={() => toggleFaq(3)}>
                <h4 className="font-headline-lg text-[22px]">Can it handle Scope 3 emissions?</h4>
                <span className={`material-symbols-outlined transition-transform duration-300 ${openFaq === 3 ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === 3 ? 'max-h-40 mt-4' : 'max-h-0'}`}>
                <p className="font-body-md text-text-muted">Absolutely. Scope 3 is our specialty. Our AI engine scans purchase orders and supply chain contracts to automatically categorize and calculate indirect emissions.</p>
              </div>
            </div>
          </div>
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
                <button className="bg-surface-mint text-primary px-12 py-6 rounded-full font-body-md text-body-md font-bold hover:bg-white transition-all shadow-2xl" onClick={(e) => handleNavClick(e, '#contact')}>
                  Request Demo
                </button>
                <button className="bg-transparent border border-white/30 text-white px-12 py-6 rounded-full font-body-md text-body-md font-bold hover:bg-white/10 transition-all">
                  Read Documentation
                </button>
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
            <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">public</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">terminal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
