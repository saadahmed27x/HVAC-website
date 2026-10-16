import React, { useState, useId } from 'react';
import {
  calculateTonnage,
  calculateSeerSavings,
  estimateSystemPriceRange
} from '../utils/hvacCalculations';
import { Calculator, Zap, DollarSign, Info } from 'lucide-react';

interface HvacCalculatorProps {
  onRequestQuoteWithSpecs?: (specs: { sqFt: number; tons: number; tier: string }) => void;
}

export default function HvacCalculator({ onRequestQuoteWithSpecs }: HvacCalculatorProps) {
  const sqFtInputId = useId();
  const ceilingInputId = useId();
  const currentSeerInputId = useId();

  const [sqFt, setSqFt] = useState(1800);
  const [ceilingHeight, setCeilingHeight] = useState(8);
  const [currentSeer, setCurrentSeer] = useState(10);
  const [targetTier, setTargetTier] = useState<'standard' | 'high' | 'ultra'>('high');
  const [includesDuctwork, setIncludesDuctwork] = useState(false);

  // Perform pure calculations
  const sizing = calculateTonnage(sqFt, ceilingHeight);
  const targetSeer2 = targetTier === 'standard' ? 15.2 : targetTier === 'high' ? 17.0 : 20.0;
  const savings = calculateSeerSavings(currentSeer, targetSeer2, sizing.recommendedTons);
  const pricing = estimateSystemPriceRange(sizing.recommendedTons, targetTier, includesDuctwork);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8">
        <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Calculator className="w-4 h-4" />
          <span>Interactive Florida Sizing & Savings Calculator</span>
        </div>
        <h3 className="text-2xl font-black tracking-tight">
          Find Your Ideal AC Sizing & Energy Savings
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
          Based on Florida IECC Climate Zone 2 cooling loads, humidity design ratios, and modern
          SEER2 standards.
        </p>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Square Footage Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <label htmlFor={sqFtInputId}>Home Square Footage</label>
              <span className="text-sm font-black text-sky-700 font-mono">
                {sqFt.toLocaleString()} sq ft
              </span>
            </div>
            <input
              id={sqFtInputId}
              type="range"
              min={800}
              max={4500}
              step={50}
              value={sqFt}
              onChange={e => setSqFt(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>800 sq ft</span>
              <span>2,500 sq ft</span>
              <span>4,500 sq ft</span>
            </div>
          </div>

          {/* Ceiling Height */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <label htmlFor={ceilingInputId}>Ceiling Height</label>
              <span className="text-sm font-black text-sky-700 font-mono">{ceilingHeight} ft</span>
            </div>
            <select
              id={ceilingInputId}
              value={ceilingHeight}
              onChange={e => setCeilingHeight(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
            >
              <option value={8}>8 ft (Standard Florida Ceiling)</option>
              <option value={9}>9 ft (Modern Florida Ceiling)</option>
              <option value={10}>10 ft (High Ceilings)</option>
              <option value={12}>12 ft (Vaulted / Cathedral Living Area)</option>
            </select>
          </div>

          {/* Current Old System SEER */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <label htmlFor={currentSeerInputId}>Current AC SEER Rating</label>
              <span className="text-sm font-black text-amber-700 font-mono">{currentSeer} SEER</span>
            </div>
            <select
              id={currentSeerInputId}
              value={currentSeer}
              onChange={e => setCurrentSeer(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
            >
              <option value={8}>8 SEER (Installed before 2000)</option>
              <option value={10}>10 SEER (Standard 2000–2006 system)</option>
              <option value={12}>12 SEER (Standard 2006–2010 system)</option>
              <option value={13}>13–14 SEER (Standard 2011–2018 system)</option>
            </select>
          </div>

          {/* Target Efficiency Tier */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Replacement Efficiency Tier
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'standard', label: '15.2 SEER2', sub: 'FL Standard' },
                { id: 'high', label: '17.0 SEER2', sub: 'Two-Stage' },
                { id: 'ultra', label: '20+ SEER2', sub: 'Variable Inverter' }
              ].map(tier => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setTargetTier(tier.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    targetTier === tier.id
                      ? 'bg-sky-50 border-sky-600 text-sky-900 ring-2 ring-sky-600/20'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <p className="text-xs font-black">{tier.label}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{tier.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Ductwork Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              id="include-ducts"
              type="checkbox"
              checked={includesDuctwork}
              onChange={e => setIncludesDuctwork(e.target.checked)}
              className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300 cursor-pointer"
            />
            <label htmlFor="include-ducts" className="text-xs text-slate-700 font-medium cursor-pointer">
              Include estimated ductwork modification / replacement
            </label>
          </div>
        </div>

        {/* Results Column (7 cols) */}
        <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              Estimated Engineering Specifications
            </h4>

            {/* Sizing & BTU Card */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
                <span className="text-[11px] text-slate-500 font-medium block">Recommended Capacity</span>
                <span className="text-2xl font-black text-slate-900 font-mono">
                  {sizing.recommendedTons} Tons
                </span>
                <span className="text-[10px] text-sky-600 font-bold block mt-0.5">
                  {(sizing.totalBtu).toLocaleString()} BTUs
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
                <span className="text-[11px] text-slate-500 font-medium block">Annual Electric Savings</span>
                <span className="text-2xl font-black text-emerald-600 font-mono">
                  ${savings.annualDollarSavings}
                </span>
                <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
                  ~{savings.annualKwhSaved.toLocaleString()} kWh/yr
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-500 font-medium block">10-Year Energy ROI</span>
                <span className="text-2xl font-black text-emerald-700 font-mono">
                  ${savings.tenYearDollarSavings.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Cumulative utility savings</span>
              </div>
            </div>

            {/* Pricing Range */}
            <div className="bg-sky-950 text-white p-5 rounded-xl mb-4">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs uppercase tracking-wider text-sky-300 font-bold flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                  <span>Realistic Florida Estimate Range</span>
                </span>
                <span className="text-[11px] bg-sky-900 text-sky-200 px-2 py-0.5 rounded font-mono">
                  {pricing.warrantyYears}-Yr Warranty
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono">
                  ${pricing.minPrice.toLocaleString()} – ${pricing.maxPrice.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-sky-200/80 mt-1">
                Includes {pricing.equipmentType}, hurricane pad tie-downs, digital thermostat,
                nitrogen pressure test, and certified Florida commissioning.
              </p>
            </div>

            {/* Engineering Note */}
            <div className="flex items-start gap-2 text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-200">
              <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {sizing.notes[0]} Official quote requires an on-site Manual J duct inspection to verify
                static pressure and window heat gain.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <button
              onClick={() => {
                if (onRequestQuoteWithSpecs) {
                  onRequestQuoteWithSpecs({
                    sqFt,
                    tons: sizing.recommendedTons,
                    tier: targetTier
                  });
                }
              }}
              className="w-full bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Apply Sizing to Free Estimate Request</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
