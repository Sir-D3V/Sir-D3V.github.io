// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-icon').parentElement;
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Share Functions
function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('¡Mira el portafolio profesional de Luis Miguel Rubio! Especialista en bases de datos con más de 15 años de experiencia.');
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Luis Miguel Rubio - Desarrollador & Especialista en Bases de Datos');
    const summary = encodeURIComponent('Portafolio profesional de Luis Miguel Rubio Araque - Especialista en bases de datos SQL y NoSQL con más de 15 años de experiencia');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank');
}

function shareByEmail() {
    const subject = encodeURIComponent('Portafolio de Luis Miguel Rubio - Desarrollador & Especialista en Bases de Datos');
    const body = encodeURIComponent(`Hola,

Te comparto el portafolio profesional de Luis Miguel Rubio Araque, especialista en bases de datos SQL y NoSQL con más de 15 años de experiencia en desarrollo de software.

Puedes ver su trabajo y experiencia en: ${window.location.href}

¡Saludos!`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('¡Conoce el trabajo de Luis Miguel Rubio! 🚀 Especialista en bases de datos con +15 años de experiencia 💻 #Desarrollador #BaseDeDatos #PostgreSQL #MongoDB');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function toggleShareMenu() {
    const shareButtons = document.querySelector('.share-buttons');
    shareButtons.style.display = shareButtons.style.display === 'none' ? 'flex' : 'none';
    
    // Hide after 5 seconds
    setTimeout(() => {
        shareButtons.style.display = 'flex';
    }, 100);
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightActiveSection() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');

function updateNavbarBackground() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateNavbarBackground);

// Animate Skill Bars on Scroll
const skillBars = document.querySelectorAll('.skill-progress');
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (barPosition < screenPosition) {
            bar.style.width = bar.style.width || '0%';
        }
    });
};

window.addEventListener('scroll', animateSkillBars);

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.timeline-item, .project-card, .skill-category, .about-card').forEach(el => {
    observer.observe(el);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Por favor, completa todos los campos.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Por favor, ingresa un email válido.', 'error');
        return;
    }
    
    // Simulate form submission (replace with actual form handling)
    showNotification('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
    this.reset();
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    if (type === 'success') {
        notification.style.background = '#10b981';
    } else if (type === 'error') {
        notification.style.background = '#ef4444';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Typing Animation for Hero Section
const roles = [
    'Desarrollador & Especialista en Bases de Datos',
    'CEO Sistema de Torneos',
    'Consultor en PostgreSQL',
    'Desarrollador Android'
];

let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const roleElement = document.querySelector('.role');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeRole() {
    const currentRole = roles[currentRoleIndex];
    
    if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            setTimeout(typeRole, 500);
            return;
        }
        
        setTimeout(typeRole, deletingSpeed);
    } else {
        roleElement.textContent = currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        if (currentCharIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeRole, pauseTime);
            return;
        }
        
        setTimeout(typeRole, typingSpeed);
    }
}

// Start typing animation after page load
window.addEventListener('load', () => {
    setTimeout(typeRole, 1000);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .nav-menu.active {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-primary);
        flex-direction: column;
        padding: var(--spacing-md);
        border-top: 1px solid var(--border-color);
        box-shadow: 0 5px 15px var(--shadow-light);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px var(--shadow-light);
    }
    
    [data-theme="dark"] .navbar.scrolled {
        background: rgba(17, 24, 39, 0.98);
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .timeline-item,
    .project-card,
    .skill-category,
    .about-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;

document.head.appendChild(style);

// Smooth reveal animations for elements
const revealElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    highlightActiveSection();
    updateNavbarBackground();
    animateSkillBars();
}, 16)); // ~60fps

// Hide share buttons initially and show on scroll
window.addEventListener('load', () => {
    const shareButtons = document.querySelector('.share-buttons');
    shareButtons.style.opacity = '0';
    shareButtons.style.transform = 'translateX(100px)';
    shareButtons.style.transition = 'all 0.3s ease-in-out';
    
    setTimeout(() => {
        shareButtons.style.opacity = '1';
        shareButtons.style.transform = 'translateX(0)';
    }, 2000);
});

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('¡Enlace copiado al portapapeles!', 'success');
    }).catch(() => {
        showNotification('Error al copiar el enlace', 'error');
    });
}