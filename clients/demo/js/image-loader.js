// Lazy loading and progressive image loading
function initImageLoader() {
    const images = document.querySelectorAll('.section-image');
    
    const imageOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "50px"
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Add loading="lazy" attribute
                img.setAttribute('loading', 'lazy');
                // Add srcset for responsive images
                const originalSrc = img.src;
                img.srcset = `${originalSrc}&w=400 400w, 
                             ${originalSrc}&w=800 800w, 
                             ${originalSrc}&w=1200 1200w`;
                img.sizes = "(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px";
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));
} 