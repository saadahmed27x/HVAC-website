import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Wrench, ShieldCheck, RotateCcw, Flame, Wind, ChevronRight, CheckCircle2 } from 'lucide-react';

interface ServicesIndexPageProps {
  onNavigate: (path: string) => void;
  onRequestQuote: () => void;
}

export default function ServicesIndexPage({ onNavigate, onRequestQuote }: ServicesIndexPageProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-sky-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-sky-600" />;
      case 'RotateCcw':
        return <RotateCcw className="w-6 h-6 text-sky-600" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-sky-600" />;
      case 'Wind':
        return <Wind className="w-6 h-6 text-sky-600" />;
      default:
        return <Wrench className="w-6 h-6 text-sky-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Page Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
          Complete Florida HVAC Solutions
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-950 mt-1 tracking-tight">
          Air Conditioning & Heating Services
        </h1>
        <p className="text-base text-slate-600 mt-3 leading-relaxed">
          Central Florida’s intense heat and constant moisture demand precise engineering and
          careful system maintenance. Explore our core residential offerings below, each performed
          by certified, background-checked technicians with transparent flat-rate pricing.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {siteConfig.services.map(service => (
          <div
            key={service.id}
            className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center">
                  {getIcon(service.iconName)}
                </div>
                <span className="text-xs font-mono font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                  FL Code Verified
                </span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900">{service.name}</h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {service.leadParagraph.slice(0, 160)}...
              </p>

              <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Key Service Inclusions:
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {service.includedItems.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => onNavigate(`/services/${service.slug}/`)}
                className="text-sm font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 cursor-pointer"
              >
                <span>Read Full Service Details & FAQs</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={onRequestQuote}
                className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer"
              >
                Schedule Service
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
            Emergency Dispatch Notice
          </span>
          <h3 className="text-2xl font-black mt-1">Need Immediate Cooling Help?</h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            When outdoor heat exceeds 90°F in Central Florida, an inoperative air conditioner is an
            urgent situation. Our dispatch vans carry universal capacitors, contactors, motors, and
            refrigerant.
          </p>
        </div>
        <button
          onClick={onRequestQuote}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm shrink-0 cursor-pointer shadow-md"
        >
          Request Emergency Technician
        </button>
      </div>
    </div>
  );
}
