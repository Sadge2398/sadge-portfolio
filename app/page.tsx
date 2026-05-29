"use client";

import { motion } from "framer-motion";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import ScrollNav from "@/components/sections/ScrollNav";
import { consumeClickIfDragged } from "@/lib/cameraStore";

export default function Home() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  return (
    <div className="relative">
      <div className="pointer-events-auto">
        <ScrollNav />
      </div>

      <div className="relative z-10 pointer-events-none">
        {/* Hero Section */}
        <section
          id="hero"
          className="flex h-screen items-center justify-center select-none"
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderRadius: "24px",
            }}
            className="container py-4 mx-auto px-4 text-center pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1
                style={{ pointerEvents: "none" }}
                className="mb-4 text-5xl md:text-7xl font-bold text-white pointer-events-none text-glow"
              >
                Sajjad Mahmoodi
              </h1>
              <h2
                style={{ pointerEvents: "none" }}
                className="mb-6 text-2xl md:text-3xl font-bold text-gradient"
              >
                Full Stack Developer
              </h2>
              <p
                style={{ pointerEvents: "none" }}
                className="mx-auto mb-12 max-w-2xl text-lg text-gray-300 font-bold"
              >
                Building end-to-end digital products — from polished interfaces
                and mobile apps to scalable APIs and databases.
              </p>

              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex justify-center space-x-8 pointer-events-auto font-bold"
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, color: "#a855f7" }}
                  transition={{ duration: 0.2 }}
                >
                  <NavLink href="#about">About</NavLink>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, color: "#a855f7" }}
                  transition={{ duration: 0.2 }}
                >
                  <NavLink href="#projects">Projects</NavLink>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, color: "#a855f7" }}
                  transition={{ duration: 0.2 }}
                >
                  <NavLink href="#contact">Contact</NavLink>
                </motion.div>
              </motion.nav>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-purple-300/80"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-purple-300/60">
              Ctrl + drag to orbit · Ctrl + scroll to zoom
            </span>
            <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-purple-300/60 p-1"
            >
              <span className="block h-2 w-1 rounded-full bg-purple-300" />
            </motion.div>
          </motion.div>
        </section>

        <div className="pointer-events-auto">
          <About />
          <Projects />
          <Contact />
        </div>
      </div>
    </div>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (consumeClickIfDragged()) return;
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="text-lg text-gray-300 transition-colors hover:text-purple-300"
    >
      {children}
    </a>
  );
}
