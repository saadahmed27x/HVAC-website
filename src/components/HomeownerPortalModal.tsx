import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {
  X,
  User as UserIcon,
  Shield,
  Calendar,
  Wrench,
  FileText,
  Clock,
  CheckCircle2,
  LogOut,
  AlertCircle,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface HomeownerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestNewService: () => void;
}

interface SubmittedRequest {
  id: string;
  serviceType: string;
  status: string;
  urgency: string;
  zipCode: string;
  createdAt: string;
  message?: string;
}

export default function HomeownerPortalModal({
  isOpen,
  onClose,
  onRequestNewService
}: HomeownerPortalModalProps) {
  const { user, login, logout } = useAuth();
  const [requests, setRequests] = useState<SubmittedRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [activeTab, setActiveTab] = useState<'requests' | 'warranties' | 'maintenance'>('requests');

  useEffect(() => {
    if (!isOpen || !user) return;

    async function fetchUserRequests() {
      setLoadingRequests(true);
      try {
        const q = query(
          collection(db, 'serviceRequests'),
          where('userId', '==', user?.uid)
        );
        const snap = await getDocs(q);
        const items: SubmittedRequest[] = snap.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            serviceType: data.serviceType || 'HVAC Service',
            status: data.status || 'new',
            urgency: data.urgency || 'standard',
            zipCode: data.zipCode || '',
            createdAt: data.createdAt || new Date().toISOString(),
            message: data.message || ''
          };
        });
        setRequests(items);
      } catch (err) {
        console.warn('Could not fetch user service requests:', err);
      } finally {
        setLoadingRequests(false);
      }
    }

    fetchUserRequests();
  }, [isOpen, user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white max-w-2xl w-full border border-stone-300 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-[#0b111a] text-white p-6 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-900 border border-stone-700 flex items-center justify-center text-[#c2784a]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Homeowner Service Portal</h3>
              <p className="text-xs text-stone-400 font-mono font-light">
                Track active service dispatch, equipment warranties & tune-up history
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 cursor-pointer"
            aria-label="Close portal modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Portal Body */}
        <div className="p-6 overflow-y-auto space-y-6 bg-[#fbfbf9]">
          {!user ? (
            /* Unauthenticated View: Prompt Google Login */
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-white border border-stone-300 text-stone-700 flex items-center justify-center mx-auto shadow-2xs">
                <UserIcon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-stone-950">Sign in with Your Google Account</h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto font-light">
                  Securely review your submitted service requests, active technician dispatch
                  windows, and 10-year manufacturer warranty certificates.
                </p>
              </div>
              <button
                onClick={login}
                className="bg-[#c2784a] hover:bg-[#a8643b] text-white font-medium py-3 px-6 text-xs flex items-center gap-2 mx-auto cursor-pointer shadow-xs transition-colors"
              >
                <span>Continue with Google</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <p className="text-[11px] font-mono text-stone-400">
                🔒 Connected via Firebase Authentication. Zero private inbox access.
              </p>
            </div>
          ) : (
            /* Authenticated View */
            <div className="space-y-6">
              {/* User Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 border border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-stone-900 text-white font-mono font-bold flex items-center justify-center text-xs">
                    {user.displayName ? user.displayName[0] : 'U'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-950 font-mono">
                      {user.displayName || 'Homeowner'}
                    </h4>
                    <p className="text-xs text-stone-500 font-mono">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onRequestNewService();
                    }}
                    className="bg-[#c2784a] hover:bg-[#a8643b] text-white font-medium px-3.5 py-1.5 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Request</span>
                  </button>
                  <button
                    onClick={logout}
                    title="Sign Out"
                    className="p-1.5 text-stone-400 hover:text-stone-900 border border-stone-200 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-stone-200 gap-6 text-xs font-mono">
                <button
                  onClick={() => setActiveTab('requests')}
                  className={`pb-2.5 transition-colors cursor-pointer ${
                    activeTab === 'requests'
                      ? 'border-b-2 border-[#c2784a] text-stone-950 font-bold'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  SERVICE REQUESTS ({requests.length})
                </button>
                <button
                  onClick={() => setActiveTab('warranties')}
                  className={`pb-2.5 transition-colors cursor-pointer ${
                    activeTab === 'warranties'
                      ? 'border-b-2 border-[#c2784a] text-stone-950 font-bold'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  WARRANTY ARCHIVE
                </button>
                <button
                  onClick={() => setActiveTab('maintenance')}
                  className={`pb-2.5 transition-colors cursor-pointer ${
                    activeTab === 'maintenance'
                      ? 'border-b-2 border-[#c2784a] text-stone-950 font-bold'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  MAINTENANCE TIMELINE
                </button>
              </div>

              {/* Tab 1: Requests */}
              {activeTab === 'requests' && (
                <div className="space-y-3">
                  {loadingRequests ? (
                    <p className="text-xs font-mono text-stone-500 py-4 text-center">
                      Loading service records...
                    </p>
                  ) : requests.length === 0 ? (
                    <div className="bg-white p-6 border border-stone-200 text-center space-y-2">
                      <p className="text-xs text-stone-700">No active service requests under this email.</p>
                      <button
                        onClick={() => {
                          onClose();
                          onRequestNewService();
                        }}
                        className="text-xs font-mono text-[#c2784a] hover:underline"
                      >
                        Submit a new estimate or repair request →
                      </button>
                    </div>
                  ) : (
                    requests.map(req => (
                      <div key={req.id} className="bg-white p-4 border border-stone-200 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold uppercase text-stone-900">
                            {req.serviceType}
                          </span>
                          <span className="font-mono text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 border border-stone-200 uppercase">
                            STATUS: {req.status}
                          </span>
                        </div>
                        {req.message && <p className="text-stone-600 font-light">{req.message}</p>}
                        <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 pt-2 border-t border-stone-100">
                          <span>ZIP {req.zipCode}</span>
                          <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab 2: Warranties */}
              {activeTab === 'warranties' && (
                <div className="bg-white p-6 border border-stone-200 space-y-4">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-[#c2784a] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h5 className="text-xs font-mono font-bold uppercase text-stone-900">
                        10-Year Parts & Compressor Warranty
                      </h5>
                      <p className="text-xs text-stone-600 leading-relaxed font-light">
                        All residential 15.2+ SEER2 installations completed through Premium HVAC
                        include registered manufacturer warranties covering major components,
                        compressors, and coils.
                      </p>
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-stone-500 pt-2 border-t border-stone-100">
                    To register an installed system, have your model and serial numbers ready.
                  </div>
                </div>
              )}

              {/* Tab 3: Maintenance Schedule */}
              {activeTab === 'maintenance' && (
                <div className="bg-white p-6 border border-stone-200 space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[#c2784a] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h5 className="text-xs font-mono font-bold uppercase text-stone-900">
                        Semi-Annual Florida Care Cadence
                      </h5>
                      <p className="text-xs text-stone-600 leading-relaxed font-light">
                        Recommended maintenance in March (pre-summer cooling readiness) and October
                        (heating cycle & dehumidification check).
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-2">
                    <div className="p-3 bg-[#fbfbf9] border border-stone-200">
                      <span className="text-stone-500 block">SPRING / SUMMER</span>
                      <span className="text-stone-900 font-bold">24-Point AC Tune-Up</span>
                    </div>
                    <div className="p-3 bg-[#fbfbf9] border border-stone-200">
                      <span className="text-stone-500 block">FALL / WINTER</span>
                      <span className="text-stone-900 font-bold">Heat Pump Inspection</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
