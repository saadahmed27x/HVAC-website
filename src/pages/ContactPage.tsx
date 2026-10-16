import React from 'react';
import { siteConfig } from '../config/siteConfig';
import LeadForm from '../components/LeadForm';
import { Phone, Mail, MapPin, Clock, ArrowUpRight, AlertTriangle } from 'lucide-react';

interface ContactPageProps {
  onSuccessSubmit?: () => void;
}

export default function ContactPage({ onSuccessSubmit }: ContactPageProps) {
  return (
    <div className="bg-[#fbfbf9] text-stone-900 selection:bg-[#c2784a]/20 selection:text-[#91542f] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="font-mono text-xs tracking-widest text-[#c2784a] uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c2784a]" />
            <span>01 —— DIRECT DISPATCH</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-950 leading-[1.08]">
            Connect with{' '}
            <span className="text-[#c2784a] font-serif italic font-normal">our dispatch team.</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            Whether your AC unit stopped cooling in afternoon humidity, you need a seasonal
            maintenance inspection, or you want a quote on a 15.2+ SEER2 heat pump replacement,
            we are ready to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Critical Emergency Banner */}
            <div className="bg-[#0b111a] text-white p-6 sm:p-8 border border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-[#c2784a] font-mono text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-[#c2784a]" />
                <span>FLORIDA HEAT EMERGENCY</span>
              </div>
              <p className="text-xs text-stone-300 font-light leading-relaxed">
                When ambient outdoor temperatures exceed 90°F, sudden AC stoppage can cause indoor
                temperatures to climb rapidly. For immediate dispatch assistance:
              </p>
              <a
                href={`tel:${siteConfig.business.rawPhone}`}
                className="block text-2xl font-bold font-mono text-[#c2784a] hover:text-[#e49b6d] transition-colors pt-1"
              >
                {siteConfig.business.displayPhone}
              </a>
            </div>

            {/* Office Credentials Card */}
            <div className="bg-white border border-stone-300 p-6 sm:p-8 space-y-6">
              <div className="text-[11px] font-mono text-[#c2784a] uppercase">OFFICE & DISPATCH</div>

              <div className="space-y-4 text-xs text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold font-mono text-stone-900">DEMONSTRATION HEADQUARTERS</p>
                    <p className="text-stone-600 mt-0.5">
                      {siteConfig.business.address.street}
                      <br />
                      {siteConfig.business.address.city}, {siteConfig.business.address.state}{' '}
                      {siteConfig.business.address.zip}
                    </p>
                    <p className="text-[11px] text-stone-400 mt-1 font-mono">
                      Serving Orange, Seminole & Osceola counties
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold font-mono text-stone-900">TELEPHONE DISPATCH</p>
                    <p className="text-stone-800 font-mono mt-0.5">{siteConfig.business.displayPhone}</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">Live routing & technician ETA</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold font-mono text-stone-900">SERVICE ENQUIRIES</p>
                    <p className="text-stone-600 font-mono mt-0.5">{siteConfig.business.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold font-mono text-stone-900">OPERATING HOURS</p>
                    <p className="text-stone-600 mt-0.5">{siteConfig.business.hours.regular}</p>
                    <p className="text-stone-600">{siteConfig.business.hours.sunday}</p>
                    <p className="text-[#c2784a] font-medium mt-1 font-mono">
                      {siteConfig.business.hours.emergency}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-stone-300 shadow-sm space-y-6">
            <div className="border-b border-stone-200 pb-4">
              <div className="text-[10px] font-mono text-[#c2784a] uppercase">PRIORITY FORM</div>
              <h2 className="text-2xl font-bold text-stone-950 mt-1">
                Request Service or Consultation
              </h2>
              <p className="text-xs text-stone-500 font-light mt-0.5">
                Upfront flat-rate pricing • Verified Florida technicians • No obligation
              </p>
            </div>

            <LeadForm onSuccess={onSuccessSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
