"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { House, UserRound, FolderCode, Mail, Orbit } from "lucide-react";
import { useGalaxyExplorer } from "@/components/threeD/GalaxyExplorer";
import { consumeClickIfDragged } from "@/lib/cameraStore";

const SECTIONS = [
  { id: "hero", label: "Home", icon: House },
  { id: "about", label: "About", icon: UserRound },
  { id: "projects", label: "Projects", icon: FolderCode },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

export default function ScrollNav() {
  const [active, setActive] = useState("hero");
  const { open } = useGalaxyExplorer();
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-40% 0px -40% 0px", threshold: 0 });
    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (consumeClickIfDragged()) event.preventDefault();
  };

  return (
    <>
      <motion.div aria-hidden="true" style={{ scaleX: reducedMotion ? scrollYProgress : progress }} className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-purple-400 pointer-events-none" />
      <nav aria-label="Sections" className="desktop-section-nav">
        {SECTIONS.map(({ id, label }) => (
          <a key={id} href={`#${id}`} onClick={handleClick} aria-label={label} aria-current={active === id ? "location" : undefined} className="section-dot-link">
            <span className="section-dot-label">{label}</span>
            <span className="section-dot" />
          </a>
        ))}
      </nav>
      <nav aria-label="Mobile sections" className="mobile-section-nav">
        {SECTIONS.map(({ id, label, icon: Icon }) => (
          <a key={id} href={`#${id}`} onClick={handleClick} aria-current={active === id ? "location" : undefined}>
            <Icon size={19} aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
        <button onClick={open} className="mobile-galaxy-link" aria-haspopup="dialog"><Orbit size={19} aria-hidden="true" /><span>Galaxy</span></button>
      </nav>
    </>
  );
}
