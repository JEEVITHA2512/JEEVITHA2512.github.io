import { motion } from "framer-motion";
import { GraduationCap, Award, Shield } from "lucide-react";

export function Education({ id }: { id: string }) {
  const education = [
    {
      degree: "Bachelor of Technology - BTech",
      field: "Artificial Intelligence and Data Science",
      institution: "St. Joseph's College Of Engineering",
      date: "November 2021 - May 2025"
    },
    {
      degree: "12th Equivalent Grade",
      field: "Biology, General",
      institution: "St. Johns Sr. Sec. School & Junior College",
      date: "2006 - 2021"
    }
  ];

  const certifications = [
    { name: "AWS Certified AI Practitioner", issuer: "Amazon Web Services" },
    { name: "Microsoft Azure AI Engineer Associate", issuer: "Microsoft" },
    { name: "Microsoft Fabric Analytics Associate", issuer: "Microsoft" },
    { name: "Databricks Certified Data Engineer Associate", issuer: "Databricks" },
    { name: "IBM Data Science Professional Certificate", issuer: "IBM" },
    { name: "Google Cybersecurity Certificate", issuer: "Google" }
  ];

  const awards = [
    "2nd Runner up — Cosmic Innovation Challenge (Microgravity Track)",
    "Winner — UI Path Hack-a-bot",
    "3rd Place — Hack-a-Cloud",
    "Winner — Case Study Competition",
    "SIH Finalist"
  ];

  return (
    <section id={id} className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-16 max-w-5xl mx-auto"
      >
        {/* Education */}
        <div className="space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Education</h2>
            <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-secondary/50 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <GraduationCap className="w-24 h-24 text-secondary" />
                </div>
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-bold mb-4">
                    {edu.date}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-1">{edu.degree}</h3>
                  <p className="text-base font-semibold text-primary mb-2">{edu.field}</p>
                  <p className="text-muted-foreground font-medium">{edu.institution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center justify-center gap-2">
              <Shield className="w-7 h-7 text-secondary" /> Certifications
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-card p-5 rounded-xl border border-border shadow-sm hover:shadow-md hover:border-secondary/40 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center mb-3">
                  <Shield className="w-4 h-4 text-secondary" />
                </div>
                <p className="font-semibold text-foreground text-sm leading-snug mb-1">{cert.name}</p>
                <p className="text-xs text-muted-foreground">{cert.issuer}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center justify-center gap-2">
              <Award className="w-7 h-7 text-primary" /> Honors & Awards
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-card p-5 rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4 text-primary" />
                </div>
                <p className="font-medium text-foreground text-sm leading-snug">{award}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
}
