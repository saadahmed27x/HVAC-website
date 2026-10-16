import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b111a] text-stone-300 border-t border-stone-800/80 pt-16 sm:pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-stone-800/80">
          {/* Brand Col (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div
              onClick={() => handleNav('/')}
              className="flex items-center gap-3.5 cursor-pointer select-none group inline-flex"
            >
              <div className="w-10 h-10 bg-stone-900 border border-stone-700 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-[#c2784a] transition-colors">
                <div className="w-4 h-0.5 bg-[#c2784a] mb-1 group-hover:w-5 transition-all" />
                <div className="w-5 h-0.5 bg-stone-300" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white block">
                  {siteConfig.business.name}
                </span>
                <p className="text-[10px] font-mono tracking-widest text-stone-400 uppercase leading-none">
                  HVAC / SYSTEMS
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Precision HVAC service for Orlando, Winter Park, and Central Florida. Thoughtful
              evaluations, upfront flat-rate pricing, and residential comfort handled properly.
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-stone-400 font-mono">
              <p>FL Lic # {siteConfig.business.licenseNumber}</p>
              <p>$2,000,000 Commercial General Liability</p>
              <p>15.2 SEER2 Southeast Compliance Standard</p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleNav('/contact/')}
                className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-[#c2784a] hover:text-[#e49b6d] border-b border-[#c2784a]/50 pb-0.5 transition-colors cursor-pointer"
              >
                <span>REQUEST PRIORITY SERVICE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Col 2: Services (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-[11px] font-mono tracking-widest text-[#c2784a] uppercase">
              SERVICES
            </div>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.services.map(service => (
                <li key={service.slug}>
                  <button
                    onClick={() => handleNav(`/services/${service.slug}/`)}
                    className="text-stone-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {service.shortTitle}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => handleNav('/services/')}
                  className="text-xs font-mono text-stone-300 hover:text-[#c2784a] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>All Services Overview</span>
                  <span>→</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Explore & Service Areas (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-[11px] font-mono tracking-widest text-[#c2784a] uppercase">
              EXPLORE
            </div>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <button
                  onClick={() => handleNav('/about/')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/service-areas/')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Service Areas
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/reviews/')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Client Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/contact/')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Dispatch
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/privacy/')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Dispatch (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-[11px] font-mono tracking-widest text-[#c2784a] uppercase">
              DIRECT DISPATCH
            </div>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${siteConfig.business.rawPhone}`}
                className="block text-stone-300 hover:text-white transition-colors group"
              >
                <div className="text-[11px] font-mono text-stone-400">PHONE DISPATCH</div>
                <div className="font-mono text-base text-stone-100 group-hover:text-[#c2784a]">
                  {siteConfig.business.displayPhone}
                </div>
              </a>

              <div>
                <div className="text-[11px] font-mono text-stone-400">EMAIL</div>
                <a
                  href={`mailto:${siteConfig.business.email}`}
                  className="text-stone-300 hover:text-white font-mono text-xs"
                >
                  {siteConfig.business.email}
                </a>
              </div>

              <div>
                <div className="text-[11px] font-mono text-stone-400">OFFICE & DISPATCH</div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {siteConfig.business.address.street}, {siteConfig.business.address.city},{' '}
                  {siteConfig.business.address.state} {siteConfig.business.address.zip}
                </p>
              </div>

              <div>
                <div className="text-[11px] font-mono text-stone-400">OPERATING HOURS</div>
                <p className="text-xs text-stone-400">
                  {siteConfig.business.hours.regular}
                  <br />
                  <span className="text-stone-300">{siteConfig.business.hours.emergency}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 font-mono">
          <p>© {new Date().getFullYear()} {siteConfig.business.name}. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('/privacy/')}
              className="hover:text-stone-200 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <span className="text-stone-400">
              Demonstration Template — Configure details in <code className="text-stone-300">siteConfig.ts</code>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
