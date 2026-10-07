"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Book, FileText, Target, BookOpen, ClipboardCheck, LineChart, LayoutDashboard, MessageCircle, Zap, Users, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

function FreeFeature({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-3.5 group">
      <div className="mt-0.5 text-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
        <Icon className="w-5 h-5 stroke-[2]" />
      </div>
      <div>
        <div className="text-[14px] lg:text-[15px] font-semibold text-text-primary leading-tight mb-1">{title}</div>
        <div className="text-[12px] text-text-secondary font-medium leading-snug">{desc}</div>
      </div>
    </div>
  );
}

function UgatFeature({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3.5">
      <Check className="w-5 h-5 mt-0.5 text-[#10b981] flex-shrink-0 stroke-[2.5px]" />
      <span className="text-[14px] leading-relaxed font-medium text-text-primary">
        {text}
      </span>
    </div>
  );
}

export default function Courses() {
  return (
    <section id="courses" className="py-16 sm:py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary mb-3 sm:mb-4 tracking-tight"
          >
            Preparation built for you.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[16px] sm:text-lg text-text-secondary font-medium"
          >
            Start free. Go deeper when you're ready.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          {/* LEFT: FREE STEPWISE PORTAL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col bg-surface border border-border/50 rounded-[20px] sm:rounded-[24px] p-6 lg:p-10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-[3px] transition-all duration-300 relative lg:order-1 order-1 h-full"
          >
            <div className="mb-6 sm:mb-8">
              <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-text-secondary mb-3 sm:mb-4">FOR EVERY ASPIRANT</div>
              <h3 className="text-[28px] sm:text-[32px] lg:text-[36px] font-display font-bold mb-2 sm:mb-3 text-text-primary tracking-tight leading-tight">Free StepWise Portal</h3>
              <div className="text-[15px] sm:text-[16px] font-semibold text-text-primary mb-2">Everything You Need. All in One Portal.</div>
              <p className="text-[13px] sm:text-[14px] text-text-secondary font-medium leading-relaxed">A complete preparation ecosystem built for IPMAT & UGAT aspirants.</p>
            </div>

            <div className="mb-8 sm:mb-10 flex items-center gap-3 sm:gap-4">
              <span className="text-[40px] sm:text-[48px] font-display font-extrabold text-text-primary leading-none tracking-tight">₹0</span>
              <span className="bg-primary/10 text-primary text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full">Free Access</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-4 sm:gap-y-5 mb-8 sm:mb-10 flex-grow">
              <FreeFeature icon={Book} title="Study Notes" desc="Subject & topic-wise preparation material" />
              <FreeFeature icon={FileText} title="Previous Year Questions" desc="IPMAT, JIPMAT & UGAT PYQs" />
              <FreeFeature icon={Target} title="Topic Tests" desc="Practice every important topic individually" />
              <FreeFeature icon={BookOpen} title="Daily RCs" desc="Regular Reading Comprehension practice" />
              <FreeFeature icon={Target} title="PracSet" desc="Structured practice sets for stronger concepts" />
              <FreeFeature icon={ClipboardCheck} title="Mocks & Sectionals" desc="Full-length mocks and timed sectional practice" />
              <FreeFeature icon={LineChart} title="Post-Test Analysis" desc="Identify mistakes and improve performance" />
              <FreeFeature icon={LayoutDashboard} title="SWOT Analysis" desc="Know your strengths, weaknesses & areas to improve" />
              <FreeFeature icon={MessageCircle} title="Live Doubt Support" desc="Get your doubts resolved whenever you need" />
              <FreeFeature icon={Zap} title="XP System" desc="Track your preparation and stay consistent" />
              <FreeFeature icon={Users} title="Community Support" desc="Learn, discuss and grow with fellow aspirants & mentors" />
            </div>

            <div className="bg-surface-hover/50 rounded-[12px] sm:rounded-[14px] p-3 sm:p-4 mb-6 sm:mb-8 text-center border border-border/50 transition-colors">
              <p className="text-text-primary font-semibold text-[13px] sm:text-[14px] tracking-wide">One Portal. Complete Preparation. Zero Chaos.</p>
            </div>

            <Link href="https://ipmat.stepwiselive.com/" className="w-full py-3 sm:py-4 rounded-[12px] sm:rounded-[14px] text-center transition-all flex items-center justify-center gap-2 group bg-primary text-primary-foreground shadow-sm hover:shadow-[0_4px_20px_rgba(79,70,229,0.25)] mt-auto font-bold text-[15px] sm:text-[16px]">
              Enter Free Portal <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* CENTER: IPMAT ULTRA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col bg-primary rounded-[20px] sm:rounded-[24px] p-6 lg:p-10 shadow-[0_20px_40px_rgba(79,70,229,0.15)] hover:shadow-[0_25px_50px_rgba(79,70,229,0.2)] hover:-translate-y-[3px] transition-all duration-500 relative lg:order-2 order-2 h-full text-primary-foreground z-10 overflow-hidden group border border-primary/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/95 to-primary/95 z-0"></div>
            
            {/* Abstract floating product visuals */}
            <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none overflow-hidden hidden sm:block">
              <div className="absolute top-[55%] left-[5%] w-32 h-20 bg-white/20 rounded-xl border border-white/30 rotate-[-12deg] backdrop-blur-sm transform group-hover:translate-y-[-8px] group-hover:rotate-[-8deg] transition-all duration-700 ease-out"></div>
              <div className="absolute top-[45%] right-[10%] w-40 h-28 bg-white/20 rounded-xl border border-white/30 rotate-[10deg] backdrop-blur-sm transform group-hover:translate-y-[-12px] group-hover:rotate-[12deg] transition-all duration-700 ease-out delay-75"></div>
              <div className="absolute top-[65%] left-[15%] w-48 h-32 bg-white/10 rounded-xl border border-white/20 rotate-[5deg] backdrop-blur-md transform group-hover:translate-y-[-5px] transition-all duration-700 ease-out delay-150"></div>
              <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-[80px] group-hover:bg-white/20 transition-colors duration-700"></div>
            </div>

            <div className="relative z-10 flex flex-col h-full items-center text-center py-6 lg:py-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] px-3 sm:px-4 py-1.5 rounded-[999px] mb-8 sm:mb-12 shadow-[0_0_10px_rgba(255,255,255,0.05)] flex items-center gap-1.5 sm:gap-2 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-80" /> Coming Soon
              </div>

              <h3 className="text-[32px] sm:text-[40px] lg:text-[44px] font-display font-extrabold mb-3 sm:mb-5 tracking-tight text-white drop-shadow-sm leading-none">IPMAT ULTRA</h3>
              
              <div className="text-[16px] sm:text-[18px] lg:text-[20px] font-semibold text-white/90 mb-4 sm:mb-6 tracking-tight">
                Something bigger is coming.
              </div>

              <p className="text-white/70 font-medium text-[13px] sm:text-[14px] lg:text-[15px] leading-relaxed max-w-[280px] mx-auto mb-10 sm:mb-16">
                An upcoming StepWise experience designed to take IPMAT preparation to the next level.
              </p>

              <div className="mt-auto w-full pt-6 sm:pt-8">
                <a href="https://chat.whatsapp.com/DIqcKz4NSPNJhkpVluDzn4" target="_blank" rel="noopener noreferrer" className="w-full py-3 sm:py-4 rounded-[12px] sm:rounded-[14px] font-bold text-[15px] sm:text-[16px] text-center transition-all flex items-center justify-center gap-2 group/btn bg-white text-primary hover:bg-surface-hover shadow-lg">
                  Notify Me <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: UGAT PREPARATION BATCH */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col bg-surface border border-border/50 rounded-[20px] sm:rounded-[24px] p-6 lg:p-10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-[3px] transition-all duration-300 relative lg:order-3 order-3 h-full"
          >
            <div className="mb-6 sm:mb-8">
              <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-text-secondary mb-3 sm:mb-4">FOR SERIOUS UGAT ASPIRANTS</div>
              
              <div className="inline-flex items-center justify-center bg-[#f97316]/10 text-[#ea580c] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-5">
                UGAT PHODANA HAI?
              </div>
              
              <h3 className="text-[28px] sm:text-[32px] lg:text-[36px] font-display font-bold mb-2 sm:mb-3 text-text-primary tracking-tight leading-tight">UGAT Preparation Batch</h3>
              <p className="text-[13px] sm:text-[14px] font-medium text-text-secondary leading-relaxed">UGAT-Specific Preparation • Practice • Mocks • Community Support</p>
            </div>

            <div className="mb-8 sm:mb-10 flex flex-col items-start gap-1">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-[18px] sm:text-[20px] font-semibold text-text-muted line-through decoration-text-muted/40">₹499</span>
                <span className="text-[40px] sm:text-[48px] font-display font-extrabold text-text-primary leading-none tracking-tight">₹249</span>
              </div>
              <div className="bg-[#10b981]/10 text-[#10b981] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] px-2.5 sm:px-3 py-1 rounded-full mt-2">
                Launch Offer
              </div>
            </div>

            <div className="flex-grow space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              <UgatFeature text="10 Full-Length UGAT Mock Tests" />
              <UgatFeature text="UGAT-Specific Calculus Topic Tests" />
              <UgatFeature text="UGAT-Specific Algebra Topic Tests" />
              <UgatFeature text="LRDI Sectional Sets" />
              <UgatFeature text="UGAT-Specific RCs" />
              <UgatFeature text="24/7 Community Support" />
              <UgatFeature text="Complete Preparation Resources on the Portal" />
              
              <div className="pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-border/60">
                <p className="text-text-primary font-semibold text-[13px] sm:text-[14px] leading-snug">Everything you need to prepare for UGAT — in one place.</p>
              </div>
            </div>

            <Link href="/courses/ugat" className="w-full py-3 sm:py-4 rounded-[12px] sm:rounded-[14px] font-bold text-[15px] sm:text-[16px] text-center transition-all flex items-center justify-center gap-2 group border border-border/80 hover:border-primary hover:bg-brand-soft text-primary bg-surface mt-auto">
              Enroll Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
