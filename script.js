// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    initializeCardInteractions();
    initializeParallaxEffect();
    addGlitchEffect();
});

// Initialize card animations
function initializeAnimations() {
    const cards = document.querySelectorAll('.project-card');
    
    // Add stagger animation to cards
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Enhanced card interactions
function initializeCardInteractions() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        // Add click handler for main card area
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on GitHub link
            if (!e.target.closest('.github-link')) {
                const projectLink = card.querySelector('.project-link');
                if (projectLink) {
                    projectLink.click();
                }
            }
        });

        // Add 3D tilt effect on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });

        // Prevent GitHub link from triggering card click
        const githubLink = card.querySelector('.github-link');
        if (githubLink) {
            githubLink.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        // Add ripple effect on click
        card.addEventListener('mousedown', (e) => {
            if (!e.target.closest('.github-link') && !e.target.closest('.project-link')) {
                createRipple(e, card);
            }
        });
    });
}

// Create ripple effect
function createRipple(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(99, 102, 241, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax scrolling effect for hero
function initializeParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${parallax}px)`;
            hero.style.opacity = 1 - (scrolled / 500);
        }
    });
}

// Add glitch effect to title
function addGlitchEffect() {
    const glitchTitle = document.querySelector('.glitch');
    if (!glitchTitle) return;
    
    // Random glitch animation trigger
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchTitle.classList.add('glitch-active');
            setTimeout(() => {
                glitchTitle.classList.remove('glitch-active');
            }, 200);
        }
    }, 3000);
}

// Add glitch effect styles dynamically
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    .glitch-active {
        animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
    }
    
    @keyframes glitch {
        0% {
            transform: translate(0);
        }
        20% {
            transform: translate(-2px, 2px);
        }
        40% {
            transform: translate(-2px, -2px);
        }
        60% {
            transform: translate(2px, 2px);
        }
        80% {
            transform: translate(2px, -2px);
        }
        100% {
            transform: translate(0);
        }
    }
    
    .glitch::before,
    .glitch::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    
    .glitch-active::before {
        animation: glitch-before 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
        color: #ff00ff;
        z-index: -1;
    }
    
    .glitch-active::after {
        animation: glitch-after 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
        color: #00ffff;
        z-index: -1;
    }
    
    @keyframes glitch-before {
        0%, 100% {
            transform: translate(0);
            opacity: 0;
        }
        50% {
            transform: translate(-3px, -3px);
            opacity: 0.7;
        }
    }
    
    @keyframes glitch-after {
        0%, 100% {
            transform: translate(0);
            opacity: 0;
        }
        50% {
            transform: translate(3px, 3px);
            opacity: 0.7;
        }
    }
`;
document.head.appendChild(glitchStyle);

// Add smooth scrolling
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

// Log project interactions (for analytics/debugging)
document.querySelectorAll('.project-link, .github-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const projectCard = e.target.closest('.project-card');
        const projectName = projectCard ? projectCard.dataset.project : 'unknown';
        const linkType = e.target.closest('.github-link') ? 'github' : 'website';
        console.log(`Project clicked: ${projectName}, Link type: ${linkType}`);
    });
});

console.log('%c🚀 Portfolio Website Loaded Successfully!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cCreated with ❤️', 'color: #ec4899; font-size: 12px;');
