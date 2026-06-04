"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { useState } from "react";

type OverlayProps = {
  progress: MotionValue<number>;
};

export function Overlay({ progress }: OverlayProps) {
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const firstOpacity = useTransform(progress, [0, 0.15, 0.25], [1, 1, 0]);
  const firstY = useTransform(progress, [0, 0.25], [0, -70]);

  const secondOpacity = useTransform(progress, [0.2, 0.32, 0.45], [0, 1, 0]);
  const secondY = useTransform(progress, [0.2, 0.45], [40, -30]);

  const thirdOpacity = useTransform(progress, [0.5, 0.62, 0.95, 1], [0, 1, 1, 0.9]);
  const thirdY = useTransform(progress, [0.5, 0.8], [60, -20]);
  const atmosphereOpacity = useTransform(progress, [0, 0.5, 0.72, 0.86, 1], [0.08, 0.2, 0.38, 0.5, 0.56]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div className="absolute inset-x-0 top-0 z-[15] h-10 bg-gradient-to-b from-black/70 via-black/35 to-transparent sm:h-12" />

      <header className="pointer-events-auto absolute inset-x-0 top-0 z-20 px-3 pt-4 sm:px-5 sm:pt-6">
        <nav className="relative mx-auto flex w-full max-w-[1180px] items-center justify-between px-1 py-2 sm:px-2">
          <div className="hidden w-full items-center justify-between gap-6 lg:flex">
            <a href="#" className="relative shrink-0">
              <img src="/logo.svg" alt="Sacramento Studio" className="h-8 w-auto" />
            </a>

            <div className="relative flex items-center">
              <button
                type="button"
                onClick={() => setIsDownloadMenuOpen((value) => !value)}
                className="inline-flex h-12 items-center rounded-full bg-[#7f58d1] px-8 text-lg font-semibold text-[#f4efff] transition hover:bg-[#724ac7]"
              >
                <span>Download App</span>
              </button>

              {isDownloadMenuOpen ? (
                <div className="absolute right-0 top-full z-30 mt-3 min-w-[250px] rounded-2xl bg-[#ddd8ea] p-4 text-[#3b2c62] shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
                  <p className="text-sm font-semibold">Su quale sistema vuoi scaricare l&apos;app?</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <a
                      href="#"
                      aria-label="Download per Android"
                      className="flex items-center justify-center rounded-xl border border-[#6e46c3] bg-[#7f58d1] px-3 py-2 text-[#f4efff] transition hover:bg-[#724ac7]"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="currentColor">
                        <path d="M6.5 4.8a1 1 0 0 1 1.52-.86l10 6.2a1 1 0 0 1 0 1.7l-10 6.2A1 1 0 0 1 6.5 17.2V4.8Zm2 .93v10.54L17 11 8.5 5.73Z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-label="Download per iOS"
                      className="flex items-center justify-center rounded-xl border border-[#6e46c3] bg-[#7f58d1] px-3 py-2 text-[#f4efff] transition hover:bg-[#724ac7]"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="currentColor">
                        <path d="M16.6 12.7c0-1.8 1.5-2.7 1.5-2.7-.8-1.2-2-1.4-2.5-1.4-1.1-.1-2.1.6-2.6.6s-1.3-.6-2.1-.6c-1.1 0-2.2.7-2.7 1.6-1.2 2-.3 5 1 6.8.7.9 1.5 1.9 2.6 1.8 1 0 1.4-.6 2.6-.6s1.6.6 2.6.6c1.1 0 1.7-.9 2.4-1.8.8-1 1.1-2 1.1-2.1 0 0-2-.8-2-3.2Zm-2.2-5.5c.5-.6.9-1.5.8-2.3-.8 0-1.7.5-2.2 1.1-.5.6-.9 1.5-.8 2.3.9.1 1.8-.4 2.2-1.1Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <a href="#" className="relative shrink-0 lg:hidden">
            <img src="/logo.svg" alt="Sacramento Studio" className="h-7 w-auto sm:h-8" />
          </a>

          <button
            type="button"
            aria-label="Download App"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#7f58d1] text-[#f4efff] transition hover:bg-[#724ac7] lg:hidden"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>

          {isMobileMenuOpen ? (
            <div className="absolute right-0 top-full z-30 mt-3 min-w-[250px] rounded-2xl bg-[#ddd8ea] p-4 text-sm font-semibold text-[#3b2c62] shadow-[0_12px_30px_rgba(0,0,0,0.35)] lg:hidden">
              <p className="text-sm font-semibold mb-3">Su quale sistema vuoi scaricare l'app?</p>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="#"
                  aria-label="Download per Android"
                  className="flex items-center justify-center rounded-xl border border-[#6e46c3] bg-[#7f58d1] px-3 py-2 text-[#f4efff] transition hover:bg-[#724ac7]"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="currentColor">
                    <path d="M6.5 4.8a1 1 0 0 1 1.52-.86l10 6.2a1 1 0 0 1 0 1.7l-10 6.2A1 1 0 0 1 6.5 17.2V4.8Zm2 .93v10.54L17 11 8.5 5.73Z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Download per iOS"
                  className="flex items-center justify-center rounded-xl border border-[#6e46c3] bg-[#7f58d1] px-3 py-2 text-[#f4efff] transition hover:bg-[#724ac7]"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="currentColor">
                    <path d="M16.6 12.7c0-1.8 1.5-2.7 1.5-2.7-.8-1.2-2-1.4-2.5-1.4-1.1-.1-2.1.6-2.6.6s-1.3-.6-2.1-.6c-1.1 0-2.2.7-2.7 1.6-1.2 2-.3 5 1 6.8.7.9 1.5 1.9 2.6 1.8 1 0 1.4-.6 2.6-.6s1.6.6 2.6.6c1.1 0 1.7-.9 2.4-1.8.8-1 1.1-2 1.1-2.1 0 0-2-.8-2-3.2Zm-2.2-5.5c.5-.6.9-1.5.8-2.3-.8 0-1.7.5-2.2 1.1-.5.6-.9 1.5-.8 2.3.9.1 1.8-.4 2.2-1.1Z" />
                  </svg>
                </a>
              </div>
            </div>
          ) : null}
        </nav>
      </header>

      <motion.div
        style={{ opacity: atmosphereOpacity }}
        className="absolute inset-0 bg-[#02030a]"
      />

      <motion.div
        style={{ opacity: firstOpacity, y: firstY }}
        className="absolute inset-0 flex items-center justify-center px-6 text-center"
      >
        <div className="max-w-3xl pt-10 sm:pt-0 flex justify-center">
          <img
            src="/logo.svg"
            alt="Sacramento Studio Logo"
            className="mx-auto mt-4 h-16 sm:h-36 object-contain"
          />
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: secondOpacity, y: secondY }}
        className="absolute inset-0 flex items-center justify-start px-6 sm:px-14"
      >
        <h2 className="max-w-[18ch] text-left text-2xl font-medium leading-[1.15] text-white/95 sm:max-w-md sm:text-5xl sm:leading-tight">
          Esperienza esclusiva di immagine e stile
        </h2>
      </motion.div>

      <motion.div
        style={{ opacity: thirdOpacity, y: thirdY }}
        className="absolute inset-0 flex items-center justify-end px-6 sm:px-14"
      >
        <h2 className="max-w-[20ch] text-right text-2xl font-medium leading-[1.15] text-white/95 sm:max-w-xl sm:text-5xl sm:leading-tight">
          <span className="block">Tre energie, tre mondi.</span>
          <span className="block">Un solo nome: Sacramento.</span>
        </h2>
      </motion.div>
    </div>
  );
}