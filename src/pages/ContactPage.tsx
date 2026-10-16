import React from 'react';
import { siteConfig } from '../config/siteConfig';
import LeadForm from '../components/LeadForm';
import { Phone, Mail, MapPin, Clock, ShieldCheck, AlertTriangle } from 'lucide-react';

interface ContactPageProps {
  onSuccessSubmit?: () => void;
}

export default function ContactPage({ onSuccessSubmit }: ContactPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
          Direct Dispatch & Support
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-950 mt-1 tracking-tight">
          Contact Premium HVAC
        </h1>
        <p className="text-base text-slate-600 mt-3 leading-relaxed">
          Need prompt air conditioning repair, a seasonal 24-point tune-up, or a free equipment
          replacement estimate? Reach our Central Florida team by phone or submit an enquiry below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info & Dispatch Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Emergency Alert Box */}
          <div className="bg-amber-50 border border-amber-300 rounded-3xl p-6 text-amber-950">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Emergency Cooling Failure?</span>
            </div>
            <p className="text-xs leading-relaxed text-amber-900">
              When temperatures exceed 90°F in Central Florida, an AC breakdown can quickly become a
              health hazard. For immediate emergency dispatch, call our dispatch hotline:
            </p>
            <p className="text-2xl font-black font-mono text-amber-800 mt-3">
              {siteConfig.business.displayPhone}
            </p>
          </div>

          {/* Business Details Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Central Florida Office
            </h3>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Demonstration Location</p>
                  <p className="mt-0.5 text-slate-600">
                    {siteConfig.business.address.street}
                    <br />
                    {siteConfig.business.address.city}, {siteConfig.business.address.state}{' '}
                    {siteConfig.business.address.zip}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Serving Orange, Seminole & Osceola counties
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Telephone</p>
                  <p className="mt-0.5 font-semibold text-slate-800 font-mono">
                    {siteConfig.business.displayPhone}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Live dispatch & technician routing
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Email Inquiries</p>
                  <p className="mt-0.5 text-slate-600">{siteConfig.business.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Service Hours</p>
                  <p className="mt-0.5 text-slate-600">{siteConfig.business.hours.regular}</p>
                  <p className="text-slate-600">{siteConfig.business.hours.sunday}</p>
                  <p className="text-amber-700 font-medium mt-1">
                    {siteConfig.business.hours.emergency}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              <p className="font-bold text-slate-800">{siteConfig.business.license.licenseNumber}</p>
              <p className="mt-0.5">{siteConfig.business.license.insuredAmount}</p>
            </div>
          </div>
        </div>

        {/* Lead Form Column (7 cols) */}
        <div className="lg:col-span-7">
          <LeadForm onSuccess={onSuccessSubmit} />
        </div>
      </div>
    </div>
  );
}
