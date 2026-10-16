import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
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
  Plus
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600/30 border border-sky-400/40 flex items-center justify-center text-sky-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Homeowner Service Portal</h3>
              <p className="text-xs text-slate-400">
                Track your active service dispatch, equipment warranties & tune-up schedules
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close portal modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Portal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!user ? (
            /* Unauthenticated View: Prompt Google Login */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto border border-sky-200">
                <UserIcon className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-slate-900">Sign in with Your Google Account</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Securely access your submitted Florida HVAC estimates, active technician dispatches,
                  and 10-year equipment warranty certificates.
                </p>
              </div>
              <button
                onClick={login}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center gap-2 mx-auto cursor-pointer shadow-md transition-all"
              >
                <span>Continue with Google</span>
              </button>
              <p className="text-[11px] text-slate-400">
                🔒 Protected by Firebase Authentication. We never access your private emails.
              </p>
            </div>
          ) : (
            /* Authenticated View */
            <div className="space-y-6">
              {/* User Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    {user.displayName ? user.displayName[0] : 'U'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{user.displayName || 'Homeowner'}</h4>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onRequestNewService();
                    }}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Service Request</span>
                  </button>
                  <button
                    onClick={logout}
                    title="Sign Out"
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-200/60 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-200 gap-6 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('requests')}
                  className={`pb-2.5 transition-colors cursor-pointer ${
                    activeTab === 'requests'
                      ? 'border-b-2 border-sky-600 text-sky-700'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  My Service Requests ({requests.length})
                </button>
                <button
                  onClick={() => setActiveTab('warranties')}
                  className={`pb-2.5 transition-colors cursor-pointer ${
                    activeTab === 'warranties'
                      ? 'border-b-2 border-sky-600 text-sky-700'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Warranty Coverage
                </button>
                <button
                  onClick={() => setActiveTab('maintenance')}
                  className={`pb-2.5 transition-colors cursor-pointer ${
                    activeTab === 'maintenance'
                      ? 'border-b-2 border-sky-600 text-sky-700'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Maintenance Schedule
                </button>
              </div>

              {/* Tab 1: Requests */}
              {activeTab === 'requests' && (
                <div className="space-y-3">
                  {loadingRequests ? (
                    <p className="text-xs text-slate-500 text-center py-6">Loading your service requests...</p>
                  ) : requests.length === 0 ? (
                    <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-200/80 p-6 space-y-2">
                      <FileText className="w-8 h-8 text-slate-400 mx-auto" />
                      <p className="text-xs font-bold text-slate-700">No active service requests on file.</p>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        When you submit an AC repair or installation enquiry, you can monitor its dispatch
                        status right here.
                      </p>
                      <button
                        onClick={() => {
                          onClose();
                          onRequestNewService();
                        }}
                        className="mt-2 text-xs font-bold text-sky-600 hover:text-sky-800 underline cursor-pointer"
                      >
                        Request Service Now →
                      </button>
                    </div>
                  ) : (
                    requests.map(req => (
                      <div
                        key={req.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 capitalize">
                              {req.serviceType.replace('-', ' ')}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                req.status === 'scheduled'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-sky-50 text-sky-700 border border-sky-200'
                              }`}
                            >
                              {req.status === 'new' ? 'Received & In Review' : req.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1">
                            ZIP Code: {req.zipCode} • Urgency: {req.urgency}
                          </p>
                          {req.message && (
                            <p className="text-xs text-slate-600 mt-1 italic">"{req.message}"</p>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">
                          {new Date(req.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab 2: Warranties */}
              {activeTab === 'warranties' && (
                <div className="space-y-4 text-xs text-slate-700">
                  <div className="bg-sky-50 border border-sky-200 p-4 rounded-2xl space-y-1">
                    <p className="font-bold text-sky-950 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-sky-600" />
                      <span>Florida Standard Equipment Warranty Coverage</span>
                    </p>
                    <p className="text-sky-900 leading-relaxed">
                      All new installations completed by Premium HVAC include 10-Year Manufacturer Parts &
                      Compressor warranties and our 1-Year Workmanship guarantee.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                    <h5 className="font-bold text-slate-900">Required Warranty Validation:</h5>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600">
                      <li>Equipment registration completed with manufacturer within 60 days of install.</li>
                      <li>Documented annual 24-point preventative maintenance per manufacturer guidelines.</li>
                      <li>Use of factory-approved replacement components during repair.</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 3: Maintenance */}
              {activeTab === 'maintenance' && (
                <div className="space-y-4 text-xs text-slate-700">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex items-center gap-2 text-sky-600 font-bold">
                      <Calendar className="w-4 h-4" />
                      <span>Recommended Florida Maintenance Timeline</span>
                    </div>
                    <div className="space-y-2 text-slate-600">
                      <p>
                        <strong>Spring (March – April):</strong> Pre-cooling tune-up, condensate drain
                        algae flush, capacitor voltage test, and coil cleaning before extreme summer heat.
                      </p>
                      <p>
                        <strong>Autumn (October – November):</strong> Heat pump reverse-cycle reversing
                        valve test, auxiliary heat strip amp-draw check, and blower balance.
                      </p>
                      <p>
                        <strong>Every 30–60 Days:</strong> Check and replace pleated 1" return air
                        filters to protect compressor static pressure.
                      </p>
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
