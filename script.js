// Quantum Intro Sequence Controller
class QuantumIntro {
    constructor() {
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.init();
        });
    }

    init() {
        this.intro = document.getElementById('quantumIntro');
        this.orb = document.querySelector('.quantum-orb');
        this.messages = document.querySelector('.quantum-messages');
        
        this.initialized = false;
        
        // Make sure elements are found
        if (!this.intro || !this.orb || !this.messages) {
            console.error('Some quantum intro elements not found');
            return;
        }

        // Create code container and image
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
        
        this.bindEvents();
        
        // Add visible class to make sure orb is showing
        this.orb.style.opacity = '1';
        this.orb.style.visibility = 'visible';
        
        // Add debug click area
        this.orb.style.cursor = 'pointer';
        console.log('Quantum intro initialized');
    }
    
    bindEvents() {
        // Add click event to the entire orb container
        this.orb.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Orb clicked');
            if (!this.initialized) {
                this.initialized = true;
                this.startSequence();
            }
        });

        // Add touch event for mobile devices
        this.orb.addEventListener('touchstart', (e) => {
            e.preventDefault();
            console.log('Orb touched');
            if (!this.initialized) {
                this.initialized = true;
                this.startSequence();
            }
        });
    }
    
    async startSequence() {
        console.log('Starting sequence');

        // Hide orb with fade effect
        this.orb.style.transition = 'all 0.5s ease';
        this.orb.style.transform = 'scale(1.5)';
        this.orb.style.opacity = '0';
        await this.wait(500);
        this.orb.style.display = 'none';
        
        // Show container
        this.messages.classList.add('active');
        await this.wait(300);

        // Show image first
        this.memeImage.classList.add('active');
        await this.wait(500);
        
        // Animate code lines one by one
        for (let line of this.codeLines) {
            line.classList.add('active');
            await this.wait(200); // Adjust timing for each line
        }
        
        // Wait for user to read
        await this.wait(4000);
        
        // Complete sequence
        this.intro.classList.add('completed');
        
        // Remove intro
        await this.wait(500);
        this.intro.remove();
    }
    
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize Quantum Intro
const quantumIntro = new QuantumIntro();

// Project Data
const projects = [
    {
        title: "AI Finance Advisor",
        description: "A full-stack finance advisory application using React.js, Tailwind CSS, React Charts, and Groq LLMs for real-time budgeting and investment suggestions. Implemented expense tracking with add/remove features and data visualizations based on user income and spending patterns.",
        image: "ai-finance-advisor.webp",
        tags: ["React.js", "Tailwind CSS", "React Charts", "Groq LLMs"],
        github: "https://github.com/JAYKALSARIYA98/FINANCE-ADVISOR"
    },
    {
        title: "Crop-Care: AI-based Plant Disease Detection System",
        description: "An AI web application using Python for identifying plant diseases from leaf images to support early-stage diagnosis. Features a user-friendly interface for image uploads and a chatbot for real-time support and actionable guidance for farmers.",
        image: "crop-care.webp",
        tags: ["Python", "React.js"],
        github: "https://github.com/JAYKALSARIYA98/CROPCARE"
    },
    {
        title: "AI Interview Analysis System",
        description: "A web-based interview analysis tool using facial landmark detection and sentiment analysis to evaluate candidate responses. Built with React.js and Tailwind CSS for the frontend, and Python with OpenCV, MediaPipe, FFmpeg, and Whisper API for backend processing and NLP insights.",
        image: "ai-interview-analysis.webp",
        tags: ["React.js", "Tailwind CSS", "Python", "OpenCV", "MediaPipe", "FFmpeg", "Whisper API"],
        github: "https://github.com/JAYKALSARIYA98/Ai-based-interview-taking-web"
    },
    {
        title: "Campus Pulse: College Event Management System",
        description: "A comprehensive college event management system built with the MERN stack and Tailwind CSS. Features role-based dashboards for Administrator, Event Creator, and Student users, with secure authentication and user account management.",
        image: "campus-pulse.webp",
        tags: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
        github: "https://github.com/JAYKALSARIYA98/CAMPUSPULSE"
    },
    {
        title: "Bolt.New Clone",
        description: "An AI website builder application using LLM APIs for prompt-based design generation, enabling users to create websites through natural language inputs.",
        image: "bolt-new-clone.webp",
        tags: ["React.js", "LLM APIs"],
        github: "https://github.com/JAYKALSARIYA98/Website-builder"
    },
    {
        title: "Cyber Threat Detection System",
        description: "A machine learning-based system achieving 92% accuracy for network attack detection, designed to identify and mitigate cyber threats effectively.",
        image: "cyber-threat-detection.webp",
        tags: ["Python", "Machine Learning"],
        github: "https://github.com/JAYKALSARIYA98/CYBERTHREAT-DETECTION-MODEL"
    },
    {
        title: "School Result Website",
        description: "A responsive web portal for SVGK Sihor developed using the MERN stack, providing students and administrators access to academic results and related functionalities.",
        image: "school-result-website.webp",
        tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
        github: "https://github.com/JAYKALSARIYA98/SCHIOOL-RESULT-WEBSITE"
    }
];

// Custom Cursor
class CustomCursor {
    constructor() {
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

// Initialize Custom Cursor
const cursor = new CustomCursor();

// Populate Projects
function populateProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
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

// Intersection Observer for Fade-in Animation
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

// Fallback: Ensure .about-section is visible
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
function initializeSkillBars() {
    document.querySelectorAll('.skill-bar').forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.setProperty('--circuit-progress', `${level}%`);
    });
}

// Contact Form Handler
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.querySelector('#name').value,
        email: this.querySelector('#email').value,
        message: this.querySelector('#message').value
    };
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    
    // Show success message
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

// Glitch Text Effect
function initGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        const text = glitchText.textContent;
        glitchText.setAttribute('data-text', text);
    }
}

// Scroll Progress Indicator
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight));
    scrollProgress.style.setProperty('--scroll-percent', scrollPercent);
}

window.addEventListener('scroll', updateScrollProgress);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateProjects();
    initializeSkillBars();
    initGlitchEffect();
    updateScrollProgress();
    
    // Remove loading screen if it exists
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
