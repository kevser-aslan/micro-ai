"use client";

import DrawPath from "@/components/drawPath";

export default function DrawWithText() {
  return (
    <div className="flex flex-col items-center text-center py-20 px-6 bg-[#0f0f23] text-white space-y-6">
      <DrawPath />

      <p className="text-xl md:text-2xl font-medium text-gray-300">
        <span className="text-white font-semibold">Bir soru sorun</span> →
        <span className="text-indigo-400 font-semibold"> microAi hemen yanıtlasın.</span>
      </p>
    </div>
  );
}
