"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WHATSAPP_COMMUNITY_URL = process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL || "#";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "#courses" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Results", href: "#results" },
  { name: "Resources", href: "#resources" },
  { name: "Call Predictor", href: "#predictor" },
  { name: "About", href: "#about" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass-card py-3 text-text-primary border-b border-border"
          : "bg-transparent py-5 text-white"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-50">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md">
          <img 
            src="/logo.png" 
            alt="StepWiseLive" 
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "group relative text-[14px] font-semibold tracking-wide transition-all duration-300 hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1",
                isScrolled ? "text-text-secondary hover:text-primary" : "text-white/80 hover:text-white"
              )}
            >
              {link.name}
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full rounded-full opacity-0 group-hover:opacity-100"></span>
            </Link>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-5">
          <a
            href={WHATSAPP_COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join the StepWise WhatsApp Community"
            className={cn(
              "group flex items-center gap-1.5 text-[14px] font-semibold tracking-wide transition-all duration-300 hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] rounded-md px-1",
              isScrolled ? "text-text-secondary hover:text-text-primary" : "text-white/80 hover:text-white"
            )}
          >
            <WhatsAppIcon className={cn(
              "w-[18px] h-[18px] transition-all duration-300 group-hover:scale-105",
              isScrolled ? "text-[#25D366]" : "text-[#25D366] opacity-90 group-hover:opacity-100 group-hover:brightness-110"
            )} />
            <span className="transition-colors duration-300 group-hover:text-[#25D366]">WhatsApp Community</span>
          </a>
          <Link
            href="https://ipmat.stepwiselive.com/"
            className={cn(
              "group flex items-center gap-2 px-5 py-2.5 rounded-[12px] text-[15px] font-bold tracking-tight transition-all duration-300 shadow-sm hover:shadow-[var(--shadow-portal)] hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              isScrolled 
                ? "bg-primary text-primary-foreground hover:bg-brand-dark" 
                : "bg-white text-primary hover:bg-surface-hover"
            )}
          >
            Portal Access
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className={cn(
            "lg:hidden z-50 p-2 -mr-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            isScrolled ? "text-text-primary" : "text-white"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-text-primary" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-md z-40 lg:hidden transition-all duration-300 overflow-y-auto",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileMenuOpen(false);
        }}
      >
        <div className="flex flex-col min-h-full px-6 pt-24 pb-10">
          <nav className="flex flex-col gap-6 text-center text-[17px] mb-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-bold text-text-primary py-2 active:bg-surface-hover rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-4 mt-auto">
            <a
              href={WHATSAPP_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join the StepWise WhatsApp Community"
              className="w-full py-3.5 rounded-[12px] border border-border text-text-primary text-center font-bold bg-surface flex items-center justify-center gap-2 hover:border-[#25D366]/50 active:bg-surface-hover transition-colors min-h-[48px]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <WhatsAppIcon className="w-[18px] h-[18px] text-[#25D366]" />
              WhatsApp Community
            </a>
            <Link
              href="https://ipmat.stepwiselive.com/"
              className="w-full py-3.5 rounded-[12px] bg-primary text-primary-foreground text-center font-bold shadow-[var(--shadow-portal)] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform min-h-[48px]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Portal Access
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
