"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Target, FileSignature, PieChart, TrendingUp, GraduationCap, ArrowRight, ChevronRight, BarChart3, Search, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const JOURNEY_STAGES = [
  {
    id: "learn",
    label: "01 — LEARN",
    title: "Study Notes",
    icon: BookOpen,
    whatYouDo: "Build concepts from the ground up.",
    stepWiseProvides: "Structured study notes and learning resources.",
    outcome: "Strong conceptual foundation."
  },
  {
    id: "practice",
    label: "02 — PRACTICE",
    title: "PracSets",
    icon: Target,
    whatYouDo: "Turn concepts into solving ability.",
    stepWiseProvides: "PracSets designed for focused topic-wise practice.",
    outcome: "Better accuracy, speed and confidence."
  },
  {
    id: "test",
    label: "03 — TEST",
    title: "Mock Tests",
    icon: FileSignature,
    whatYouDo: "Test yourself under exam-like conditions.",
    stepWiseProvides: "Structured Mock Tests with realistic exam practice.",
    outcome: "Exam readiness."
  },
  {
    id: "analyse",
    label: "04 — ANALYSE",
    title: "Post Mock Analysis",
    icon: PieChart,
    whatYouDo: "Understand exactly where you gained and lost marks.",
    stepWiseProvides: "Detailed Post Mock Analysis.",
    outcome: "Know what is holding your score back."
  },
  {
    id: "improve",
    label: "05 — IMPROVE",
    title: "SWOT Analysis",
    icon: TrendingUp,
    whatYouDo: "Convert analysis into action.",
    stepWiseProvides: "SWOT-based performance understanding.",
    outcome: "A clearer and more targeted improvement plan."
  },
  {
    id: "iim",
    label: "06 — IIM",
    title: "IIM",
    icon: GraduationCap,
    whatYouDo: "Take the next step toward your IIM journey.",
    stepWiseProvides: "Guidance that carries you beyond the test.",
    outcome: "Move closer to the IIM goal."
  }
];

export default function PortalOverview() {
  const [activeStage, setActiveStage] = useState(JOURNEY_STAGES[0].id);

  const activeStageData = JOURNEY_STAGES.find(s => s.id === activeStage)!;

  return (
    <section className="py-16 sm:py-24 bg-[#faf9f6] relative overflow-hidden" id="journey">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-primary mb-4 sm:mb-6 tracking-tight">
            Your StepWise <span className="text-secondary">Journey</span>
          </h2>
          <p className="text-[15px] sm:text-lg text-text-secondary max-w-2xl mx-auto">
            Experience the complete preparation cycle. An intelligent ecosystem designed for focus and results, guiding you from day one to the IIMs.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-14 items-start">
          
          {/* Journey Navigator (Left) */}
          <div className="w-full lg:w-[35%] xl:w-[30%] flex flex-col">
            
            {/* Mobile horizontal tabs */}
            <div className="flex lg:hidden overflow-x-auto scrollbar-hide gap-3 pb-2 mb-4 snap-x snap-mandatory">
              {JOURNEY_STAGES.map((stage) => {
                const isActive = activeStage === stage.id;
                return (
                  <div
                    key={stage.id}
                    onClick={() => setActiveStage(stage.id)}
                    className={cn(
                      "flex items-center gap-3 shrink-0 snap-start px-4 py-3 rounded-xl border transition-all duration-300",
                      isActive 
                        ? "bg-white border-[#5B5BD6]/30 shadow-md" 
                        : "bg-white/50 border-transparent hover:bg-white/80"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 flex items-center justify-center transition-colors shadow-sm",
                      isActive ? "bg-[#5B5BD6] text-white rounded-lg" : "bg-white text-text-secondary rounded-full border border-border"
                    )}>
                      <stage.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={cn(
                        "text-[9px] font-bold tracking-widest uppercase mb-0.5 transition-colors",
                        isActive ? "text-[#5B5BD6]" : "text-text-secondary"
                      )}>
                        {stage.label}
                      </div>
                      <h3 className={cn(
                        "text-[14px] font-bold transition-colors whitespace-nowrap",
                        isActive ? "text-[#5B5BD6]" : "text-text-primary"
                      )}>
                        {stage.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>



            {/* Desktop Vertical Accordion */}
            <div className="hidden lg:flex flex-col gap-2">
              {JOURNEY_STAGES.map((stage) => {
                const isActive = activeStage === stage.id;
                return (
                  <div
                    key={stage.id}
                    className={cn(
                      "group cursor-pointer rounded-2xl transition-all duration-300",
                      isActive 
                        ? "bg-white shadow-[0_8px_30px_rgba(20,26,60,0.06)] p-6" 
                        : "bg-transparent p-5 hover:bg-white/40"
                    )}
                    onClick={() => setActiveStage(stage.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className={cn(
                          "w-12 h-12 flex items-center justify-center transition-colors shadow-sm",
                          isActive ? "bg-[#5B5BD6] text-white rounded-xl" : "bg-transparent text-text-secondary rounded-full border border-border"
                        )}>
                          <stage.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className={cn(
                            "text-[10px] font-bold tracking-widest uppercase mb-0.5 transition-colors",
                            isActive ? "text-[#5B5BD6]" : "text-text-secondary"
                          )}>
                            {stage.label}
                          </div>
                          <h3 className={cn(
                            "text-[16px] font-bold transition-colors",
                            isActive ? "text-[#5B5BD6]" : "text-text-primary"
                          )}>
                            {stage.title}
                          </h3>
                        </div>
                      </div>
                      {isActive && <ChevronRight className="w-5 h-5 text-[#5B5BD6]" />}
                    </div>
                    
                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-[#f3f4f6] mt-4 space-y-4">
                            <div>
                              <div className="text-[9px] font-bold uppercase tracking-widest text-text-secondary mb-1">What You Do</div>
                              <div className="text-[13px] font-medium text-text-primary leading-snug">{stage.whatYouDo}</div>
                            </div>
                            <div>
                              <div className="text-[9px] font-bold uppercase tracking-widest text-text-secondary mb-1">StepWise Provides</div>
                              <div className="text-[13px] font-medium text-text-primary leading-snug">{stage.stepWiseProvides}</div>
                            </div>
                            <div>
                              <div className="text-[9px] font-bold uppercase tracking-widest text-[#5B5BD6] mb-1">Outcome</div>
                              <div className="text-[13px] font-bold text-[#10b981]">{stage.outcome}</div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Portal Visual (Right) */}
          <div className="w-full lg:w-[65%] xl:w-[70%] sticky top-24 lg:top-32">
            <div className="bg-[#f8f9fa] rounded-[16px] sm:rounded-[20px] shadow-[0_10px_40px_rgba(20,26,60,0.08)] overflow-hidden h-[500px] sm:h-[600px] flex flex-col relative border border-[#e5e7eb]/50">
              
              {/* Mock Browser Header */}
              <div className="bg-white border-b border-[#e5e7eb] px-3 sm:px-4 py-2 sm:py-3 flex items-center shrink-0">
                <div className="flex gap-1.5 sm:gap-2 w-16 sm:w-20">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="bg-[#f1f3f5] rounded-md px-3 sm:px-4 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-bold tracking-widest text-[#9ca3af] uppercase flex-1 max-w-[500px] flex items-center justify-center gap-1.5 sm:gap-2 mx-auto">
                  <Search className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  IPMAT.STEPWISELIVE.COM
                </div>
                <div className="w-16 sm:w-20"></div> {/* Spacer for centering */}
              </div>
              
              {/* Dynamic Content */}
              <div className="flex-1 relative overflow-y-auto overflow-x-hidden custom-scrollbar">
                <AnimatePresence mode="wait">
                  {JOURNEY_STAGES.map((stage) => 
                    activeStage === stage.id && (
                      <motion.div
                        key={stage.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full min-h-full bg-[#f4f5fb] pb-10"
                      >
                        
                        {/* 01: LEARN - Study Notes */}
                        {stage.id === "learn" && (
                          <div className="flex flex-col h-full bg-[#f4f3ef] p-4 sm:p-6">
                            {/* Purple Header */}
                            <div className="bg-[#6B6BE5] rounded-[12px] sm:rounded-[16px] p-5 sm:p-8 text-white mb-4 sm:mb-6">
                              <h2 className="text-[24px] sm:text-[32px] font-bold mb-1 tracking-tight">Study Notes</h2>
                              <p className="text-[13px] sm:text-[14px] text-white/90">Curated notes from your mentors. One click opens the source directly.</p>
                            </div>
                            
                            {/* Filter Pills */}
                            <div className="flex gap-2 sm:gap-3 mb-5 sm:mb-8 overflow-x-auto scrollbar-hide px-1 sm:px-2 pb-1">
                              {['All', 'Quant', 'VARC', 'LR/DI', 'GK', 'Other'].map((f, i) => (
                                <div key={i} className={cn(
                                  "px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[12px] sm:text-[13px] font-bold shrink-0 shadow-sm transition-colors",
                                  i === 0 ? "bg-[#5B5BD6] text-white" : "bg-white text-[#4b5563] hover:bg-white/80"
                                )}>
                                  {f}
                                </div>
                              ))}
                            </div>
                            
                            {/* Notes Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 px-1 sm:px-2">
                              {[
                                { subject: "QA", title: "Functions", url: "functionstepWisenotes.edgeone.dev" },
                                { subject: "QA", title: "Coordinate Geometry - Part 2", url: "coordinategeopart2stepWisenotes.edgeone.dev" },
                                { subject: "QA", title: "Coordinate Geometry - Part 1", url: "coordinategeometrystepWisenotes.edgeone.dev" },
                                { subject: "QA", title: "Mixtures & Alligations", url: "mixturesalligationsstepWisenotes.edgeone.dev" },
                              ].map((note, i) => (
                                <div key={i} className="bg-white rounded-[12px] sm:rounded-[16px] p-4 sm:p-5 shadow-sm border border-[#e5e7eb] hover:shadow-md transition-shadow flex flex-col relative overflow-hidden h-[130px] sm:h-[150px]">
                                  {/* Pale Blue Stripe */}
                                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 h-5 sm:h-6 bg-[#eef2ff] rounded-md -z-0"></div>
                                  
                                  <div className="relative z-10 font-bold text-[#2563eb] text-[9px] sm:text-[10px] uppercase mb-3 sm:mb-4 px-1">{note.subject}</div>
                                  <h4 className="relative z-10 font-bold text-[#1f2937] text-[15px] sm:text-[17px] mb-auto tracking-tight line-clamp-2">{note.title}</h4>
                                  
                                  <div className="relative z-10 flex flex-col gap-0.5 sm:gap-1 mt-2 sm:mt-3">
                                    <span className="text-[12px] sm:text-[13px] font-bold text-[#5B5BD6] flex items-center gap-1">Open notes ↗</span>
                                    <span className="text-[10px] sm:text-[11px] text-[#9ca3af] truncate">{note.url}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 02: PRACTICE - PracSets */}
                        {stage.id === "practice" && (
                          <div className="flex flex-col h-full bg-[#f4f3ef] p-4 sm:p-6">
                            {/* Purple Header */}
                            <div className="bg-[#6B6BE5] rounded-[12px] sm:rounded-[16px] p-5 sm:p-8 text-white mb-4 sm:mb-6">
                              <h2 className="text-[24px] sm:text-[32px] font-bold mb-1 tracking-tight">PracSet</h2>
                              <p className="text-[13px] sm:text-[14px] text-white/90">Chapter-wise short practice tests. Bite-sized, focused, and quick to attempt — perfect between mocks.</p>
                            </div>
                            
                            {/* Filter Pills */}
                            <div className="flex gap-2 sm:gap-3 mb-5 sm:mb-8 overflow-x-auto scrollbar-hide px-1 sm:px-2 pb-1">
                              {['All', 'QA MCQ', 'QA Short Answer', 'VARC'].map((f, i) => (
                                <div key={i} className={cn(
                                  "px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[12px] sm:text-[13px] font-bold shrink-0 shadow-sm transition-colors",
                                  i === 0 ? "bg-[#5B5BD6] text-white" : "bg-white text-[#4b5563] hover:bg-white/80"
                                )}>
                                  {f}
                                </div>
                              ))}
                            </div>
                            
                            {/* List Section */}
                            <div className="space-y-6 sm:space-y-8 px-1 sm:px-2">
                              <div>
                                <h3 className="text-[12px] sm:text-[13px] font-bold text-[#6B6BE5] uppercase tracking-widest mb-3 sm:mb-4">Active & Passive Voice</h3>
                                <div className="bg-white rounded-[12px] sm:rounded-[16px] p-5 sm:p-6 shadow-sm border border-[#e5e7eb] flex flex-col items-center justify-center text-center transition-all hover:border-[#d1d5db]">
                                  <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 flex-wrap">
                                    <h4 className="font-bold text-[#1f2937] text-[16px] sm:text-[18px] tracking-tight">Active & Passive Voice — Topic Test 1</h4>
                                    <div className="flex gap-1.5 sm:gap-2 flex-wrap justify-center mt-1 sm:mt-0">
                                      <span className="bg-[#f3e8ff] text-[#9333ea] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">PracSet</span>
                                      <span className="bg-[#e0e7ff] text-[#4f46e5] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">VARC</span>
                                    </div>
                                  </div>
                                  <div className="text-[11px] sm:text-[12px] text-[#9ca3af] font-medium flex items-center justify-center gap-1.5 sm:gap-2 mb-5 sm:mb-6 flex-wrap">
                                    15 questions <span className="text-[#d1d5db] hidden sm:inline">·</span> 90 min <span className="text-[#d1d5db] hidden sm:inline">·</span> 60 marks <span className="text-[#d1d5db] hidden sm:inline">·</span> +4 / -0 <span className="text-[#d1d5db] hidden sm:inline">·</span> <span className="text-[#9ca3af]">Not attempted yet</span>
                                  </div>
                                  <button className="bg-[#5B5BD6] hover:bg-[#4a4ac2] text-white font-bold text-[13px] sm:text-[14px] px-8 sm:px-10 py-2 sm:py-2.5 rounded-xl shadow-sm transition-colors">
                                    Start
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 03: TEST - Mock Tests */}
                        {stage.id === "test" && (
                          <div className="flex flex-col">
                            {/* Header */}
                            <div className="bg-white border-b border-[#e5e7eb] pt-6 sm:pt-8 pb-5 sm:pb-6 px-4 sm:px-8">
                              <h2 className="text-[24px] sm:text-[28px] font-bold mb-1 text-[#111827] tracking-tight">Mock Tests</h2>
                              <p className="text-[13px] sm:text-[14px] text-[#6b7280]">Simulate the actual exam environment to build stamina.</p>
                            </div>
                            
                            <div className="px-4 sm:px-8 mt-5 sm:mt-6">
                              {/* Filters */}
                              <div className="flex gap-2 mb-5 sm:mb-6 overflow-x-auto pb-2 scrollbar-hide">
                                {['All Tests', 'Full Mocks', 'Sectionals', 'Topic Tests', 'Daily RC'].map((f, i) => (
                                  <div key={i} className={cn(
                                    "px-3 sm:px-4 py-1.5 rounded-full text-[12px] sm:text-[13px] font-bold shrink-0 border transition-colors cursor-pointer",
                                    i === 0 ? "bg-[#111827] text-white border-[#111827]" : "bg-white text-[#4b5563] border-[#e5e7eb] hover:bg-[#f3f4f6]"
                                  )}>
                                    {f}
                                  </div>
                                ))}
                              </div>
                              
                              {/* List Section */}
                              <div className="space-y-3 sm:space-y-4">
                                {/* Test 1 - Completed */}
                                <div className="bg-white rounded-[12px] sm:rounded-[16px] p-4 sm:p-5 shadow-sm border border-[#e5e7eb] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                                  <div>
                                    <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                                      <h4 className="font-bold text-[#1f2937] text-[15px] sm:text-[16px]">IPMAT Rohtak Mock 01</h4>
                                      <div className="flex gap-2">
                                        <span className="bg-[#e0e7ff] text-[#4338ca] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Full Mock</span>
                                      </div>
                                    </div>
                                    <div className="text-[11px] sm:text-[12px] text-[#6b7280] font-medium flex items-center gap-1.5 mb-2 flex-wrap">
                                      120 qs <span className="text-[#d1d5db]">•</span> 120 min <span className="text-[#d1d5db]">•</span> 480 marks
                                    </div>
                                    <div className="text-[11px] sm:text-[12px] font-bold text-[#059669] bg-[#d1fae5] px-2 py-0.5 rounded inline-block">
                                      Attempted 1x • Best: 240
                                    </div>
                                  </div>
                                  <button className="w-full sm:w-auto bg-white border border-[#d1d5db] hover:bg-[#f3f4f6] text-[#374151] font-bold text-[13px] px-5 py-2 sm:py-2.5 rounded-lg shadow-sm transition-colors shrink-0 text-center">
                                    View analysis
                                  </button>
                                </div>
                                
                                {/* Test 2 - New */}
                                <div className="bg-white rounded-[12px] sm:rounded-[16px] p-4 sm:p-5 shadow-sm border border-[#e5e7eb] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                                  <div>
                                    <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                                      <h4 className="font-bold text-[#1f2937] text-[15px] sm:text-[16px]">Daily RC - 14th August</h4>
                                      <div className="flex gap-1.5 sm:gap-2">
                                        <span className="bg-[#fee2e2] text-[#b91c1c] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Daily-RC</span>
                                      </div>
                                    </div>
                                    <div className="text-[11px] sm:text-[12px] text-[#6b7280] font-medium flex items-center gap-1.5 flex-wrap">
                                      5 qs <span className="text-[#d1d5db]">•</span> 10 min <span className="text-[#d1d5db]">•</span> 20 marks <span className="text-[#d1d5db]">•</span> Not attempted
                                    </div>
                                  </div>
                                  <button className="w-full sm:w-auto bg-[#3B82F6] hover:bg-[#2563eb] text-white font-bold text-[13px] px-8 py-2 sm:py-2.5 rounded-lg shadow-sm transition-colors shrink-0 text-center">
                                    Start
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 04: ANALYSE - Post Mock Analysis */}
                        {stage.id === "analyse" && (
                          <div className="flex flex-col">
                            {/* Header Bar */}
                            <div className="bg-white border-b border-[#e5e7eb] p-3 sm:p-4 flex items-center gap-3 sm:gap-4 overflow-x-auto scrollbar-hide">
                              <button className="text-[#6b7280] font-bold text-[12px] sm:text-[13px] hover:text-[#111827] whitespace-nowrap">← Back</button>
                              <div className="h-4 w-px bg-[#d1d5db]"></div>
                              <h3 className="font-bold text-[#111827] text-[13px] sm:text-[15px] whitespace-nowrap">IPMAT Rohtak Mock 01</h3>
                            </div>
                            
                            {/* Hero Performance Banner */}
                            <div className="bg-[#6B6BE5] pt-6 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-8 text-white">
                              <h2 className="text-[18px] sm:text-[20px] font-bold mb-4 sm:mb-6 tracking-tight">Your Performance</h2>
                              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
                                {[
                                  { label: "ATS Rank", value: "42", sub: "/ 850" },
                                  { label: "Score", value: "240", sub: "/ 480" },
                                  { label: "Percentile", value: "95.2", sub: "%ile" },
                                  { label: "Accuracy", value: "78", sub: "%" },
                                  { label: "Time Taken", value: "115", sub: "min" },
                                ].map((stat, i) => (
                                  <div key={i} className={cn(
                                    "bg-white/10 border border-white/20 rounded-[12px] sm:rounded-[16px] p-3 sm:p-4 flex flex-col justify-center",
                                    i === 4 ? "col-span-2 sm:col-span-1" : ""
                                  )}>
                                    <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white/80 mb-1 sm:mb-2">{stat.label}</div>
                                    <div className="text-[22px] sm:text-[28px] font-bold leading-none flex items-baseline gap-1">
                                      {stat.value} <span className="text-[10px] sm:text-[12px] font-bold opacity-80">{stat.sub}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Analytics Body */}
                            <div className="px-4 sm:px-8 -mt-6 sm:-mt-8 pb-6 sm:pb-8 bg-[#f4f3ef] flex-1">
                              <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
                                {/* Bar Chart Box */}
                                <div className="w-full xl:w-1/3 bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm border border-[#e5e7eb]">
                                  <h4 className="font-bold text-[#111827] text-[14px] sm:text-[15px] mb-6 sm:mb-8">You vs Average vs Topper</h4>
                                  <div className="flex items-end justify-center gap-6 sm:gap-8 h-32 sm:h-40 border-b border-[#f3f4f6]">
                                    <div className="flex flex-col items-center justify-end h-full gap-2 sm:gap-3 w-8 sm:w-10">
                                      <div className="w-full h-[60%] bg-[#6B6BE5] rounded-t-sm"></div>
                                      <span className="text-[9px] sm:text-[10px] font-bold text-[#6b7280] uppercase mb-1">You</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-end h-full gap-2 sm:gap-3 w-8 sm:w-10">
                                      <div className="w-full h-[45%] bg-[#a78bfa] rounded-t-sm"></div>
                                      <span className="text-[9px] sm:text-[10px] font-bold text-[#6b7280] uppercase mb-1">Avg</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-end h-full gap-2 sm:gap-3 w-8 sm:w-10">
                                      <div className="w-full h-[95%] bg-[#fbbf24] rounded-t-sm"></div>
                                      <span className="text-[9px] sm:text-[10px] font-bold text-[#6b7280] uppercase mb-1">Top</span>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Section Performance Box */}
                                <div className="w-full xl:w-2/3 bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm border border-[#e5e7eb] overflow-hidden">
                                  <h4 className="font-bold text-[#111827] text-[14px] sm:text-[15px] mb-4 sm:mb-6">Section Performance</h4>
                                  <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
                                    <table className="w-full text-left min-w-[350px]">
                                      <thead>
                                        <tr className="text-[9px] sm:text-[10px] font-bold text-[#6b7280] uppercase border-b border-[#f3f4f6]">
                                          <th className="pb-2 sm:pb-3">Section</th>
                                          <th className="pb-2 sm:pb-3 text-center">Score</th>
                                          <th className="pb-2 sm:pb-3 text-center">Accuracy</th>
                                          <th className="pb-2 sm:pb-3 text-right">Time</th>
                                        </tr>
                                      </thead>
                                      <tbody className="text-[13px] sm:text-[14px] font-medium text-[#111827]">
                                        <tr className="border-b border-[#f3f4f6]">
                                          <td className="py-3 sm:py-4 font-bold">Quant Ability</td>
                                          <td className="py-3 sm:py-4 text-center">110</td>
                                          <td className="py-3 sm:py-4 text-center text-[#10b981] font-bold">82%</td>
                                          <td className="py-3 sm:py-4 text-right text-[#6b7280]">45m</td>
                                        </tr>
                                        <tr>
                                          <td className="py-3 sm:py-4 font-bold">Verbal Ability</td>
                                          <td className="py-3 sm:py-4 text-center">130</td>
                                          <td className="py-3 sm:py-4 text-center text-[#10b981] font-bold">75%</td>
                                          <td className="py-3 sm:py-4 text-right text-[#6b7280]">70m</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 05: IMPROVE - SWOT Analysis */}
                        {stage.id === "improve" && (
                          <div className="flex flex-col">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-[#5B5BD6] to-[#7676e3] pt-6 sm:pt-8 pb-10 sm:pb-12 px-4 sm:px-8 text-white flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
                              <div>
                                <h2 className="text-[24px] sm:text-[28px] font-bold mb-1 tracking-tight">SWOT Analysis</h2>
                                <p className="text-[13px] sm:text-[14px] text-white/80">Identify your strong suits and immediate areas for improvement.</p>
                              </div>
                              <div className="bg-white/10 border border-white/20 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-[13px] font-bold flex items-center gap-1.5 sm:gap-2 backdrop-blur-sm cursor-pointer whitespace-nowrap">
                                All Tests <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 rotate-90" />
                              </div>
                            </div>
                            
                            {/* KPIs */}
                            <div className="px-4 sm:px-8 -mt-6 sm:-mt-6 mb-5 sm:mb-6">
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                {[
                                  { label: "Attempts", value: "12 Tests" },
                                  { label: "Accuracy", value: "72.5%" },
                                  { label: "Best", value: "QA (MCQ)" },
                                  { label: "Weakest", value: "VARC" },
                                ].map((stat, i) => (
                                  <div key={i} className="bg-white rounded-[10px] sm:rounded-[12px] p-3 sm:p-4 shadow-sm border border-[#e5e7eb]">
                                    <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#6b7280] mb-1 truncate">{stat.label}</div>
                                    <div className="text-[14px] sm:text-[16px] font-bold text-[#111827] truncate">{stat.value}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* SWOT Grid */}
                            <div className="px-4 sm:px-8 flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-5">
                              {/* Strengths */}
                              <div className="bg-[#f0fdf4] rounded-[12px] sm:rounded-[16px] border border-[#bbf7d0] overflow-hidden flex flex-col">
                                <div className="border-l-4 border-[#22c55e] p-4 sm:p-5 flex-1">
                                  <div className="text-[11px] sm:text-[12px] font-bold uppercase tracking-widest text-[#15803d] mb-3 sm:mb-4 flex justify-between items-center">
                                    Strengths
                                  </div>
                                  <div className="space-y-2.5 sm:space-y-3">
                                    <div className="bg-white rounded-lg p-2.5 sm:p-3 shadow-sm border border-[#dcfce7] flex justify-between items-center">
                                      <span className="font-bold text-[#111827] text-[12px] sm:text-[13px]">Number Systems</span>
                                      <span className="text-[11px] sm:text-[12px] font-bold text-[#15803d]">85% Acc</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Weaknesses */}
                              <div className="bg-[#fefce8] rounded-[12px] sm:rounded-[16px] border border-[#fef08a] overflow-hidden flex flex-col">
                                <div className="border-l-4 border-[#eab308] p-4 sm:p-5 flex-1">
                                  <div className="text-[11px] sm:text-[12px] font-bold uppercase tracking-widest text-[#a16207] mb-3 sm:mb-4 flex justify-between items-center">
                                    Weaknesses
                                  </div>
                                  <div className="space-y-2.5 sm:space-y-3">
                                    <div className="bg-white rounded-lg p-2.5 sm:p-3 shadow-sm border border-[#fef08a] flex justify-between items-center">
                                      <span className="font-bold text-[#111827] text-[12px] sm:text-[13px]">Geometry</span>
                                      <span className="text-[11px] sm:text-[12px] font-bold text-[#a16207]">35% Acc</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Opportunities */}
                              <div className="bg-[#eff6ff] rounded-[12px] sm:rounded-[16px] border border-[#bfdbfe] overflow-hidden flex flex-col">
                                <div className="border-l-4 border-[#3b82f6] p-4 sm:p-5 flex-1">
                                  <div className="text-[11px] sm:text-[12px] font-bold uppercase tracking-widest text-[#1d4ed8] mb-3 sm:mb-4 flex justify-between items-center">
                                    Opportunities
                                  </div>
                                  <div className="space-y-2.5 sm:space-y-3">
                                    <div className="bg-white rounded-lg p-2.5 sm:p-3 shadow-sm border border-[#bfdbfe] flex justify-between items-center">
                                      <span className="font-bold text-[#111827] text-[12px] sm:text-[13px]">Modern Math</span>
                                      <span className="text-[11px] sm:text-[12px] font-bold text-[#1d4ed8]">Potential</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Threats */}
                              <div className="bg-[#fef2f2] rounded-[12px] sm:rounded-[16px] border border-[#fecaca] overflow-hidden flex flex-col">
                                <div className="border-l-4 border-[#ef4444] p-4 sm:p-5 flex-1">
                                  <div className="text-[11px] sm:text-[12px] font-bold uppercase tracking-widest text-[#b91c1c] mb-3 sm:mb-4 flex justify-between items-center">
                                    Threats
                                  </div>
                                  <div className="space-y-2.5 sm:space-y-3">
                                    <div className="bg-white rounded-lg p-2.5 sm:p-3 shadow-sm border border-[#fecaca] flex justify-between items-center">
                                      <span className="font-bold text-[#111827] text-[12px] sm:text-[13px]">Reading Comp</span>
                                      <span className="text-[11px] sm:text-[12px] font-bold text-[#b91c1c]">Low Acc</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 06: IIM - IIM Group Photo */}
                        {stage.id === "iim" && (
                          <div className="flex flex-col h-full items-center justify-center p-6 sm:p-8 bg-white/50 relative">
                            {/* Decorative background blur */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
                            
                            <div className="text-center mb-6 sm:mb-8 mt-2 sm:mt-4">
                              <h2 className="text-[28px] sm:text-[32px] font-display font-extrabold text-primary mb-2">The Destination</h2>
                              <p className="text-[#6b7280] text-[14px] sm:text-[16px] max-w-md mx-auto">From day one to campus day, we walk the journey with you.</p>
                            </div>
                            
                            {/* Actual IIM Group Photo */}
                            <div className="w-full max-w-2xl rounded-[16px] sm:rounded-[24px] shadow-xl border border-border overflow-hidden relative group aspect-[16/9] bg-white">
                              <Image 
                                src="/iim-group-new.jpg" 
                                alt="IIM Rohtak Group Photo"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                              />
                            </div>
                          </div>
                        )}

                      </motion.div>
                    )
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
        
        {/* Mobile Expanded Content (shown below portal visual) */}
        <div className="lg:hidden mt-6 bg-white rounded-2xl p-5 border border-border shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStageData.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">What You Do</div>
                <div className="text-[14px] font-medium text-text-primary leading-snug">{activeStageData.whatYouDo}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">StepWise Provides</div>
                <div className="text-[14px] font-medium text-text-primary leading-snug">{activeStageData.stepWiseProvides}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#5B5BD6] mb-1">Outcome</div>
                <div className="text-[14px] font-bold text-[#10b981]">{activeStageData.outcome}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
