"use client";

import React, { useState } from "react";
import { motion, MotionProps } from "framer-motion";

type AnimatedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps & {
    children?: React.ReactNode;
    as?: any;
    variant?: "solid" | "outline" | "secondary";
  };

/**
 * AnimatedButton
 * - premium hover spring and active scale animations via Framer Motion
 * - text shine mask and border shine animations triggered ONLY on click/touch/press
 * - variant-aware styling for ZeroCarbon MCP theme
 */
const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children = "Browse Components",
  className = "",
  as = "button",
  variant = "solid",
  ...rest
}) => {
  const Component = (motion as any)[as] || motion.button;
  const [isPressed, setIsPressed] = useState(false);

  // Base styles depending on variant
  const variantClasses =
    variant === "outline"
      ? "bg-transparent border border-primary/20 text-primary hover:bg-primary/5 [--shine:rgba(3,36,22,0.25)]"
      : variant === "secondary"
      ? "bg-surface-mint border border-accent-green/20 text-primary hover:bg-opacity-90 [--shine:rgba(3,36,22,0.2)]"
      : "bg-primary border border-transparent text-on-primary hover:bg-opacity-90 [--shine:rgba(255,255,255,0.45)]";

  // Handle active press/touch states
  const handlePressStart = () => setIsPressed(true);
  const handlePressEnd = () => setIsPressed(false);

  return (
    <Component
      {...rest}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5,
      }}
      className={`group inline-flex items-center justify-center relative overflow-hidden font-bold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${variantClasses} ${className}`}
    >
      {/* Text with shine mask */}
      <motion.span
        className="flex items-center justify-center h-full w-full relative z-10"
        style={{
          WebkitMaskImage:
            "linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))",
          maskImage:
            "linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))",
        }}
        initial={{ ["--mask-x" as any]: "100%" } as any}
        animate={isPressed ? ({ ["--mask-x" as any]: ["100%", "-100%"] } as any) : ({ ["--mask-x" as any]: "100%" } as any)}
        transition={
          isPressed
            ? {
                repeat: Infinity,
                duration: 1.0,
                ease: "linear",
              }
            : { duration: 0.1 }
        }
      >
        {children}
      </motion.span>

      {/* Border shine effect */}
      <motion.span
        className="block absolute inset-0 p-px pointer-events-none"
        style={{
          background:
            "linear-gradient(-75deg, transparent 30%, var(--shine) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
        initial={{ backgroundPosition: "100% 0", opacity: 0 }}
        animate={
          isPressed
            ? { backgroundPosition: ["100% 0", "0% 0"], opacity: [0, 1, 0] }
            : { backgroundPosition: "100% 0", opacity: 0 }
        }
        transition={
          isPressed
            ? {
                duration: 1.0,
                repeat: Infinity,
                ease: "linear",
              }
            : { duration: 0.1 }
        }
      />
    </Component>
  );
};

export default AnimatedButton;
