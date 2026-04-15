import { useEffect, useRef } from "react";

const STAR_COUNT = 120;

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number; // parallax multiplier
}

const ParallaxStars = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const scrollRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();

    // Generate stars
    starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scroll = scrollRef.current;

      for (const star of starsRef.current) {
        const y = (star.y - scroll * star.speed) % canvas.height;
        const adjustedY = y < 0 ? y + canvas.height : y;

        ctx.beginPath();
        ctx.arc(star.x, adjustedY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 180, 255, ${star.opacity})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 dark:opacity-100 opacity-0 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
};

export default ParallaxStars;
