"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Target, BarChart3, ChevronRight, CheckCircle2, AlertCircle, Info, ExternalLink, ArrowRight, ShieldCheck, Activity, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface DetailedAnalysisProps {
  onClose: () => void;
  institute: string;
  category: string;
  gender: string;
  scores: Record<string, string>;
  overall: number;
  maxOverall: number;
  prediction: { band: string; color: string; gap: number };
  sectAnalysis: { passed: boolean; weakest: string | null; strongest: string | null; diffs: Record<string, number> };
  config: any; // Exam config
  historicalData: any; // The HISTORICAL_DATA for this institute
}

export default function DetailedAnalysis({
  onClose,
  institute,
  category,
  gender,
  scores,
  overall,
  maxOverall,
  prediction,
  sectAnalysis,
  config,
  historicalData
}: DetailedAnalysisProps) {
  const [simulatedScores, setSimulatedScores] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    config.sections.forEach((s: any) => {
      init[s.id] = parseInt(scores[s.id] || "0");
    });
    return init;
  });

  const catData = historicalData[category];
  const overallPercentage = ((overall / maxOverall) * 100).toFixed(1);

  // Helper to calculate simulation overall
  const simOverall = Object.values(simulatedScores).reduce((a, b) => a + b, 0);
  const simGap = simOverall - catData.range[0];

  const getSectionPerformance = (score: number, max: number) => {
    const pct = (score / max) * 100;
    if (pct >= 70) return { label: "VERY STRONG", color: "text-[#199f4a]" };
    if (pct >= 50) return { label: "STRONG", color: "text-[#199f4a]" };
    if (pct >= 35) return { label: "AVERAGE", color: "text-[#0284c7]" };
    return { label: "NEEDS ATTENTION", color: "text-[#ef4444]" };
  };

  const strongestSec = sectAnalysis.strongest ? config.sections.find((s: any) => s.label === sectAnalysis.strongest) : null;
  const weakestSec = sectAnalysis.weakest ? config.sections.find((s: any) => s.label === sectAnalysis.weakest) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 lg:p-8 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-5xl bg-[#f8fafc] rounded-[32px] shadow-2xl relative flex flex-col my-auto max-h-full overflow-hidden"
      >
        {/* HEADER FIXED */}
        <div className="sticky top-0 z-10 bg-white border-b border-border px-6 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h2 className="text-[20px] font-display font-extrabold text-primary flex items-center gap-2">
              <Activity className="w-5 h-5" /> {config.name} Detailed Analysis
            </h2>
            <p className="text-[13px] text-text-secondary font-medium hidden sm:block">Here's how your score compares, where you stand, and what you can improve.</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-surface-hover flex items-center justify-center text-text-secondary hover:text-primary transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-12">
          
          {/* PROFILE COMPACT HEADER */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-[16px] border border-border shadow-sm">
              <div className="text-[11px] font-bold text-text-secondary uppercase tracking-widest mb-1">Category</div>
              <div className="font-bold text-primary">{category}</div>
            </div>
            <div className="bg-white p-4 rounded-[16px] border border-border shadow-sm">
              <div className="text-[11px] font-bold text-text-secondary uppercase tracking-widest mb-1">Gender</div>
              <div className="font-bold text-primary">{gender}</div>
            </div>
            <div className="bg-white p-4 rounded-[16px] border border-border shadow-sm">
              <div className="text-[11px] font-bold text-text-secondary uppercase tracking-widest mb-1">Overall Score</div>
              <div className="font-bold text-primary">{overall} <span className="text-text-secondary/50">/ {maxOverall}</span></div>
            </div>
            <div className="bg-white p-4 rounded-[16px] border border-border shadow-sm">
              <div className="text-[11px] font-bold text-text-secondary uppercase tracking-widest mb-1">Prediction</div>
              <div className={cn("font-extrabold", prediction.color)}>{prediction.band}</div>
            </div>
          </div>

          {/* SCORE OVERVIEW */}
          <section className="bg-white rounded-[24px] border border-border p-8 shadow-sm flex flex-col md:flex-row items-center gap-12">
            <div className="shrink-0 relative w-48 h-48 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-border" strokeWidth="8" />
                <motion.circle 
                  cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-primary" strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 1000" }}
                  animate={{ strokeDasharray: `${(overall / maxOverall) * 283} 1000` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="text-center">
                <div className="text-[12px] font-bold text-text-secondary uppercase tracking-widest mb-1">Your Score</div>
                <div className="text-4xl font-display font-extrabold text-primary">{overall}</div>
                <div className="text-[13px] font-bold text-text-secondary">out of {maxOverall}</div>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-display font-extrabold text-primary mb-2">Score percentage: {overallPercentage}%</h3>
              <p className="text-[15px] text-text-secondary font-medium max-w-md mx-auto md:mx-0">
                This represents {overallPercentage}% of the maximum possible marks. <br/>
                <span className="text-[13px] opacity-70 italic">Note: Score percentage is not the same as percentile.</span>
              </p>
            </div>
          </section>

          {/* SECTION-WISE & STRONGEST/WEAKEST */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-[24px] border border-border p-8 shadow-sm">
              <h3 className="text-[18px] font-display font-extrabold text-primary mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" /> Section-wise Performance
              </h3>
              <div className="space-y-6">
                {config.sections.map((sec: any) => {
                  const s = parseInt(scores[sec.id] || "0");
                  const p = getSectionPerformance(s, sec.max);
                  const wPct = (s / sec.max) * 100;
                  return (
                    <div key={sec.id}>
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <div className="font-bold text-primary">{sec.label}</div>
                          <div className={cn("text-[11px] font-bold uppercase tracking-wider", p.color)}>{p.label}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary">{s} <span className="text-text-secondary/50 text-[13px]">/ {sec.max}</span></div>
                          <div className="text-[12px] font-medium text-text-secondary">{wPct.toFixed(1)}%</div>
                        </div>
                      </div>
                      <div className="h-3 w-full bg-surface rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-primary rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${wPct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              {strongestSec && (
                <div className="bg-white rounded-[24px] border border-[#199f4a]/30 p-6 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#199f4a]/5 rounded-bl-full" />
                  <div className="text-[11px] font-bold text-[#199f4a] uppercase tracking-widest mb-1">Your Strongest</div>
                  <div className="text-[18px] font-display font-extrabold text-primary mb-2">{strongestSec.label}</div>
                  <p className="text-[13px] text-text-secondary font-medium">Your strongest-performing section based on cutoff distance.</p>
                </div>
              )}
              {weakestSec && (
                <div className="bg-white rounded-[24px] border border-[#ef4444]/30 p-6 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#ef4444]/5 rounded-bl-full" />
                  <div className="text-[11px] font-bold text-[#ef4444] uppercase tracking-widest mb-1">Your Weakest</div>
                  <div className="text-[18px] font-display font-extrabold text-primary mb-2">{weakestSec.label}</div>
                  <p className="text-[13px] text-text-secondary font-medium">This section currently has the most room for improvement.</p>
                </div>
              )}
            </div>
          </section>

          {/* CUTOFFS & COMPETITIVE RANGE */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {config.hasSectionalCutoffs && (
              <div className="bg-white rounded-[24px] border border-border p-8 shadow-sm">
                <h3 className="text-[18px] font-display font-extrabold text-primary mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Sectional Cutoff Check
                </h3>
                <div className="space-y-4">
                  {config.sections.map((sec: any) => {
                    const score = parseInt(scores[sec.id] || "0");
                    const cutoff = catData[sec.id] || 0;
                    const diff = score - cutoff;
                    const passed = diff >= 0;
                    return (
                      <div key={sec.id} className="flex items-center justify-between p-4 rounded-[16px] bg-surface border border-border">
                        <div>
                          <div className="font-bold text-[14px] text-primary">{sec.label}</div>
                          <div className="text-[12px] text-text-secondary mt-1">Official Cutoff: {cutoff}</div>
                        </div>
                        <div className="text-right">
                          <div className={cn("text-[13px] font-bold flex items-center gap-1 justify-end", passed ? "text-[#199f4a]" : "text-[#ef4444]")}>
                            {passed ? <CheckCircle2 className="w-4 h-4" /> : <X className="w-4 h-4" />}
                            {passed ? "Cleared" : "Not Cleared"}
                          </div>
                          <div className={cn("text-[12px] font-bold mt-1", passed ? "text-[#199f4a]" : "text-[#ef4444]")}>
                            {diff > 0 ? "+" : ""}{diff} marks
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="bg-white rounded-[24px] border border-border p-8 shadow-sm flex flex-col">
              <h3 className="text-[18px] font-display font-extrabold text-primary mb-6 flex items-center gap-2">
                <Target className="w-5 h-5" /> Overall Competitive Position
              </h3>
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-center mb-6">
                  <div className="text-[12px] font-bold text-text-secondary uppercase tracking-widest mb-1">Your Score</div>
                  <div className="text-[42px] font-display font-extrabold text-primary leading-none">{overall}</div>
                </div>
                
                <div className="bg-brand-soft border border-primary/10 rounded-[16px] p-5 text-center">
                  <div className="text-[12px] font-bold text-text-secondary uppercase tracking-widest mb-2">Historical Competitive Range</div>
                  <div className="text-[20px] font-bold text-primary mb-2">
                    {catData.range[0]} - {catData.range[1]}
                  </div>
                  {overall >= catData.range[0] ? (
                    <div className="text-[13px] font-bold text-[#199f4a]">
                      +{overall - catData.range[0]} marks above the lower bound
                    </div>
                  ) : (
                    <div className="text-[13px] font-bold text-[#ef4444]">
                      {overall - catData.range[0]} marks below historical range
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* EXPLANATION & TARGET SIMULATOR */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-[24px] border border-border p-8 shadow-sm">
              <h3 className="text-[18px] font-display font-extrabold text-primary mb-4">Why StepWise predicts this</h3>
              <p className="text-[14px] text-text-secondary font-medium mb-6">
                Your score profile is {overall >= catData.range[0] ? "strong enough to remain competitive" : "currently below the competitive threshold"}, with the biggest opportunity lying in {weakestSec?.label || "improving overall accuracy"}.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#199f4a] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[13px] font-bold text-text-secondary uppercase tracking-wider">Overall Score</div>
                    <div className="text-[14px] font-bold text-primary">{overall >= catData.range[0] ? "Within or above historical competitive range" : "Below historical competitive range"}</div>
                  </div>
                </div>
                {config.hasSectionalCutoffs && (
                  <div className="flex items-start gap-3">
                    {sectAnalysis.passed ? <CheckCircle2 className="w-5 h-5 text-[#199f4a] shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 text-[#ef4444] shrink-0 mt-0.5" />}
                    <div>
                      <div className="text-[13px] font-bold text-text-secondary uppercase tracking-wider">Sectionals</div>
                      <div className="text-[14px] font-bold text-primary">{sectAnalysis.passed ? "All applicable sectional requirements cleared" : "One or more sectional cutoffs not cleared"}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[13px] font-bold text-text-secondary uppercase tracking-wider">Category</div>
                    <div className="text-[14px] font-bold text-primary">Evaluated against {category} criteria</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="text-[14px] font-bold text-primary mb-3">Confidence Band</h4>
                <div className="relative h-2 bg-surface rounded-full mb-2">
                  <div className="absolute top-0 left-0 h-full w-[80%] bg-gradient-to-r from-border to-primary rounded-full"></div>
                  <div className="absolute top-1/2 left-[80%] w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm -translate-y-1/2 -translate-x-1/2"></div>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-text-secondary uppercase">
                  <span>Low</span>
                  <span className={cn("text-primary", prediction.color)}>{prediction.band}</span>
                  <span>High</span>
                </div>
              </div>
            </div>

            <div className="bg-[#f8fafc] rounded-[24px] border border-border p-8 shadow-sm">
              <h3 className="text-[18px] font-display font-extrabold text-primary mb-2">What if you improve?</h3>
              <p className="text-[14px] text-text-secondary font-medium mb-6">Adjust your section scores to see how your prediction changes. This is your target simulator.</p>
              
              <div className="space-y-5 mb-8">
                {config.sections.map((sec: any) => (
                  <div key={sec.id}>
                    <div className="flex justify-between text-[13px] font-bold mb-2">
                      <span className="text-text-primary">{sec.label}</span>
                      <span className="text-primary">{simulatedScores[sec.id]} <span className="text-text-secondary">/ {sec.max}</span></span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max={sec.max} 
                      value={simulatedScores[sec.id]} 
                      onChange={(e) => setSimulatedScores(prev => ({...prev, [sec.id]: parseInt(e.target.value)}))}
                      className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                ))}
              </div>
              
              <div className="bg-white rounded-[16px] p-5 border border-border flex items-center justify-between">
                <div>
                  <div className="text-[12px] font-bold text-text-secondary uppercase tracking-widest mb-1">New Simulated Score</div>
                  <div className="text-[24px] font-display font-extrabold text-primary">{simOverall}</div>
                </div>
                <div className="text-right">
                  <div className="text-[12px] font-bold text-text-secondary uppercase tracking-widest mb-1">Gap to Cutoff</div>
                  <div className={cn("text-[15px] font-bold", simGap >= 0 ? "text-[#199f4a]" : "text-[#ef4444]")}>
                    {simGap > 0 ? "+" : ""}{simGap} marks
                  </div>
                </div>
              </div>
              <p className="text-[12px] text-text-secondary font-medium mt-4 text-center">
                Your score would move into a {simGap >= 15 ? "very strong" : simGap >= 0 ? "competitive" : "challenging"} historical position.
              </p>
            </div>
          </section>

          {/* VARC MARKETING / NEXT STEPS */}
          <section className="bg-brand-soft rounded-[24px] border border-primary/10 p-8 shadow-sm text-center max-w-4xl mx-auto">
            <h3 className="text-[24px] md:text-[28px] font-display font-extrabold text-primary mb-4 uppercase tracking-tight">
              VARC can be the difficult part of IPMAT.
            </h3>
            <p className="text-[15px] md:text-[16px] text-text-secondary font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
              Strong reading ability takes consistency, not cramming. That's why StepWise brings you Daily RCs: focused reading practice designed to help you build the habit one passage at a time.
            </p>

            {/* Daily RC Preview Card */}
            <div className="bg-white rounded-[20px] border border-border shadow-sm max-w-md mx-auto overflow-hidden mb-8 group hover:shadow-md transition-shadow">
              <div className="p-6 text-left">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-brand-soft flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-[11px] font-extrabold text-primary uppercase tracking-widest mb-0.5">DAILY RC</div>
                    <div className="text-[14px] font-bold text-text-secondary">A fresh RC to practise today.</div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2.5 mb-6">
                  <div className="flex items-center justify-between text-[13px] font-medium bg-surface p-3 rounded-[10px] border border-border">
                    <span className="text-text-secondary">Difficulty</span>
                    <span className="text-primary font-bold">Moderate</span>
                  </div>
                  <div className="flex items-center justify-between text-[13px] font-medium bg-surface p-3 rounded-[10px] border border-border">
                    <span className="text-text-secondary">Questions</span>
                    <span className="text-primary font-bold">5</span>
                  </div>
                  <div className="flex items-center justify-between text-[13px] font-medium bg-surface p-3 rounded-[10px] border border-border">
                    <span className="text-text-secondary">Estimated Time</span>
                    <span className="text-primary font-bold">8 min</span>
                  </div>
                </div>

                <a 
                  href="https://ipmat.stepwiselive.com/mocks?type=daily-rc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-primary text-primary-foreground py-4 rounded-[12px] font-bold text-[15px] hover:bg-brand-dark transition-all flex items-center justify-center gap-2 shadow-[var(--shadow-portal)] group"
                >
                  Start Today's RC <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-4 text-[13px] font-bold text-primary mb-8">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#199f4a]" /> Daily Reading Practice</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#199f4a]" /> Exam-Oriented Passages</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#199f4a]" /> Build Speed & Comprehension</span>
            </div>

            <button onClick={onClose} className="text-[14px] font-bold text-text-secondary hover:text-primary transition-colors underline decoration-border underline-offset-4">
              Close Analysis
            </button>
          </section>

          {/* DISCLAIMER */}
          <div className="text-[12px] text-text-secondary font-medium leading-relaxed max-w-4xl mx-auto text-center opacity-70">
            This analysis is indicative and does not guarantee a call, shortlist or admission. Actual shortlisting depends on the official admission criteria, applicant pool, category, score distribution and other factors for the relevant year. Data verified from official sources ({config.lastVerified}).
          </div>
        </div>
      </motion.div>
    </div>
  );
}
