import React, { useRef, useEffect, useMemo, useState } from 'react';
import './HalftoneImage.css';
import { optimizeImageUrl, buildUnsplashSrcSet } from '../utils/imageUrl';

// Keep raster work coarser so canvas generation stays cheap on first load.
const BLUR_PX = 2;
const CELL = 6;
const BG_COLOR = '#aa2a19';

const HalftoneImage = ({
  src,
  alt,
  className = "",
  heroInteractive = false,
  sizes,
  intrinsicWidth = 1200,
  intrinsicHeight = 900,
}) => {
  const canvasRef    = useRef(null);
  const boostRef     = useRef(null);
  const containerRef = useRef(null);
  const hasRendered  = useRef(false);
  const drawScheduled = useRef(false);
  const cursorPos    = useRef({ x: 50, y: 50 });
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setPrefersReducedMotion(motionMedia.matches);
    updateMotion();
    motionMedia.addEventListener('change', updateMotion);

    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const hasSaveData = Boolean(conn && conn.saveData);
    const weakCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
    setIsLowPower(hasSaveData || weakCpu);

    return () => motionMedia.removeEventListener('change', updateMotion);
  }, []);

  const lightweightMode = isMobile || isLowPower || prefersReducedMotion;
  const aspectRatio = intrinsicWidth / intrinsicHeight;

  const imgSizes = sizes || (heroInteractive
    ? '100vw'
    : '(max-width: 767px) 92vw, (max-width: 1199px) 44vw, 28vw');

  const optimizedSrc = useMemo(() => {
    return optimizeImageUrl(src, heroInteractive
      ? { width: 1920, height: 1080, quality: 72 }
      : { width: 960, height: 720, quality: 60 });
  }, [src, heroInteractive]);

  const srcSet = useMemo(() => {
    return buildUnsplashSrcSet(src, {
      widths: heroInteractive ? [640, 960, 1280, 1600, 1920] : [320, 480, 640, 800, 960, 1200],
      aspectRatio,
      quality: heroInteractive ? 72 : 60,
    });
  }, [src, heroInteractive, aspectRatio]);

  useEffect(() => {
    if (!containerRef.current || isInView) return;

    // Avoid canvas work on first paint for hero media; render it when idle.
    if (heroInteractive) {
      const idleHandle = window.requestIdleCallback
        ? window.requestIdleCallback(() => setIsInView(true), { timeout: 1800 })
        : window.setTimeout(() => setIsInView(true), 900);

      return () => {
        if (window.cancelIdleCallback && typeof idleHandle === 'number') {
          window.cancelIdleCallback(idleHandle);
        } else {
          window.clearTimeout(idleHandle);
        }
      };
    }

    if (lightweightMode) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px 0px' },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [heroInteractive, isInView, lightweightMode]);

  // ── Draw halftone onto canvas (lazy load when in viewport) ─────────────────
  useEffect(() => {
    hasRendered.current = false;
    drawScheduled.current = false;
  }, [optimizedSrc]);

  useEffect(() => {
    if (!isInView || lightweightMode) return;

    const canvas = canvasRef.current;
    const boostCanvas = boostRef.current;
    if (!canvas) return;
    if (heroInteractive && !boostCanvas) return;
    if (hasRendered.current) return;
    if (drawScheduled.current) return;

    drawScheduled.current = true;
    const isSmallViewport = typeof window !== 'undefined' && window.innerWidth < 768;
    const OUT_W = heroInteractive ? (isSmallViewport ? 720 : 960) : (isSmallViewport ? 480 : 720);
    const OUT_H = Math.round(OUT_W * 0.75);

    const draw = () => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Compute object-fit:cover crop so canvas shows the same region as <img>
        const srcW = img.naturalWidth;
        const srcH = img.naturalHeight;
        const dstAspect = OUT_W / OUT_H; // 4/3
        const srcAspect = srcW / srcH;
        let sx = 0, sy = 0, sw = srcW, sh = srcH;
        if (srcAspect > dstAspect) {
          // source wider than 4:3 — crop sides
          sw = srcH * dstAspect;
          sx = (srcW - sw) / 2;
        } else {
          // source taller than 4:3 (or square) — crop top/bottom
          sh = srcW / dstAspect;
          sy = (srcH - sh) / 2;
        }

        // Step 1 — Gaussian blur (23px) smooths color before rasterization
        const blurCanvas = document.createElement('canvas');
        blurCanvas.width  = OUT_W;
        blurCanvas.height = OUT_H;
        const bCtx = blurCanvas.getContext('2d', { willReadFrequently: true });
        // Convert source to monochrome before raster sampling.
        bCtx.filter = `grayscale(100%) blur(${BLUR_PX}px)`;
        bCtx.drawImage(img, sx, sy, sw, sh, 0, 0, OUT_W, OUT_H);

        let blurredData;
        try { blurredData = bCtx.getImageData(0, 0, OUT_W, OUT_H).data; }
        catch (e) { return; }

        // Step 2 — Rasterize at 15ppi: sample blurred color at each cell,
        //           use luminance → dot radius (previous halftone algorithm),
        //           but fill each dot with the actual blurred image color.
        canvas.width = OUT_W;
        canvas.height = OUT_H;
        if (heroInteractive && boostCanvas) {
          boostCanvas.width = OUT_W;
          boostCanvas.height = OUT_H;
        }

        const ctx = canvas.getContext('2d', { alpha: false });
        const boostCtx = heroInteractive && boostCanvas ? boostCanvas.getContext('2d', { alpha: false }) : null;
        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(0, 0, OUT_W, OUT_H);
        if (boostCtx) {
          boostCtx.fillStyle = BG_COLOR;
          boostCtx.fillRect(0, 0, OUT_W, OUT_H);
        }

        for (let y = CELL / 2; y < OUT_H; y += CELL) {
          for (let x = CELL / 2; x < OUT_W; x += CELL) {
            const idx = (Math.floor(y) * OUT_W + Math.floor(x)) * 4;
            const r   = blurredData[idx];
            const g   = blurredData[idx + 1];
            const b   = blurredData[idx + 2];
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            const darkness = 1 - lum / 255;
            const minR   = CELL * 0.08;
            const maxR   = CELL * 0.48;
            const radius = minR + darkness * (maxR - minR);
            if (radius > 0.4) {
              ctx.fillStyle = `rgb(${r},${g},${b})`;
              ctx.beginPath();
              ctx.arc(x, y, radius, 0, Math.PI * 2);
              ctx.fill();
              if (boostCtx) {
                boostCtx.fillStyle = `rgb(${r},${g},${b})`;
                boostCtx.beginPath();
                boostCtx.arc(x, y, radius, 0, Math.PI * 2);
                boostCtx.fill();
              }
            }

            // Boost layer: coarser, punchier halftone for hero cursor hotspot.
            if (boostCtx) {
              const boostDarkness = Math.pow(darkness, 0.62);
              const boostRadius = CELL * (0.18 + boostDarkness * 0.92);
              if (boostRadius > 0.35) {
                const ink = Math.max(10, Math.round(115 - boostDarkness * 105));
                const alpha = 0.35 + boostDarkness * 0.55;
                boostCtx.fillStyle = `rgba(${ink}, ${ink}, ${ink}, ${alpha})`;
                boostCtx.beginPath();
                boostCtx.arc(x, y, boostRadius, 0, Math.PI * 2);
                boostCtx.fill();
              }
            }
          }
        }

        hasRendered.current = true;
      };
      img.onerror = () => {
        drawScheduled.current = false;
      };
      img.src = optimizedSrc;
    };

    const handle = window.requestIdleCallback
      ? window.requestIdleCallback(draw, { timeout: heroInteractive ? 1500 : 900 })
      : window.setTimeout(draw, heroInteractive ? 800 : 250);

    return () => {
      if (window.cancelIdleCallback && typeof handle === 'number') {
        window.cancelIdleCallback(handle);
      } else {
        window.clearTimeout(handle);
      }
    };
  }, [optimizedSrc, isInView, heroInteractive, lightweightMode]);

  // ── Cursor tracking for hero interactive mode ──────────────────────────────
  useEffect(() => {
    if (!heroInteractive || !containerRef.current) return;

    const container = containerRef.current;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      // Clamp position to container bounds, don't skip updates even if over text
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      cursorPos.current = { x, y };
      container.style.setProperty('--cursor-x', `${x}%`);
      container.style.setProperty('--cursor-y', `${y}%`);
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [heroInteractive]);

  return (
    <div
      ref={containerRef}
      className={`halftone-container ${heroInteractive ? 'hero-raster-interactive' : ''} ${className}`}
    >
      {/* Layer 1: Grayscale base — always visible */}
      <img
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={imgSizes}
        alt={alt}
        className="base-img"
        width={intrinsicWidth}
        height={intrinsicHeight}
        loading={heroInteractive ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={heroInteractive ? 'high' : 'auto'}
      />

      {isInView && !lightweightMode && (
        <>
          {/* Layer 2: Full-colour copy — fades in on hover */}
          <img
            src={optimizedSrc}
            srcSet={srcSet}
            sizes={imgSizes}
            alt=""
            className="color-img"
            aria-hidden="true"
            width={intrinsicWidth}
            height={intrinsicHeight}
            loading="lazy"
            decoding="async"
          />

          {/* Layer 3: Halftone canvas — fades out on hover */}
          <canvas ref={canvasRef} className="halftone-canvas" />

          {/* Layer 4: Hero-only boosted halftone hotspot */}
          {heroInteractive && (
            <canvas ref={boostRef} className="halftone-canvas halftone-canvas-boost" />
          )}
        </>
      )}
    </div>
  );
};

export default HalftoneImage;
