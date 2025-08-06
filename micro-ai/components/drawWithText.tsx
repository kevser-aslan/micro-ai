'use client';

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// DrawPath component (aynı dosyada da olabilir, ayrı da)
// Scroll sonrası animasyonu resetleyen path çizimi
function DrawPath() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setKey((k) => k + 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.svg
      key={key}
      width="120"
      height="40"
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M5 30 C15 10, 25 10, 35 30 S55 10, 65 30 S85 10, 95 30"
        stroke="#FF4D4D"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

// DrawWithText component
function DrawWithText() {
  const t = useTranslations("draw");

  return (
    <section className="flex flex-col items-start text-left py-6 px-6 bg-[#11111b] text-white space-y-6 w-full max-w-4xl">
      <DrawPath />

      <motion.p
        className="text-xl md:text-2xl font-medium text-gray-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="text-white font-semibold">{t("questionPart1")}</span>{" "}
        →
        <span className="text-indigo-400 font-semibold"> {t("questionPart2")}</span>
      </motion.p>
    </section>
  );
}

// Ana component (ScrollVideo + DrawWithText)
export default function ScrollVideoWithDraw() {
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
    <div className="bg-[#11111b] min-h-screen flex flex-col items-center px-4 py-20 gap-10">
      {/* Video */}
      <div className="w-full max-w-4xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] overflow-hidden">
        <div className="aspect-video h-[300px]">
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

      {/* Altındaki çizim + metin bölümü */}
      <DrawWithText />
    </div>
  );
}
