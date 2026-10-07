"use client";

import { motion } from "framer-motion";
import { FileText, BookOpen, Target, ClipboardCheck, ArrowRight, ArrowDown } from "lucide-react";
import Link from "next/link";

const RESOURCES = [
  {
    icon: FileText,
    title: "Past Year Papers",
    description: "Detailed solutions and analysis for IPMAT Indore & Rohtak.",
    link: "https://ipmat.stepwiselive.com/pyqs"
  },
  {
    icon: BookOpen,
    title: "Study Notes",
    description: "Subject & topic-wise preparation material for focused learning.",
    link: "https://ipmat.stepwiselive.com/notes"
  },
  {
    icon: Target,
    title: "PracSets",
    description: "Structured practice sets to strengthen concepts and build accuracy.",
    link: "https://ipmat.stepwiselive.com/pracset"
  },
  {
    icon: ClipboardCheck,
    title: "Mock Tests",
    description: "Full-length mocks and sectional practice to prepare like the real exam.",
    link: "https://ipmat.stepwiselive.com/mocks"
  }
];

export default function FreeResources() {
  return (
    <section id="resources" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
          
          {/* LEFT: Content */}
          <div className="w-full lg:w-5/12 lg:pr-8">
            <h2 className="text-4xl lg:text-[48px] font-display font-extrabold text-primary mb-6 tracking-tight leading-[1.1]">
              Start your preparation, <br className="hidden lg:block"/><span className="text-secondary">for free.</span>
            </h2>
            
            <p className="text-[17px] font-medium text-text-secondary mb-10 leading-relaxed lg:max-w-[90%]">
              Explore StepWise's free learning resources, practice material and exam tools designed to give you a head start.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link
                href="https://ipmat.stepwiselive.com/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-[14px] font-bold text-[16px] hover:bg-brand-dark hover:-translate-y-0.5 transition-all shadow-[var(--shadow-portal)] group"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="mt-8 flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-success relative">
                <div className="absolute inset-0 bg-success rounded-full animate-ping opacity-75"></div>
              </div>
              <p className="text-[14px] font-semibold text-text-secondary">
                Start learning with StepWise today.
              </p>
            </div>
          </div>

          {/* RIGHT: Resources Grid */}
          <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {RESOURCES.map((resource, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index}
                className="bg-surface p-7 lg:p-8 rounded-[24px] border border-border shadow-sm hover:border-primary/20 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer relative"
              >
                <div className="w-14 h-14 rounded-[16px] bg-primary/5 border border-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
                  <resource.icon className="w-6 h-6 stroke-[2px]" />
                </div>
                
                <h3 className="text-[18px] lg:text-[20px] font-bold text-text-primary mb-3 font-display group-hover:text-primary transition-colors tracking-tight">
                  {resource.title}
                </h3>
                
                <p className="text-[14px] font-medium text-text-secondary mb-8 leading-relaxed flex-grow">
                  {resource.description}
                </p>
                
                <Link 
                  href={resource.link} 
                  className="inline-flex items-center gap-1.5 text-[14px] font-bold text-primary transition-all mt-auto group/link absolute inset-0 rounded-[24px]"
                  aria-label={`Access ${resource.title}`}
                >
                  <span className="absolute bottom-7 lg:bottom-8 left-7 lg:left-8 flex items-center gap-1.5 group-hover:text-brand-dark">
                    Access Resource
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
