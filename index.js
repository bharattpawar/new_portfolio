document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);

    // Initialize particles
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#6e57e0'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6e57e0',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // Theme toggle functionality
    const themeToggles = document.querySelectorAll('.toggle-btn');
    const body = document.body;
    
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);
    
    // Update all toggle buttons
    themeToggles.forEach(toggle => {
        toggle.classList.toggle('dark', currentTheme === 'light');
    });
    
    // Add event listeners to all toggle buttons
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            
            // Update all toggle buttons
            themeToggles.forEach(t => {
                t.classList.toggle('dark', newTheme === 'light');
            });
            
            localStorage.setItem('theme', newTheme);
        });
    });

    // Scroll progress bar
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const hamMenu = document.querySelector('.ham-menu');
    const offScreenMenu = document.querySelector('.off-screen-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.querySelector('.back-to-top');
    
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (offScreenMenu.classList.contains('active')) {
                    hamMenu.classList.remove('active');
                    offScreenMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Hamburger menu toggle
    hamMenu.addEventListener('click', () => {
        hamMenu.classList.toggle('active');
        offScreenMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (offScreenMenu.classList.contains('active')) {
                hamMenu.classList.remove('active');
                offScreenMenu.classList.remove('active');
            }
        });
    });
    
    // Close mobile menu when clicking close button
    const menuCloseBtn = document.querySelector('.menu-close-btn');
    if (menuCloseBtn) {
        menuCloseBtn.addEventListener('click', () => {
            hamMenu.classList.remove('active');
            offScreenMenu.classList.remove('active');
        });
    }
    
    // Create blur overlay element
    const blurOverlay = document.createElement('div');
    blurOverlay.classList.add('navbar-blur-overlay');
    document.body.appendChild(blurOverlay);
    
    // Variables for navbar auto-hide
    let lastScrollY = 0;
    let ticking = false;
    
    // Navbar scroll effect with enhanced blur and auto-hide
    const updateNavbar = () => {
        const scrollY = window.scrollY;
        const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
        
        // Auto-hide navbar logic
        if (scrollY > 100) { // Start hiding after 100px
            if (scrollDirection === 'down' && scrollY > lastScrollY + 5) {
                // Scrolling down - hide navbar
                navbar.classList.add('navbar-hidden');
            } else if (scrollDirection === 'up' && scrollY < lastScrollY - 5) {
                // Scrolling up - show navbar
                navbar.classList.remove('navbar-hidden');
            }
        } else {
            // Always show navbar at top of page
            navbar.classList.remove('navbar-hidden');
        }
        
        // Existing blur and styling effects
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
            blurOverlay.classList.add('active');
            
            // Add dynamic blur based on scroll position
            const blurAmount = Math.min(20 + (scrollY / 15), 60);
            navbar.style.backdropFilter = `blur(${blurAmount}px)`;
            navbar.style.webkitBackdropFilter = `blur(${blurAmount}px)`;
            
            // Enhanced background opacity based on scroll
            const opacity = Math.min(0.1 + (scrollY / 2000), 0.3);
            const currentTheme = body.getAttribute('data-theme');
            
            if (currentTheme === 'light') {
                navbar.style.backgroundColor = `rgba(255, 255, 255, ${opacity + 0.8})`;
            } else {
                navbar.style.backgroundColor = `rgba(15, 15, 15, ${opacity})`;
            }
        } else {
            navbar.classList.remove('scrolled');
            blurOverlay.classList.remove('active');
            navbar.style.backdropFilter = 'blur(0px)';
            navbar.style.webkitBackdropFilter = 'blur(0px)';
            navbar.style.backgroundColor = 'transparent';
        }
        
        // Back to top button
        if (scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
        
        lastScrollY = scrollY;
        ticking = false;
    };
    
    // Optimized scroll listener with requestAnimationFrame
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Back to top button
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
            }
        });
    };
    
    // Initialize animation on load
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    };
    
    // Check if skills section is in view
    const skillsSection = document.querySelector('.about-section');
    
    const checkSkillsInView = () => {
        const sectionPosition = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionPosition < windowHeight - 200) {
            animateSkillBars();
            window.removeEventListener('scroll', checkSkillsInView);
        }
    };
    
    window.addEventListener('scroll', checkSkillsInView);
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject'); // Added subject
            const message = formData.get('message');
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Typewriter effect for hero text
    const heroText = document.querySelector('.hero-text h1');
    const originalText = heroText.textContent;
    heroText.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
    
    // Particle effect for hero section
    const heroSection = document.querySelector('.hero-section');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        heroSection.appendChild(particle);
    }
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.project-image img').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.project-image img').style.transform = 'scale(1)';
        });
    });
    
    // Add animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const animateTimeline = () => {
        timelineItems.forEach((item) => {
            const itemPosition = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemPosition < windowHeight - 100) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateTimeline);
    animateTimeline(); // Run once on load
});
    // Enhanced skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress-fill');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const proficiency = bar.getAttribute('data-proficiency');
            bar.style.width = proficiency;
            
            // Trigger animation when in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            bar.classList.add('animate');
                        }, 300);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(bar);
        });
    };
    
    animateSkillBars();

    // Add this JavaScript for extra interactivity
    document.querySelectorAll('.skill-logo').forEach(skill => {
        skill.addEventListener('mousemove', (e) => {
            const x = e.pageX - skill.getBoundingClientRect().left;
            const y = e.pageY - skill.getBoundingClientRect().top;
            
            skill.style.setProperty('--mouse-x', `${x}px`);
            skill.style.setProperty('--mouse-y', `${y}px`);
        });
        
        // Add click effect
        skill.addEventListener('click', () => {
            skill.classList.add('clicked');
            setTimeout(() => {
                skill.classList.remove('clicked');
            }, 500);
        });
    });
