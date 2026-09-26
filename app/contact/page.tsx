"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquiryDrawer from "@/components/InquiryDrawer";
import ContactHero from "@/components/contact/ContactHero";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactCtaBanner from "@/components/contact/ContactCtaBanner";

export default function ContactPage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#153D3D] text-[#EDE5DA] overflow-x-clip selection:bg-[#62AA9E] selection:text-[#153D3D]">
      {/* Universal Fixed Header with 3 Links */}
      <Header onOpenInquiry={() => setIsInquiryOpen(true)} />

      {/* Main Architectural Spread */}
      <main className="relative">
        {/* Section 01: Hero Canopy & Orientation Ledger */}
        <ContactHero onOpenInquiry={() => setIsInquiryOpen(true)} />

        {/* Section 02: Core Engagement Spread (Inquiry Form & Executive Credentials) */}
        <ContactFormSection />

        {/* Section 03: Architectural Consultation Call To Action */}
        <ContactCtaBanner onOpenInquiry={() => setIsInquiryOpen(true)} />
      </main>

      {/* Grounded Brand Guidelines Footer */}
      <Footer />

      {/* Interactive Consultation / Inquiry Slide-over Drawer */}
      <InquiryDrawer
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
}
