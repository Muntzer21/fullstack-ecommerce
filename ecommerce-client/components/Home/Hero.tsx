"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
const images = [
  "/images/hero/elec.png",
  "/images/hero/ele.png",
  "/images/hero/sal.png",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const t = useTranslations("hero");

  function nextSlide() {
    setCurrent((prev) => (prev + 1) % images.length);
  }

  function prevSlide() {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[550px] w-full overflow-hidden">
      <Image
        src={images[current]}
        alt="Hero Banner"
        fill
        priority
        className="object-cover duration-500"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="max-w-xl text-white">
            <p className="mb-2 text-lg uppercase tracking-[6px]">
              {t("badge")}
            </p>

            <h1 className="mb-4 text-5xl font-bold">{t("title")}</h1>

            <p className="mb-8 text-lg text-gray-200">{t("description")}</p>

            <button className="rounded-lg bg-blue-600 px-8 py-3 font-semibold transition hover:bg-blue-700">
              {t("button")}
            </button>
          </div>
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur transition hover:bg-white/40"
      >
        <ChevronLeft className="text-white" size={28} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur transition hover:bg-white/40"
      >
        <ChevronRight className="text-white" size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition ${
              current === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
