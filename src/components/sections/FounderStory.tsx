"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function FounderStory() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-soft rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-primary mb-4 tracking-tight">
            Built by people who have been where you are.
          </h2>
          <p className="text-[16px] sm:text-[17px] font-medium text-text-secondary">
            Not just educators, but former aspirants who understand the pressure, the doubts, and the path to IIMs.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Image Slot */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full sm:w-10/12 lg:w-5/12 mx-auto relative"
          >
            <div className="aspect-[4/5] rounded-[24px] overflow-hidden bg-surface border border-border relative group shadow-[var(--shadow-portal)]">
              {/* Real image */}
              <img src="/founders.png" alt="StepWise Founders" className="w-full h-full object-cover" />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-4 right-4 sm:-bottom-6 sm:-right-6 lg:-right-10 bg-surface p-4 sm:p-5 rounded-[16px] shadow-[var(--shadow-portal)] border border-border z-10">
              <div className="text-[10px] sm:text-[11px] text-text-secondary font-bold uppercase tracking-widest mb-1">Founders</div>
              <div className="text-[16px] sm:text-[18px] font-bold text-primary font-display leading-tight mb-0.5">Aman/Roshit Bhaiya</div>
              <div className="text-[12px] sm:text-[13px] text-secondary font-bold">IIM ROHTAK</div>
            </div>
          </motion.div>

          {/* Story Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-7/12 mt-6 sm:mt-0"
          >
            <div className="relative">
              <Quote className="absolute -top-6 -left-4 sm:-left-8 w-12 h-12 sm:w-16 sm:h-16 text-brand-soft rotate-180" />
              
              <h3 className="text-xl sm:text-2xl font-bold font-display text-primary mb-6 relative z-10">
                Why we built StepWise
              </h3>
              
              <div className="space-y-4 sm:space-y-6 text-[15px] sm:text-[16px] font-medium text-text-secondary leading-relaxed relative z-10">
                <p>
                  "When I was preparing for IPMAT, the biggest challenge wasn't a lack of study material. It was a lack of <span className="font-bold text-primary">direction</span>."
                </p>
                <p>
                  I remember feeling overwhelmed by thick books, conflicting advice, and coaching institutes that treated us like numbers rather than individuals with dreams. The preparation felt like wandering in a maze.
                </p>
                <p>
                  We built StepWise to be the mentor we wished we had. A platform that doesn't just throw content at you, but walks with you. We combined human empathy with smart technology to create an ecosystem that tells you exactly where you stand and what you need to do next.
                </p>
                
                {/* Handwritten style signature */}
                <div className="pt-6 mt-6 border-t border-border">
                  <div className="font-display text-xl sm:text-2xl font-bold text-primary opacity-80 italic tracking-widest">
                    Amandeep Arote & Roshit Chakrraborty
                  </div>
                  <div className="text-[12px] sm:text-[13px] font-bold text-text-secondary mt-1">
                    Co-Founders, StepWise
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
