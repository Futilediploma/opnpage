export default function Features() {
  const features = [
    {
      icon: '📊',
      title: 'Track what matters to you',
      description: 'Running miles. Books finished. Hours practiced. If it helps you grow, it belongs here.',
    },
    {
      icon: '🔗',
      title: 'One link says it all',
      description: 'Your dashboard lives at a single URL. No scattered profiles, no algorithmic feeds.',
    },
    {
      icon: '🔒',
    title: "You control what's public",
      description: "Show what you want. Hide what you don't. Your progress, your rules.",
    },
    {
      icon: '✨',
      title: 'Clone layouts you love',
        description: "No infinite scroll. No distractions. Just a clean space to focus on what you're building.",
    },
    {
      icon: '💡',
      title: 'Get inspired by real progress',
      description: 'Browse dashboards from people who are building, learning, and showing up every day.',
    },
    {
      icon: '🎨',
      title: 'Designed to stay calm',
        description: "No infinite scroll. No distractions. Just a clean space to focus on what you're building.",
    },
  ];

  return (
    <section className="bg-white py-96 px-16 md:px-32" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-24 mb-80 fade-in">
          <h2 className="text-brand-navy">Built for humans, not algorithms</h2>
          <p className="text-xl text-brand-navy/75 max-w-2xl mx-auto leading-[1.7]">
            Progress over performance. Process over perfection. Share what you're working on, not what you think people want to see.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-32">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`card space-y-20 fade-in fade-in-delay-${Math.min(index + 1, 6)}`}
            >
              <div className="text-4xl leading-none">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-brand-navy">
                {feature.title}
              </h3>
              <p className="text-brand-navy/75 leading-[1.7]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
