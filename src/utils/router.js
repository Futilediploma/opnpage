// Simple client-side router for handling navigation without full page reloads

export function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function getCurrentPath() {
  return window.location.pathname;
}

export function setupRouter(onRouteChange) {
  // Handle back/forward browser buttons
  window.addEventListener('popstate', onRouteChange);

  // Handle initial load
  onRouteChange();

  // Return cleanup function
  return () => {
    window.removeEventListener('popstate', onRouteChange);
  };
}
