document.addEventListener("DOMContentLoaded", () => {
    const timelines = document.querySelectorAll('.timeline-item');
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // --- 1. Animation Observer ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle('visible', entry.isIntersecting);
        });
    }, { threshold: 0.1 });

    const observeVisible = () => {
        [...timelines, ...cards].forEach(el => {
            if (!el.classList.contains('hidden')) observer.observe(el);
        });
    };

    // --- 2. Filtering Logic ---
    const applyFilter = (filterValue) => {
        // Prepare for fresh animation
        observer.disconnect();
        [...timelines, ...cards].forEach(el => el.classList.remove('visible', 'hidden'));

        // Apply filtering
        if (filterValue !== 'all') {
            cards.forEach(card => {
                const categories = (card.dataset.category || '').split(' ');
                if (!categories.includes(filterValue)) {
                    card.classList.add('hidden');
                }
            });

            timelines.forEach(item => {
                const itemCards = item.querySelectorAll('.project-card');
                const hasVisibleCards = [...itemCards].some(c => !c.classList.contains('hidden'));
                if (itemCards.length > 0 && !hasVisibleCards) item.classList.add('hidden');
            });
        }

        // Re-trigger animations
        setTimeout(observeVisible, 50);
    };

    // --- 3. Events & Initialization ---
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilter(btn.dataset.filter);
        });
    });

    // --- 4. URL Parameter Parsing ---
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    
    let targetBtn = null;
    if (tabParam) {
        targetBtn = document.querySelector(`.filter-btn[data-filter="${tabParam}"]`);
    }
    
    if (!targetBtn) {
        targetBtn = document.querySelector('.filter-btn.active');
    }

    if (targetBtn) {
        buttons.forEach(b => b.classList.remove('active'));
        targetBtn.classList.add('active');
        applyFilter(targetBtn.dataset.filter);
    } else {
        observeVisible();
    }
});
