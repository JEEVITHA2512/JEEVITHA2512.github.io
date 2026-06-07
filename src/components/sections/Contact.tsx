import { motion } from "framer-motion";
import { EnvelopeSimple, MapPin, ArrowUpRight } from "@phosphor-icons/react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export function Contact({ id }: { id: string }) {
  const socials = [
    { name: "GitHub", href: "https://github.com/jeevithamurugan", icon: <FaGithub className="w-4 h-4" /> },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/jeevitha-murugan-357979223", icon: <FaLinkedin className="w-4 h-4" /> },
    { name: "Email", href: "mailto:jeevithamurugan.2512@gmail.com", icon: <EnvelopeSimple className="w-4 h-4" /> },
  ];

  return (
    <section id={id} className="pt-10 pb-4">
      <div className="w-full space-y-8">

        {/* Section Header — canonical pattern */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-b border-border pb-4"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wider text-foreground">
            Contact
          </h2>
        </motion.div>

        {/* Intro + Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="space-y-4"
        >
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-medium max-w-2xl">
            Got a project in mind, a question about AI, or just want to say hi? I'd love to hear from you.
          </p>
          <a
            href="mailto:jeevithamurugan.2512@gmail.com"
            className="group inline-flex items-center gap-2 text-foreground text-base font-bold border-b-2 border-foreground/20 pb-1 hover:border-foreground transition-colors duration-300"
          >
            jeevithamurugan.2512@gmail.com
            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
          </a>
        </motion.div>

        {/* Location + Social pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-xs font-bold text-muted-foreground uppercase tracking-wider border border-border/60">
            <MapPin className="w-3.5 h-3.5" /> Chennai, India
          </span>
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target={s.name !== "Email" ? "_blank" : undefined}
              rel={s.name !== "Email" ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-xs font-bold text-foreground uppercase tracking-wider border border-border/60 hover:border-primary/40 hover:text-primary transition-all duration-200"
            >
              {s.icon} {s.name}
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
