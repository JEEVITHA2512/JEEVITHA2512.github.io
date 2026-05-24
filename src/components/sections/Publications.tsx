import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight, Lightbulb } from "lucide-react";

export function Publications({ id }: { id: string }) {
  const publications = [
    {
      title: "Data-driven Machine Learning Models for Risk Stratification and Prediction of Emergence Delirium in Pediatric Patients Underwent Tonsillectomy/Adenotonsillectomy",
      type: "Research Paper",
      summary: "Developed machine learning models for clinical risk stratification to predict emergence delirium in pediatric patients post-surgery, applying data-driven approaches to improve patient outcome prediction."
    },
    {
      title: "Payday Loans — Blessing or Growth Suppressor? Machine Learning Analysis",
      type: "Research Paper",
      summary: "Applied machine learning techniques to analyze the financial and socioeconomic impact of payday lending, modeling the relationship between short-term loans and long-term economic growth indicators."
    }
  ];

  const patents = [
    {
      title: "Smart Sprinkler System: Leveraging Machine Learning and IoT for Heat Mapping",
      summary: "Patented IoT-based smart irrigation system using ML algorithms and heat mapping to intelligently control sprinklers, optimizing water usage while ensuring effective coverage."
    },
    {
      title: "Multilingual Audio to Braille Translator System Incorporating AI Transcription and Cloud Computing",
      summary: "Patented assistive technology system converting multilingual audio input to Braille output using AI transcription and cloud infrastructure, enhancing accessibility for visually impaired individuals."
    }
  ];

  return (
    <section id={id} className="py-24">
      <div className="space-y-16 max-w-4xl mx-auto">

        {/* Publications */}
        <div className="space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Publications</h2>
            <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6">
            {publications.map((pub, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6 items-start group"
              >
                <div className="p-4 bg-secondary/10 text-secondary rounded-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8" />
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-secondary transition-colors leading-snug">
                      {pub.title}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-bold whitespace-nowrap shrink-0">
                      {pub.type}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                    {pub.summary}
                  </p>
                  <button className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline text-sm">
                    Read More <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Patents */}
        <div className="space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center justify-center gap-2">
              <Lightbulb className="w-7 h-7 text-primary" /> Patents
            </h2>
          </div>

          <div className="space-y-6">
            {patents.map((patent, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start group"
              >
                <div className="p-4 bg-primary/10 text-primary rounded-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="w-8 h-8" />
                </div>

                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {patent.title}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold whitespace-nowrap shrink-0">
                      Patent
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {patent.summary}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <button className="px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-xl shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-200">
            Read More Articles
          </button>
        </div>
      </div>
    </section>
  );
}
