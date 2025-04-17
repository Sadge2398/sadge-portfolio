'use client';

import Scene from "@/components/threeD/Galaxy";
import { motion } from "framer-motion";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  return (
    <div className="relative">
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene />
      </div>

      <div className="relative z-10 pointer-events-none">
        {/* Hero Section */}
        <section id="hero" className="flex h-screen items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mb-4 text-6xl font-bold text-white">Sajjad Mahmoodi</h1>
              <h2 className="mb-8 text-2xl text-purple-300 font-bold">Frontend Developer</h2>
              <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-300 font-bold">
                Crafting digital experiences through code. Specialized in building modern web applications
                with a focus on performance and user experience.
              </p>
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex justify-center space-x-8 pointer-events-auto font-bold"
              >
                <motion.div variants={itemVariants}
                  whileHover={{ y: -5, color: "#a855f7" }}
                  transition={{ duration: 0.2 }}>
                  <NavLink href="#about">About</NavLink>
                </motion.div>
                <motion.div variants={itemVariants}
                  whileHover={{ y: -5, color: "#a855f7" }}
                  transition={{ duration: 0.2 }}>
                  <NavLink href="#projects">Projects</NavLink>
                </motion.div>
                <motion.div variants={itemVariants}
                  whileHover={{ y: -5, color: "#a855f7" }}
                  transition={{ duration: 0.2 }}>
                  <NavLink href="#contact">Contact</NavLink></motion.div>
              </motion.nav>
            </motion.div>
          </div>
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

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
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


