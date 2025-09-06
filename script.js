// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-icon');
const body = document.body;
const root = document.documentElement;

// Theme variables
const themes = {
    light: {
        '--bg-primary': '#ffffff',
        '--bg-secondary': '#f3f4f6',
        '--text-primary': '#111827',
        '--text-secondary': '#4b5563',
        '--primary-color': '#3b82f6',
        '--border-color': '#e5e7eb',
        '--shadow-light': 'rgba(0, 0, 0, 0.1)',
        '--shadow-dark': 'rgba(0, 0, 0, 0.2)'
    },
    dark: {
        '--bg-primary': '#111827',
        '--bg-secondary': '#1f2937',
        '--text-primary': '#f9fafb',
        '--text-secondary': '#d1d5db',
        '--primary-color': '#60a5fa',
        '--border-color': '#374151',
        '--shadow-light': 'rgba(0, 0, 0, 0.3)',
        '--shadow-dark': 'rgba(0, 0, 0, 0.4)'
    }
};

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
setTheme(currentTheme);

themeToggle.addEventListener('click', () => {
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

function setTheme(theme) {
    // Update body attribute
    body.setAttribute('data-theme', theme);
    
    // Update CSS variables
    const themeVars = themes[theme];
    for (const [property, value] of Object.entries(themeVars)) {
        root.style.setProperty(property, value);
    }
    
    // Update icon
    updateThemeIcon(theme);
    
    // Save preference
    localStorage.setItem('theme', theme);
}

function updateThemeIcon(theme) {
    themeToggle.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
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

// Rest of your existing JavaScript code remains the same