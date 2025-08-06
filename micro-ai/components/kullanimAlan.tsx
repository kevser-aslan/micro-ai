"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type VideoItem = {
  id: number;
  src: string;
  labelKey: string;
  descriptionKey: string;
};

const videos: VideoItem[] = [
  {
    id: 0,
    src: "/videos/e-ticaret.mp4",
    labelKey: "labels.ecommerce",
    descriptionKey: "descriptions.orderStatus",
  },
  {
    id: 1,
    src: "/videos/saglik.mp4",
    labelKey: "labels.health",
    descriptionKey: "descriptions.appointment",
  },
  {
    id: 2,
    src: "/videos/ilk.mp4",
    labelKey: "labels.education",
    descriptionKey: "descriptions.courseInfo",
  },
  {
    id: 3,
    src: "/videos/kurumsal.mp4",
    labelKey: "labels.corporate",
    descriptionKey: "descriptions.contactInfo",
  },
];

export default function VideoCarousel() {
  const t = useTranslations("videoCarousel");
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  // Her activeIndex değiştiğinde ended event listener'ı ekle
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleEnded = () => {
      setActiveIndex((prev) => (prev + 1) % videos.length);
    };

    videoEl.addEventListener("ended", handleEnded);
    return () => {
      videoEl.removeEventListener("ended", handleEnded);
    };
  }, [activeIndex]);

  useEffect(() => {
    setProgress(0); // Video değişince progress sıfırlanır

    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.load();
    videoEl.play().catch(() => {
      videoEl.muted = true;
      videoEl.play();
    });

    const handleTimeUpdate = () => {
      if (videoEl.duration) {
        const ratio = videoEl.currentTime / videoEl.duration;
        setProgress(ratio);
      }
    };

    videoEl.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoEl.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [activeIndex]);

  return (
    <section className="w-full bg-[#11111b] text-white py-16 px-6 shadow-2xl">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="w-full">
          <video
            // key propunu kaldırdım, React video elementini yeniden yaratmaz
            ref={videoRef}
            src={videos[activeIndex].src}
            controls
            className="w-full rounded-xl border border-[#1e1e2e] shadow-lg"
          />
        </div>

        <div className="flex justify-center mt-10 gap-4 w-full">
          {videos.map((video, i) => {
            const isActive = i === activeIndex;
            return (
              <div key={video.id} className="w-56">
                <div className="w-full h-1 bg-[#313244] rounded-full overflow-hidden mb-1">
                  <div
                    className={`h-full bg-blue-500 transition-all duration-100`}
                    style={{ width: isActive ? `${progress * 100}%` : "0%" }}
                  />
                </div>

                <button
                  onClick={() => setActiveIndex(i)}
                  className={`w-full px-4 py-2 rounded-md text-sm font-semibold text-left transition-all
                    ${
                      isActive
                        ? "bg-[#313244] text-white border border-[#585b70]"
                        : "bg-[#1e1e2e] text-[#cdd6f4] hover:bg-[#313244]"
                    }
                  `}
                >
                  <strong>{t(video.labelKey)}:</strong> {t(video.descriptionKey)}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
