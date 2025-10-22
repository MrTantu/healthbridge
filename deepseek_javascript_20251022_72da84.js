// ===== HEALTHBRIDGE MAIN JAVASCRIPT =====

// Import utilities and components
import { debounce, throttle, formatCurrency, $, $$, isInViewport, on } from './utils/helpers.js';

// Main application class
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
      this.components.navigation = new Navigation();
      this.components.forms = new FormHandler();
      this.components.animations = new Animations();
      
      // Initialize additional features
      this.handleStatsCounter();
      this.handleBlogInteractions();
      this.handleContactForm();
      this.setupServiceWorker();
      
      console.log('HealthBridge app initialized successfully');
    } catch (error) {
      console.error('Error initializing HealthBridge app:', error);
    }
  }
  
  handleStatsCounter() {
    const statElements = $$('.stat-item h4');
    
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
  
  handleBlogInteractions() {
    // Blog search functionality
    const searchInput = $('#blog-search');
    if (searchInput) {
      searchInput.addEventListener('input', debounce((e) => {
        this.filterBlogPosts(e.target.value);
      }, 300));
    }
    
    // Blog category filtering
    const categoryFilters = $$('.blog-category-filter');
    categoryFilters.forEach(filter => {
      filter.addEventListener('click', (e) => {
        e.preventDefault();
        const category = e.target.dataset.category;
        this.filterBlogPostsByCategory(category);
      });
    });
  }
  
  filterBlogPosts(searchTerm) {
    const blogPosts = $$('.blog-card');
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
    const blogPosts = $$('.blog-card');
    
    blogPosts.forEach(post => {
      const postCategory = post.querySelector('.blog-category').textContent.toLowerCase();
      
      if (category === 'all' || postCategory === category.toLowerCase()) {
        post.style.display = 'block';
      } else {
        post.style.display = 'none';
      }
    });
  }
  
  handleContactForm() {
    const contactForm = $('#contact-form');
    if (contactForm) {
      // Add real-time validation
      const inputs = contactForm.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          this.validateContactField(input);
        });
      });
    }
  }
  
  validateContactField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    switch (field.type) {
      case 'email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
      case 'tel':
        isValid = /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''));
        break;
      default:
        isValid = value.length > 0;
    }
    
    if (!isValid && value.length > 0) {
      field.classList.add('is-invalid');
    } else {
      field.classList.remove('is-invalid');
    }
    
    return isValid;
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

// Global app instance
window.HealthBridgeApp = new HealthBridgeApp();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HealthBridgeApp;
}