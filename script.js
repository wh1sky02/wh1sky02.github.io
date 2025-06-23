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

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate sections on scroll
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .contact-card, .about-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Terminal typing effect
document.addEventListener('DOMContentLoaded', function() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    let delay = 0;
    
    terminalLines.forEach(line => {
        setTimeout(() => {
            line.style.opacity = '1';
        }, delay);
        delay += 800;
    });
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 40px rgba(37, 99, 235, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        });
    });

    // Skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 40px rgba(37, 99, 235, 0.15)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateX(-50px)';
        heroContent.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateX(0)';
        }, 300);
    }
    
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(50px)';
        heroImage.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 600);
    }
}); 