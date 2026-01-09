// Apply random ragged edges and masonry layout to microblog cards
(function() {
    function generateRaggedClipPath(amount = 0.6) {
        // Generate subtle random variations for each edge point
        // Values are percentages, with small random offsets
        const variance = () => (Math.random() * amount).toFixed(2);
        const invVariance = () => (100 - Math.random() * amount).toFixed(2);

        // Top edge (left to right)
        const top = [
            `0% ${variance()}%`,
            `15% ${variance()}%`,
            `30% ${variance()}%`,
            `45% ${variance()}%`,
            `60% ${variance()}%`,
            `75% ${variance()}%`,
            `90% ${variance()}%`,
            `100% ${variance()}%`
        ];

        // Right edge (top to bottom)
        const right = [
            `${invVariance()}% 20%`,
            `${invVariance()}% 40%`,
            `${invVariance()}% 60%`,
            `${invVariance()}% 80%`,
            `${invVariance()}% 100%`
        ];

        // Bottom edge (right to left)
        const bottom = [
            `85% ${invVariance()}%`,
            `70% ${invVariance()}%`,
            `55% ${invVariance()}%`,
            `40% ${invVariance()}%`,
            `25% ${invVariance()}%`,
            `10% ${invVariance()}%`,
            `0% ${invVariance()}%`
        ];

        // Left edge (bottom to top)
        const left = [
            `${variance()}% 80%`,
            `${variance()}% 60%`,
            `${variance()}% 40%`,
            `${variance()}% 20%`
        ];

        const points = [...top, ...right, ...bottom, ...left];
        return `polygon(${points.join(', ')})`;
    }

    function initMicroblogCards() {
        // Apply ragged edges to microblog and blog cards (normal amount)
        const casualCards = document.querySelectorAll('.microblog-card, .blog-card');
        casualCards.forEach(card => {
            card.style.clipPath = generateRaggedClipPath(0.6);
        });

        // Apply subtle ragged edges to article cards (toned down)
        const articleCards = document.querySelectorAll('.article-card');
        articleCards.forEach(card => {
            card.style.clipPath = generateRaggedClipPath(0.25);
        });

        // Only initialize Masonry for grid view
        const grid = document.querySelector('.microblog-grid');
        if (!grid) return;

        // Add sizer elements for Masonry if not present
        if (!grid.querySelector('.microblog-grid-sizer')) {
            const sizer = document.createElement('div');
            sizer.className = 'microblog-grid-sizer';
            grid.insertBefore(sizer, grid.firstChild);
        }

        if (!grid.querySelector('.microblog-gutter-sizer')) {
            const gutter = document.createElement('div');
            gutter.className = 'microblog-gutter-sizer';
            grid.insertBefore(gutter, grid.firstChild);
        }

        // Wait for Masonry and imagesLoaded to load
        if (typeof Masonry === 'undefined' || typeof imagesLoaded === 'undefined') {
            setTimeout(initMicroblogCards, 100);
            return;
        }

        // Initialize Masonry with horizontal ordering
        const msnry = new Masonry(grid, {
            itemSelector: '.microblog-card',
            columnWidth: '.microblog-grid-sizer',
            gutter: '.microblog-gutter-sizer',
            percentPosition: true,
            horizontalOrder: true
        });

        // Relayout after each image loads to prevent overlap
        imagesLoaded(grid).on('progress', function() {
            msnry.layout();
        });

        // Relayout on window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                msnry.layout();
            }, 100);
        });
    }

    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMicroblogCards);
    } else {
        initMicroblogCards();
    }
})();
