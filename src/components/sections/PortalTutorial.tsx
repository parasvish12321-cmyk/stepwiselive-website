"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, BookOpen, Target, FileSignature, 
  PieChart, TrendingUp, Award, Clock, ArrowRight, ChevronRight, Search 
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const TUTORIAL_STEPS = [
  {
    id: "enter",
    num: "01",
    label: "ENTER",
    title: "Enter Your StepWise Portal",
    desc: "Your preparation starts from one dashboard, where your learning, practice and performance come together.",
    icon: LayoutDashboard,
  },
  {
    id: "learn",
    num: "02",
    label: "LEARN",
    title: "Learn with Study Notes",
    desc: "Find your subject and topic-wise preparation material in one organized space.",
    icon: BookOpen,
  },
  {
    id: "practice",
    num: "03",
    label: "PRACTICE",
    title: "Practice with PracSets",
    desc: "Turn concepts into solving ability with structured topic-wise practice.",
    icon: Target,
  },
  {
    id: "test",
    num: "04",
    label: "TEST",
    title: "Test Yourself",
    desc: "Experience exam-like pressure with full-length mocks and sectional tests.",
    icon: FileSignature,
  },
  {
    id: "analyse",
    num: "05",
    label: "ANALYSE",
    title: "Understand Your Performance",
    desc: "Your mock is only the beginning. The real improvement starts with understanding your mistakes.",
    icon: PieChart,
  },
  {
    id: "improve",
    num: "06",
    label: "IMPROVE",
    title: "Know What to Improve",
    desc: "Turn performance data into a clearer improvement strategy.",
    icon: TrendingUp,
  },
  {
    id: "progress",
    num: "07",
    label: "PROGRESS",
    title: "Track Your Progress",
    desc: "Every step counts. Track your preparation and stay consistent.",
    icon: Award,
  },
  {
    id: "habit",
    num: "08",
    label: "DAILY HABIT",
    title: "Build the Daily Habit",
    desc: "Make preparation consistent with regular reading and daily practice.",
    icon: Clock,
  }
];

export default function PortalTutorial() {
  const [activeStepId, setActiveStepId] = useState(TUTORIAL_STEPS[0].id);
  const [isInteracting, setIsInteracting] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const activeIndex = TUTORIAL_STEPS.findIndex(s => s.id === activeStepId);
  const activeStep = TUTORIAL_STEPS[activeIndex];

  // Auto-play logic
  useEffect(() => {
    if (isInteracting) {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      return;
    }

    autoplayRef.current = setInterval(() => {
      setActiveStepId(prev => {
        const currIdx = TUTORIAL_STEPS.findIndex(s => s.id === prev);
        const nextIdx = (currIdx + 1) % TUTORIAL_STEPS.length;
        return TUTORIAL_STEPS[nextIdx].id;
      });
    }, 6000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isInteracting]);

  const handleStepClick = (id: string) => {
    setIsInteracting(true);
    setActiveStepId(id);
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="portal-tutorial">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-primary mb-6 tracking-tight">
            Inside StepWise
          </h2>
          <p className="text-[16px] sm:text-[18px] text-text-secondary leading-relaxed">
            See exactly how StepWise helps you learn, practice, test, analyse and improve.
          </p>
        </div>

        {/* Main Grid: Left Navigation + Right Preview */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 mb-20">
          
          {/* Left Navigation (Desktop) / Horizontal (Mobile) */}
          <div className="w-full lg:w-[30%] xl:w-[25%] flex flex-col shrink-0">
            
            {/* Mobile Swipe Navigation */}
            <div className="flex lg:hidden overflow-x-auto scrollbar-hide gap-3 pb-4 mb-4 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
              {TUTORIAL_STEPS.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={cn(
                    "flex-shrink-0 w-[240px] snap-center rounded-[16px] p-5 text-left border transition-all duration-300",
                    activeStepId === step.id 
                      ? "bg-white border-primary shadow-md" 
                      : "bg-surface border-border opacity-70 hover:opacity-100"
                  )}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-colors",
                      activeStepId === step.id ? "bg-primary text-white" : "bg-[#f3f4f6] text-[#6b7280]"
                    )}>
                      {step.num}
                    </div>
                    <div className={cn(
                      "text-[10px] font-bold uppercase tracking-widest",
                      activeStepId === step.id ? "text-primary" : "text-[#6b7280]"
                    )}>
                      {step.label}
                    </div>
                  </div>
                  <h4 className="font-bold text-[#111827] text-[15px] mb-2">{step.title}</h4>
                  <p className="text-[13px] text-[#6b7280] line-clamp-2">{step.desc}</p>
                </button>
              ))}
            </div>

            {/* Desktop Vertical Navigation */}
            <div className="hidden lg:flex flex-col gap-2 relative">
              {/* Progress Track Line */}
              <div className="absolute left-[23px] top-8 bottom-8 w-px bg-border -z-10"></div>
              
              {TUTORIAL_STEPS.map((step, idx) => {
                const isActive = activeStepId === step.id;
                const isPast = idx < activeIndex;
                
                return (
                  <div
                    key={step.id}
                    onClick={() => handleStepClick(step.id)}
                    className={cn(
                      "group flex items-start gap-5 p-4 rounded-2xl cursor-pointer transition-all duration-300",
                      isActive ? "bg-white shadow-sm border border-[#e5e7eb] scale-[1.02] z-10" : "hover:bg-surface border border-transparent"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300 bg-white",
                      isActive ? "border-primary text-primary" : isPast ? "border-success text-success" : "border-[#e5e7eb] text-[#9ca3af]"
                    )}>
                      <step.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className={cn(
                        "text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors",
                        isActive ? "text-primary" : isPast ? "text-success" : "text-[#9ca3af]"
                      )}>
                        {step.label}
                      </div>
                      <h4 className={cn(
                        "font-bold text-[15px] mb-1.5 transition-colors",
                        isActive ? "text-[#111827]" : "text-[#4b5563]"
                      )}>{step.title}</h4>
                      
                      <AnimatePresence>
                        {isActive && (
                          <motion.p 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="text-[13px] text-[#6b7280] leading-relaxed overflow-hidden"
                          >
                            {step.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Portal Preview (The actual browser) */}
          <div className="flex-1 flex flex-col items-center">
            
            {/* Progress indicator */}
            <div className="w-full flex items-center justify-between mb-4 px-2">
              <div className="text-[12px] font-bold text-text-secondary uppercase tracking-widest">
                Step {activeStep.num} of 08
              </div>
              <div className="flex gap-1.5">
                {TUTORIAL_STEPS.map((s, i) => (
                  <div key={s.id} className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    s.id === activeStepId ? "w-8 bg-primary" : "w-2 bg-border"
                  )} />
                ))}
              </div>
            </div>

            {/* Browser Window */}
            <div 
              className="w-full bg-[#f8f9fa] rounded-[20px] shadow-[0_20px_60px_rgba(20,26,60,0.1)] overflow-hidden border border-border flex flex-col relative h-[550px] sm:h-[650px]"
              onMouseEnter={() => setIsInteracting(true)}
              onMouseLeave={() => setIsInteracting(false)}
            >
              {/* Browser Header */}
              <div className="bg-white border-b border-[#e5e7eb] px-4 py-3 flex items-center shrink-0">
                <div className="flex gap-2 w-20">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="bg-[#f1f3f5] rounded-md px-4 py-1.5 text-[10px] font-bold tracking-widest text-[#9ca3af] uppercase flex-1 max-w-[400px] flex items-center justify-center gap-2 mx-auto">
                  <Search className="w-3 h-3" />
                  IPMAT.STEPWISELIVE.COM/DASHBOARD
                </div>
                <div className="w-20"></div>
              </div>

              {/* Portal Body */}
              <div className="flex flex-1 overflow-hidden relative">
                
                {/* Portal Sidebar */}
                <div className="w-[60px] sm:w-[180px] bg-[#f8f7f4] border-r border-[#e6e4df] flex flex-col z-20 shrink-0 py-4">
                  {/* Logo */}
                  <div className="flex items-center justify-center sm:justify-start sm:px-5 mb-8">
                    <img src="/logo.png" alt="StepWise" className="w-[110px] hidden sm:block" />
                    <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center font-bold sm:hidden">S</div>
                  </div>
                  
                  {/* Navigation Links with Hotspots */}
                  <div className="flex flex-col gap-2 sm:gap-1 px-2 sm:px-3">
                    {[
                      { id: "enter", label: "Dashboard", icon: LayoutDashboard },
                      { id: "learn", label: "Study Notes", icon: BookOpen },
                      { id: "practice", label: "PracSets", icon: Target },
                      { id: "test", label: "Mock Tests", icon: FileSignature },
                      { id: "analyse", label: "Post Mock Analysis", icon: PieChart },
                      { id: "improve", label: "SWOT Analysis", icon: TrendingUp },
                      { id: "progress", label: "XP System", icon: Award },
                      { id: "habit", label: "Daily RC", icon: Clock },
                    ].map((navItem) => {
                      const isActive = activeStepId === navItem.id;
                      return (
                        <div 
                          key={navItem.id}
                          onClick={() => handleStepClick(navItem.id)}
                          className={cn(
                            "relative flex items-center justify-center sm:justify-start gap-3 w-10 h-10 sm:w-full sm:h-auto sm:px-3 sm:py-2.5 rounded-[10px] cursor-pointer transition-all duration-300",
                            isActive ? "bg-[#5271ff] text-white shadow-sm" : "text-[#4b5563] hover:bg-black/5"
                          )}
                        >
                          <navItem.icon className={cn("w-[18px] h-[18px] shrink-0", isActive ? "text-white" : "text-[#6b7280]")} />
                          <span className={cn("hidden sm:block text-[13px] font-medium", isActive ? "text-white" : "text-[#4b5563]")}>
                            {navItem.label}
                          </span>
                          
                          {/* Pulsing Hotspot if NOT active, to invite click */}
                          {!isActive && (
                            <div className="absolute -right-1 -top-1 sm:right-2 sm:top-auto w-2 h-2 rounded-full bg-[#ffbd2e] animate-pulse opacity-0 group-hover:opacity-100 hidden sm:block"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Portal Main Content Area */}
                <div className="flex-1 bg-[#f4f3ef] overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStepId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 overflow-y-auto custom-scrollbar p-5 sm:p-8 pb-20"
                    >
                      {/* 01: ENTER */}
                      {activeStepId === "enter" && (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-2xl font-bold text-[#111827]">Good morning, Aarav</h3>
                              <p className="text-[14px] text-[#6b7280]">Welcome back to your preparation hub.</p>
                            </div>
                            <div className="hidden sm:block w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">A</div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
                              <div className="text-[11px] font-bold uppercase text-primary mb-2 tracking-widest">Next Up</div>
                              <div className="font-bold text-[16px] mb-1">PracSet: Number Systems</div>
                              <div className="text-[13px] text-text-secondary">Resume where you left off.</div>
                            </div>
                            <div className="bg-[#6B6BE5] p-5 rounded-2xl text-white shadow-sm relative overflow-hidden">
                              <div className="relative z-10">
                                <div className="text-[11px] font-bold uppercase text-white/80 mb-2 tracking-widest">Your Streak</div>
                                <div className="text-3xl font-extrabold mb-1">12 Days 🔥</div>
                                <div className="text-[13px] text-white/90">Keep it going!</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-2xl border border-border p-6 text-center">
                            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                              <Target className="w-8 h-8 text-primary" />
                            </div>
                            <h4 className="font-bold text-[18px] mb-2">Ready to start?</h4>
                            <p className="text-text-secondary text-[14px] mb-4">Navigate using the sidebar to explore your study tools.</p>
                          </div>
                        </div>
                      )}

                      {/* 02: LEARN */}
                      {activeStepId === "learn" && (
                        <div className="space-y-6">
                          <div className="bg-[#6B6BE5] rounded-[16px] p-6 sm:p-8 text-white relative overflow-hidden">
                            <div className="relative z-10">
                              <h2 className="text-[28px] font-bold mb-2">Study Notes</h2>
                              <p className="text-[14px] text-white/90 max-w-md">Curated notes from your mentors. Structured and organized for quick revision.</p>
                            </div>
                            <BookOpen className="absolute right-4 -bottom-4 w-32 h-32 text-white/10" />
                          </div>
                          
                          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {['Quant Ability', 'Verbal Ability', 'Logical Reasoning'].map((f, i) => (
                              <div key={i} className={cn(
                                "px-4 py-2 rounded-full text-[13px] font-bold shrink-0 shadow-sm border",
                                i === 0 ? "bg-primary text-white border-primary" : "bg-white text-text-secondary border-border"
                              )}>
                                {f}
                              </div>
                            ))}
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                              { t: "Functions & Graphs", d: "12 pages" },
                              { t: "Coordinate Geometry", d: "18 pages" },
                              { t: "Number Systems", d: "24 pages" },
                              { t: "Modern Math", d: "10 pages" }
                            ].map((note, i) => (
                              <div key={i} className="bg-white rounded-xl p-5 border border-border shadow-sm flex flex-col justify-between h-32 hover:border-primary/50 transition-colors cursor-pointer">
                                <div>
                                  <div className="text-[10px] font-bold text-primary uppercase mb-1">Quantitative Ability</div>
                                  <div className="font-bold text-[15px]">{note.t}</div>
                                </div>
                                <div className="flex justify-between items-center text-[12px] font-bold text-text-secondary">
                                  {note.d}
                                  <span className="text-primary flex items-center gap-1">Open <ArrowRight className="w-3 h-3" /></span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 03: PRACTICE */}
                      {activeStepId === "practice" && (
                        <div className="space-y-6">
                          <div className="bg-white rounded-[16px] p-6 border border-border shadow-sm">
                            <h2 className="text-[24px] font-bold mb-2">PracSets</h2>
                            <p className="text-[14px] text-text-secondary">Chapter-wise short practice tests. Bite-sized, focused, and quick to attempt.</p>
                          </div>
                          
                          <div className="space-y-4">
                            {[
                              { t: "Active & Passive Voice", s: "VARC", q: "15 questions", time: "90 min" },
                              { t: "Time, Speed & Distance", s: "Quant", q: "20 questions", time: "45 min" }
                            ].map((set, i) => (
                              <div key={i} className="bg-white rounded-xl p-5 border border-border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase">{set.s}</span>
                                    <h4 className="font-bold text-[16px]">{set.t}</h4>
                                  </div>
                                  <div className="text-[12px] text-text-secondary flex gap-2">
                                    {set.q} • {set.time} • <span className="text-success font-bold">New</span>
                                  </div>
                                </div>
                                <button className="bg-primary text-white text-[13px] font-bold px-6 py-2.5 rounded-lg whitespace-nowrap w-full sm:w-auto hover:opacity-90">
                                  Start Practice
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 04: TEST */}
                      {activeStepId === "test" && (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-border shadow-sm">
                            <div>
                              <h2 className="text-[24px] font-bold mb-1">Mock Tests</h2>
                              <p className="text-[13px] text-text-secondary">Simulate the actual exam environment.</p>
                            </div>
                            <FileSignature className="w-10 h-10 text-text-secondary/20" />
                          </div>

                          <div className="space-y-4">
                            <div className="bg-white rounded-xl p-5 border border-border shadow-sm relative overflow-hidden">
                              {/* Left color bar */}
                              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-success"></div>
                              <div className="pl-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="bg-surface text-text-secondary px-2 py-0.5 rounded text-[10px] font-bold uppercase border">Full Mock</span>
                                  <h4 className="font-bold text-[16px]">IPMAT Rohtak Mock 01</h4>
                                </div>
                                <div className="text-[12px] text-text-secondary mb-3">120 qs • 120 min • 480 marks</div>
                                <div className="flex items-center gap-3">
                                  <div className="text-[11px] font-bold text-success bg-success/10 px-2 py-1 rounded">Score: 240 / 480</div>
                                  <button className="text-[13px] font-bold text-primary hover:underline">View Analysis →</button>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-white rounded-xl p-5 border border-border shadow-sm relative overflow-hidden">
                              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
                              <div className="pl-3 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="bg-surface text-text-secondary px-2 py-0.5 rounded text-[10px] font-bold uppercase border">Full Mock</span>
                                    <h4 className="font-bold text-[16px]">IPMAT Indore Mock 03</h4>
                                  </div>
                                  <div className="text-[12px] text-text-secondary">90 qs • 120 min • 360 marks</div>
                                </div>
                                <button className="bg-primary text-white text-[13px] font-bold px-6 py-2 rounded-lg">Start Mock</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 05: ANALYSE */}
                      {activeStepId === "analyse" && (
                        <div className="space-y-4">
                          <div className="bg-[#111827] text-white p-6 rounded-2xl shadow-sm">
                            <div className="text-[12px] text-white/70 uppercase tracking-widest font-bold mb-1">Performance Report</div>
                            <h2 className="text-[24px] font-bold mb-6">IPMAT Rohtak Mock 01</h2>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                                <div className="text-[10px] text-white/70 uppercase font-bold mb-1">Score</div>
                                <div className="text-[24px] font-bold">240<span className="text-[12px] text-white/50">/480</span></div>
                              </div>
                              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                                <div className="text-[10px] text-white/70 uppercase font-bold mb-1">Rank</div>
                                <div className="text-[24px] font-bold">42<span className="text-[12px] text-white/50">/850</span></div>
                              </div>
                              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                                <div className="text-[10px] text-white/70 uppercase font-bold mb-1">Accuracy</div>
                                <div className="text-[24px] font-bold text-success">78%</div>
                              </div>
                              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                                <div className="text-[10px] text-white/70 uppercase font-bold mb-1">Percentile</div>
                                <div className="text-[24px] font-bold text-[#ffbd2e]">95.2</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
                            <h3 className="font-bold text-[15px] mb-4">Sectional Breakdown</h3>
                            <div className="space-y-3">
                              {[
                                { n: "Quantitative Ability", s: "110", p: "w-[75%]", c: "bg-primary" },
                                { n: "Verbal Ability", s: "130", p: "w-[85%]", c: "bg-success" }
                              ].map((sec, i) => (
                                <div key={i}>
                                  <div className="flex justify-between text-[12px] font-bold mb-1">
                                    <span>{sec.n}</span>
                                    <span>{sec.s} marks</span>
                                  </div>
                                  <div className="h-2 w-full bg-surface rounded-full overflow-hidden">
                                    <div className={cn("h-full", sec.p, sec.c)}></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 06: IMPROVE */}
                      {activeStepId === "improve" && (
                        <div className="space-y-4">
                          <div className="bg-white p-5 rounded-2xl border border-border shadow-sm mb-2">
                            <h2 className="text-[20px] font-bold">SWOT Analysis</h2>
                            <p className="text-[13px] text-text-secondary">Based on your last 5 mocks.</p>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-[#f0fdf4] border border-[#bbf7d0] p-5 rounded-xl border-l-4 border-l-[#22c55e]">
                              <h3 className="text-[12px] font-bold text-[#15803d] uppercase tracking-widest mb-3">Strengths</h3>
                              <div className="bg-white p-2.5 rounded shadow-sm text-[13px] font-bold flex justify-between">
                                <span>Number Systems</span> <span className="text-[#15803d]">85% Acc</span>
                              </div>
                            </div>
                            <div className="bg-[#fefce8] border border-[#fef08a] p-5 rounded-xl border-l-4 border-l-[#eab308]">
                              <h3 className="text-[12px] font-bold text-[#a16207] uppercase tracking-widest mb-3">Weaknesses</h3>
                              <div className="bg-white p-2.5 rounded shadow-sm text-[13px] font-bold flex justify-between">
                                <span>Geometry</span> <span className="text-[#a16207]">35% Acc</span>
                              </div>
                            </div>
                            <div className="bg-[#eff6ff] border border-[#bfdbfe] p-5 rounded-xl border-l-4 border-l-[#3b82f6]">
                              <h3 className="text-[12px] font-bold text-[#1d4ed8] uppercase tracking-widest mb-3">Opportunities</h3>
                              <div className="bg-white p-2.5 rounded shadow-sm text-[13px] font-bold flex justify-between">
                                <span>Modern Math</span> <span className="text-[#1d4ed8]">Potential</span>
                              </div>
                            </div>
                            <div className="bg-[#fef2f2] border border-[#fecaca] p-5 rounded-xl border-l-4 border-l-[#ef4444]">
                              <h3 className="text-[12px] font-bold text-[#b91c1c] uppercase tracking-widest mb-3">Threats</h3>
                              <div className="bg-white p-2.5 rounded shadow-sm text-[13px] font-bold flex justify-between">
                                <span>Reading Comp</span> <span className="text-[#b91c1c]">Low Acc</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 07: PROGRESS */}
                      {activeStepId === "progress" && (
                        <div className="space-y-4">
                          <div className="bg-gradient-to-br from-[#5271ff] to-[#7a95ff] p-8 rounded-2xl text-white text-center shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                            <Award className="w-16 h-16 mx-auto mb-4 text-[#ffeba3]" />
                            <div className="text-[12px] font-bold uppercase tracking-widest text-white/80 mb-1">Current XP</div>
                            <div className="text-[48px] font-extrabold leading-none mb-4 tracking-tight">2,450</div>
                            
                            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm max-w-sm mx-auto text-left">
                              <div className="flex justify-between text-[11px] font-bold uppercase mb-2">
                                <span>Bronze Rank</span>
                                <span>Silver Rank</span>
                              </div>
                              <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden mb-2">
                                <div className="h-full bg-[#fbdc5c] w-[65%] shadow-[0_0_10px_#fbdc5c]"></div>
                              </div>
                              <div className="text-[11px] text-white/80 text-center">150 XP needed to rank up</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 08: HABIT */}
                      {activeStepId === "habit" && (
                        <div className="space-y-4">
                          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-sm flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-[#eff6ff] text-[#3b82f6] rounded-full flex items-center justify-center mb-4">
                              <BookOpen className="w-8 h-8" />
                            </div>
                            <h2 className="text-[24px] font-bold mb-2">Daily RC</h2>
                            <p className="text-[14px] text-text-secondary max-w-sm mx-auto mb-6">Read one passage a day. Improve your reading speed and comprehension consistently.</p>
                            
                            <div className="w-full bg-surface p-4 rounded-xl border border-border text-left mb-6">
                              <div className="text-[11px] font-bold text-primary uppercase mb-1">Today's RC • 8th Oct</div>
                              <div className="font-bold text-[15px] mb-2">The Philosophy of Stoicism</div>
                              <div className="text-[12px] text-text-secondary">Read passage • 8 qs • 16 min</div>
                            </div>
                            
                            <button className="bg-primary text-white font-bold px-8 py-3 rounded-xl shadow-md hover:scale-105 transition-transform">
                              Attempt Today's RC
                            </button>
                          </div>
                        </div>
                      )}

                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Flow diagram and CTA */}
        <div className="max-w-4xl mx-auto text-center border-t border-border pt-16">
          <h3 className="text-[20px] font-bold text-primary mb-2">Everything has a place. Every step has a purpose.</h3>
          <p className="text-[14px] text-text-secondary mb-10 max-w-2xl mx-auto">
            From your first Study Note to your latest mock analysis, StepWise keeps your preparation moving forward without friction.
          </p>
          
          {/* How it connects map (Desktop only visualization) */}
          <div className="hidden md:flex items-center justify-center gap-3 text-[11px] font-bold text-text-secondary mb-12 flex-wrap">
            <span className="bg-surface px-3 py-1.5 rounded-full border">STUDY NOTES</span>
            <ArrowRight className="w-3 h-3 text-border" />
            <span className="bg-surface px-3 py-1.5 rounded-full border">PRACSETS</span>
            <ArrowRight className="w-3 h-3 text-border" />
            <span className="bg-surface px-3 py-1.5 rounded-full border">MOCK TESTS</span>
            <ArrowRight className="w-3 h-3 text-border" />
            <span className="bg-surface px-3 py-1.5 rounded-full border">POST MOCK ANALYSIS</span>
            <ArrowRight className="w-3 h-3 text-border" />
            <span className="bg-surface px-3 py-1.5 rounded-full border">SWOT</span>
            <ArrowRight className="w-3 h-3 text-border" />
            <span className="bg-[#111827] text-white px-3 py-1.5 rounded-full shadow-sm">IIM</span>
          </div>

          <a 
            href="https://ipmat.stepwiselive.com/dashboard" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Enter Student Portal <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
