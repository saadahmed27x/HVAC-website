import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { ArrowUpRight, ArrowRight, Phone, ShieldCheck, Check } from 'lucide-react';

interface ServicesIndexPageProps {
  onNavigate: (path: string) => void;
  onRequestQuote: () => void;
}

export default function ServicesIndexPage({ onNavigate, onRequestQuote }: ServicesIndexPageProps) {
  const serviceImages: Record<string, string> = {
    'ac-repair': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    'ac-installation': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'preventative-maintenance': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    'heating-and-heat-pumps': 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    'indoor-air-quality': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
  };

  return (
    <div className="bg-[#fbfbf9] text-stone-900 selection:bg-[#c2784a]/20 selection:text-[#91542f]">
      {/* ==================================================== */}
      {/* 1. EDITORIAL HEADER BANNER                           */}
      {/* ==================================================== */}
      <section className="relative min-h-[60vh] flex items-center bg-[#0b111a] text-white overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0b111a] via-[#0b111a]/90 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 w-full">
          <div className="max-w-3xl space-y-6">
            <div className="font-mono text-xs tracking-widest text-[#c2784a] uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c2784a]" />
              <span>01 —— HVAC SERVICES IN FLORIDA</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              Service that starts
              <br />
              <span className="text-[#c2784a] font-serif italic font-normal">
                with the system.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-300 font-light leading-relaxed max-w-xl">
              AC repair, installation, heat pumps, and maintenance for homes across Orlando and
              Central Florida. Every visit begins with diagnosis, not assumptions.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`tel:${siteConfig.business.rawPhone}`}
                className="bg-[#c2784a] hover:bg-[#a8643b] text-white text-xs font-medium px-6 py-3 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Call now</span>
                <Phone className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onRequestQuote}
                className="text-stone-300 hover:text-white text-xs font-mono border-b border-stone-500 pb-0.5 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Request an estimate</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#c2784a]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 2. SERVICES LISTING WITH ARCHITECTURAL CRAFT        */}
      {/* ==================================================== */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="space-y-16">
          <div className="border-b border-stone-300 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-[#c2784a] uppercase tracking-wider">
                CENTRAL FLORIDA CAPABILITIES
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                Residential Climate Engineering
              </h2>
            </div>
            <p className="text-xs font-mono text-stone-500">
              UPFRONT FLAT-RATE PRICING • EPA 608 CERTIFIED • 15.2+ SEER2 COMPLIANT
            </p>
          </div>

          {/* Detailed Service Cards */}
          <div className="space-y-12">
            {siteConfig.services.map((service, idx) => {
              const image =
                serviceImages[service.slug] ||
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
              const numStr = (idx + 1).toString().padStart(2, '0');

              return (
                <div
                  key={service.id}
                  className="bg-white border border-stone-200 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-stone-400 transition-colors"
                >
                  {/* Left Column: Image (4 cols) */}
                  <div className="lg:col-span-4 aspect-[4/3] bg-stone-900 overflow-hidden relative">
                    <img
                      src={image}
                      alt={service.fullTitle}
                      className="w-full h-full object-cover grayscale-20 hover:grayscale-0 transition-all duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#0b111a] text-[#c2784a] font-mono text-xs px-2.5 py-1">
                      {numStr}
                    </div>
                  </div>

                  {/* Right Column: Info & Scope (8 cols) */}
                  <div className="lg:col-span-8 space-y-5">
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-mono tracking-widest text-[#c2784a] uppercase">
                        {service.name.toUpperCase()}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950">
                        {service.fullTitle}
                      </h3>
                    </div>

                    <p className="text-sm text-stone-600 leading-relaxed font-light">
                      {service.leadParagraph}
                    </p>

                    {/* Technical Checklist */}
                    <div className="pt-2">
                      <div className="text-xs font-mono font-semibold uppercase text-stone-900 mb-2">
                        SCOPE OF WORK & DIAGNOSTICS:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                        {service.includedItems.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-start gap-2">
                            <span className="text-[#c2784a] font-mono mt-0.5">•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions & Price Guidance */}
                    <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
                      <div className="text-xs font-mono text-stone-500">
                        Estimated Range:{' '}
                        <span className="font-semibold text-stone-900">
                          {service.typicalPriceRange}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onNavigate(`/services/${service.slug}/`)}
                          className="text-xs font-mono font-medium text-stone-900 hover:text-[#c2784a] border-b border-stone-300 pb-0.5 flex items-center gap-1 cursor-pointer"
                        >
                          <span>Full Specifications</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={onRequestQuote}
                          className="bg-[#c2784a] hover:bg-[#a8643b] text-white text-xs font-medium px-4 py-2 flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <span>Schedule</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 3. FIELD NOTE & CLOSING SECTION                      */}
      {/* ==================================================== */}
      <section className="py-16 bg-[#0b111a] text-white border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <div className="font-mono text-xs text-[#c2784a] uppercase">FIELD NOTE / 003</div>
            <h3 className="text-2xl font-bold text-white">
              Do not guess on equipment tonnage.
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Oversized air conditioners cool too quickly without dehumidifying, causing humid,
              clammy Florida indoor conditions. We run Manual J load calculations before every
              recommendation.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href={`tel:${siteConfig.business.rawPhone}`}
              className="bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono px-5 py-3 border border-stone-700"
            >
              CALL DISPATCH
            </a>
            <button
              onClick={onRequestQuote}
              className="bg-[#c2784a] hover:bg-[#a8643b] text-white text-xs font-medium px-5 py-3 flex items-center gap-1.5 cursor-pointer"
            >
              <span>REQUEST SERVICE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
