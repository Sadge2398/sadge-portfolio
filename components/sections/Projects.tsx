"use client";

import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { Globe, LockKeyhole, Mail } from "lucide-react";
import fusionPreview from "@/public/projects/ffusion.jpg";
import carwashPreview from "@/public/projects/carwash-khodro10.jpg";

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  website?: string;
  preview?: StaticImageData;
  previewAlt?: string;
}

const projects: Project[] = [
  {
    title: "Fusion Food",
    category: "Food ordering",
    description: "Online food ordering with a browsable menu, customizable items, and order tracking.",
    tags: ["Ordering", "Menu options", "Order tracking"],
    website: "https://ffusion.ir/",
    preview: fusionPreview,
    previewAlt: "Fusion Food homepage with its Persian menu and food photography",
  },
  {
    title: "Carwash Khodro 10",
    category: "Customer loyalty",
    description: "A carwash customer club with referral invitations, visit-based rewards, and member discounts.",
    tags: ["Loyalty", "Referrals", "Rewards"],
    website: "https://carwashkhodro10.ir/",
    preview: carwashPreview,
    previewAlt: "Carwash Khodro 10 customer club showing its referral rewards and invitation feature",
  },
  {
    title: "BehKhodro",
    category: "Automotive e-commerce",
    description: "An automotive web shop for car shops and individual customers, built under a tight delivery deadline.",
    tags: ["Next.js", "TypeScript", "Node.js", "Zustand"],
  },
  {
    title: "CyPaaS",
    category: "Cloud platform",
    description: "A cloud platform for building, deploying, and scaling applications, developed over a six-month company project.",
    tags: ["Next.js", "TypeScript", "Node.js", "MUI"],
  },
];

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="portfolio-section">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="section-panel"
      >
        <a href="#hero" className="back-link">Back to home</a>
        <p className="eyebrow mt-7">Selected work</p>
        <h2 id="projects-title" className="section-title">Projects</h2>
        <p className="section-intro">A few examples from my work, from local business websites to cloud platforms.</p>
        <div className="mt-9 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="project-card project-card-compact">
              {project.preview && (
                <a href={project.website} target="_blank" rel="noopener noreferrer" aria-label={`Preview ${project.title} website`} className="project-preview-link">
                  <Image
                    src={project.preview}
                    alt={project.previewAlt ?? project.title}
                    className="project-preview"
                    sizes="(max-width: 767px) 100vw, 520px"
                  />
                </a>
              )}
              <div className="project-card-content">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-purple-200">{project.category}</p>
                  {!project.website && <span className="private-badge"><LockKeyhole size={13} aria-hidden="true" /> Private project</span>}
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-white">{project.title}</h3>
                <p className="mt-4 leading-relaxed text-slate-300">{project.description}</p>
                <ul aria-label={`${project.title} highlights`} className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => <li key={tag} className="tech-tag">{tag}</li>)}
                </ul>
                <div className="mt-auto border-t border-white/10 pt-4">
                  {project.website ? (
                    <a href={project.website} target="_blank" rel="noopener noreferrer" className="project-link" aria-label={`Visit ${project.title} website`}>
                      <Globe size={17} aria-hidden="true" /> Visit website
                    </a>
                  ) : (
                    <a href={`mailto:sajjadshz14@gmail.com?subject=${encodeURIComponent(`Let's talk about ${project.title}`)}`} className="project-link" aria-label={`Ask about ${project.title}`}>
                      <Mail size={17} aria-hidden="true" /> Ask about this project
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
