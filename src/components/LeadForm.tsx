import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import {
  validateLeadForm,
  formatPhoneNumber,
  type LeadFormData
} from '../utils/validation';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ShieldCheck, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

interface LeadFormProps {
  initialService?: string;
  onSuccess?: () => void;
  className?: string;
  compact?: boolean;
}

export default function LeadForm({
  initialService,
  onSuccess,
  className = '',
  compact = false
}: LeadFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    email: '',
    zipCode: '',
    serviceType: initialService || 'ac-repair',
    message: '',
    urgency: 'next-day',
    preferredTime: 'morning'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Spam protection honeypot
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, phone: formatPhoneNumber(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Spam honeypot detection
    if (honeypot) {
      console.warn('Bot submission blocked');
      setIsSubmitted(true);
      return;
    }

    // Client-side validation
    const validation = validateLeadForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Post to backend dispatch endpoint (/api/leads)
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('Service dispatch endpoint rejected payload');
      }

      // 2. Persist to Firestore collection 'serviceRequests'
      try {
        await addDoc(collection(db, 'serviceRequests'), {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email?.trim() || '',
          zipCode: formData.zipCode.trim(),
          serviceType: formData.serviceType,
          message: formData.message?.trim() || '',
          urgency: formData.urgency || 'next-day',
          preferredTime: formData.preferredTime || 'morning',
          status: 'new',
          createdAt: new Date().toISOString(),
          userId: auth.currentUser?.uid || null
        });
      } catch (firestoreErr) {
        // Log firestore error per guidelines, but if backend recorded the lead, consider submission successful
        console.warn('Firestore direct write fallback notice:', firestoreErr);
      }

      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Lead submission failure:', err);
      setSubmitError(
        'We were unable to transmit your service request at this moment. Please call our 24/7 dispatch desk directly at ' +
          siteConfig.business.displayPhone +
          ' for immediate assistance.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center ${className}`}>
        <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-emerald-600/20">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Service Request Received!</h3>
        <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
          Thank you, <strong>{formData.name}</strong>. Our Central Florida dispatch desk has received
          your enquiry for <strong>{formData.serviceType}</strong> in ZIP <strong>{formData.zipCode}</strong>.
        </p>
        <div className="mt-4 p-3 bg-white rounded-xl border border-emerald-100 text-xs text-slate-700 max-w-sm mx-auto">
          <p className="font-semibold text-slate-900">What happens next?</p>
          <p className="mt-0.5">
            A service coordinator will review your notes and contact you at{' '}
            <strong className="text-sky-700">{formData.phone}</strong> to confirm technician dispatch.
          </p>
        </div>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              phone: '',
              email: '',
              zipCode: '',
              serviceType: 'ac-repair',
              message: '',
              urgency: 'next-day',
              preferredTime: 'morning'
            });
          }}
          className="mt-5 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-8 ${className}`}
    >
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sky-600 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Priority Service Dispatch</span>
        </div>
        <h3 className="text-2xl font-black text-slate-900 mt-1">Request Service or Estimate</h3>
        <p className="text-xs text-slate-500 mt-1">
          Fast, upfront pricing • Certified Florida technicians • No obligation
        </p>
      </div>

      {submitError && (
        <div className="mb-5 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-800 text-xs">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <div>
            <p className="font-bold">Submission Notice</p>
            <p className="mt-0.5">{submitError}</p>
          </div>
        </div>
      )}

      {/* Spam Honeypot Field (Hidden) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website-trap">Leave this blank</label>
        <input
          id="website-trap"
          type="text"
          name="website"
          value={honeypot}
          onChange={e => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="lead-name" className="block text-[11px] font-mono uppercase text-stone-700 tracking-wider mb-1">
            Your Full Name <span className="text-[#c2784a]">*</span>
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            required
            placeholder="e.g. Sarah Jenkins"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 border text-xs text-stone-900 bg-[#fbfbf9] focus:outline-none transition-colors ${
              errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-stone-300 focus:border-[#c2784a]'
            }`}
          />
          {errors.name && <p className="text-[11px] font-mono text-rose-600 mt-1">{errors.name}</p>}
        </div>

        {/* Phone & Email Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lead-phone" className="block text-[11px] font-mono uppercase text-stone-700 tracking-wider mb-1">
              Phone Number <span className="text-[#c2784a]">*</span>
            </label>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              required
              placeholder="(407) 555-0123"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 border text-xs text-stone-900 bg-[#fbfbf9] focus:outline-none transition-colors ${
                errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-stone-300 focus:border-[#c2784a]'
              }`}
            />
            {errors.phone && <p className="text-[11px] font-mono text-rose-600 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="lead-zip" className="block text-[11px] font-mono uppercase text-stone-700 tracking-wider mb-1">
              Florida ZIP Code <span className="text-[#c2784a]">*</span>
            </label>
            <input
              id="lead-zip"
              name="zipCode"
              type="text"
              required
              maxLength={5}
              placeholder="e.g. 32801"
              value={formData.zipCode}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 border text-xs text-stone-900 bg-[#fbfbf9] focus:outline-none transition-colors ${
                errors.zipCode ? 'border-rose-400 bg-rose-50/30' : 'border-stone-300 focus:border-[#c2784a]'
              }`}
            />
            {errors.zipCode && <p className="text-[11px] font-mono text-rose-600 mt-1">{errors.zipCode}</p>}
          </div>
        </div>

        {/* Optional Email */}
        <div>
          <label htmlFor="lead-email" className="block text-[11px] font-mono uppercase text-stone-700 tracking-wider mb-1">
            Email Address <span className="text-stone-400 font-normal">(Optional for estimate receipt)</span>
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            placeholder="sarah@example.com"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 border text-xs text-stone-900 bg-[#fbfbf9] focus:outline-none transition-colors ${
              errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-stone-300 focus:border-[#c2784a]'
            }`}
          />
          {errors.email && <p className="text-[11px] font-mono text-rose-600 mt-1">{errors.email}</p>}
        </div>

        {/* Service Type Selection */}
        <div>
          <label htmlFor="lead-service" className="block text-[11px] font-mono uppercase text-stone-700 tracking-wider mb-1">
            Service Required <span className="text-[#c2784a]">*</span>
          </label>
          <select
            id="lead-service"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#c2784a] bg-[#fbfbf9]"
          >
            <option value="ac-repair">Air Conditioning Repair (Emergency / Diagnostic)</option>
            <option value="ac-installation">New AC / Heat Pump Installation (Free Estimate)</option>
            <option value="hvac-maintenance">Seasonal 24-Point Tune-Up & Maintenance</option>
            <option value="heating-heat-pumps">Heat Pump & Winter Heating Service</option>
            <option value="indoor-air-quality">Indoor Air Quality / Dehumidification / UV</option>
            <option value="emergency-repair">Emergency No-Cooling Immediate Dispatch</option>
            <option value="other">Other HVAC Inquiry</option>
          </select>
          {errors.serviceType && <p className="text-[11px] font-mono text-rose-600 mt-1">{errors.serviceType}</p>}
        </div>

        {/* Urgency & Preferred Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lead-urgency" className="block text-[11px] font-mono uppercase text-stone-700 tracking-wider mb-1">
              Urgency Level
            </label>
            <select
              id="lead-urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-stone-300 text-xs text-stone-800 bg-[#fbfbf9] focus:outline-none focus:border-[#c2784a]"
            >
              <option value="emergency-same-day">Critical Emergency (Home over 85°F)</option>
              <option value="next-day">Next-Day Scheduled Window</option>
              <option value="this-week">Within This Week</option>
              <option value="flexible">Flexible / Planning Ahead</option>
            </select>
          </div>

          <div>
            <label htmlFor="lead-time" className="block text-[11px] font-mono uppercase text-stone-700 tracking-wider mb-1">
              Preferred Window
            </label>
            <select
              id="lead-time"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-stone-300 text-xs text-stone-800 bg-[#fbfbf9] focus:outline-none focus:border-[#c2784a]"
            >
              <option value="morning">Morning (8:00 AM – 12:00 PM)</option>
              <option value="afternoon">Afternoon (12:00 PM – 4:00 PM)</option>
              <option value="evening">Late Afternoon / Evening (4:00 PM – 7:00 PM)</option>
              <option value="anytime">First Available Technician</option>
            </select>
          </div>
        </div>

        {/* Message / Symptoms */}
        {!compact && (
          <div>
            <label htmlFor="lead-message" className="block text-[11px] font-mono uppercase text-stone-700 tracking-wider mb-1">
              Describe Problem or Equipment Details{' '}
              <span className="text-stone-400 font-normal">(Optional)</span>
            </label>
            <textarea
              id="lead-message"
              name="message"
              rows={3}
              placeholder="e.g. Unit started blowing warm air this morning, fan is spinning outside but thermostat stays at 78..."
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 border border-stone-300 text-xs text-stone-900 bg-[#fbfbf9] focus:outline-none focus:border-[#c2784a] resize-none"
            />
          </div>
        )}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#c2784a] hover:bg-[#a8643b] active:bg-[#91542f] text-white font-medium py-3.5 px-6 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-60 text-xs"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying & Submitting Dispatch...</span>
            </>
          ) : (
            <span>Submit Service Request</span>
          )}
        </button>
        <p className="text-[11px] font-mono text-stone-400 text-center mt-2.5">
          🔒 Your privacy is protected. Never sold or shared.
        </p>
      </div>
    </form>
  );
}
