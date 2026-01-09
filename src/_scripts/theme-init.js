// Set theme on <html> before CSS loads to prevent flash
// Must be loaded synchronously in <head> before stylesheet
(function() {
    var storageKey = 'theme-preference';
    var theme = localStorage.getItem(storageKey);
    if (!theme) {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', theme);
})();
