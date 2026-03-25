document.addEventListener("DOMContentLoaded", () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const projectCards = document.querySelectorAll('.project-card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(item);
    });

    // Handle visibility class addition securely
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .timeline-item.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});
