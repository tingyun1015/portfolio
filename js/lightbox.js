document.addEventListener('DOMContentLoaded', () => {
    const lightboxHTML = `
        <div id="lightbox-modal" class="lightbox-modal">
            <img class="lightbox-content" id="lightbox-img" src="" alt="Enlarged View">
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const images = document.querySelectorAll('.project-details-container img');

    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            modalImg.src = img.src;
            modalImg.alt = img.alt || 'Enlarged Image';
            modal.classList.add('active');
        });
    });

    modal.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            if (!modal.classList.contains('active')) {
                modalImg.src = '';
            }
        }, 300);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
});
