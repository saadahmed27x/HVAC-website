import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { AlertCircle, Home, Wrench, Phone } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export default function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto border border-amber-500/20">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
          Error 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          The HVAC page or resource you are looking for may have moved or is no longer available.
        </p>
      </div>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => onNavigate('/')}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </button>
        <button
          onClick={() => onNavigate('/services/')}
          className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer"
        >
          <Wrench className="w-4 h-4" />
          <span>Explore HVAC Services</span>
        </button>
      </div>

      <div className="pt-8 border-t border-slate-200 text-xs text-slate-500">
        <span>Need urgent assistance? Call dispatch: </span>
        <strong className="text-slate-800 font-mono">{siteConfig.business.displayPhone}</strong>
      </div>
    </div>
  );
}
