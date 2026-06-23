import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { portfolioData } from "@/data/portfolioData";
import { ArrowSquareOut, CaretDown, CaretUp } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { resolveAssetPath } from "@/lib/utils";

type CertificationData = {
  id: number;
  name: string;
  issuer: string;
  credentialId: string | null;
  credentialUrl: string | null;
  date: string | null;
  logoUrl?: string | null;
};

function IssuerLogo({ issuer, name, logoUrl }: { issuer: string; name: string; logoUrl?: string | null }) {
  const [error, setError] = useState(false);

  const getLogoUrl = () => {
    if (logoUrl) return resolveAssetPath(logoUrl);

    const lowerIssuer = issuer.toLowerCase();
    const lowerName = name.toLowerCase();

    // Check for specific sub-brands
    if (lowerName.includes("fabric")) {
      return resolveAssetPath("/icons/microsoftfabric.png");
    }
    if (lowerName.includes("azure")) {
      return resolveAssetPath("/icons/microsoftazure.svg");
    }
    if (lowerIssuer.includes("amazon") || lowerIssuer.includes("aws")) {
      return resolveAssetPath("/icons/amazonwebservices.svg");
    }
    if (lowerIssuer.includes("microsoft")) {
      return resolveAssetPath("/icons/microsoft.png");
    }
    if (lowerIssuer.includes("databricks")) {
      return resolveAssetPath("/icons/databricks.svg");
    }
    if (lowerIssuer.includes("oracle")) {
      return resolveAssetPath("/icons/oracle.svg");
    }
    if (lowerIssuer.includes("ibm")) {
      return resolveAssetPath("/icons/ibm.png");
    }
    if (lowerIssuer.includes("google") || lowerName.includes("google")) {
      return resolveAssetPath("/icons/google.svg");
    }
    if (lowerIssuer.includes("coursera")) {
      return resolveAssetPath("/icons/coursera.svg");
    }
    if (lowerIssuer.includes("cast ai")) {
      return resolveAssetPath("/icons/cast-ai.png");
    }
    if (lowerIssuer.includes("dataiku")) {
      return resolveAssetPath("/icons/dataiku.png");
    }
    if (lowerIssuer.includes("cambridge")) {
      return resolveAssetPath("/icons/cambridge.png");
    }
    if (lowerIssuer.includes("iso")) {
      return resolveAssetPath("/icons/iso.png");
    }
    
    return null;
  };

  const logoUrlStr = getLogoUrl();
  const initial = issuer.charAt(0).toUpperCase();

  if (error || !logoUrlStr) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-foreground/5 rounded-xl border border-border/30">
        <span className="text-[15px] font-extrabold text-foreground/50">{initial}</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-white dark:bg-zinc-900 rounded-xl p-1.5 border border-border/30 group-hover:border-primary/30 transition-all duration-300">
      <img
        src={logoUrlStr}
        alt={`${issuer} logo`}
        className="max-w-full max-h-full object-contain filter dark:brightness-95"
        onError={() => setError(true)}
      />
    </div>
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const getBrandColor = (issuer: string, name: string) => {
  const lowerIssuer = issuer.toLowerCase();
  const lowerName = name.toLowerCase();

  if (lowerName.includes("fabric")) return "#0089D6"; // Azure / Fabric Blue
  if (lowerName.includes("azure")) return "#0089D6";
  if (lowerIssuer.includes("amazon") || lowerIssuer.includes("aws")) return "#FF9900"; // AWS Orange
  if (lowerIssuer.includes("microsoft")) return "#0089D6";
  if (lowerIssuer.includes("databricks")) return "#FF3621"; // Databricks Red
  if (lowerIssuer.includes("oracle")) return "#F80000";
  if (lowerIssuer.includes("ibm")) return "#052FAD";
  if (lowerIssuer.includes("google") || lowerName.includes("google")) return "#4285F4";
  if (lowerIssuer.includes("coursera")) return "#0056D2";
  if (lowerIssuer.includes("cast ai")) return "#00E3A5";
  if (lowerIssuer.includes("dataiku")) return "#FFC000";
  if (lowerIssuer.includes("cambridge")) return "#A3D235";
  if (lowerIssuer.includes("iso")) return "#00508F";
  if (lowerIssuer.includes("red team leaders")) return "#EF4444";
  
  return "#3B82F6"; // default blue
};

export function Certifications({ id }: { id: string }) {
  const { data: certifications = [], isLoading } = useQuery<CertificationData[]>({
    queryKey: ["certifications"],
    queryFn: () => portfolioData.certifications
  });

  const [showAll, setShowAll] = useState(false);

  const displayedCerts = showAll ? certifications : certifications.slice(0, 6);

  return (
    <section id={id} className="pt-10 pb-4">
      <div className="w-full space-y-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-b border-border pb-4"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wider text-foreground">
            Certifications
          </h2>
        </motion.div>

        {/* Card Grid */}
        {isLoading ? (
          <div className="py-12 text-center text-muted-foreground font-semibold">Loading certifications...</div>
        ) : (
          <div className="space-y-6">
            <motion.div 
              layout
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 26
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
            >
              <AnimatePresence mode="popLayout">
                {displayedCerts.map((cert, index) => {
                  const brandColor = getBrandColor(cert.issuer, cert.name);
                  const brandGlow = hexToRgba(brandColor, 0.05);
                  const brandBorder = hexToRgba(brandColor, 0.4);
                  const brandShadow = hexToRgba(brandColor, 0.15);
                  return (
                    <motion.div
                      layout
                      key={cert.id || index}
                      initial={{ opacity: 0, scale: 0.9, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 15 }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 26,
                        mass: 0.8
                      }}
                      whileHover={{
                        y: -5,
                      }}
                      style={{
                        "--brand-glow": brandGlow,
                        "--brand-border": brandBorder,
                        "--brand-shadow": brandShadow,
                      } as React.CSSProperties}
                      className="brand-glass-card group relative flex flex-col p-4 rounded-2xl backdrop-blur-md justify-between min-h-[135px]"
                    >
                      <div className="flex gap-3.5 items-start">
                        <div className="w-10 h-10 shrink-0">
                          <IssuerLogo issuer={cert.issuer} name={cert.name} logoUrl={cert.logoUrl} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-foreground text-[14px] leading-snug line-clamp-2 mb-0.5" title={cert.name}>
                            {cert.name}
                          </h3>
                          <p className="text-[11px] text-muted-foreground font-semibold truncate" title={cert.issuer}>
                            {cert.issuer}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border/40 mt-3 text-[11px] font-semibold">
                        <span className="text-muted-foreground/60 font-mono truncate max-w-[60%]">
                          {cert.credentialId || cert.date || "Active"}
                        </span>
                        {cert.credentialUrl ? (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                          >
                            Verify
                            <ArrowSquareOut className="w-3.5 h-3.5" weight="bold" />
                          </a>
                        ) : (
                          <span className="text-muted-foreground/40">Certified</span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {certifications.length > 6 && (
              <div className="flex justify-center pt-2">
                <Button
                  onClick={() => setShowAll(!showAll)}
                  variant="outline"
                  className="rounded-full px-6 py-2 border-border/60 hover:bg-primary/5 hover:border-primary/40 font-bold text-[10px] md:text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2"
                >
                  {showAll ? (
                    <>
                      Show Less
                      <CaretUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Show All Certifications ({certifications.length})
                      <CaretDown className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
