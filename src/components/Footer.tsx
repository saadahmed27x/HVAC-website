import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Shield, Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center shadow-md">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white">PREMIUM</span>
                <span className="text-xl font-black tracking-tight text-sky-400">HVAC</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Demonstration website designed for residential air conditioning and heating
              contractors serving Central Florida. Built for maximum homeowner trust, rapid mobile
              lead conversion, and compliance with Florida Building Code standards.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">{siteConfig.business.license.licenseNumber}</p>
              <p>{siteConfig.business.license.insuredAmount}</p>
              <p className="text-amber-400/90 font-medium">{siteConfig.business.floridaStandards.seer2Minimum}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              HVAC Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.services.map(s => (
                <li key={s.id}>
                  <button
                    onClick={() => handleNav(`/services/${s.slug}/`)}
                    className="text-slate-400 hover:text-sky-400 transition-colors cursor-pointer text-left"
                  >
                    {s.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNav('/services/')}
                  className="text-sky-400 hover:text-sky-300 font-semibold cursor-pointer text-left"
                >
                  All Services Overview →
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Areas */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('/about/')}
                  className="text-slate-400 hover:text-sky-400 transition-colors cursor-pointer"
                >
                  About Our Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/service-areas/')}
                  className="text-slate-400 hover:text-sky-400 transition-colors cursor-pointer"
                >
                  Service Areas (Orlando & Beyond)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/reviews/')}
                  className="text-slate-400 hover:text-sky-400 transition-colors cursor-pointer"
                >
                  Homeowner Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/contact/')}
                  className="text-slate-400 hover:text-sky-400 transition-colors cursor-pointer"
                >
                  Contact & Dispatch
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/privacy/')}
                  className="text-slate-400 hover:text-sky-400 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">24/7 Phone Dispatch</p>
                  <p className="font-semibold text-slate-200">{siteConfig.business.displayPhone}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Service Enquiries</p>
                  <p className="text-slate-200">{siteConfig.business.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Demonstration Location</p>
                  <p className="text-slate-200">
                    {siteConfig.business.address.street}, {siteConfig.business.address.city},{' '}
                    {siteConfig.business.address.state} {siteConfig.business.address.zip}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Operating Hours</p>
                  <p className="text-xs text-slate-300">{siteConfig.business.hours.regular}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demonstration Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Demonstration Template: Replace business details in{' '}
              <code className="text-slate-300 font-mono">src/config/siteConfig.ts</code> prior to production deployment.
            </span>
          </div>
          <p>© {new Date().getFullYear()} Premium HVAC Demonstration. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
