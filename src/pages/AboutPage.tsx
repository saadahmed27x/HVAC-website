import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Shield, Award, CheckCircle2, Users, FileCheck, Phone } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onRequestQuote: () => void;
}

export default function AboutPage({ onNavigate, onRequestQuote }: AboutPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Hero */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
          Company & Credentials
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-950 mt-1 tracking-tight">
          Dedicated to Florida Home Comfort
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
          Premium HVAC is a demonstration brand created to set the gold standard for residential
          heating and air conditioning service across Central Florida. We believe homeowners deserve
          honest diagnosis, flat-rate pricing, and installations compliant with strict Florida
          Building Code regulations.
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center mb-5 text-sky-600">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No High-Pressure Upselling</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our technicians are paid for diagnostic accuracy and quality repairs, not commission on
            replacement equipment. If a simple $180 capacitor or drain flush solves your issue,
            that is what we recommend.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center mb-5 text-sky-600">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Florida Code Mastery</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            From 175 MPH hurricane condenser tie-downs to Florida Energy Code 15.2+ SEER2 compliance
            and proper duct static pressure balance, we install systems engineered to withstand
            Florida weather.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center mb-5 text-sky-600">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">EPA Certified Technicians</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every technician handling refrigerant holds EPA Section 608 Universal certification.
            Background-checked and drug-tested for your family’s security.
          </p>
        </div>
      </div>

      {/* Licensing & Verified Credentials Info Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
            Verified Contractor Credentials
          </span>
          <h2 className="text-3xl font-black mt-2">Licensing, Insurance & Guarantees</h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Hiring an unlicensed AC contractor in Florida exposes homeowners to voided manufacturer
            warranties, code violations, and safety hazards. We maintain active compliance across all
            state and local jurisdictions:
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-200">
            <div className="flex items-start gap-2.5 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
              <FileCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">State of Florida License</p>
                <p className="text-slate-400 mt-0.5">{siteConfig.business.license.licenseNumber}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Commercial Liability Coverage</p>
                <p className="text-slate-400 mt-0.5">{siteConfig.business.license.insuredAmount}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
              <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Manufacturer Warranties</p>
                <p className="text-slate-400 mt-0.5">{siteConfig.business.floridaStandards.warrantyTerms}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Hurricane Code Anchor Standard</p>
                <p className="text-slate-400 mt-0.5">{siteConfig.business.floridaStandards.hurricaneWindRating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-sky-50 border border-sky-200 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Need Service or an In-Home Consultation?</h3>
          <p className="text-xs text-slate-600 mt-1">
            Our Central Florida dispatch coordinators are ready to book your arrival window.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onRequestQuote}
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-3 rounded-xl text-xs cursor-pointer shadow-md"
          >
            Request Service Online
          </button>
        </div>
      </div>
    </div>
  );
}
