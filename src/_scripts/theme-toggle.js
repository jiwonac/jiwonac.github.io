// Light/dark theme toggle functionality
// Theme is set on <html> element; initial theme is set inline in <head> to prevent flash
(function() {
    const storageKey = 'theme-preference';

    // Get current theme from <html> attribute or localStorage
    const getTheme = () => {
        const htmlTheme = document.documentElement.getAttribute('data-theme');
        if (htmlTheme) return htmlTheme;
        const stored = localStorage.getItem(storageKey);
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Set theme on <html> element
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(storageKey, theme);
    };

    // Toggle theme
    const toggleTheme = () => {
        const current = getTheme();
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
    };

    // Initialize toggle button on page load
    const initTheme = () => {
        // Create and add toggle button
        const button = document.createElement('button');
        button.className = 'theme-toggle';
        button.onclick = toggleTheme;
        button.textContent = '☀️';
        button.setAttribute('aria-label', 'Toggle light/dark theme.');
        document.body.appendChild(button);
    };

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();