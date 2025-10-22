// ===== HEALTHBRIDGE - COMPLETE JAVASCRIPT =====

// ===== UTILITY FUNCTIONS =====
class HealthBridgeUtils {
    /**
     * Debounce function to limit how often a function can be called
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function to limit how often a function can be called
     */
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Format currency for display
     */
    static formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    /**
     * Get element by selector
     */
    static $(selector, parent = document) {
        return parent.querySelector(selector);
    }

    /**
     * Get all elements by selector
     */
    static $$(selector, parent = document) {
        return parent.querySelectorAll(selector);
    }

    /**
     * Check if element is in viewport
     */
    static isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Add event listener with delegation support
     */
    static on(event, selector, handler, parent = document) {
        parent.addEventListener(event, function(e) {
            if (e.target.matches(selector)) {
                handler.call(e.target, e);
            }
        });
    }

    /**
     * Validate email format
     */
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validate phone number
     */
    static isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    /**
     * Format file size
     */
    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Check if file type is valid
     */
    static isValidFileType(file) {
        const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        return validTypes.includes(file.type);
    }
}

// ===== NAVIGATION MANAGEMENT =====
class NavigationManager {
    constructor() {
        this.navbar = HealthBridgeUtils.$('.navbar');
        this.navbarToggler = HealthBridgeUtils.$('.navbar-toggler');
        this.navbarCollapse = HealthBridgeUtils.$('.navbar-collapse');
        this.dropdowns = HealthBridgeUtils.$$('.dropdown');
        
        this.init();
    }
    
    init() {
        this.handleScroll();
        this.handleDropdowns();
        this.handleMobileMenu();
        this.handleSmoothScroll();
    }
    
    handleScroll() {
        window.addEventListener('scroll', HealthBridgeUtils.throttle(() => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }, 10));
    }
    
    handleDropdowns() {
        this.dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('show');
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.matches('.dropdown-toggle')) {
                this.dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('show');
                });
            }
        });
    }
    
    handleMobileMenu() {
        if (this.navbarToggler && this.navbarCollapse) {
            this.navbarToggler.addEventListener('click', () => {
                this.navbarCollapse.classList.toggle('show');
            });
            
            // Close mobile menu when clicking on a link
            const navLinks = this.navbarCollapse.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.navbarCollapse.classList.remove('show');
                });
            });
        }
    }
    
    handleSmoothScroll() {
        const navLinks = HealthBridgeUtils.$$('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = HealthBridgeUtils.$(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===== FORM HANDLING =====
class FormHandler {
    constructor() {
        this.forms = HealthBridgeUtils.$$('form');
        this.fileInputs = HealthBridgeUtils.$$('input[type="file"]');
        
        this.init();
    }
    
    init() {
        this.handleFormSubmissions();
        this.handleFileUploads();
        this.handleInputValidation();
    }
    
    handleFormSubmissions() {
        this.forms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                // Show loading state
                this.setLoadingState(submitBtn, 'Processing...');
                
                try {
                    const formData = new FormData(form);
                    const response = await this.submitForm(form.action, formData, form.method);
                    
                    if (response.ok) {
                        this.showSuccessMessage(form, 'Thank you! Your message has been sent successfully.');
                        form.reset();
                    } else {
                        throw new Error('Form submission failed');
                    }
                } catch (error) {
                    this.showErrorMessage(form, 'Sorry, there was an error submitting your form. Please try again.');
                    console.error('Form submission error:', error);
                } finally {
                    this.resetButtonState(submitBtn, originalText);
                }
            });
        });
    }
    
    async submitForm(url, formData, method = 'POST') {
        // For Formspree integration
        if (url.includes('formspree.io')) {
            return fetch(url, {
                method: method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
        }
        
        // For Netlify Forms
        if (url.includes('netlify.com') || url.includes('netlify.app')) {
            const formProps = Object.fromEntries(formData);
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(formProps).toString()
            });
        }
        
        // Default fetch
        return fetch(url, {
            method: method,
            body: formData
        });
    }
    
    handleFileUploads() {
        this.fileInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    this.handleFileSelection(file, input);
                }
            });
        });
        
        // Drag and drop support
        const dropAreas = HealthBridgeUtils.$$('.upload-area');
        dropAreas.forEach(area => {
            area.addEventListener('dragover', (e) => {
                e.preventDefault();
                area.classList.add('dragover');
            });
            
            area.addEventListener('dragleave', () => {
                area.classList.remove('dragover');
            });
            
            area.addEventListener('drop', (e) => {
                e.preventDefault();
                area.classList.remove('dragover');
                
                const file = e.dataTransfer.files[0];
                if (file && HealthBridgeUtils.isValidFileType(file)) {
                    this.handleFileSelection(file, area);
                }
            });
        });
    }
    
    handleFileSelection(file, target) {
        const fileName = file.name;
        const fileSize = HealthBridgeUtils.formatFileSize(file.size);
        
        // Update UI to show selected file
        if (target.classList.contains('upload-area')) {
            target.innerHTML = `
                <i class="fas fa-check-circle text-success" style="font-size: 3rem;"></i>
                <h5 class="mt-3">File Selected</h5>
                <p>${fileName} (${fileSize})</p>
                <div class="mt-3">
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 100%"></div>
                    </div>
                    <p class="mt-2">Analyzing your bill...</p>
                </div>
            `;
            
            // Simulate analysis completion
            setTimeout(() => {
                this.showAnalysisResults(target);
            }, 3000);
        }
    }
    
    showAnalysisResults(container) {
        container.innerHTML = `
            <i class="fas fa-robot text-primary" style="font-size: 3rem;"></i>
            <h5 class="mt-3">Analysis Complete!</h5>
            <p>3 potential errors found</p>
            <button class="btn btn-primary mt-3" onclick="HealthBridgeApp.showDetailedReport()">
                View Detailed Report
            </button>
        `;
    }
    
    handleInputValidation() {
        const inputs = HealthBridgeUtils.$$('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            if (!HealthBridgeUtils.isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            if (!HealthBridgeUtils.isValidPhone(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }
        
        return isValid;
    }
    
    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('is-invalid');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    clearFieldError(field) {
        field.classList.remove('is-invalid');
        
        const existingError = field.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
    }
    
    setLoadingState(button, text) {
        button.disabled = true;
        button.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i>${text}`;
    }
    
    resetButtonState(button, originalText) {
        button.disabled = false;
        button.innerHTML = originalText;
    }
    
    showSuccessMessage(form, message) {
        this.showMessage(form, message, 'success');
    }
    
    showErrorMessage(form, message) {
        this.showMessage(form, message, 'error');
    }
    
    showMessage(form, message, type) {
        const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
        
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${alertClass} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            <i class="fas ${icon} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        form.parentNode.insertBefore(alertDiv, form);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
}

// ===== ANIMATIONS AND SCROLL EFFECTS =====
class AnimationManager {
    constructor() {
        this.observer = null;
        this.animatedElements = [];
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.handleScrollAnimations();
        this.handlePageLoadAnimations();
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add delay for staggered animations
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            });
        }, options);
    }
    
    handleScrollAnimations() {
        // Observe all elements with animation classes
        const animatedElements = HealthBridgeUtils.$$('.fade-in, .slide-in');
        
        animatedElements.forEach((element, index) => {
            // Add data attributes for staggered animation
            element.setAttribute('data-delay', index * 100);
            
            // Add to observer
            this.observer.observe(element);
        });
    }
    
    handlePageLoadAnimations() {
        // Add animation classes to sections on page load
        document.addEventListener('DOMContentLoaded', () => {
            const sections = HealthBridgeUtils.$$('section');
            
            sections.forEach(section => {
                if (!section.classList.contains('hero-section')) {
                    section.classList.add('fade-in');
                }
            });
            
            // Animate hero section elements
            const heroElements = HealthBridgeUtils.$$('.hero-title, .hero-subtitle, .hero-buttons, .hero-stats');
            heroElements.forEach((element, index) => {
                element.classList.add('fade-in');
                element.setAttribute('data-delay', index * 200);
            });
        });
    }
    
    // Utility method to scroll to element
    scrollToElement(selector, offset = 80) {
        const element = HealthBridgeUtils.$(selector);
        if (element) {
            const elementTop = element.offsetTop - offset;
            
            window.scrollTo({
                top: elementTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Utility method for counter animation
    animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
}

// ===== BLOG FUNCTIONALITY =====
class BlogManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.handleBlogSearch();
        this.handleCategoryFiltering();
        this.handleReadMoreButtons();
    }
    
    handleBlogSearch() {
        const searchInput = HealthBridgeUtils.$('#blog-search');
        if (searchInput) {
            searchInput.addEventListener('input', HealthBridgeUtils.debounce((e) => {
                this.filterBlogPosts(e.target.value);
            }, 300));
        }
    }
    
    handleCategoryFiltering() {
        const categoryFilters = HealthBridgeUtils.$$('.blog-category-filter');
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.target.dataset.category;
                this.filterBlogPostsByCategory(category);
            });
        });
    }
    
    handleReadMoreButtons() {
        HealthBridgeUtils.on('click', '.read-more-btn', (e) => {
            e.preventDefault();
            const postId = e.target.dataset.postId;
            this.showFullArticle(postId);
        });
    }
    
    filterBlogPosts(searchTerm) {
        const blogPosts = HealthBridgeUtils.$$('.blog-card');
        const searchLower = searchTerm.toLowerCase();
        
        blogPosts.forEach(post => {
            const title = post.querySelector('.card-title').textContent.toLowerCase();
            const content = post.querySelector('.card-text').textContent.toLowerCase();
            const category = post.querySelector('.blog-category').textContent.toLowerCase();
            
            const matches = title.includes(searchLower) || 
                           content.includes(searchLower) || 
                           category.includes(searchLower);
            
            post.style.display = matches ? 'block' : 'none';
        });
    }
    
    filterBlogPostsByCategory(category) {
        const blogPosts = HealthBridgeUtils.$$('.blog-card');
        
        blogPosts.forEach(post => {
            const postCategory = post.querySelector('.blog-category').textContent.toLowerCase();
            
            if (category === 'all' || postCategory === category.toLowerCase()) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }
    
    showFullArticle(postId) {
        // In a real application, this would load the full article
        // For demo purposes, we'll show an alert
        alert(`Loading full article for post ID: ${postId}\n\nIn the full version, this would navigate to the complete blog post.`);
    }
}

// ===== STATS COUNTER =====
class StatsCounter {
    constructor() {
        this.init();
    }
    
    init() {
        this.handleStatsAnimation();
    }
    
    handleStatsAnimation() {
        const statElements = HealthBridgeUtils.$$('.stat-item h4');
        
        if (statElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const targetValue = this.parseStatValue(element.textContent);
                        
                        if (targetValue > 0) {
                            this.animateCounter(element, targetValue, 2000);
                        }
                        
                        observer.unobserve(element);
                    }
                });
            });
            
            statElements.forEach(element => observer.observe(element));
        }
    }
    
    parseStatValue(text) {
        // Parse values like "$2.1M+", "15,000+", "94%"
        const cleanText = text.replace(/[$,%+]/g, '');
        
        if (cleanText.includes('M')) {
            return parseFloat(cleanText) * 1000000;
        } else if (cleanText.includes('K')) {
            return parseFloat(cleanText) * 1000;
        } else {
            return parseFloat(cleanText.replace(/,/g, ''));
        }
    }
    
    animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            
            // Format the number based on original format
            const originalText = element.dataset.originalText || element.textContent;
            let formattedValue;
            
            if (originalText.includes('M')) {
                formattedValue = (current / 1000000).toFixed(1) + 'M+';
            } else if (originalText.includes('K')) {
                formattedValue = (current / 1000).toFixed(0) + 'K+';
            } else if (originalText.includes('%')) {
                formattedValue = Math.floor(current) + '%';
            } else {
                formattedValue = Math.floor(current).toLocaleString() + '+';
            }
            
            element.textContent = formattedValue;
        }, 16);
    }
}

// ===== MAIN APPLICATION CLASS =====
class HealthBridgeApp {
    constructor() {
        this.components = {};
        this.isInitialized = false;
        
        this.init();
    }
    
    init() {
        if (this.isInitialized) return;
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeComponents();
            });
        } else {
            this.initializeComponents();
        }
        
        this.isInitialized = true;
    }
    
    initializeComponents() {
        try {
            // Initialize all components
            this.components.navigation = new NavigationManager();
            this.components.forms = new FormHandler();
            this.components.animations = new AnimationManager();
            this.components.blog = new BlogManager();
            this.components.stats = new StatsCounter();
            
            // Initialize additional features
            this.setupServiceWorker();
            this.setupGlobalEventListeners();
            
            console.log('HealthBridge app initialized successfully');
        } catch (error) {
            console.error('Error initializing HealthBridge app:', error);
        }
    }
    
    setupServiceWorker() {
        // Register service worker for PWA capabilities
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                        console.log('SW registered: ', registration);
                    })
                    .catch((registrationError) => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }
    
    setupGlobalEventListeners() {
        // Global click handlers
        HealthBridgeUtils.on('click', '.scroll-to-scanner', () => {
            this.components.animations.scrollToElement('.section-scanner');
        });
        
        HealthBridgeUtils.on('click', '.scroll-to-how-it-works', () => {
            this.components.animations.scrollToElement('#how-it-works');
        });
        
        HealthBridgeUtils.on('click', '.scroll-to-contact', () => {
            this.components.animations.scrollToElement('#contact');
        });
    }
    
    // Global function for analysis results
    static showDetailedReport() {
        const report = `
            Detailed Analysis Report:
            
            • Duplicate charges: $450
            • Incorrect coding: $275  
            • Overcharged services: $180
            
            Total potential savings: $905
            
            Recommended actions:
            1. Contact hospital billing department
            2. Submit dispute letter
            3. Follow up in 30 days
        `;
        
        alert('In the full version, this would show a detailed analysis report:\n\n' + report);
    }
    
    // Global scroll functions for buttons
    static scrollToScanner() {
        const app = window.HealthBridgeApp;
        if (app && app.components.animations) {
            app.components.animations.scrollToElement('.section-scanner');
        }
    }
    
    static scrollToHowItWorks() {
        const app = window.HealthBridgeApp;
        if (app && app.components.animations) {
            app.components.animations.scrollToElement('#how-it-works');
        }
    }
    
    // Public method to refresh components
    refresh() {
        this.initializeComponents();
    }
    
    // Public method to destroy instance
    destroy() {
        this.components = {};
        this.isInitialized = false;
    }
}

// ===== INITIALIZATION =====
// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create global app instance
    window.HealthBridgeApp = new HealthBridgeApp();
    
    // Make utility functions globally available
    window.HealthBridgeUtils = HealthBridgeUtils;
    
    // Make global functions available
    window.scrollToScanner = HealthBridgeApp.scrollToScanner;
    window.scrollToHowItWorks = HealthBridgeApp.scrollToHowItWorks;
    window.showDetailedReport = HealthBridgeApp.showDetailedReport;
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Global error caught:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// ===== PERFORMANCE MONITORING =====
// Log page load performance
window.addEventListener('load', function() {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});

// ===== OFFLINE DETECTION =====
window.addEventListener('online', function() {
    console.log('Application is online');
    // You could show a notification here
});

window.addEventListener('offline', function() {
    console.log('Application is offline');
    // You could show a notification here
});