import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import ThreeHvacUnit from '../components/ThreeHvacUnit';
import LeadForm from '../components/LeadForm';
import HvacCalculator from '../components/HvacCalculator';
import {
  Phone,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check,
  Gauge,
  Thermometer,
  Fan,
  Wind
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onRequestQuote: () => void;
  onOpenAiDiagnostic: () => void;
}

export default function HomePage({
  onNavigate,
  onRequestQuote,
  onOpenAiDiagnostic
}: HomePageProps) {
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);

  const curatedServices = [
    {
      num: '01',
      category: 'AC REPAIR',
      title: 'Get the cool air back without the guesswork.',
      desc: 'Rapid diagnostics for sudden no-cooling emergencies, frozen coils, loud capacitor hums, and clogged condensate lines across Central Florida.',
      slug: 'ac-repair',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80'
    },
    {
      num: '02',
      category: 'AC INSTALLATION',
      title: 'A right-sized cooling system for the space.',
      desc: 'Manual J load calculations ensuring your new 15.2+ SEER2 system dehumidifies efficiently rather than short-cycling in humid Florida conditions.',
      slug: 'ac-installation',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      num: '03',
      category: 'HEAT PUMPS',
      title: 'Year-round comfort that operates quietly.',
      desc: 'Dual-fuel and variable-capacity inverter heat pumps that deliver seamless summer cooling and gentle winter morning heating.',
      slug: 'heating-and-heat-pumps',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    },
    {
      num: '04',
      category: 'MAINTENANCE',
      title: 'Preventative care before the heat sets in.',
      desc: 'Comprehensive 24-point seasonal tune-ups including chemical coil cleaning, electrical amp checks, and drain line treatment to prevent ceiling leaks.',
      slug: 'preventative-maintenance',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
    },
    {
      num: '05',
      category: 'INDOOR AIR QUALITY',
      title: 'Sub-50% humidity and cleaner indoor air.',
      desc: 'Whole-house dehumidification, HEPA filtration, and germicidal UV systems engineered to prevent biological growth in Florida duct systems.',
      slug: 'indoor-air-quality',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  return (
    <div className="bg-[#fbfbf9] text-stone-900 selection:bg-[#c2784a]/20 selection:text-[#91542f]">
      {/* ==================================================== */}
      {/* HERO SECTION — Architectural Twilight Residence     */}
      {/* ==================================================== */}
      <section className="relative min-h-[85vh] flex items-center bg-[#0b111a] text-white overflow-hidden">
        {/* Cinematic Architectural Background Image with Multi-layer Vignette */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105 transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85')`
          }}
        />
        {/* Gradient overlay for contrast and editorial tone */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0b111a] via-[#0b111a]/85 to-transparent" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0b111a] via-transparent to-[#0b111a]/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28 w-full">
          <div className="max-w-3xl space-y-8">
            {/* Monospace Section Tag */}
            <div className="inline-flex items-center gap-2.5 font-mono text-xs tracking-widest text-[#c2784a] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#c2784a]" />
              <span>01 —— LOCAL HVAC SERVICE IN CENTRAL FLORIDA</span>
            </div>

            {/* Giant Architectural Headline with Editorial Serif Emphasis */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              Comfort,
              <br />
              considered
              <br />
              <span className="text-[#c2784a] font-serif italic font-normal">
                for Florida living.
              </span>
            </h1>

            {/* Lead Copy */}
            <p className="text-base sm:text-lg text-stone-300 font-light leading-relaxed max-w-xl">
              AC repair, installation, heat pumps, and maintenance for homes across Orlando, Winter
              Park, and Central Florida. Clear diagnosis, thoughtful recommendations, and work done
              properly.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`tel:${siteConfig.business.rawPhone}`}
                className="bg-[#c2784a] hover:bg-[#a8643b] text-white text-sm font-medium px-7 py-3.5 flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <span>Call now</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={onRequestQuote}
                className="text-stone-200 hover:text-white text-sm font-medium border-b border-stone-400 hover:border-white pb-1 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Request an estimate</span>
                <ArrowRight className="w-4 h-4 text-[#c2784a]" />
              </button>

              <button
                onClick={onOpenAiDiagnostic}
                className="bg-stone-900/80 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white text-xs font-mono px-4 py-3 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c2784a]" />
                <span>Smart AI Diagnostics</span>
              </button>
            </div>

            {/* Subtle Metadata Strip */}
            <div className="pt-8 border-t border-stone-800/80 flex flex-wrap items-center gap-6 text-xs font-mono text-stone-400">
              <div className="flex items-center gap-2">
                <span className="text-[#c2784a]">✓</span>
                <span>FL Lic # {siteConfig.business.licenseNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#c2784a]">✓</span>
                <span>Upfront flat-rate pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#c2784a]">✓</span>
                <span>EPA 608 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* TECHNICAL RIBBON (Monogram Strip)                   */}
      {/* ==================================================== */}
      <section className="border-y border-stone-200 bg-[#f4f3ef]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-stone-200">
          <div className="p-6 sm:p-8 flex items-baseline gap-4">
            <span className="font-mono text-xl sm:text-2xl font-bold text-[#c2784a]">AC</span>
            <div>
              <div className="text-xs font-mono tracking-wider font-semibold text-stone-900 uppercase">
                REPAIR & DIAGNOSTICS
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">Emergency cooling arrival</div>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex items-baseline gap-4">
            <span className="font-mono text-xl sm:text-2xl font-bold text-[#c2784a]">HP</span>
            <div>
              <div className="text-xs font-mono tracking-wider font-semibold text-stone-900 uppercase">
                15.2+ SEER2 HEAT PUMP
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">Florida code compliant</div>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex items-baseline gap-4">
            <span className="font-mono text-xl sm:text-2xl font-bold text-[#c2784a]">IAQ</span>
            <div>
              <div className="text-xs font-mono tracking-wider font-semibold text-stone-900 uppercase">
                AIR QUALITY & HUMIDITY
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">Sub-50% moisture target</div>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex items-baseline gap-4">
            <span className="font-mono text-xl sm:text-2xl font-bold text-[#c2784a]">ZIP</span>
            <div>
              <div className="text-xs font-mono tracking-wider font-semibold text-stone-900 uppercase">
                CENTRAL FLORIDA AREA
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">Orange • Seminole • Osceola</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 01 — THE BRIEF                              */}
      {/* ==================================================== */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="font-mono text-xs tracking-widest text-[#c2784a] uppercase">
              01 —— THE BRIEF
            </div>
            <div className="text-xs text-stone-500 leading-relaxed max-w-xs">
              Florida homes endure over 3,000 cooling hours every year. HVAC is not a convenience in
              Central Florida—it is essential home preservation.
            </div>
          </div>

          {/* Right Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-950 leading-[1.1]">
              The best service call
              <br />
              <span className="text-stone-400 font-serif italic font-normal">
                feels straightforward.
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-stone-700 leading-relaxed font-light max-w-2xl">
              When the temperature is wrong, you do not need a high-pressure sales pitch. You need
              an experienced technician who can identify the actual root issue, explain your options
              plainly, and leave your home better than they found it.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-stone-600 border-t border-stone-200">
              <div className="space-y-2">
                <div className="font-mono text-xs font-semibold uppercase text-stone-900">
                  DIAGNOSTIC FIRST
                </div>
                <p className="text-stone-600 leading-relaxed text-xs">
                  We measure static duct pressure, superheat and subcooling refrigerant levels, and
                  motor electrical amp draws before recommending a repair.
                </p>
              </div>
              <div className="space-y-2">
                <div className="font-mono text-xs font-semibold uppercase text-stone-900">
                  FLAT-RATE TRANSPARENCY
                </div>
                <p className="text-stone-600 leading-relaxed text-xs">
                  Every replacement part and repair is priced from a standardized flat-rate book.
                  You always approve the exact dollar amount before any work begins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 02 — SERVICES FOR FLORIDA SPACES            */}
      {/* ==================================================== */}
      <section className="py-20 sm:py-28 bg-[#f4f3ef] border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <div className="font-mono text-xs tracking-widest text-[#c2784a] uppercase">
                02 —— SERVICES FOR FLORIDA SPACES
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-950">
                Start with{' '}
                <span className="text-[#c2784a] font-serif italic font-normal">what changed.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 text-sm text-stone-600">
              <p>
                From sudden AC failure to planning a 15.2+ SEER2 heat pump replacement, every visit
                begins with diagnosing what is happening in your home.
              </p>
              <button
                onClick={() => onNavigate('/services/')}
                className="mt-3 text-xs font-mono text-[#c2784a] hover:text-[#91542f] flex items-center gap-1.5 cursor-pointer font-medium"
              >
                <span>View all service details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Service Layout (Editorial 3-Col Split) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
            {/* Left: Numbered Service List (5 cols) */}
            <div className="lg:col-span-5 divide-y divide-stone-300 border-t border-b border-stone-300">
              {curatedServices.map((service, idx) => (
                <div
                  key={service.slug}
                  onMouseEnter={() => setSelectedServiceIndex(idx)}
                  onClick={() => onNavigate(`/services/${service.slug}/`)}
                  className={`py-5 px-3 transition-colors cursor-pointer group flex items-start justify-between gap-4 ${
                    selectedServiceIndex === idx ? 'bg-white/80' : 'hover:bg-white/40'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#c2784a] font-bold">
                        {service.num}
                      </span>
                      <span className="text-[11px] font-mono tracking-wider text-stone-500 uppercase">
                        {service.category}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-[#c2784a] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                      {service.desc}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-[#c2784a] shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              ))}
            </div>

            {/* Center: Curated Architectural Image (4 cols) */}
            <div className="lg:col-span-4 h-full">
              <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] overflow-hidden bg-stone-900 shadow-md">
                <img
                  src={curatedServices[selectedServiceIndex].image}
                  alt={curatedServices[selectedServiceIndex].title}
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#c2784a]">
                    FLORIDA INSTALLATION & SERVICE
                  </div>
                  <div className="text-sm font-semibold mt-0.5">
                    {curatedServices[selectedServiceIndex].category}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Field Note Callout (3 cols) */}
            <div className="lg:col-span-3 space-y-6 bg-white p-6 sm:p-8 border border-stone-200">
              <div className="font-mono text-[11px] tracking-widest text-[#c2784a] uppercase">
                FIELD NOTE / 001
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-stone-950 leading-snug">
                Comfort is a system, not a single room.
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                Good HVAC service looks at the outdoor condenser, indoor air handler, return duct
                sizing, and building envelope together. A unit that cools without dehumidifying leaves
                Florida homes clammy.
              </p>

              <div className="pt-2 border-t border-stone-100">
                <button
                  onClick={() => onNavigate(`/services/${curatedServices[selectedServiceIndex].slug}/`)}
                  className="text-xs font-mono font-medium text-stone-900 hover:text-[#c2784a] flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore service specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 03 — THE DIFFERENCE (Dark Obsidian)          */}
      {/* ==================================================== */}
      <section className="py-24 sm:py-32 bg-[#0b111a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="font-mono text-xs tracking-widest text-[#c2784a] uppercase">
                03 —— THE DIFFERENCE
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                HVAC service
                <br />
                <span className="text-[#c2784a] font-serif italic font-normal">
                  should feel simple.
                </span>
              </h2>
              <p className="text-sm text-stone-400 font-light leading-relaxed max-w-md pt-2">
                Expressed in the small decisions that make a service visit feel clear, careful, and
                worth trusting.
              </p>
            </div>

            {/* 4 Architectural Cards with Hairline Dividers (7 cols) */}
            <div className="lg:col-span-7 divide-y divide-stone-800 border-t border-b border-stone-800">
              <div className="py-6 grid grid-cols-12 gap-4 items-baseline">
                <div className="col-span-2 font-mono text-xs text-[#c2784a]">01</div>
                <div className="col-span-10 space-y-1.5">
                  <h3 className="text-lg font-bold text-white">Clear communication</h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    No confusing technical jargon or surprise pricing. Every diagnosis is
                    explained in plain language with written flat-rate estimates before work begins.
                  </p>
                </div>
              </div>

              <div className="py-6 grid grid-cols-12 gap-4 items-baseline">
                <div className="col-span-2 font-mono text-xs text-[#c2784a]">02</div>
                <div className="col-span-10 space-y-1.5">
                  <h3 className="text-lg font-bold text-white">
                    Diagnosis before recommendation
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    We look for the actual underlying failure first. We measure electrical draw,
                    temperatures, and refrigerant pressures before offering repair or replacement
                    options.
                  </p>
                </div>
              </div>

              <div className="py-6 grid grid-cols-12 gap-4 items-baseline">
                <div className="col-span-2 font-mono text-xs text-[#c2784a]">03</div>
                <div className="col-span-10 space-y-1.5">
                  <h3 className="text-lg font-bold text-white">Respect for your home</h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Technicians wear clean uniforms and protective boot covers, use drop cloths on
                    your flooring, and clean up thoroughly after testing and completing the job.
                  </p>
                </div>
              </div>

              <div className="py-6 grid grid-cols-12 gap-4 items-baseline">
                <div className="col-span-2 font-mono text-xs text-[#c2784a]">04</div>
                <div className="col-span-10 space-y-1.5">
                  <h3 className="text-lg font-bold text-white">Long-term thinking</h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Repair when it makes financial sense. Replace only when equipment is
                    compromised, unsafe, or inefficient. We prioritize your long-term energy savings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 04 — INTERACTIVE 3D & SIZING STUDIO          */}
      {/* ==================================================== */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="font-mono text-xs tracking-widest text-[#c2784a] uppercase">
            04 —— ENGINEERING & 3D STUDIO
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-950">
            Precision engineering for{' '}
            <span className="text-[#c2784a] font-serif italic font-normal">
              Florida coastal heat.
            </span>
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Interact with our 3D heat pump model below to inspect the inverter compressor,
            anti-corrosion aluminum fins, and dual-mode airflow cooling simulation.
          </p>
        </div>

        {/* 3D Studio Container */}
        <div className="bg-[#0b111a] rounded-sm p-4 sm:p-6 border border-stone-800 shadow-xl">
          <ThreeHvacUnit />
          <div className="text-center pt-3 text-[11px] font-mono text-stone-400">
            DRAG TO ROTATE 360° • EXPLODED VIEW • AIRFLOW PARTICLE SIMULATION
          </div>
        </div>

        {/* Energy Savings & Tonnage Calculator Component */}
        <div className="pt-6">
          <HvacCalculator onScheduleConsultation={onRequestQuote} />
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 05 — A CALMER PROCESS                       */}
      {/* ==================================================== */}
      <section className="py-20 sm:py-28 bg-[#f4f3ef] border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="font-mono text-xs tracking-widest text-[#c2784a] uppercase">
                05 —— A CALMER PROCESS
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-950 leading-[1.1]">
                Know what
                <br />
                <span className="text-[#c2784a] font-serif italic font-normal">
                  happens next.
                </span>
              </h2>

              <div className="p-6 bg-white border border-stone-200 space-y-2 mt-4">
                <div className="font-mono text-[11px] tracking-widest text-[#c2784a] uppercase">
                  FIELD NOTE / 002
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Good service starts by reducing the unknowns. The first call or online inquiry is
                  a conversation, not a sales commitment.
                </p>
              </div>
            </div>

            {/* 4 Process Steps (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3 p-6 bg-white border border-stone-200">
                <div className="font-mono text-xl font-bold text-[#c2784a]">01</div>
                <h3 className="text-base font-bold text-stone-900">Tell us what changed.</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Call dispatch or submit our quick 2-minute request. Share what sounds, smells, or
                  temperature issues you notice.
                </p>
              </div>

              <div className="space-y-3 p-6 bg-white border border-stone-200">
                <div className="font-mono text-xl font-bold text-[#c2784a]">02</div>
                <h3 className="text-base font-bold text-stone-900">We diagnose the problem.</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  An EPA-certified technician arrives on time, tests electrical and refrigeration
                  components, and isolates the cause.
                </p>
              </div>

              <div className="space-y-3 p-6 bg-white border border-stone-200">
                <div className="font-mono text-xl font-bold text-[#c2784a]">03</div>
                <h3 className="text-base font-bold text-stone-900">We explain your options.</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  You get an upfront flat-rate price quote. We outline immediate fixes vs. long-term
                  efficiency choices before starting work.
                </p>
              </div>

              <div className="space-y-3 p-6 bg-white border border-stone-200">
                <div className="font-mono text-xl font-bold text-[#c2784a]">04</div>
                <h3 className="text-base font-bold text-stone-900">We get your comfort back.</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Work is completed with clean craftsmanship, tested for target supply air
                  temperatures, and backed by a 100% guarantee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 06 — NEXT STEP (Direct Dispatch & Form)      */}
      {/* ==================================================== */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="font-mono text-xs tracking-widest text-[#c2784a] uppercase">
              06 —— NEXT STEP
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-950 leading-[1.1]">
              Let’s get your
              <br />
              <span className="text-[#c2784a] font-serif italic font-normal">comfort back.</span>
            </h2>

            <p className="text-sm text-stone-600 leading-relaxed">
              Tell us what is happening, share your Central Florida ZIP code, and our dispatch team
              will confirm an arrival window or immediate diagnostic technician.
            </p>

            <div className="space-y-4 pt-4 border-t border-stone-200">
              <a
                href={`tel:${siteConfig.business.rawPhone}`}
                className="flex items-center gap-3 text-stone-900 hover:text-[#c2784a] transition-colors"
              >
                <div className="w-10 h-10 bg-stone-100 border border-stone-300 flex items-center justify-center text-[#c2784a]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono tracking-wider text-stone-500 uppercase">
                    DIRECT DISPATCH PHONE
                  </div>
                  <div className="font-mono text-base font-bold">
                    {siteConfig.business.displayPhone}
                  </div>
                </div>
              </a>

              <div className="text-xs text-stone-500 space-y-1 font-mono pt-2">
                <p>Mon – Sat: 7:00 AM – 7:00 PM</p>
                <p>24/7 Emergency Dispatch for critical Florida cooling outages</p>
                <p>Office: {siteConfig.business.address.street}, Winter Park, FL</p>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-stone-300 shadow-sm">
            <LeadForm onSuccess={() => onNavigate('/thank-you/')} />
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 07 — KEEP EXPLORING                          */}
      {/* ==================================================== */}
      <section className="py-20 sm:py-24 bg-[#f4f3ef] border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="space-y-2">
            <div className="font-mono text-xs tracking-widest text-[#c2784a] uppercase">
              07 —— KEEP EXPLORING
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-950">
              Good work{' '}
              <span className="text-[#c2784a] font-serif italic font-normal">leaves a trace.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              onClick={() => onNavigate('/service-areas/')}
              className="p-8 bg-white border border-stone-300 hover:border-[#c2784a] transition-all cursor-pointer group flex flex-col justify-between h-48"
            >
              <div>
                <div className="text-[11px] font-mono text-[#c2784a] uppercase">REGIONAL SERVICE</div>
                <h3 className="text-lg font-bold text-stone-900 mt-2 group-hover:text-[#c2784a]">
                  See the service areas
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Orange, Seminole & Osceola counties coverage map.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-stone-900 group-hover:text-[#c2784a]">
                <span>Verify your ZIP code</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onNavigate('/reviews/')}
              className="p-8 bg-white border border-stone-300 hover:border-[#c2784a] transition-all cursor-pointer group flex flex-col justify-between h-48"
            >
              <div>
                <div className="text-[11px] font-mono text-[#c2784a] uppercase">TESTIMONIALS</div>
                <h3 className="text-lg font-bold text-stone-900 mt-2 group-hover:text-[#c2784a]">
                  Read verified reviews
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Honest feedback from Florida homeowners.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-stone-900 group-hover:text-[#c2784a]">
                <span>View ratings</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={onRequestQuote}
              className="p-8 bg-[#0b111a] text-white border border-stone-800 hover:border-[#c2784a] transition-all cursor-pointer group flex flex-col justify-between h-48"
            >
              <div>
                <div className="text-[11px] font-mono text-[#c2784a] uppercase">ESTIMATE</div>
                <h3 className="text-lg font-bold text-white mt-2 group-hover:text-[#c2784a]">
                  Request an estimate
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Transparent options and scheduled technician arrival.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#c2784a] group-hover:text-white">
                <span>Book now</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
