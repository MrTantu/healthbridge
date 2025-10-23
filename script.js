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
        const startTime = performance.now();}
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);}}