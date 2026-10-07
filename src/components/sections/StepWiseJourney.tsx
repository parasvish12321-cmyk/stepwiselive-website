"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Pencil, FileCheck2, BarChart3, TrendingUp, GraduationCap, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const JOURNEY_STEPS = [
  {
    id: "learn",
    title: "Learn",
    icon: BookOpen,
    studentDoes: "Understand concepts from ground zero.",
    stepWiseProvides: "Structured video lectures and interactive live classes.",
    outcome: "Conceptual clarity without rote memorization.",
  },
  {
    id: "practice",
    title: "Practice",
    icon: Pencil,
    studentDoes: "Solve topic-wise problems daily.",
    stepWiseProvides: "Smart question banks with progressive difficulty.",
    outcome: "Speed and accuracy building.",
  },
  {
    id: "test",
    title: "Test",
    icon: FileCheck2,
    studentDoes: "Take exam-level mock tests.",
    stepWiseProvides: "AI-proctored, actual exam interface mocks.",
    outcome: "Exam temperament and time management.",
  },
  {
    id: "analyse",
    title: "Analyse",
    icon: BarChart3,
    studentDoes: "Review mistakes and identify weak areas.",
    stepWiseProvides: "Deep-dive performance analytics and mentor review.",
    outcome: "Targeted actionable feedback.",
  },
  {
    id: "improve",
    title: "Improve",
    icon: TrendingUp,
    studentDoes: "Work on weak topics and re-test.",
    stepWiseProvides: "Customized practice sets based on mistakes.",
    outcome: "Consistent score increment.",
  },
  {
    id: "iIM",
    title: "IIM",
    icon: GraduationCap,
    studentDoes: "Ace the interview and WAT.",
    stepWiseProvides: "1-on-1 interview prep with IIM alumni.",
    outcome: "Final admission to target IIM.",
  }
];

export default function StepWiseJourney() {
  const [activeStep, setActiveStep] = useState(JOURNEY_STEPS[0].id);

  return (
    <section id="how-it-works" className="py-24 bg-surface-hover relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-soft/50 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-display font-extrabold text-primary mb-4 tracking-tight">
            Your StepWise Journey
          </h2>
          <p className="text-[17px] font-medium text-text-secondary">
            Guidance that moves with you, step by step, from day one to the interview room.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Timeline / Tabs */}
          <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-4 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar">
            {JOURNEY_STEPS.map((step, index) => {
              const isActive = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={cn(
                    "relative flex items-center gap-4 p-4 rounded-[16px] text-left transition-all min-w-[200px] lg:min-w-0 flex-shrink-0 border",
                    isActive 
                      ? "bg-surface text-primary border-primary/20 shadow-[var(--shadow-portal)]" 
                      : "bg-transparent border-transparent text-text-secondary hover:bg-surface/50 hover:border-border"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-[12px] flex items-center justify-center transition-colors border",
                    isActive ? "bg-brand-soft text-primary border-primary/10" : "bg-surface border-border text-text-secondary"
                  )}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-widest mb-1 opacity-70">Stage 0{index + 1}</div>
                    <div className="font-display font-bold text-[16px]">{step.title}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Content Panel */}
          <div className="w-full lg:w-2/3">
            <div className="bg-surface rounded-[24px] p-8 lg:p-12 h-full min-h-[400px] border border-border shadow-[var(--shadow-portal)] relative overflow-hidden">
              <AnimatePresence mode="wait">
                {JOURNEY_STEPS.map((step) => 
                  activeStep === step.id && (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex flex-col justify-center"
                    >
                      <div className="w-16 h-16 rounded-[16px] bg-brand-soft border border-primary/10 flex items-center justify-center text-primary mb-8">
                        <step.icon className="w-8 h-8" />
                      </div>
                      
                      <h3 className="text-3xl font-display font-extrabold text-primary mb-8 tracking-tight">
                        {step.title} Stage
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        <div className="space-y-3">
                          <div className="text-[11px] font-bold text-secondary uppercase tracking-widest">What you do</div>
                          <p className="text-[15px] font-medium text-text-secondary leading-relaxed">{step.studentDoes}</p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="text-[11px] font-bold text-primary uppercase tracking-widest">What StepWise provides</div>
                          <p className="text-[15px] font-medium text-text-secondary leading-relaxed">{step.stepWiseProvides}</p>
                        </div>

                        <div className="col-span-full pt-6 border-t border-border space-y-3">
                          <div className="text-[11px] font-bold text-[#199f4a] uppercase tracking-widest flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Outcome
                          </div>
                          <p className="text-[17px] font-bold text-primary">{step.outcome}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hide scrollbar styles for mobile tabs */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
