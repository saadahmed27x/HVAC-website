import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-sky-600 text-xs font-bold uppercase tracking-wider mb-1">
          <Shield className="w-4 h-4" />
          <span>Legal & Consumer Protection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 mt-2">
          Effective Date: October 2026 • Premium HVAC Demonstration Brand
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-6 leading-relaxed">
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            When you request HVAC service, schedule a consultation, or use our smart diagnostic tool,
            we collect only information strictly necessary to fulfill your residential cooling or
            heating request:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Contact Information:</strong> Your name, phone number, email address, and service ZIP code.
            </li>
            <li>
              <strong>Service Details:</strong> Information regarding your equipment symptoms, unit age, and preferred arrival window.
            </li>
            <li>
              <strong>Technical Usage Data:</strong> Basic browser telemetry and session cookies necessary for site performance and spam mitigation.
            </li>
          </ul>
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. How We Use Your Information</h2>
          <p>Your submitted information is utilized exclusively for:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Coordinating technician dispatch and verifying service arrival windows.</li>
            <li>Providing accurate written estimates and calculating equipment sizing.</li>
            <li>Registering 10-year manufacturer warranties upon equipment installation completion.</li>
            <li>Communicating appointment reminders via telephone or SMS confirmation.</li>
          </ul>
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Zero Sale of Personal Data</h2>
          <p>
            We strictly do <strong>not</strong> sell, rent, or trade your personal information to third-party
            marketers, data brokers, or lead generation networks. Your data is shared only with our
            internal dispatch coordinators, certified service technicians, and authorized equipment
            distributors when registering warranties.
          </p>
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Demonstration Notice & Contact</h2>
          <p>
            This website is currently configured as a demonstration template for residential HVAC
            contractors in Florida. For inquiries regarding data practices or to update your
            contact details, reach out to our administration at{' '}
            <a href={`mailto:${siteConfig.business.email}`} className="text-sky-600 font-semibold underline">
              {siteConfig.business.email}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
