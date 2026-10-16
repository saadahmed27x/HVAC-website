import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { validateZipCode } from '../utils/validation';
import { Search, Check, AlertCircle, ArrowUpRight, Phone, MapPin } from 'lucide-react';

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
    <div className="bg-[#fbfbf9] text-stone-900 selection:bg-[#c2784a]/20 selection:text-[#91542f] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="font-mono text-xs tracking-widest text-[#c2784a] uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c2784a]" />
            <span>01 —— REGIONAL DISPATCH</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-950 leading-[1.08]">
            Areas we{' '}
            <span className="text-[#c2784a] font-serif italic font-normal">genuinely serve.</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            We focus our dispatch fleet across Orange, Seminole, and Osceola counties to ensure rapid
            arrival, fully equipped repair trucks, and deep familiarity with local Florida Building
            Code permitting.
          </p>
        </div>

        {/* Interactive ZIP Code Verification Box */}
        <div className="bg-[#0b111a] text-white p-8 sm:p-10 border border-stone-800 shadow-xl max-w-2xl">
          <div className="text-[11px] font-mono text-[#c2784a] uppercase">ZIP VERIFICATION</div>
          <h2 className="text-xl sm:text-2xl font-bold mt-1 mb-2">Check Your Neighborhood</h2>
          <p className="text-xs text-stone-400 mb-6 font-light">
            Enter your 5-digit Central Florida ZIP code to verify same-day diagnostic service.
          </p>

          <form onSubmit={handleZipCheck} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              maxLength={5}
              placeholder="e.g. 32801 or 32789"
              value={zipInput}
              onChange={e => {
                setZipInput(e.target.value);
                setZipResult(null);
              }}
              className="flex-1 bg-stone-900 border border-stone-700 px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#c2784a] font-mono"
            />
            <button
              type="submit"
              className="bg-[#c2784a] hover:bg-[#a8643b] text-white font-medium px-6 py-3 text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Verify ZIP</span>
            </button>
          </form>

          {zipResult && zipResult.checked && (
            <div
              className={`mt-4 p-4 text-xs flex items-start gap-3 border ${
                zipResult.inArea
                  ? 'bg-stone-900 border-[#c2784a] text-stone-100'
                  : 'bg-stone-900 border-stone-700 text-stone-300'
              }`}
            >
              {zipResult.inArea ? (
                <>
                  <Check className="w-4 h-4 text-[#c2784a] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold font-mono text-white">ZIP {zipInput} VERIFIED IN SERVICE AREA</p>
                    <p className="text-stone-300 mt-1">
                      Same-day and next-day diagnostic arrival available in your neighborhood.
                    </p>
                    <button
                      onClick={onRequestQuote}
                      className="mt-2 text-xs font-mono text-[#c2784a] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Proceed to schedule service →</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold font-mono text-amber-300">NOTICE FOR ZIP {zipInput}</p>
                    <p className="mt-1 text-stone-300">{zipResult.message}</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* County Breakdown Grid */}
        <section className="space-y-8">
          <div className="border-b border-stone-200 pb-4">
            <div className="font-mono text-xs text-[#c2784a] uppercase">COUNTY COVERAGE</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-950 mt-1">
              Active Municipalities & Communities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteConfig.serviceAreas.map(area => (
              <div
                key={area.county}
                className="bg-white border border-stone-300 p-6 sm:p-8 space-y-4 hover:border-stone-400 transition-colors"
              >
                <div className="space-y-1">
                  <div className="font-mono text-xs text-[#c2784a] uppercase">COUNTY SECTOR</div>
                  <h3 className="text-xl font-bold text-stone-950">{area.county}</h3>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <div className="text-[11px] font-mono text-stone-400 uppercase">
                    PRIMARY CITIES & TOWNS:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {area.cities.map(city => (
                      <span
                        key={city}
                        className="text-xs bg-[#f4f3ef] border border-stone-200 px-2.5 py-1 text-stone-800 font-mono"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 text-xs text-stone-500 font-mono">
                  Response window: <span className="text-stone-900 font-semibold">{area.responseWindow}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Florida Building Code Compliance Note */}
        <section className="bg-white border border-stone-300 p-8 sm:p-10 space-y-4">
          <div className="font-mono text-xs text-[#c2784a] uppercase">MUNICIPAL PERMITTING</div>
          <h3 className="text-xl font-bold text-stone-950">
            Every Central Florida Replacement is Fully Permitted
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed font-light max-w-3xl">
            In Orange, Seminole, and Osceola counties, replacing an HVAC system legally requires a
            mechanical permit and municipal inspection to certify duct tightness, electrical
            disconnect ratings, and 160+ MPH hurricane condenser tie-downs. We handle all
            permitting from application to final sign-off.
          </p>
        </section>
      </div>
    </div>
  );
}
