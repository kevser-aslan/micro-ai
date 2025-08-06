'use client';
import React from "react";
import { motion } from 'framer-motion';
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="w-full min-h-[50vh] flex flex-col justify-start pt-15 items-center text-center px-6 bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]">
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-white leading-tight"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {t("title1")} <br className="hidden md:block" />
        <span className="text-[#4F46E5]">{t("title2")}</span>
      </motion.h1>

      <motion.p
        className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {t("description")}
      </motion.p>
    </section>
  );
}
