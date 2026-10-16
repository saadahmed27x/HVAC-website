import React, { useState } from 'react';
import { type DiagnosticResponse } from '../server/geminiService';
import { X, Sparkles, AlertTriangle, ShieldCheck, Wrench, Loader2, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface AiDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScheduleService: (symptom: string) => void;
}

export default function AiDiagnosticModal({
  isOpen,
  onClose,
  onScheduleService
}: AiDiagnosticModalProps) {
  const [symptom, setSymptom] = useState('');
  const [systemAge, setSystemAge] = useState('5-10 years');
  const [soundOrSmell, setSoundOrSmell] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosticResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickSymptoms = [
    'AC blowing warm air while outdoor fan runs',
    'Outdoor unit buzzing but fan is not spinning',
    'Water dripping around indoor air handler / ceiling float switch tripped',
    'Ice or frost building up on copper refrigerant lines',
    'AC constantly short-cycling on and off every 3 minutes'
  ];

  const handleRunDiagnostic = async (textToRun?: string) => {
    const query = textToRun || symptom;
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/diagnostics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptom: query.trim(),
          systemAge,
          soundOrSmell: soundOrSmell.trim()
        })
      });

      if (!res.ok) {
        throw new Error('Diagnostics API returned error status');
      }

      const data: DiagnosticResponse = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Diagnostic error:', err);
      setError('Unable to reach diagnostics service. Please use our direct dispatch phone.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white max-w-2xl w-full border border-stone-300 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0b111a] text-white p-5 sm:p-6 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-stone-900 border border-stone-700 flex items-center justify-center text-[#c2784a]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Smart HVAC Diagnostics</h3>
                <span className="text-[10px] font-mono bg-stone-800 text-[#c2784a] border border-[#c2784a]/40 px-2 py-0.5">
                  gemini-3.1-flash-lite
                </span>
              </div>
              <p className="text-xs text-stone-400 font-light font-mono">
                Low-latency Florida troubleshooting & safety assessment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 cursor-pointer"
            aria-label="Close diagnostics modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 bg-[#fbfbf9]">
          {!result ? (
            <>
              {/* Quick Symptom Chips */}
              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-700 tracking-wider mb-2">
                  Common Florida HVAC Symptoms (Click to evaluate)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {quickSymptoms.map(chip => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => {
                        setSymptom(chip);
                        handleRunDiagnostic(chip);
                      }}
                      className="text-xs text-stone-700 bg-white hover:bg-stone-100 hover:text-stone-950 border border-stone-300 px-3 py-1.5 transition-all text-left cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptom Input Form */}
              <div className="space-y-3 pt-2">
                <div>
                  <label
                    htmlFor="diag-symptom"
                    className="block text-[11px] font-mono uppercase text-stone-700 tracking-wider mb-1"
                  >
                    Describe What Your AC or Heating Is Doing
                  </label>
                  <textarea
                    id="diag-symptom"
                    rows={3}
                    placeholder="e.g. The air coming out feels humid and warm. Thermostat is set to 72 but indoor temp is 79. Heard a quiet humming earlier..."
                    value={symptom}
                    onChange={e => setSymptom(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-stone-300 text-xs text-stone-900 bg-white focus:outline-none focus:border-[#c2784a] resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="diag-age"
                      className="block text-[11px] font-mono uppercase text-stone-700 tracking-wider mb-1"
                    >
                      Approximate System Age
                    </label>
                    <select
                      id="diag-age"
                      value={systemAge}
                      onChange={e => setSystemAge(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 text-xs text-stone-800 bg-white focus:outline-none focus:border-[#c2784a]"
                    >
                      <option value="under 3 years">Under 3 years (Modern / likely in warranty)</option>
                      <option value="4-8 years">4 – 8 years (Mid-life)</option>
                      <option value="9-12 years">9 – 12 years (Older system)</option>
                      <option value="over 12 years">12+ years (Near end of life)</option>
                      <option value="unknown">I'm not sure</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="diag-sound"
                      className="block text-[11px] font-mono uppercase text-stone-700 tracking-wider mb-1"
                    >
                      Unusual Sounds or Odors
                    </label>
                    <input
                      id="diag-sound"
                      type="text"
                      placeholder="e.g. Buzzing, burning odor, clicking"
                      value={soundOrSmell}
                      onChange={e => setSoundOrSmell(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 text-xs text-stone-800 bg-white focus:outline-none focus:border-[#c2784a]"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-800 font-mono">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={() => handleRunDiagnostic()}
                disabled={loading || !symptom.trim()}
                className="w-full bg-[#c2784a] hover:bg-[#a8643b] active:bg-[#91542f] text-white font-medium py-3 px-6 text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing HVAC Symptoms with Gemini 3.1 Flash-Lite...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-stone-200" />
                    <span>Run Fast Diagnostic Evaluation</span>
                  </>
                )}
              </button>
            </>
          ) : (
            /* Diagnostic Results View */
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Summary Banner */}
              <div
                className={`p-4 border flex items-start gap-3 ${
                  result.estimatedUrgency === 'high' || result.estimatedUrgency === 'immediate-hazard'
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-white border-stone-300 text-stone-950'
                }`}
              >
                <AlertTriangle className="w-5 h-5 shrink-0 text-[#c2784a] mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold font-mono uppercase">Diagnostic Evaluation</h4>
                  <p className="text-xs mt-1 leading-relaxed">{result.summary}</p>
                </div>
              </div>

              {/* Potential Causes */}
              <div>
                <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Most Likely Causes in Florida's Climate
                </h5>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {result.potentialCauses.map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#c2784a] font-mono mt-0.5">•</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safe Homeowner Steps */}
              <div className="bg-white p-4 border border-stone-200">
                <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-800 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#c2784a]" />
                  <span>Safe Checks You Can Perform Right Now</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {result.safeTroubleshootingSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#c2784a] font-bold">✓</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Florida Climate Context */}
              <p className="text-xs text-stone-600 italic bg-[#f4f3ef] p-3 border border-stone-200">
                💡 <strong>Florida note:</strong> {result.floridaClimateConsiderations}
              </p>

              {/* Next Steps CTA */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => {
                    onScheduleService(symptom);
                    onClose();
                  }}
                  className="flex-1 bg-[#c2784a] hover:bg-[#a8643b] text-white font-medium py-3 px-4 text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Schedule Service with This Diagnostic</span>
                </button>
                <button
                  onClick={() => {
                    setResult(null);
                    setSymptom('');
                  }}
                  className="px-4 py-3 border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-mono cursor-pointer"
                >
                  New Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
