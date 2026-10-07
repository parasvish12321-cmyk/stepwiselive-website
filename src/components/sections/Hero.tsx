"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, TrendingUp, Users, Target, Bell, LayoutDashboard, FileText, Search, Flame } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ExamCountdown } from "@/components/ui/ExamCountdown";

const TRUST_ITEMS = [
  { icon: Users, label: "Built by IPM students" },
  { icon: Target, label: "Personalized Mentorship" },
  { icon: CheckCircle2, label: "Smart Practice" },
  { icon: TrendingUp, label: "Performance Tracking" },
];

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Portal-inspired gradient background applied to Hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-[#8b98ff] -z-10" />
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(255,204,77,0.4),_transparent_60%)] -z-10 mix-blend-overlay" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left text-white">

            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold leading-[1.1] tracking-tight mb-6"
            >
              Your IIM Journey.<br />
              <span className="text-accent">One Step at a Time.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[15px] sm:text-[16px] lg:text-[17px] font-medium text-white/90 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              A personalized IPMAT preparation ecosystem built by people who understand the journey from the aspirant’s side.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10 lg:mb-12"
            >
              <Link
                href="#courses"
                className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-[12px] text-[15px] font-bold hover:bg-[#ffe27a] transition-all duration-300 shadow-[0_6px_18px_rgba(255,204,77,0.35)] hover:-translate-y-[1px] min-h-[48px]"
              >
                Explore StepWise
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="#predictor"
                className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-3.5 rounded-[12px] text-[15px] font-bold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm hover:-translate-y-[1px] min-h-[48px]"
              >
                Try IIM Call Predictor
                <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </motion.div>
            
            {/* Trust Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-4"
            >
              {TRUST_ITEMS.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-[13px] text-white/80 font-bold group cursor-default transition-all duration-300 hover:text-white hover:-translate-y-[1px]">
                  <item.icon className="w-4 h-4 text-success group-hover:scale-110 transition-transform duration-300" />
                  {item.label}
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Interactive Product Visual - Mimicking Portal Dash */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full lg:w-1/2 relative perspective-1000 mt-8 lg:mt-0"
          >
            <div className="relative z-10 bg-surface rounded-[20px] shadow-[0_12px_30px_rgba(20,26,60,0.18)] border border-border overflow-hidden rotate-y-[-5deg] rotate-x-[5deg] transform-style-3d hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out">
              
              {/* Sidebar + Main structure illusion */}
              <div className="flex h-[480px] sm:h-[550px] w-full font-sans text-left bg-[#f4f3ef] cursor-default">
                
                {/* Actual Sidebar from portal */}
                <div className="w-[60px] sm:w-[150px] lg:w-[170px] bg-[#f8f7f4] border-r border-[#e6e4df] p-3 sm:p-5 flex flex-col shrink-0 z-20">
                  {/* Brand */}
                  <div className="flex items-center justify-center sm:justify-start mb-6 hover:opacity-90 transition-opacity">
                    <img 
                      src="/logo.png" 
                      alt="StepWise" 
                      className="w-[30px] sm:w-[120px] h-auto object-contain hidden sm:block"
                    />
                    {/* Small screen logo fallback icon */}
                    <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center font-bold sm:hidden">S</div>
                  </div>
                  
                  {/* Search */}
                  <div className="h-8 rounded-lg bg-white border border-[#e6e4df] mb-6 hidden sm:flex items-center px-2.5 gap-2 hover:border-[#d1d5db] transition-colors group">
                    <Search className="w-3.5 h-3.5 text-[#9ca3af] group-hover:text-[#6b7280] transition-colors" />
                    <span className="text-[11px] text-[#9ca3af] group-hover:text-[#6b7280] transition-colors">Find anything...</span>
                  </div>
                  
                  {/* Navigation */}
                  <div className="text-[10px] font-bold text-[#9ca3af] mb-2 hidden sm:block tracking-widest uppercase">Platform</div>
                  <div className="flex flex-col gap-2 sm:gap-1 text-[13px] font-medium text-[#4b5563] items-center sm:items-stretch">
                    <div className="bg-[#5271ff] text-white flex items-center justify-center sm:justify-start gap-3 w-10 h-10 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-[10px] shadow-sm cursor-pointer hover:bg-[#4661e5] transition-colors" title="Dashboard">
                      <LayoutDashboard className="w-4 h-4 shrink-0" />
                      <span className="hidden sm:block">Dashboard</span>
                    </div>
                    <div className="hover:bg-black/5 flex items-center justify-center sm:justify-start gap-3 w-10 h-10 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-[10px] cursor-pointer transition-colors group" title="Daily RC">
                      <FileText className="w-4 h-4 shrink-0 text-[#6b7280] group-hover:text-[#374151]" />
                      <span className="hidden sm:block group-hover:text-[#374151]">Daily RC</span>
                    </div>
                    <div className="hover:bg-black/5 flex items-center justify-center sm:justify-start gap-3 w-10 h-10 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-[10px] cursor-pointer transition-colors group" title="Mock Tests">
                      <Target className="w-4 h-4 shrink-0 text-[#6b7280] group-hover:text-[#374151]" />
                      <span className="hidden sm:block group-hover:text-[#374151]">Mock Tests</span>
                    </div>
                    <div className="hover:bg-black/5 flex items-center justify-center sm:justify-start gap-3 w-10 h-10 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-[10px] cursor-pointer transition-colors group" title="Sectionals">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-[#6b7280] group-hover:text-[#374151]" />
                      <span className="hidden sm:block group-hover:text-[#374151]">Sectionals</span>
                    </div>
                  </div>
                  
                  {/* User Profile */}
                  <div className="mt-auto hidden sm:flex items-center gap-3 bg-white p-2.5 rounded-xl border border-[#e6e4df] shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="w-7 h-7 rounded-full bg-[#5271ff] text-white flex items-center justify-center font-bold text-[12px] shrink-0">A</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-bold text-[#1f2937] leading-tight truncate">Aarav M.</div>
                      <div className="text-[10px] text-[#6b7280] capitalize">student</div>
                    </div>
                  </div>
                </div>

                {/* Main View */}
                <div className="flex-1 p-4 sm:p-6 lg:p-7 overflow-y-auto overflow-x-hidden scrollbar-hide relative">
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5 sm:mb-6">
                    <div>
                      <h3 className="text-lg sm:text-2xl font-bold text-[#111827] mb-1 tracking-tight">Good morning, Aarav</h3>
                      <p className="text-[12px] sm:text-[14px] text-[#6b7280]">Here's what's new for you today.</p>
                    </div>
                  </div>
                  
                  {/* Top Grid: XP + Exams */}
                  <div className="flex flex-col gap-4 mb-4">
                    {/* Gamification / XP Card */}
                    <div className="bg-gradient-to-br from-[#5271ff] to-[#7a95ff] rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 text-white flex flex-col justify-between relative overflow-hidden shadow-[0_8px_30px_rgba(82,113,255,0.15)] group hover:-translate-y-[2px] transition-all duration-300">
                      {/* Subdued Glow effect */}
                      <div className="absolute top-0 right-0 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-white/10 blur-[60px] rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-white/15 transition-colors duration-500"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                          <div className="bg-white/20 backdrop-blur-md text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-1 rounded-md border border-white/10 shadow-sm whitespace-nowrap">Bronze Tier</div>
                          <span className="text-[10px] sm:text-[11px] opacity-80 font-medium truncate">Rank based on your recent mocks</span>
                        </div>
                        
                        <div className="text-[28px] sm:text-[36px] font-extrabold leading-none tracking-tight mb-2">2,450 XP</div>
                        <div className="text-[11px] sm:text-[13px] opacity-90 mb-4 sm:mb-5 font-medium">Reach Silver to unlock: 1 free sectional test</div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-[9px] sm:text-[11px] opacity-90 font-bold tracking-wide uppercase">
                            <span>Bronze · 0 XP</span>
                            <span>Silver · 150 XP</span>
                          </div>
                          <div className="h-2 bg-black/10 rounded-full overflow-hidden shadow-inner border border-white/5">
                            <div className="w-[65%] h-full bg-gradient-to-r from-[#fbdc5c] to-[#ffeba3] rounded-full shadow-[0_0_12px_rgba(251,220,92,0.6)] relative overflow-hidden">
                               <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] -skew-x-12"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Exam Cards */}
                    <div className="flex flex-col gap-3 sm:gap-4">
                      {/* IIMB UGAT */}
                      <ExamCountdown examName="IIMB UGAT" label="Upcoming Exam" />
                    </div>
                  </div>
                  
                  {/* Bottom row */}
                  <div className="flex flex-col gap-4 pb-2">
                    {/* Daily RC */}
                    <div className="bg-white rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 border border-[#e6e4df] shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between group hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[1px]">
                       <div>
                         <div className="flex justify-between items-center mb-3 sm:mb-4">
                           <h4 className="font-bold text-[#111827] text-[14px] sm:text-[16px]">Daily RC</h4>
                         </div>
                         <div className="mb-4 sm:mb-6">
                           <div className="font-bold text-[#111827] text-[13px] sm:text-[15px] mb-1 leading-tight group-hover:text-[#5271ff] transition-colors">IIMB UGAT RC – 8th October</div>
                           <div className="text-[12px] sm:text-[13px] text-[#6b7280] leading-relaxed line-clamp-2">Read the passage carefully, then answer 8 questions in 16 minutes.</div>
                         </div>
                       </div>
                       <div className="flex items-center gap-3 sm:gap-4 mt-auto pt-2">
                         <a href="https://ipmat.stepwiselive.com/mocks?type=daily-rc" target="_blank" rel="noopener noreferrer" className="bg-[#5271ff] text-white text-[12px] sm:text-[13px] font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow-[0_4px_14px_rgba(82,113,255,0.35)] hover:bg-[#4661e5] hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(82,113,255,0.4)] transition-all active:scale-95 whitespace-nowrap">Attempt now</a>
                         <span className="text-[#5271ff] text-[12px] sm:text-[13px] font-bold cursor-pointer hover:underline underline-offset-2 whitespace-nowrap">View all</span>
                       </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl z-0"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

