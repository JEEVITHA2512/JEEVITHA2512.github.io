import { motion } from "framer-motion";
import { FolderGit2, Github, ExternalLink } from "lucide-react";

export function Projects({ id }: { id: string }) {
  const projects = [
    {
      title: "Multi-Agent Code Migration Pipeline",
      description: "Autonomous multi-agent system using CrewAI for code migration and refactoring tasks, with inter-agent memory sharing, task delegation, and OpenLit observability integration.",
      tech: ["CrewAI", "Python", "Agentic AI", "OpenLit", "LangChain"],
      github: "#"
    },
    {
      title: "Fabric Analytics Sales Dashboard",
      description: "Full-stack analytics pipeline using Microsoft Fabric Analytics with Dataflows transformation logic and Power BI dashboards, reducing manual analysis cycles by 60%.",
      tech: ["Microsoft Fabric", "Power BI", "Dataflows", "Azure", "KQL"],
      github: "#"
    },
    {
      title: "Audio Denoising Deep Learning Models",
      description: "CNN, Bi-LSTM, and AutoEncoder architectures for audio denoising using TensorFlow and PyTorch. Benchmarked on clean-noisy pair datasets to improve Signal-to-Noise Ratio (SNR).",
      tech: ["TensorFlow", "PyTorch", "torchaudio", "Librosa", "Deep Learning"],
      github: "#"
    },
    {
      title: "Domain-Specific NLU Chatbot",
      description: "Custom NLU pipelines for domain-specific chatbots using Rasa and SpaCy, with enhanced intent classification, entity synonym mapping, and fallback logic.",
      tech: ["Rasa", "SpaCy", "NLP", "Flask", "Python"],
      github: "#"
    },
    {
      title: "Smart Sprinkler System (Patent)",
      description: "IoT-based sprinkler system leveraging machine learning and heat mapping for precision irrigation, minimizing water waste through intelligent sensor-driven automation.",
      tech: ["Machine Learning", "IoT", "Python", "Embedded Systems"],
      github: "#"
    },
    {
      title: "Multilingual Audio to Braille Translator (Patent)",
      description: "AI-powered system incorporating multilingual audio transcription and cloud computing to convert spoken language into Braille, enabling accessibility for visually impaired users.",
      tech: ["Speech-to-Text", "NLP", "Cloud Computing", "AI", "Python"],
      github: "#"
    }
  ];

  return (
    <section id={id} className="py-24">
      <div className="space-y-12">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Projects</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-card flex flex-col rounded-2xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                  <FolderGit2 className="w-6 h-6" />
                </div>
                <div className="flex gap-2">
                  <a href={project.github} className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground flex-grow mb-6 text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                {project.tech.map(tech => (
                  <span key={tech} className="text-xs font-mono text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-200">
            All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
