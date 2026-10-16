/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { siteConfig } from './config/siteConfig';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesIndexPage from './pages/ServicesIndexPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import AboutPage from './pages/AboutPage';
import ServiceAreasPage from './pages/ServiceAreasPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ThankYouPage from './pages/ThankYouPage';
import NotFoundPage from './pages/NotFoundPage';
import LeadForm from './components/LeadForm';
import AiDiagnosticModal from './components/AiDiagnosticModal';
import HomeownerPortalModal from './components/HomeownerPortalModal';
import { X, ShieldCheck, Database, Wrench, Settings, BookOpen } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path.endsWith('/') || path.includes('.') ? path : `${path}/`;
    }
    return '/';
  });

  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [portalModalOpen, setPortalModalOpen] = useState(false);
  const [demoGuideOpen, setDemoGuideOpen] = useState(false);

  // Sync with browser history and URL changes
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const formatted = path.endsWith('/') || path.includes('.') ? path : `${path}/`;
      setCurrentPath(formatted);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamically update document title & meta description based on route
  useEffect(() => {
    let title = 'Premium HVAC – Florida Residential Heating & Cooling';
    let desc = 'Professional residential HVAC services in Central Florida. Emergency AC repair, precision installation, high-efficiency heat pumps, and preventative maintenance.';

    if (currentPath === '/services/') {
      title = 'HVAC Services – AC Repair, Maintenance & Installation | Premium HVAC';
      desc = 'Explore our full suite of residential air conditioning and heating services tailored for Central Florida homes.';
    } else if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '').replace('/', '');
      const s = siteConfig.services.find(item => item.slug === slug);
      if (s) {
        title = `${s.fullTitle} | Premium HVAC`;
        desc = s.leadParagraph.slice(0, 155);
      }
    } else if (currentPath === '/about/') {
      title = 'About Our Certified Florida HVAC Team | Premium HVAC';
      desc = 'Licensed, insured, and EPA-certified Florida technicians committed to honest flat-rate pricing and reliable residential cooling.';
    } else if (currentPath === '/service-areas/') {
      title = 'Central Florida Service Areas & ZIP Codes | Premium HVAC';
      desc = 'Verified HVAC service across Orange, Seminole, and Osceola counties including Orlando, Winter Park, Lake Nona, and Kissimmee.';
    } else if (currentPath === '/reviews/') {
      title = 'Verified Customer Reviews & Ratings | Premium HVAC';
      desc = 'Read honest homeowner feedback from Central Florida residents who trust Premium HVAC for repairs and installations.';
    } else if (currentPath === '/contact/') {
      title = 'Contact & 24/7 HVAC Dispatch | Premium HVAC';
      desc = 'Call our direct dispatch line or submit a priority service request for fast diagnostic arrival in Central Florida.';
    } else if (currentPath === '/privacy/') {
      title = 'Privacy Policy | Premium HVAC';
      desc = 'Our commitment to protecting your personal information. Zero sale of customer data.';
    } else if (currentPath === '/thank-you/') {
      title = 'Service Request Confirmed | Premium HVAC';
      desc = 'Your HVAC service request has been received. Our dispatch team is reviewing your schedule.';
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }
  }, [currentPath]);

  const navigateTo = (path: string) => {
    const formatted = path.endsWith('/') || path.includes('.') ? path : `${path}/`;
    setCurrentPath(formatted);
    window.history.pushState({}, '', formatted);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route Dispatcher
  const renderCurrentPage = () => {
    // 1. Homepage
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage
          onNavigate={navigateTo}
          onRequestQuote={() => setLeadModalOpen(true)}
          onOpenAiDiagnostic={() => setAiModalOpen(true)}
        />
      );
    }

    // 2. Services Overview
    if (currentPath === '/services/') {
      return (
        <ServicesIndexPage
          onNavigate={navigateTo}
          onRequestQuote={() => setLeadModalOpen(true)}
        />
      );
    }

    // 3. Individual Service Pages
    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '').replace('/', '');
      const matchedService = siteConfig.services.find(s => s.slug === slug);
      if (matchedService) {
        return (
          <ServiceDetailPage
            service={matchedService}
            onNavigate={navigateTo}
            onRequestQuote={() => setLeadModalOpen(true)}
          />
        );
      }
    }

    // 4. About Page
    if (currentPath === '/about/') {
      return (
        <AboutPage
          onNavigate={navigateTo}
          onRequestQuote={() => setLeadModalOpen(true)}
        />
      );
    }

    // 5. Service Areas
    if (currentPath === '/service-areas/') {
      return (
        <ServiceAreasPage
          onNavigate={navigateTo}
          onRequestQuote={() => setLeadModalOpen(true)}
        />
      );
    }

    // 6. Reviews Page
    if (currentPath === '/reviews/') {
      return <ReviewsPage />;
    }

    // 7. Contact Page
    if (currentPath === '/contact/') {
      return (
        <ContactPage
          onSuccessSubmit={() => navigateTo('/thank-you/')}
        />
      );
    }

    // 8. Privacy Policy
    if (currentPath === '/privacy/') {
      return <PrivacyPolicyPage />;
    }

    // 9. Thank You Page
    if (currentPath === '/thank-you/') {
      return <ThankYouPage onNavigate={navigateTo} />;
    }

    // 10. Custom 404
    return <NotFoundPage onNavigate={navigateTo} />;
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-sky-500/20 selection:text-sky-900">
        {/* Header */}
        <Navbar
          currentPath={currentPath}
          onNavigate={navigateTo}
          onRequestQuote={() => setLeadModalOpen(true)}
          onOpenAiDiagnostic={() => setAiModalOpen(true)}
          onOpenPortal={() => setPortalModalOpen(true)}
        />

        {/* Main Body */}
        <main className="flex-1 pb-16">{renderCurrentPage()}</main>

        {/* Footer */}
        <Footer onNavigate={navigateTo} />

        {/* Modal: Request Service / Estimate */}
        {leadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="relative max-w-xl w-full">
              <button
                onClick={() => setLeadModalOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-800 bg-white/80 rounded-full cursor-pointer shadow-xs"
                aria-label="Close service request form"
              >
                <X className="w-5 h-5" />
              </button>
              <LeadForm
                onSuccess={() => {
                  setTimeout(() => {
                    setLeadModalOpen(false);
                    navigateTo('/thank-you/');
                  }, 1200);
                }}
              />
            </div>
          </div>
        )}

        {/* Modal: Smart AI Diagnostics */}
        <AiDiagnosticModal
          isOpen={aiModalOpen}
          onClose={() => setAiModalOpen(false)}
          onScheduleService={reportedSymptom => {
            setLeadModalOpen(true);
          }}
        />

        {/* Modal: Homeowner Portal */}
        <HomeownerPortalModal
          isOpen={portalModalOpen}
          onClose={() => setPortalModalOpen(false)}
          onRequestNewService={() => {
            setPortalModalOpen(false);
            setLeadModalOpen(true);
          }}
        />

        {/* Floating Quick Action Drawer (Client Config & Deployment Docs) */}
        <aside aria-label="Demonstration Controls" className="fixed bottom-5 right-5 z-30">
          <button
            onClick={() => setDemoGuideOpen(!demoGuideOpen)}
            className="bg-slate-900 hover:bg-slate-800 text-sky-400 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 border border-slate-700 shadow-xl cursor-pointer"
            title="Demonstration & Deployment Information"
          >
            <Settings className="w-4 h-4 text-sky-400 animate-spin-slow" />
            <span className="hidden sm:inline">Contractor Template Guide</span>
          </button>
        </aside>

        {/* Demo Guide Drawer */}
        {demoGuideOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-sky-600" />
                  <h3 className="text-lg font-bold text-slate-900">
                    Premium HVAC – Client Onboarding & Deployment Guide
                  </h3>
                </div>
                <button
                  onClick={() => setDemoGuideOpen(false)}
                  className="text-slate-400 hover:text-slate-800 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                <div className="bg-sky-50 border border-sky-200 p-4 rounded-xl">
                  <p className="font-bold text-sky-950">1. Centralized Configuration File</p>
                  <p className="text-sky-900 mt-0.5">
                    All business information (contractor name, logo, phone, Florida CAC license
                    number, verified ZIP codes, pricing rates, and business hours) is centralized in{' '}
                    <code className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-sky-300">
                      src/config/siteConfig.ts
                    </code>
                    . Simply update that single file to deploy for any real HVAC contractor.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <p className="font-bold text-slate-900">2. Firebase Database & Auth Integration</p>
                  <p className="mt-0.5">
                    Connected to Firebase Firestore & Auth. Customer leads are automatically written
                    to the <code className="font-mono font-bold">serviceRequests</code> collection with
                    ABAC security rules. Verified customer reviews persist to the{' '}
                    <code className="font-mono font-bold">reviews</code> collection.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <p className="font-bold text-slate-900">3. Low-Latency Gemini 3.1 Flash-Lite AI Diagnostics</p>
                  <p className="mt-0.5">
                    Server-side proxy route <code className="font-mono font-bold">/api/diagnostics</code>{' '}
                    calls <code className="font-mono font-bold">gemini-3.1-flash-lite</code> with low latency
                    for instant HVAC troubleshooting, evaluating symptoms safely without exposing API keys.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <p className="font-bold text-slate-900">4. Interactive Three.js 3D Inverter Studio</p>
                  <p className="mt-0.5">
                    Custom Three.js procedural 3D model featuring PBR materials, RoomEnvironment studio lighting,
                    airflow particle stream simulation, and exploded technical separation.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <p className="font-bold text-slate-900">5. Search Engine Indexing (Production Transition)</p>
                  <p className="mt-0.5">
                    While in demonstration mode, <code className="font-mono font-bold">robots.txt</code> and{' '}
                    <code className="font-mono font-bold">index.html</code> contain{' '}
                    <code className="font-mono font-bold">noindex, nofollow</code> to prevent fake local
                    business indexing. When ready for production, remove the noindex tag and update{' '}
                    <code className="font-mono font-bold">public/sitemap.xml</code> with the client's custom domain.
                  </p>
                </div>
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={() => setDemoGuideOpen(false)}
                  className="bg-slate-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthProvider>
  );
}
