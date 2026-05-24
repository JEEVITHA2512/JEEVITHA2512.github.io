import { motion } from "framer-motion";
import { Briefcase, ChevronRight } from "lucide-react";

export function Experience({ id }: { id: string }) {
  const experiences = [
    {
      role: "Generative AI & Data Science Engineer",
      company: "BigTapp Analytics",
      date: "June 2025 - Present",
      duration: "10 months",
      location: "Chennai, Tamil Nadu, India",
      highlights: [
        "Building production-grade GenAI and data science solutions",
        "Designing scalable, cloud-native AI systems for enterprise clients",
        "Working at the intersection of LLMs, data engineering, and MLOps"
      ],
      skills: ["GenAI", "Python", "LangChain", "AWS", "Data Science"]
    },
    {
      role: "Software Engineer Intern",
      company: "Blackstraw",
      date: "September 2024 - June 2025",
      duration: "10 months",
      location: "Chennai, Tamil Nadu, India",
      highlights: [
        "Built autonomous multi-agent pipelines using CrewAI for code migration and refactoring tasks, with inter-agent memory sharing and OpenLit observability",
        "Designed a full-stack analytics pipeline using Microsoft Fabric Analytics with Dataflows and Power BI dashboards, reducing manual analysis by 60%",
        "Used KQL to analyze Azure Bot Framework telemetry logs, identifying drop-off points and latency issues to optimize bot flows"
      ],
      skills: ["CrewAI", "Agentic AI", "Microsoft Fabric", "Power BI", "KQL", "Azure"]
    },
    {
      role: "Intern - Data Scientist",
      company: "Lifease Solutions LLP",
      date: "July 2023 - October 2023",
      duration: "4 months",
      location: "Noida, Uttar Pradesh, India",
      highlights: [
        "Processed raw audio using Librosa, pydub, and PyAudio with Mel-spectrogram, STFT, and MFCC feature extraction pipelines",
        "Developed CNN, Bi-LSTM, and AutoEncoder architectures in TensorFlow and PyTorch for audio denoising, improving SNR metrics",
        "Integrated Audo AI's APIs for production-grade noise suppression and explored TTS/STT pipelines with pyttsx3",
        "Built PyQt GUI tools for visualizing spectrograms and toggling preprocessing methods"
      ],
      skills: ["Python", "TensorFlow", "PyTorch", "Librosa", "torchaudio", "PyQt", "Deep Learning"]
    },
    {
      role: "Developer Intern",
      company: "Tactii (formerly TalentAccurate)",
      date: "January 2022 - October 2022",
      duration: "10 months",
      location: "Toronto, Ontario, Canada",
      highlights: [
        "Built custom NLU pipelines for domain-specific chatbots using Rasa and SpaCy with enhanced intent classification and fallback logic",
        "Deployed ML models into user-facing applications with Flask APIs and Streamlit dashboards including an explainable sentiment analysis tool",
        "Designed schema models for chatbot session logging and inference monitoring using ClickHouse for high-throughput analytical queries"
      ],
      skills: ["Rasa", "SpaCy", "Flask", "Streamlit", "ClickHouse", "NLP", "Python"]
    }
  ];

  return (
    <section id={id} className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-12 max-w-4xl mx-auto"
      >
        <div className="space-y-2 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Work Experience</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="relative border-l-2 border-primary/20 ml-4 md:ml-6 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              <div className="absolute -left-[17px] top-1 w-8 h-8 bg-card border-4 border-primary rounded-full flex items-center justify-center shadow-md">
                <Briefcase className="w-3 h-3 text-primary hidden sm:block" />
              </div>

              <div className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{exp.role}</h3>
                    <p className="text-lg font-medium text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{exp.location}</p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold whitespace-nowrap">
                      {exp.date}
                    </span>
                    <span className="text-xs text-muted-foreground">{exp.duration}</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {exp.highlights.map((point, i) => (
                    <li key={i} className="flex gap-2 text-muted-foreground leading-relaxed text-sm">
                      <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-muted rounded-lg text-xs font-medium text-foreground">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
