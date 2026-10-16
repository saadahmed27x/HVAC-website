import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Phone, Menu, X, Shield, Wrench, User as UserIcon, LogOut } from 'lucide-react';
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
    { label: 'Services', path: '/services/' },
    { label: 'About', path: '/about/' },
    { label: 'Service Areas', path: '/service-areas/' },
    { label: 'Reviews', path: '/reviews/' },
    { label: 'Contact', path: '/contact/' }
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 border-b border-slate-200/80 shadow-xs backdrop-blur-md">
      {/* Top Notification Bar for Florida Demo Notice & Emergency Line */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Demo Mode
            </span>
            <span className="truncate max-w-[280px] sm:max-w-none text-slate-300">
              Central Florida Residential HVAC Demo • FL Lic # CAC-DEMO1234
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAiDiagnostic}
              className="hover:text-sky-300 transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <Wrench className="w-3 h-3 text-sky-400" />
              <span>Smart Diagnostics</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">|</span>
            {siteConfig.business.isPhoneVerified ? (
              <a
                href={`tel:${siteConfig.business.rawPhone}`}
                className="text-amber-400 font-semibold hover:text-amber-300 transition-colors flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>{siteConfig.business.displayPhone}</span>
              </a>
            ) : (
              <span className="text-slate-400 hidden sm:inline">
                Emergency Dispatch: <strong className="text-slate-200">{siteConfig.business.displayPhone}</strong>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 via-sky-600 to-slate-900 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 text-white stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                  PREMIUM
                </span>
                <span className="text-xl font-extrabold tracking-tight text-sky-600">
                  HVAC
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                Florida Home Cooling & Heating
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(link => {
              const isActive =
                currentPath === link.path ||
                (link.path === '/services/' && currentPath.startsWith('/services/'));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-sm font-semibold tracking-wide transition-colors cursor-pointer py-1 ${
                    isActive
                      ? 'text-sky-700 border-b-2 border-sky-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & Auth */}
          <div className="hidden sm:flex items-center gap-3">
            {/* User Profile / Google Sign-In */}
            {user ? (
              <div
                onClick={onOpenPortal}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 py-1.5 px-3 rounded-lg border border-slate-200 cursor-pointer transition-colors"
                title="Open Homeowner Portal"
              >
                <div className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-bold">
                  {user.displayName ? user.displayName[0] : 'U'}
                </div>
                <span className="text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    logout();
                  }}
                  title="Sign Out"
                  className="text-slate-400 hover:text-rose-600 p-0.5 ml-1 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenPortal}
                className="text-xs font-semibold text-slate-700 hover:text-sky-700 px-3 py-2 rounded-lg border border-slate-300 hover:border-sky-400 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Homeowner Portal</span>
              </button>
            )}

            {/* Primary Request Service Button */}
            <button
              onClick={onRequestQuote}
              className="bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Request Service</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onRequestQuote}
              className="bg-sky-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer"
            >
              Request
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => handleNavClick('/')}
              className="text-left py-2.5 px-3 rounded-lg text-sm font-bold text-slate-800 hover:bg-slate-100"
            >
              Home
            </button>
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className="text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-sky-700"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  onOpenAiDiagnostic();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 text-sky-300 flex items-center justify-center gap-2"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Smart AI HVAC Diagnostics</span>
              </button>

              {user ? (
                <div
                  onClick={() => {
                    onOpenPortal();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <div className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-bold shrink-0">
                      {user.displayName ? user.displayName[0] : 'U'}
                    </div>
                    <span className="text-xs font-semibold text-slate-800 truncate">
                      {user.displayName || user.email}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      logout();
                    }}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 ml-2"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onOpenPortal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Homeowner Portal</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
