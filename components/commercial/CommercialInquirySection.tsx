"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  CheckCircle2,
  Loader2,
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";

const BUSINESS_TYPES = [
  "Signature Restaurant",
  "Premium Café",
  "Boutique Retail",
  "Corporate Office",
  "Lifestyle / Wellness",
  "Other Concept",
];

const SPACE_REQUIREMENTS = [
  "Under 200 sq ft (Kiosk / Boutique)",
  "200 – 400 sq ft (Retail Suite)",
  "400 – 600 sq ft (Prime Promenade / Dining)",
  "600+ sq ft (Anchor / Corporate)",
];

export default function CommercialInquirySection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    businessType: "Signature Restaurant",
    spaceRequirement: "200 – 400 sq ft (Retail Suite)",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg("Please provide your name, phone/WhatsApp number, and email address.");
      return;
    }

    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        businessType: "Signature Restaurant",
        spaceRequirement: "200 – 400 sq ft (Retail Suite)",
        message: "",
      });
      setTimeout(() => {
        setStatus("idle");
      }, 7000);
    }, 1200);
  };

  return (
    <section id="inquiry" className="relative py-24 sm:py-36 bg-[#081a1a] border-y border-[#EDE5DA]/15 overflow-hidden">
      {/* Atmosphere glow vignette */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#62AA9E]/4 rounded-full blur-[200px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          
          {/* Left Column (7 cols): Commercial Inquiry Form */}
          <div className="lg:col-span-7 space-y-10">
            {/* Header */}
            <div className="space-y-4 border-b border-[#EDE5DA]/15 pb-8">
              <p className="font-sans-body text-[11px] font-semibold uppercase tracking-[0.35em] text-[#62AA9E]">
                09 — Commercial Inquiry
              </p>
              <h2 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
                Have A Business <br />
                <span className="italic font-normal text-sand-gradient normal-case">In Mind?</span>
              </h2>
              <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed max-w-xl">
                Tell us what you&apos;re looking to establish at Orion One. Our commercial advisory desk will review your brand concept, spatial criteria, and available positions.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-sans-body uppercase tracking-[0.2em] text-[#EDE5DA]/75 font-medium">
                    Your Name <span className="text-[#62AA9E]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                    className="w-full bg-[#0d2828]/60 border border-[#EDE5DA]/20 focus:border-[#62AA9E] focus:bg-[#081a1a] px-4 py-3.5 text-sm text-[#EDE5DA] placeholder:text-[#EDE5DA]/30 focus:outline-none transition-colors duration-200 rounded-lg"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-sans-body uppercase tracking-[0.2em] text-[#EDE5DA]/75 font-medium">
                    Company / Brand <span className="text-[#62AA9E]">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Artisanal Roasters, Atelier"
                    required
                    className="w-full bg-[#0d2828]/60 border border-[#EDE5DA]/20 focus:border-[#62AA9E] focus:bg-[#081a1a] px-4 py-3.5 text-sm text-[#EDE5DA] placeholder:text-[#EDE5DA]/30 focus:outline-none transition-colors duration-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-sans-body uppercase tracking-[0.2em] text-[#EDE5DA]/75 font-medium">
                    Phone / WhatsApp <span className="text-[#62AA9E]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +92 300 1234567"
                    required
                    className="w-full bg-[#0d2828]/60 border border-[#EDE5DA]/20 focus:border-[#62AA9E] focus:bg-[#081a1a] px-4 py-3.5 text-sm text-[#EDE5DA] placeholder:text-[#EDE5DA]/30 focus:outline-none transition-colors duration-200 rounded-lg"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-sans-body uppercase tracking-[0.2em] text-[#EDE5DA]/75 font-medium">
                    Email Address <span className="text-[#62AA9E]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    required
                    className="w-full bg-[#0d2828]/60 border border-[#EDE5DA]/20 focus:border-[#62AA9E] focus:bg-[#081a1a] px-4 py-3.5 text-sm text-[#EDE5DA] placeholder:text-[#EDE5DA]/30 focus:outline-none transition-colors duration-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Business Type & Space Requirement */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-sans-body uppercase tracking-[0.2em] text-[#EDE5DA]/75 font-medium">
                    Business Type
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full bg-[#0d2828]/60 border border-[#EDE5DA]/20 focus:border-[#62AA9E] focus:bg-[#081a1a] px-4 py-3.5 text-sm text-[#EDE5DA] focus:outline-none transition-colors duration-200 rounded-lg cursor-pointer"
                  >
                    {BUSINESS_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-[#0d2828] text-[#EDE5DA]">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-sans-body uppercase tracking-[0.2em] text-[#EDE5DA]/75 font-medium">
                    Space Requirement
                  </label>
                  <select
                    name="spaceRequirement"
                    value={formData.spaceRequirement}
                    onChange={handleChange}
                    className="w-full bg-[#0d2828]/60 border border-[#EDE5DA]/20 focus:border-[#62AA9E] focus:bg-[#081a1a] px-4 py-3.5 text-sm text-[#EDE5DA] focus:outline-none transition-colors duration-200 rounded-lg cursor-pointer"
                  >
                    {SPACE_REQUIREMENTS.map((req) => (
                      <option key={req} value={req} className="bg-[#0d2828] text-[#EDE5DA]">
                        {req}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-sans-body uppercase tracking-[0.2em] text-[#EDE5DA]/75 font-medium">
                  Message / Concept Overview
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Share details regarding your brand positioning, target opening timeline, or specific layout requirements..."
                  className="w-full bg-[#0d2828]/60 border border-[#EDE5DA]/20 focus:border-[#62AA9E] focus:bg-[#081a1a] px-4 py-3.5 text-sm text-[#EDE5DA] placeholder:text-[#EDE5DA]/30 focus:outline-none transition-colors duration-200 rounded-lg resize-none"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-red-400 font-sans-body">{errorMsg}</p>
              )}

              {/* Submit CTA */}
              <div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] px-8 py-4 rounded-full transition-all duration-300 shadow-xl cursor-pointer disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Dossier...</span>
                    </>
                  ) : (
                    <>
                      <span>Discuss Commercial Opportunities</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Success Message */}
              {status === "success" && (
                <div className="p-4 bg-[#153D3D] border border-[#62AA9E]/40 rounded-lg flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#62AA9E] shrink-0" />
                  <p className="text-xs text-[#EDE5DA] font-light">
                    Your commercial inquiry has been registered. Our Commercial Leasing Director will reach out within 24 hours to review layout allocations.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Right Column (5 cols): Commercial Advisory Credentials Ledger */}
          <div className="lg:col-span-5 space-y-8 lg:border-l border-[#EDE5DA]/15 lg:pl-12">
            <div className="space-y-3">
              <span className="font-mono text-[10px] text-[#62AA9E] uppercase tracking-widest block font-medium">
                Direct Commercial Desk
              </span>
              <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#EDE5DA] font-light">
                Consult With Our Leasing Directors
              </h3>
              <p className="font-sans-body text-xs text-[#C9BFB1] font-light leading-relaxed">
                We work collaboratively with brand principals, franchisors, and commercial tenants to tailor spatial allocations to operational needs.
              </p>
            </div>

            <div className="space-y-5 border-t border-[#EDE5DA]/10 pt-6 text-xs text-[#EDE5DA]/85 font-light">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-4 h-4 text-[#62AA9E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#808080] block">
                    Show Suite & Headquarters
                  </span>
                  <p className="mt-0.5 leading-relaxed">
                    4th Floor, District 101, Business District Commercial, Phase 8, Bahria Town, Rawalpindi / Islamabad
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-4 h-4 text-[#62AA9E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#808080] block">
                    Telephone Concierge
                  </span>
                  <p className="mt-0.5">
                    0333 6660722 · +92 300 9079 164
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-4 h-4 text-[#62AA9E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#808080] block">
                    Official Email
                  </span>
                  <p className="mt-0.5">
                    spbuilderspk@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-4 h-4 text-[#62AA9E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#808080] block">
                    Show Suite Hours
                  </span>
                  <p className="mt-0.5">
                    Open Daily · 10:00 AM – 7:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Quick Connect */}
            <div className="pt-4 border-t border-[#EDE5DA]/10">
              <a
                href="https://wa.me/923336660722?text=Hello,%20I%20am%20interested%20in%20commercial%20opportunities%20at%20Orion%20One"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-[#0d2828] hover:bg-[#153D3D] border border-[#EDE5DA]/15 hover:border-[#62AA9E] text-xs font-semibold tracking-wider text-[#EDE5DA] transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 text-[#62AA9E]" />
                <span>Instant WhatsApp Concierge Desk</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
