// ===== ANIMATIONS COMPONENT =====

class Animations {
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
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in');
    
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
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
        if (!section.classList.contains('hero-section')) {
          section.classList.add('fade-in');
        }
      });
      
      // Animate hero section elements
      const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons, .hero-stats');
      heroElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.setAttribute('data-delay', index * 200);
      });
    });
  }
  
  // Utility method to scroll to element
  scrollToElement(selector, offset = 80) {
    const element = document.querySelector(selector);
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

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Animations();
});

// Global scroll functions for buttons
window.scrollToScanner = function() {
  const animations = new Animations();
  animations.scrollToElement('.section-scanner');
};

window.scrollToHowItWorks = function() {
  const animations = new Animations();
  animations.scrollToElement('#how-it-works');
};