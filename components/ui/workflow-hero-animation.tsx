"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Node {
  id: string;
  label: string;
  icon: string;
}

const nodes: Node[] = [
  // Left column
  { id: "left-1", label: "Check for new documents", icon: "description" },
  { id: "left-2", label: "Monitor compliance alerts", icon: "warning" },
  // Center column
  { id: "center-1", label: "Parse & classify", icon: "data_object" },
  { id: "center-2", label: "Decision engine", icon: "hub" },
  // Right column
  { id: "right-1", label: "Emit to dashboard", icon: "analytics" },
  { id: "right-2", label: "Log to ledger", icon: "storage" },
];

interface BeamProps {
  fromRef: React.RefObject<HTMLDivElement>;
  toRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  delay?: number;
}

function AnimatedBeam({
  fromRef,
  toRef,
  containerRef,
  delay = 0,
}: BeamProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [pathD, setPathD] = useState("");

  useEffect(() => {
    const calculatePath = () => {
      if (!fromRef.current || !toRef.current || !containerRef.current || !svgRef.current) {
        return;
      }

      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const fromX = fromRect.left - containerRect.left + fromRect.width / 2;
      const fromY = fromRect.top - containerRect.top + fromRect.height / 2;
      const toX = toRect.left - containerRect.left + toRect.width / 2;
      const toY = toRect.top - containerRect.top + toRect.height / 2;

      const controlX = (fromX + toX) / 2;
      const d = `M ${fromX} ${fromY} Q ${controlX} ${fromY}, ${controlX} ${toY} T ${toX} ${toY}`;
      setPathD(d);
    };

    calculatePath();
    window.addEventListener("resize", calculatePath);
    const observer = new ResizeObserver(calculatePath);
    if (fromRef.current) observer.observe(fromRef.current);
    if (toRef.current) observer.observe(toRef.current);

    return () => {
      window.removeEventListener("resize", calculatePath);
      observer.disconnect();
    };
  }, [fromRef, toRef, containerRef]);

  if (!pathD) return null;

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient id={`gradient-${fromRef}-${toRef}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
          <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Base line */}
      <path d={pathD} stroke="rgb(16 185 129 / 0.2)" strokeWidth="1.5" fill="none" />

      {/* Animated beam */}
      <motion.path
        d={pathD}
        stroke={`url(#gradient-${fromRef}-${toRef})`}
        strokeWidth="2"
        fill="none"
        initial={{ strokeDasharray: "8 4", strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -12 }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
      />
    </svg>
  );
}

function WorkflowNode({ node, index }: { node: Node; index: number }) {
  return (
    <motion.div
      className="flex items-center gap-2 px-4 py-3 min-w-[140px] rounded-xl bg-white border border-emerald-100 shadow-md text-slate-800 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 group z-10 relative"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
    >
      <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0">
        {node.icon}
      </span>
      <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900 line-clamp-2">
        {node.label}
      </span>
    </motion.div>
  );
}

export function WorkflowHeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Create refs for all nodes
  const left1Ref = useRef<HTMLDivElement>(null);
  const left2Ref = useRef<HTMLDivElement>(null);
  const center1Ref = useRef<HTMLDivElement>(null);
  const center2Ref = useRef<HTMLDivElement>(null);
  const right1Ref = useRef<HTMLDivElement>(null);
  const right2Ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* SVG layer for beams */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Left-1 to Center-1 */}
        <motion.path
          d="M 20% 25% Q 40% 25%, 40% 50%"
          stroke="url(#beam-gradient)"
          strokeWidth="2"
          fill="none"
          initial={{ strokeDasharray: "8 4", strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -12 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0 }}
        />

        {/* Left-2 to Center-1 */}
        <motion.path
          d="M 20% 75% Q 40% 75%, 40% 50%"
          stroke="url(#beam-gradient)"
          strokeWidth="2"
          fill="none"
          initial={{ strokeDasharray: "8 4", strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -12 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.2 }}
        />

        {/* Center-1 to Center-2 (vertical pass-through) */}
        <motion.line
          x1="50%"
          y1="50%"
          x2="50%"
          y2="50%"
          stroke="url(#beam-gradient)"
          strokeWidth="2"
          initial={{ strokeDasharray: "8 4", strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -12 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.4 }}
        />

        {/* Center-2 to Right-1 */}
        <motion.path
          d="M 60% 50% Q 80% 50%, 80% 25%"
          stroke="url(#beam-gradient)"
          strokeWidth="2"
          fill="none"
          initial={{ strokeDasharray: "8 4", strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -12 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.6 }}
        />

        {/* Center-2 to Right-2 */}
        <motion.path
          d="M 60% 50% Q 80% 50%, 80% 75%"
          stroke="url(#beam-gradient)"
          strokeWidth="2"
          fill="none"
          initial={{ strokeDasharray: "8 4", strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -12 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.8 }}
        />
      </svg>

      {/* Nodes Container */}
      <div className="flex justify-between items-start gap-6 md:gap-8 relative z-10">
        {/* Left Column */}
        <div className="flex flex-col gap-6 md:gap-8">
          <div ref={left1Ref}>
            <WorkflowNode node={nodes[0]} index={0} />
          </div>
          <div ref={left2Ref}>
            <WorkflowNode node={nodes[1]} index={1} />
          </div>
        </div>

        {/* Center Column */}
        <div className="flex flex-col gap-6 md:gap-8 justify-start md:justify-center">
          <div ref={center1Ref}>
            <WorkflowNode node={nodes[2]} index={2} />
          </div>
          <div ref={center2Ref} className="md:mt-8">
            <WorkflowNode node={nodes[3]} index={3} />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 md:gap-8">
          <div ref={right1Ref}>
            <WorkflowNode node={nodes[4]} index={4} />
          </div>
          <div ref={right2Ref}>
            <WorkflowNode node={nodes[5]} index={5} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkflowHeroAnimation;
