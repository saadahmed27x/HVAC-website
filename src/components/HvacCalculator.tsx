import React, { useState, useId } from 'react';
import {
  calculateTonnage,
  calculateSeerSavings,
  estimateSystemPriceRange
} from '../utils/hvacCalculations';
import { Calculator, DollarSign, Info, ArrowUpRight } from 'lucide-react';

interface HvacCalculatorProps {
  onScheduleConsultation?: () => void;
}

export default function HvacCalculator({ onScheduleConsultation }: HvacCalculatorProps) {
  const sqFtInputId = useId();
  const ceilingInputId = useId();
  const currentSeerInputId = useId();

  const [sqFt, setSqFt] = useState(1800);
  const [ceilingHeight, setCeilingHeight] = useState(8);
  const [currentSeer, setCurrentSeer] = useState(10);
  const [targetTier, setTargetTier] = useState<'standard' | 'high' | 'ultra'>('high');
  const [includesDuctwork, setIncludesDuctwork] = useState(false);

  // Perform calculations
  const sizing = calculateTonnage(sqFt, ceilingHeight);
  const targetSeer2 = targetTier === 'standard' ? 15.2 : targetTier === 'high' ? 17.0 : 20.0;
  const savings = calculateSeerSavings(currentSeer, targetSeer2, sizing.recommendedTons);
  const pricing = estimateSystemPriceRange(sizing.recommendedTons, targetTier, includesDuctwork);

  return (
    <div className="bg-white border border-stone-300 shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-[#0b111a] text-white p-6 sm:p-8 border-b border-stone-800">
        <div className="flex items-center gap-2 text-[#c2784a] text-xs font-mono uppercase tracking-widest mb-1.5">
          <Calculator className="w-3.5 h-3.5" />
          <span>FLORIDA SIZING & SAVINGS COMPUTATION</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Calculate Sizing & Energy ROI
        </h3>
        <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-2xl font-light">
          Calibrated for Florida IECC Climate Zone 2 cooling loads, latent humidity extraction, and
          15.2+ SEER2 efficiency standards.
        </p>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Square Footage Slider */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono uppercase text-stone-700 tracking-wider mb-2">
              <label htmlFor={sqFtInputId}>Home Square Footage</label>
              <span className="font-bold text-[#c2784a] font-mono text-sm">
                {sqFt.toLocaleString()} SQ FT
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
              className="w-full h-1.5 bg-stone-200 appearance-none cursor-pointer accent-[#c2784a]"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
              <span>800 sq ft</span>
              <span>2,500 sq ft</span>
              <span>4,500 sq ft</span>
            </div>
          </div>

          {/* Ceiling Height */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono uppercase text-stone-700 tracking-wider mb-2">
              <label htmlFor={ceilingInputId}>Ceiling Height</label>
              <span className="font-bold text-stone-900 font-mono text-xs">{ceilingHeight} FT</span>
            </div>
            <select
              id={ceilingInputId}
              value={ceilingHeight}
              onChange={e => setCeilingHeight(Number(e.target.value))}
              className="w-full px-3 py-2 border border-stone-300 text-xs text-stone-900 bg-[#fbfbf9] focus:outline-none focus:border-[#c2784a]"
            >
              <option value={8}>8 ft (Standard Florida Ceiling)</option>
              <option value={9}>9 ft (Modern Florida Ceiling)</option>
              <option value={10}>10 ft (High Ceilings)</option>
              <option value={12}>12 ft (Vaulted / Cathedral Living Area)</option>
            </select>
          </div>

          {/* Current Old System SEER */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono uppercase text-stone-700 tracking-wider mb-2">
              <label htmlFor={currentSeerInputId}>Current AC Efficiency</label>
              <span className="font-bold text-stone-900 font-mono text-xs">{currentSeer} SEER</span>
            </div>
            <select
              id={currentSeerInputId}
              value={currentSeer}
              onChange={e => setCurrentSeer(Number(e.target.value))}
              className="w-full px-3 py-2 border border-stone-300 text-xs text-stone-900 bg-[#fbfbf9] focus:outline-none focus:border-[#c2784a]"
            >
              <option value={8}>8 SEER (Installed before 2000)</option>
              <option value={10}>10 SEER (Standard 2000–2006 system)</option>
              <option value={12}>12 SEER (Standard 2006–2010 system)</option>
              <option value={13}>13–14 SEER (Standard 2011–2018 system)</option>
            </select>
          </div>

          {/* Target Efficiency Tier */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-stone-700 tracking-wider mb-2">
              Replacement Tier
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'standard', label: '15.2 SEER2', sub: 'FL Standard' },
                { id: 'high', label: '17.0 SEER2', sub: 'Two-Stage' },
                { id: 'ultra', label: '20+ SEER2', sub: 'Inverter VFD' }
              ].map(tier => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setTargetTier(tier.id as any)}
                  className={`p-2.5 border text-center transition-all cursor-pointer ${
                    targetTier === tier.id
                      ? 'bg-stone-900 border-[#c2784a] text-white'
                      : 'border-stone-200 text-stone-600 hover:border-stone-400 bg-white'
                  }`}
                >
                  <p className="text-xs font-mono font-bold">{tier.label}</p>
                  <p className="text-[10px] opacity-75 mt-0.5">{tier.sub}</p>
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
              className="w-4 h-4 text-[#c2784a] focus:ring-[#c2784a] border-stone-300 cursor-pointer"
            />
            <label htmlFor="include-ducts" className="text-xs text-stone-700 font-light cursor-pointer">
              Include estimated ductwork balancing / replacement
            </label>
          </div>
        </div>

        {/* Results Column (7 cols) */}
        <div className="lg:col-span-7 bg-[#f4f3ef] p-6 sm:p-8 border border-stone-200 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-mono text-[#c2784a] uppercase tracking-wider mb-4">
              COMPUTED ENGINEERING VALUES
            </div>

            {/* Sizing & BTU Card */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-white p-4 border border-stone-200 shadow-2xs">
                <span className="text-[10px] font-mono text-stone-500 uppercase block">RECOMMENDED</span>
                <span className="text-2xl font-bold text-stone-900 font-mono">
                  {sizing.recommendedTons} Tons
                </span>
                <span className="text-[10px] text-[#c2784a] font-mono block mt-0.5">
                  {(sizing.totalBtu).toLocaleString()} BTUs
                </span>
              </div>

              <div className="bg-white p-4 border border-stone-200 shadow-2xs">
                <span className="text-[10px] font-mono text-stone-500 uppercase block">ANNUAL SAVINGS</span>
                <span className="text-2xl font-bold text-emerald-700 font-mono">
                  ${savings.annualDollarSavings}
                </span>
                <span className="text-[10px] text-stone-500 font-mono block mt-0.5">
                  ~{savings.annualKwhSaved.toLocaleString()} kWh/yr
                </span>
              </div>

              <div className="bg-white p-4 border border-stone-200 shadow-2xs col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono text-stone-500 uppercase block">10-YR ESTIMATED ROI</span>
                <span className="text-2xl font-bold text-stone-950 font-mono">
                  ${savings.tenYearDollarSavings.toLocaleString()}
                </span>
                <span className="text-[10px] text-stone-400 font-mono block mt-0.5">Cumulative reduction</span>
              </div>
            </div>

            {/* Pricing Range */}
            <div className="bg-[#0b111a] text-white p-6 border border-stone-800 mb-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] uppercase tracking-wider text-[#c2784a] font-mono flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>TRANSPARENT FLORIDA ESTIMATE</span>
                </span>
                <span className="text-[10px] font-mono border border-stone-700 px-2 py-0.5 text-stone-300">
                  {pricing.warrantyYears}-YR WARRANTY
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono">
                ${pricing.minPrice.toLocaleString()} – ${pricing.maxPrice.toLocaleString()}
              </div>
              <p className="text-xs text-stone-300 font-light mt-1.5 leading-relaxed">
                Includes {pricing.equipmentType}, hurricane pad tie-downs, digital thermostat,
                nitrogen pressure test, and Florida Building Code certified commissioning.
              </p>
            </div>

            {/* Engineering Note */}
            <div className="flex items-start gap-2.5 text-xs text-stone-600 bg-white p-3.5 border border-stone-200">
              <Info className="w-4 h-4 text-[#c2784a] shrink-0 mt-0.5" />
              <p className="leading-relaxed font-light">
                {sizing.notes[0]} Certified quotes require an on-site Manual J duct inspection to verify
                static pressure and window heat gain.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 pt-4 border-t border-stone-200">
            <button
              onClick={() => {
                if (onScheduleConsultation) {
                  onScheduleConsultation();
                }
              }}
              className="w-full bg-[#c2784a] hover:bg-[#a8643b] active:bg-[#91542f] text-white font-medium py-3 px-6 text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Schedule Equipment Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
