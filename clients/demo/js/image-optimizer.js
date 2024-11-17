// Image optimization and caching
class ImageOptimizer {
    constructor() {
        this.imageCache = new Map();
        this.observer = null;
        this.init();
    }

    init() {
        // Initialize Intersection Observer
        this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        });

        // Start observing all images
        document.querySelectorAll('.section-image').forEach(img => {
            this.observer.observe(img);
            // Add blur-up loading effect
            img.style.filter = 'blur(5px)';
            img.style.transform = 'scale(1.02)';
        });
    }

    handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.loadOptimizedImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }

    async loadOptimizedImage(img) {
        const originalSrc = img.src;
        
        // Check cache first
        if (this.imageCache.has(originalSrc)) {
            this.setOptimizedImage(img, this.imageCache.get(originalSrc));
            return;
        }

        // Generate optimized URLs
        const optimizedUrl = this.generateOptimizedUrl(originalSrc);
        
        try {
            // Load image with progressive enhancement
            const tempImage = new Image();
            tempImage.src = optimizedUrl;
            
            await tempImage.decode();
            this.imageCache.set(originalSrc, optimizedUrl);
            this.setOptimizedImage(img, optimizedUrl);
        } catch (error) {
            console.warn('Image optimization failed, falling back to original', error);
            this.setOptimizedImage(img, originalSrc);
        }
    }

    setOptimizedImage(img, src) {
        img.src = src;
        // Remove blur effect smoothly
        requestAnimationFrame(() => {
            img.style.filter = 'blur(0)';
            img.style.transform = 'scale(1)';
            img.style.transition = 'filter 0.5s ease, transform 0.5s ease';
        });
    }

    generateOptimizedUrl(url) {
        // Add Unsplash optimization parameters
        return `${url}&q=80&auto=format,compress&w=800&fit=crop`;
    }
} 