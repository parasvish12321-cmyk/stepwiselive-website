"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "What is IPMAT?",
    answer: "IPMAT (Integrated Programme in Management Aptitude Test) is the entrance exam for the 5-year Integrated Programme in Management offered by IIM Indore and IIM Rohtak. It is designed for students completing their Class 12."
  },
  {
    question: "Who is eligible to take the exam?",
    answer: "Generally, students who have passed standard XII/HSC or equivalent examination and meet the specified age and percentage criteria (usually 60% for General/NC-OBC and 55% for SC/ST/PwD) are eligible. Criteria may vary slightly between IIMs."
  },
  {
    question: "Does StepWise support beginners with zero prep?",
    answer: "Yes, our preparation ecosystem is built from the ground up. Our 'Learn' stage starts with absolute basics before moving to advanced concepts and shortcuts."
  },
  {
    question: "How is the IIM Call Predictor calculated?",
    answer: "The predictor uses a proprietary algorithm based on historical cutoffs, category-wise trends, and scoring patterns from previous years. While it provides a highly educated estimate, actual calls depend on the official criteria set by IIMs each year."
  },
  {
    question: "Do you provide mentorship for interviews?",
    answer: "Yes, our Live Batch and specific Interview Prep programs include 1-on-1 mock interviews, WAT (Written Ability Test) evaluation, and personalized feedback from IIM alumni and students."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-24 bg-surface-hover relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-primary mb-3 sm:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[15px] sm:text-[17px] font-medium text-text-secondary">
            Everything you need to know about IPMAT and StepWise.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index}
              className={cn(
                "border rounded-[12px] sm:rounded-[16px] overflow-hidden transition-all duration-300",
                openIndex === index ? "border-primary/20 bg-surface shadow-[var(--shadow-portal)]" : "border-border bg-transparent hover:bg-surface"
              )}
            >
              <button
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-[15px] sm:text-[16px] text-primary pr-6 sm:pr-8">{faq.question}</span>
                <ChevronDown 
                  className={cn(
                    "w-4 h-4 sm:w-5 sm:h-5 text-text-secondary transition-transform duration-300 flex-shrink-0",
                    openIndex === index ? "rotate-180 text-primary" : ""
                  )} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 sm:p-6 pt-0 sm:pt-0 text-[14px] sm:text-[15px] font-medium text-text-secondary leading-relaxed border-t border-border/50 mt-1 sm:mt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
