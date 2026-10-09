"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Trophy, RefreshCw, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const RESULTS = [
  {
    id: 1,
    name: "Vasu Sharma",
    category: "IIM Indore",
    before: "45",
    after: "185",
    metric: "Mock Score",
    outcome: "Converted IIM Indore",
    review: "Stepwise stood out for its affordability, quality, and genuine one-on-one guidance. The constant mentor support made a big difference in my preparation and helped me clear my IIM Indore interview. Stepwise played an important role in making my IIM dream a reality.",
    image: "/images/students/vasu-sharma.jpg",
  },
  {
    id: 2,
    name: "Archita Agarwal",
    category: "IIM Kozhikode",
    before: "62",
    after: "98.5",
    metric: "Percentile",
    outcome: "Converted IIM Kozhikode",
    review: "StepWise played a huge role in my IPMAT journey and helped me get into IIM Kozhikode. The resources and community support made my preparation much more structured. It gave me the right direction and confidence throughout the process.",
    image: "/images/students/archita-agarwal.png",
  },
  {
    id: 3,
    name: "Arpit Bhargav",
    category: "IIM Shillong",
    before: "Zero Prep",
    after: "Final List",
    metric: "Journey",
    outcome: "Converted IIM Shillong",
    review: "Preparing for my IIM interview was stressful, but Stepwise made the journey much easier. The mock interviews and personal feedback helped me improve my responses and confidence. The guidance I received played an important role in my journey and helped me secure offers from four IIMs, including IIM Shillong.",
    image: "/images/students/arpit-bhargav.jpg",
  },
  {
    id: 4,
    name: "Chetna M Malager",
    category: "IIM Ranchi",
    before: "70",
    after: "210",
    metric: "Mock Score",
    outcome: "Converted IIM Ranchi",
    review: "I’m Chetana, an IIM Ranchi IPM student. StepWise’s resources, mock interviews, and personalised guidance gave me the confidence to perform my best. I’m truly grateful to the mentors for their constant support throughout my journey.",
    image: "/images/students/chetna-m-malager.png",
  }
];

function StudentCard({ result }: { result: typeof RESULTS[0] }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <div 
      className="relative w-full aspect-[3/4] sm:aspect-[4/5] group cursor-pointer focus:outline-none focus:ring-[3px] focus:ring-primary/40 rounded-[16px]"
      style={{ perspective: "1000px" }}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={isFlipped ? `Hide testimonial from ${result.name}` : `View testimonial from ${result.name}`}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={shouldReduceMotion ? { opacity: 1 } : { rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* FRONT */}
        <motion.div 
          className="absolute inset-0 bg-surface rounded-[16px] border border-border shadow-sm flex flex-col overflow-hidden"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          animate={shouldReduceMotion ? { opacity: isFlipped ? 0 : 1 } : {}}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full grow bg-background border-b border-border flex items-center justify-center relative overflow-hidden">
            {result.image ? (
              <img src={result.image} alt={result.name} className="w-full h-full object-cover sm:group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full bg-brand-soft/30 flex items-center justify-center text-[12px] text-text-secondary/50 font-bold uppercase tracking-wider sm:group-hover:scale-105 transition-transform duration-500">
                Photo
              </div>
            )}
            {/* Hover indication icon */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md rounded-full p-2 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
              <RefreshCw className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <div className="p-5 text-center bg-surface relative shrink-0">
            <h3 className="font-bold text-primary text-[18px] mb-1">{result.name}</h3>
            <div className="text-[14px] font-bold text-secondary mb-3">{result.outcome}</div>
            
            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-widest flex items-center justify-center gap-1.5 opacity-60">
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Click to read review</span>
              <span className="inline sm:hidden">Tap to read review</span>
            </div>
          </div>
        </motion.div>

        {/* BACK */}
        <motion.div 
          className="absolute inset-0 bg-primary rounded-[16px] border border-primary text-primary-foreground shadow-[var(--shadow-portal)] p-6 sm:p-8 flex flex-col text-center overflow-hidden"
          style={{ 
            backfaceVisibility: "hidden", 
            WebkitBackfaceVisibility: "hidden", 
            transform: shouldReduceMotion ? "none" : "rotateY(180deg)" 
          }}
          animate={shouldReduceMotion ? { opacity: isFlipped ? 1 : 0, pointerEvents: isFlipped ? "auto" : "none" } : {}}
          initial={shouldReduceMotion ? { opacity: 0, pointerEvents: "none" } : {}}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-4 flex justify-center shrink-0">
            <Quote className="w-8 h-8 text-white/20" />
          </div>
          
          <div className="grow flex flex-col justify-center">
            <p className="text-[14px] sm:text-[15px] font-medium leading-relaxed text-white/95 mb-6 italic">
              "{result.review}"
            </p>
          </div>
          
          
          {/* subtle tap hint */}
          <div className="absolute top-4 right-4 bg-white/10 rounded-full p-2 opacity-60">
            <RefreshCw className="w-4 h-4 text-white" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Results() {
  return (
    <section id="results" className="py-24 bg-surface-hover relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-soft text-primary text-[11px] uppercase tracking-widest font-bold mb-6 shadow-sm border border-primary/10"
          >
            <Trophy className="w-3.5 h-3.5" />
            Wall of Progress
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-extrabold text-primary mb-4 tracking-tight">
            Progress leaves a trail.
          </h2>
          <p className="text-[17px] font-medium text-text-secondary">
            We don't just celebrate the final result. We celebrate the journey from doubt to confidence.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESULTS.map((result) => (
            <StudentCard key={result.id} result={result} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-[16px] sm:text-[18px] font-bold text-primary mb-4 uppercase tracking-wider">
            And many more students......
          </p>
          <p className="text-[13px] font-medium text-text-secondary">
            *All results are verified and pulled dynamically from our CMS. We do not fabricate outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}
