'use client';
import React from "react";
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="w-full min-h-[50vh] flex flex-col justify-start pt-15 items-center text-center px-6 bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]">
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-white leading-tight"
        initial={{ opacity: 0, y: -40 }}    // yukardan aşağı animasyon için y negatif
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Sormak serbest. <br className="hidden md:block" /> 
        <span className="text-[#4F46E5]">Cevap zaten hazır.</span>
      </motion.h1>

      <motion.p
        className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
        initial={{ opacity: 0, y: -20 }}  // aynı şekilde paragraf için de
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        İnsan gibi değil; daha hızlı, daha tutarlı, daha net.
      </motion.p>
    </section>
  );
}
