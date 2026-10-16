import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { CheckCircle2, Phone, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

interface ThankYouPageProps {
  onNavigate: (path: string) => void;
}

export default function ThankYouPage({ onNavigate }: ThankYouPageProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center space-y-8">
      {/* Success Badge */}
      <div className="w-20 h-20 rounded-3xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-600/30">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-sky-600 uppercase tracking-widest">
          Dispatch Queued Successfully
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Thank You! Your Request Has Been Received
        </h1>
        <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          Our Central Florida service coordinators have received your HVAC enquiry. We prioritize
          dispatch based on home urgency and temperature conditions.
        </p>
      </div>

      {/* Next Steps Box */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-left shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-sky-600" />
          <span>What Happens Next?</span>
        </h3>

        <div className="space-y-3 text-xs text-slate-700">
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center shrink-0">
              1
            </span>
            <p>
              <strong>Review & Routing:</strong> A dispatch manager reviews your equipment symptoms
              and matches an EPA-certified technician carrying relevant replacement parts.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center shrink-0">
              2
            </span>
            <p>
              <strong>Phone Confirmation:</strong> We will contact you directly to confirm an exact
              2-hour arrival window that fits your schedule.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center shrink-0">
              3
            </span>
            <p>
              <strong>Upfront Fixed Pricing:</strong> Your technician provides a comprehensive
              diagnostic evaluation and clear pricing options before any work commences.
            </p>
          </div>
        </div>
      </div>

      {/* Immediate Assistance Notice */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left text-xs">
          <p className="font-bold text-amber-400">Emergency Situation?</p>
          <p className="text-slate-300 mt-0.5">
            If indoor heat has exceeded 85°F and you need immediate technician dispatch:
          </p>
        </div>
        <a
          href={`tel:${siteConfig.business.rawPhone}`}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shrink-0"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call {siteConfig.business.displayPhone}</span>
        </a>
      </div>

      {/* Return to Home */}
      <div>
        <button
          onClick={() => onNavigate('/')}
          className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 mx-auto cursor-pointer"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
