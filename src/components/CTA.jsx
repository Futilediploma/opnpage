import { useState } from 'react';

export default function CTA() {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Google Apps Script Web App URL for form submissions
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwR5nhzREjNLNabLEImrZ3XNzD1uTEHLhTiHmM_1LZJK-OInd6VnK5wDmnOlNAo1Fqxmw/exec';

      // Send as URL parameters to work with no-cors
      const url = `${GOOGLE_SCRIPT_URL}?email=${encodeURIComponent(email)}&feedback=${encodeURIComponent(feedback)}`;

      await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
      });

      // With no-cors mode, we assume success if no error is thrown
      setStatus('success');
      setEmail('');
      setFeedback('');
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <section className="bg-white py-96 px-16 md:px-32" id="cta">
      <div className="max-w-4xl mx-auto text-center fade-in">
        <div className="card space-y-40">
          <div className="space-y-24">
            <h2 className="text-brand-navy">Start tracking</h2>
            <p className="text-xl text-brand-navy/75 leading-[1.7] max-w-2xl mx-auto">
              Request early access and we'll let you know when your dashboard is ready.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-20">
            {/* Email Input - Narrower */}
            <div className="space-y-16">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === 'loading' || status === 'success'}
                className="input w-full max-w-sm mx-auto"
                aria-label="Email address"
              />

              {/* Feedback Textarea */}
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Please provide any feedback like what you would like to track or see on your dashboard."
                disabled={status === 'loading' || status === 'success'}
                rows={4}
                className="input w-full resize-none"
                aria-label="Feedback"
              />
            </div>

            {/* Request Invite Button */}
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Request invite'}
            </button>

            {/* Create Your Page Button - Disabled with Coming Soon */}
            <div className="relative inline-block">
              <button
                type="button"
                disabled
                className="btn bg-gray-300 text-gray-500 cursor-not-allowed opacity-60 w-full sm:w-auto"
              >
                Create your page
              </button>
              <div className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12">
                Coming Soon
              </div>
            </div>

            {status === 'success' && (
              <p className="text-sm text-brand-orange font-medium slide-up">
                You're on the list. We'll email you soon.
              </p>
            )}

            {status === 'error' && (
              <p className="text-sm text-red-600 font-medium slide-up">
                Something went wrong. Please try again.
              </p>
            )}

            <p className="text-sm text-brand-navy/50">
              No spam. Just a heads-up when we launch.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
