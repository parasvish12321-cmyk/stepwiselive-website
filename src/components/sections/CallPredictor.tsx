"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ArrowRight, CheckCircle2, ChevronDown, Loader2, AlertCircle, TrendingUp, Search, Check, AlertTriangle, BookOpen, XCircle, Info, ChevronRight, BarChart3, Clock, Target, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import OtherColleges from "./OtherColleges";
import DetailedAnalysis from "./DetailedAnalysis";

import { 
  ExamType, 
  CategoryType, 
  GenderType, 
  EXAM_CONFIG, 
  HISTORICAL_DATA, 
  calculateOverallScore, 
  validateScores, 
  checkSectionalEligibility, 
  getPredictionBand 
} from "@/lib/prediction";

// ---------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------

type PredictorState = "select-exam" | "input" | "calculating" | "results";

export default function CallPredictor() {
  const [state, setState] = useState<PredictorState>("input");
  const [selectedExam, setSelectedExam] = useState<ExamType>("IPMAT Indore");
  
  const [scores, setScores] = useState<Record<string, string>>({});
  const [category, setCategory] = useState<CategoryType>("General");
  const [gender, setGender] = useState<GenderType>("Male");
  
  const [showMethodology, setShowMethodology] = useState(false);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const config = EXAM_CONFIG[selectedExam];

  // Auto-calculate overall
  const calculatedOverall = useMemo(() => {
    return calculateOverallScore(scores, config);
  }, [scores, config]);

  const handleScoreChange = (id: string, val: string) => {
    setScores(prev => {
      const next = { ...prev, [id]: val };
      const validation = validateScores(next, config);
      setError(validation.error);
      return next;
    });
  };

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const validation = validateScores(scores, config);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    setError(null);

    setState("calculating");
    setTimeout(() => {
      setState("results");
    }, 2500);
  };

  const handleReset = () => {
    setState("input");
    setScores({});
    setError(null);
  };

  return (
    <section id="predictor" className="py-16 sm:py-24 bg-surface-hover relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-soft/60 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-soft border border-primary/10 text-primary text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mb-4 sm:mb-6">
            <Target className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            AI Prediction Engine
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-primary mb-3 sm:mb-4 tracking-tight">
            StepWise Call Predictor
          </h2>
          <p className="text-[15px] sm:text-[17px] font-medium text-text-secondary">
            Exam-aware predictions powered by historical data and official admission policies.
          </p>
        </div>

        <div className="max-w-[900px] mx-auto">
          
          <AnimatePresence mode="wait">
            
            {(state === "input" || state === "select-exam") && (
              <motion.div
                key="input-phase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6 sm:space-y-8"
              >
                {/* Exam Selector */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                  {(["IPMAT Indore", "IPMAT Rohtak", "JIPMAT"] as ExamType[]).map(exam => (
                    <button
                      key={exam}
                      onClick={() => {
                        setSelectedExam(exam);
                        setScores({});
                        setError(null);
                      }}
                      className={cn(
                        "text-left p-4 sm:p-5 rounded-[12px] sm:rounded-[16px] border-2 transition-all flex flex-col gap-1.5 sm:gap-2",
                        selectedExam === exam 
                          ? "bg-surface border-primary shadow-[var(--shadow-portal)]" 
                          : "bg-surface/50 border-border hover:border-primary/30 hover:bg-surface text-text-secondary"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={cn(
                          "font-display font-bold text-[16px] sm:text-[18px]",
                          selectedExam === exam ? "text-primary" : ""
                        )}>{exam}</span>
                        {selectedExam === exam && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />}
                      </div>
                      <span className="text-[12px] sm:text-[13px] font-medium opacity-80">{EXAM_CONFIG[exam].institute}</span>
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-primary/70 mt-1 sm:mt-2">
                        {EXAM_CONFIG[exam].description}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Form Card */}
                <div className="bg-surface rounded-[20px] sm:rounded-[24px] border border-border shadow-[var(--shadow-portal)] overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                  
                  <div className="p-5 sm:p-8 lg:p-12">
                    <form onSubmit={handlePredict}>
                      <div className="mb-6 sm:mb-8">
                        <h3 className="font-display font-extrabold text-[18px] sm:text-[22px] text-primary mb-2 flex items-center gap-2">
                          Enter your {selectedExam} Score
                        </h3>
                        {config.notes && (
                          <div className="flex items-start gap-2 bg-brand-soft/50 rounded-[10px] sm:rounded-[12px] p-3 sm:p-4 text-[12px] sm:text-[13px] font-medium text-text-secondary mt-3 sm:mt-4">
                            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <p>{config.notes}</p>
                          </div>
                        )}
                      </div>

                      {/* Dynamic Inputs */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-5 sm:gap-y-6 mb-6 sm:mb-8">
                        {config.sections.map(sec => (
                          <div key={sec.id} className="space-y-1.5 sm:space-y-2">
                            <label className="flex items-center justify-between text-[12px] sm:text-[13px] font-bold text-text-secondary">
                              {sec.label}
                              <span className="text-[10px] sm:text-[11px] opacity-70">Max: {sec.max}</span>
                            </label>
                            <input 
                              type="number" 
                              value={scores[sec.id] || ""}
                              onChange={(e) => handleScoreChange(sec.id, e.target.value)}
                              placeholder={`Score out of ${sec.max}`} 
                              required
                              max={sec.max}
                              min={sec.min}
                              className="w-full bg-background border border-border rounded-[10px] sm:rounded-[12px] px-3 sm:px-4 py-3 sm:py-3.5 text-[15px] sm:text-[16px] font-bold text-text-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15 focus:border-primary transition-all placeholder:font-medium placeholder:text-text-secondary/40"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Auto Calculated Overall (if applicable) */}
                      {config.sections.length > 1 && (
                        <div className="bg-background rounded-[12px] sm:rounded-[16px] p-4 sm:p-6 mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 border border-border/50">
                          <div>
                            <div className="text-[12px] sm:text-[13px] font-bold text-text-secondary mb-0.5 sm:mb-1">Calculated Overall Score</div>
                            <div className="text-[11px] sm:text-[12px] font-medium text-text-secondary/70">Based on your section-wise inputs</div>
                          </div>
                          <div className="font-display font-extrabold text-[28px] sm:text-[32px] text-primary">
                            {calculatedOverall} <span className="text-[14px] sm:text-[16px] text-text-secondary/50 font-bold">/ {config.maxOverall}</span>
                          </div>
                        </div>
                      )}

                      <hr className="border-border my-6 sm:my-8" />

                      {/* Demographics */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mb-8 sm:mb-10">
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-[12px] sm:text-[13px] font-bold text-text-secondary">Category</label>
                          <div className="relative">
                            <select 
                              value={category}
                              onChange={(e) => setCategory(e.target.value as CategoryType)}
                              className="w-full appearance-none bg-background border border-border rounded-[10px] sm:rounded-[12px] px-3 sm:px-4 py-3 sm:py-3.5 text-[14px] sm:text-[15px] font-bold text-text-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15 focus:border-primary transition-all cursor-pointer"
                            >
                              {(["General", "EWS", "NC-OBC", "SC", "ST", "PwD"] as CategoryType[]).map(c => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                          </div>
                        </div>

                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-[12px] sm:text-[13px] font-bold text-text-secondary">Gender</label>
                          <div className="relative">
                            <select 
                              value={gender}
                              onChange={(e) => setGender(e.target.value as GenderType)}
                              className="w-full appearance-none bg-background border border-border rounded-[10px] sm:rounded-[12px] px-3 sm:px-4 py-3 sm:py-3.5 text-[14px] sm:text-[15px] font-bold text-text-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15 focus:border-primary transition-all cursor-pointer"
                            >
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {error && (
                        <div className="mb-5 sm:mb-6 p-3 sm:p-4 rounded-[10px] sm:rounded-[12px] bg-[#ef4444]/10 border border-[#ef4444]/20 flex items-start gap-2.5 sm:gap-3 text-[#ef4444]">
                          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
                          <p className="text-[13px] sm:text-[14px] font-bold">{error}</p>
                        </div>
                      )}

                      <button 
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-[10px] sm:rounded-[12px] font-bold text-[15px] sm:text-[16px] hover:bg-brand-dark hover:shadow-[var(--shadow-portal)] transition-all group"
                      >
                        <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
                        Predict My Calls
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}

            {state === "calculating" && (
              <motion.div
                key="calculating"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="bg-surface rounded-[20px] sm:rounded-[24px] border border-border shadow-[var(--shadow-portal)] p-10 sm:p-16 flex flex-col items-center justify-center min-h-[350px] sm:min-h-[400px]"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-6 sm:mb-8">
                  <div className="absolute inset-0 rounded-full border-[3px] sm:border-[4px] border-border"></div>
                  <div className="absolute inset-0 rounded-full border-[3px] sm:border-[4px] border-primary border-t-transparent animate-spin"></div>
                  <Calculator className="absolute inset-0 m-auto w-6 h-6 sm:w-8 sm:h-8 text-primary animate-pulse" />
                </div>
                <h3 className="text-[18px] sm:text-[22px] font-display font-extrabold text-primary mb-2">Analyzing Profile...</h3>
                <div className="flex flex-col items-center gap-1.5 sm:gap-2 text-[12px] sm:text-[14px] font-medium text-text-secondary mt-3 sm:mt-4 text-center">
                  <span className="flex items-center gap-1.5 sm:gap-2"><Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#199f4a]" /> Verifying {selectedExam} inputs</span>
                  <span className="flex items-center gap-1.5 sm:gap-2"><Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#199f4a]" /> Applying {category} category rules</span>
                  <span className="flex items-center gap-1.5 sm:gap-2 opacity-50"><Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" /> Cross-referencing historical thresholds</span>
                </div>
              </motion.div>
            )}

            {state === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5 sm:space-y-6"
              >
                {/* Result Header */}
                <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4 sm:gap-6 bg-surface p-5 sm:p-6 rounded-[16px] sm:rounded-[20px] border border-border shadow-sm mb-4">
                  <div className="text-center md:text-left w-full md:w-auto">
                    <div className="text-[11px] sm:text-[12px] font-bold text-text-secondary uppercase tracking-widest mb-1">Your Profile</div>
                    <div className="font-display font-bold text-[18px] sm:text-[20px] text-primary">{selectedExam}</div>
                    <div className="text-[13px] sm:text-[14px] font-medium text-text-secondary mt-1">{category} • {gender}</div>
                  </div>
                  
                  <div className="h-px w-full md:h-12 md:w-px bg-border"></div>
                  
                  <div className="text-center md:text-right w-full md:w-auto">
                    <div className="text-[11px] sm:text-[12px] font-bold text-text-secondary uppercase tracking-widest mb-1">Overall Score</div>
                    <div className="font-display font-extrabold text-[32px] sm:text-[36px] text-primary leading-none">
                      {calculatedOverall} <span className="text-[14px] sm:text-[16px] text-text-secondary/50 font-bold">/ {config.maxOverall}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-1 sm:px-2 pb-1 sm:pb-2">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <h3 className="font-display font-extrabold text-[18px] sm:text-[20px] text-primary">Call Outlook</h3>
                </div>

                {/* Dynamic Institute Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(config.evaluateInstitutes || [config.institute]).map(institute => {
                    const sectAnalysis = checkSectionalEligibility(institute, category, scores, config);
                    const prediction = getPredictionBand(institute, category, calculatedOverall, config, sectAnalysis.passed);
                    
                    return (
                      <div key={institute} className="bg-surface rounded-[16px] sm:rounded-[20px] border border-border p-5 sm:p-6 shadow-sm flex flex-col h-full">
                        <div className="flex justify-between items-start mb-5 sm:mb-6">
                          <div>
                            <h4 className="font-display font-bold text-[18px] sm:text-[20px] text-text-primary mb-1">{institute}</h4>
                            <div className={cn("text-[11px] sm:text-[12px] font-extrabold tracking-widest uppercase", prediction.color)}>
                              {prediction.band} POSSIBILITY
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6 grow">
                          <div className="flex justify-between items-center text-[13px] sm:text-[14px]">
                            <span className="text-text-secondary font-medium">Historical Range</span>
                            <span className="font-bold text-text-primary">
                              {HISTORICAL_DATA[institute][category].range[0]} - {HISTORICAL_DATA[institute][category].range[1]}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-[13px] sm:text-[14px]">
                            <span className="text-text-secondary font-medium">Distance from cutoff</span>
                            <span className={cn("font-bold", prediction.color)}>
                              {prediction.gap > 0 ? "+" : ""}{prediction.gap} marks
                            </span>
                          </div>

                          {config.hasSectionalCutoffs && (
                            <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-border space-y-1.5 sm:space-y-2">
                              <div className="text-[11px] sm:text-[12px] font-bold text-text-secondary uppercase tracking-widest">Sectional Status</div>
                              {sectAnalysis.passed ? (
                                <div className="flex items-center gap-1.5 sm:gap-2 text-[13px] sm:text-[14px] font-bold text-[#199f4a]">
                                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> All sectionals cleared
                                </div>
                              ) : (
                                <div className="flex items-center gap-1.5 sm:gap-2 text-[13px] sm:text-[14px] font-bold text-[#ef4444]">
                                  <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Missed sectional cutoff
                                </div>
                              )}
                              
                              {sectAnalysis.strongest && (
                                <div className="flex items-center justify-between text-[12px] sm:text-[13px] font-medium mt-1.5 sm:mt-2">
                                  <span className="text-text-secondary">Strongest:</span>
                                  <span className="text-text-primary font-bold">{sectAnalysis.strongest}</span>
                                </div>
                              )}
                              {sectAnalysis.weakest && (
                                <div className="flex items-center justify-between text-[12px] sm:text-[13px] font-medium">
                                  <span className="text-text-secondary">Weakest:</span>
                                  <span className="text-text-primary font-bold">{sectAnalysis.weakest}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <button 
                          onClick={() => setShowDetailedAnalysis(institute)}
                          className="w-full py-2.5 sm:py-3 rounded-[10px] bg-background border border-border text-[13px] sm:text-[14px] font-bold text-primary hover:bg-brand-soft transition-colors mt-auto"
                        >
                          View Detailed Analysis
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Other Colleges for IPMAT Indore */}
                {selectedExam === "IPMAT Indore" && (
                  <OtherColleges score={calculatedOverall} category={category} />
                )}

                {/* What to do next */}
                <div className="bg-brand-soft rounded-[16px] sm:rounded-[20px] p-5 sm:p-6 lg:p-8 mt-5 sm:mt-6">
                  <h4 className="font-display font-extrabold text-[18px] sm:text-[20px] text-primary mb-3 sm:mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" /> What should you do next?
                  </h4>
                  <p className="text-[14px] sm:text-[15px] font-medium text-text-secondary mb-5 sm:mb-6 leading-relaxed">
                    Based on your profile, we've prepared a customized action plan. Whether you need to strengthen a weak section or maintain your overall score, StepWise has the tools to help you take the next step.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a 
                      href="https://ipmat.stepwiselive.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm:w-[65%] bg-primary text-primary-foreground py-3.5 sm:py-4 rounded-[10px] sm:rounded-[12px] font-bold text-[14px] sm:text-[15px] hover:bg-brand-dark hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 shadow-[var(--shadow-portal)] group"
                    >
                      Explore StepWise <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <button 
                      onClick={handleReset}
                      className="sm:w-[35%] py-3.5 sm:py-4 rounded-[10px] sm:rounded-[12px] font-bold text-[14px] sm:text-[15px] text-primary bg-transparent border border-primary/20 hover:bg-white hover:border-primary/30 transition-all"
                    >
                      Try Another Score
                    </button>
                  </div>
                </div>

                {/* Source & Disclaimer */}
                <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                  <button 
                    onClick={() => setShowMethodology(!showMethodology)}
                    className="flex items-center gap-1.5 sm:gap-2 text-[12px] sm:text-[13px] font-bold text-text-secondary hover:text-primary transition-colors"
                  >
                    {showMethodology ? <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    View Methodology & Data Sources
                  </button>
                  
                  <AnimatePresence>
                    {showMethodology && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-background rounded-[10px] sm:rounded-[12px] p-4 sm:p-5 border border-border text-[12px] sm:text-[13px] text-text-secondary leading-relaxed space-y-2.5 sm:space-y-3 font-medium">
                          <p><strong className="text-text-primary">Data Source:</strong> {config.source}</p>
                          <p><strong className="text-text-primary">Last Verified:</strong> {config.lastVerified}</p>
                          <p>
                            Predictions are derived from publicly available admission policies, historical RTI data, and official shortlisting cutoffs. The "Prediction Band" is calculated by comparing your inputted score against historical category-specific ranges.
                          </p>
                          <p className="text-[#a97a00]">
                            <strong>Disclaimer:</strong> This predictor provides an indicative estimate only. It is not an official prediction or guarantee of admission. Actual shortlisting depends on the institute's final criteria, applicant pool competitiveness, and other factors for the relevant admission year.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showDetailedAnalysis && (
          <DetailedAnalysis
            onClose={() => setShowDetailedAnalysis(null)}
            institute={showDetailedAnalysis}
            category={category}
            gender={gender}
            scores={scores}
            overall={calculatedOverall}
            maxOverall={config.sections.reduce((acc, curr) => acc + (curr.id !== "overall" ? curr.max : 0), 0) || config.sections.find(s => s.id === "overall")?.max || 0}
            prediction={getPredictionBand(showDetailedAnalysis, category, calculatedOverall, config, checkSectionalEligibility(showDetailedAnalysis, category, scores, config).passed)}
            sectAnalysis={checkSectionalEligibility(showDetailedAnalysis, category, scores, config)}
            config={config}
            historicalData={HISTORICAL_DATA[showDetailedAnalysis]}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
