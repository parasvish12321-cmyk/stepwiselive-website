"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const EXAM_DATES = {
  UGAT: "2026-11-15",
};

export interface ExamCountdownProps {
  examName?: string;
  examDate?: string;
  timezone?: string;
  label?: string; // e.g. "UPCOMING EXAM"
}

export function ExamCountdown({
  examName = "IIMB UGAT",
  examDate = EXAM_DATES.UGAT,
  timezone = "Asia/Kolkata",
  label = "Upcoming Exam",
}: ExamCountdownProps) {
  const [daysLeft, setDaysLeft] = useState<number | null | "TODAY" | "COMPLETED" | "INVALID">(null);

  useEffect(() => {
    function calculateDays() {
      try {
        if (!examDate) return "INVALID";

        const now = new Date();
        const target = new Date(examDate);

        if (isNaN(target.getTime())) return "INVALID";

        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: timezone,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

        // Current date parts in IST
        const parts = formatter.formatToParts(now);
        const currentMonth = Number(parts.find(p => p.type === "month")?.value);
        const currentDay = Number(parts.find(p => p.type === "day")?.value);
        const currentYear = Number(parts.find(p => p.type === "year")?.value);

        // Normalize to local timezone midnight
        const currentLocal = new Date(currentYear, currentMonth - 1, currentDay);
        
        const [targetYear, targetMonth, targetDay] = examDate.split("-").map(Number);
        const targetLocal = new Date(targetYear, targetMonth - 1, targetDay);

        const diffTime = targetLocal.getTime() - currentLocal.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 0) return diffDays;
        if (diffDays === 0) return "TODAY";
        return "COMPLETED";
      } catch (e) {
        return "INVALID";
      }
    }

    setDaysLeft(calculateDays());

    // Update every minute to catch midnight rollovers
    const interval = setInterval(() => {
      setDaysLeft(calculateDays());
    }, 60 * 1000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setDaysLeft(calculateDays());
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [examDate, timezone]);

  if (daysLeft === null) {
    // Initial render placeholder to avoid hydration mismatch
    return (
      <div className="flex-1 bg-gradient-to-br from-[#2a2453] to-[#1e1940] rounded-[16px] sm:rounded-[20px] p-4 sm:p-5 text-white flex items-center shadow-lg relative overflow-hidden group hover:-translate-y-[2px] transition-all duration-300">
        <div className="absolute right-0 bottom-0 w-[150px] sm:w-[200px] h-[150px] sm:h-[200px] bg-[#6649e6]/20 blur-[50px] rounded-full translate-x-1/2 translate-y-1/2 group-hover:bg-[#6649e6]/30 transition-colors"></div>
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 flex items-center justify-center mr-3 sm:mr-4 backdrop-blur-md shrink-0 border border-white/5 shadow-sm">
           <div className="w-4 h-4 sm:w-5 sm:h-5 border-[2px] sm:border-[2.5px] border-white/80 rounded-[4px] relative">
             <div className="absolute top-[-4px] sm:top-[-5px] left-1/2 -translate-x-1/2 w-1.5 sm:w-2 h-1 sm:h-1.5 border-t-[2px] sm:border-t-[2.5px] border-x-[2px] sm:border-x-[2.5px] border-white/80 rounded-t-sm"></div>
           </div>
        </div>
        <div className="flex-1 min-w-0 relative z-10">
          <div className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.08em] opacity-70 mb-0.5 sm:mb-1 truncate">{label}</div>
          <div className="text-[14px] sm:text-[18px] font-bold leading-tight tracking-tight truncate">{examName}</div>
        </div>
        <div className="text-right pl-3 sm:pl-4 border-l border-white/10 relative z-10 shrink-0 opacity-0">
          <div className="text-[28px] sm:text-[40px] font-extrabold leading-none tracking-tighter tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">00</div>
          <div className="text-[8px] sm:text-[9px] uppercase font-bold tracking-[0.1em] mt-1">DAYS TO GO</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex-1 bg-gradient-to-br from-[#2a2453] to-[#1e1940] rounded-[16px] sm:rounded-[20px] p-4 sm:p-5 text-white flex items-center shadow-lg relative overflow-hidden group hover:-translate-y-[2px] transition-all duration-300"
      aria-label={
        daysLeft === "INVALID" ? "Exam date unavailable" :
        daysLeft === "TODAY" ? `${examName} is today` :
        daysLeft === "COMPLETED" ? `${examName} is completed` :
        `${examName}, ${daysLeft} ${daysLeft === 1 ? "day" : "days"} remaining until the exam on ${examDate}.`
      }
    >
      <div className="absolute right-0 bottom-0 w-[150px] sm:w-[200px] h-[150px] sm:h-[200px] bg-[#6649e6]/20 blur-[50px] rounded-full translate-x-1/2 translate-y-1/2 group-hover:bg-[#6649e6]/30 transition-colors"></div>
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 flex items-center justify-center mr-3 sm:mr-4 backdrop-blur-md shrink-0 border border-white/5 shadow-sm">
         <div className="w-4 h-4 sm:w-5 sm:h-5 border-[2px] sm:border-[2.5px] border-white/80 rounded-[4px] relative">
           <div className="absolute top-[-4px] sm:top-[-5px] left-1/2 -translate-x-1/2 w-1.5 sm:w-2 h-1 sm:h-1.5 border-t-[2px] sm:border-t-[2.5px] border-x-[2px] sm:border-x-[2.5px] border-white/80 rounded-t-sm"></div>
         </div>
      </div>
      <div className="flex-1 min-w-0 relative z-10">
        <div className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.08em] opacity-70 mb-0.5 sm:mb-1 truncate">{label}</div>
        <div className="text-[14px] sm:text-[18px] font-bold leading-tight tracking-tight truncate">{examName}</div>
      </div>
      <div className="text-right pl-3 sm:pl-4 border-l border-white/10 relative z-10 shrink-0 min-w-[70px]">
        {daysLeft === "INVALID" ? (
          <div className="text-[10px] sm:text-[12px] uppercase font-bold tracking-[0.1em] opacity-70">
            Unavailable
          </div>
        ) : daysLeft === "TODAY" ? (
          <>
            <div className="text-[16px] sm:text-[20px] font-extrabold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#fbdc5c] to-[#ffeba3]">TODAY</div>
            <div className="text-[8px] sm:text-[9px] uppercase font-bold tracking-[0.1em] opacity-70 mt-1">EXAM DAY</div>
          </>
        ) : daysLeft === "COMPLETED" ? (
          <>
            <div className="text-[12px] sm:text-[14px] font-extrabold leading-none tracking-tighter text-white/90">EXAM</div>
            <div className="text-[8px] sm:text-[9px] uppercase font-bold tracking-[0.1em] opacity-70 mt-1">COMPLETED</div>
          </>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={daysLeft}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-[28px] sm:text-[40px] font-extrabold leading-none tracking-tighter tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                {daysLeft}
              </div>
              <div className="text-[8px] sm:text-[9px] uppercase font-bold tracking-[0.1em] opacity-70 mt-1">
                {daysLeft === 1 ? "DAY TO GO" : "DAYS TO GO"}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
