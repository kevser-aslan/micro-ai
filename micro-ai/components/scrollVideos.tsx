"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

function DrawPath() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.svg
      ref={ref}
      width="120"
      height="40"
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="m-0 p-0"
    >
      <motion.path
        d="M5 30 C15 10, 25 10, 35 30 S55 10, 65 30 S85 10, 95 30"
        stroke="#FF4D4D"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

export default function ScrollVideoWithText() {
  const t = useTranslations("draw");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
//video için
  useEffect(() => {
    const handleScroll = () => {
      if (started) return;

      const video = videoRef.current;
      if (video && video.readyState >= 2) {
        video.play();
        setStarted(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [started]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.currentTime = 0;
      video.play();
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <div className="bg-[#11111b] flex flex-col items-center px-4 pt-10 pb-0 m-0">
      {/* Video */}
      <div className="w-full max-w-4xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] overflow-hidden">
        <div className="aspect-video">
          <video
            ref={videoRef}
            src="/videos/kurumsal.mp4"
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="auto"
          />
        </div>
      </div>

      {/* Yazı */}
      <section className="w-full max-w-4xl flex flex-col items-start text-left text-white mt-1 mb-10 p-0">
        <DrawPath />
        <motion.p
          className="text-xl md:text-2xl font-medium text-gray-300 mt-3 mb-0 pb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-white font-semibold">{t("questionPart1")}</span>{" "}
          →
          <span className="text-indigo-400 font-semibold">
            {" "}
            {t("questionPart2")}
          </span>
        </motion.p>
      </section>
    </div>
  );
}
