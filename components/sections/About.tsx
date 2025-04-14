import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { handleGoBack } from './Utils/Functions';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
  }
};

export default function About() {


  return (
    <section id="about" className="min-h-screen py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="container mx-auto px-4 bg-black/35 backdrop-blur-[1px] rounded-lg pb-12 font-bold relative"
      >
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          onClick={handleGoBack}
          className="absolute top-2 left-4 flex items-center gap-2 text-gray-300 hover:text-purple-300 transition-colors p-2 rounded-lg bg-black/20 backdrop-blur-sm"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </motion.button>

        <motion.h2 
          variants={itemVariants}
          className="mb-12 text-4xl font-bold text-white pt-12"
        >
          About Me
        </motion.h2>

        <div className="grid gap-12 md:grid-cols-2">
          <motion.div 
            variants={containerVariants}
            className="space-y-6 text-gray-300"
          >
            <motion.p variants={itemVariants}>
              I'm a passionate Frontendnd developer with expertise in building modern web applications.
              My journey in software development started three years ago and i obsessed since then, and I've been crafting
              digital experiences ever since.
            </motion.p>
            <motion.p variants={itemVariants}>
              I specialize in:
            </motion.p>
            <motion.ul 
              variants={containerVariants}
              className="list-inside list-disc space-y-2"
            >
              <motion.li whileHover={{ scale: 1.05 , x: 10 , color: "purple"}} variants={listItemVariants}>
                Frontend Development (React, Next.js, TypeScript)
              </motion.li>
              <motion.li variants={listItemVariants} whileHover={{ scale: 1.05 , x: 10 , color: "purple"}}>
                Frontend Library (MUI, TailwindCss, Zustand, Framer Motion, Three.js, ...)
              </motion.li>
              <motion.li variants={listItemVariants} whileHover={{ scale: 1.05 , x: 10 , color: "purple"}}>
                UI/UX Design and Implementation
              </motion.li>
              <motion.li variants={listItemVariants} whileHover={{ scale: 1.05 , x: 10 , color: "purple"}}>
                Learning new technologies and tools (backend, Sql, ...)
              </motion.li>
            </motion.ul>
            <motion.p variants={itemVariants}>
              When I'm not coding, you can find me Gaming, Watching F1 races or hanging out with friends.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div 
              variants={itemVariants}
              className="rounded-lg bg-black/30 p-6 backdrop-blur-sm"
            >
              <motion.h3 
                variants={itemVariants}
                className="mb-4 text-2xl font-bold text-purple-300"
              >
                Experience
              </motion.h3>
              <motion.ul 
                variants={containerVariants}
                className="space-y-4 text-gray-300"
              >
                <motion.li variants={itemVariants}>
                  <h4 className="font-bold">Jihaad</h4>
                  <p className="text-sm text-purple-300">Frontend Developer • 2022 - 2024</p>
                  <p className="mt-2">Learned the basics of frontend development and worked on a few projects.</p>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <h4 className="font-semibold text-purple-300">Freelancer, Self-taught, internship • 2024 - Present</h4>
                  <p className="mt-2">Worked on a few projects and learned more every day.</p>
                </motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 