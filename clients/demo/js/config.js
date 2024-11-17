const CONFIG = {
    IMAGE_QUALITY: {
        mobile: {
            width: 400,
            quality: 70
        },
        tablet: {
            width: 800,
            quality: 75
        },
        desktop: {
            width: 1200,
            quality: 80
        }
    },
    CACHE_DURATION: {
        images: 7 * 24 * 60 * 60, // 7 days
        styles: 24 * 60 * 60, // 1 day
        scripts: 24 * 60 * 60 // 1 day
    },
    PERFORMANCE_THRESHOLDS: {
        FCP: 1800, // 1.8s
        LCP: 2500, // 2.5s
        FID: 100, // 100ms
        CLS: 0.1 // 0.1
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} 