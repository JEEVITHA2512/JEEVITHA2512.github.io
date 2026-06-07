import { useState } from "react";
import { motion } from "framer-motion";
import { Medal, Trophy } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { portfolioData } from "@/data/portfolioData";
import BorderGlow from "@/components/ui/BorderGlow";

type EducationData = {
  id: number;
  degree: string;
  field: string;
  institution: string;
  institutionType: string | null;
  date: string;
  description: string | null;
};

type AwardData = {
  id: number;
  name: string;
  issuer: string | null;
  year: string | null;
};

export function Education({ id }: { id: string }) {
  const { data: education = [] } = useQuery<EducationData[]>({
    queryKey: ["education"],
    queryFn: () => portfolioData.education
  });

  const { data: awards = [] } = useQuery<AwardData[]>({
    queryKey: ["awards"],
    queryFn: () => portfolioData.awards
  });

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id={id} className="pt-10 pb-4">
      <div className="w-full space-y-16">
        
        {/* Education Subsection */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-border pb-4"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wider text-foreground">
              Education
            </h2>
          </motion.div>

          <div className="divide-y divide-border/60">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(edu.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setHoveredId(hoveredId === edu.id ? null : edu.id)}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-10 first:pt-4 last:pb-4 items-start cursor-pointer transition-all duration-300 hover:bg-foreground/[0.02] dark:hover:bg-white/[0.02] px-4 -mx-4 rounded-2xl group"
              >
                {/* Column 1: Institution & Dates (col-span-3) */}
                <div className="lg:col-span-3 space-y-2">
                  <h3 className="text-2xl font-extrabold text-foreground leading-none group-hover:text-primary transition-colors">
                    {edu.institution}
                  </h3>
                  <p className="text-sm font-semibold text-muted-foreground mt-1">
                    {edu.institutionType || "Higher Education"}
                  </p>
                  <p className="text-sm font-bold text-primary tracking-wide pt-2 uppercase">
                    {edu.date}
                  </p>
                </div>

                {/* Column 2: Details Table (col-span-3) */}
                <div className="lg:col-span-3">
                  <table className="w-full text-xs font-semibold text-muted-foreground">
                    <tbody>
                      <tr className="border-b border-border/40 py-2.5 flex justify-between gap-4 items-center">
                        <td className="text-muted-foreground/60 uppercase tracking-wider shrink-0">Degree</td>
                        <td className="text-foreground text-right break-words flex-1 pl-4">{edu.degree}</td>
                      </tr>
                      <tr className="border-b border-border/40 py-2.5 flex justify-between gap-4 items-center">
                        <td className="text-muted-foreground/60 uppercase tracking-wider shrink-0">Field</td>
                        <td className="text-foreground text-right break-words flex-1 pl-4">{edu.field}</td>
                      </tr>
                      <tr className="border-b border-border/40 py-2.5 flex justify-between gap-4 items-center">
                        <td className="text-muted-foreground/60 uppercase tracking-wider shrink-0">Timeline</td>
                        <td className="text-foreground text-right break-words flex-1 pl-4">{edu.date}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Column 3: Description (col-span-6) */}
                <div className="lg:col-span-6 space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed font-medium">
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: hoveredId === edu.id ? "auto" : 0,
                      opacity: hoveredId === edu.id ? 1 : 0
                    }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden space-y-3"
                  >
                    {edu.description ? (
                      edu.description.split("\n").filter(Boolean).map((para, i) => (
                        <p key={i} className="text-xs md:text-sm text-muted-foreground font-medium">{para}</p>
                      ))
                    ) : (
                      <p className="text-xs md:text-sm text-muted-foreground font-medium">Studied {edu.field} at {edu.institution}.</p>
                    )}
                  </motion.div>

                  {/* Interactivity Indicator */}
                  <div className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground/45 group-hover:text-primary transition-colors duration-300 pt-1">
                    {hoveredId === edu.id ? "Click/Leave to collapse" : "Hover / Tap to view details"}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Awards Subsection — Redesigned */}
        {awards.length > 0 && (
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-border pb-4"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wider text-foreground">
              Honors & Awards
            </h2>
          </motion.div>

          {/* Featured / Hero Award (first one) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <BorderGlow 
              className="w-full tactile-shadow tactile-hover" 
              borderRadius={32} 
              backgroundColor="hsl(var(--card))" 
              colors={['#ca8a04', '#eab308', '#facc15']}
              glowColor="40 80 60"
              glowIntensity={0.6}
              fillOpacity={0.2}
              permanent={true}
            >
              <div className="p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row gap-6 items-start md:items-center group z-10 h-full w-full">
                <div className="p-2 bg-yellow-500/5 dark:bg-yellow-500/10 rounded-2xl shrink-0 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                  <svg viewBox="0 0 32 32" className="w-12 h-12 select-none filter drop-shadow-[0_4px_8px_rgba(234,179,8,0.25)]">
                    <g fill="none">
                      <g fillRule="evenodd" clipRule="evenodd" filter="url(#i6MhQAc)">
                        <path fill="#FFD340" d="M24.555 6.834c-.9-.25-1.835.27-2.094 1.175a.866.866 0 1 1-1.666-.478a3.435 3.435 0 0 1 4.213-2.369c.034.008.102.025.164.046c2.493.831 2.691 4.214.455 5.45l-4.97 2.75a.866.866 0 1 1-.839-1.516l4.97-2.75c.982-.543.823-1.956-.159-2.288l-.006-.002z"/>
                        <path fill="url(#i4JsYZm)" d="M24.555 6.834c-.9-.25-1.835.27-2.094 1.175a.866.866 0 1 1-1.666-.478a3.435 3.435 0 0 1 4.213-2.369c.034.008.102.025.164.046c2.493.831 2.691 4.214.455 5.45l-4.97 2.75a.866.866 0 1 1-.839-1.516l4.97-2.75c.982-.543.823-1.956-.159-2.288l-.006-.002z"/>
                        <path fill="url(#i5HuPuc)" d="M24.555 6.834c-.9-.25-1.835.27-2.094 1.175a.866.866 0 1 1-1.666-.478a3.435 3.435 0 0 1 4.213-2.369c.034.008.102.025.164.046c2.493.831 2.691 4.214.455 5.45l-4.97 2.75a.866.866 0 1 1-.839-1.516l4.97-2.75c.982-.543.823-1.956-.159-2.288l-.006-.002z"/>
                      </g>
                      <g fillRule="evenodd" clipRule="evenodd" filter="url(#i79zqYm)">
                        <path fill="#EAA73A" d="M6.307 5.162a3.435 3.435 0 0 1 4.214 2.37a.866.866 0 0 1-1.666.477A1.7 1.7 0 0 0 6.738 6.84l-.046.011l-.006.002c-.982.332-1.141 1.745-.159 2.288l4.97 2.75a.866.866 0 1 1-.839 1.516l-4.97-2.75c-2.235-1.236-2.037-4.619.456-5.45c.061-.02.13-.038.163-.046"/>
                        <path fill="url(#iBD70Yb)" d="M6.307 5.162a3.435 3.435 0 0 1 4.214 2.37a.866.866 0 0 1-1.666.477A1.7 1.7 0 0 0 6.738 6.84l-.046.011l-.006.002c-.982.332-1.141 1.745-.159 2.288l4.97 2.75a.866.866 0 1 1-.839 1.516l-4.97-2.75c-2.235-1.236-2.037-4.619.456-5.45c.061-.02.13-.038.163-.046"/>
                      </g>
                      <g filter="url(#ih749xb)">
                        <path fill="url(#iZcSWvb)" d="M17.328 17.52V13.3h-3.34v4.22c0 .74-.33 1.45-.9 1.92l-1.92 1.6h8.98l-1.92-1.6a2.51 2.51 0 0 1-.9-1.92"/>
                        <path fill="url(#iYF5Znc)" d="M17.328 17.52V13.3h-3.34v4.22c0 .74-.33 1.45-.9 1.92l-1.92 1.6h8.98l-1.92-1.6a2.51 2.51 0 0 1-.9-1.92"/>
                      </g>
                      <path fill="url(#iavgjLE)" d="M17.328 17.52V13.3h-3.34v4.22c0 .74-.33 1.45-.9 1.92l-1.92 1.6h8.98l-1.92-1.6a2.51 2.51 0 0 1-.9-1.92"/>
                      <path fill="#EA873A" d="M15.658 16.55a6.97 6.97 0 0 1-6.97-6.97V2.72c0-.39.32-.71.71-.71h12.53c.39 0 .71.32.71.71v6.86c0 3.85-3.12 6.97-6.98 6.97"/>
                      <path fill="url(#i3HhHpb)" d="M15.658 16.55a6.97 6.97 0 0 1-6.97-6.97V2.72c0-.39.32-.71.71-.71h12.53c.39 0 .71.32.71.71v6.86c0 3.85-3.12 6.97-6.98 6.97"/>
                      <path fill="url(#iORLNeP)" d="M15.658 16.55a6.97 6.97 0 0 1-6.97-6.97V2.72c0-.39.32-.71.71-.71h12.53c.39 0 .71.32.71.71v6.86c0 3.85-3.12 6.97-6.98 6.97"/>
                      <path fill="url(#iI6p1zd)" d="M15.658 16.55a6.97 6.97 0 0 1-6.97-6.97V2.72c0-.39.32-.71.71-.71h12.53c.39 0 .71.32.71.71v6.86c0 3.85-3.12 6.97-6.98 6.97"/>
                      <g filter="url(#izrAsac)">
                        <path fill="url(#i5OXhQc)" d="M22.578 21.04H8.738c-.73 0-1.35.51-1.49 1.22l-1.53 7.09c-.07.33.18.64.52.64h18.85c.34 0 .59-.31.52-.64l-1.53-7.09c-.15-.71-.77-1.22-1.5-1.22"/>
                        <path fill="url(#ioWc2ze)" d="M22.578 21.04H8.738c-.73 0-1.35.51-1.49 1.22l-1.53 7.09c-.07.33.18.64.52.64h18.85c.34 0 .59-.31.52-.64l-1.53-7.09c-.15-.71-.77-1.22-1.5-1.22"/>
                        <path fill="url(#iCV124f)" d="M22.578 21.04H8.738c-.73 0-1.35.51-1.49 1.22l-1.53 7.09c-.07.33.18.64.52.64h18.85c.34 0 .59-.31.52-.64l-1.53-7.09c-.15-.71-.77-1.22-1.5-1.22"/>
                      </g>
                      <g filter="url(#iwe6PFv)">
                        <path fill="#914556" d="M18.402 23.884h-6.02c-.35 0-.64.28-.64.64v1.81c0 .35.28.64.64.64h6.02c.35 0 .64-.28.64-.64v-1.81c0-.35-.28-.64-.64-.64"/>
                      </g>
                      <g filter="url(#itVN37b)">
                        <path fill="url(#iDoPF3d)" d="M18.668 23.7h-6.02c-.35 0-.64.28-.64.64v1.81c0 .35.28.64.64.64h6.02c.35 0 .64-.28.64-.64v-1.81c0-.35-.28-.64-.64-.64"/>
                      </g>
                      <defs>
                        <linearGradient id="i4JsYZm" x1="22.236" x2="25.868" y1="11.944" y2="8.668" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FEC551"/>
                          <stop offset="1" stopColor="#FEC551" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="iBD70Yb" x1="9.565" x2="7.078" y1="7.957" y2="7.247" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D27840"/>
                          <stop offset="1" stopColor="#D27840" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="iZcSWvb" x1="16.953" x2="11.891" y1="19.76" y2="19.76" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FBC33A"/>
                          <stop offset="1" stopColor="#DB7B3C"/>
                        </linearGradient>
                        <linearGradient id="i5OXhQc" x1="5.706" x2="25.616" y1="25.512" y2="25.512" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#9D5B6C"/>
                          <stop offset="1" stopColor="#955569"/>
                        </linearGradient>
                        <linearGradient id="ioWc2ze" x1="15.663" x2="15.663" y1="30.379" y2="28.753" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#8C3A79"/>
                          <stop offset="1" stopColor="#8C3A79" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="iCV124f" x1="24.87" x2="23.932" y1="26.532" y2="26.751" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#B0817C"/>
                          <stop offset="1" stopColor="#B0817C" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="iDoPF3d" x1="19.682" x2="12.008" y1="25.245" y2="25.245" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFE767"/>
                          <stop offset="1" stopColor="#FEBB5B"/>
                        </linearGradient>
                        <radialGradient id="i5HuPuc" cx="0" cy="0" r="1" gradientTransform="matrix(4.69737 -1.85526 1.70898 4.327 22.276 8.905)" gradientUnits="userSpaceOnUse">
                          <stop offset=".727" stopColor="#FFEC6A" stopOpacity="0"/>
                          <stop offset="1" stopColor="#FFEC6A"/>
                        </radialGradient>
                        <radialGradient id="iYF5Znc" cx="0" cy="0" r="1" gradientTransform="matrix(0 2.09 -1.90625 0 17.235 17.17)" gradientUnits="userSpaceOnUse">
                          <stop offset=".193" stopColor="#FFE469"/>
                          <stop offset="1" stopColor="#FFE469" stopOpacity="0"/>
                        </radialGradient>
                        <radialGradient id="iavgjLE" cx="0" cy="0" r="1" gradientTransform="rotate(149.162 6.89 12.85)scale(2.27493 3.45405)" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFD34D"/>
                          <stop offset="1" stopColor="#FFD34D" stopOpacity="0"/>
                        </radialGradient>
                        <radialGradient id="i3HhHpb" cx="0" cy="0" r="1" gradientTransform="matrix(1.36288 12.34872 -7.92943 .87514 18.203 3.135)" gradientUnits="userSpaceOnUse">
                          <stop offset=".121" stopColor="#FFFA73"/>
                          <stop offset="1" stopColor="#FFFA73" stopOpacity="0"/>
                        </radialGradient>
                        <radialGradient id="iORLNeP" cx="0" cy="0" r="1" gradientTransform="matrix(0 .70434 -7.87152 0 18.284 2.01)" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFF45B"/>
                          <stop offset="1" stopColor="#FFF45B" stopOpacity="0"/>
                        </radialGradient>
                        <radialGradient id="iI6p1zd" cx="0" cy="0" r="1" gradientTransform="matrix(-6.87504 11.18747 -10.73354 -6.59609 19.016 4.76)" gradientUnits="userSpaceOnUse">
                          <stop offset=".787" stopColor="#C55D73" stopOpacity="0"/>
                          <stop offset="1" stopColor="#C55D73"/>
                        </radialGradient>
                        <filter id="i6MhQAc" width="7.81" height="8.729" x="19.371" y="4.788" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                          <feOffset dy="-.25"/>
                          <feGaussianBlur stdDeviation=".25"/>
                          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/>
                          <feColorMatrix values="0 0 0 0 0.937255 0 0 0 0 0.576471 0 0 0 0 0.247059 0 0 0 1 0"/>
                          <feBlend in2="shape" result="effect1_innerShadow_18_1422"/>
                        </filter>
                        <filter id="i79zqYm" width="7.81" height="8.729" x="4.134" y="4.788" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                          <feOffset dy="-.25"/>
                          <feGaussianBlur stdDeviation=".25"/>
                          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/>
                          <feColorMatrix values="0 0 0 0 0.854902 0 0 0 0 0.458824 0 0 0 0 0.286275 0 0 0 1 0"/>
                          <feBlend in2="shape" result="effect1_innerShadow_18_1422"/>
                        </filter>
                        <filter id="ih749xb" width="9.48" height="7.99" x="11.168" y="13.3" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                          <feOffset dx=".5" dy=".25"/>
                          <feGaussianBlur stdDeviation=".25"/>
                          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/>
                          <feColorMatrix values="0 0 0 0 0.843137 0 0 0 0 0.462745 0 0 0 0 0.215686 0 0 0 1 0"/>
                          <feBlend in2="shape" result="effect1_innerShadow_18_1422"/>
                        </filter>
                        <filter id="izrAsac" width="20.564" height="9.6" x="5.706" y="21.04" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                          <feOffset dx=".65" dy=".65"/>
                          <feGaussianBlur stdDeviation=".375"/>
                          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/>
                          <feColorMatrix values="0 0 0 0 0.509804 0 0 0 0 0.270588 0 0 0 0 0.270588 0 0 0 1 0"/>
                          <feBlend in2="shape" result="effect1_innerShadow_18_1422"/>
                        </filter>
                        <filter id="iwe6PFv" width="8.1" height="3.89" x="11.342" y="23.484" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                          <feGaussianBlur result="effect1_foregroundBlur_18_1422" stdDeviation=".2"/>
                        </filter>
                        <filter id="itVN37b" width="7.55" height="3.34" x="12.008" y="23.45" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                          <feOffset dx=".25" dy="-.25"/>
                          <feGaussianBlur stdDeviation=".2"/>
                          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/>
                          <feColorMatrix values="0 0 0 0 0.941176 0 0 0 0 0.533333 0 0 0 0 0.333333 0 0 0 1 0"/>
                          <feBlend in2="shape" result="effect1_innerShadow_18_1422"/>
                        </filter>
                      </defs>
                    </g>
                  </svg>
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                    {awards[0].year && (
                      <span className="px-2.5 py-1 bg-muted text-muted-foreground rounded-lg text-[11px] font-bold tracking-wider uppercase">
                        {awards[0].year}
                      </span>
                    )}
                    <span className="px-2.5 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-lg text-[11px] font-bold tracking-wider uppercase">
                      Featured Award
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-foreground group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors leading-snug mb-1">
                    {awards[0].name}
                  </h3>
                  {awards[0].issuer && (
                    <p className="text-muted-foreground font-semibold text-sm">
                      {awards[0].issuer}
                    </p>
                  )}
                </div>
              </div>
            </BorderGlow>
          </motion.div>

          {/* Remaining Awards — Compact list */}
          {awards.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {awards.slice(1).map((award, index) => (
                <motion.div
                  key={award.id || index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -15 : 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="group flex items-center gap-4 p-5 rounded-2xl border border-border/60 bg-card hover:bg-muted/50 hover:border-primary/40 transition-all duration-300"
                >
                  {/* Numbered accent */}
                  <div className="w-10 h-10 rounded-xl bg-foreground/5 group-hover:bg-primary/10 flex items-center justify-center shrink-0 transition-colors duration-300">
                    <span className="text-sm font-extrabold text-foreground/40 group-hover:text-primary transition-colors duration-300">
                      {String(index + 2).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground text-[14px] leading-snug">
                      {award.name}
                    </p>
                    {(award.issuer || award.year) && (
                      <p className="text-xs text-muted-foreground mt-1 font-medium">
                        {[award.issuer, award.year].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>

                  {/* Year badge */}
                  {award.year && (
                    <span className="px-2.5 py-1 bg-muted text-foreground/50 rounded-lg text-[11px] font-bold tracking-wider shrink-0 hidden sm:block">
                      {award.year}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
        )}

      </div>
    </section>
  );
}
