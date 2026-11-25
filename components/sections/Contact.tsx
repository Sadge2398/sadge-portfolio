"use client";

import { motion } from "framer-motion";
import { Github, Mail, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="portfolio-section contact-section">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }} className="section-panel">
        <a href="#hero" className="back-link">Back to home</a>
        <p className="eyebrow mt-7">Let&apos;s connect</p>
        <h2 id="contact-title" className="section-title">Have something in mind?</h2>
        <p className="section-intro">Want to talk about a project, a role, or something I&apos;ve built? Send me a message.</p>
        <div className="mt-9 grid gap-4 lg:grid-cols-3">
          <a href="mailto:sajjadshz14@gmail.com" className="contact-card">
            <Mail size={22} aria-hidden="true" />
            <span><span className="contact-label">Email me</span><span className="contact-value">sajjadshz14@gmail.com</span></span>
          </a>
          <a href="https://t.me/Sadge_CC" target="_blank" rel="noopener noreferrer" className="contact-card">
            <Send size={22} aria-hidden="true" />
            <span><span className="contact-label">Chat on Telegram</span><span className="contact-value">@Sadge_CC</span></span>
          </a>
          <a href="https://github.com/Sadge2398" target="_blank" rel="noopener noreferrer" className="contact-card">
            <Github size={22} aria-hidden="true" />
            <span><span className="contact-label">Explore my GitHub</span><span className="contact-value">Sadge2398</span></span>
          </a>
        </div>
        <p className="mt-10 border-t border-white/10 pt-5 text-sm text-slate-400">Sajjad Mahmoodi · Full Stack &amp; AI Developer</p>
      </motion.div>
    </section>
  );
}
