"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HeroInteractiveFlow = ({ containerHeight }: { containerHeight: number }) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [processingStep, setProcessingStep] = useState(0);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Reset AI processing step when AI node is selected
  useEffect(() => {
    if (activeNode === "ai") {
      setProcessingStep(0);
      const steps = ["Analyzing intent...", "Extracting entities...", "Routing to MCP..."];
      const interval = setInterval(() => {
        setProcessingStep(prev => prev < steps.length - 1 ? prev + 1 : prev);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [activeNode]);

  const nodes = [
    { id: "user", label: "User Prompt", icon: "person" },
    { id: "ai", label: "AI Client", icon: "smart_toy" },
    { id: "router", label: "MCP Router", icon: "route" },
    { id: "calculator", label: "GHG Calculator", icon: "calculate" },
    { id: "ledger", label: "Carbon Ledger", icon: "storage" },
  ];

  const routerSteps = [
    { title: "Understand Intent", badge: "Received", badgeColor: "bg-emerald-100 text-emerald-700" },
    { title: "Select MCP Tool", badge: "Matched", badgeColor: "bg-emerald-100 text-emerald-700" },
    { title: "Execute Workflow", badge: "Processing", badgeColor: "bg-yellow-100 text-yellow-700" },
    { title: "Return Result", badge: "Completed", badgeColor: "bg-emerald-100 text-emerald-700" },
  ];

  const processingSteps = [
    "Analyzing intent...",
    "Extracting entities...",
    "Routing to MCP...",
  ];

  // Render appropriate dialog content based on active node
  const renderDialogContent = () => {
    switch (activeNode) {
      case "user":
        return (
          <div className="p-4 space-y-3">
            <textarea
              className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50/90 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              rows={2}
              defaultValue="Calculate the GHG scope 3 emissions for our recent AWS server usage."
            ></textarea>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
              <span className="material-symbols-outlined text-base">send</span>
              Send to AI
            </button>
          </div>
        );

      case "ai":
        return (
          <div className="p-4">
            <div className="bg-slate-900/90 rounded-xl p-4 font-mono text-xs text-slate-300 backdrop-blur">
              {processingSteps.slice(0, processingStep + 1).map((step, index) => (
                <div key={index} className="flex items-center gap-2 mb-1">
                  <span className="text-emerald-400">$</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "router":
        return (
          <div className="p-4">
            <div className="space-y-4">
              {routerSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 relative">
                  {index < routerSteps.length - 1 && (
                    <div className="absolute left-2.5 top-6 bottom-0 w-0.5 bg-slate-200/70"></div>
                  )}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    index < 3 ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                  }`}>
                    <span className="material-symbols-outlined text-xs">
                      {index < 3 ? "check_circle" : "circle"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-slate-800 text-sm">{step.title}</h4>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${step.badgeColor}`}>
                        {step.badge}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "calculator":
        return (
          <div className="p-4 text-center text-slate-500">
            <span className="material-symbols-outlined text-3xl mb-2">calculate</span>
            <p className="text-base font-semibold text-slate-700">GHG Calculator</p>
            <p className="mt-1 text-sm">Real-time greenhouse gas emissions calculations.</p>
          </div>
        );

      case "ledger":
        return (
          <div className="p-4 text-center text-slate-500">
            <span className="material-symbols-outlined text-3xl mb-2">storage</span>
            <p className="text-base font-semibold text-slate-700">Carbon Ledger</p>
            <p className="mt-1 text-sm">Immutable storage for all carbon data.</p>
          </div>
        );

      default:
        return null;
    }
  };

  // Get initial position for dialog animation
  const getDialogInitialPos = () => {
    if (!activeNode) return { scale: 0.7, opacity: 0, y: -20 };
    const nodeEl = nodeRefs.current[activeNode];
    if (!nodeEl) return { scale: 0.7, opacity: 0, y: -20 };
    return { scale: 0.7, opacity: 0, y: -20 };
  };

  return (
    <div 
      className="w-full relative overflow-hidden rounded-3xl"
      style={{ height: `${containerHeight}px` }}
    >
      {/* Background Video (Full height of container) */}
      <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover rounded-3xl"
        >
          <source src="/green-forest-moewalls-com.mp4" type="video/mp4" />
        </video>
        {/* Liquid Glass Morphism Overlay */}
        <div className="absolute inset-0 bg-emerald-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/30 via-transparent to-emerald-800/20"></div>
      </div>

      {/* XYZ Content with Liquid Glass - Nodes centered on video */}
      <div className="relative z-10 p-4 flex flex-col justify-center items-center h-full overflow-y-auto">
        {/* Flow Container (Nodes + Branches) - Centered */}
        <div className="transition-all duration-500 ease-out w-full">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {nodes.map((node, index) => (
              <React.Fragment key={node.id}>
                {/* Node (with glass effect) */}
                <motion.button
                  ref={(el) => {
                    nodeRefs.current[node.id] = el;
                  }}
                  onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                  whileHover={{ scale: activeNode === node.id ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={
                    "flex flex-col items-center gap-2 p-2 rounded-2xl border transition-all duration-300 backdrop-blur " +
                    (activeNode === node.id
                      ? "border-emerald-400 bg-white/85 shadow-xl scale-105"
                      : "border-white/30 bg-white/60 hover:border-white/50 hover:bg-white/75 hover:shadow-lg") +
                    " min-w-[100px]"
                  }
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-50/80 text-emerald-700">
                    <span className="material-symbols-outlined text-xl">{node.icon}</span>
                  </div>
                  <span className={
                    "text-xs font-semibold text-center " +
                    (activeNode === node.id ? "text-emerald-800" : "text-slate-800")
                  }>
                    {node.label}
                  </span>
                </motion.button>

                {/* Branch to next node */}
                {index < nodes.length - 1 && (
                  <div className="w-6 h-0.5 border-t-2 border-dashed border-emerald-200/70 relative">
                    {/* Arrow head */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1">
                      <span className="material-symbols-outlined text-emerald-300 text-sm">chevron_right</span>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Fixed-size Dialog Box (opens when node is active) */}
        {activeNode && (
          <div className="mt-4 w-full max-h-[45%] overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode}
                initial={getDialogInitialPos()}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.7, opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white/80 rounded-2xl shadow-2xl border border-white/30 overflow-hidden w-full backdrop-blur-md"
              >
                {/* Dialog Header */}
                <div className="bg-emerald-900/80 text-white p-3 flex items-center justify-between backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-base">
                        {nodes.find(n => n.id === activeNode)?.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-base">
                        {nodes.find(n => n.id === activeNode)?.label}
                      </h3>
                      {activeNode === "router" && (
                        <p className="text-xs text-white/80">Intelligent routing</p>
                      )}
                      {activeNode === "user" && (
                        <p className="text-xs text-white/80">Send request to ZeroCarbon AI</p>
                      )}
                      {activeNode === "ai" && (
                        <p className="text-xs text-white/80">Processing request</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveNode(null)}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                </div>

                {/* Dialog Content */}
                {renderDialogContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroInteractiveFlow;
