"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Zap, CreditCard, Code, HelpCircle, Menu, X } from "lucide-react";
import AnimatedButton from "./animated-button";
import { motion, AnimatePresence } from "framer-motion";

// Helper component for navigation links
const NavLink = ({ 
  href, 
  icon: Icon, 
  label, 
  onClick 
}: { 
  href: string; 
  icon: React.ComponentType<{ className?: string }>; 
  label: string;
  onClick: (e: React.MouseEvent, href: string) => void;
}) => (
  <a 
    href={href} 
    onClick={(e) => onClick(e, href)}
    className="group flex items-center gap-1.5 text-xs font-semibold text-white/75 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
  >
    <Icon className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
    <span>{label}</span>
  </a>
);

export function NotchNavbar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Smooth scroll handler
  const handleScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Navigation items configuration
  const items = {
    left: [
      { label: "Home", href: "#hero", icon: Home },
      { label: "Features", href: "#features", icon: Zap },
      { label: "Pricing", href: "#pricing", icon: CreditCard }
    ],
    right: [
      { label: "Developers", href: "#developers", icon: Code },
      { label: "FAQ", href: "#faq", icon: HelpCircle }
    ]
  };

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 h-16 flex px-0 select-none ${className || ""}`} {...props}>
        
        {/* Left Side Bar - Flexible width */}
        <div className="flex-1 h-10 bg-primary z-20 relative min-w-0">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="white" strokeOpacity={0.1} strokeWidth={0.5} />
            <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="white" strokeOpacity={0.1} strokeWidth={0.5} />
          </svg>
        </div>

        {/* Responsive Notch Container - 3 Slices */}
        <div className="flex h-16 relative z-10 shrink-0 -ml-px">
          
          {/* Left Slice (Corner) */}
          <div className="w-[50px] h-full relative shrink-0">
            {/* Dark Brand Green Background */}
            <div className="absolute inset-0 bg-primary" style={{ clipPath: "path('M0 0 H50 V64 C25 64 25 40 0 40 Z')" }} />
            {/* Outlines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 50 64">
              <path d="M0 39.5 C25 39.5 25 63.5 50 63.5" fill="none" stroke="white" strokeOpacity={0.1} strokeWidth={0.5} />
              <path d="M0 36.5 C25 36.5 25 60.5 50 60.5" fill="none" stroke="white" strokeOpacity={0.1} strokeWidth={0.5} />
            </svg>
          </div>

          {/* Center Slice (Flexible Content Area) */}
          <div className="flex-1 h-full relative min-w-[500px] md:min-w-[760px] lg:min-w-[920px] -ml-px">
             {/* Background & Lines Layer */}
             <div className="absolute inset-0 bg-primary">
                 <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                   <line x1="0" y1="63.5" x2="100%" y2="63.5" stroke="white" strokeOpacity={0.1} strokeWidth={0.5} />
                   <line x1="0" y1="60.5" x2="100%" y2="60.5" stroke="white" strokeOpacity={0.1} strokeWidth={0.5} />
                 </svg>
             </div>

             {/* Content Layer */}
             <div className="relative w-full h-full flex items-end justify-between pb-2 px-2 md:px-4">
               
               {/* Desktop Left Nav */}
               <nav className="hidden md:flex gap-6 mb-1.5 shrink-0">
                {items.left.map(item => (
                  <NavLink key={item.label} {...item} onClick={handleScroll} />
                ))}
              </nav>

              {/* Mobile Menu Button (Left) */}
              <button 
                className="md:hidden mb-1.5 p-1 text-white/70 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Logo (Center) */}
              <div className="flex justify-center shrink-0 mx-4 mt-1 mb-0.5">
                <Link href="/" className="flex items-center gap-2 group">
                  {/* Clean SVG Leaf Logo */}
                  <svg className="w-5 h-5 text-accent-green hover:rotate-12 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 2H21V6C21 13 14 20 6 20H2V16C2 8 9 2 17 2Z" />
                    <path d="M12 2A10 10 0 0 0 2 12A10 10 0 0 0 12 22A10 10 0 0 0 22 12A10 10 0 0 0 12 2M12 4A8 8 0 0 1 20 12A8 8 0 0 1 12 20A8 8 0 0 1 4 12A8 8 0 0 1 12 4Z" opacity="0.3" />
                  </svg>
                  <span className="font-display-sm text-sm font-bold text-white tracking-wide">ZeroCarbon MCP</span>
                </Link>
              </div>

              {/* Desktop Right Nav */}
              <nav className="hidden md:flex gap-6 items-center shrink-0 mb-0.5">
                {items.right.map(item => (
                  <NavLink key={item.label} {...item} onClick={handleScroll} />
                ))}
                
                <div className="flex gap-4 pl-4 border-l border-white/10 shrink-0 items-center">
                  <AnimatedButton 
                    variant="secondary" 
                    className="px-4 py-1.5 text-xs rounded-full font-bold shadow-sm"
                    onClick={(e) => handleScroll(e, '#contact')}
                  >
                    Request a Demo
                  </AnimatedButton>
                </div>
              </nav>

              {/* Mobile Right Actions */}
              <div className="md:hidden flex items-center gap-2 mb-1">
                <AnimatedButton 
                  variant="secondary" 
                  className="px-3 py-1 text-[11px] rounded-full font-bold shadow-sm"
                  onClick={(e) => handleScroll(e, '#contact')}
                >
                  Demo
                </AnimatedButton>
              </div>

             </div>
          </div>

          {/* Right Slice (Corner) */}
          <div className="w-[50px] h-full relative shrink-0 -ml-px">
            {/* Dark Brand Green Background */}
            <div className="absolute inset-0 bg-primary" style={{ clipPath: "path('M0 0 H50 V40 C25 40 25 64 0 64 Z')" }} />
            {/* Outlines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 50 64">
              <path d="M0 63.5 C25 63.5 25 39.5 50 39.5" fill="none" stroke="white" strokeOpacity={0.1} strokeWidth={0.5} />
              <path d="M0 60.5 C25 60.5 25 36.5 50 36.5" fill="none" stroke="white" strokeOpacity={0.1} strokeWidth={0.5} />
            </svg>
          </div>

        </div>

        {/* Right Side Bar - Flexible width */}
        <div className="flex-1 h-10 bg-primary z-20 relative min-w-0 -ml-px">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="white" strokeOpacity={0.1} strokeWidth={0.5} />
            <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="white" strokeOpacity={0.1} strokeWidth={0.5} />
          </svg>
        </div>

      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-10 z-40 bg-primary border-b border-white/10 p-4 md:hidden shadow-lg pt-12"
          >
             <nav className="flex flex-col gap-2">
               {/* Combine all items */}
               {[...items.left, ...items.right].map(item => (
                 <a 
                   key={item.label} 
                   href={item.href}
                   onClick={(e) => handleScroll(e, item.href)}
                   className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-white/80 hover:text-white"
                 >
                   <item.icon className="w-5 h-5 opacity-70" />
                   <span className="font-medium">{item.label}</span>
                 </a>
               ))}
             </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NotchNavbar;
