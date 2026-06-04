"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Overlay } from "./Overlay";

const MOBILE_BREAKPOINT = 768;
const DESKTOP_HERO_VERTICAL_SHIFT = 0.08;

const HERO_TOTAL_FRAMES = 120;
const heroFramePath = (index: number) => `/sequence-hero/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;

const loadFirstAvailable = (sources: string[]) =>
  new Promise<HTMLImageElement | null>((resolve) => {
    const trySource = (sourceIndex: number) => {
      if (sourceIndex >= sources.length) {
        resolve(null);
        return;
      }

      const image = new Image();
      image.decoding = "async";
      image.src = sources[sourceIndex];

      image.onload = () => resolve(image);
      image.onerror = () => trySource(sourceIndex + 1);
    };

    trySource(0);
  });

export function ScrollyCanvas() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(0);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const sectionHeightClass = isMobileViewport ? "h-[220vh]" : "h-[300vh]";

  const drawHero = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const images = imagesRef.current;
    let image = images[frameIndex];

    if (!image) {
      for (let step = 1; step < images.length; step += 1) {
        const prev = frameIndex - step;
        const next = frameIndex + step;

        if (prev >= 0 && images[prev]) {
          image = images[prev];
          break;
        }

        if (next < images.length && images[next]) {
          image = images[next];
          break;
        }
      }
    }

    if (!image) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const scaledWidth = Math.max(1, Math.floor(width * dpr));
    const scaledHeight = Math.max(1, Math.floor(height * dpr));

    if (canvas.width !== scaledWidth || canvas.height !== scaledHeight) {
      canvas.width = scaledWidth;
      canvas.height = scaledHeight;
    }

    const isMobileViewport = window.innerWidth < MOBILE_BREAKPOINT;

    // gambiarra pra escurecer o fundo e esconder o granulado, dps arrumar
    const base = ctx.createLinearGradient(0, 0, 0, canvas.height);
    base.addColorStop(0, "#0a0f1a");
    base.addColorStop(1, "#0d0d0d");
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (isMobileViewport) {
      // ajeitar dps: ajustei a escala pq tava cortando a galera no mobile
      const MOBILE_VISIBLE_WIDTH = 0.78;
      const scale = Math.max(
        canvas.width / (image.width * MOBILE_VISIBLE_WIDTH),
        canvas.height / image.height
      );
      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;
      const overflowY = drawHeight - canvas.height;
      const offsetX = (canvas.width - drawWidth) / 2;
      const offsetY = -overflowY * 0.18;

      ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

      // vignette pra disfarçar mais a tremedeira
      const vignette = ctx.createLinearGradient(0, 0, 0, canvas.height);
      vignette.addColorStop(0, "rgba(8,12,24,0.72)");
      vignette.addColorStop(0.35, "rgba(8,12,24,0.34)");
      vignette.addColorStop(1, "rgba(8,12,24,0.82)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // escurece tudo pq a claroza no mobile tava tensa
      ctx.fillStyle = "rgba(4, 6, 14, 0.24)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    // no desktop deixa full msm
    const coverScale = Math.max(canvas.width / image.width, canvas.height / image.height);
    const drawWidth = image.width * coverScale;
    const drawHeight = image.height * coverScale;
    const offsetX = (canvas.width - drawWidth) / 2;
    // empurra pra baixo se não a navbar corta o rosto, dps ver uma solucao melhor
    const offsetY = (canvas.height - drawHeight) * 0.5 + canvas.height * DESKTOP_HERO_VERTICAL_SHIFT;
    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

    // msm coisa pro desktop, foto ta cagada dps pedir outra
    const desktopVignette = ctx.createLinearGradient(0, 0, 0, canvas.height);
    desktopVignette.addColorStop(0, "rgba(6,10,20,0.42)");
    desktopVignette.addColorStop(0.45, "rgba(6,10,20,0.26)");
    desktopVignette.addColorStop(1, "rgba(6,10,20,0.52)");
    ctx.fillStyle = desktopVignette;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const syncViewportMode = () => setIsMobileViewport(window.innerWidth < MOBILE_BREAKPOINT);

    syncViewportMode();
    window.addEventListener("resize", syncViewportMode);

    return () => window.removeEventListener("resize", syncViewportMode);
  }, []);

  useEffect(() => {
    let canceled = false;

    const loadHeroSequence = async () => {
      imagesRef.current = new Array(HERO_TOTAL_FRAMES).fill(null);

      const firstFrame = await loadFirstAvailable([heroFramePath(0)]);
      if (canceled) return;

      imagesRef.current[0] = firstFrame;
      currentFrameRef.current = 0;
      drawHero(0);

      const jobs = Array.from({ length: HERO_TOTAL_FRAMES - 1 }, async (_, idx) => {
        const frameIndex = idx + 1;
        const frame = await loadFirstAvailable([heroFramePath(frameIndex)]);
        if (canceled) return;
        imagesRef.current[frameIndex] = frame;
      });

      await Promise.all(jobs);
    };

    void loadHeroSequence();

    const handleResize = () => {
      drawHero(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      canceled = true;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalFrames = imagesRef.current.length;
    if (totalFrames === 0) return;

    const frame = Math.min(totalFrames - 1, Math.max(0, Math.round(latest * (totalFrames - 1))));
    if (frame === currentFrameRef.current) return;

    currentFrameRef.current = frame;
    drawHero(frame);
  });

  return (
    <section ref={sectionRef} className={`relative ${sectionHeightClass}`}>
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <canvas ref={canvasRef} className="h-full w-full" aria-label="Scroll animation canvas" />
        <Overlay progress={scrollYProgress} />
      </div>
    </section>
  );
}