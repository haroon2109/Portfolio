window.addEventListener('load', () => {
    // Hide Loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        if(loader){
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.visibility = 'hidden';
                loader.style.display = 'none';
            }, 600);
        }
    }, 1200);
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio loaded successfully!");

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections and cards for animation
    document.querySelectorAll('.section, .card, .hero-content, .hero-hey-there').forEach(element => {
        element.classList.add('fade-in-element');
        sectionObserver.observe(element);
    });

    // Custom Cursor Logic
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    // Project Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
            playStaticSound(0.05);
        });
    });

    // Magnetic Buttons Logic
    const magneticEls = document.querySelectorAll('.btn, .contact-btn, .social-icon');
    magneticEls.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0px, 0px)`;
        });
    });

    // Sound Effects (Using Web Audio API for a simple "pop" without needing external assets)
    function playStaticSound(duration) {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration);
    }

    document.querySelectorAll('button, a').forEach(el => {
        el.addEventListener('click', () => playStaticSound(0.1));
    });

    // Active link highlighting for navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        // Special case for home (hero section) which doesn't have a section tag
        if (scrollY < 300) {
            current = 'home';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Project Case Study Modal Data
    const projectData = {
        'agri-ai': {
            title: 'Agri AI',
            img: 'assets/agri-ai.png',
            tags: ['React', 'Node.js', 'FastAPI', 'Docker', 'Machine Learning'],
            desc: 'AgriAI is a professional-grade agricultural platform designed for Tamil Nadu. It features high-impact Neo Brutalist aesthetics with ultra-high contrast for fieldwork. Built on a robust Zero-Cost Architecture with asynchronous workflows.',
            github: 'https://github.com/haroon2109/AgriAI',
            live: 'https://agriai-frontend-57v0.onrender.com/'
        },
        'todo-list': {
            title: 'Pro-Flow To Do List',
            img: 'assets/todo-list.png',
            tags: ['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion'],
            desc: 'A high-performance productivity engine combining the Eisenhower Matrix and Pomodoro Technique. Experience a bold, high-contrast Neo Brutalist workspace optimized for professionals who demand maximum focus.',
            github: 'https://github.com/haroon2109/To-Do-list',
            live: 'https://to-do-list-amber-rho.vercel.app/'
        },
        'wifi-qr': {
            title: 'Wifi QR Pass Generator',
            img: 'assets/wifi-qr.png',
            tags: ['HTML5', 'Vanilla JavaScript', 'Tailwind', 'Client-side processing'],
            desc: 'A modern web application that generates printable WiFi Guest Cards completely client-side. Featuring a bold Neo Brutalist design formatted perfectly for seamless mobile execution and desktop printing.',
            github: 'https://github.com/haroon2109/WIFI-QR-PASS',
            live: 'https://haroon2109.github.io/WIFI-QR-PASS/'
        },
        'artisan-ai': {
            title: 'Artisan AI Art Generator',
            img: 'assets/artisan-ai.png',
            tags: ['Python', 'Streamlit', 'Google Gemini API'],
            desc: 'An immensely powerful user-friendly interface leveraging Google AI studio directly for text-to-image conversion. Artisan AI empowers local and professional artisans alike to rapidly visualize stunning, high-quality creatives to command attention and skyrocket brand authority without demanding a rigorous design background.',
            github: 'https://github.com/haroon2109/Artisan-AI',
            live: 'https://haroon2109.github.io/Artisan-AI/'
        },
        'fras': {
            title: 'Facial Recognition System (FRAS)',
            img: 'assets/fras_vector.png',
            tags: ['Python', 'OpenCV', 'Face_Recognition library'],
            desc: 'A robust biometric automated attendance logging system engineered utilizing core Python webcam interfacing. By distilling complex high-level facial tracking algorithms down to streamlined automated pipelines, the module removes all manual tracking anomalies effortlessly.',
            github: 'https://github.com/haroon2109/Face-Recognition-Attendance-System',
            live: ''
        }
    };

    // Modal interaction logic
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('close-modal');
    
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const key = card.getAttribute('data-project');
            const data = projectData[key];
            if(!data) return;

            document.getElementById('modal-title').textContent = data.title;
            document.getElementById('modal-img').src = data.img;
            document.getElementById('modal-img').alt = data.title;
            document.getElementById('modal-desc').textContent = data.desc;

            const tagsContainer = document.getElementById('modal-tags');
            tagsContainer.innerHTML = '';
            data.tags.forEach(tag => {
                const s = document.createElement('span');
                s.textContent = tag;
                tagsContainer.appendChild(s);
            });

            const btns = document.getElementById('modal-buttons');
            btns.innerHTML = `<a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-black" style="margin-right:10px">Github <i class="fa-brands fa-github"></i></a>`;
            if(data.live) {
                btns.innerHTML += `<a href="${data.live}" target="_blank" rel="noopener noreferrer" class="btn" style="background:var(--text-blue)">Live Demo <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
            }

            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // stop background scroll
        });
    });

    closeBtn?.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; 
    });

    modal?.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });

});
