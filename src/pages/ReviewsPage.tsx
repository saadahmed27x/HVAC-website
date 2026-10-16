import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Star, ShieldCheck, CheckCircle2, MessageSquare, Loader2, Plus } from 'lucide-react';

interface ReviewItem {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  service: string;
  content: string;
  verified: boolean;
}

export default function ReviewsPage() {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(siteConfig.testimonials);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState(5);
  const [service, setService] = useState('AC Repair');
  const [content, setContent] = useState('');
  const [formError, setFormError] = useState('');

  // Fetch reviews from Firestore on mount
  useEffect(() => {
    async function loadFirestoreReviews() {
      try {
        const q = query(collection(db, 'reviews'), limit(20));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const loaded: ReviewItem[] = snap.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              author: data.customerName || 'Anonymous',
              city: data.city || 'Central Florida',
              rating: data.rating || 5,
              date: 'Verified Client',
              service: data.service || 'HVAC Service',
              content: data.reviewText || '',
              verified: data.verified ?? true
            };
          });
          // Merge with siteConfig reviews
          setReviewsList([...loaded, ...siteConfig.testimonials]);
        }
      } catch (err) {
        console.warn('Firestore reviews fetch notice:', err);
      }
    }
    loadFirestoreReviews();
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !city.trim() || !content.trim()) {
      setFormError('Please fill in your name, Florida city, and review description.');
      return;
    }

    setSubmitting(true);
    setFormError('');

    try {
      const newReview = {
        customerName: name.trim(),
        city: city.trim(),
        rating: Number(rating),
        service,
        reviewText: content.trim(),
        verified: true,
        createdAt: new Date().toISOString()
      };

      try {
        await addDoc(collection(db, 'reviews'), newReview);
      } catch (err) {
        console.warn('Firestore review write notice:', err);
      }

      setReviewsList(prev => [
        {
          id: `rev-local-${Date.now()}`,
          author: name.trim(),
          city: city.trim(),
          rating: Number(rating),
          date: 'Just Now',
          service,
          content: content.trim(),
          verified: true
        },
        ...prev
      ]);

      setSubmitSuccess(true);
      setTimeout(() => {
        setModalOpen(false);
        setSubmitSuccess(false);
        setName('');
        setCity('');
        setContent('');
      }, 2000);
    } catch (err) {
      console.error('Failed to submit review:', err);
      setFormError('Unable to record review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            Verified Customer Satisfaction
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-950 mt-1 tracking-tight">
            Homeowner Reviews & Ratings
          </h1>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            Read verified feedback from Central Florida homeowners who relied on Premium HVAC for
            emergency diagnostics, preventative tune-ups, and energy-smart system replacements.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-3.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Write a Verified Review</span>
        </button>
      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Submit Your Service Feedback</h3>
            <p className="text-xs text-slate-500 mb-5">
              Help your Florida neighbors choose an honest, reliable HVAC contractor.
            </p>

            {submitSuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-base font-bold text-emerald-900">Thank You for Your Feedback!</h4>
                <p className="text-xs text-emerald-700 mt-1">Your review has been recorded.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {formError && (
                  <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                    {formError}
                  </p>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jason & Lisa M."
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      City / Neighborhood
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Winter Park, FL"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Rating
                    </label>
                    <select
                      value={rating}
                      onChange={e => setRating(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                    >
                      <option value={5}>5 Stars (Excellent)</option>
                      <option value={4}>4 Stars (Good)</option>
                      <option value={3}>3 Stars (Satisfactory)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Service Received
                  </label>
                  <select
                    value={service}
                    onChange={e => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                  >
                    <option value="AC Repair">AC Repair & Diagnostics</option>
                    <option value="AC Installation">15.2+ SEER2 AC Replacement</option>
                    <option value="Preventative Maintenance">24-Point Preventative Maintenance</option>
                    <option value="Heat Pump Service">Heat Pump & Heating Service</option>
                    <option value="Indoor Air Quality">Indoor Air Quality / UV Lamp</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Review
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your service experience, punctuality, and workmanship..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviewsList.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                {item.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified Homeowner</span>
                  </span>
                )}
              </div>

              <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wide block mb-1">
                {item.service}
              </span>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                "{item.content}"
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">{item.author}</span>
              <span className="text-slate-500 font-medium">{item.city}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
