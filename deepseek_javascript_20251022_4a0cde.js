// ===== NAVIGATION COMPONENT =====

class Navigation {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navbarToggler = document.querySelector('.navbar-toggler');
    this.navbarCollapse = document.querySelector('.navbar-collapse');
    this.dropdowns = document.querySelectorAll('.dropdown');
    
    this.init();
  }
  
  init() {
    this.handleScroll();
    this.handleDropdowns();
    this.handleMobileMenu();
    this.handleSmoothScroll();
  }
  
  handleScroll() {
    window.addEventListener('scroll', debounce(() => {
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
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
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

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
});