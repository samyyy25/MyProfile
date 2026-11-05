import { useEffect, useRef } from "react";

// Small deterministic PRNG so the particle field is identical on every load.
function mulberry32(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COUNT = 54;

/**
 * Very quiet drifting specks behind the graph. Capped at ~30fps and DPR 1.5, paused while the
 * tab is hidden, and drawn once as a still frame under prefers-reduced-motion.
 */
export default function AmbientBackground({ theme, reduced }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const rand = mulberry32(11);
    const rgb = getComputedStyle(document.documentElement).getPropertyValue("--particle").trim() || "255,255,255";

    const specks = Array.from({ length: COUNT }, () => ({
      x: rand(),
      y: rand(),
      r: 0.5 + rand() * 1.2,
      a: 0.1 + rand() * 0.32,
      vx: (rand() - 0.5) * 0.006,
      vy: -(0.003 + rand() * 0.007),
      phase: rand() * Math.PI * 2,
    }));

    let width = 0;
    let height = 0;
    let raf = 0;
    let last = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      for (const s of specks) {
        const twinkle = reduced ? 1 : 0.65 + 0.35 * Math.sin(time / 1800 + s.phase);
        ctx.fillStyle = `rgba(${rgb},${(s.a * twinkle).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x * width, s.y * height, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (time) => {
      raf = requestAnimationFrame(loop);
      if (time - last < 33) return;
      const dt = Math.min((time - last) / 1000, 0.1);
      last = time;
      for (const s of specks) {
        s.x += s.vx * dt * 6;
        s.y += s.vy * dt * 6;
        if (s.y < -0.02) s.y = 1.02;
        if (s.x < -0.02) s.x = 1.02;
        if (s.x > 1.02) s.x = -0.02;
      }
      draw(time);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) raf = requestAnimationFrame(loop);
    };

    resize();
    draw(0);
    if (!reduced) raf = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // `theme` is a dependency on purpose: the particle colour is read from CSS on each theme change.
  }, [theme, reduced]);

  return <canvas ref={canvasRef} className="ambient" aria-hidden="true" />;
}
