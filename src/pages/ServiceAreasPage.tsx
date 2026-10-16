import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { validateZipCode } from '../utils/validation';
import { MapPin, CheckCircle, Search, AlertCircle, Phone } from 'lucide-react';

interface ServiceAreasPageProps {
  onNavigate: (path: string) => void;
  onRequestQuote: () => void;
}

export default function ServiceAreasPage({ onNavigate, onRequestQuote }: ServiceAreasPageProps) {
  const [zipInput, setZipInput] = useState('');
  const [zipResult, setZipResult] = useState<{ checked: boolean; inArea: boolean; message?: string } | null>(null);

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipInput.trim()) return;
    const res = validateZipCode(zipInput.trim());
    setZipResult({ checked: true, inArea: res.inArea, message: res.message });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
          Central Florida Service Territory
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-950 mt-1 tracking-tight">
          Areas We Genuinely Serve
        </h1>
        <p className="text-base text-slate-600 mt-4 leading-relaxed">
          We focus our dispatch fleet across Orange, Seminole, and Osceola counties to ensure rapid
          response times, fully stocked repair trucks, and deep familiarity with local municipal
          permitting and Florida Building Code requirements.
        </p>
      </div>

      {/* Interactive ZIP Code Availability Checker */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl max-w-2xl">
        <h3 className="text-xl font-bold mb-2">Check Your ZIP Code for Service Availability</h3>
        <p className="text-xs text-slate-400 mb-5">
          Enter your 5-digit Central Florida ZIP code to verify same-day diagnostic availability.
        </p>

        <form onSubmit={handleZipCheck} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              maxLength={5}
              placeholder="e.g. 32801 or 32789"
              value={zipInput}
              onChange={e => {
                setZipInput(e.target.value);
                setZipResult(null);
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 font-mono"
            />
          </div>
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Search className="w-4 h-4" />
            <span>Check ZIP Code</span>
          </button>
        </form>

        {zipResult && zipResult.checked && (
          <div
            className={`mt-4 p-4 rounded-xl text-xs flex items-start gap-2.5 animate-in fade-in duration-150 ${
              zipResult.inArea
                ? 'bg-emerald-950/80 border border-emerald-600/50 text-emerald-200'
                : 'bg-amber-950/80 border border-amber-600/50 text-amber-200'
            }`}
          >
            {zipResult.inArea ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-emerald-300">Great news! ZIP {zipInput} is in our primary service territory.</p>
                  <p className="mt-0.5 text-emerald-200/90">
                    We offer standard and emergency dispatch in your neighborhood.
                  </p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-300">Notice for ZIP {zipInput}</p>
                  <p className="mt-0.5">{zipResult.message}</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Verified Regions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {siteConfig.serviceAreas.map(area => (
          <div
            key={area.name}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1.5 text-sky-600 text-xs font-bold mb-2">
                <MapPin className="w-4 h-4" />
                <span>{area.county}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{area.name}</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{area.highlights}</p>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Primary ZIP Codes Served:
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {area.primaryZips.map(zip => (
                    <span
                      key={zip}
                      className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 border border-slate-200"
                    >
                      {zip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={onRequestQuote}
                className="w-full bg-slate-100 hover:bg-sky-50 text-slate-800 hover:text-sky-700 font-bold py-2 px-4 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Schedule Service in {area.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
