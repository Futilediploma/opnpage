export default function Testimonials() {
  const testimonials = [
    {
      quote: "I got tired of performing for social media. This is just me, showing what I'm actually doing.",
      author: "Maya Chen",
      role: "Marathon runner",
    },
    {
      quote: "No explaining. No justifying. Just the work, visible to anyone who wants to see it.",
      author: "Jordan Reeves",
      role: "Indie game developer",
    },
    {
      quote: "It's like a homepage for your progress. Simple, honest, and exactly what I needed.",
      author: "Sam Torres",
      role: "Lifelong learner",
    },
  ];

  return (
    <section className="bg-brand-beige py-96 px-16 md:px-32" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-24 mb-80 fade-in">
          <h2 className="text-brand-navy">Early feedback</h2>
          <p className="text-xl text-brand-navy/75 max-w-2xl mx-auto leading-[1.7]">
            From people testing the beta.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-32">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`card space-y-28 fade-in fade-in-delay-${index + 1}`}
            >
              <p className="text-lg text-brand-navy/80 leading-[1.7]">
                "{testimonial.quote}"
              </p>
              <div className="pt-20 border-t border-brand-gray">
                <p className="font-semibold text-brand-navy">{testimonial.author}</p>
                <p className="text-sm text-brand-navy/60 mt-4">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
