"use client";

import { motion, useReducedMotion } from "framer-motion";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import ScrollNav from "@/components/sections/ScrollNav";
import { consumeClickIfDragged } from "@/lib/cameraStore";
import { GalaxyExploreButton } from "@/components/threeD/GalaxyExplorer";

export default function Home() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative">
      <a href="#projects" className="skip-link">Skip to projects</a>
      <ScrollNav />
      <section id="hero" aria-labelledby="hero-title" className="hero-section">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="hero-surface"
        >
          <p className="eyebrow mb-5">Web · Mobile · Agentic AI</p>
          <h1 id="hero-title" className="hero-title text-glow">Sajjad Mahmoodi</h1>
          <h2 className="mt-4 text-xl font-semibold text-purple-300 sm:text-3xl">Full Stack &amp; AI Developer</h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Web and mobile products, reliable backend services, and agentic AI
            systems that connect models, tools, and data.
          </p>
          <nav aria-label="Introduction" className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <NavLink href="#projects" className="button-primary">View projects</NavLink>
            <NavLink href="#contact" className="button-secondary">Get in touch</NavLink>
            <GalaxyExploreButton />
          </nav>
        </motion.div>
        <div className="hero-scroll-hint" aria-hidden="true">
          <span className="hidden text-xs text-slate-400 sm:block">Ctrl + drag to orbit · Ctrl + scroll to zoom</span>
          <span className="text-xs tracking-[0.2em] text-purple-200">SCROLL TO EXPLORE</span>
          <motion.div
            animate={reducedMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-8 w-5 justify-center rounded-full border border-purple-300/60 p-1"
          ><span className="h-2 w-1 rounded-full bg-purple-300" /></motion.div>
        </div>
      </section>
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

function NavLink({ href, children, className }: {
  href: string;
  children: React.ReactNode;
  className: string;
}) {
  return <a href={href} className={className} onClick={(event) => {
    if (consumeClickIfDragged()) event.preventDefault();
  }}>{children}</a>;
}
