import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";

export function About({ id }: { id: string }) {
  const techSkills = [
    "Python", "TensorFlow", "PyTorch", "LangChain", "Rasa",
    "MLflow", "Azure", "AWS", "Hugging Face", "Agentic AI",
    "Apache Spark", "CrewAI", "FastAPI", "Streamlit"
  ];

  return (
    <section id={id} className="pt-32 pb-16 min-h-screen flex items-center">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-medium text-foreground">Hi, I'm</h2>
              <h1 className="text-5xl md:text-7xl font-extrabold text-primary tracking-tight">
                Jeevitha Murugan
              </h1>
              <p className="text-xl md:text-2xl font-medium text-muted-foreground">
                Generative AI & Data Science Engineer
              </p>
            </div>

            <p className="text-lg text-foreground max-w-2xl leading-relaxed">
              Engineering the Future with Generative AI & Data | AWS Community Builder (AI) | GenAI Engineer @ BigTapp
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="bg-card p-5 rounded-2xl border border-border shadow-sm">
                <h3 className="text-3xl font-bold text-foreground">2+</h3>
                <p className="text-sm text-muted-foreground font-medium mt-1">Years Experience</p>
              </div>
              <div className="bg-card p-5 rounded-2xl border border-border shadow-sm">
                <h3 className="text-3xl font-bold text-foreground">450+</h3>
                <p className="text-sm text-muted-foreground font-medium mt-1">Students Mentored</p>
              </div>
            </div>

            <div className="bg-card border border-border shadow-lg rounded-3xl p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground">About Me</h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-semibold">
                  <Sparkles className="w-3 h-3" />
                  Ask AI anything
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                I'm a Generative AI & Data Science Engineer passionate about solving real-world problems through GenAI, speech technologies, and cloud-native systems. With 2 years of full-time internship experience and a strong academic foundation in BTech in AI & DS, my focus is on building scalable, production-grade solutions that create impact. I actively contribute to the community as an AWS Community Builder (AI Engineering), mentoring 250+ students and organizing technical sessions with AWS Cloud Clubs & AWS User Groups.
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Key Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {techSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-muted text-foreground text-sm rounded-lg font-medium border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between text-muted-foreground">
                <div className="flex gap-2">
                  <button className="p-2 rounded-full hover:bg-muted transition-colors"><ArrowLeft className="w-4 h-4" /></button>
                  <button className="p-2 rounded-full hover:bg-muted transition-colors"><ArrowRight className="w-4 h-4" /></button>
                </div>
                <span className="text-xs font-medium uppercase tracking-widest">About</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/3 flex flex-col items-center gap-8"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-400 via-red-400 to-orange-400 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-tr from-pink-400 via-red-400 to-orange-400 shadow-2xl">
                <div className="w-full h-full rounded-full border-4 border-background bg-gradient-to-br from-violet-400 via-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-7xl font-extrabold text-white select-none">JM</span>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-lg text-muted-foreground font-medium">
                Driven by <span className="italic text-primary">curiosity</span>, empowered by <span className="italic text-orange-500">resilience</span>.
              </p>

              <div className="flex items-center justify-center gap-4">
                <a href="https://github.com/jeevithamurugan" target="_blank" rel="noopener noreferrer" className="p-3 bg-card border border-border rounded-xl text-foreground hover:text-primary hover:border-primary hover:-translate-y-1 transition-all duration-200 shadow-sm hover:shadow-md">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/jeevitha-murugan-357979223" target="_blank" rel="noopener noreferrer" className="p-3 bg-card border border-border rounded-xl text-foreground hover:text-secondary hover:border-secondary hover:-translate-y-1 transition-all duration-200 shadow-sm hover:shadow-md">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:jeevithamurugan.2512@gmail.com" className="p-3 bg-card border border-border rounded-xl text-foreground hover:text-emerald-500 hover:border-emerald-500 hover:-translate-y-1 transition-all duration-200 shadow-sm hover:shadow-md">
                  <Mail className="w-6 h-6" />
                </a>
              </div>

              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {["AWS Community Builder (AI)", "Chennai, India"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full border border-border/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
