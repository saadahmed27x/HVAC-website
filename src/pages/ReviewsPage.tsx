import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, query, limit } from 'firebase/firestore';
import { Star, ShieldCheck, Check, MessageSquare, Plus, X } from 'lucide-react';

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
    <div className="bg-[#fbfbf9] text-stone-900 selection:bg-[#c2784a]/20 selection:text-[#91542f] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
          <div className="max-w-2xl space-y-3">
            <div className="font-mono text-xs tracking-widest text-[#c2784a] uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c2784a]" />
              <span>01 —— VERIFIED FEEDBACK</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-950 leading-[1.1]">
              Honest feedback from{' '}
              <span className="text-[#c2784a] font-serif italic font-normal">
                Florida homeowners.
              </span>
            </h1>
            <p className="text-sm text-stone-600 font-light leading-relaxed">
              Read verified testimonials from Central Florida residents who trusted Premium HVAC for
              emergency diagnostics, seasonal preventative maintenance, and 15.2+ SEER2 heat pump
              replacements.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#c2784a] hover:bg-[#a8643b] text-white text-xs font-medium px-5 py-3 flex items-center gap-2 cursor-pointer shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Submit a review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map(rev => (
            <div
              key={rev.id}
              className="bg-white border border-stone-200 p-6 sm:p-8 space-y-4 flex flex-col justify-between hover:border-stone-400 transition-colors"
            >
              <div className="space-y-3">
                {/* Rating stars in terracotta */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating
                          ? 'text-[#c2784a] fill-[#c2784a]'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                  <span className="text-[11px] font-mono text-stone-400 ml-2">{rev.service}</span>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed font-light">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-mono">
                <div>
                  <div className="font-bold text-stone-900">{rev.author}</div>
                  <div className="text-[11px] text-stone-500">{rev.city}</div>
                </div>

                {rev.verified && (
                  <span className="text-[10px] text-stone-400 border border-stone-200 px-2 py-0.5">
                    VERIFIED
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Submitting Review */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
            <div className="bg-white max-w-lg w-full border border-stone-300 p-6 sm:p-8 space-y-5 shadow-2xl relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <div className="text-[10px] font-mono text-[#c2784a] uppercase">SHARE EXPERIENCE</div>
                <h3 className="text-xl font-bold text-stone-950">Write a Homeowner Review</h3>
              </div>

              {submitSuccess ? (
                <div className="p-6 bg-stone-50 border border-stone-200 text-center space-y-2">
                  <Check className="w-8 h-8 text-[#c2784a] mx-auto" />
                  <p className="font-bold text-stone-900 text-sm">Thank you!</p>
                  <p className="text-xs text-stone-600">Your review has been recorded to our system.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {formError && (
                    <p className="text-xs text-rose-600 bg-rose-50 p-2 border border-rose-200 font-mono">
                      {formError}
                    </p>
                  )}

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-stone-700 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jason & Lisa M."
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-[#fbfbf9] border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#c2784a]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-stone-700 mb-1">
                        Neighborhood / City
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Winter Park, FL"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        className="w-full bg-[#fbfbf9] border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#c2784a]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-stone-700 mb-1">
                        Rating (Stars)
                      </label>
                      <select
                        value={rating}
                        onChange={e => setRating(Number(e.target.value))}
                        className="w-full bg-[#fbfbf9] border border-stone-300 px-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#c2784a]"
                      >
                        <option value={5}>5 Stars — Outstanding</option>
                        <option value={4}>4 Stars — Very Good</option>
                        <option value={3}>3 Stars — Average</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-stone-700 mb-1">
                      Service Performed
                    </label>
                    <select
                      value={service}
                      onChange={e => setService(e.target.value)}
                      className="w-full bg-[#fbfbf9] border border-stone-300 px-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#c2784a]"
                    >
                      <option value="AC Repair">Emergency AC Repair</option>
                      <option value="AC Installation">15.2+ SEER2 AC Replacement</option>
                      <option value="Preventative Maintenance">Seasonal Maintenance</option>
                      <option value="Heat Pump Service">Heat Pump Installation / Service</option>
                      <option value="Indoor Air Quality">Indoor Air Quality & Dehumidification</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-stone-700 mb-1">
                      Your Comments
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe the technician's arrival, diagnostic explanation, and completed work..."
                      value={content}
                      onChange={e => setContent(e.target.value)}
                      className="w-full bg-[#fbfbf9] border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#c2784a]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#c2784a] hover:bg-[#a8643b] text-white text-xs font-medium py-3 cursor-pointer transition-colors shadow-xs"
                  >
                    {submitting ? 'Recording review...' : 'Submit Verified Review'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
