'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface MenuItem {
  href: string;
  baseColor: string;
  hoverColor: string;
  labelKey: string;        // Çeviri anahtarı
  descriptionKey: string;  // Çeviri anahtarı
}

const menuItemsData: MenuItem[] = [
  {
    href: "/product",
    baseColor: "#ffffff",
    hoverColor: "#f43f5e",
    labelKey: "product.label",
    descriptionKey: "product.description",
  },
  {
    href: "/pricing",
    baseColor: "#d4d4d4",
    hoverColor: "#10b981",
    labelKey: "pricing.label",
    descriptionKey: "pricing.description",
  },
  {
    href: "/about",
    baseColor: "#a3a3a3",
    hoverColor: "#3b82f6",
    labelKey: "about.label",
    descriptionKey: "about.description",
  },
  {
    href: "/contact",
    baseColor: "#737373",
    hoverColor: "#f59e0b",
    labelKey: "contact.label",
    descriptionKey: "contact.description",
  },
  {
    href: "/privacy-policy",
    baseColor: "#525252",
    hoverColor: "#8b5cf6",
    labelKey: "privacyPolicy.label",
    descriptionKey: "privacyPolicy.description",
  },
];

export default function Footer() {
  const t = useTranslations("footer");

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [draw, setDraw] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight / 1.2;
      const footerTop = document.getElementById("footer")?.getBoundingClientRect().top || 0;
      if (footerTop < triggerPoint) {
        setDraw(true);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <footer
      id="footer"
      className="w-full bg-[#11111b] text-white flex flex-col items-center py-20 select-none"
    >
      <div className="w-40 h-40 relative mb-12">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          stroke="#f87171"
          strokeWidth="4"
          strokeLinecap="round"
          className="w-full h-full"
        >
          <path
            d="M30 40 Q100 10 80 60 Q140 50 90 120"
            className={`${draw ? "stroke-draw" : "stroke-hidden"}`}
          />
          <path
            d="M90 120 L90 140 L80 130 M90 140 L100 130"
            className={`${draw ? "stroke-draw" : "stroke-hidden"}`}
          />
        </svg>
      </div>

      <nav className="w-full max-w-[600px] px-4 relative">
        {menuItemsData.map((item, i) => {
          const isHovered = hoveredIndex === i;
          const color = isHovered ? item.hoverColor : item.baseColor;

          return (
            <div
              key={item.href}
              className="relative my-4"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link href={item.href}>
                <div
                  style={{ color }}
                  className={`
                    text-center text-[5vh] font-semibold w-full
                    transition-all duration-300
                    cursor-pointer
                  `}
                >
                  {t(item.labelKey)}
                </div>
              </Link>

              {isHovered && (
                <div
                  className="fixed px-4 py-2 rounded-md text-sm font-medium text-white z-50 pointer-events-none transition-all duration-150"
                  style={{
                    top: mousePos.y + 16,
                    left: mousePos.x + 16,
                    backgroundColor: color,
                    whiteSpace: "nowrap",
                  }}
                >
                  {t(item.descriptionKey)}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <style jsx>{`
        .stroke-draw {
          stroke-dasharray: 300;
          stroke-dashoffset: 0;
          transition: stroke-dashoffset 2s ease-in-out;
        }
        .stroke-hidden {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          transition: stroke-dashoffset 2s ease-in-out;
        }
      `}</style>
    </footer>
  );
}
