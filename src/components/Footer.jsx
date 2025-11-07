export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white py-64 px-16 md:px-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-48 mb-48">
          {/* Logo and tagline */}
          <div className="space-y-16">
            <img
              src="/assets/logo/opnpage_logo.png"
              alt="opnpage logo"
              className="h-32 w-auto brightness-0 invert"
            />
            <p className="text-white/70 leading-relaxed">
              Share your stats, not your opinions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-16 text-white">Product</h3>
            <nav className="space-y-12" aria-label="Footer navigation">
              <a
                href="#features"
                className="block text-white/70 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block text-white/70 hover:text-white transition-colors"
              >
                How it works
              </a>
              <a
                href="#cta"
                className="block text-white/70 hover:text-white transition-colors"
              >
                Get started
              </a>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-16 text-white">Company</h3>
            <nav className="space-y-12" aria-label="Company navigation">
              <a
                href="#about"
                className="block text-white/70 hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#privacy"
                className="block text-white/70 hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="#contact"
                className="block text-white/70 hover:text-white transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-32 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16">
            <p className="text-white/60 text-sm">
              © {currentYear} opnpage. All rights reserved.
            </p>
            <div className="flex items-center space-x-24">
              <a
                href="#terms"
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                Terms
              </a>
              <a
                href="#privacy"
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
