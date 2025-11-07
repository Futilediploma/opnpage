import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        buttonRef.current?.focus();
      }
    };

    const handleClickOutside = (e) => {
      if (
        mobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !buttonRef.current?.contains(e.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-brand-gray sticky top-0 z-40 shadow-subtle">
      <div className="max-w-7xl mx-auto px-16 md:px-32">
        <div className="flex items-center justify-between h-80">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-brand-orange rounded">
              <img
                src="/assets/logo/opnpage_logo.png"
                alt="opnpage logo"
                className="h-48 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-32" aria-label="Main navigation">
            <a
              href="#features"
              className="text-brand-navy/70 hover:text-brand-navy font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange rounded px-8 py-4"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-brand-navy/70 hover:text-brand-navy font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange rounded px-8 py-4"
            >
              How it works
            </a>
            <div className="relative inline-block">
              <button
                disabled
                className="btn bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
              >
                Create your page
              </button>
              <div className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg whitespace-nowrap">
                Coming Soon
              </div>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            ref={buttonRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-8 text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange rounded"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-24 h-24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-96' : 'max-h-0'
          }`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <nav className="py-16 space-y-8 border-t border-brand-gray">
            <a
              href="#features"
              onClick={closeMobileMenu}
              className="block px-16 py-12 text-brand-navy/70 hover:text-brand-navy hover:bg-brand-beige font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange rounded"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={closeMobileMenu}
              className="block px-16 py-12 text-brand-navy/70 hover:text-brand-navy hover:bg-brand-beige font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange rounded"
            >
              How it works
            </a>
            <div className="relative mx-16">
              <button
                disabled
                className="block w-full text-center btn bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
              >
                Create your page
              </button>
              <div className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg whitespace-nowrap">
                Coming Soon
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
