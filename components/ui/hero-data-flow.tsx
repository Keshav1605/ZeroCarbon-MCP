"use client";

import React from "react";

interface DataNode {
  id: string;
  label: string;
  icon: string;
}

const inputNodes: DataNode[] = [
  { id: "sensors", label: "Sensors", icon: "sensors" },
  { id: "cloud", label: "Cloud APIs", icon: "cloud" },
  { id: "telemetry", label: "Telemetry", icon: "analytics" },
];

const outputNodes: DataNode[] = [
  { id: "compliance", label: "Compliance", icon: "verified" },
  { id: "automations", label: "Automations", icon: "workflow" },
];

function NodeCard({ node, side }: { node: DataNode; side: "input" | "output" }) {
  const isInput = side === "input";
  const accentColor = isInput ? "from-emerald-500/20 to-emerald-500/0" : "from-cyan-500/20 to-cyan-500/0";
  const borderColor = isInput ? "border-emerald-500/30" : "border-cyan-500/30";
  const textColor = isInput ? "text-emerald-400" : "text-cyan-400";
  const iconColor = isInput ? "text-emerald-400" : "text-cyan-400";

  return (
    <div className="group relative">
      {/* Glow backdrop */}
      <div className={`absolute -inset-1 bg-linear-to-r ${accentColor} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>

      {/* Card */}
      <div
        className={`relative bg-white/5 backdrop-blur-md border ${borderColor} rounded-lg px-4 py-3 shadow-lg transition-all duration-300 hover:bg-white/10 hover:border-opacity-60`}
      >
        <div className="flex items-center gap-2.5">
          <span className={`material-symbols-outlined text-sm ${iconColor}`}>{node.icon}</span>
          <span className="text-sm font-medium text-zinc-300">{node.label}</span>
        </div>
      </div>
    </div>
  );
}

function CoreNode() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Pulsing glow halo */}
      <div className="absolute w-48 h-48 bg-radial-gradient from-emerald-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>

      {/* Core container */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Outer pulsing ring */}
        <div className="absolute inset-0 rounded-lg border border-emerald-500/40 opacity-0 animate-pulse" style={{ animationDuration: "2s" }}></div>

        {/* Secondary pulsing ring (offset) */}
        <div
          className="absolute inset-0 rounded-lg border border-cyan-500/30 opacity-0"
          style={{
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            animationDelay: "0.5s",
          }}
        ></div>

        {/* Core background with gradient */}
        <div className="absolute inset-2 bg-linear-to-br from-emerald-500/15 to-cyan-500/15 rounded-lg backdrop-blur-sm border border-white/10"></div>

        {/* Core text */}
        <div className="relative z-10 text-center space-y-1">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="material-symbols-outlined text-emerald-400">hub</span>
          </div>
          <p className="text-xs font-semibold text-zinc-200">ZeroCarbon</p>
          <p className="text-[10px] text-zinc-400">MCP Core</p>
        </div>
      </div>
    </div>
  );
}

function AnimatedConnector({ side, index, total }: { side: "left" | "right"; index: number; total: number }) {
  // Calculate vertical position for this connector
  const verticalOffset = (index / (total - 1)) * 100 || 50;

  return (
    <div className="absolute top-0 w-full h-full pointer-events-none">
      <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 100 100" style={{ minHeight: "400px" }}>
        <defs>
          {/* Gradient for the beam */}
          <linearGradient id={`beam-${side}-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={side === "left" ? "#10b981" : "#06b6d4"} stopOpacity="0" />
            <stop offset="50%" stopColor={side === "left" ? "#10b981" : "#06b6d4"} stopOpacity="1" />
            <stop offset="100%" stopColor={side === "left" ? "#10b981" : "#06b6d4"} stopOpacity="0" />
          </linearGradient>

          {/* Animated dash array for flowing effect */}
          <style>{`
            @keyframes beamFlow-${side}-${index} {
              0% {
                stroke-dashoffset: 20;
              }
              100% {
                stroke-dashoffset: 0;
              }
            }
            
            .beam-line-${side}-${index} {
              stroke-dasharray: 4, 6;
              animation: beamFlow-${side}-${index} 1s linear infinite;
            }
          `}</style>
        </defs>

        {/* Connection line from left/right to center */}
        <line
          x1={side === "left" ? "5" : "95"}
          y1={verticalOffset}
          x2={side === "left" ? "45" : "55"}
          y2="50"
          stroke={side === "left" ? "#10b9813d" : "#06b6d43d"}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {/* Animated beam */}
        <line
          x1={side === "left" ? "5" : "95"}
          y1={verticalOffset}
          x2={side === "left" ? "45" : "55"}
          y2="50"
          stroke={`url(#beam-${side}-${index})`}
          strokeWidth="2"
          className={`beam-line-${side}-${index}`}
          vectorEffect="non-scaling-stroke"
          filter="drop-shadow(0 0 3px rgba(16, 185, 129, 0.6))"
        />
      </svg>
    </div>
  );
}

export function HeroDataFlow() {
  return (
    <div className="w-full relative">
      {/* Main container with 3-column layout */}
      <div className="flex items-stretch justify-between gap-8 md:gap-12 lg:gap-16">
        {/* Left Column: Input Nodes */}
        <div className="flex flex-col justify-center gap-4 md:gap-6 shrink-0 min-w-[140px] md:min-w-[180px]">
          {inputNodes.map((node) => (
            <NodeCard key={node.id} node={node} side="input" />
          ))}
        </div>

        {/* Center Column: Core Node */}
        <div className="flex items-center justify-center flex-1 min-w-[180px]">
          <CoreNode />
        </div>

        {/* Right Column: Output Nodes */}
        <div className="flex flex-col justify-center gap-4 md:gap-6 shrink-0 min-w-[140px] md:min-w-[180px]">
          {outputNodes.map((node) => (
            <NodeCard key={node.id} node={node} side="output" />
          ))}
        </div>
      </div>

      {/* Connector Lines Layer (positioned absolutely behind the layout) */}
      <div className="absolute inset-0 -z-10">
        {/* Input connectors */}
        {inputNodes.map((_, index) => (
          <AnimatedConnector key={`input-${index}`} side="left" index={index} total={inputNodes.length} />
        ))}

        {/* Output connectors */}
        {outputNodes.map((_, index) => (
          <AnimatedConnector key={`output-${index}`} side="right" index={index} total={outputNodes.length} />
        ))}
      </div>
    </div>
  );
}

export default HeroDataFlow;
