import React from 'react';
import { type ServiceDefinition, siteConfig } from '../config/siteConfig';
import LeadForm from '../components/LeadForm';
import {
  Wrench,
  ShieldCheck,
  RotateCcw,
  Flame,
  Wind,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';

interface ServiceDetailPageProps {
  service: ServiceDefinition;
  onNavigate: (path: string) => void;
  onRequestQuote: () => void;
}

export default function ServiceDetailPage({
  service,
  onNavigate,
  onRequestQuote
}: ServiceDetailPageProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench':
        return <Wrench className="w-8 h-8 text-sky-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-8 h-8 text-sky-600" />;
      case 'RotateCcw':
        return <RotateCcw className="w-8 h-8 text-sky-600" />;
      case 'Flame':
        return <Flame className="w-8 h-8 text-sky-600" />;
      case 'Wind':
        return <Wind className="w-8 h-8 text-sky-600" />;
      default:
        return <Wrench className="w-8 h-8 text-sky-600" />;
    }
  };

  // Find related services for internal linking
  const relatedServices = siteConfig.services.filter(s => s.id !== service.id).slice(0, 3);

  return (
    <div className="space-y-16 py-8">
      {/* Back button and breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => onNavigate('/services/')}
          className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1.5 cursor-pointer mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </button>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-900 text-xs font-bold">
              <span>{service.name} • Florida Service</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {service.fullTitle}
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              {service.leadParagraph}
            </p>

            {/* Quick Inclusions Highlight */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                Service Highlights & Inclusions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.includedItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Embedded Lead Capture Form (5 cols) */}
          <div className="lg:col-span-5">
            <LeadForm initialService={service.id} compact={false} />
          </div>
        </div>
      </div>

      {/* Common Problems Solved */}
      <section className="bg-white py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Diagnosing Your Symptoms
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Common Signs You Need {service.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Florida heat exposes weak capacitors, restricted coils, and drainage blockages quickly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.commonProblems.map((problem, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-slate-800 leading-relaxed">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Step-by-Step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            Our Workmanship Protocol
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-1">
            How We Execute {service.name}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Every step is structured around precision testing, upfront pricing, and certified Florida
            practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.processSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative"
            >
              <span className="text-xs font-bold font-mono text-sky-600 block mb-2">
                STEP {idx + 1}
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Service-Specific FAQs */}
      <section className="bg-slate-50 py-12 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Questions About {service.name}
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2 mb-2">
                  <HelpCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links to Related Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Related HVAC Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedServices.map(rel => (
            <div
              key={rel.id}
              onClick={() => onNavigate(`/services/${rel.slug}/`)}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-sky-300 shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <h4 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                {rel.name}
              </h4>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">{rel.shortDescription}</p>
              <div className="mt-4 text-xs font-bold text-sky-600 flex items-center gap-1">
                <span>View Service Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
