// Light/dark theme toggle functionality
(function() {
    const storageKey = 'theme-preference';

    // Get current theme from body attribute or localStorage
    const getTheme = () => {
        // Get current data-theme if from <body> if exists
        const bodyTheme = document.body.getAttribute('data-theme');
        if (bodyTheme) return bodyTheme;
        //
        const stored = localStorage.getItem(storageKey);
        if (stored) return stored;
        // Default to the user browser's preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Set theme on body element
    const setTheme = (theme) => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem(storageKey, theme);
    };

    // Toggle theme
    const toggleTheme = () => {
        const current = getTheme();
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
    };

    // Initialize theme on page load
    const initTheme = () => {
        const theme = getTheme();

        // Create and add toggle button
        const button = document.createElement('button');
        button.className = 'theme-toggle';
        button.onclick = toggleTheme;
        button.textContent = '☀️';
        button.setAttribute('aria-label', 'Toggle light/dark theme.');
        document.body.appendChild(button);

        // Ensure body has theme attribute
        if (!document.body.getAttribute('data-theme')) {
            document.body.setAttribute('data-theme', theme);
        }
    };

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();