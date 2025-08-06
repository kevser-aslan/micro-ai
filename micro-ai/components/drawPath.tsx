"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DrawPath() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Key'i değiştirerek component'i veya animasyonu resetle
      setKey((k) => k + 1);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.svg
      key={key} // key değişince React yeniden render eder, animasyon sıfırlanır
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
