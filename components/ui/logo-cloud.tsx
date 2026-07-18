'use client';

import { InfiniteSlider } from '@/components/ui/infinite-slider';

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

const logos: Logo[] = [
  { src: 'https://svgl.app/library/nvidia-wordmark-light.svg', alt: 'Nvidia' },
  { src: 'https://svgl.app/library/supabase_wordmark_light.svg', alt: 'Supabase' },
  { src: 'https://svgl.app/library/openai_wordmark_light.svg', alt: 'OpenAI' },
  { src: 'https://svgl.app/library/turso-wordmark-light.svg', alt: 'Turso' },
  { src: 'https://svgl.app/library/vercel_wordmark.svg', alt: 'Vercel' },
  { src: 'https://svgl.app/library/github_wordmark_light.svg', alt: 'GitHub' },
  { src: 'https://svgl.app/library/claude-ai-wordmark-icon_light.svg', alt: 'Claude AI' },
  { src: 'https://svgl.app/library/clerk-wordmark-light.svg', alt: 'Clerk' },
];

export function LogoCloud() {
  return (
    <section className="relative py-6 overflow-hidden">
      {/* Subtle top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />
      {/* Subtle bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />

      {/* Heading */}
      <div className="text-center mb-4">
        <p className="font-label-caps text-xs uppercase tracking-[0.18em] text-accent-green mb-1">
          Trusted by
        </p>
        <h2 className="font-display-md text-xl md:text-2xl font-bold italic text-primary tracking-tight">
          Best in the Game
        </h2>
      </div>

      {/* Scrolling ticker — mask-image fades both edges to transparent */}
      <div
        className="relative w-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 18%, black 82%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 18%, black 82%, transparent)',
        }}
      >
        <InfiniteSlider gap={48} duration={30} durationOnHover={90}>
          {logos.map((logo) => (
            <img
              key={`logo-${logo.alt}`}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              width="auto"
              height="auto"
              className="select-none h-4 md:h-5 opacity-40 grayscale cursor-pointer
                         hover:opacity-100 hover:grayscale-0
                         transition-all duration-400 ease-in-out"
            />
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
