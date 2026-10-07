// src/lib/prediction.ts

export type ExamType = "IPMAT Indore" | "IPMAT Rohtak" | "JIPMAT";
export type CategoryType = "General" | "EWS" | "NC-OBC" | "SC" | "ST" | "PwD";
export type GenderType = "Male" | "Female" | "Other";
export type PredictionBand = "VERY STRONG" | "STRONG" | "GOOD" | "BORDERLINE" | "CHALLENGING" | "DATA UNAVAILABLE" | "NOT ELIGIBLE";

export interface SectionConfig {
  id: string;
  label: string;
  max: number;
  min: number;
}

export interface ExamConfig {
  name: ExamType;
  institute: string;
  description: string;
  year: number;
  sections: SectionConfig[];
  hasSectionalCutoffs: boolean;
  notes?: string;
  source: string;
  lastVerified: string;
  maxOverall: number;
  evaluateInstitutes?: string[];
}

export const EXAM_CONFIG: Record<ExamType, ExamConfig> = {
  "IPMAT Indore": {
    name: "IPMAT Indore",
    institute: "IIM Indore",
    description: "3 Sections • Sectional Cutoffs Apply",
    year: 2026,
    sections: [
      { id: "qaMcq", label: "QA - MCQ", max: 120, min: -30 },
      { id: "qaSa", label: "QA - Short Answer", max: 60, min: 0 },
      { id: "va", label: "Verbal Ability", max: 180, min: -45 },
    ],
    hasSectionalCutoffs: true,
    maxOverall: 360,
    source: "IIM Indore Official RTI & Policy 2026",
    lastVerified: "Oct 2026",
    evaluateInstitutes: ["IIM Indore"]
  },
  "IPMAT Rohtak": {
    name: "IPMAT Rohtak",
    institute: "IIM Rohtak",
    description: "Overall Score • No Sectional Cutoffs",
    year: 2026,
    sections: [
      { id: "overall", label: "Overall Score", max: 472, min: -118 }, // 118 questions * -1 if all wrong, 472 max
    ],
    hasSectionalCutoffs: false,
    maxOverall: 472,
    notes: "IPMAT Rohtak currently does not use a sectional cut-off for the aptitude test. Two questions were declared null in recent pattern making evaluation out of 472.",
    source: "IIM Rohtak Admission Policy & Final Result",
    lastVerified: "Oct 2026",
    evaluateInstitutes: ["IIM Rohtak"]
  },
  "JIPMAT": {
    name: "JIPMAT",
    institute: "NTA (Jammu & Bodh Gaya)",
    description: "3 Sections • Dual Institute Evaluation",
    year: 2026,
    sections: [
      { id: "qa", label: "Quantitative Aptitude", max: 132, min: -33 },
      { id: "dilr", label: "Data Interpretation & Logical Reasoning", max: 132, min: -33 },
      { id: "va", label: "Verbal Ability", max: 136, min: -34 },
    ],
    hasSectionalCutoffs: true,
    maxOverall: 400,
    source: "JIPMAT NTA Bulletin & Institute Policies",
    lastVerified: "Oct 2026",
    evaluateInstitutes: ["IIM Jammu", "IIM Bodh Gaya"]
  }
};

export const HISTORICAL_DATA: Record<string, any> = {
  "IIM Indore": {
    "General": { qaMcq: 39, qaSa: 12, va: 125, range: [180, 205], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
    "EWS": { qaMcq: 27, qaSa: 8, va: 98, range: [140, 165], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
    "NC-OBC": { qaMcq: 25, qaSa: 8, va: 90, range: [130, 155], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
    "SC": { qaMcq: 15, qaSa: 4, va: 60, range: [85, 110], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
    "ST": { qaMcq: 8, qaSa: 4, va: 40, range: [55, 75], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
    "PwD": { qaMcq: 8, qaSa: 4, va: 40, range: [55, 75], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
  },
  "IIM Rohtak": {
    "General": { range: [405, 435], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
    "EWS": { range: [380, 410], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
    "NC-OBC": { range: [370, 400], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
    "SC": { range: [300, 330], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
    "ST": { range: [220, 260], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
    "PwD": { range: [220, 260], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
  },
  "IIM Jammu": {
    "General": { qa: 45, dilr: 45, va: 45, range: [345, 365], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
    "EWS": { qa: 40, dilr: 40, va: 40, range: [325, 345], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
    "NC-OBC": { qa: 40, dilr: 40, va: 40, range: [320, 340], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
    "SC": { qa: 35, dilr: 35, va: 35, range: [260, 290], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
    "ST": { qa: 30, dilr: 30, va: 30, range: [210, 240], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
    "PwD": { qa: 30, dilr: 30, va: 30, range: [190, 220], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
  },
  "IIM Bodh Gaya": {
    "General": { qa: 45, dilr: 45, va: 45, range: [340, 360], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
    "EWS": { qa: 40, dilr: 40, va: 40, range: [320, 340], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
    "NC-OBC": { qa: 40, dilr: 40, va: 40, range: [315, 335], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
    "SC": { qa: 35, dilr: 35, va: 35, range: [250, 280], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
    "ST": { qa: 30, dilr: 30, va: 30, range: [200, 230], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
    "PwD": { qa: 30, dilr: 30, va: 30, range: [180, 210], sourceUrl: "official_rti_2026", dataVersion: "2026.1" },
  }
};

export function validateScores(scores: Record<string, string>, config: ExamConfig): { valid: boolean; error: string | null } {
  for (const sec of config.sections) {
    const val = scores[sec.id];
    if (val === undefined || val === null || val.trim() === "") {
      return { valid: false, error: "Please enter valid scores for all sections before proceeding." };
    }
    const num = Number(val);
    if (isNaN(num)) {
      return { valid: false, error: `${sec.label} score must be a number.` };
    }
    if (!Number.isInteger(num)) {
      return { valid: false, error: `${sec.label} score cannot be a decimal.` };
    }
    if (num > sec.max) {
      return { valid: false, error: `${sec.label} cannot exceed ${sec.max} marks.` };
    }
    if (num < sec.min) {
      return { valid: false, error: `${sec.label} cannot be less than ${sec.min} marks.` };
    }
  }
  return { valid: true, error: null };
}

export function checkSectionalEligibility(institute: string, category: CategoryType, scores: Record<string, string>, config: ExamConfig) {
  if (!config.hasSectionalCutoffs) return { passed: true, weakest: null, strongest: null, diffs: {} };
  
  // Safe fail-closed
  if (!HISTORICAL_DATA[institute] || !HISTORICAL_DATA[institute][category]) {
    return { passed: false, weakest: null, strongest: null, diffs: {} };
  }

  const data = HISTORICAL_DATA[institute][category];
  let passed = true;
  let weakest = { id: "", diff: Infinity };
  let strongest = { id: "", diff: -Infinity };
  const diffs: Record<string, number> = {};

  config.sections.forEach(sec => {
    if (sec.id === "overall") return;
    const score = Number(scores[sec.id] || "0");
    const cutoff = data[sec.id];
    
    // Fail closed if cutoff is not defined for a section but section exists
    if (cutoff === undefined) {
      passed = false;
      return;
    }
    
    const diff = score - cutoff;
    diffs[sec.id] = diff;

    // Fail if strictly less than cutoff. A score of 0 is NOT positive if cutoff is > 0.
    if (diff < 0) passed = false;
    
    if (diff < weakest.diff) weakest = { id: sec.label, diff };
    if (diff > strongest.diff) strongest = { id: sec.label, diff };
  });

  return { passed, weakest: weakest.id, strongest: strongest.id, diffs };
}

export function getPredictionBand(institute: string, category: CategoryType, overall: number, config: ExamConfig, sectionalPassed: boolean): { band: PredictionBand, color: string, gap: number } {
  // Safe fail-closed if data doesn't exist
  if (!HISTORICAL_DATA[institute] || !HISTORICAL_DATA[institute][category] || !HISTORICAL_DATA[institute][category].range) {
    return { band: "DATA UNAVAILABLE", color: "text-text-secondary", gap: 0 };
  }

  const data = HISTORICAL_DATA[institute][category];
  const [min, max] = data.range;

  // IMPORTANT: FAIL-CLOSED on Sectionals.
  if (config.hasSectionalCutoffs && !sectionalPassed) {
    return { band: "NOT ELIGIBLE", color: "text-[#ef4444]", gap: overall - min };
  }
  
  if (overall >= max + 15) return { band: "VERY STRONG", color: "text-[#199f4a]", gap: overall - max };
  if (overall >= max) return { band: "STRONG", color: "text-[#199f4a]", gap: overall - max };
  if (overall >= min) return { band: "GOOD", color: "text-[#199f4a]", gap: overall - min };
  if (overall >= min - 15) return { band: "BORDERLINE", color: "text-[#a97a00]", gap: overall - min };
  return { band: "CHALLENGING", color: "text-[#ef4444]", gap: overall - min };
}

export function calculateOverallScore(scores: Record<string, string>, config: ExamConfig): number {
  if (config.name === "IPMAT Rohtak") return Number(scores.overall || "0");
  let total = 0;
  config.sections.forEach(sec => {
    total += Number(scores[sec.id] || "0");
  });
  return total;
}
