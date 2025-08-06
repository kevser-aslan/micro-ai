"use client";

import { useEffect, useRef, useState } from "react";

type VideoItem = {
  id: number;
  src: string;
  label: string;
  description: string;
};

const videos: VideoItem[] = [
  {
    id: 0,
    src: "/videos/e-ticaret.mp4",
    label: "E-ticaret",
    description: "Sipariş durumu",
  },
  {
    id: 1,
    src: "/videos/saglik.mp4",
    label: "Sağlık",
    description: "Randevu alma",
  },
  {
    id: 2,
    src: "/videos/egitim.mp4",
    label: "Eğitim",
    description: "Kurs bilgileri",
  },
  {
    id: 3,
    src: "/videos/kurumsal.mp4",
    label: "Kurumsal",
    description: "İletişim bilgileri",
  },
];

export default function VideoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleEnded = () => {
      setActiveIndex((prev) => (prev + 1) % videos.length);
    };

    videoEl.addEventListener("ended", handleEnded);
    return () => videoEl.removeEventListener("ended", handleEnded);
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.load();
    videoEl.play().catch(() => {
      videoEl.muted = true;
      videoEl.play();
    });

    let frameId: number;

    const updateProgress = () => {
      if (videoEl.duration) {
        const ratio = videoEl.currentTime / videoEl.duration;
        setProgress(ratio);
      }
      frameId = requestAnimationFrame(updateProgress);
    };

    updateProgress();

    return () => cancelAnimationFrame(frameId);
  }, [activeIndex]);

  return (
    <section className="w-full bg-[#11111b] text-white py-16 px-6  shadow-2xl">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Video gösterimi */}
        <div className="w-full">
          <video
            key={videos[activeIndex].src}
            ref={videoRef}
            src={videos[activeIndex].src}
            controls
            className="w-full rounded-xl border border-[#1e1e2e] shadow-lg"
          />
        </div>

       

        {/* Butonlar ve ayrı ayrı ilerleme çizgileri */}
        <div className="flex  justify-center mt-10 gap-4 w-full ">
          {videos.map((video, i) => {
            const isActive = i === activeIndex;
            return (
              <div key={video.id} className="w-56">
                {/* Her buton için üstteki çizgi */}
                <div className="w-full h-1 bg-[#313244] rounded-full overflow-hidden mb-1">
                  <div
                    className={`h-full bg-blue-500 transition-all duration-100`}
                    style={{ width: isActive ? `${progress * 100}%` : "0%" }}
                  />
                </div>

                {/* Butonun kendisi */}
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
                  <strong>{video.label}:</strong> {video.description}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
