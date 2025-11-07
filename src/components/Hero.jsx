import { navigate } from '../utils/router';

export default function Hero() {
  const handleSampleClick = (e) => {
    e.preventDefault();
    navigate('/sample');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="bg-brand-beige pt-64 pb-96 px-8 md:px-16" id="main-content">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-32 items-center">
          {/* Left: Logo */}
          <div className="fade-in flex justify-center md:justify-start">
            <img
              src="/assets/logo/opnpage_logo.png"
              alt="opnpage logo"
              className="h-auto w-full max-w-[280px]"
            />
          </div>

          {/* Center: Headline + CTAs */}
          <div className="space-y-40 fade-in fade-in-delay-1">
            <div className="space-y-24">
              <h1 className="text-brand-navy leading-[1.1] tracking-tight">
                Share your stats,<br />not your opinions.
              </h1>
              <p className="text-xl md:text-2xl leading-[1.6] text-brand-navy/75">
                Show what you're working on. Let the numbers speak for themselves.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-16">
              <a href="#cta" className="btn btn-primary">
                Get early access
              </a>
              <a href="/sample" onClick={handleSampleClick} className="btn btn-secondary">
                See a sample page
              </a>
            </div>

            <p className="text-sm text-brand-navy/50 pt-8">
              Free to start. Launching February 2025.
            </p>
          </div>

          {/* Right: Dashboard Preview */}
          <div className="fade-in fade-in-delay-2 flex flex-col items-center">
            <div className="card space-y-24">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-12">
                  <div className="w-48 h-48 rounded-full bg-brand-orange/10 flex items-center justify-center">
                    <span className="text-2xl">🏃</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">@alexruns</h3>
                    <p className="text-sm text-brand-navy/60">Personal dashboard</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-16">
                {/* Stat widgets */}
                <div className="bg-brand-beige rounded-lg p-16 space-y-8">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-brand-navy/60">Miles run</span>
                    <span className="text-xl">🏃</span>
                  </div>
                  <div className="text-3xl font-bold text-brand-navy">247</div>
                  <div className="text-xs text-brand-navy/50">This year</div>
                </div>

                <div className="bg-brand-beige rounded-lg p-16 space-y-8">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-brand-navy/60">Books read</span>
                    <span className="text-xl">📚</span>
                  </div>
                  <div className="text-3xl font-bold text-brand-navy">18</div>
                  <div className="text-xs text-brand-navy/50">This year</div>
                </div>

                <div className="bg-brand-beige rounded-lg p-16 space-y-8">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-brand-navy/60">Game hours</span>
                    <span className="text-xl">🎮</span>
                  </div>
                  <div className="text-3xl font-bold text-brand-navy">142</div>
                  <div className="text-xs text-brand-navy/50">This month</div>
                </div>

                <div className="bg-brand-beige rounded-lg p-16 space-y-8">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-brand-navy/60">Workout streak</span>
                    <span className="text-xl">💪</span>
                  </div>
                  <div className="text-3xl font-bold text-brand-navy">23</div>
                  <div className="text-xs text-brand-navy/50">Days</div>
                </div>
              </div>

              <div className="pt-16 border-t border-brand-gray">
                <p className="text-sm text-brand-navy/60 text-center">
                  Your progress, your way. Simple and shareable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
