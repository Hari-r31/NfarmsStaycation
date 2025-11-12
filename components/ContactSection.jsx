'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Leaf } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just simulate success
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact"
      className="relative py-24 bg-gradient-to-br from-green-900 via-green-800 to-green-600 text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[url('/noise-texture.png')] opacity-5"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-3 mb-3">
            <Leaf className="w-6 h-6 text-green-300" />
            <span className="uppercase tracking-widest text-green-200 text-sm font-semibold">
              Get In Touch
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-3">
            Let’s Plan Your Stay at <span className="text-green-300">N Farms</span>
          </h2>
          <p className="text-green-100 max-w-2xl mx-auto text-base sm:text-lg">
            Have questions, want to make a reservation, or plan a private event?
            We’re here to help you craft your perfect getaway.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="bg-green-700/30 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                <MapPin className="w-6 h-6 text-green-300" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1">Location</h4>
                <p className="text-green-100 text-sm leading-relaxed">
                  17E/1, Nazeeb Nagar Village, Moinabad,
                  Telangana – 501504, India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-700/30 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                <Phone className="w-6 h-6 text-green-300" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1">Phone</h4>
                <a
                  href="tel:+919393935050"
                  className="text-green-100 hover:text-white text-sm transition-colors"
                >
                  +91 93939 35050
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-700/30 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                <Mail className="w-6 h-6 text-green-300" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1">Email</h4>
                <a
                  href="mailto:contact@nfarms.in"
                  className="text-green-100 hover:text-white text-sm transition-colors"
                >
                  contact@nfarms.in
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-xl"
          >
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

            <div className="space-y-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full bg-white/10 text-white placeholder-green-200 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your Email"
                className="w-full bg-white/10 text-white placeholder-green-200 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Your Message..."
                className="w-full bg-white/10 text-white placeholder-green-200 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all w-full sm:w-auto"
              >
                <Send className="w-5 h-5" /> {submitted ? 'Sent!' : 'Send Message'}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
