// Initialize Rough.js sketchy card backgrounds
(function() {
    // Wait for Rough.js library to load
    function initRoughCards() {
        if (typeof rough === 'undefined') {
            setTimeout(initRoughCards, 100);
            return;
        }

        // Configuration for different card types
        const cardConfigs = [
            { selector: '.link-card', canvasClass: 'link-card-canvas', showBorder: true },
            { selector: '.landing-intro', canvasClass: 'landing-intro-canvas', showBorder: false }
        ];

        cardConfigs.forEach(config => {
            const cards = document.querySelectorAll(config.selector);

            cards.forEach((card, index) => {
                // Create canvas for this card
                const canvas = document.createElement('canvas');
                canvas.className = config.canvasClass;

                // Insert canvas as first child
                card.insertBefore(canvas, card.firstChild);

                // Function to draw the sketchy background
                function drawCard() {
                    const rect = card.getBoundingClientRect();
                    const width = card.offsetWidth;
                    const height = card.offsetHeight;

                    // Set canvas size
                    canvas.width = width;
                    canvas.height = height;

                    // Get colors from CSS variables (read from body where theme is applied)
                    const computedStyle = getComputedStyle(document.body);
                    const bgColor = computedStyle.getPropertyValue('--color-off-white').trim();
                    const borderColor = computedStyle.getPropertyValue('--color-deco-A').trim();

                    // Initialize rough canvas
                    const rc = rough.canvas(canvas);

                    // Draw single sketchy rectangle
                    rc.rectangle(8, 8, width - 16, height - 16, {
                        fill: bgColor,
                        fillStyle: 'solid',
                        roughness: 3.0,
                        strokeWidth: config.showBorder ? 2 : 0,
                        stroke: config.showBorder ? borderColor : 'none',
                        bowing: 1.5
                    });
                }

                // Draw initially
                drawCard();

                // Redraw on window resize
                let resizeTimeout;
                window.addEventListener('resize', () => {
                    clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(drawCard, 100);
                });

                // Redraw when theme changes (theme is set on <html>)
                const observer = new MutationObserver(() => {
                    drawCard();
                });

                observer.observe(document.documentElement, {
                    attributes: true,
                    attributeFilter: ['data-theme']
                });
            });
        });
    }

    // Generate ragged clip-path for external link cards
    function generateRaggedClipPath() {
        const variance = () => (Math.random() * 0.8).toFixed(2);
        const invVariance = () => (100 - Math.random() * 0.8).toFixed(2);

        const top = [
            `0% ${variance()}%`,
            `25% ${variance()}%`,
            `50% ${variance()}%`,
            `75% ${variance()}%`,
            `100% ${variance()}%`
        ];

        const right = [
            `${invVariance()}% 25%`,
            `${invVariance()}% 50%`,
            `${invVariance()}% 75%`,
            `${invVariance()}% 100%`
        ];

        const bottom = [
            `75% ${invVariance()}%`,
            `50% ${invVariance()}%`,
            `25% ${invVariance()}%`,
            `0% ${invVariance()}%`
        ];

        const left = [
            `${variance()}% 75%`,
            `${variance()}% 50%`,
            `${variance()}% 25%`
        ];

        const points = [...top, ...right, ...bottom, ...left];
        return `polygon(${points.join(', ')})`;
    }

    function initExternalLinks() {
        const links = document.querySelectorAll('.external-link');
        links.forEach(link => {
            link.style.clipPath = generateRaggedClipPath();
        });
    }

    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initRoughCards();
            initExternalLinks();
        });
    } else {
        initRoughCards();
        initExternalLinks();
    }
})();