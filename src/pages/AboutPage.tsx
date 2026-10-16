import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { ArrowUpRight, Phone, ShieldCheck, Check } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onRequestQuote: () => void;
}

export default function AboutPage({ onNavigate, onRequestQuote }: AboutPageProps) {
  return (
    <div className="bg-[#fbfbf9] text-stone-900 selection:bg-[#c2784a]/20 selection:text-[#91542f]">
      {/* ==================================================== */}
      {/* 1. EDITORIAL HEADER BANNER                           */}
      {/* ==================================================== */}
      <section className="relative min-h-[55vh] flex items-center bg-[#0b111a] text-white overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0b111a] via-[#0b111a]/90 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 w-full">
          <div className="max-w-3xl space-y-6">
            <div className="font-mono text-xs tracking-widest text-[#c2784a] uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c2784a]" />
              <span>01 —— ABOUT THE PRACTICE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              Cooling built on
              <br />
              <span className="text-[#c2784a] font-serif italic font-normal">
                standards, not sales.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-300 font-light leading-relaxed max-w-xl">
              In Central Florida, an air conditioning system runs more than 3,000 hours per year.
              Our practice is built on diagnostic accuracy, flat-rate pricing, and respect for your
              home.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 2. PHILOSOPHY & VALUES                               */}
      {/* ==================================================== */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-4">
            <div className="font-mono text-xs tracking-widest text-[#c2784a] uppercase">
              02 —— THE PHILOSOPHY
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              We reject high-pressure commission tactics common in residential HVAC. Our technicians
              are trained to diagnose the exact component failure and give homeowners plain choices.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-950 leading-[1.15]">
              Home comfort requires
              <br />
              <span className="text-[#c2784a] font-serif italic font-normal">
                deliberate craftsmanship.
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-stone-200">
              <div className="space-y-3">
                <div className="font-mono text-base font-bold text-[#c2784a]">01</div>
                <h3 className="text-base font-bold text-stone-900">Zero Commission Quotas</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  Our technicians are not sales reps. If a $20 capacitor or coil chemical wash
                  restores your system, that is what we recommend.
                </p>
              </div>

              <div className="space-y-3">
                <div className="font-mono text-base font-bold text-[#c2784a]">02</div>
                <h3 className="text-base font-bold text-stone-900">Florida Code Rigor</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  From 175-MPH hurricane tie-down brackets to 15.2+ SEER2 energy ratings, our
                  installations comply with every Florida building specification.
                </p>
              </div>

              <div className="space-y-3">
                <div className="font-mono text-base font-bold text-[#c2784a]">03</div>
                <h3 className="text-base font-bold text-stone-900">EPA Universal Certified</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  Every technician handling refrigerants holds EPA 608 Universal certification.
                  Background-checked and trained for residential privacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 3. VERIFIED CREDENTIALS & COMPLIANCE (Dark)          */}
      {/* ==================================================== */}
      <section className="py-20 sm:py-24 bg-[#0b111a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="max-w-2xl space-y-2">
            <div className="font-mono text-xs text-[#c2784a] uppercase">03 —— CREDENTIALS</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Licensing, Insurance & Warranties
            </h2>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Hiring an unlicensed AC contractor in Florida voids manufacturer warranties and leaves
              homeowners unprotected. We operate with full regulatory transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-stone-900/80 border border-stone-800 space-y-2">
              <div className="text-[11px] font-mono text-[#c2784a]">FLORIDA CAC LICENSE</div>
              <div className="text-base font-bold text-white font-mono">
                {siteConfig.business.licenseNumber}
              </div>
              <p className="text-xs text-stone-400 font-light">
                Verified with Florida DBPR for all Central Florida counties.
              </p>
            </div>

            <div className="p-6 bg-stone-900/80 border border-stone-800 space-y-2">
              <div className="text-[11px] font-mono text-[#c2784a]">GENERAL LIABILITY</div>
              <div className="text-base font-bold text-white font-mono">$2,000,000</div>
              <p className="text-xs text-stone-400 font-light">
                Comprehensive commercial coverage protecting your property.
              </p>
            </div>

            <div className="p-6 bg-stone-900/80 border border-stone-800 space-y-2">
              <div className="text-[11px] font-mono text-[#c2784a]">REFRIGERANT CERTIFICATION</div>
              <div className="text-base font-bold text-white font-mono">EPA Section 608</div>
              <p className="text-xs text-stone-400 font-light">
                Universal rating for R-410A, R-32, and all next-gen refrigerants.
              </p>
            </div>

            <div className="p-6 bg-stone-900/80 border border-stone-800 space-y-2">
              <div className="text-[11px] font-mono text-[#c2784a]">WARRANTY PROTECTION</div>
              <div className="text-base font-bold text-white font-mono">10-Yr Registered</div>
              <p className="text-xs text-stone-400 font-light">
                Full parts & compressor warranties backed by major manufacturers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 4. DISPATCH CTA                                      */}
      {/* ==================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-stone-950">
            Have questions for our technical lead?
          </h3>
          <p className="text-xs text-stone-600">
            Speak directly with our Florida dispatch team or schedule a visit.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${siteConfig.business.rawPhone}`}
            className="text-xs font-mono font-bold text-stone-900 hover:text-[#c2784a] flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#c2784a]" />
            <span>{siteConfig.business.displayPhone}</span>
          </a>

          <button
            onClick={onRequestQuote}
            className="bg-[#c2784a] hover:bg-[#a8643b] text-white text-xs font-medium px-5 py-2.5 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Request service</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
}
