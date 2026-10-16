import React from 'react';
import { siteConfig } from '../config/siteConfig';
import ThreeHvacUnit from '../components/ThreeHvacUnit';
import LeadForm from '../components/LeadForm';
import HvacCalculator from '../components/HvacCalculator';
import {
  ShieldCheck,
  Phone,
  Wrench,
  CheckCircle,
  Clock,
  Award,
  ChevronRight,
  Wind,
  Flame,
  RotateCcw,
  Sparkles,
  MapPin,
  Star
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
  const getServiceIcon = (iconName: string) => {
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
    <div className="space-y-16 sm:space-y-24">
      {/* ==================================================== */}
      {/* 1. HERO SECTION (Split-Layout with Interactive 3D)  */}
      {/* ==================================================== */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-900 text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-sky-600" />
                <span>Central Florida Residential Cooling & Heating</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
                Reliable HVAC Services for Your Florida Home
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Get expert air conditioning repairs, precision 15.2+ SEER2 system replacements, and
                seasonal maintenance with upfront flat pricing and certified Florida technicians.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onRequestQuote}
                  className="bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all text-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>Request Service</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {siteConfig.business.isPhoneVerified ? (
                  <a
                    href={`tel:${siteConfig.business.rawPhone}`}
                    className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold px-6 py-3.5 rounded-xl transition-all text-sm flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-sky-600" />
                    <span>Call {siteConfig.business.displayPhone}</span>
                  </a>
                ) : (
                  <button
                    onClick={onOpenAiDiagnostic}
                    className="bg-slate-900 hover:bg-slate-800 text-sky-300 font-bold px-6 py-3.5 rounded-xl transition-all text-sm flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    <span>Smart Diagnostics</span>
                  </button>
                )}
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-slate-200/80 grid grid-cols-3 gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">Upfront Flat Rates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">EPA 608 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">10-Yr Warranties</span>
                </div>
              </div>
            </div>

            {/* Right Interactive 3D Model Studio (6 Cols) */}
            <div className="lg:col-span-6">
              <ThreeHvacUnit />
              <p className="text-[11px] text-slate-600 text-center mt-2">
                👆 Drag to rotate 3D heat pump • Toggle exploded view or airflow stream in controls
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 2. TRUTHFUL FLORIDA STANDARDS & CREDENTIALS         */}
      {/* ==================================================== */}
      <section className="bg-slate-900 text-white py-12 rounded-3xl mx-4 sm:mx-6 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
              Florida Building Code & Efficiency Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1">
              Engineered Specifically for Florida’s Climate
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Florida homes demand more than generic HVAC advice. High humidity, tropical storms, and
              3,000+ cooling hours require strict regional standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
              <Award className="w-8 h-8 text-sky-400 mb-3" />
              <h3 className="text-base font-bold text-white">15.2+ SEER2 Required</h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Mandatory federal minimum efficiency for Southeast Climate Zone 2. Cuts cooling
                electric draw significantly over older 10–12 SEER units.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
              <ShieldCheck className="w-8 h-8 text-sky-400 mb-3" />
              <h3 className="text-base font-bold text-white">175 MPH Hurricane Pads</h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Every outdoor condenser is anchored to heavy composite foundations with Florida
                Building Code approved stainless steel hold-down brackets.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
              <Wind className="w-8 h-8 text-sky-400 mb-3" />
              <h3 className="text-base font-bold text-white">45–55% Target Humidity</h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Multi-stage and variable-speed inverter blowers run longer at lower speeds, wringing
                gallons of muggy moisture out of indoor air.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
              <Clock className="w-8 h-8 text-sky-400 mb-3" />
              <h3 className="text-base font-bold text-white">Rapid Dispatch</h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Prioritized arrival for homes with infants, elderly, or medical vulnerability when
                temperatures exceed safe indoor levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 3. SERVICES OVERVIEW SECTION                        */}
      {/* ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Comprehensive Residential Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 mt-1">
              Professional HVAC Services
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              From emergency diagnostic calls to precision new installations, our certified technicians
              handle all residential equipment types.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/services/')}
            className="text-sm font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Services</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.services.map(service => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {getServiceIcon(service.iconName)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {service.shortDescription}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Common Problems Solved:
                  </p>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {service.commonProblems.slice(0, 2).map((prob, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-sky-600 font-bold">•</span>
                        <span className="line-clamp-1">{prob}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate(`/services/${service.slug}/`)}
                  className="text-xs font-bold text-sky-600 hover:text-sky-800 cursor-pointer"
                >
                  Learn More & Pricing →
                </button>
                <button
                  onClick={onRequestQuote}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 cursor-pointer"
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================== */}
      {/* 4. INTERACTIVE SIZING & ENERGY SAVINGS CALCULATOR   */}
      {/* ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <HvacCalculator
          onRequestQuoteWithSpecs={specs => {
            onRequestQuote();
          }}
        />
      </section>

      {/* ==================================================== */}
      {/* 5. HOW IT WORKS (TRUTHFUL STEP-BY-STEP JOURNEY)     */}
      {/* ==================================================== */}
      <section className="bg-slate-100 py-16 rounded-3xl mx-4 sm:mx-6 border border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Transparent Service Journey
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-1">
              How We Service Your HVAC System
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              No guesswork, no hidden trip fees, and no aggressive upselling. Here is exactly what to
              expect when you request service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Submit Service Request',
                desc: 'Fill out our simple form or call dispatch. We gather your system details, symptoms, and scheduling preference.'
              },
              {
                step: '02',
                title: 'Thorough Diagnostics',
                desc: 'Our technician inspects electrical draw, subcooling, refrigerant pressures, and airflow with calibrated digital gauges.'
              },
              {
                step: '03',
                title: 'Clear Fixed-Price Quote',
                desc: 'We present clear repair or replacement options with flat rates in writing before turning a single wrench.'
              },
              {
                step: '04',
                title: 'Precision Work & Testing',
                desc: 'We complete the repair using OEM parts, test temperature drop across your coils, and provide warranty documentation.'
              }
            ].map(item => (
              <div key={item.step} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-2xl font-black font-mono text-sky-600 block mb-2">
                  {item.step}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 6. VERIFIED CENTRAL FLORIDA SERVICE AREAS           */}
      {/* ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Service Territory
            </span>
            <h2 className="text-3xl font-black text-slate-950 mt-1">Central Florida Communities</h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              We genuinely service homeowners across Orange, Seminole, and Osceola counties with fully
              stocked dispatch vans.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/service-areas/')}
            className="text-sm font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All ZIP Codes & Coverage</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {siteConfig.serviceAreas.map(area => (
            <div
              key={area.name}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-sky-300 transition-colors"
            >
              <div className="flex items-center gap-1.5 text-sky-600 text-xs font-bold mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{area.county}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{area.name}</h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{area.highlights}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================== */}
      {/* 7. VERIFIED REVIEWS & HOMEOWNER FAQS                */}
      {/* ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Reviews (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Homeowner Feedback
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1">
                Verified Testimonials
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Representative feedback from Central Florida cooling and heating clients.
              </p>
            </div>

            <div className="space-y-4">
              {siteConfig.testimonials.map(t => (
                <div key={t.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">{t.date}</span>
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed">"{t.content}"</p>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{t.author}</span>
                    <span className="text-sky-600 font-medium">{t.city}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('/reviews/')}
              className="text-xs font-bold text-sky-600 hover:text-sky-800 cursor-pointer"
            >
              Read More Reviews or Submit Feedback →
            </button>
          </div>

          {/* FAQs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1">
                Florida HVAC Answers
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Honest explanations about pricing, efficiency, and repairs.
              </p>
            </div>

            <div className="space-y-3">
              {siteConfig.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5 flex items-start gap-2">
                    <span className="text-sky-600 font-mono">Q.</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed pl-5">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 8. FINAL CONVERSION CTA SECTION WITH LEAD FORM      */}
      {/* ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Ready for Honest Florida HVAC Service?
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Request Your Service or Free Estimate Today
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Whether you need immediate emergency repair, a seasonal 24-point tune-up, or a
                high-efficiency 15.2+ SEER2 heat pump quote, our dispatch team is ready to help.
              </p>

              <div className="pt-2 space-y-2 text-xs text-slate-300">
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Licensed & insured Florida contractor (CAC-DEMO1234)</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Transparent flat-rate pricing before work starts</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Satisfaction guarantee on all repairs and installations</span>
                </p>
              </div>

              <div className="pt-4">
                <p className="text-xs text-slate-400">Prefer to speak directly with dispatch?</p>
                <p className="text-xl font-black text-amber-400 font-mono mt-0.5">
                  {siteConfig.business.displayPhone}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
