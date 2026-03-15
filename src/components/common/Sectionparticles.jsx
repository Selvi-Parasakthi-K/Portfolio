import { useEffect, useRef } from "react";

/**
 * SectionParticles — Beautiful version
 * Three layers:
 *  1. Glitter stars  — sharp twinkle bursts
 *  2. Floating orbs  — soft glowing blobs
 *  3. Network dots   — connected moving particles (your original)
 */
export default function SectionParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, raf;

    // ── Particle pools ──────────────────────────────────────────────
    let dots = []; // network dots
    let glitter = []; // twinkling star-bursts

    const TEAL = "108,242,194";
    const WHITE = "220,235,255";

    // ── Resize ──────────────────────────────────────────────────────
    function resize() {
      const p = canvas.parentElement;
      W = canvas.width = p ? p.offsetWidth : window.innerWidth;
      H = canvas.height = p ? p.offsetHeight : window.innerHeight;
    }

    // ── Init all layers ─────────────────────────────────────────────
    function init() {
      // Network dots
      dots = Array.from({ length: 45 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.5 + 0.6,
        o: Math.random() * 0.3 + 0.12,
        color: Math.random() > 0.5 ? TEAL : WHITE,
      }));

      // Glitter stars — each has a phase so they twinkle independently
      glitter = Array.from({ length: 28 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 2.5 + 1,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.04 + 0.02,
        color: Math.random() > 0.6 ? TEAL : WHITE,
        // drift slowly
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      }));
    }

    // ── Draw 4-point star (glitter) ─────────────────────────────────
    function drawStar(x, y, outerR, innerR, opacity, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        const r = i % 2 === 0 ? outerR : innerR;
        i === 0
          ? ctx.moveTo(r * Math.cos(angle), r * Math.sin(angle))
          : ctx.lineTo(r * Math.cos(angle), r * Math.sin(angle));
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(${color},${opacity})`;
      ctx.shadowBlur = outerR * 3;
      ctx.shadowColor = `rgba(${color},${opacity * 0.8})`;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    // ── Main draw loop ───────────────────────────────────────────────
    function draw(ts = 0) {
      ctx.clearRect(0, 0, W, H);

      // 1. Network dots + connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${TEAL},${(1 - dist / 130) * 0.1})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of dots) {
        // Glow halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},0.04)`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.o})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${p.color},0.4)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }

      // 2. Glitter stars — twinkle via sine wave
      for (const g of glitter) {
        g.phase += g.speed;
        const pulse = (Math.sin(g.phase) + 1) / 2; // 0 → 1
        const opacity = pulse * 0.75 + 0.05; // 0.05 → 0.8
        const outerR = g.size * (0.6 + pulse * 0.8); // breathes
        const innerR = outerR * 0.25;

        drawStar(g.x, g.y, outerR, innerR, opacity, g.color);

        // Tiny centre dot for extra sparkle
        ctx.beginPath();
        ctx.arc(g.x, g.y, outerR * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity * 0.9})`;
        ctx.fill();

        g.x += g.vx;
        g.y += g.vy;
        // Wrap edges
        if (g.x < 0) g.x = W;
        if (g.x > W) g.x = 0;
        if (g.y < 0) g.y = H;
        if (g.y > H) g.y = 0;
      }

      raf = requestAnimationFrame(draw);
    }

    // ── Bootstrap ────────────────────────────────────────────────────
    resize();
    init();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      init();
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
