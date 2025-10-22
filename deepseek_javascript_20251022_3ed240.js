// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Scroll to functions
function scrollToScanner() {
    document.querySelector('.section-scanner').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToHowItWorks() {
    document.querySelector('#how-it-works').scrollIntoView({
        behavior: 'smooth'
    });
}

// File upload handling
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const uploadBox = document.getElementById('uploadBox');
        uploadBox.innerHTML = `
            <i class="fas fa-check-circle text-success" style="font-size: 3rem;"></i>
            <h5 class="mt-3">File Uploaded Successfully!</h5>
            <p>${file.name}</p>
            <div class="mt-3">
                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 100%"></div>
                </div>
                <p class="mt-2">Analyzing your bill...</p>
            </div>
        `;
        
        // Simulate analysis completion
        setTimeout(() => {
            uploadBox.innerHTML = `
                <i class="fas fa-robot text-primary" style="font-size: 3rem;"></i>
                <h5 class="mt-3">Analysis Complete!</h5>
                <p>3 potential errors found</p>
                <button class="btn btn-primary mt-3" onclick="showResults()">
                    View Detailed Report
                </button>
            `;
        }, 3000);
    }
});

// Show results function
function showResults() {
    alert('In the full version, this would show a detailed analysis report with:\n\n• Duplicate charges: $450\n• Incorrect coding: $275\n• Overcharged services: $180\n\nTotal potential savings: $905');
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});

// Form submission handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        alert('Thank you! Your information has been submitted. We will contact you shortly with your free bill analysis.');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Add fade-in class to sections for animation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
});