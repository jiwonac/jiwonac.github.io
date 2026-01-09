// Initialize Rough.js sketchy card backgrounds
(function() {
    // Wait for Rough.js library to load
    function initRoughCards() {
        if (typeof rough === 'undefined') {
            setTimeout(initRoughCards, 100);
            return;
        }

        // Find all link cards
        const cards = document.querySelectorAll('.link-card');

        cards.forEach((card, index) => {
            // Create canvas for this card
            const canvas = document.createElement('canvas');
            canvas.className = 'link-card-canvas';

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

                // Draw single sketchy rectangle with thick border (no polaroid style)
                rc.rectangle(8, 8, width - 16, height - 16, {
                    fill: bgColor,
                    fillStyle: 'solid',
                    roughness: 3.0,
                    strokeWidth: 2,
                    stroke: borderColor,
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

            // Redraw when theme changes (watch for attribute changes on html/body)
            const observer = new MutationObserver(() => {
                drawCard();
            });

            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['data-theme']
            });

            observer.observe(document.body, {
                attributes: true,
                attributeFilter: ['data-theme']
            });
        });
    }

    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRoughCards);
    } else {
        initRoughCards();
    }
})();