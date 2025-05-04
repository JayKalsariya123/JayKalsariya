/**
 * Portfolio JavaScript for fixing quantum orb click and stabilizing mobile view
 * - Simplified and robustified quantum orb event handling
 * - Immediate event binding for reliability
 * - Enhanced debugging for element and event tracing
 * - Maintained social links, About section, and mobile stabilization fixes
 * - Assumes provided CSS and prior HTML structure
 */

// Quantum Intro Sequence Controller
class QuantumIntro {
    constructor() {
        this.initialized = false;
        this.init();
        // Bind events immediately in case DOM is already loaded
        this.bindEvents();
    }

    init() {
        this.intro = document.getElementById('quantumIntro');
        this.orb = document.querySelector('.quantum-orb');
        this.messages = document.querySelector('.quantum-messages');

        if (!this.intro || !this.orb || !this.messages) {
            console.error('Quantum intro elements missing:', {
                intro: !!this.intro,
                orb: !!this.orb,
                messages: !!this.messages
            });
            return;
        }

        // Force orb to be interactable
        this.orb.style.opacity = '1';
        this.orb.style.visibility = 'visible';
        this.orb.style.pointerEvents = 'auto';
        this.orb.style.zIndex = '10001';
        this.orb.style.cursor = 'pointer';

        // Populate code container
        this.messages.innerHTML = `
            <img src="./images/image.png" alt="Meme Image" class="meme-image">
            <div class="code-container">
                <div class="code-line def">def main():</div>
                <div class="code-line try">    try:</div>
                <div class="code-line function">        write_code()</div>
                <div class="code-line function">        test_code()</div>
                <div class="code-line function">        deploy_code()</div>
                <div class="code-line except">    except Exception as e:</div>
                <div class="code-line function">        call_openai_api(e)</div>
                <div class="code-line comment"># Remember folks: there is only user experience,</div>
                <div class="code-line comment"># not dev experience.</div>
                <span class="code-cursor"></span>
            </div>
        `;

        this.codeLines = this.messages.querySelectorAll('.code-line');
        this.memeImage = this.messages.querySelector('.meme-image');

        console.log('Quantum intro initialized, orb interactable:', {
            position: this.orb.getBoundingClientRect(),
            display: window.getComputedStyle(this.orb).display
        });
    }

    bindEvents() {
        if (!this.orb) {
            console.warn('Orb not found for event binding');
            return;
        }

        // Simplified event handling with fallback
        const handleInteraction = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const eventType = e.type;
            const coords = eventType === 'touchstart' ? 
                { x: e.touches[0].clientX, y: e.touches[0].clientY } : 
                { x: e.clientX, y: e.clientY };
            console.log(`Quantum orb ${eventType} at (${coords.x}, ${coords.y})`);
            if (!this.initialized) {
                this.initialized = true;
                console.log('Starting quantum intro sequence');
                this.startSequence();
            } else {
                console.log('Sequence already initialized');
            }
        };

        // Bind click and touchstart with passive: false
        ['click', 'touchstart'].forEach(eventType => {
            this.orb.removeEventListener(eventType, handleInteraction);
            this.orb.addEventListener(eventType, handleInteraction, { passive: false });
        });

        // Debug other touch events
        ['touchend', 'touchmove'].forEach(eventType => {
            this.orb.addEventListener(eventType, (e) => {
                console.log(`Quantum orb ${eventType} detected`);
            });
        });

        // Fallback: Bind to parent intro element
        if (this.intro) {
            this.intro.addEventListener('click', (e) => {
                if (e.target.closest('.quantum-orb')) {
                    console.log('Fallback click on quantum-intro triggered orb');
                    handleInteraction(e);
                }
            });
        }
    }

    async startSequence() {
        console.log('Executing intro sequence');

        try {
            if (!this.orb || !this.messages || !this.intro) {
                console.error('Elements lost during sequence:', {
                    orb: !!this.orb,
                    messages: !!this.messages,
                    intro: !!this.intro
                });
                return;
            }

            this.orb.style.transition = 'all 0.5s ease';
            this.orb.style.transform = 'scale(1.5)';
            this.orb.style.opacity = '0';
            await this.wait(500);
            this.orb.style.display = 'none';

            this.messages.classList.add('active');
            await this.wait(300);

            if (this.memeImage) {
                this.memeImage.classList.add('active');
                await this.wait(500);
            }

            for (let line of this.codeLines) {
                line.classList.add('active');
                await this.wait(200);
            }

            await this.wait(4000);
            this.intro.classList.add('completed');
            await this.wait(500);
            this.intro.remove();
            console.log('Quantum intro sequence completed');
        } catch (error) {
            console.error('Error in intro sequence:', error);
        }
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Particle System for Desktop Only
class ParticleSystem {
    constructor() {
        if (window.innerWidth <= 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            console.log('Skipping particle system on mobile or reduced motion');
            return;
        }

        this.container = document.createElement('div');
        this.container.className = 'particle-system';
        document.body.appendChild(this.container);

        this.particles = [];
        this.maxParticles = 20;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            if (this.particles.length < this.maxParticles) {
                this.createParticle(e.clientX, e.clientY);
            }
        });

        setInterval(() => {
            this.particles = this.particles.filter(p => p.element.parentNode);
            this.particles.forEach(p => {
                if (p.element.style.opacity <= 0) {
                    p.element.remove();
                }
            });
        }, 1000);
    }

    createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        this.container.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 20;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        this.particles.push({ element: particle });
    }
}

// Custom Cursor for Desktop Only
class CustomCursor {
    constructor() {
        if (window.innerWidth <= 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            console.log('Skipping custom cursor on mobile or reduced motion');
            return;
        }

        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor';
        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'cursor-dot';
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorDot);

        this.pos = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        this.speed = 0.1;

        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });

        const links = document.querySelectorAll('a, button');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => this.cursor.classList.add('cursor-hover'));
            link.addEventListener('mouseleave', () => this.cursor.classList.remove('cursor-hover'));
        });

        this.render();
    }

    render() {
        this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
        this.pos.y += (this.mouse.y - this.pos.y) * this.speed;
        this.cursor.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;
        requestAnimationFrame(this.render.bind(this));
    }
}

// Project Data
const projects = [
    {
        title: "AI Finance Advisor",
        description: "A full-stack finance advisory application using React.js, Tailwind CSS, React Charts, and Groq LLMs.",
        image: "ai-finance-advisor.webp",
        tags: ["React.js", "Tailwind CSS", "React Charts", "Groq LLMs"],
        github: "https://github.com/JAYKALSARIYA98/FINANCE-ADVISOR"
    },
    {
        title: "Crop-Care: AI-based Plant Disease Detection System",
        description: "An AI web application using Python for identifying plant diseases from leaf images.",
        image: "crop-care.webp",
        tags: ["Python", "React.js"],
        github: "https://github.com/JAYKALSARIYA98/CROPCARE"
    },
    {
        title: "AI Interview Analysis System",
        description: "A web-based interview analysis tool using facial landmark detection and sentiment analysis.",
        image: "ai-interview-analysis.webp",
        tags: ["React.js", "Tailwind CSS", "Python", "OpenCV", "MediaPipe", "FFmpeg", "Whisper API"],
        github: "https://github.com/JAYKALSARIYA98/Ai-based-interview-taking-web"
    },
    {
        title: "Campus Pulse: College Event Management System",
        description: "A comprehensive college event management system built with the MERN stack.",
        image: "campus-pulse.webp",
        tags: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
        github: "https://github.com/JAYKALSARIYA98/CAMPUSPULSE"
    },
    {
        title: "Bolt.New Clone",
        description: "An AI website builder application using LLM APIs for prompt-based design generation.",
        image: "bolt-new-clone.webp",
        tags: ["React.js", "LLM APIs"],
        github: "https://github.com/JAYKALSARIYA98/Website-builder"
    },
    {
        title: "Cyber Threat Detection System",
        description: "A machine learning-based system achieving 92% accuracy for network attack detection.",
        image: "cyber-threat-detection.webp",
        tags: ["Python", "Machine Learning"],
        github: "https://github.com/JAYKALSARIYA98/CYBERTHREAT-DETECTION-MODEL"
    },
    {
        title: "School Result Website",
        description: "A responsive web portal for SVGK Sihor developed using the MERN stack.",
        image: "school-result-website.webp",
        tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
        github: "https://github.com/JAYKALSARIYA98/SCHIOOL-RESULT-WEBSITE"
    }
];

// Initialize Components
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Quantum Intro
    const quantumIntro = new QuantumIntro();

    // Initialize Particle System (desktop only)
    const particleSystem = new ParticleSystem();

    // Initialize Custom Cursor (desktop only)
    const cursor = new CustomCursor();

    // Populate Projects
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                            <i class="fab fa-github"></i> GitHub
                        </a>
                    </div>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Intersection Observer for Fade-in
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-chip, .project-card').forEach(element => {
        element.classList.add('fade-out');
        observer.observe(element);
    });

    // Fallback for About Section Visibility
    setTimeout(() => {
        const aboutSection = document.querySelector('.about-section .section-chip');
        if (aboutSection && !aboutSection.classList.contains('fade-in')) {
            aboutSection.classList.add('fade-in');
            console.log('Fallback: Forced About section visibility');
        }
    }, 5000);

    // Debug Social Links
    document.querySelectorAll('.port-link').forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('Clicked link:', link.href);
        });
    });

    // Initialize Skill Bars
    document.querySelectorAll('.skill-bar').forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.setProperty('--circuit-progress', `${level}%`);
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                name: this.querySelector('#name').value,
                email: this.querySelector('#email').value,
                message: this.querySelector('#message').value
            };
            console.log('Form submitted:', formData);
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#00ff9d';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                this.reset();
            }, 3000);
        });
    }

    // Glitch Text Effect
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        const text = glitchText.textContent;
        glitchText.setAttribute('data-text', text);
    }

    // Scroll Progress Indicator
    const updateScrollProgress = () => {
        const scrollProgress = document.querySelector('.scroll-progress');
        if (scrollProgress) {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            scrollProgress.style.setProperty('--scroll-percent', scrollPercent);
        }
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    // Remove Loading Screen
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    }
});

// Fallback: Reattempt initialization after delay
setTimeout(() => {
    const orb = document.querySelector('.quantum-orb');
    if (orb && window.getComputedStyle(orb).display !== 'none') {
        console.log('Fallback: Rebinding quantum orb events');
        const quantumIntro = new QuantumIntro();
    }
}, 1000);
