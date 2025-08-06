"use client";

import { useEffect, useRef } from "react";

export default function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const updateVideoTime = () => {
      if (!videoRef.current) return;

      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      const duration = videoRef.current.duration || 1;
      videoRef.current.currentTime = duration * scrollPercent;
    };

    window.addEventListener("scroll", updateVideoTime);
    return () => window.removeEventListener("scroll", updateVideoTime);
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#0b0b17] to-[#111122] min-h-screen flex justify-center items-center px-4 py-20">
      <div className="w-full max-w-4xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] overflow-hidden">
        <div className="aspect-video">
          <video
            ref={videoRef}
            src="/videos/ilk.mp4"
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="auto"
          />
        </div>
      </div>
    </div>
  );
}
