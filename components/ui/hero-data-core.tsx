"use client";

import { motion, useReducedMotion } from "framer-motion";

const NODE_CLASS =
  "bg-white/80 backdrop-blur-xl border border-emerald-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] text-slate-800 rounded-xl px-4 py-3 flex items-center gap-3 z-10 font-medium text-sm";

const CONNECTIONS = [
  {
    id: "iot-core",
    d: "M 210 100 C 340 100, 380 180, 420 250",
    delay: 0,
  },
  {
    id: "core-compliance",
    d: "M 580 250 C 620 180, 660 100, 790 100",
    delay: 0.3,
  },
  {
    id: "cloud-core",
    d: "M 210 400 C 340 400, 380 320, 420 250",
    delay: 1.2,
  },
  {
    id: "core-audit",
    d: "M 580 250 C 620 320, 660 400, 790 400",
    delay: 1.2,
  },
] as const;

function ConnectionBeam({
  d,
  delay,
  reducedMotion,
}: {
  d: string;
  delay: number;
  reducedMotion: boolean;
}) {
  return (
    <g>
      <path d={d} stroke="#e2e8f0" strokeWidth="2" fill="none" />
      {!reducedMotion && (
        <motion.path
          d={d}
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          filter="drop-shadow(0 0 6px #10b981)"
          initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
          animate={{ pathLength: 0.15, pathOffset: 1, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
            delay,
          }}
        />
      )}
    </g>
  );
}

function GlassNode({
  label,
  icon,
  className = "",
}: {
  label: string;
  icon: string;
  className?: string;
}) {
  return (
    <div className={`${NODE_CLASS} ${className}`}>
      <span className="material-symbols-outlined text-emerald-500 text-[20px] shrink-0">
        {icon}
      </span>
      <span>{label}</span>
    </div>
  );
}

function CoreNode({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <div
        className={`absolute -inset-6 bg-emerald-400 blur-2xl opacity-20 rounded-full -z-10 ${
          reducedMotion ? "" : "animate-pulse"
        }`}
      />
      <div
        className={`${NODE_CLASS} px-6 py-4 text-base font-semibold relative`}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-400/30 shrink-0">
          <span className="material-symbols-outlined text-white text-[22px]">
            hub
          </span>
        </div>
        <div>
          <p className="font-semibold text-slate-800 leading-tight">
            ZeroCarbon
          </p>
          <p className="text-sm font-medium text-emerald-600">MCP Core</p>
        </div>
      </div>
    </div>
  );
}

export default function HeroDataCore() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div className="relative w-full max-w-5xl aspect-video mx-auto overflow-visible">
      <svg
        viewBox="0 0 1000 500"
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {CONNECTIONS.map(({ id, d, delay }) => (
          <ConnectionBeam
            key={id}
            d={d}
            delay={delay}
            reducedMotion={reducedMotion}
          />
        ))}
      </svg>

      <GlassNode
        label="IoT Sensors"
        icon="sensors"
        className="absolute top-[20%] left-[5%]"
      />
      <GlassNode
        label="Cloud APIs"
        icon="cloud"
        className="absolute top-[80%] left-[5%]"
      />
      <CoreNode reducedMotion={reducedMotion} />
      <GlassNode
        label="Compliance Alert"
        icon="verified"
        className="absolute top-[20%] right-[5%]"
      />
      <GlassNode
        label="Audit Ledger"
        icon="storage"
        className="absolute top-[80%] right-[5%]"
      />
    </div>
  );
}
