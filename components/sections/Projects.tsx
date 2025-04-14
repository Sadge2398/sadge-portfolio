import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import { handleGoBack } from './Utils/Functions';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
}

const projects: Project[] = [
  {
    title: "BehKhodro",
    description: "Web shop. A massive project with a lot of features that supply the needs of a car shop or personal use. first time i get to experice a project with short deadline and a lot of learning as well as delivery pressure.",
    technologies: ["Nextjs", "TypeScript", "Node.js", "daisyUI", "Zustand"],
    github: "https://github.com/Sadge2398",
    demo: "https://private1.demo.com",
  },
  {
    title: "CyPaaS",
    description: "Cloud Platform as a Service. A project that provides a platform for developers to build, deploy, and scale their applications in the cloud. very big project spent 6 month to develop it for company.",
    technologies: ["Nextjs", "TypeScript", "Node.js", "MUI", "MUI Data Grid"],
    github: "https://github.com/Sadge2398",
    demo: "https://private1.demo.com",
  },

];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 bg-black/35 backdrop-blur-[1px] rounded-lg pb-12 font-bold relative"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleGoBack}
          className="absolute top-2 left-4 flex items-center gap-2 text-gray-300 hover:text-purple-300 transition-colors p-2 rounded-lg bg-black/20 backdrop-blur-sm"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </motion.button>

        <h2 className="mb-12 text-4xl font-bold text-white pt-12">Projects</h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1,  }}
              transition={{ duration: 0.7, delay: index * 0.3 }}
              viewport={{ once: true }}
              className="group rounded-lg bg-black/30 p-6 backdrop-blur-sm transition-all hover:bg-black/40"
            >
              {project.image && (
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <h3 className="mb-2 text-2xl font-semibold text-purple-300">
                {project.title}
              </h3>
              <p className="mb-4 text-gray-300">{project.description}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-purple-500/20 px-3 py-1 text-sm text-purple-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 transition-colors hover:text-purple-300"
                  >
                    <Github size={20} />
                    <span>Code</span>
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 transition-colors hover:text-purple-300"
                  >
                    <ExternalLink size={20} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 