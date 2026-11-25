"use client";

import { motion } from "framer-motion";
import { STACK } from "@/lib/stack";

const stackSections = [
  { title: "Frontend", items: STACK.frontend },
  { title: "Backend", items: STACK.backend },
  { title: "Mobile", items: STACK.mobile },
  { title: "Agentic AI", items: STACK.ai },
] as const;

const experience = [
  { company: "Freelance", role: "Freelance Developer", dates: "2026 – present", description: "Build digital products independently for clients." },
  { company: "First Principle", role: "AI-native startup", dates: "2026", description: "Contributed to product development at an AI-native startup." },
  { company: "Chadco", role: "Full Stack Developer", dates: "Early 2025 – early 2026", description: "Built web applications, connected backend services, and developed data-driven features as part of the product team." },
  { company: "Freelance & internships", role: "Independent development & learning", dates: "2024 – 2025", description: "Expanded into backend APIs, databases, and cross-platform mobile development through client work and personal projects." },
  { company: "Jihaad", role: "Frontend Developer", dates: "2022 – 2024", description: "Built frontend features for real-world projects while learning to deliver to tight deadlines." },
] as const;

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="portfolio-section">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }} className="section-panel">
        <a href="#hero" className="back-link">Back to home</a>
        <p className="eyebrow mt-7">A little about me</p>
        <h2 id="about-title" className="section-title">From interface to infrastructure.</h2>
        <div className="mt-9 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-7">
            <p className="leading-relaxed text-slate-300">
              I&apos;m Sajjad, a full stack developer building web, mobile, and agentic AI applications.
              I started in frontend development in 2022, then expanded into APIs, databases,
              and cross-platform apps. I enjoy connecting those pieces into a complete product.
            </p>
            <div className="agentic-summary">
              <h3 className="font-sans text-base font-semibold text-purple-200">Agentic architecture</h3>
              <p className="mt-3 leading-relaxed text-slate-300">
                I build agent orchestration, tool calling, retrieval-augmented
                generation (RAG), and workflow automation with LangGraph,
                LangChain, model SDKs, and custom code.
              </p>
            </div>
            <div className="space-y-6">
              {stackSections.map(({ title, items }) => (
                <div key={title}>
                  <h3 className="mb-3 font-sans text-sm font-semibold uppercase tracking-widest text-purple-200">{title}</h3>
                  <ul className="flex flex-wrap gap-2">{items.map((tech) => <li key={tech} className="tech-tag">{tech}</li>)}</ul>
                </div>
              ))}
            </div>
            <p className="border-t border-white/10 pt-6 text-sm leading-relaxed text-slate-400">Away from the keyboard: gaming, Formula 1, and time with friends.</p>
          </div>
          <div>
            <h3 className="mb-6 text-xl font-semibold text-purple-200">Experience</h3>
            <ol className="experience-list">
              {experience.map((job) => (
                <li key={job.company}>
                  <p className="text-sm text-slate-400">{job.dates}</p>
                  <h4 className="mt-2 font-sans text-lg font-semibold text-white">{job.company}</h4>
                  <p className="mt-1 text-sm text-purple-200">{job.role}</p>
                  <p className="mt-3 leading-relaxed text-slate-300">{job.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
