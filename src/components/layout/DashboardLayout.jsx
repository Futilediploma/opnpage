import { useState, useEffect } from 'react';
import { navigate } from '../../utils/router';

/**
 * DashboardLayout
 *
 * Full dashboard shell with:
 * - Collapsible left sidebar (Overview, Activity, Habits, Journal, Settings)
 * - Top bar (search, date filter, refresh, dark mode toggle)
 * - 12-column grid-ready content container
 *
 * Dark Mode:
 * - Toggle persists in localStorage
 * - Adds/removes 'dark' class on document root
 *
 * Data Integration:
 * - Sidebar nav can be dynamic from user permissions
 * - Search input triggers global search modal
 * - Date filter updates dashboard timeframe
 * - Refresh button re-fetches all widget data
 */
export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true' || false;
  });
  const [dateFilter, setDateFilter] = useState('7d');

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const navItems = [
    { label: 'Overview', icon: '📊', href: '/sample', active: true, comingSoon: false },
    { label: 'Activity', icon: '🔥', href: '/activity', active: false, comingSoon: true },
    { label: 'Habits', icon: '✓', href: '/habits', active: false, comingSoon: true },
    { label: 'Journal', icon: '📝', href: '/journal', active: false, comingSoon: true },
    { label: 'Settings', icon: '⚙️', href: '/settings', active: false, comingSoon: true },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (href === '/' || href === '/sample') {
      // Stay on current page for demo
    } else {
      // navigate(href); // Uncomment when routes exist
    }
  };

  const handleRefresh = () => {
    // TODO: Trigger re-fetch of all dashboard data
    console.log('Refreshing dashboard data...');
  };

  return (
    <div className="min-h-screen bg-brand-beige dark:bg-brand-navy-dark transition-theme duration-200">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white dark:bg-brand-gray-dark border-r border-brand-gray/20 dark:border-brand-gray-dark/30 transition-all duration-300 z-40 flex flex-col ${
          sidebarOpen ? 'w-60' : 'w-16'
        }`}
      >
        {/* Toggle Button Only */}
        <div className="h-20 flex items-center px-4 border-b border-brand-gray/10 dark:border-brand-gray-dark/20">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-3 hover:bg-brand-gray/10 dark:hover:bg-brand-navy-dark rounded-md transition-colors mx-auto"
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="text-brand-navy/40 dark:text-brand-text-dark/40">
              {sidebarOpen ? (
                <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              ) : (
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              )}
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6" aria-label="Main navigation">
          {sidebarOpen && (
            <p className="px-4 py-3 text-sm font-semibold text-brand-navy/40 dark:text-brand-text-dark/40 uppercase tracking-wider">
              Menu
            </p>
          )}
          <div className="space-y-2 mt-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (!item.comingSoon) {
                    handleNavClick(e, item.href);
                  }
                }}
                className={`flex items-center gap-4 px-4 py-4 rounded-lg transition-all relative ${
                  item.comingSoon
                    ? 'opacity-50 cursor-not-allowed text-brand-navy/40 dark:text-brand-text-dark/40'
                    : item.active
                    ? 'bg-brand-orange text-white shadow-sm'
                    : 'text-brand-navy/60 dark:text-brand-text-dark/60 hover:bg-brand-gray/10 dark:hover:bg-brand-navy-dark hover:text-brand-navy dark:hover:text-brand-text-dark'
                }`}
                aria-current={item.active ? 'page' : undefined}
                aria-disabled={item.comingSoon}
                title={!sidebarOpen ? item.label : undefined}
              >
                <span className="text-2xl flex-shrink-0" aria-hidden="true">{item.icon}</span>
                {sidebarOpen && (
                  <span className="font-medium text-base flex items-center gap-2">
                    {item.label}
                    {item.comingSoon && (
                      <span className="text-xs bg-brand-gray/30 dark:bg-brand-navy-dark px-2 py-0.5 rounded">
                        Coming Soon
                      </span>
                    )}
                  </span>
                )}
              </a>
            ))}
          </div>
        </nav>

        {/* Logo */}
        <div className="px-5 py-6 border-t border-brand-gray/10 dark:border-brand-gray-dark/20">
          {sidebarOpen ? (
            <img
              src="/assets/logo/opnpage_logo.png"
              alt="opnpage"
              className="h-28 w-auto mx-auto"
            />
          ) : (
            <div className="w-10 h-10 mx-auto bg-brand-orange rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="p-5 border-t border-brand-gray/10 dark:border-brand-gray-dark/20">
            <div className={`flex items-center ${sidebarOpen ? 'gap-12' : 'justify-center flex-col'}`}> 
              <div className="w-40 h-40 rounded-full bg-brand-orange/20 flex items-center justify-center text-lg">
                👤
              </div>
              {sidebarOpen && (
                <div className="flex-1 fade-in">
                  <p className="text-sm font-semibold text-brand-navy dark:text-brand-text-dark">
                    @alexruns
                  </p>
                  <p className="text-xs text-brand-navy/60 dark:text-brand-text-dark/60">
                    View profile
                  </p>
                </div>
              )}
            </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? 'ml-60' : 'ml-16'
        }`}
      >
        {/* Top Bar */}
        <header
          className="h-28 bg-white dark:bg-brand-gray-dark border-b border-brand-gray/10 dark:border-brand-gray-dark/20 flex items-center justify-between px-10 sticky top-0 z-30 backdrop-blur-sm bg-white/80 dark:bg-brand-gray-dark/80"
          role="banner"
        >
          {/* Left: Home Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors font-medium"
            >
              Home
            </button>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-3">
            {/* Date Filter */}
            <div className="flex items-center gap-2 bg-brand-gray/10 dark:bg-brand-navy-dark/50 rounded-lg p-2">
              {['Today', '7d', '30d'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setDateFilter(filter.toLowerCase())}
                  className={`px-5 py-2.5 rounded-md text-sm font-medium transition-all ${
                    dateFilter === filter.toLowerCase()
                      ? 'bg-brand-orange text-white shadow-sm'
                      : 'text-brand-navy/60 dark:text-brand-text-dark/60 hover:text-brand-navy dark:hover:text-brand-text-dark'
                  }`}
                  aria-pressed={dateFilter === filter.toLowerCase()}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-brand-gray/20 dark:bg-brand-gray-dark/40"></div>

            {/* Action Buttons */}
            <button
              onClick={handleRefresh}
              className="p-3 hover:bg-brand-gray/10 dark:hover:bg-brand-navy-dark rounded-md transition-colors"
              aria-label="Refresh dashboard"
              title="Refresh"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-brand-navy/60 dark:text-brand-text-dark/60">
                <path d="M21 10C21 10 18.995 7.26822 17.3662 5.63824C15.7373 4.00827 13.4864 3 11 3C6.02944 3 2 7.02944 2 12C2 16.9706 6.02944 21 11 21C15.1031 21 18.5649 18.2543 19.6482 14.5M21 10V4M21 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 hover:bg-brand-gray/10 dark:hover:bg-brand-navy-dark rounded-md transition-colors"
              aria-label={darkMode ? 'Light mode' : 'Dark mode'}
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-brand-navy/60 dark:text-brand-text-dark/60">
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-brand-navy/60 dark:text-brand-text-dark/60">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Content Container (12-column grid ready) */}
        <main className="p-6 max-w-[1600px] mx-auto" role="main">
          {children}
        </main>
      </div>
    </div>
  );
}
