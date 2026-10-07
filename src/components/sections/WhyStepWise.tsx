"use client";

import { motion } from "framer-motion";
import { Users, Compass, Target, BrainCircuit, Flag, Lightbulb, UserCheck } from "lucide-react";

const REASONS = [
  {
    icon: Users,
    title: "Built by IPM Students",
    description: "People who have actually experienced the journey, faced the pressure, and cracked the exam.",
    color: "bg-brand-soft text-primary border-primary/10"
  },
  {
    icon: UserCheck,
    title: "Personal Attention",
    description: "Small batches and genuine mentor access. You're never just another enrollment number.",
    color: "bg-[#fdecec] text-[#d33] border-[#d33]/10"
  },
  {
    icon: Compass,
    title: "Preparation With Direction",
    description: "Students know exactly what to study, practice and revise on any given day.",
    color: "bg-[#fff5d6] text-[#a97a00] border-[#a97a00]/10"
  },
  {
    icon: BrainCircuit,
    title: "Smart Performance Tracking",
    description: "Turn mock scores into actionable improvement with deep-dive topic analytics.",
    color: "bg-[#e8f8ee] text-[#199f4a] border-[#199f4a]/10"
  },
  {
    icon: Target,
    title: "Exam-Specific Strategy",
    description: "Preparation based around actual exam behaviour and pattern rather than only syllabus completion.",
    color: "bg-brand-soft text-primary border-primary/10"
  },
  {
    icon: Flag,
    title: "Beyond the Entrance Test",
    description: "End-to-end support for interview, WAT, and admission stages where applicable.",
    color: "bg-[#e8f8ee] text-[#199f4a] border-[#199f4a]/10"
  }
];

export default function WhyStepWise() {
  return (
    <section id="how-it-works" className="py-24 bg-surface-hover relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-primary mb-4">
            Why StepWise?
          </h2>
          <p className="text-[16px] sm:text-[17px] font-medium text-text-secondary">
            We don't just teach the syllabus. We engineer your preparation ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
              className="group relative bg-surface p-6 sm:p-8 rounded-[16px] border border-border hover:border-primary/20 hover:shadow-[var(--shadow-portal)] transition-all duration-300 overflow-hidden"
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-brand-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-[12px] flex items-center justify-center border mb-5 sm:mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${reason.color}`}>
                  <reason.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                
                <h3 className="text-[17px] sm:text-[18px] font-bold font-display text-primary mb-2 sm:mb-3">
                  {reason.title}
                </h3>
                
                <p className="text-[14px] sm:text-[15px] text-text-secondary leading-relaxed flex-grow">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
