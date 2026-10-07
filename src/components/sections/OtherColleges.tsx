"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ExternalLink, Info, AlertCircle, Building2, MapPin, Search, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Competitiveness = "STRONG" | "GOOD" | "COMPETITIVE" | "BORDERLINE" | "LOW" | "INDICATIVE ONLY" | "SCORE ACCEPTED";

interface CollegeData {
  id: string;
  instituteName: string;
  programme: string;
  examAccepted: string;
  examYear: string;
  scoreType: "DIRECT SCORE ACCEPTANCE" | "SCORE + INTERVIEW" | "SCORE + ACADEMICS + INTERVIEW" | "SECTION-WEIGHTED";
  minimumScore?: Record<string, number>;
  historicalRange?: Record<string, [number, number]>; 
  competitivenessMethod: "RANGE" | "INDICATIVE" | "ACCEPTED_ONLY";
  sectionalRequirement: boolean;
  academicsRequired: boolean;
  interviewRequired: boolean;
  separateApplication: boolean;
  eligibilityNotes: string;
  officialSource: string;
  sourceUrl: string;
  lastVerified: string;
  active: boolean;
  type: "IIM" | "NON-IIM";
  degree: "IPM" | "BBA" | "INTEGRATED MANAGEMENT";
}

const COLLEGES_DB: CollegeData[] = [
  {
    id: "ranchi",
    instituteName: "IIM Ranchi",
    programme: "IPM",
    examAccepted: "IPMAT Indore",
    examYear: "2026-27",
    scoreType: "SCORE + INTERVIEW",
    historicalRange: {
      "General": [190, 215],
      "EWS": [150, 175],
      "NC-OBC": [140, 165],
      "SC": [95, 120],
      "ST": [60, 85],
      "PwD": [60, 85]
    },
    competitivenessMethod: "RANGE",
    sectionalRequirement: true,
    academicsRequired: true,
    interviewRequired: true,
    separateApplication: true,
    eligibilityNotes: "IIM Ranchi accepts only the IPMAT score conducted by IIM Indore.",
    officialSource: "IIM Ranchi Official Admission Policy",
    sourceUrl: "#",
    lastVerified: "06 Oct 2026",
    active: true,
    type: "IIM",
    degree: "IPM"
  },
  {
    id: "nalsar",
    instituteName: "NALSAR University",
    programme: "Integrated BBA-MBA / IPM",
    examAccepted: "IPMAT Indore",
    examYear: "2026-27",
    scoreType: "SCORE + ACADEMICS + INTERVIEW",
    competitivenessMethod: "INDICATIVE",
    sectionalRequirement: false,
    academicsRequired: true,
    interviewRequired: true,
    separateApplication: true,
    eligibilityNotes: "Entrance score is one component. Other selection criteria apply.",
    officialSource: "NALSAR Official Admission Notification",
    sourceUrl: "#",
    lastVerified: "06 Oct 2026",
    active: true,
    type: "NON-IIM",
    degree: "INTEGRATED MANAGEMENT"
  },
  {
    id: "nirma",
    instituteName: "Nirma University",
    programme: "BBA-MBA Integrated",
    examAccepted: "IPMAT Indore",
    examYear: "2026-27",
    scoreType: "SCORE + ACADEMICS + INTERVIEW",
    competitivenessMethod: "INDICATIVE",
    sectionalRequirement: false,
    academicsRequired: true,
    interviewRequired: true,
    separateApplication: true,
    eligibilityNotes: "IPMAT Score + Personal Interview + Academic performance.",
    officialSource: "Nirma University Admission Page",
    sourceUrl: "#",
    lastVerified: "06 Oct 2026",
    active: true,
    type: "NON-IIM",
    degree: "INTEGRATED MANAGEMENT"
  },
  {
    id: "tapmi",
    instituteName: "TAPMI",
    programme: "IPM / BBA (Hons.)",
    examAccepted: "IPMAT Indore",
    examYear: "2026-27",
    scoreType: "SCORE + INTERVIEW",
    competitivenessMethod: "INDICATIVE",
    sectionalRequirement: false,
    academicsRequired: false,
    interviewRequired: true,
    separateApplication: true,
    eligibilityNotes: "IPMAT Indore accepted. Explicit IPMAT score thresholds exist for scholarships.",
    officialSource: "TAPMI BBA Admission Policy",
    sourceUrl: "#",
    lastVerified: "06 Oct 2026",
    active: true,
    type: "NON-IIM",
    degree: "BBA"
  },
  {
    id: "sirmaur",
    instituteName: "IIM Sirmaur",
    programme: "BMS / IPM",
    examAccepted: "IPMAT Indore",
    examYear: "2026-27",
    scoreType: "SECTION-WEIGHTED",
    competitivenessMethod: "ACCEPTED_ONLY",
    sectionalRequirement: true,
    academicsRequired: false,
    interviewRequired: true,
    separateApplication: true,
    eligibilityNotes: "Final evaluation uses the institute's weighted Aptitude Test Score (ATS) and other components.",
    officialSource: "IIM Sirmaur Admission Policy",
    sourceUrl: "#",
    lastVerified: "06 Oct 2026",
    active: true,
    type: "IIM",
    degree: "IPM"
  },
  {
    id: "amritsar",
    instituteName: "IIM Amritsar",
    programme: "IPM",
    examAccepted: "IPMAT Indore",
    examYear: "2026-27",
    scoreType: "SCORE + INTERVIEW",
    competitivenessMethod: "ACCEPTED_ONLY",
    sectionalRequirement: true,
    academicsRequired: false,
    interviewRequired: true,
    separateApplication: true,
    eligibilityNotes: "IPMAT score used for shortlisting. Personal Interview where applicable.",
    officialSource: "IIM Amritsar Admissions",
    sourceUrl: "#",
    lastVerified: "06 Oct 2026",
    active: true,
    type: "IIM",
    degree: "IPM"
  },
  {
    id: "iift",
    instituteName: "IIFT",
    programme: "Integrated Programme in Management",
    examAccepted: "IPMAT Indore",
    examYear: "2026-27",
    scoreType: "SCORE + ACADEMICS + INTERVIEW",
    competitivenessMethod: "INDICATIVE",
    sectionalRequirement: true,
    academicsRequired: true,
    interviewRequired: true,
    separateApplication: true,
    eligibilityNotes: "Relevant academic and interview requirements apply per official policy.",
    officialSource: "IIFT IPM Admission Info",
    sourceUrl: "#",
    lastVerified: "06 Oct 2026",
    active: true,
    type: "NON-IIM",
    degree: "IPM"
  },
  {
    id: "sambalpur",
    instituteName: "IIM Sambalpur",
    programme: "B.S. in Management & Public Policy",
    examAccepted: "IPMAT Indore",
    examYear: "2026-27",
    scoreType: "SCORE + INTERVIEW",
    competitivenessMethod: "ACCEPTED_ONLY",
    sectionalRequirement: true,
    academicsRequired: false,
    interviewRequired: true,
    separateApplication: true,
    eligibilityNotes: "IPMAT Indore score used for shortlisting. Personal Interview also contributes to final merit.",
    officialSource: "IIM Sambalpur Official Notification",
    sourceUrl: "#",
    lastVerified: "06 Oct 2026",
    active: true,
    type: "IIM",
    degree: "BBA"
  }
];

function getCompetitiveness(college: CollegeData, score: number, category: string): { band: Competitiveness, color: string } {
  if (college.competitivenessMethod === "RANGE") {
    const range = college.historicalRange?.[category];
    if (!range) return { band: "SCORE ACCEPTED", color: "text-[#6b7280]" };
    
    const [min, max] = range;
    if (score >= max + 15) return { band: "STRONG", color: "text-[#199f4a]" };
    if (score >= max) return { band: "GOOD", color: "text-[#199f4a]" };
    if (score >= min) return { band: "COMPETITIVE", color: "text-[#0284c7]" };
    if (score >= min - 15) return { band: "BORDERLINE", color: "text-[#a97a00]" };
    return { band: "LOW", color: "text-[#ef4444]" };
  }
  
  if (college.competitivenessMethod === "INDICATIVE") {
    return { band: "INDICATIVE ONLY", color: "text-[#8b5cf6]" };
  }
  
  return { band: "SCORE ACCEPTED", color: "text-[#6b7280]" };
}

interface OtherCollegesProps {
  score: number;
  category: string;
}

export default function OtherColleges({ score, category }: OtherCollegesProps) {
  const [filterType, setFilterType] = useState<"ALL" | "IIM" | "NON-IIM">("ALL");
  const [filterDegree, setFilterDegree] = useState<"ALL" | "IPM" | "BBA">("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredColleges = useMemo(() => {
    return COLLEGES_DB.filter(c => {
      if (!c.active) return false;
      if (filterType !== "ALL" && c.type !== filterType) return false;
      if (filterDegree === "IPM" && c.degree !== "IPM") return false;
      if (filterDegree === "BBA" && c.degree !== "BBA" && c.degree !== "INTEGRATED MANAGEMENT") return false;
      return true;
    });
  }, [filterType, filterDegree]);

  const bestMatches = useMemo(() => {
    return COLLEGES_DB.filter(c => {
      const comp = getCompetitiveness(c, score, category);
      return comp.band === "STRONG" || comp.band === "GOOD";
    }).slice(0, 3);
  }, [score, category]);

  return (
    <div className="mt-16 pt-16 border-t border-border">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-primary mb-4 tracking-tight">
          Where Else Can Your IPMAT Indore Score Take You?
        </h2>
        <p className="text-[16px] font-medium text-text-secondary">
          Your IPMAT Indore score can also be used by other institutes. See where your score may make you eligible or competitive.
        </p>
      </div>

      {/* Visual Map */}
      <div className="flex flex-col items-center mb-16 relative">
        <div className="text-[12px] font-bold text-text-secondary uppercase tracking-widest mb-2">YOUR SCORE</div>
        <div className="font-display font-extrabold text-[42px] text-primary leading-none bg-surface border border-border px-8 py-4 rounded-[20px] shadow-sm z-10">
          {score}
        </div>
        
        {bestMatches.length > 0 && (
          <>
            <div className="w-px h-8 bg-border"></div>
            <div className="w-full max-w-2xl border-t border-border relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-6 bg-border"></div>
              {bestMatches.map((m, i) => (
                <div key={i} className="absolute top-0 w-px h-6 bg-border" style={{ left: `${(i + 1) * (100 / (bestMatches.length + 1))}%` }}></div>
              ))}
            </div>
            
            <div className="flex justify-between w-full max-w-2xl px-4 mt-6">
              {bestMatches.map((m, i) => {
                const comp = getCompetitiveness(m, score, category);
                return (
                  <div key={i} className="flex flex-col items-center text-center px-2">
                    <div className="font-bold text-primary mb-1">{m.instituteName}</div>
                    <div className={cn("text-[11px] font-extrabold tracking-widest uppercase", comp.color)}>
                      {comp.band}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <div className="bg-surface rounded-full p-1 border border-border inline-flex shadow-sm">
          <button onClick={() => setFilterType("ALL")} className={cn("px-4 py-2 rounded-full text-[13px] font-bold transition-all", filterType === "ALL" ? "bg-primary text-white" : "text-text-secondary hover:text-primary")}>ALL</button>
          <button onClick={() => setFilterType("IIM")} className={cn("px-4 py-2 rounded-full text-[13px] font-bold transition-all", filterType === "IIM" ? "bg-primary text-white" : "text-text-secondary hover:text-primary")}>IIMs</button>
          <button onClick={() => setFilterType("NON-IIM")} className={cn("px-4 py-2 rounded-full text-[13px] font-bold transition-all", filterType === "NON-IIM" ? "bg-primary text-white" : "text-text-secondary hover:text-primary")}>NON-IIMs</button>
        </div>
        <div className="bg-surface rounded-full p-1 border border-border inline-flex shadow-sm">
          <button onClick={() => setFilterDegree("ALL")} className={cn("px-4 py-2 rounded-full text-[13px] font-bold transition-all", filterDegree === "ALL" ? "bg-primary text-white" : "text-text-secondary hover:text-primary")}>ALL TYPES</button>
          <button onClick={() => setFilterDegree("IPM")} className={cn("px-4 py-2 rounded-full text-[13px] font-bold transition-all", filterDegree === "IPM" ? "bg-primary text-white" : "text-text-secondary hover:text-primary")}>IPM</button>
          <button onClick={() => setFilterDegree("BBA")} className={cn("px-4 py-2 rounded-full text-[13px] font-bold transition-all", filterDegree === "BBA" ? "bg-primary text-white" : "text-text-secondary hover:text-primary")}>BBA / INT. MGMT</button>
        </div>
        <div className="bg-surface border border-border rounded-full px-4 py-2 text-[13px] font-bold text-text-secondary flex items-center gap-2 shadow-sm">
          Year: <span className="text-primary">2026-27</span>
        </div>
      </div>

      <div className="text-[12px] font-bold uppercase tracking-widest text-text-secondary mb-4 text-center">Based on your IPMAT Indore score</div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredColleges.map(college => {
          const comp = getCompetitiveness(college, score, category);
          const isExpanded = expandedId === college.id;
          
          return (
            <div key={college.id} className="bg-surface rounded-[24px] border border-border shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 lg:p-8 flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-display font-extrabold text-[22px] text-primary">{college.instituteName}</h3>
                    <p className="text-[14px] font-medium text-text-secondary">{college.programme}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-brand-soft border border-primary/10 flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <div className="mb-6 space-y-3">
                  <div className="flex justify-between items-center bg-background rounded-lg p-3 border border-border">
                    <span className="text-[13px] font-bold text-text-secondary uppercase tracking-wider">Prediction</span>
                    <span className={cn("font-extrabold text-[14px]", comp.color)}>{comp.band}</span>
                  </div>
                  
                  {college.competitivenessMethod === "RANGE" && college.historicalRange?.[category] && (
                    <div className="flex justify-between items-center px-2">
                      <span className="text-[13px] text-text-secondary">Historical Range</span>
                      <span className="font-bold text-primary">{college.historicalRange[category][0]} - {college.historicalRange[category][1]}</span>
                    </div>
                  )}
                  {college.competitivenessMethod !== "RANGE" && (
                    <div className="text-[12px] text-text-secondary italic px-2">
                      Score accepted; competitiveness cannot be reliably estimated from score alone.
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-6">
                  <div className="text-[12px] font-bold uppercase tracking-widest text-text-secondary mb-2">Admission Process</div>
                  <div className="flex items-center gap-2 text-[13px] font-medium text-text-primary">
                    <CheckCircle2 className="w-4 h-4 text-[#199f4a]" /> IPMAT Indore Score Accepted
                  </div>
                  <div className="flex items-start gap-2 text-[13px] font-medium text-text-secondary leading-snug">
                    <Info className="w-4 h-4 shrink-0 mt-0.5 text-primary opacity-60" /> 
                    {college.eligibilityNotes}
                  </div>
                </div>

                {college.separateApplication && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fef2f2] border border-[#fecaca] text-[11px] font-bold text-[#ef4444] uppercase tracking-wider mb-2">
                    <AlertCircle className="w-3.5 h-3.5" /> Separate Application Required
                  </div>
                )}
              </div>

              {/* Expandable Details */}
              <div className="border-t border-border bg-background">
                <button 
                  onClick={() => setExpandedId(isExpanded ? null : college.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-[13px] font-bold text-primary hover:bg-surface-hover transition-colors"
                >
                  {isExpanded ? "Hide Details" : "View Admission Details"}
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-2 space-y-4 text-[13px]">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-text-secondary mb-1">Interview Required</div>
                            <div className="font-bold text-primary">{college.interviewRequired ? "Yes" : "No"}</div>
                          </div>
                          <div>
                            <div className="text-text-secondary mb-1">Academics Considered</div>
                            <div className="font-bold text-primary">{college.academicsRequired ? "Yes" : "No"}</div>
                          </div>
                          <div>
                            <div className="text-text-secondary mb-1">Sectional Cutoffs</div>
                            <div className="font-bold text-primary">{college.sectionalRequirement ? "Yes" : "No"}</div>
                          </div>
                          <div>
                            <div className="text-text-secondary mb-1">Score Type</div>
                            <div className="font-bold text-primary">{college.scoreType}</div>
                          </div>
                        </div>
                        
                        <div className="border-t border-border pt-4 mt-4 space-y-2">
                          <div className="flex justify-between items-center text-[12px]">
                            <span className="text-text-secondary">Source Verified:</span>
                            <span className="font-bold">{college.lastVerified}</span>
                          </div>
                          <a href={college.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border text-primary hover:border-primary/30 transition-colors group">
                            <span className="font-bold">Official Admission Page</span>
                            <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
