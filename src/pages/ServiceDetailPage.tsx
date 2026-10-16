import React from 'react';
import { type ServiceDefinition, siteConfig } from '../config/siteConfig';
import LeadForm from '../components/LeadForm';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, AlertCircle, Phone } from 'lucide-react';

interface ServiceDetailPageProps {
  service: ServiceDefinition;
  onNavigate: (path: string) => void;
  onRequestQuote: () => void;
}

export default function ServiceDetailPage({
  service,
  onNavigate,
  onRequestQuote
}: ServiceDetailPageProps) {
  const relatedServices = siteConfig.services.filter(s => s.id !== service.id).slice(0, 3);

  return (
    <div className="bg-[#fbfbf9] text-stone-900 selection:bg-[#c2784a]/20 selection:text-[#91542f] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <button
            onClick={() => onNavigate('/services/')}
            className="text-xs font-mono text-stone-600 hover:text-[#c2784a] flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ALL SERVICES</span>
          </button>

          <div className="text-[11px] font-mono text-stone-400 uppercase hidden sm:block">
            FL LIC # {siteConfig.business.licenseNumber} • 15.2+ SEER2 SPEC
          </div>
        </div>

        {/* Hero Section: Two-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#c2784a] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#c2784a]" />
              <span>FLORIDA RESIDENTIAL SERVICE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-950 leading-[1.1]">
              {service.fullTitle}
            </h1>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-light">
              {service.leadParagraph}
            </p>

            {/* Scope of Work */}
            <div className="bg-white border border-stone-300 p-6 sm:p-8 space-y-4">
              <div className="font-mono text-xs font-semibold uppercase text-stone-900 tracking-wider">
                COMPREHENSIVE SCOPE & PROCEDURES
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                {service.includedItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#c2784a] font-mono font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transparent Rate & Turnaround */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-[#f4f3ef] border border-stone-200 p-4">
              <div>
                <span className="text-stone-500 uppercase block">TYPICAL INVESTMENT:</span>
                <span className="font-bold text-stone-900 text-sm">{service.typicalPriceRange}</span>
              </div>
              <div>
                <span className="text-stone-500 uppercase block">RESPONSE SCHEDULE:</span>
                <span className="font-bold text-stone-900 text-sm">Same-Day / Next-Day Window</span>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-stone-300 shadow-sm">
            <div className="mb-4 pb-3 border-b border-stone-200">
              <div className="text-[10px] font-mono text-[#c2784a] uppercase">
                PRIORITY SCHEDULING
              </div>
              <h3 className="text-lg font-bold text-stone-900">Request {service.name}</h3>
            </div>
            <LeadForm initialService={service.id} compact={true} onSuccess={() => onNavigate('/thank-you/')} />
          </div>
        </div>

        {/* Common Symptoms / Reasons for Call */}
        <section className="bg-white border border-stone-300 p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="font-mono text-xs text-[#c2784a] uppercase">SYSTEM SYMPTOMS</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-950">
              Common Indicators for {service.name}
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              If your system exhibits any of the following behavior, our certified technicians can
              pinpoint the electrical or mechanical cause on the initial visit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.commonProblems.map((prob, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#fbfbf9] border border-stone-200 flex items-start gap-3"
              >
                <AlertCircle className="w-4 h-4 text-[#c2784a] shrink-0 mt-0.5" />
                <span className="text-xs text-stone-800 leading-relaxed">{prob}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs Specific to this Service */}
        <section className="space-y-6">
          <div className="space-y-1">
            <div className="font-mono text-xs text-[#c2784a] uppercase">FREQUENT QUESTIONS</div>
            <h2 className="text-2xl font-bold text-stone-950">
              Questions About {service.name}
            </h2>
          </div>

          <div className="divide-y divide-stone-200 border-t border-b border-stone-200 bg-white">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="py-5 px-6 space-y-1.5">
                <h3 className="text-sm font-bold text-stone-900">{faq.q}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Services Links */}
        <section className="pt-8 border-t border-stone-200 space-y-6">
          <div className="flex items-center justify-between">
            <div className="font-mono text-xs text-[#c2784a] uppercase">ADDITIONAL SERVICES</div>
            <button
              onClick={() => onNavigate('/services/')}
              className="text-xs font-mono text-stone-900 hover:text-[#c2784a] flex items-center gap-1 cursor-pointer"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map(rel => (
              <div
                key={rel.id}
                onClick={() => onNavigate(`/services/${rel.slug}/`)}
                className="p-6 bg-white border border-stone-200 hover:border-[#c2784a] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="text-[10px] font-mono text-[#c2784a] uppercase">{rel.name}</div>
                  <h4 className="text-base font-bold text-stone-900 group-hover:text-[#c2784a]">
                    {rel.fullTitle}
                  </h4>
                  <p className="text-xs text-stone-600 line-clamp-2">{rel.leadParagraph}</p>
                </div>
                <div className="pt-4 text-xs font-mono text-stone-900 group-hover:text-[#c2784a] flex items-center gap-1">
                  <span>Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
