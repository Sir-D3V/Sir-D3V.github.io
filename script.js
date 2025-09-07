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

// Typing Animation for Hero Section with Descriptions
const roleContent = [
    {
        role: 'Database Administrator & Arquitecto de Datos',
        description: 'Diseñando arquitecturas de datos robustas y escalables para empresas líderes en la industria'
    },
    {
        role: 'Especialista PostgreSQL & MySQL',
        description: 'Optimizando el rendimiento y la seguridad de bases de datos empresariales con más de 15 años de experiencia'
    },
    {
        role: 'Consultor en Sistemas de Datos',
        description: 'Transformando datos en soluciones estratégicas que impulsan el crecimiento empresarial'
    },
    {
        role: 'Desarrollador Android',
        description: 'Creando experiencias móviles innovadoras que conectan usuarios con sus datos de manera eficiente'
    }
];

let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const roleElement = document.querySelector('.role');
const descriptionElement = document.querySelector('.role-description');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeRole() {
    const currentContent = roleContent[currentRoleIndex];
    
    if (isDeleting) {
        roleElement.textContent = currentContent.role.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roleContent.length;
            
            // Fade out current description
            descriptionElement.style.opacity = '0';
            setTimeout(() => {
                descriptionElement.textContent = roleContent[currentRoleIndex].description;
                descriptionElement.style.opacity = '1';
            }, 500);
            
            setTimeout(typeRole, 500);
            return;
        }
        
        setTimeout(typeRole, deletingSpeed);
    } else {
        roleElement.textContent = currentContent.role.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        if (currentCharIndex === currentContent.role.length) {
            isDeleting = true;
            setTimeout(typeRole, pauseTime);
            return;
        }
        
        setTimeout(typeRole, typingSpeed);
    }
}

// Start typing animation after page load
window.addEventListener('load', () => {
    descriptionElement.textContent = roleContent[0].description;
    setTimeout(typeRole, 1000);
});

// Share Functions
function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('¡Mira el portafolio profesional de Luis Miguel Rubio! Especialista en bases de datos con más de 15 años de experiencia.');
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Luis Miguel Rubio - Database Administrator & Arquitecto de Datos');
    const summary = encodeURIComponent('Portafolio profesional de Luis Miguel Rubio Araque - Especialista en bases de datos SQL y NoSQL con más de 15 años de experiencia');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank');
}

function shareByEmail() {
    const subject = encodeURIComponent('Portafolio de Luis Miguel Rubio - Database Administrator & Arquitecto de Datos');
    const body = encodeURIComponent(`Hola,

Te comparto el portafolio profesional de Luis Miguel Rubio Araque, especialista en bases de datos SQL y NoSQL con más de 15 años de experiencia en desarrollo de software.

Puedes ver su trabajo y experiencia en: ${window.location.href}

¡Saludos!`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('¡Conoce el trabajo de Luis Miguel Rubio! 🚀 Database Administrator & Arquitecto de Datos con +15 años de experiencia 💻 #PostgreSQL #MySQL #DataArchitecture');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function toggleShareMenu() {
    const shareButtons = document.querySelector('.share-buttons');
    shareButtons.style.display = shareButtons.style.display === 'none' ? 'flex' : 'none';
    
    // Show after 100ms for animation
    setTimeout(() => {
        shareButtons.style.display = 'flex';
    }, 100);
}

// [Rest of the existing code remains the same...]