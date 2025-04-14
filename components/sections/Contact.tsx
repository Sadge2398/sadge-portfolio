import { motion } from 'framer-motion';
import { ArrowLeft, Github, Mail, Send } from 'lucide-react';
import { handleGoBack } from './Utils/Functions';

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen py-20">
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

        <h2 className="mb-12 text-4xl font-bold text-white pt-12">Contact Me</h2>

        <div className="space-y-6 text-gray-300 font-bold text-xl">
          <p>Feel free to reach out to me through any of the following channels:</p>
          <div className="flex flex-col gap-4">
            <a
              href="mailto:sajjadshz14@gmail.com"
              className="flex items-center gap-2 text-gray-300 hover:text-purple-300 transition-colors"
            >
              <Mail size={20} />
              <span>Email: sajjadshz14@gmail.com</span>
            </a>
            <a
              href="https://t.me/Sadge_CC"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-purple-300 transition-colors"
            >
              <Send size={20} />
              <span>Telegram: Sajjad mahmoodi</span>
            </a>
            <a
              href="https://github.com/Sadge2398"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-purple-300 transition-colors"
            >
              <Github size={20} />
              <span>GitHub: github.com/Sadge</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 