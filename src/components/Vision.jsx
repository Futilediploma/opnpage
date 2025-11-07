export default function Vision() {
  return (
    <section className="bg-brand-beige py-96 px-16 md:px-32" id="vision">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-48 items-center">
          {/* Left column: Text content */}
          <div className="space-y-32 fade-in">
            <h2 className="text-brand-navy">A calmer way to share</h2>

            <div className="space-y-24">
              {/* Bullet points */}
              <div className="flex gap-16 items-start">
                <span className="text-2xl">📊</span>
                <div>
                  <p className="font-semibold text-brand-navy mb-8">
                    Personal media, not social media.
                  </p>
                  <p className="text-brand-navy/75 leading-[1.7]">
                    Share your progress—no feeds, no hot takes.
                  </p>
                </div>
              </div>

              <div className="flex gap-16 items-start">
                <span className="text-2xl">🏠</span>
                <div>
                  <p className="font-semibold text-brand-navy mb-8">
                    Your page first.
                  </p>
                  <p className="text-brand-navy/75 leading-[1.7]">
                    Post to your own dashboard; it's your home on the internet.
                  </p>
                </div>
              </div>

              <div className="flex gap-16 items-start">
                <span className="text-2xl">✨</span>
                <div>
                  <p className="font-semibold text-brand-navy mb-8">
                    Opt-in community.
                  </p>
                  <p className="text-brand-navy/75 leading-[1.7]">
                    Join forums and message boards <em>based on your dashboard</em>, or stay solo.
                  </p>
                </div>
              </div>

              <div className="flex gap-16 items-start">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-semibold text-brand-navy mb-8">
                    Interest signal.
                  </p>
                  <p className="text-brand-navy/75 leading-[1.7]">
                    See how many people share your interests and goals.
                  </p>
                </div>
              </div>

              <div className="flex gap-16 items-start">
                <span className="text-2xl">🗺️</span>
                <div>
                  <p className="font-semibold text-brand-navy mb-8">
                    Visual map of ideas.
                  </p>
                  <p className="text-brand-navy/75 leading-[1.7]">
                    Explore a simple graph that connects your stats, tags, and nearby communities.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg text-brand-navy/60 italic pt-16 border-t border-brand-gray/30">
              A quiet place to build in public—or in peace.
            </p>
          </div>

          {/* Right column: Interest map diagram */}
          <div className="fade-in fade-in-delay-1">
            <div className="relative">
              <svg
                viewBox="0 0 400 400"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Connection lines from Activity to Users */}
                <g stroke="#F25C05" strokeWidth="2" strokeOpacity="0.3" fill="none">
                  <line x1="200" y1="200" x2="200" y2="80" />
                  <line x1="200" y1="200" x2="320" y2="140" />
                  <line x1="200" y1="200" x2="320" y2="260" />
                  <line x1="200" y1="200" x2="200" y2="320" />
                  <line x1="200" y1="200" x2="80" y2="260" />
                  <line x1="200" y1="200" x2="80" y2="140" />
                </g>

                {/* Connection lines between users (network effect) */}
                <g stroke="#0F2233" strokeWidth="1.5" strokeOpacity="0.2" fill="none">
                  <line x1="200" y1="80" x2="320" y2="140" />
                  <line x1="320" y1="140" x2="320" y2="260" />
                  <line x1="320" y1="260" x2="200" y2="320" />
                  <line x1="200" y1="320" x2="80" y2="260" />
                  <line x1="80" y1="260" x2="80" y2="140" />
                  <line x1="80" y1="140" x2="200" y2="80" />
                  <line x1="200" y1="80" x2="320" y2="260" />
                  <line x1="320" y1="140" x2="80" y2="260" />
                  <line x1="80" y1="140" x2="200" y2="320" />
                </g>

                {/* Activity (center, largest) */}
                <g>
                  <circle cx="200" cy="200" r="50" fill="#F25C05" fillOpacity="0.9" />
                  <text
                    x="200"
                    y="207"
                    textAnchor="middle"
                    className="fill-white font-semibold"
                    style={{ fontSize: '17px' }}
                  >
                    Activity
                  </text>
                </g>

                {/* User 1 (top) */}
                <g>
                  <circle cx="200" cy="80" r="32" fill="#0F2233" fillOpacity="0.85" />
                  <text
                    x="200"
                    y="87"
                    textAnchor="middle"
                    className="fill-white font-medium"
                    style={{ fontSize: '13px' }}
                  >
                    User 1
                  </text>
                </g>

                {/* User 2 (top right) */}
                <g>
                  <circle cx="320" cy="140" r="32" fill="#0F2233" fillOpacity="0.85" />
                  <text
                    x="320"
                    y="147"
                    textAnchor="middle"
                    className="fill-white font-medium"
                    style={{ fontSize: '13px' }}
                  >
                    User 2
                  </text>
                </g>

                {/* User 3 (bottom right) */}
                <g>
                  <circle cx="320" cy="260" r="32" fill="#0F2233" fillOpacity="0.85" />
                  <text
                    x="320"
                    y="267"
                    textAnchor="middle"
                    className="fill-white font-medium"
                    style={{ fontSize: '13px' }}
                  >
                    User 3
                  </text>
                </g>

                {/* User 4 (bottom) */}
                <g>
                  <circle cx="200" cy="320" r="32" fill="#0F2233" fillOpacity="0.85" />
                  <text
                    x="200"
                    y="327"
                    textAnchor="middle"
                    className="fill-white font-medium"
                    style={{ fontSize: '13px' }}
                  >
                    User 4
                  </text>
                </g>

                {/* User 5 (bottom left) */}
                <g>
                  <circle cx="80" cy="260" r="32" fill="#0F2233" fillOpacity="0.85" />
                  <text
                    x="80"
                    y="267"
                    textAnchor="middle"
                    className="fill-white font-medium"
                    style={{ fontSize: '13px' }}
                  >
                    User 5
                  </text>
                </g>

                {/* User 6 (top left) - to make it more balanced */}
                <g>
                  <circle cx="80" cy="140" r="32" fill="#0F2233" fillOpacity="0.85" />
                  <text
                    x="80"
                    y="147"
                    textAnchor="middle"
                    className="fill-white font-medium"
                    style={{ fontSize: '13px' }}
                  >
                    User 6
                  </text>
                </g>
              </svg>

              {/* Caption */}
              <p className="text-sm text-brand-navy/60 text-center mt-24 leading-[1.6] px-16">
                This map grows as people with similar dashboards opt into forums.
                Stay solo, or connect when it helps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
