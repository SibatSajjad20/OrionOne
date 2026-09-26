"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Check, MessageCircle, Calendar, Phone, User, Building } from "lucide-react";

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InquiryDrawer({ isOpen, onClose }: InquiryDrawerProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    interest: "Residences",
    preferredTiming: "Morning (10AM - 1PM)",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    if (isOpen) {
      document.documentElement.classList.add("modal-lock");
      document.body.classList.add("modal-lock");
      if (lenis) lenis.stop();
      window.dispatchEvent(new CustomEvent("lenis:stop"));
    } else {
      document.documentElement.classList.remove("modal-lock");
      document.body.classList.remove("modal-lock");
      if (lenis) lenis.start();
      window.dispatchEvent(new CustomEvent("lenis:start"));
    }
    return () => {
      document.documentElement.classList.remove("modal-lock");
      document.body.classList.remove("modal-lock");
      if (lenis) lenis.start();
      window.dispatchEvent(new CustomEvent("lenis:start"));
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#081a1a]/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        data-lenis-prevent="true"
        className="relative w-full max-w-lg bg-[#153D3D] text-[#EDE5DA] border-l border-[#EDE5DA]/15 shadow-2xl p-5 sm:p-8 flex flex-col justify-between overflow-y-auto overscroll-contain z-10"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#EDE5DA]/10">
            <div className="relative h-10 sm:h-12 w-44 sm:w-48">
              <Image
                src="/new-logo.png"
                alt="Orion One"
                fill
                sizes="192px"
                className="object-contain object-left filter brightness-125"
              />
            </div>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center min-h-11 min-w-11 text-[#EDE5DA]/70 hover:text-white transition-colors rounded-full hover:bg-white/5 cursor-pointer"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 sm:mt-8 space-y-2">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#62AA9E] font-medium font-sans-body">
              Private Concierge Desk
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-light text-[#EDE5DA]">
              Book a Private Tour
            </h2>
            <p className="text-xs sm:text-sm text-[#EDE5DA]/80 font-light leading-relaxed">
              Experience the lakefront masterplan firsthand. Our private client advisors are available for discrete consultations at our Show Suite or via private video call.
            </p>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="my-12 sm:my-16 p-6 rounded-xl bg-[#0d2828] border border-[#62AA9E]/40 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#62AA9E]/20 text-[#62AA9E] mx-auto flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-[#EDE5DA]">Inquiry Registered</h3>
              <p className="text-xs text-[#EDE5DA]/70 max-w-xs mx-auto">
                Thank you. A dedicated Orion One advisor will contact you within 2 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-[0.2em] text-[#EDE5DA]/70 font-medium">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 w-4 h-4 text-[#62AA9E]/70" />
                  <input
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ayyaz Khan"
                    className="w-full bg-[#0d2828] border border-[#EDE5DA]/15 rounded-lg py-2.5 pl-10 pr-4 text-base sm:text-sm text-[#EDE5DA] placeholder:text-[#808080] focus:outline-none focus:border-[#62AA9E] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-[0.2em] text-[#EDE5DA]/70 font-medium">
                  Phone / WhatsApp
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3.5 w-4 h-4 text-[#62AA9E]/70" />
                  <input
                    required
                    type="tel"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="+92 300 0000000"
                    className="w-full bg-[#0d2828] border border-[#EDE5DA]/15 rounded-lg py-2.5 pl-10 pr-4 text-base sm:text-sm text-[#EDE5DA] placeholder:text-[#808080] focus:outline-none focus:border-[#62AA9E] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-[0.2em] text-[#EDE5DA]/70 font-medium">
                  Area of Interest
                </label>
                <div className="relative flex items-center">
                  <Building className="absolute left-3.5 w-4 h-4 text-[#62AA9E]/70" />
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-[#0d2828] border border-[#EDE5DA]/15 rounded-lg py-2.5 pl-10 pr-4 text-base sm:text-sm text-[#EDE5DA] focus:outline-none focus:border-[#62AA9E] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="Residences">Lakefront Residences</option>
                    <option value="Sky Suites">Sky Suites & Penthouses</option>
                    <option value="Commercial">Commercial Offices</option>
                    <option value="Retail">Retail & Dining Terraces</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-[0.2em] text-[#EDE5DA]/70 font-medium">
                  Preferred Schedule
                </label>
                <div className="relative flex items-center">
                  <Calendar className="absolute left-3.5 w-4 h-4 text-[#62AA9E]/70" />
                  <select
                    value={formData.preferredTiming}
                    onChange={(e) => setFormData({ ...formData, preferredTiming: e.target.value })}
                    className="w-full bg-[#0d2828] border border-[#EDE5DA]/15 rounded-lg py-2.5 pl-10 pr-4 text-base sm:text-sm text-[#EDE5DA] focus:outline-none focus:border-[#62AA9E] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="Morning">Morning (10AM – 1PM)</option>
                    <option value="Afternoon">Afternoon (1PM – 4PM)</option>
                    <option value="Evening">Sunset / Evening (4PM – 7PM)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 min-h-[48px] py-3 rounded-full bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] font-sans-body font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-lg cursor-pointer"
              >
                Request Private Invitation
              </button>
            </form>
          )}
        </div>

        {/* Direct WhatsApp Concierge & Show Suite */}
        <div className="mt-10 pt-6 border-t border-[#EDE5DA]/10 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#808080]">Show Suite:</span>
            <span className="text-[#EDE5DA] font-medium">Open Daily · 10AM – 7PM</span>
          </div>

          <a
            href="https://wa.me/923009079164?text=Hello,%20I%20would%20like%20to%20inquire%20about%20Orion%20One%20lakefront%20development"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full min-h-11 py-2.5 rounded-full border border-[#62AA9E]/40 hover:border-[#62AA9E] text-xs text-[#EDE5DA] hover:text-white transition-all bg-[#0d2828]/60"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#62AA9E]" />
            <span>Direct WhatsApp Concierge (+92 300 9079 164)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
