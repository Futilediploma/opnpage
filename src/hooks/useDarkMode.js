import { useState, useEffect } from 'react';

/**
 * useDarkMode Hook
 *
 * Manages dark mode state with:
 * - System preference detection (prefers-color-scheme)
 * - localStorage persistence
 * - Document class toggling ('dark' class on <html>)
 *
 * Returns: [isDark, toggleDarkMode]
 *
 * Usage:
 *   const [isDark, toggleDarkMode] = useDarkMode();
 *   <button onClick={toggleDarkMode}>
 *     {isDark ? '🌞' : '🌙'}
 *   </button>
 */
export function useDarkMode() {
  // Check localStorage first, then system preference
  const getInitialMode = () => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [isDark, setIsDark] = useState(getInitialMode);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDark);
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  return [isDark, toggleDarkMode];
}

export default useDarkMode;
