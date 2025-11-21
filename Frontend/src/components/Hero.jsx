import React, { useState, useRef, useEffect } from "react";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";
import img7 from "../assets/img7.png";

import { CiSquareChevLeft } from "react-icons/ci";
import { CiSquareChevRight } from "react-icons/ci";

const images = [img1, img2, img3, img4, img5, img6, img7];

const Hero = () => {
  // slides with clones: [last, ...images, first]
  const slides = [images[images.length - 1], ...images, images[0]];
  const slidesCount = slides.length; // images.length + 2
  const realCount = images.length; // original count

  // start at index 1 (first real slide)
  const [index, setIndex] = useState(1);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const trackRef = useRef(null);
  const autoplayRef = useRef(null);
  const pauseRef = useRef(false);
  const isClickingRef = useRef(false); // prevent ultra-fast double clicks

  // helpers
  const goNext = () => {
    if (isClickingRef.current) return;
    isClickingRef.current = true;
    setIsTransitionEnabled(true);
    setIndex((i) => i + 1);
    // unlock after short delay (transition duration)
    setTimeout(() => (isClickingRef.current = false), 350);
  };

  const goPrev = () => {
    if (isClickingRef.current) return;
    isClickingRef.current = true;
    setIsTransitionEnabled(true);
    setIndex((i) => i - 1);
    setTimeout(() => (isClickingRef.current = false), 350);
  };

  const jumpToReal = (realIdx) => {
    setIsTransitionEnabled(true);
    setIndex(realIdx + 1); // offset by 1 because of clone at start
  };

  // autoplay
  useEffect(() => {
    const intervalMs = 2500;
    autoplayRef.current = setInterval(() => {
      if (!pauseRef.current) {
        setIsTransitionEnabled(true);
        setIndex((i) => i + 1);
      }
    }, intervalMs);
    return () => clearInterval(autoplayRef.current);
  }, []);

  // keyboard left/right
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle transitionend to snap when we hit clones
  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    const onTransitionEnd = (e) => {
      // only handle transform transition end
      if (e.propertyName && !e.propertyName.includes("transform")) return;

      // If landed on left clone (index === 0), jump to last real slide (realCount)
      if (index === 0) {
        // disable transition, set index to real last slide, then re-enable transition next tick
        setIsTransitionEnabled(false);
        setIndex(realCount);
        // re-enable transition in next paint tick (double RAF ensures DOM updated first)
        requestAnimationFrame(() => requestAnimationFrame(() => setIsTransitionEnabled(true)));
      }

      // If landed on right clone (index === slidesCount - 1), jump to first real slide (1)
      if (index === slidesCount - 1) {
        setIsTransitionEnabled(false);
        setIndex(1);
        requestAnimationFrame(() => requestAnimationFrame(() => setIsTransitionEnabled(true)));
      }
    };

    node.addEventListener("transitionend", onTransitionEnd);
    return () => node.removeEventListener("transitionend", onTransitionEnd);
  }, [index, realCount, slidesCount]);

  // compute sizing & transform
  const trackWidthPercent = 100 * slidesCount; // e.g., 900% for 7 images + 2 clones = 9 slides
  const slidePercent = 100 / slidesCount; // each slide width as percent of track
  const translatePercent = -slidePercent * index;

  const trackStyle = {
    width: `${trackWidthPercent}%`,
    transform: `translateX(${translatePercent}%)`,
    transitionProperty: isTransitionEnabled ? "transform" : "none",
    transitionDuration: isTransitionEnabled ? "300ms" : "0ms",
    transitionTimingFunction: "ease-out",
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-full max-w-6xl mx-auto my-12 overflow-hidden rounded-lg"
        onMouseEnter={() => (pauseRef.current = true)}
        onMouseLeave={() => (pauseRef.current = false)}
        aria-roledescription="carousel"
        aria-label="Hero image carousel"
      >
        {/* Prev */}
        <button
          type="button"
          onClick={goPrev}
          className="hero-prev absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-30"
          aria-label="Previous slide"
        >
          <CiSquareChevLeft size={36} />
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={goNext}
          className="hero-next absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-30"
          aria-label="Next slide"
        >
          <CiSquareChevRight size={36} />
        </button>

        {/* Dots (real slides only) */}
        <div
          className="hero-dots absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-30"
          role="tablist"
          aria-label="Slide navigation"
        >
          {images.map((_, realIdx) => {
            // active if index corresponds to this real slide (account for clones)
            const isActive =
              index === realIdx + 1 ||
              (index === 0 && realIdx === realCount - 1) ||
              (index === slidesCount - 1 && realIdx === 0);

            return (
              <button
                key={realIdx}
                type="button"
                onClick={() => jumpToReal(realIdx)}
                className={`hero-dot w-4 h-4 rounded-full transition-all ${
                  isActive ? "bg-white" : "bg-white/60 hover:bg-white"
                }`}
                aria-label={`Go to slide ${realIdx + 1}`}
                aria-selected={isActive}
                role="tab"
              />
            );
          })}
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex items-center"
          style={trackStyle}
        >
          {slides.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: `${slidePercent}%` }}
            >
              <img
                src={src}
                alt={`Slide ${i}`}
                className="w-full h-auto block"
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
