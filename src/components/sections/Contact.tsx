import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";

export function Contact({ id }: { id: string }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Message sent successfully!");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <section id={id} className="py-24 border-t border-border mt-12">
      <div className="max-w-6xl mx-auto space-y-12">

        <div className="space-y-2 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Get In Touch</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Whether you have a question, a project proposal, or just want to connect — my inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Contact Information</h3>

              <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors">
                <div className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a href="mailto:jeevithamurugan.2512@gmail.com" className="text-foreground font-medium text-sm">
                    jeevithamurugan.2512@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-muted-foreground hover:text-secondary transition-colors">
                <div className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-foreground font-medium">Chennai, Tamil Nadu, India</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-border">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Social Profiles</h4>
              <div className="flex gap-4">
                <a href="https://github.com/jeevithamurugan" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center text-foreground hover:text-primary hover:border-primary shadow-sm hover:-translate-y-1 transition-all">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/jeevitha-murugan-357979223" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center text-foreground hover:text-secondary hover:border-secondary shadow-sm hover:-translate-y-1 transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:jeevithamurugan.2512@gmail.com" className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center text-foreground hover:text-emerald-500 hover:border-emerald-500 shadow-sm hover:-translate-y-1 transition-all">
                  <Mail className="w-5 h-5" />
                </a>
              </div>

              <div className="mt-6 p-4 bg-card border border-border rounded-xl">
                <p className="text-sm font-semibold text-foreground mb-1">AWS Community Builder (AI)</p>
                <p className="text-xs text-muted-foreground">Mentoring 250+ students · Organizing AWS Cloud Clubs & User Groups sessions</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 bg-card p-8 rounded-3xl border border-border shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Your Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 active:translate-y-0 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:transform-none"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
