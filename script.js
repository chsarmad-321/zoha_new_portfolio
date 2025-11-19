// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    // Initialize all components
    initMobileMenu();
    initSmoothScrolling();
    initScrollEffects();
    initFormHandling();
    initBackToTop();
    initAnimations();
    initProjectModals();
    initCVDownload();
    initSkillsAnimation();
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const isActive = navLinks.classList.contains('active');
            this.innerHTML = isActive ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            this.setAttribute('aria-expanded', isActive);
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            if (menuToggle) {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation link
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Update Active Navigation Link
function updateActiveNavLink(targetId) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    
    if (header) {
        window.addEventListener('scroll', function() {
            // Header background on scroll
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Back to top button
            if (backToTop) {
                if (window.scrollY > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }
            
            // Update active section based on scroll position
            updateActiveSection();
        });
    }
}

// Update Active Section Based on Scroll Position
function updateActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
}

// Back to Top Functionality
function initBackToTop() {
    // Check if button already exists
    if (document.querySelector('.back-to-top')) return;
    
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animations on Scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                }
                
                // Special handling for form groups
                if (entry.target.classList.contains('form-group')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.timeline-item, .project-card, .education-card, .form-group').forEach(el => {
        observer.observe(el);
    });
}

// Skills Animation
function initSkillsAnimation() {
    const skillProgresses = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.getAttribute('data-percentage');
                setTimeout(() => {
                    progressBar.style.width = percentage + '%';
                }, 300);
            }
        });
    }, { threshold: 0.5 });
    
    skillProgresses.forEach(progress => {
        observer.observe(progress);
    });
}

// Form Handling
function initFormHandling() {
    const contactForm = document.getElementById('contact-form');
    const messageTextarea = document.getElementById('message');
    const charCounter = document.querySelector('.char-counter');
    
    // Character counter for message textarea
    if (messageTextarea && charCounter) {
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            charCounter.textContent = `${length}/1000 characters`;
            
            if (length > 1000) {
                charCounter.style.color = '#e74c3c';
            } else if (length > 800) {
                charCounter.style.color = '#f39c12';
            } else {
                charCounter.style.color = '#666';
            }
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm()) return;
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                showNotification('Thank you for your message! I will get back to you soon.', 'success');
                
                // Reset form
                this.reset();
                if (charCounter) charCounter.textContent = '0/1000 characters';
                
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Form Validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('form-message');

    if (!name || !email || !subject || !message) {
        showFormMessage('❌ Please fill in all required fields.', 'error');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('❌ Please enter a valid email address.', 'error');
        return false;
    }

    if (message.length < 10) {
        showFormMessage('❌ Please write a message with at least 10 characters.', 'error');
        return false;
    }

    if (message.length > 1000) {
        showFormMessage('❌ Message should not exceed 1000 characters.', 'error');
        return false;
    }
    
    return true;
}

// Show Form Message
function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Project Modals
function initProjectModals() {
    // Create modal container if it doesn't exist
    let modalContainer = document.querySelector('.modal-container');
    if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        document.body.appendChild(modalContainer);
    }
    
    // Add click handlers to project buttons
    document.querySelectorAll('.project-details').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('.project-title').textContent;
            showProjectModal(projectTitle, modalContainer);
        });
    });
    
    // Close modal when clicking outside
    modalContainer.addEventListener('click', function(e) {
        if (e.target === modalContainer) {
            closeModal(modalContainer);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal(modalContainer);
        }
    });
    
    // Close modal with close button
    const closeBtn = modalContainer.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeModal(modalContainer);
        });
    }
}

// Show Project Modal
function showProjectModal(projectTitle, modalContainer) {
    const projectData = {
        'BIS Talb-e-ilam': {
            description: 'A comprehensive Android application for university students integrating academic schedules, assignments, job opportunities, and campus services.',
            features: [
                'Academic schedule management',
                'Assignment tracking and submission',
                'Job and internship portal',
                'Campus news and announcements',
                'Student profile management',
                'Real-time notifications'
            ],
            technologies: ['Android Studio', 'Java', 'Firebase', 'XML', 'REST APIs'],
            github: '#',
            demo: '#'
        },
        'Student Management System': {
            description: 'A comprehensive web-based system for managing student records, courses, and grades with different user roles and secure authentication.',
            features: [
                'Student registration and profile management',
                'Course enrollment system',
                'Grade tracking and reporting',
                'Admin dashboard for management',
                'Secure user authentication',
                'Role-based access control'
            ],
            technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase', 'REST API'],
            github: '#',
            demo: '#'
        },
        'E-Commerce Website': {
            description: 'A basic version of an online store with product listings, shopping cart functionality, and user authentication system.',
            features: [
                'Product catalog with categories',
                'Shopping cart functionality',
                'User registration and authentication',
                'Order management system',
                'Product search and filtering',
                'Responsive design for all devices'
            ],
            technologies: ['HTML', 'CSS', 'JavaScript', 'Payment Gateway', 'Responsive Design'],
            github: '#',
            demo: '#'
        },
        'Calculator in C++': {
            description: 'A fully functional calculator application developed in C++ with support for basic arithmetic operations and advanced mathematical functions.',
            features: [
                'Basic arithmetic operations (+, -, *, /)',
                'Advanced mathematical functions',
                'Memory operations (MC, MR, M+, M-)',
                'Error handling and validation',
                'User-friendly interface',
                'Keyboard support'
            ],
            technologies: ['C++', 'Algorithms', 'Data Structures'],
            github: '#',
            demo: '#'
        }
    };
    
    const project = projectData[projectTitle];
    if (!project) return;
    
    modalContainer.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            
            <h2 style="color: var(--secondary); margin-bottom: 20px;">${projectTitle}</h2>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: var(--primary); margin-bottom: 10px;">Description</h3>
                <p>${project.description}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: var(--primary); margin-bottom: 10px;">Key Features</h3>
                <ul style="padding-left: 20px;">
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h3 style="color: var(--primary); margin-bottom: 10px;">Technologies Used</h3>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div class="project-links">
                <a href="${project.github}" class="btn" target="_blank">
                    <i class="fab fa-github"></i> View Code
                </a>
                <a href="${project.demo}" class="btn btn-outline" target="_blank">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            </div>
        </div>
    `;
    
    modalContainer.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add close button functionality
    modalContainer.querySelector('.modal-close').addEventListener('click', () => {
        closeModal(modalContainer);
    });
}

// Close Modal
function closeModal(modalContainer) {
    modalContainer.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// CV Download Functionality
function initCVDownload() {
    const downloadBtn = document.querySelector('.btn-download-cv');
    const previewBtn = document.querySelector('.btn-preview-cv');
    const printBtn = document.querySelector('.btn-print-cv');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadCV();
        });
    }
    
    if (previewBtn) {
        previewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            previewCV();
        });
    }
    
    if (printBtn) {
        printBtn.addEventListener('click', function(e) {
            e.preventDefault();
            printCV();
        });
    }
}

// Download CV as PDF
function downloadCV() {
    showNotification('Preparing your CV for download...', 'info');
    
    // Simulate download process
    setTimeout(() => {
        // Create a temporary link for download
        const link = document.createElement('a');
        link.href = 'assets/documents/Zoha Resume .pdf'; // UPDATE THIS FILENAME
        link.download = 'Zoha_Hashmi_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('CV downloaded successfully!', 'success');
    }, 2000);
}

// Preview CV in Modal
function previewCV() {
    const cvModal = document.querySelector('.cv-modal');
    const cvPreview = document.querySelector('.cv-preview');
    
    if (!cvModal || !cvPreview) return;
    
    // Populate CV preview content
    cvPreview.innerHTML = `
        <div class="cv-preview-section">
            <h3>Personal Information</h3>
            <div class="cv-preview-item">
                <strong>Name:</strong> Zoha Hashmi<br>
                <strong>Email:</strong> zohahashmi993@gmail.com<br>
                <strong>Phone:</strong> 03196091663 / 03241161291<br>
                <strong>Address:</strong> Wapda Colony Pull Bazar Sahiwal
            </div>
        </div>
        
        <div class="cv-preview-section">
            <h3>Professional Summary</h3>
            <div class="cv-preview-item">
                <p>Dynamic Android Developer with a strong foundation in teamwork and collaboration. 
                Demonstrates innovative thinking and effective communication skills with expertise in 
                Android Studio, Java, Firebase, and UI/UX design. Committed to continuous improvement 
                and driving technological advancements.</p>
            </div>
        </div>
        
        <div class="cv-preview-section">
            <h3>Education</h3>
            <div class="cv-preview-item">
                <h4>Bachelor of Computer Science</h4>
                <div class="date">2021 - 2025 (Expected)</div>
                <p>PMAS-Arid Agriculture University Sahiwal<br>
                CGPA: 3.54/4.00</p>
            </div>
            <div class="cv-preview-item">
                <h4>Intermediate (F.Sc. Pre-Engineering)</h4>
                <div class="date">2019 - 2021</div>
                <p>Punjab College, Sahiwal</p>
            </div>
            <div class="cv-preview-item">
                <h4>Matriculation (Science Group)</h4>
                <div class="date">2017 - 2019</div>
                <p>Allied School, Sahiwal</p>
            </div>
        </div>
        
        <div class="cv-preview-section">
            <h3>Work Experience</h3>
            <div class="cv-preview-item">
                <h4>Intern</h4>
                <div class="date">Present</div>
                <p>Arid Agriculture University</p>
                <ul>
                    <li>Greet and assist visitors, clients, and staff professionally</li>
                    <li>Manage incoming calls, emails, and appointments effectively</li>
                    <li>Maintain front desk records and ensure proper documentation</li>
                    <li>Support administrative tasks including data entry and file management</li>
                </ul>
            </div>
            <div class="cv-preview-item">
                <h4>Android Development Intern</h4>
                <div class="date">3 Months</div>
                <p>Suffa Tech</p>
                <ul>
                    <li>Assisted in designing and developing Android applications using Android Studio</li>
                    <li>Worked on integrating Firebase for authentication and real-time database management</li>
                    <li>Collaborated with senior developers to debug and test applications</li>
                    <li>Gained hands-on experience in front-end mobile UI development</li>
                </ul>
            </div>
            <div class="cv-preview-item">
                <h4>Teaching</h4>
                <div class="date">3 Months</div>
                <p>Govt MC12</p>
                <ul>
                    <li>Taught Computer and Urdu to students for 3 months</li>
                    <li>Assisted in preparing lesson plans and conducting classroom activities</li>
                    <li>Focused on building student understanding through interactive learning methods</li>
                    <li>Maintained class discipline and effective communication with students</li>
                </ul>
            </div>
        </div>
        
        <div class="cv-preview-section">
            <h3>Technical Skills</h3>
            <div class="cv-preview-item">
                <strong>Programming Languages:</strong> Java, C++, JavaScript<br>
                <strong>Mobile Development:</strong> Android Studio, Firebase, XML, UI/UX Design<br>
                <strong>Web Technologies:</strong> HTML, CSS, REST APIs<br>
                <strong>Databases:</strong> Firebase Realtime Database, Firestore<br>
                <strong>Tools:</strong> Git, Microsoft Office Suite, Canva, Draw.io<br>
                <strong>Platforms:</strong> Windows, Android
            </div>
        </div>
        
        <div class="cv-preview-section">
            <h3>Projects</h3>
            <div class="cv-preview-item">
                <h4>BIS Talb-e-ilam</h4>
                <p>Final Year Project - Comprehensive Android application for university students 
                integrating academic schedules, assignments, job opportunities, and campus services.</p>
                <strong>Technologies:</strong> Android Studio, Java, Firebase, XML
            </div>
            <div class="cv-preview-item">
                <h4>Student Management System</h4>
                <p>Web-based system for managing student records, courses, and grades with 
                different user roles and secure authentication.</p>
                <strong>Technologies:</strong> HTML, CSS, JavaScript, Firebase
            </div>
            <div class="cv-preview-item">
                <h4>E-Commerce Website</h4>
                <p>Basic version of an online store with product listings, shopping cart 
                functionality, and user authentication system.</p>
                <strong>Technologies:</strong> HTML, CSS, JavaScript, Payment Gateway
            </div>
            <div class="cv-preview-item">
                <h4>Calculator in C++</h4>
                <p>Fully functional calculator application with support for basic arithmetic 
                operations and advanced mathematical functions.</p>
                <strong>Technologies:</strong> C++, Algorithms
            </div>
        </div>
        
        <div class="cv-preview-section">
            <h3>Certifications</h3>
            <ul>
                <li>Android Development Certification</li>
                <li>Creative Writing Certification</li>
                <li>Communication Skills Certification</li>
                <li>Presentation Skills Certification</li>
                <li>Teaching Certification</li>
            </ul>
        </div>
    `;
    
    cvModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add event listeners for modal buttons
    const closeBtn = cvModal.querySelector('.cv-modal-close');
    const closeModalBtn = cvModal.querySelector('.btn-close-cv-modal');
    const downloadModalBtn = cvModal.querySelector('.btn-download-cv-modal');
    const printModalBtn = cvModal.querySelector('.btn-print-cv-modal');
    
    if (closeBtn) closeBtn.addEventListener('click', closeCVModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeCVModal);
    if (downloadModalBtn) downloadModalBtn.addEventListener('click', downloadCV);
    if (printModalBtn) printModalBtn.addEventListener('click', printCV);
    
    // Close modal when clicking outside
    cvModal.addEventListener('click', function(e) {
        if (e.target === cvModal) {
            closeCVModal();
        }
    });
}

// Close CV Modal
function closeCVModal() {
    const cvModal = document.querySelector('.cv-modal');
    if (cvModal) {
        cvModal.classList.remove('active');
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Print CV
function printCV() {
    showNotification('Opening print dialog...', 'info');
    
    // Create a print-friendly version
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Zoha Hashmi - CV</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                h1, h2, h3 {
                    color: #2c3e50;
                }
                h1 {
                    border-bottom: 3px solid #3498db;
                    padding-bottom: 10px;
                }
                h2 {
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 5px;
                    margin-top: 30px;
                }
                .section {
                    margin-bottom: 25px;
                }
                .item {
                    margin-bottom: 15px;
                }
                .date {
                    color: #666;
                    font-style: italic;
                }
                ul {
                    padding-left: 20px;
                }
                li {
                    margin-bottom: 5px;
                }
                .contact-info {
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                @media print {
                    body { font-size: 12pt; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <h1>Zoha Hashmi</h1>
            
            <div class="contact-info">
                <strong>Email:</strong> zohahashmi993@gmail.com | 
                <strong>Phone:</strong> 03196091663 / 03241161291 | 
                <strong>Location:</strong> Wapda Colony Pull Bazar Sahiwal
            </div>
            
            <div class="section">
                <h2>Professional Summary</h2>
                <p>Dynamic Android Developer with a strong foundation in teamwork and collaboration. 
                Demonstrates innovative thinking and effective communication skills with expertise in 
                Android Studio, Java, Firebase, and UI/UX design. Committed to continuous improvement 
                and driving technological advancements.</p>
            </div>
            
            <div class="section">
                <h2>Education</h2>
                <div class="item">
                    <h3>Bachelor of Computer Science</h3>
                    <div class="date">2021 - 2025 (Expected)</div>
                    <p>PMAS-Arid Agriculture University Sahiwal<br>
                    CGPA: 3.54/4.00</p>
                </div>
                <div class="item">
                    <h3>Intermediate (F.Sc. Pre-Engineering)</h3>
                    <div class="date">2019 - 2021</div>
                    <p>Punjab College, Sahiwal</p>
                </div>
                <div class="item">
                    <h3>Matriculation (Science Group)</h3>
                    <div class="date">2017 - 2019</div>
                    <p>Allied School, Sahiwal</p>
                </div>
            </div>
            
            <div class="section">
                <h2>Work Experience</h2>
                <div class="item">
                    <h3>Intern</h3>
                    <div class="date">Present</div>
                    <p><strong>Arid Agriculture University</strong></p>
                    <ul>
                        <li>Greet and assist visitors, clients, and staff professionally</li>
                        <li>Manage incoming calls, emails, and appointments effectively</li>
                        <li>Maintain front desk records and ensure proper documentation</li>
                        <li>Support administrative tasks including data entry and file management</li>
                    </ul>
                </div>
                <div class="item">
                    <h3>Android Development Intern</h3>
                    <div class="date">3 Months</div>
                    <p><strong>Suffa Tech</strong></p>
                    <ul>
                        <li>Assisted in designing and developing Android applications using Android Studio</li>
                        <li>Worked on integrating Firebase for authentication and real-time database management</li>
                        <li>Collaborated with senior developers to debug and test applications</li>
                        <li>Gained hands-on experience in front-end mobile UI development</li>
                    </ul>
                </div>
                <div class="item">
                    <h3>Teaching</h3>
                    <div class="date">3 Months</div>
                    <p><strong>Govt MC12</strong></p>
                    <ul>
                        <li>Taught Computer and Urdu to students for 3 months</li>
                        <li>Assisted in preparing lesson plans and conducting classroom activities</li>
                        <li>Focused on building student understanding through interactive learning methods</li>
                        <li>Maintained class discipline and effective communication with students</li>
                    </ul>
                </div>
            </div>
            
            <div class="section">
                <h2>Technical Skills</h2>
                <div class="item">
                    <strong>Programming Languages:</strong> Java, C++, JavaScript<br>
                    <strong>Mobile Development:</strong> Android Studio, Firebase, XML, UI/UX Design<br>
                    <strong>Web Technologies:</strong> HTML, CSS, REST APIs<br>
                    <strong>Databases:</strong> Firebase Realtime Database, Firestore<br>
                    <strong>Tools:</strong> Git, Microsoft Office Suite, Canva, Draw.io<br>
                    <strong>Platforms:</strong> Windows, Android
                </div>
            </div>
            
            <div class="section">
                <h2>Projects</h2>
                <div class="item">
                    <h3>BIS Talb-e-ilam</h3>
                    <p>Final Year Project - Comprehensive Android application for university students 
                    integrating academic schedules, assignments, job opportunities, and campus services.</p>
                    <strong>Technologies:</strong> Android Studio, Java, Firebase, XML
                </div>
                <div class="item">
                    <h3>Student Management System</h3>
                    <p>Web-based system for managing student records, courses, and grades with 
                    different user roles and secure authentication.</p>
                    <strong>Technologies:</strong> HTML, CSS, JavaScript, Firebase
                </div>
                <div class="item">
                    <h3>E-Commerce Website</h3>
                    <p>Basic version of an online store with product listings, shopping cart 
                    functionality, and user authentication system.</p>
                    <strong>Technologies:</strong> HTML, CSS, JavaScript, Payment Gateway
                </div>
                <div class="item">
                    <h3>Calculator in C++</h3>
                    <p>Fully functional calculator application with support for basic arithmetic 
                    operations and advanced mathematical functions.</p>
                    <strong>Technologies:</strong> C++, Algorithms
                </div>
            </div>
            
            <div class="section">
                <h2>Certifications</h2>
                <ul>
                    <li>Android Development Certification</li>
                    <li>Creative Writing Certification</li>
                    <li>Communication Skills Certification</li>
                    <li>Presentation Skills Certification</li>
                    <li>Teaching Certification</li>
                </ul>
            </div>
            
            <div class="section no-print">
                <p><em>Generated from online portfolio</em></p>
            </div>
            
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(function() {
                        window.close();
                    }, 1000);
                };
            </script>
        </body>
        </html>
    `);
    
    printWindow.document.close();
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect when hero section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(heroTitle);
}

// Initialize when page loads
window.addEventListener('load', function() {
    // Add loaded class for any post-load animations
    document.body.classList.add('loaded');
    
    // Initialize typing effect
    initTypingEffect();
});
// Contact Form with Google Sheets Integration
function initContactForm() {
    // === CONFIGURATION ===
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzm2frrr6SaY1ekx6nLYguT5OPC5IkrcDeccKVauFcfkhTN9LxKTZ7wvLb4mzitKbWN_Q/exec'; // ← REPLACE THIS
    
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const charCounter = document.querySelector('.char-counter');
    const messageTextarea = document.getElementById('message');

    // Character counter
    if (messageTextarea && charCounter) {
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            charCounter.textContent = `${length}/1000 characters`;

            if (length > 1000) {
                charCounter.style.color = '#e74c3c';
            } else if (length > 800) {
                charCounter.style.color = '#f39c12';
            } else {
                charCounter.style.color = '#666';
            }
        });
    }

    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate form
        if (!validateForm()) return;

        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalBtnHTML = submitBtn.innerHTML;
        
        // Show loading state
        showLoadingState(submitBtn, 'Sending...');

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toISOString()
        };

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Network error: ${response.status}`);
            }

            const result = await response.json();

            if (result.result === 'success') {
                showFormMessage('✅ Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                if (charCounter) {
                    charCounter.textContent = '0/1000 characters';
                    charCounter.style.color = '#666';
                }
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
           // showFormMessage('❌ Error sending message. Please try again or email me directly at zohahashmi993@gmail.com', 'error');
        } finally {
            resetButtonState(submitBtn, originalBtnHTML);
        }
    });

    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            showFormMessage('❌ Please fill in all required fields.', 'error');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('❌ Please enter a valid email address.', 'error');
            return false;
        }

        if (message.length < 10) {
            showFormMessage('❌ Please write a message with at least 10 characters.', 'error');
            return false;
        }

        if (message.length > 1000) {
            showFormMessage('❌ Message should not exceed 1000 characters.', 'error');
            return false;
        }
        
        return true;
    }

    function showLoadingState(button, text) {
        button.innerHTML = `<span class="loading"></span> ${text}`;
        button.disabled = true;
    }

    function resetButtonState(button, originalHTML) {
        button.innerHTML = originalHTML;
        button.disabled = false;
    }

    function showFormMessage(message, type) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// Update your initializeApp function
function initializeApp() {
    initMobileMenu();
    initSmoothScrolling();
    initScrollEffects();
    initFormHandling(); // Remove this if you have it
    initContactForm(); // Add this instead
    initBackToTop();
    initAnimations();
    initProjectModals();
    initCVDownload();
    initSkillsAnimation();
}