'use client';

import React from "react";
import { motion } from 'framer-motion';
import { useTranslations } from "next-intl";
import DrawPath from "@/components/drawPath";

export default function DrawWithText() {
  const t = useTranslations("draw");

  return (
    <section className="flex flex-col items-center text-center py-20 px-6 bg-[#0f0f23] text-white space-y-6">
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
