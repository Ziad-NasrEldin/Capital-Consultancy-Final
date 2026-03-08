import React, { useRef, useEffect, useCallback } from 'react';
import './HalftoneImage.css';

// Output canvas resolution — 4:3 matches the container's aspect-ratio
const OUT_W    = 1200;
const OUT_H    = 900;
// Gaussian blur radius applied before rasterization
const BLUR_PX  = 3;
// "15ppi" bitmap cell size — coarse grid sampled from blurred image
const CELL     = 4;
const BG_COLOR = '#aa2a19';

const HalftoneImage = ({ src, alt, className = "", heroInteractive = false }) => {
  const canvasRef    = useRef(null);
  const boostRef     = useRef(null);
  const containerRef = useRef(null);
  const hasRendered  = useRef(false);
  const cursorPos    = useRef({ x: 0.5, y: 0.5 });
  const isHovering   = useRef(false);

  // ── Draw halftone onto canvas (lazy load when in viewport) ─────────────────
  useEffect(() => {
    hasRendered.current = false;
  }, [src]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const boostCanvas = boostRef.current;
    if (!canvas || !boostCanvas) return;
    if (hasRendered.current) return;

    hasRendered.current = true;
    {
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
        boostCanvas.width = OUT_W;
        boostCanvas.height = OUT_H;

        const ctx = canvas.getContext('2d', { alpha: false });
        const boostCtx = boostCanvas.getContext('2d', { alpha: false });
        ctx.fillStyle = BG_COLOR;
        boostCtx.fillStyle = BG_COLOR;
        ctx.fillRect(0, 0, OUT_W, OUT_H);
        boostCtx.fillRect(0, 0, OUT_W, OUT_H);

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
              boostCtx.fillStyle = `rgb(${r},${g},${b})`;
              ctx.beginPath();
              boostCtx.beginPath();
              ctx.arc(x, y, radius, 0, Math.PI * 2);
              boostCtx.arc(x, y, radius, 0, Math.PI * 2);
              ctx.fill();
              boostCtx.fill();
            }

            // Boost layer: coarser, punchier halftone for hero cursor hotspot.
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
      };
      img.src = src;
    }
  }, [src]);

  // ── Cursor tracking for hero interactive mode ──────────────────────────────
  useEffect(() => {
    if (!heroInteractive || !containerRef.current) return;

    const container = containerRef.current;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      // Check if cursor is within the container bounds
      if (
        e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top  || e.clientY > rect.bottom
      ) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      cursorPos.current = { x, y };
      container.style.setProperty('--cursor-x', `${x}%`);
      container.style.setProperty('--cursor-y', `${y}%`);
    };

    // Use document-level listener so text/overlay elements don't block events
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [heroInteractive]);

  return (
    <div
      ref={containerRef}
      className={`halftone-container ${heroInteractive ? 'hero-raster-interactive' : ''} ${className}`}
    >
      {/* Layer 1: Grayscale base — always visible */}
      <img src={src} alt={alt} className="base-img" />

      {/* Layer 2: Full-colour copy — fades in on hover */}
      <img src={src} alt="" className="color-img" aria-hidden="true" />

      {/* Layer 3: Halftone canvas — fades out on hover */}
      <canvas ref={canvasRef} className="halftone-canvas" />

      {/* Layer 4: Hero-only boosted halftone hotspot */}
      <canvas ref={boostRef} className="halftone-canvas halftone-canvas-boost" />
    </div>
  );
};

export default HalftoneImage;
