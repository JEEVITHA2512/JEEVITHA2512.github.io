import { motion } from "framer-motion";
import { resolveAssetPath } from "@/lib/utils";

interface StackPanelProps {
  skills: string[];
}

const SKILL_META: Record<string, { icon: React.ReactNode; color: string }> = {
  "python": {
    color: "#3776AB",
    icon: (
      <img
        src={resolveAssetPath("/icons/python.svg")}
        className="w-5 h-5 object-contain"
        alt="Python Logo"
      />
    )
  },
  "tensorflow": {
    color: "#FF6F00",
    icon: (
      <img
        src={resolveAssetPath("/icons/tensorflow.svg")}
        className="w-5 h-5 object-contain"
        alt="TensorFlow Logo"
      />
    )
  },
  "pytorch": {
    color: "#EE4C2C",
    icon: (
      <img
        src={resolveAssetPath("/icons/pytorch.svg")}
        className="w-5 h-5 object-contain"
        alt="PyTorch Logo"
      />
    )
  },
  "langchain": {
    color: "#13997C",
    icon: (
      <img
        src={resolveAssetPath("/icons/langchain.svg")}
        className="w-5 h-5 object-contain"
        alt="LangChain Logo"
      />
    )
  },
  "rasa": {
    color: "#5A17EE",
    icon: (
      <img
        src={resolveAssetPath("/icons/rasa.svg")}
        className="w-5 h-5 object-contain"
        alt="Rasa Logo"
      />
    )
  },
  "mlflow": {
    color: "#0194E2",
    icon: (
      <img
        src={resolveAssetPath("/icons/mlflow.svg")}
        className="w-5 h-5 object-contain"
        alt="MLflow Logo"
      />
    )
  },
  "azure": {
    color: "#0089D6",
    icon: (
      <img
        src={resolveAssetPath("/icons/microsoftazure.svg")}
        className="w-5 h-5 object-contain"
        alt="Azure Logo"
      />
    )
  },
  "aws": {
    color: "#FF9900",
    icon: (
      <img
        src={resolveAssetPath("/icons/amazonwebservices.svg")}
        className="w-5 h-5 object-contain dark:invert"
        alt="AWS Logo"
      />
    )
  },
  "hugging face": {
    color: "#FFD21E",
    icon: (
      <img
        src={resolveAssetPath("/icons/huggingface.svg")}
        className="w-5 h-5 object-contain"
        alt="Hugging Face Logo"
      />
    )
  },
  "agentic ai": {
    color: "#00C896",
    icon: (
      <svg
        className="w-5 h-5 text-[#00C896]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeOpacity="0.2"/>
        <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.15"/>
        <circle cx="12" cy="5" r="2" fill="currentColor" />
        <circle cx="5" cy="12" r="2" fill="currentColor" />
        <circle cx="19" cy="12" r="2" fill="currentColor" />
        <circle cx="12" cy="19" r="2" fill="currentColor" />
        <path d="M12 7v2M7 12h2M15 12h2M12 15v2"/>
      </svg>
    )
  },
  "apache spark": {
    color: "#E25A1C",
    icon: (
      <img
        src={resolveAssetPath("/icons/apachespark.svg")}
        className="w-5 h-5 object-contain"
        alt="Apache Spark Logo"
      />
    )
  },
  "crewai": {
    color: "#FF6B6B",
    icon: (
      <svg
        className="w-5 h-5 text-[#FF6B6B]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" fill="currentColor" fillOpacity="0.1" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M9 15h6M12 12v3" strokeWidth="1.5" />
      </svg>
    )
  },
  "fastapi": {
    color: "#059669",
    icon: (
      <img
        src={resolveAssetPath("/icons/fastapi.svg")}
        className="w-5 h-5 object-contain"
        alt="FastAPI Logo"
      />
    )
  },
  "streamlit": {
    color: "#FF4B4B",
    icon: (
      <img
        src={resolveAssetPath("/icons/streamlit.svg")}
        className="w-5 h-5 object-contain"
        alt="Streamlit Logo"
      />
    )
  },
  "clickhouse": {
    color: "#F8D000",
    icon: (
      <img
        src={resolveAssetPath("/icons/clickhouse.svg")}
        className="w-5 h-5 object-contain"
        alt="ClickHouse Logo"
      />
    )
  },
  "sql": {
    color: "#336791",
    icon: (
      <svg
        className="w-5 h-5 text-[#336791]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
      </svg>
    )
  },
  "elasticsearch": {
    color: "#00BFB3",
    icon: (
      <img
        src={resolveAssetPath("/icons/elasticsearch.svg")}
        className="w-5 h-5 object-contain"
        alt="Elasticsearch Logo"
      />
    )
  },
  "opentelemetry": {
    color: "#F5A623",
    icon: (
      <img
        src={resolveAssetPath("/icons/opentelemetry.svg")}
        className="w-5 h-5 object-contain dark:invert"
        alt="OpenTelemetry Logo"
      />
    )
  },
};

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function StackPanel({ skills }: StackPanelProps) {
  return (
    <section className="py-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-none">
          Tech Stack
        </h2>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => {
            const meta = SKILL_META[skill.toLowerCase()];
            const hasIcon = !!meta;
            const brandColor = meta?.color || "#A1A1AA";
            const brandGlow = hexToRgba(brandColor, 0.08);
            const brandBorder = hexToRgba(brandColor, 0.4);
            const brandShadow = hexToRgba(brandColor, 0.25);

            // Render initials if no icon is mapped
            const renderFallbackIcon = () => {
              const initials = skill
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
              return (
                <span className="w-5 h-5 flex items-center justify-center text-[10px] font-extrabold bg-foreground/10 text-foreground/80 rounded-md shrink-0 select-none">
                  {initials}
                </span>
              );
            };

            return (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  opacity: { duration: 0.4, delay: index * 0.02 },
                  y: { type: "spring", stiffness: 100, damping: 15, delay: index * 0.02 },
                }}
                whileHover={{
                  y: -4,
                }}
                style={{
                  "--brand-glow": brandGlow,
                  "--brand-border": brandBorder,
                  "--brand-shadow": brandShadow,
                } as React.CSSProperties}
                className="brand-glass-card inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-semibold text-foreground backdrop-blur-md cursor-default"
              >
                <span className="flex items-center shrink-0">
                  {hasIcon ? meta.icon : renderFallbackIcon()}
                </span>
                {skill}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

