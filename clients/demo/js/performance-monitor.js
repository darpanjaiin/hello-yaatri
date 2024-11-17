class PerformanceMonitor {
    constructor() {
        this.metrics = {
            FCP: 0,
            LCP: 0,
            CLS: 0,
            FID: 0
        };
        this.init();
    }

    init() {
        this.observeFCP();
        this.observeLCP();
        this.observeCLS();
        this.observeFID();
        this.setupResourceTiming();
    }

    setupResourceTiming() {
        // Monitor resource timing
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach(entry => {
                if (entry.initiatorType === 'img') {
                    this.optimizeImageLoading(entry);
                }
            });
        });
        observer.observe({ entryTypes: ['resource'] });
    }

    optimizeImageLoading(entry) {
        if (entry.duration > 1000) { // If image takes more than 1s to load
            const url = entry.name;
            localStorage.setItem(`preload-${url}`, 'true');
        }
    }

    observeFCP() {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            this.metrics.FCP = entries[0].startTime;
            this.logMetrics('FCP');
        }).observe({ type: 'paint', buffered: true });
    }

    observeLCP() {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            this.metrics.LCP = entries[entries.length - 1].startTime;
            this.logMetrics('LCP');
        }).observe({ type: 'largest-contentful-paint', buffered: true });
    }

    observeCLS() {
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            this.metrics.CLS = clsValue;
            this.logMetrics('CLS');
        }).observe({ type: 'layout-shift', buffered: true });
    }

    observeFID() {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            this.metrics.FID = entries[0].processingStart - entries[0].startTime;
            this.logMetrics('FID');
        }).observe({ type: 'first-input', buffered: true });
    }

    logMetrics(metric) {
        console.log(`${metric}: ${this.metrics[metric]}`);
        // Send to analytics if needed
    }

    reportToAnalytics() {
        // Send performance data to analytics
        if ('sendBeacon' in navigator) {
            const data = {
                metrics: this.metrics,
                timestamp: Date.now(),
                url: window.location.href
            };
            navigator.sendBeacon('/analytics', JSON.stringify(data));
        }
    }
} 