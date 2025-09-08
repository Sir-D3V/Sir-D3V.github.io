// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Add click event to the entire toggle container for better UX
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
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


// Contact Form Handling with Captcha
const contactForm = document.getElementById('contactForm');
const captchaQuestion = document.getElementById('captcha-question');
const captchaAnswer = document.getElementById('captcha-answer');
const captchaExpected = document.getElementById('captcha-expected');

// Generate simple math captcha
function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 + num2;
    
    captchaQuestion.textContent = `${num1} + ${num2}`;
    captchaExpected.value = answer;
}


contactForm.addEventListener('submit', function(e) {
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        e.preventDefault();
        showNotification('Por favor, completa todos los campos.', 'error');
        return false;
    }
    
    if (!isValidEmail(email)) {
        e.preventDefault();
        showNotification('Por favor, ingresa un email válido.', 'error');
        return false;
    }
    
    // Get captcha values
    const captchaUserAnswer = parseInt(captchaAnswer.value);
    const captchaCorrectAnswer = parseInt(captchaExpected.value);
    
    // Validate captcha before submitting
    if (isNaN(captchaUserAnswer) || captchaUserAnswer !== captchaCorrectAnswer) {
        e.preventDefault();
        showNotification('Captcha incorrecto. Por favor, intenta de nuevo.', 'error');
        generateCaptcha();
        captchaAnswer.value = '';
        return false;
    }
    
    // If all validations pass, show sending notification
    showNotification('Enviando mensaje...', 'success');
    // Form will be submitted automatically
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

// Typing Animation for Hero Section with Dynamic Descriptions
const rolesData = [
    {
        title: 'Especialista en SQL & NoSQL',
        description: 'Experto en bases de datos relacionales y no relacionales, optimizando consultas complejas y arquitecturas de datos escalables.'
    },
    {
        title: 'Desarrollador Android & Kotlin Expert',
        description: 'Desarrollador especializado en aplicaciones móviles nativas con Kotlin, creando experiencias de usuario excepcionales.'
    },
    {
        title: 'CEO Sistema de Gestión de Torneos',
        description: 'Líder visionario que impulsa la innovación deportiva digital, revolucionando la gestión de competencias profesionales.'
    },
    {
        title: 'Consultor Senior & Arquitecto de Soluciones',
        description: 'Estratega tecnológico que diseña ecosistemas digitales robustos, optimizando procesos empresariales críticos.'
    }
];

let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const roleElement = document.querySelector('.role');
const descriptionElement = document.getElementById('dynamic-description');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeRole() {
    const currentRoleData = rolesData[currentRoleIndex];
    const currentRole = currentRoleData.title;
    
    if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % rolesData.length;
            
            // Update description with fade effect
            if (descriptionElement) {
                descriptionElement.style.opacity = '0';
                setTimeout(() => {
                    descriptionElement.textContent = rolesData[currentRoleIndex].description;
                    descriptionElement.style.opacity = '1';
                }, 300);
            }
            
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
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // Generate captcha on page load
    generateCaptcha();
    
    // Check if returning from form submission
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('mensaje') && urlParams.get('mensaje') === 'enviado') {
        showNotification('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
        // Remove the query parameter to prevent showing the message again on refresh
        window.history.replaceState({}, document.title, window.location.pathname);
    }
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

// Share Functions
function shareOnWhatsApp() {
    const text = encodeURIComponent('Conoce el portafolio de Luis Miguel Rubio - Especialista en Bases de Datos');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Luis Miguel Rubio - Especialista en Bases de Datos');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank');
}

function shareByEmail() {
    const subject = encodeURIComponent('Portafolio de Luis Miguel Rubio');
    const body = encodeURIComponent(`Te comparto el portafolio de Luis Miguel Rubio - Especialista en Bases de Datos: ${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function shareOnTwitter() {
    const text = encodeURIComponent('Conoce el portafolio de Luis Miguel Rubio - Especialista en Bases de Datos');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}
