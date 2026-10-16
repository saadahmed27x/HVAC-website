import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Phone, Menu, X, ArrowUpRight, Wrench, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onRequestQuote: () => void;
  onOpenAiDiagnostic: () => void;
  onOpenPortal: () => void;
}

export default function Navbar({
  currentPath,
  onNavigate,
  onRequestQuote,
  onOpenAiDiagnostic,
  onOpenPortal
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, login, logout } = useAuth();

  const navLinks = [
    { label: 'Services', path: '/services/', number: '01' },
    { label: 'About', path: '/about/', number: '02' },
    { label: 'Reviews', path: '/reviews/', number: '03' },
    { label: 'Service areas', path: '/service-areas/', number: '04' },
    { label: 'Contact', path: '/contact/', number: '05' }
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbfbf9]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top Architectural Utility Bar */}
      <div className="bg-[#0b111a] text-slate-300 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase border-b border-white/5 py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="text-stone-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c2784a]" />
              SERVING FLORIDA
            </span>
            <span className="text-stone-500 hidden md:inline">•</span>
            <span className="text-stone-400 hidden md:inline">
              LICENSED & INSURED — {siteConfig.business.licenseNumber}
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={onOpenAiDiagnostic}
              className="hover:text-[#e49b6d] text-stone-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Wrench className="w-3 h-3 text-[#c2784a]" />
              <span className="normal-case font-sans font-medium text-xs">AI Diagnostics</span>
            </button>
            <span className="text-stone-600 hidden sm:inline">•</span>
            <a
              href={`tel:${siteConfig.business.rawPhone}`}
              className="text-stone-200 hover:text-[#e49b6d] transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-[#c2784a]" />
              <span>CALL {siteConfig.business.displayPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Agency Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Monogram & Name */}
          <div
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3.5 cursor-pointer select-none group"
          >
            {/* Minimal architectural logo box */}
            <div className="w-10 h-10 bg-[#0b111a] border border-stone-800 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-[#c2784a] transition-colors">
              <div className="w-4 h-0.5 bg-[#c2784a] mb-1 group-hover:w-5 transition-all" />
              <div className="w-5 h-0.5 bg-stone-300" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-950 font-sans">
                  {siteConfig.business.name}
                </span>
              </div>
              <p className="text-[10px] font-mono tracking-widest text-stone-500 uppercase leading-none">
                HVAC / SYSTEMS
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map(link => {
              const isActive =
                currentPath === link.path ||
                (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-[13px] font-medium tracking-wide transition-colors cursor-pointer relative py-2 ${
                    isActive
                      ? 'text-slate-950 font-semibold'
                      : 'text-stone-600 hover:text-slate-950'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c2784a]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Direct Phone */}
            <a
              href={`tel:${siteConfig.business.rawPhone}`}
              className="text-stone-800 hover:text-[#c2784a] text-xs font-mono font-medium flex items-center gap-1.5 transition-colors py-2 px-2"
              title="Direct HVAC Dispatch Phone"
            >
              <Phone className="w-3.5 h-3.5 text-stone-600" />
              <span>{siteConfig.business.displayPhone}</span>
            </a>

            {/* Homeowner Portal Button */}
            <button
              onClick={onOpenPortal}
              className="text-xs font-medium text-stone-700 hover:text-stone-950 hover:bg-stone-100 border border-stone-300 px-3 py-2.5 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Customer Account & Service History"
            >
              <UserIcon className="w-3.5 h-3.5 text-stone-500" />
              <span>{user ? user.displayName?.split(' ')[0] || 'Account' : 'Portal'}</span>
            </button>

            {/* Primary Terracotta CTA Button */}
            <button
              onClick={onRequestQuote}
              className="bg-[#c2784a] hover:bg-[#a8643b] active:bg-[#91542f] text-white text-xs font-medium tracking-wide px-5 py-2.5 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Request service</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu & Quick CTA Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onRequestQuote}
              className="bg-[#c2784a] text-white text-xs font-medium px-3.5 py-2 rounded-xs flex items-center gap-1 cursor-pointer"
            >
              <span>Service</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-800 hover:text-stone-950 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0b111a] text-stone-200 border-t border-stone-800 px-6 py-8 space-y-6 animate-in slide-in-from-top duration-200">
          <div className="text-[10px] font-mono tracking-widest text-[#c2784a] uppercase">
            NAVIGATION
          </div>
          <nav className="space-y-4">
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className="w-full text-left flex items-center justify-between py-2 text-base font-medium text-stone-200 hover:text-white border-b border-stone-800/80 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#c2784a]">{link.number}</span>
                  <span>{link.label}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-500" />
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-stone-800 space-y-3">
            <div className="text-[10px] font-mono tracking-widest text-stone-400 uppercase">
              DIRECT DISPATCH
            </div>
            <a
              href={`tel:${siteConfig.business.rawPhone}`}
              className="block bg-stone-900 border border-stone-800 p-3 text-sm font-mono text-stone-100 flex items-center justify-between"
            >
              <span>{siteConfig.business.displayPhone}</span>
              <Phone className="w-4 h-4 text-[#c2784a]" />
            </a>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiDiagnostic();
                }}
                className="bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-200 text-xs py-3 px-3 text-center cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Wrench className="w-3.5 h-3.5 text-[#c2784a]" />
                <span>AI Diagnostics</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal();
                }}
                className="bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-200 text-xs py-3 px-3 text-center cursor-pointer flex items-center justify-center gap-1.5"
              >
                <UserIcon className="w-3.5 h-3.5 text-stone-400" />
                <span>{user ? 'Account' : 'Portal'}</span>
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="w-full bg-[#c2784a] hover:bg-[#a8643b] text-white font-medium py-3 text-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Request service visit</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
