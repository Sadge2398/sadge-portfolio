"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function ScrollNav() {
  const [active, setActive] = useState("hero");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Top scroll-progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-400"
      />

      {/* Side section dots */}
      <nav className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-5 sm:flex">
        {SECTIONS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-label={label}
              className="group relative flex items-center"
            >
              <span
                className={`absolute right-6 whitespace-nowrap rounded-md bg-black/60 px-2 py-1 text-xs font-bold uppercase tracking-widest backdrop-blur-sm transition-all duration-300 ${
                  isActive
                    ? "text-fuchsia-300"
                    : "text-gray-400 opacity-0 group-hover:opacity-100"
                }`}
              >
                {label}
              </span>
              <span
                className={`block rounded-full border transition-all duration-300 ${
                  isActive
                    ? "h-3.5 w-3.5 border-fuchsia-400 bg-fuchsia-400 shadow-[0_0_12px_3px_rgba(232,121,249,0.7)]"
                    : "h-2.5 w-2.5 border-gray-500 bg-transparent group-hover:border-fuchsia-300"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}
