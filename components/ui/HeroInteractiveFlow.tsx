"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Sphere, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

// --- CONTINENTS POLYGON DATA FOR GEOGRAPHIC LIGHTWEIGHT DOT-MAP ---
const CONTINENTS = [
  // North America
  [
    [-168, 65], [-120, 65], [-80, 80], [-60, 60], [-50, 45], [-60, 30],
    [-80, 25], [-90, 15], [-80, 8], [-100, 15], [-110, 20], [-125, 33],
    [-125, 48], [-168, 65]
  ],
  // Greenland
  [
    [-70, 75], [-60, 83], [-10, 80], [-30, 60], [-45, 60], [-70, 75]
  ],
  // South America
  [
    [-80, 8], [-48, -5], [-35, -5], [-40, -20], [-70, -55], [-75, -45],
    [-70, -20], [-80, -5], [-80, 8]
  ],
  // Africa
  [
    [-17, 32], [15, 32], [30, 31], [32, 28], [34, 30], [50, 12],
    [40, -20], [20, -35], [10, -34], [-15, 5], [-17, 32]
  ],
  // Eurasia (Europe + Asia)
  [
    [-10, 60], [10, 60], [30, 70], [60, 75], [90, 75], [120, 75],
    [140, 70], [170, 65], [170, 40], [140, 30], [120, 10], [105, 5],
    [95, 10], [80, 10], [75, 20], [60, 25], [45, 15], [35, 15],
    [35, 30], [25, 35], [15, 30], [5, 35], [-10, 36], [-10, 60]
  ],
  // India
  [
    [68, 25], [78, 30], [88, 25], [80, 10], [68, 25]
  ],
  // Indochina + Maritime Southeast Asia
  [
    [95, 20], [110, 20], [110, 10], [100, 1], [95, 20]
  ],
  // Australia
  [
    [113, -25], [113, -15], [130, -10], [140, -10], [150, -20],
    [150, -35], [140, -40], [113, -25]
  ]
];

// Point-in-polygon helper
function isLand(lat: number, lon: number): boolean {
  for (const poly of CONTINENTS) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i][0], yi = poly[i][1];
      const xj = poly[j][0], yj = poly[j][1];

      const intersect = ((yi > lat) !== (yj > lat))
        && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    if (inside) return true;
  }
  return false;
}

// Cubic Bezier calculation for SVG data flows
function getPointOnCubicBezier(
  t: number,
  x0: number, y0: number,
  x1: number, y1: number,
  x2: number, y2: number,
  x3: number, y3: number,
  target: { x: number; y: number }
) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;

  target.x = mt3 * x0 + 3 * mt2 * t * x1 + 3 * mt * t2 * x2 + t3 * x3;
  target.y = mt3 * y0 + 3 * mt2 * t * y1 + 3 * mt * t2 * y2 + t3 * y3;
}

// Responsive edge connection helper
const getCardEdgePoint = (
  angleDeg: number,
  cx: number,
  cy: number,
  w: number,
  h: number,
  target: { x: number; y: number }
) => {
  const angle = (angleDeg + 360) % 360;
  if (angle >= 45 && angle < 135) {
    target.x = cx;
    target.y = cy - h; // Connect to top
  } else if (angle >= 135 && angle < 225) {
    target.x = cx + w;
    target.y = cy; // Connect to right
  } else if (angle >= 225 && angle < 315) {
    target.x = cx;
    target.y = cy + h; // Connect to bottom
  } else {
    target.x = cx - w;
    target.y = cy; // Connect to left
  }
};

// Check WebGL availability
const isWebGLAvailable = () => {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch (e) {
    return false;
  }
};

// --- DYNAMIC CANVAS EARTH DOT-MAP TEXTURE GENERATOR ---
const createDotMapTexture = (resolvedTheme: string) => {
  if (typeof window === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const maskCanvas = document.createElement("canvas");
  maskCanvas.width = 2048;
  maskCanvas.height = 1024;
  const maskCtx = maskCanvas.getContext("2d");
  if (!maskCtx) return null;

  maskCtx.fillStyle = "#000000";
  maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
  maskCtx.fillStyle = "#ffffff";

  CONTINENTS.forEach(poly => {
    maskCtx.beginPath();
    poly.forEach((point, i) => {
      const x = ((point[0] + 180) / 360) * maskCanvas.width;
      const y = ((90 - point[1]) / 180) * maskCanvas.height;
      if (i === 0) maskCtx.moveTo(x, y);
      else maskCtx.lineTo(x, y);
    });
    maskCtx.closePath();
    maskCtx.fill();
  });

  const maskData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
  const data = maskData.data;

  const dotSpacing = 8;
  const dotRadius = 1.8;

  // Create an emerald/mint gradient flow across the landmass coordinates
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0.0, "#86EFAC");   // Soft mint
  grad.addColorStop(0.35, "#18e061ff");  // Bright green
  grad.addColorStop(0.7, "#20df99ff");   // Emerald mint
  grad.addColorStop(1.0, "#0ed657ff");   // Vibrant green
  ctx.fillStyle = grad;

  for (let y = 0; y < canvas.height; y += dotSpacing) {
    for (let x = 0; x < canvas.width; x += dotSpacing) {
      const index = (y * maskCanvas.width + x) * 4;
      const isLandPixel = data[index] > 128;
      if (isLandPixel) {
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

// --- CUSTOM SHADER MATERIAL FOR GLASS FRESNEL RIM GLOW ---
const FresnelShader = {
  uniforms: {
    color: { value: new THREE.Color("#4ade80") },
  },
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    uniform vec3 color;
    void main() {
      // Standard Fresnel: glowing rim, fully transparent center
      float intensity = pow(1.0 - max(0.0, dot(vNormal, vec3(0.0, 0.0, 1.0))), 4.0) * 0.45;
      gl_FragColor = vec4(color, intensity);
    }
  `
};

// --- WEBGL STATIC FALLBACK ILLUSTRATION ---
const WebGLFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-radial from-accent-green/5 to-transparent">
    <svg className="w-64 h-64 text-accent-green/20 animate-pulse-slow" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" />
      <ellipse cx="50" cy="50" rx="45" ry="12" stroke="currentColor" strokeWidth="0.5" />
      <ellipse cx="50" cy="50" rx="45" ry="24" stroke="currentColor" strokeWidth="0.5" />
      <ellipse cx="50" cy="50" rx="12" ry="45" stroke="currentColor" strokeWidth="0.5" />
      <ellipse cx="50" cy="50" rx="24" ry="45" stroke="currentColor" strokeWidth="0.5" />
      <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" />
      <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  </div>
);

// --- DETAILED GLOBE INTERACTIVE COMPONENTS IN THREE.JS ---
interface GlobeProps {
  radius: number;
  resolvedTheme: string | undefined;
  prefersReduced: boolean;
  isInView: boolean;
  anchors: any[];
  pathRefs: React.RefObject<Record<string, SVGPathElement | null>>;
  dotRefs: React.RefObject<Record<string, SVGCircleElement | null>>;
  cardPositionsRef: React.RefObject<Record<string, any>>;
  dimensions: { width: number; height: number };
  cx: number;
  cy: number;
}

const R3FGlobe = ({
  radius,
  resolvedTheme,
  prefersReduced,
  isInView,
  anchors,
  pathRefs,
  dotRefs,
  cardPositionsRef,
  dimensions,
  cx,
  cy,
}: GlobeProps) => {
  const { camera, size } = useThree();
  const globeGroupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // 2. Ambient floating space stars
  const spaceParticlesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 100;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius * 1.1 + Math.random() * (radius * 0.4);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [radius]);

  // 3. Dynamic canvas dot-map texture generator
  const dotMapTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    return createDotMapTexture(resolvedTheme || "light");
  }, [resolvedTheme]);

  // 4. Globe connections (E.g. NY to Frankfurt, Tokyo, etc.)
  const connections = useMemo(() => {
    const pairs = [
      [0, 1], // Factories -> Power Plants
      [1, 4], // Power Plants -> AI Agents
      [4, 5], // AI Agents -> MCP Router
      [6, 7], // Carbon Ledger -> GHG Calculator
    ];

    return pairs.map(([idxA, idxB]) => {
      const pA = anchors[idxA].localPos;
      const pB = anchors[idxB].localPos;

      // Calculate curve midpoint extruded from sphere surface
      const mid = new THREE.Vector3().addVectors(pA, pB).normalize().multiplyScalar(radius * 0.985 * 1.15);
      const curve = new THREE.QuadraticBezierCurve3(pA, mid, pB);
      return { curve, points: curve.getPoints(30) };
    });
  }, [anchors, radius]);

  // 5. Refs for animations and WebGL disposals
  const particleRefs = useRef<Record<number, THREE.Mesh | null>>({});
  const flowNodeRefs = useRef<Record<string, THREE.Mesh | null>>({});

  useEffect(() => {
    return () => {
      if (dotMapTexture) {
        dotMapTexture.dispose();
      }
    };
  }, [dotMapTexture]);

  // 6. Color selection based on Theme
  const isDark = resolvedTheme === "dark";
  const glowColor = isDark ? "#22c55e" : "#86efac"; // Soft mint-green in light theme

  const uniforms = useMemo(() => ({
    color: { value: new THREE.Color(glowColor) }
  }), [glowColor]);

  // Reusable vectors and coordinate helpers to avoid instantiating new objects inside the render tick loop
  const tempPos = useRef(new THREE.Vector3());
  const worldPos = useRef(new THREE.Vector3());
  const cameraDir = useRef(new THREE.Vector3());
  const normal = useRef(new THREE.Vector3());
  const bezierTarget = useRef({ x: 0, y: 0 });
  const cardEdgeTarget = useRef({ x: 0, y: 0 });

  // 7. Render Tick
  useFrame(({ clock }) => {
    if (!isInView) return;
    const t = clock.getElapsedTime();

    // Rotate Globe
    if (globeGroupRef.current && !prefersReduced) {
      globeGroupRef.current.rotation.y = t * 0.04;
    }

    // Oscillate Ambient Particles
    if (particlesRef.current && !prefersReduced) {
      particlesRef.current.rotation.y = t * -0.015;
      particlesRef.current.rotation.x = Math.sin(t * 0.05) * 0.05;
    }

    // Pulse nodes softly in standard R3F loop
    anchors.forEach((a, index) => {
      const mesh = flowNodeRefs.current[a.id];
      if (mesh) {
        const basePulse = Math.sin(t * 2 + a.timeOffset * 10) * 0.06;
        const cycle = (t + index * 5) % 8;
        let strongPulse = 0;
        if (cycle < 1.8) {
          strongPulse = Math.sin(cycle * Math.PI / 1.8) * 0.22;
        }
        mesh.scale.setScalar(1.0 + basePulse + strongPulse);
      }
    });

    // Flow particles along the Bezier curves in R3F loop
    connections.forEach((conn, index) => {
      const pMesh = particleRefs.current[index];
      if (pMesh) {
        const progress = (t * 0.2 + index * 0.25) % 1.0;
        conn.curve.getPointAt(progress, tempPos.current);
        pMesh.position.copy(tempPos.current);
      }
    });

    // 8. Direct DOM pipeline projecting 3D anchors to SVG paths (No React re-renders)
    const globeGroup = globeGroupRef.current;
    if (!globeGroup) return;

    anchors.forEach(anchor => {
      const pathEl = pathRefs.current[anchor.id];
      const dotEl = dotRefs.current[anchor.id];
      if (!pathEl) return;

      const wPos = worldPos.current;
      wPos.copy(anchor.localPos).applyMatrix4(globeGroup.matrixWorld);

      // Check facing direction to fade hidden lines
      const camDir = cameraDir.current;
      camDir.copy(wPos).sub(camera.position).normalize();

      const norm = normal.current;
      norm.copy(wPos).normalize();

      const isBehind = norm.dot(camDir) > -0.15;

      const projPos = tempPos.current.copy(wPos).project(camera);
      const x = (projPos.x * 0.5 + 0.5) * dimensions.width;
      const y = (-(projPos.y * 0.5) + 0.5) * dimensions.height;

      const cardPos = cardPositionsRef.current[anchor.id];
      if (!cardPos) return;

      // Calculate edge connection point on card
      getCardEdgePoint(cardPos.angle, cardPos.x, cardPos.y, cardPos.w, cardPos.h, cardEdgeTarget.current);
      const cardEdge = cardEdgeTarget.current;

      // Smooth horizontal/vertical S-Curve (Cubic Bezier)
      const dx = cardEdge.x - x;
      const ctrlX1 = x + dx * 0.45;
      const ctrlY1 = y;
      const ctrlX2 = cardEdge.x - dx * 0.2;
      const ctrlY2 = cardEdge.y;

      const d = `M ${x} ${y} C ${ctrlX1} ${ctrlY1}, ${ctrlX2} ${ctrlY2}, ${cardEdge.x} ${cardEdge.y}`;
      pathEl.setAttribute("d", d);

      // Fade connections when anchor rotates to the back of the globe
      if (isBehind) {
        pathEl.setAttribute("stroke-opacity", isDark ? "0.0" : "0.02");
        if (dotEl) dotEl.setAttribute("opacity", "0");
      } else {
        pathEl.setAttribute("stroke-opacity", isDark ? "0.45" : "0.22");
        if (dotEl) {
          dotEl.setAttribute("opacity", "1");
          // Flow speed
          const progress = (t * 0.18 + anchor.timeOffset) % 1.0;
          getPointOnCubicBezier(progress, x, y, ctrlX1, ctrlY1, ctrlX2, ctrlY2, cardEdge.x, cardEdge.y, bezierTarget.current);
          dotEl.setAttribute("cx", String(bezierTarget.current.x));
          dotEl.setAttribute("cy", String(bezierTarget.current.y));
        }
      }
    });
  });

  return (
    <>
      {/* 3D Studio Lights */}
      <ambientLight intensity={isDark ? 0.35 : 0.95} />
      <directionalLight position={[5, 8, 5]} intensity={isDark ? 1.8 : 1.5} />
      <directionalLight position={[-5, 5, -5]} intensity={isDark ? 0.6 : 0.4} />

      {/* Environment map for realistic glass reflection */}
      <Environment preset="city" />

      {/* Rotating Globe Group */}
      <group ref={globeGroupRef}>

        {/* Layer 2: Dot-map Earth texture UV-mapped to conform to sphere curvature */}
        {dotMapTexture && (
          <Sphere args={[radius * 0.982, 64, 64]}>
            <meshStandardMaterial
              map={dotMapTexture}
              transparent={true}
              roughness={0.4}
              metalness={0.15}
              opacity={isDark ? 1.64 : 2.24}
              depthWrite={false}
            />
          </Sphere>
        )}

        {/* Layer 3: Network connections (Bezier lines & active particle flow) */}
        {connections.map((c, i) => (
          <React.Fragment key={i}>
            <Line
              points={c.points}
              color={isDark ? "#4ade80" : "#2e7d52"}
              lineWidth={0.8}
              transparent={true}
              opacity={isDark ? 0.28 : 0.15}
              depthWrite={false}
            />
            <mesh
              ref={el => {
                particleRefs.current[i] = el;
              }}
            >
              <sphereGeometry args={[0.02, 10, 10]} />
              <meshBasicMaterial color={isDark ? "#22c55e" : "#34d399"} />
            </mesh>
          </React.Fragment>
        ))}

        {/* Node Points on Globe */}
        {anchors.map(a => (
          <mesh
            key={a.id}
            ref={el => {
              flowNodeRefs.current[a.id] = el;
            }}
            position={a.localPos}
          >
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial color={isDark ? "#4ade80" : "#2E5C44"} />
          </mesh>
        ))}

        {/* Layer 1: Transparent outer glass shell */}
        <Sphere args={[radius, 64, 64]}>
          <meshPhysicalMaterial
            transmission={1.0}
            ior={1.45}
            thickness={1.2}
            roughness={0.05}
            clearcoat={1.0}
            clearcoatRoughness={0.0}
            metalness={0.0}
            reflectivity={1.0}
            color={isDark ? "#0d1310" : "#ffffff"}
            opacity={0.3}
            transparent={true}
            depthWrite={false}
          />
        </Sphere>

        {/* Layer 4: Atmosphere edge glow (Slightly larger than outer glass shell) */}
        <Sphere args={[radius * 1.04, 32, 32]}>
          <shaderMaterial
            vertexShader={FresnelShader.vertexShader}
            fragmentShader={FresnelShader.fragmentShader}
            uniforms={uniforms}
            transparent={true}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.FrontSide}
          />
        </Sphere>
      </group>

      {/* Ambient Floating Particle Cloud */}
      <points ref={particlesRef} geometry={spaceParticlesGeometry}>
        <pointsMaterial
          color={isDark ? "#4ade80" : "#5c7066"}
          size={0.015}
          sizeAttenuation={true}
          transparent={true}
          opacity={isDark ? 0.35 : 0.18}
          depthWrite={false}
        />
      </points>
    </>
  );
};

// --- MAIN WRAPPER CONTAINER ---
export default function HeroInteractiveFlow({ containerHeight }: { containerHeight: number }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isInView, setIsInView] = useState(true);
  const [prefersReduced, setPrefersReduced] = useState(false);

  // Interaction State
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [processingStep, setProcessingStep] = useState(0);
  const [hasSent, setHasSent] = useState(false);

  // Dimension tracking
  const [dimensions, setDimensions] = useState({ width: 600, height: 500 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 640) {
      setDpr(1.0);
    } else if (width < 1280) {
      setDpr(1.5);
    } else {
      setDpr(2.0);
    }
  }, []);

  // SVG & DOM direct updates
  const pathRefs = useRef<Record<string, SVGPathElement | null>>({});
  const dotRefs = useRef<Record<string, SVGCircleElement | null>>({});
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const cardPositionsRef = useRef<Record<string, any>>({});

  useEffect(() => {
    setMounted(true);
    setHasWebGL(isWebGLAvailable());

    // Respect OS Reduced Motion
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(media.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    media.addEventListener("change", listener);

    // Viewport Visibility Check to Pause Frame Loops
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.08 });
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      media.removeEventListener("change", listener);
      observer.disconnect();
    };
  }, []);

  // Track size changes
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Interactive Card settings
  const cardLayouts = [
    { id: "factories", label: "Factories", icon: "factory", angle: 200, distance: 0.36 },
    { id: "power_plants", label: "Power Plants", icon: "bolt", angle: 270, distance: 0.35 },
    { id: "shipping", label: "Shipping", icon: "directions_boat", angle: 330, distance: 0.36 },
    { id: "sensors", label: "Live Sensors", icon: "sensors", angle: 175, distance: 0.37 },
    { id: "ai", label: "AI Agents", icon: "smart_toy", angle: 5, distance: 0.37 },
    { id: "router", label: "MCP Router", icon: "route", angle: 150, distance: 0.36 },
    { id: "ledger", label: "Carbon Ledger", icon: "database", angle: 90, distance: 0.35 },
    { id: "calculator", label: "GHG Calculator", icon: "calculate", angle: 30, distance: 0.36 },
  ];

  // Map 3D anchors coordinates
  const radius = 1.75;
  const anchors = useMemo(() => {
    const coords = [
      { id: "factories", lat: 38, lon: -97, timeOffset: 0.0 },
      { id: "power_plants", lat: 50, lon: 10, timeOffset: 0.25 },
      { id: "shipping", lat: 15, lon: -30, timeOffset: 0.5 },
      { id: "sensors", lat: -28, lon: 135, timeOffset: 0.1 },
      { id: "ai", lat: 36, lon: 138, timeOffset: 0.75 },
      { id: "router", lat: 21, lon: 78, timeOffset: 0.3 },
      { id: "ledger", lat: -15, lon: -47, timeOffset: 0.6 },
      { id: "calculator", lat: 8, lon: -75, timeOffset: 0.4 },
    ];
    return coords.map(c => {
      const phi = (90 - c.lat) * Math.PI / 180;
      const theta = (c.lon + 180) * Math.PI / 180;
      const x = radius * Math.sin(phi) * Math.sin(theta);
      const y = -radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.cos(theta);
      return { ...c, localPos: new THREE.Vector3(x, y, z) };
    });
  }, [radius]);

  // AI agents typing triggers
  useEffect(() => {
    if (activeNode === "ai" && hasSent) {
      setProcessingStep(0);
      const interval = setInterval(() => {
        setProcessingStep(prev => prev < 2 ? prev + 1 : prev);
      }, 1600);
      return () => clearInterval(interval);
    }
  }, [activeNode, hasSent]);

  // Positioning calculations
  const cx = dimensions.width / 2;
  const cy = dimensions.height / 2;
  const isMobile = dimensions.width < 768;
  const rx = isMobile ? dimensions.width * 0.31 : dimensions.width * 0.38;
  const ry = isMobile ? dimensions.height * 0.31 : dimensions.height * 0.38;

  // Measure card details and set static positions once on dimension change
  useEffect(() => {
    cardLayouts.forEach(card => {
      const el = cardRefs.current[card.id];
      if (el) {
        const rad = (card.angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * rx;
        const y = cy + Math.sin(rad) * ry;

        // Position card statically (only when resized)
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;

        cardPositionsRef.current[card.id] = {
          x,
          y,
          w: el.offsetWidth / 2,
          h: el.offsetHeight / 2,
          angle: card.angle,
        };
      }
    });
  }, [cx, cy, rx, ry]);

  // Float animation calculations directly in anim loop (GPU-Accelerated via translate3d)
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const render = () => {
      if (!isInView) {
        requestRef.current = requestAnimationFrame(render);
        return;
      }
      const t = (Date.now() - startTimeRef.current) * 0.001;

      cardLayouts.forEach((card, index) => {
        const el = cardRefs.current[card.id];
        if (!el) return;

        const floatY = prefersReduced ? 0 : Math.sin(t * 1.6 + index * 0.45) * 7;

        // Animate the inner child on GPU compositor, preserving CSS hover transitions on outer button
        const inner = el.querySelector(".card-inner") as HTMLElement | null;
        if (inner) {
          inner.style.transform = `translate3d(0, ${floatY}px, 0)`;
        }

        const rad = (card.angle * Math.PI) / 180;
        const baseX = cx + Math.cos(rad) * rx;
        const baseY = cy + Math.sin(rad) * ry;

        cardPositionsRef.current[card.id] = {
          x: baseX,
          y: baseY + floatY,
          w: el.offsetWidth / 2,
          h: el.offsetHeight / 2,
          angle: card.angle,
        };
      });

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [cx, cy, rx, ry, isInView, prefersReduced]);

  const handleCardClick = (id: string) => {
    if (activeNode === id) {
      setActiveNode(null);
    } else {
      setActiveNode(id);
      if (id === "ai") {
        setHasSent(false); // Reset AI terminal state
      }
    }
  };

  const isDark = resolvedTheme === "dark";

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-hidden rounded-[40px] border border-outline-variant/15 select-none bg-background transition-colors duration-400"
      style={{ height: `${containerHeight}px` }}
    >
      {/* 1. Subtle Premium Background Glows & Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft radial glow behind globe */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-accent-green/5 dark:bg-accent-green/10 blur-[90px] transition-all" />

        {/* Mesh gradients (aurora effect) */}
        <div className="absolute inset-0 opacity-40 dark:opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(169,231,193,0.18),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(46,92,68,0.12),transparent_50%)]" />

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(46,92,68,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(46,92,68,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(circle_at_center,black_60%,transparent_100%)]" />
      </div>

      {/* 2. R3F Canvas representing the 3D Glass Globe */}
      {mounted && hasWebGL ? (
        <div className="absolute inset-0 z-10">
          <Canvas
            camera={{ position: [0, 0, isMobile ? 5.2 : 4.4], fov: 60 }}
            dpr={dpr}
            frameloop={isInView ? "always" : "never"}
            gl={{ antialias: true, alpha: true }}
          >
            <R3FGlobe
              radius={radius}
              resolvedTheme={resolvedTheme}
              prefersReduced={prefersReduced}
              isInView={isInView}
              anchors={anchors}
              pathRefs={pathRefs}
              dotRefs={dotRefs}
              cardPositionsRef={cardPositionsRef}
              dimensions={dimensions}
              cx={cx}
              cy={cy}
            />
          </Canvas>
        </div>
      ) : (
        <WebGLFallback />
      )}

      {/* 3. SVG Overlay Drawing High-Performance Connection Lines */}
      <svg className="absolute inset-0 z-20 pointer-events-none w-full h-full">
        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2E5C44" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {anchors.map(a => (
          <g key={a.id}>
            {/* Base Connection Path (dynamic updates in useFrame) */}
            <path
              ref={el => {
                pathRefs.current[a.id] = el;
              }}
              fill="none"
              stroke={isDark ? "url(#neonGradient)" : "#2E5C44"}
              strokeWidth={1.3}
              strokeOpacity={0.0} // Driven by loop
              className="transition-all"
            />
            {/* Glowing flowing data streams */}
            <circle
              ref={el => {
                dotRefs.current[a.id] = el;
              }}
              r={2.8}
              fill="#4ade80"
              opacity={0} // Driven by loop
              className="filter drop-shadow-[0_0_3px_#22c55e]"
            />
          </g>
        ))}
      </svg>

      {/* 4. DOM-Based Floating Glassmorphic Cards Layer */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {cardLayouts.map((card) => {
          const isActive = activeNode === card.id;
          return (
            <button
              key={card.id}
              ref={el => {
                cardRefs.current[card.id] = el;
              }}
              onClick={() => handleCardClick(card.id)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 px-2 py-1.5 sm:px-3.5 sm:py-2.5 rounded-[12px] sm:rounded-[20px] pointer-events-auto border cursor-pointer shadow-sm select-none hover:-translate-y-2 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:outline-none ${isActive
                ? "bg-surface-mint border-accent-green text-accent-green font-bold shadow-md z-45"
                : "bg-surface/80 border-outline-variant/40 text-text-main hover:shadow-md hover:bg-surface/95 hover:border-accent-green/30"
                }`}
              aria-expanded={isActive}
              aria-haspopup="dialog"
            >
              <div className="card-inner flex items-center gap-1.5 sm:gap-2 pointer-events-none w-full h-full relative z-10">
                <span className={`material-symbols-outlined text-[13px] sm:text-[17px] ${isActive ? "text-accent-green" : "text-accent-green/70 dark:text-accent-green"
                  }`}>
                  {card.icon}
                </span>
                <span className="font-body-md font-semibold text-[10px] sm:text-xs tracking-wide">{card.label}</span>
                {/* Optional Active pulse indicator */}
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-green animate-ping relative">
                    <span className="absolute h-1.5 w-1.5 rounded-full bg-accent-green"></span>
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 5. Accessible Interactive Dialog Box Overlay (at bottom of container) */}
      <div className="absolute bottom-4 inset-x-4 z-40 max-h-[46%] overflow-y-auto pointer-events-none">
        {activeNode && (
          <div
            className="w-full bg-white/95 dark:bg-[#0c120f]/95 rounded-3xl border border-accent-green/30 dark:border-accent-green/20 shadow-2xl p-4 backdrop-blur-md pointer-events-auto select-text animate-in fade-in slide-in-from-bottom-4 duration-300"
            role="dialog"
            aria-modal="true"
          >
            {/* Dialog Header */}
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/10 dark:border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-surface-mint dark:bg-white/5 flex items-center justify-center text-accent-green">
                  <span className="material-symbols-outlined text-[19px]">
                    {cardLayouts.find(c => c.id === activeNode)?.icon}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-text-main dark:text-white">
                    {cardLayouts.find(c => c.id === activeNode)?.label}
                  </h3>
                  <p className="text-[10px] text-text-muted dark:text-white/60">Real-time Node Signal</p>
                </div>
              </div>
              <button
                onClick={() => setActiveNode(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer text-text-muted dark:text-white/80"
                aria-label="Close details"
              >
                <span className="material-symbols-outlined text-[17px]">close</span>
              </button>
            </div>

            {/* Dialog Body Content */}
            <div className="text-xs">
              {activeNode === "factories" && (
                <p className="text-text-muted dark:text-white/80 leading-relaxed">
                  Ingesting emissions data from production machinery, HVAC installations, and assembly infrastructure.
                  Directly monitors gas flows and power draws to generate certified Scope 1 records.
                </p>
              )}
              {activeNode === "power_plants" && (
                <p className="text-text-muted dark:text-white/80 leading-relaxed">
                  Real-time power grid intensity calculations. Hooks directly into primary utility feeds to verify Scope 2 greenhouse gas emissions,
                  factoring in local grid fuel composition changes dynamically.
                </p>
              )}
              {activeNode === "shipping" && (
                <p className="text-text-muted dark:text-white/80 leading-relaxed">
                  Audits transportation log flows. Uses global telematics APIs to calculate transit fuel efficiencies, route-specific
                  Scope 3 impacts, and freight carbon loads.
                </p>
              )}
              {activeNode === "sensors" && (
                <p className="text-text-muted dark:text-white/80 leading-relaxed">
                  Aggregating carbon data from 4,129 operational IoT endpoints. Continuously polls smart meters, gas monitors, and building
                  controllers to stream direct environmental signals.
                </p>
              )}
              {activeNode === "ai" && (
                <div className="space-y-3">
                  {!hasSent ? (
                    <div className="space-y-3">
                      <textarea
                        className="w-full p-2.5 border border-accent-green/30 dark:border-accent-green/20 rounded-xl bg-surface-mint/30 dark:bg-white/5 text-text-main dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-green text-[13px]"
                        rows={2}
                        defaultValue="Calculate the GHG scope 3 emissions for our recent AWS server usage."
                      ></textarea>
                      <button
                        onClick={() => setHasSent(true)}
                        className="w-full bg-accent-green hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-xs shadow-lg shadow-accent-green/20"
                      >
                        <span className="material-symbols-outlined text-[15px]">send</span>
                        Send to AI Client
                      </button>
                    </div>
                  ) : (
                    <div className="bg-[#0c120f] border border-accent-green/20 rounded-xl p-3 font-mono text-[11px] text-emerald-400">
                      {["Analyzing intent...", "Extracting entities...", "Routing to MCP..."].slice(0, processingStep + 1).map((step, idx) => (
                        <div key={idx} className="flex items-center gap-2 mb-1 animate-in fade-in duration-200">
                          <span>$</span>
                          <span>{step}</span>
                        </div>
                      ))}
                      {processingStep === 2 && (
                        <button
                          onClick={() => setHasSent(false)}
                          className="mt-3 text-[10px] text-accent-green hover:text-emerald-400 underline font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[12px]">replay</span>
                          Reset Request
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
              {activeNode === "router" && (
                <div className="space-y-3">
                  <p className="text-text-muted dark:text-white/80 leading-normal mb-2">
                    Routing incoming telemetry to specialized carbon calculations. ZeroCarbon MCP handles query intent dynamically:
                  </p>
                  <div className="space-y-2">
                    {[
                      { title: "Understand Intent", badge: "Received", bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400" },
                      { title: "Select MCP Tool", badge: "Matched", bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400" },
                      { title: "Execute Workflow", badge: "Processing", bg: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/60 dark:text-yellow-400" },
                      { title: "Return Result", badge: "Completed", bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400" },
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-white/5">
                        <span className="font-semibold text-text-main dark:text-white/95">{step.title}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${step.bg}`}>{step.badge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeNode === "calculator" && (
                <div className="text-center p-2">
                  <p className="font-semibold text-sm text-text-main dark:text-white">GHG Calculator Engine</p>
                  <p className="mt-1 text-text-muted dark:text-white/70">
                    Runs regulatory GHG models (CSRD, SEC, and Greenhouse Gas Protocol).
                    Compiles cloud billing, manufacturing parameters, and fuel inputs into real-time metric tonnes of CO2-equivalent.
                  </p>
                </div>
              )}
              {activeNode === "ledger" && (
                <div className="text-center p-2">
                  <p className="font-semibold text-sm text-text-main dark:text-white">Carbon Ledger DB</p>
                  <p className="mt-1 text-text-muted dark:text-white/70">
                    Immutable enterprise database. Every transaction, calculation, and correction is cryptographically
                    timestamped and logged to guarantee audit readiness for third-party carbon verifications.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
