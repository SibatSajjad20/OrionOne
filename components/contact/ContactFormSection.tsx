"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Loader2,
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";

interface PortfolioOption {
  id: string;
  title: string;
  subtitle: string;
}

const PORTFOLIO_OPTIONS: PortfolioOption[] = [
  {
    id: "Residences",
    title: "Lakefront Residences",
    subtitle: "Penthouses & Signature Suites",
  },
  {
    id: "Commercial",
    title: "Commercial Terraces",
    subtitle: "Promenade Retail & Dining",
  },
  {
    id: "ShowSuite",
    title: "Show Suite Tour",
    subtitle: "District 101 Private Walkthrough",
  },
  {
    id: "Advisory",
    title: "Investor Advisory",
    subtitle: "Portfolio & Capital Allocation",
  },
];

const PREFERRED_METHODS = [
  "In-Person Show Suite Tour",
  "Direct WhatsApp Concierge",
  "Private Video Conference",
  "Telephone Consultation",
];

export default function ContactFormSection() {
  const [interest, setInterest] = useState("Residences");
  const [preferredMethod, setPreferredMethod] = useState(
    "In-Person Show Suite Tour"
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.email.trim()) {
      setErrorMsg("Please provide your name and email address.");
      return;
    }

    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      setTimeout(() => {
        setStatus("idle");
      }, 6000);
    }, 1100);
  };

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 bg-[#081a1a] border-y border-[#EDE5DA]/15 overflow-hidden">
      {/* Subtle architectural atmosphere vignette */}
      <div
        className="absolute top-1/3 right-1/4 w-[500px] sm:w-[800px] h-[500px] bg-[#62AA9E]/4 rounded-full blur-[180px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#EDE5DA]/3 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          
          {/* Left Column (7 cols): Bespoke Architectural Inquiry Salon */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Editorial Header */}
            <div className="space-y-4 border-b border-[#EDE5DA]/15 pb-8">
              <h2 className="font-serif-heading text-2xl sm:text-4xl lg:text-5xl font-light text-[#EDE5DA] tracking-tight leading-[1.12]">
                Initiate an Architectural Dialogue
              </h2>
              <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed max-w-xl">
                Every landmark project begins with an intentional conversation. Connect directly with the SP Builders executive team to review residence floor plans, commercial allocation, or private show suite reservations.
              </p>
            </div>

            {/* Portfolio Interest Selection (Architectural Selector Cards) */}
            <div className="space-y-3">
              <div>
                <span className="font-sans-body text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.25em] text-[#EDE5DA]/70">
                  Select Portfolio Focus
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PORTFOLIO_OPTIONS.map((item) => {
                  const isSelected = interest === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setInterest(item.id)}
                      className={`text-left p-4 transition-all duration-300 cursor-pointer border ${
                        isSelected
                          ? "bg-[#EDE5DA]/[0.08] border-[#EDE5DA]/80 shadow-md"
                          : "bg-[#0d2828]/40 border-[#EDE5DA]/15 hover:border-[#EDE5DA]/40 hover:bg-[#0d2828]/80"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p
                            className={`text-sm font-sans-body font-medium transition-colors ${
                              isSelected ? "text-[#EDE5DA]" : "text-[#EDE5DA]/80"
                            }`}
                          >
                            {item.title}
                          </p>
                          <p className="text-[11px] font-sans-body text-[#C9BFB1]/70 font-light mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                        <div
                          className={`w-3.5 h-3.5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "border-[#EDE5DA] bg-[#EDE5DA]"
                              : "border-[#EDE5DA]/30 bg-transparent"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-1.5 h-1.5 rounded-full bg-[#081a1a]" />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* The Inquiry Form */}
            <form onSubmit={handleSubmit} className="space-y-6 pt-2">
              <div className="border-t border-[#EDE5DA]/10 pt-6">
                <span className="font-sans-body text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.25em] text-[#EDE5DA]/70">
                  Principal Details
                </span>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-sans-body uppercase tracking-[0.2em] text-[#EDE5DA]/75 font-medium">
                    First Name <span className="text-[#62AA9E]">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    required
                    className="w-full bg-[#0d2828]/60 border border-[#EDE5DA]/20 focus:border-[#EDE5DA]/70 focus:bg-[#081a1a] px-4 py-3.5 text-sm text-[#EDE5DA] placeholder:text-[#EDE5DA]/30 focus:outline-none transition-colors duration-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-sans-body uppercase tracking-[0.2em] text-[#EDE5DA]/75 font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className="w-full bg-[#0d2828]/60 border border-[#EDE5DA]/20 focus:border-[#EDE5DA]/70 focus:bg-[#081a1a] px-4 py-3.5 text-sm text-[#EDE5DA] placeholder:text-[#EDE5DA]/30 focus:outline-none transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-sans-body uppercase tracking-[0.2em] text-[#EDE5DA]/75 font-medium">
                    Email Address <span className="text-[#62AA9E]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="principal@residence.com"
                    required
                    className="w-full bg-[#0d2828]/60 border border-[#EDE5DA]/20 focus:border-[#EDE5DA]/70 focus:bg-[#081a1a] px-4 py-3.5 text-sm text-[#EDE5DA] placeholder:text-[#EDE5DA]/30 focus:outline-none transition-colors duration-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-sans-body uppercase tracking-[0.2em] text-[#EDE5DA]/75 font-medium">
                    Telephone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 3XX XXXXXXX"
                    className="w-full bg-[#0d2828]/60 border border-[#EDE5DA]/20 focus:border-[#EDE5DA]/70 focus:bg-[#081a1a] px-4 py-3.5 text-sm text-[#EDE5DA] placeholder:text-[#EDE5DA]/30 focus:outline-none transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Preferred Consultation Method */}
              <div className="space-y-2 pt-1">
                <label className="block text-[10px] font-sans-body uppercase tracking-[0.2em] text-[#EDE5DA]/75 font-medium">
                  Preferred Consultation Medium
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PREFERRED_METHODS.map((method) => {
                    const isSelected = preferredMethod === method;
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPreferredMethod(method)}
                        className={`text-left px-3.5 py-2.5 text-xs font-sans-body border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-[#EDE5DA]/10 border-[#EDE5DA]/60 text-[#EDE5DA] font-medium"
                            : "bg-[#0d2828]/30 border-[#EDE5DA]/15 text-[#EDE5DA]/60 hover:text-[#EDE5DA] hover:border-[#EDE5DA]/30"
                        }`}
                      >
                        <span>{method}</span>
                        {isSelected && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#62AA9E]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message / Requirements */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-[10px] font-sans-body uppercase tracking-[0.2em] text-[#EDE5DA]/75 font-medium">
                  Inquiry Notes & Timeline
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please specify desired layout, unit size, investment parameters, or preferred show suite dates..."
                  className="w-full bg-[#0d2828]/60 border border-[#EDE5DA]/20 focus:border-[#EDE5DA]/70 focus:bg-[#081a1a] px-4 py-3.5 text-sm text-[#EDE5DA] placeholder:text-[#EDE5DA]/30 focus:outline-none transition-colors duration-200 resize-none"
                />
              </div>

              {errorMsg && (
                <div className="p-3 bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 font-sans-body">
                  {errorMsg}
                </div>
              )}

              {/* Submit Row */}
              <div className="pt-2 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#EDE5DA] hover:bg-white text-[#0d2828] font-sans-body font-bold text-[11px] uppercase tracking-[0.22em] px-9 py-4 transition-all duration-300 cursor-pointer disabled:opacity-60 shadow-lg shadow-black/20 group"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#0d2828]" />
                        <span>Transmitting Dossier...</span>
                      </>
                    ) : status === "success" ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#0d2828]" />
                        <span>Inquiry Received</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <ArrowRight className="w-4 h-4 text-[#0d2828] transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>

                {status === "success" && (
                  <div className="p-5 bg-[#0d2828] border border-[#62AA9E]/40 text-[#EDE5DA] font-sans-body space-y-1.5 transition-all">
                    <p className="text-sm font-medium text-[#EDE5DA] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#62AA9E]" />
                      Thank you. Your inquiry has been logged with the executive desk.
                    </p>
                    <p className="text-xs text-[#C9BFB1] font-light leading-relaxed">
                      A senior project director specializing in {interest} will review your parameters and respond via {preferredMethod.toLowerCase()} within one business day.
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Right Column (5 cols): Executive Suite & Architectural Desk Dossier */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Architectural Photo Monograph */}
            <div className="space-y-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#081a1a] rounded-sm group">
                <Image
                  src="/images/contact/office-desk.png"
                  alt="SP Builders Corporate Executive Headquarters Desk"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>

              {/* Architectural Ledger Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif-heading text-xl sm:text-2xl text-[#EDE5DA] font-light">
                    SP Builders Corporate Desk
                  </h3>
                  <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light mt-1.5 leading-relaxed">
                    Designed for private consultations, masterplan scale model review, and discrete transaction finalization.
                  </p>
                </div>

                {/* Directory Items with Clean Hairlines */}
                <div className="border-t border-[#EDE5DA]/15 divide-y divide-[#EDE5DA]/10 font-sans-body">
                  
                  {/* Telephone & WhatsApp */}
                  <div className="py-3.5 flex items-start gap-4">
                    <Phone className="w-4 h-4 text-[#62AA9E] shrink-0 mt-0.5" />
                    <div className="space-y-0.5 text-xs flex-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#C9BFB1]/70 block">
                        Telephone & Direct Lines
                      </span>
                      <div className="flex flex-wrap items-center gap-x-2 text-[#EDE5DA]">
                        <a
                          href="tel:03336660722"
                          className="hover:text-[#62AA9E] transition-colors font-medium"
                        >
                          0333 6660722
                        </a>
                        <span className="text-[#EDE5DA]/30">·</span>
                        <a
                          href="tel:+923009079164"
                          className="hover:text-[#62AA9E] transition-colors"
                        >
                          +92 300 9079 164
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Concierge Action */}
                  <div className="py-3.5 flex items-start gap-4">
                    <MessageCircle className="w-4 h-4 text-[#62AA9E] shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs flex-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#C9BFB1]/70 block">
                        Instant WhatsApp Consultation
                      </span>
                      <a
                        href="https://wa.me/923336660722?text=Hello,%20I%20am%20inquiring%20about%20Orion%20One"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#EDE5DA] hover:text-[#62AA9E] font-medium transition-colors"
                      >
                        <span>Initiate WhatsApp Chat</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#62AA9E]" />
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="py-3.5 flex items-start gap-4">
                    <Mail className="w-4 h-4 text-[#62AA9E] shrink-0 mt-0.5" />
                    <div className="space-y-0.5 text-xs flex-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#C9BFB1]/70 block">
                        Electronic Correspondence
                      </span>
                      <a
                        href="mailto:spbuilderspk@gmail.com"
                        className="text-[#EDE5DA] hover:text-[#62AA9E] transition-colors font-medium"
                      >
                        spbuilderspk@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="py-3.5 flex items-start gap-4">
                    <Clock className="w-4 h-4 text-[#62AA9E] shrink-0 mt-0.5" />
                    <div className="space-y-0.5 text-xs flex-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#C9BFB1]/70 block">
                        Show Suite Visiting Hours
                      </span>
                      <p className="text-[#EDE5DA] font-light">
                        Monday – Saturday · 10:00 AM – 6:00 PM
                      </p>
                    </div>
                  </div>

                  {/* Address & Navigation */}
                  <div className="py-3.5 flex items-start gap-4">
                    <MapPin className="w-4 h-4 text-[#62AA9E] shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs flex-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#C9BFB1]/70 block">
                        Show Suite Physical Address
                      </span>
                      <p className="text-[#EDE5DA] font-light leading-relaxed">
                        4th Floor, District 101, Business District Commercial
                      </p>
                      <a
                        href="https://maps.google.com/?q=District+101+Business+District+Commercial+Phase+8+Bahria+Town+Rawalpindi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#62AA9E] hover:text-[#EDE5DA] font-medium transition-colors pt-1"
                      >
                        <span>Open In Google Maps</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
