import { useEffect, useRef, useState, useCallback } from "react";

const AUDIO_URL = "https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3";

const CosmicAudioManager = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isOverInteractive, setIsOverInteractive] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const fadeIntervalRef = useRef<number | null>(null);

  // Init audio
  useEffect(() => {
    const audio = new Audio(AUDIO_URL);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";
    audioRef.current = audio;

    audio.addEventListener("canplaythrough", () => setAudioLoaded(true));

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Track first user interaction
  useEffect(() => {
    const handler = () => {
      setUserInteracted(true);
      window.removeEventListener("click", handler);
      window.removeEventListener("mousemove", handler);
    };
    window.addEventListener("click", handler);
    window.addEventListener("mousemove", handler);
    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("mousemove", handler);
    };
  }, []);

  const fadeTo = useCallback((targetVolume: number, duration: number = 800) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const steps = 20;
    const stepTime = duration / steps;
    const volumeStep = (targetVolume - audio.volume) / steps;
    let currentStep = 0;

    fadeIntervalRef.current = window.setInterval(() => {
      currentStep++;
      const newVol = Math.max(0, Math.min(1, audio.volume + volumeStep));
      audio.volume = newVol;

      if (currentStep >= steps) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        audio.volume = targetVolume;
        if (targetVolume === 0) audio.pause();
      }
    }, stepTime);
  }, []);

  // Handle hover state and audio
  useEffect(() => {
    if (!audioLoaded || !userInteracted) return;

    const audio = audioRef.current;
    if (!audio) return;

    if (isOverInteractive) {
      audio.play().then(() => fadeTo(0.08, 1000)).catch(() => {});
    } else {
      fadeTo(0, 800);
    }
  }, [isOverInteractive, audioLoaded, userInteracted, fadeTo]);

  // Track mouse over interactive elements
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], .group, [class*='hover'], input, textarea, .bg-cosmic-card, [class*='cursor']"
      );
      setIsOverInteractive(!!interactive);
    };

    document.addEventListener("mouseover", handleMouseOver);
    return () => document.removeEventListener("mouseover", handleMouseOver);
  }, []);

  // Custom cursor style
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "cosmic-cursor-style";
    style.textContent = `
      body:not(.cursor-interactive) {
        cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%237c3aed' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M11 5 6 9H2v6h4l5 4V5Z'/%3E%3Cline x1='23' x2='17' y1='9' y2='15'/%3E%3Cline x1='17' x2='23' y1='9' y2='15'/%3E%3C/svg%3E") 12 12, auto;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const el = document.getElementById("cosmic-cursor-style");
      if (el) el.remove();
    };
  }, []);

  // Toggle class on body
  useEffect(() => {
    if (isOverInteractive) {
      document.body.classList.add("cursor-interactive");
    } else {
      document.body.classList.remove("cursor-interactive");
    }
  }, [isOverInteractive]);

  return null; // No UI, just logic
};

export default CosmicAudioManager;
