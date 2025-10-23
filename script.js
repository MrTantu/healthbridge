// ===== HEALTHBRIDGE - COMPLETE JAVASCRIPT WITH ADVANCED ANIMATIONS =====

// ===== ADVANCED ANIMATION MANAGER =====
class AdvancedAnimationManager {
    constructor() {
        this.observers = [];
        this.scrollEffects = [];
        this.cursorEffects = [];
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupCursorEffects();
        this.setupPageTransitions();
        this.setupLoadingAnimations();
    }
    
    // Scroll-triggered animations
    setupScrollAnimations() {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateOnScroll(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all elements with scroll animation classes
        const scrollElements = document.querySelectorAll(
            '.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale'
        );
        
        scrollElements.forEach(el => {
            scrollObserver.observe(el);
            // Add random delay for staggered animation
            el.style.setProperty('--animation-delay', `${Math.random() * 0.5}s`);
        });
    }
    
    animateOnScroll(element) {
        element.classList.add('animated');
        
        // Add specific animation based on class
        if (element.classList.contains('animate-on-scroll-left')) {
            element.style.animation = `fadeInLeft 0.6s ease-out var(--animation-delay) both`;
        } else if (element.classList.contains('animate-on-scroll-right')) {
            element.style.animation = `fadeInRight 0.6s ease-out var(--animation-delay) both`;
        } else if (element.classList.contains('animate-on-scroll-scale')) {
            element.style.animation = `scaleIn 0.6s ease-out var(--animation-delay) both`;
        } else {
            element.style.animation = `fadeInUp 0.6s ease-out var(--animation-delay) both`;
        }
    }
    
    // Parallax scrolling effects
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
    
    // Custom cursor effects
    setupCursorEffects() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        // Cursor styles
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
            transform: translate(-50%, -50%);
        `;
        
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .card, .interactive');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.background = 'var(--secondary-color)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'var(--primary-color)';
            });
        });
    }
    
    // Page transition animations
    setupPageTransitions() {
        // Add transition overlay
        const transitionOverlay = document.createElement('div');
        transitionOverlay.className = 'page-transition-overlay';
        transitionOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--gradient-primary);
            z-index: 9999;
            transform: scaleY(0);
            transform-origin: bottom;
            transition: transform 0.6s ease-in-out;
            pointer-events: none;
        `;
        document.body.appendChild(transitionOverlay);
        
        // Handle page transitions
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                transitionOverlay.style.transform = 'scaleY(0)';
            }, 100);
        });
        
        // Animate in when leaving page
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.target === '_blank' || link.href.includes('#')) return;
                
                e.preventDefault();
                transitionOverlay.style.transform = 'scaleY(1)';
                
                setTimeout(() => {
                    window.location.href = link.href;
                }, 600);
            });
        });
    }
    
    // Loading animations
    setupLoadingAnimations() {
        // Create loading screen
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        loadingScreen.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <h3>HealthBridge</h3>
                <p>Loading your medical bill assistant...</p>
            </div>
        `;
        
        loadingScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--gradient-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        `;
        
        document.body.appendChild(loadingScreen);
        
        // Hide loading screen when page is loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
            }, 1000);
        });
    }
    
    // Particle system for hero section
    createParticles(container, count = 15) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 3 + 3;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                top: ${posY}%;
                left: ${posX}%;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
            `;
            
            container.appendChild(particle);
        }
    }
    
    // Text reveal animation
    animateTextReveal(element) {
        const text = element.textContent;
        element.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.animation = `fadeInUp 0.5s ease ${i * 0.1}s both`;
            element.appendChild(span);
        }
    }
    
    // Counter animation with easing
    animateCounter(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = start + (target - start) * easeOutQuart;
            
            element.textContent = Math.floor(current).toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
}

// ===== INTERACTIVE SCANNER DEMO =====
class InteractiveScanner {
    constructor() {
        this.scanning = false;
        this.init();
    }
    
    init() {
        this.setupScannerDemo();
        this.setupFileProcessing();
    }
    
    setupScannerDemo() {
        const uploadArea = document.querySelector('.upload-area');
        const fileInput = document.querySelector('#fileInput');
        
        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', () => fileInput.click());
            
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) this.processFile(file, uploadArea);
            });
            
            // Drag and drop
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });
            
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                const file = e.dataTransfer.files[0];
                if (file) this.processFile(file, uploadArea);
            });
        }
    }
    
    processFile(file, uploadArea) {
        if (!HealthBridgeUtils.isValidFileType(file)) {
            alert('Please upload a PDF, JPG, or PNG file.');
            return;
        }
        
        this.showScanningAnimation(uploadArea, file);
    }
    
    showScanningAnimation(container, file) {
        this.scanning = true;
        
        container.innerHTML = `
            <div class="scanning-animation">
                <div class="scanner-beam"></div>
                <i class="fas fa-file-medical-alt" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h5>Scanning Document</h5>
                <p>${file.name}</p>
                <div class="progress mt-3">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" 
                         style="width: 0%"></div>
                </div>
                <p class="mt-2">Analyzing for errors...</p>
            </div>
        `;
        
        // Animate progress bar
        const progressBar = container.querySelector('.progress-bar');
        let progress = 0;
        
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => this.showResults(container), 500);
            }
            progressBar.style.width = `${progress}%`;
        }, 200);
    }
    
    showResults(container) {
        const errors = this.generateRandomErrors();
        
        container.innerHTML = `
            <div class="scan-results animate-scale-in">
                <i class="fas fa-robot text-primary" style="font-size: 3rem;"></i>
                <h5 class="mt-3">Analysis Complete!</h5>
                <div class="results-summary">
                    <div class="result-item">
                        <span class="result-count">${errors.count}</span>
                        <span class="result-label">Potential Errors Found</span>
                    </div>
                    <div class="result-item">
                        <span class="result-amount">$${errors.savings}</span>
                        <span class="result-label">Potential Savings</span>
                    </div>
                </div>
                <div class="error-types mt-3">
                    ${errors.types.map(type => `
                        <span class="error-badge">${type}</span>
                    `).join('')}
                </div>
                <button class="btn btn-primary mt-3" onclick="HealthBridgeApp.showDetailedReport()">
                    View Detailed Report
                </button>
            </div>
        `;
        
        // Animate results
        const resultItems = container.querySelectorAll('.result-item');
        resultItems.forEach((item, index) => {
            item.style.animation = `fadeInUp 0.6s ease ${index * 0.2}s both`;
        });
    }
    
    generateRandomErrors() {
        const errorTypes = [
            'Duplicate Charges', 'Incorrect Coding', 'Overcharged Services',
            'Insurance Miscalculation', 'Out-of-Network Charges'
        ];
        
        const count = Math.floor(Math.random() * 3) + 2; // 2-4 errors
        const selectedTypes = [];
        
        for (let i = 0; i < count; i++) {
            const randomType = errorTypes[Math.floor(Math.random() * errorTypes.length)];
            if (!selectedTypes.includes(randomType)) {
                selectedTypes.push(randomType);
            }
        }
        
        const savings = Math.floor(Math.random() * 1000) + 500; // $500-$1500
        
        return {
            count: selectedTypes.length,
            savings: savings,
            types: selectedTypes
        };
    }
}

// ===== ENHANCED BLOG ANIMATIONS =====
class EnhancedBlogManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupBlogAnimations();
        this.setupReadingProgress();
        this.setupShareAnimations();
    }
    
    setupBlogAnimations() {
        // Animate blog cards on hover
        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Animate images on load
        const blogImages = document.querySelectorAll('.blog-image');
        blogImages.forEach(img => {
            img.style.opacity = '0';
            img.style.transform = 'scale(0.8)';
            
            img.onload = () => {
                img.style.transition = 'all 0.6s ease';
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            };
        });
    }
    
    setupReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--primary-color);
            z-index: 9998;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset;
            const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
            
            progressBar.style.width = `${scrollPercent}%`;
        });
    }
    
    setupShareAnimations() {
        const shareButtons = document.querySelectorAll('.share-btn');
        shareButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.animateShare(btn);
            });
        });
    }
    
    animateShare(button) {
        button.style.transform = 'scale(0.8)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
        
        // Show share options
        const shareOptions = document.createElement('div');
        shareOptions.className = 'share-options';
        shareOptions.innerHTML = `
            <div class="share-option">Twitter</div>
            <div class="share-option">Facebook</div>
            <div class="share-option">LinkedIn</div>
        `;
        
        shareOptions.style.cssText = `
            position: absolute;
            background: white;
            border-radius: 10px;
            box-shadow: var(--shadow-lg);
            padding: 10px;
            z-index: 1000;
            animation: scaleIn 0.3s ease;
        `;
        
        button.appendChild(shareOptions);
        
        setTimeout(() => {
            shareOptions.remove();
        }, 3000);
    }
}

// ===== MAIN APPLICATION WITH ENHANCED ANIMATIONS =====
class HealthBridgeApp {
    constructor() {
        this.components = {};
        this.isInitialized = false;
        this.init();
    }
    
    init() {
        if (this.isInitialized) return;
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeEnhancedComponents();
            });
        } else {
            this.initializeEnhancedComponents();
        }
        
        this.isInitialized = true;
    }
    
    initializeEnhancedComponents() {
        try {
            // Initialize enhanced components
            this.components.animations = new AdvancedAnimationManager();
            this.components.scanner = new InteractiveScanner();
            this.components.blog = new EnhancedBlogManager();
            
            // Initialize particle system for hero section
            this.setupParticleSystem();
            
            // Initialize floating action button
            this.setupFloatingButton();
            
            console.log('HealthBridge app with enhanced animations initialized successfully');
        } catch (error) {
            console.error('Error initializing enhanced HealthBridge app:', error);
        }
    }
    
    setupParticleSystem() {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const particlesContainer = document.createElement('div');
            particlesContainer.className = 'hero-particles';
            heroSection.appendChild(particlesContainer);
            
            this.components.animations.createParticles(particlesContainer, 8);
        }
    }
    
    setupFloatingButton() {
        const floatingBtn = document.createElement('div');
        floatingBtn.className = 'floating-btn';
        floatingBtn.innerHTML = '<i class="fas fa-robot"></i>';
        floatingBtn.title = 'AI Assistant';
        
        document.body.appendChild(floatingBtn);
        
        floatingBtn.addEventListener('click', () => {
            this.showAIAssistant();
        });
    }
    
    showAIAssistant() {
        const assistantModal = document.createElement('div');
        assistantModal.className = 'ai-assistant-modal';
        assistantModal.innerHTML = `
            <div class="assistant-content animate-scale-in">
                <div class="assistant-header">
                    <h4>AI HealthBridge Assistant</h4>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="assistant-body">
                    <p>Hello! I'm your AI assistant. How can I help you with medical bills today?</p>
                    <div class="assistant-options">
                        <button class="option-btn" onclick="HealthBridgeApp.askQuestion('bill analysis')">
                            Analyze a Bill
                        </button>
                        <button class="option-btn" onclick="HealthBridgeApp.askQuestion('insurance help')">
                            Insurance Help
                        </button>
                        <button class="option-btn" onclick="HealthBridgeApp.askQuestion('cost saving')">
                            Cost Saving Tips
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        assistantModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;
        
        document.body.appendChild(assistantModal);
        
        // Close modal
        const closeBtn = assistantModal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            assistantModal.remove();
        });
        
        assistantModal.addEventListener('click', (e) => {
            if (e.target === assistantModal) {
                assistantModal.remove();
            }
        });
    }
    
    static askQuestion(question) {
        const responses = {
            'bill analysis': 'I can help you analyze medical bills for errors. Upload your bill and I\'ll scan for duplicate charges, incorrect codes, and overcharges.',
            'insurance help': 'I can assist with insurance claim denials and help you understand your Explanation of Benefits (EOB) documents.',
            'cost saving': 'Here are quick cost-saving tips: Always request itemized bills, compare pharmacy prices, and negotiate cash prices for procedures.'
        };
        
        alert(responses[question] || 'I\'m here to help! Please ask me about medical bills, insurance, or cost saving.');
    }
    
    static showDetailedReport() {
        const report = `
            🏥 Detailed Medical Bill Analysis Report
            
            🔍 Errors Found:
            • Duplicate charges: $450
            • Incorrect procedure codes: $275  
            • Overcharged services: $180
            • Insurance miscalculation: $95
            
            💰 Total Potential Savings: $1,000
            
            📋 Recommended Actions:
            1. Contact hospital billing department
            2. Submit formal dispute letter
            3. Follow up within 30 days
            4. Escalate to insurance if needed
            
            ⚡ Next Steps:
            - Download dispute letter template
            - Schedule callback with our experts
            - Track your savings progress
        `;
        
        // Create a beautiful modal for the report
        const reportModal = document.createElement('div');
        reportModal.className = 'report-modal';
        reportModal.innerHTML = `
            <div class="report-content animate-scale-in">
                <div class="report-header">
                    <h4>📊 Analysis Report</h4>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="report-body">
                    <pre>${report}</pre>
                </div>
                <div class="report-footer">
                    <button class="btn btn-primary">Download PDF Report</button>
                    <button class="btn btn-outline-primary">Share Results</button>
                </div>
            </div>
        `;
        
        reportModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            backdrop-filter: blur(5px);
        `;
        
        document.body.appendChild(reportModal);
        
        // Close modal
        const closeBtn = reportModal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            reportModal.remove();
        });
        
        reportModal.addEventListener('click', (e) => {
            if (e.target === reportModal) {
                reportModal.remove();
            }
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Create global app instance with enhanced animations
    window.HealthBridgeApp = new HealthBridgeApp();
    
    // Make utility functions globally available
    window.HealthBridgeUtils = HealthBridgeUtils;
    
    // Make global functions available
    window.scrollToScanner = HealthBridgeApp.scrollToScanner;
    window.scrollToHowItWorks = HealthBridgeApp.scrollToHowItWorks;
    window.showDetailedReport = HealthBridgeApp.showDetailedReport;
    
    console.log('🚀 HealthBridge with Advanced Animations Loaded!');
});

// Performance monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${loadTime}ms with advanced animations`);
    }
});