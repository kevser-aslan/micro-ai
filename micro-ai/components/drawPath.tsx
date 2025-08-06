"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function DrawPath() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true); // sadece ilk görünmede tetikler
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = svgRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasAnimated]);

  return (
    <motion.svg
      ref={svgRef}
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
        animate={{ pathLength: hasAnimated ? 1 : 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}
