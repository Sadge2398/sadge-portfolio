import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { handleGoBack } from "./Utils/Functions";
import { STACK } from "@/lib/stack";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

const stackSections = [
  { title: "Frontend", items: STACK.frontend },
  { title: "Backend", items: STACK.backend },
  { title: "Mobile", items: STACK.mobile },
] as const;

export default function About() {
  return (
    <section id="about" className="min-h-screen py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="container mx-auto px-4 bg-black/50 rounded-lg pb-12 font-bold relative"
      >
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          onClick={handleGoBack}
          className="absolute top-2 left-4 flex items-center gap-2 text-gray-300 hover:text-purple-300 transition-colors p-2 rounded-lg bg-black/40"
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
              I&apos;m a passionate Full Stack developer who builds across the
              entire product — responsive web apps, reliable backend services,
              and cross-platform mobile experiences. My journey started three
              years ago and I&apos;ve been obsessed with shipping polished,
              performant software ever since.
            </motion.p>
            <motion.p variants={itemVariants}>My main stack:</motion.p>
            <motion.div variants={containerVariants} className="space-y-5">
              {stackSections.map(({ title, items }) => (
                <motion.div key={title} variants={itemVariants}>
                  <h4 className="mb-2 text-sm uppercase tracking-widest text-purple-300">
                    {title}
                  </h4>
                  <motion.ul className="flex flex-wrap gap-2">
                    {items.map((tech) => (
                      <motion.li
                        key={tech}
                        whileHover={{ scale: 1.05, color: "purple" }}
                        variants={listItemVariants}
                        className="rounded-full bg-purple-500/15 px-3 py-1 text-sm text-purple-200"
                      >
                        {tech}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              ))}
            </motion.div>
            <motion.p variants={itemVariants}>
              When I&apos;m not coding, you can find me gaming, watching F1
              races, or hanging out with friends.
            </motion.p>
          </motion.div>

          <motion.div variants={containerVariants} className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="rounded-lg bg-black/45 p-6"
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
                  <p className="text-sm text-purple-300">
                    Frontend Developer • 2022 - 2024
                  </p>
                  <p className="mt-2">
                    Learned the fundamentals of frontend development and shipped
                    real-world projects under tight deadlines.
                  </p>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <h4 className="font-semibold text-purple-300">
                    Freelancer, Self-taught, Internship • 2024 - 2025
                  </h4>
                  <p className="mt-2">
                    Expanded into backend APIs, databases, and mobile — building
                    full products end to end for clients and personal projects.
                  </p>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <h4 className="font-semibold text-purple-300">
                    Chadco, Full Stack Developer • early 2025 - Present
                  </h4>
                  <p className="mt-2">
                    Thrived in a fast-paced environment delivering high-performance
                    web apps, backend integrations, and data-driven features
                    alongside a high-performing team.
                  </p>
                </motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
