"use client";
import { caveat } from "../fonts/fonts";

export default function PricingPage() {
  return (
    <div
      className={`relative min-h-screen bg-[#0f0f1b] flex flex-col items-center justify-start pt-32 px-6 ${caveat.className}`}
    >
      {/* Yazı ve SVG üst üste yerleşecek şekilde container */}
      <div className="relative inline-block text-center mb-16">
        {/* Ana başlık */}
        <h1 className="text-[90px] font-black text-[#8C82FC] leading-none tracking-wider">
          FİYATLANDIRMA
        </h1>

        {/* Dolar SVG - Üst üste biner */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 150 160"
          className="absolute top-1/2 left-1/2 w-[100px] h-[100px] -translate-x-1/2 -translate-y-1/2 animate-draw-dollar pointer-events-none"
          fill="none"
          stroke="#FF4C39"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* $ işareti için 2 zigzag path */}
          <path d="M130 40 C70 30, 50 90, 130 90 C170 90, 130 145, 80 140" />
          {/* İki dikey çizgi */}
          <line x1="95" y1="30" x2="95" y2="150" />
          <line x1="115" y1="30" x2="115" y2="150" />
        </svg>
      </div>

      {/* Fiyat kutuları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* Başlangıç Planı */}
        <div className="bg-[#1a1a2e] rounded-2xl p-8 shadow-lg text-white border border-[#8C82FC] hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-bold text-[#8C82FC] mb-4">Başlangıç</h2>
          <p className="text-lg mb-2">Ücretsiz</p>
          <p className="text-sm text-gray-300">Küçük siteler için ideal</p>
        </div>

        {/* Profesyonel Plan */}
        <div className="bg-[#1a1a2e] rounded-2xl p-8 shadow-lg text-white border border-[#FF4C39] hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-bold text-[#FF4C39] mb-4">Profesyonel</h2>
          <p className="text-lg mb-2">Ücretli</p>
          <p className="text-sm text-gray-300">Daha büyük ihtiyaçlar için</p>
        </div>
      </div>

      {/* Açıklama */}
      <p className="mt-12 text-gray-400 text-center text-sm">
        Detaylı fiyat bilgisi için bizimle iletişime geçin.
      </p>

      {/* SVG animasyon stilleri */}
      <style jsx>{`
        .animate-draw-dollar path,
        .animate-draw-dollar line {
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
          animation: draw 2s ease forwards;
        }

        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
