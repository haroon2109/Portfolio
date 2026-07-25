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
        'sukoon-ai': {
            title: 'Sukoon AI — Mental Wellness & Support Companion Platform',
            img: 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'600\' height=\'400\' viewBox=\'0 0 600 400\'><rect width=\'100%\' height=\'100%\' fill=\'%23818CF8\'/><text x=\'50%\' y=\'45%\' font-family=\'sans-serif\' font-size=\'36\' fill=\'%23fff\' font-weight=\'900\' text-anchor=\'middle\'>Sukoon AI</text><text x=\'50%\' y=\'60%\' font-family=\'sans-serif\' font-size=\'18\' fill=\'%23fff\' font-weight=\'bold\' text-anchor=\'middle\'>Mental Wellness Companion Platform</text></svg>',
            tags: ['Next.js', 'React', 'Google Gemini API', 'TailwindCSS', 'Wellness AI', 'Vercel'],
            desc: 'Architected Sukoon AI, an empathetic mental wellness platform combining intelligent conversational AI flows with personalized mood tracking and calm, responsive UI design. Deployed live on Vercel with zero latency response pipelines.',
            github: 'https://github.com/haroon2109/Sukoon-AI',
            live: 'https://sukoon-ai-pied.vercel.app/'
        },
        'agri-ai': {
            title: 'Agri AI — Enterprise Voice-Intent Agriculture Platform',
            img: 'assets/agri-ai.png',
            tags: ['React', 'FastAPI', 'Google Gemini API', 'Whisper ASR', 'Docker', 'Asynchronous Queues'],
            desc: 'Engineered a zero-cost enterprise voice-intent agricultural assistant for Tamil Nadu farmers. Reduced voice query latency by 45% over constrained 2G networks by implementing asynchronous FastAPI queue handlers and lightweight audio payload compression. Integrates real-time weather telemetry and AI crop diagnostic pipelines.',
            github: 'https://github.com/haroon2109/AgriAI',
            live: 'https://agriai-frontend-57v0.onrender.com/'
        },
        'kagaz-ai': {
            title: 'Kagaz-AI — Multilingual Document Intelligence & OCR Suite',
            img: 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'600\' height=\'400\' viewBox=\'0 0 600 400\'><rect width=\'100%\' height=\'100%\' fill=\'%2300D1FF\'/><text x=\'50%\' y=\'45%\' font-family=\'sans-serif\' font-size=\'36\' fill=\'%23000\' font-weight=\'900\' text-anchor=\'middle\'>Kagaz-AI</text><text x=\'50%\' y=\'60%\' font-family=\'sans-serif\' font-size=\'18\' fill=\'%23000\' font-weight=\'bold\' text-anchor=\'middle\'>Multi-Document Intelligence Suite</text></svg>',
            tags: ['Python', 'Tesseract OCR', 'LangChain', 'Vector Database', 'FastAPI', 'Multilingual NLU'],
            desc: 'Architected Kagaz-AI, a high-throughput multilingual document extraction and intelligent summarization pipeline. Designed specifically for regional Indian language paperwork workflows, reducing manual document audit times by 4x using hybrid Tesseract OCR preprocessing, dense vector embeddings, and LLM query orchestration.',
            github: 'https://github.com/haroon2109/Kagaz-AI',
            live: ''
        },
        'artisan-ai': {
            title: 'Artisan AI Multimodal Studio',
            img: 'assets/artisan-ai.png',
            tags: ['Python', 'Streamlit', 'Google Gemini Pro Vision', 'Prompt Pipeline'],
            desc: 'Developed a multimodal AI design suite utilizing Google Gemini API for automated marketing banner and copy synthesis. Empowers local artisans to generate publication-ready promotional visual assets in under 5 seconds with zero prior graphic design experience.',
            github: 'https://github.com/haroon2109/Artisan-AI',
            live: 'https://haroon2109.github.io/Artisan-AI/'
        },
        'fras': {
            title: 'Facial Recognition Attendance System (FRAS)',
            img: 'assets/fras_vector.png',
            tags: ['Python', 'OpenCV', 'FaceNet Embeddings', 'Edge Computing'],
            desc: 'Engineered an automated biometric attendance tracking engine leveraging OpenCV spatial frame processing and deep facial vector embeddings. Achieves 98.4% identification accuracy at 30 FPS real-time webcam inference on commodity CPU hardware without cloud dependency.',
            github: 'https://github.com/haroon2109/Face-Recognition-Attendance-System',
            live: ''
        }
    };

    // Modal interaction logic
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('close-modal');
    
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Guard: Do not open modal if user clicked direct action buttons
            if (e.target.closest('.btn-live') || e.target.closest('.btn-github')) {
                return;
            }

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
            btns.innerHTML = `<a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-black" style="margin-right:10px">Github Repository <i class="fa-brands fa-github"></i></a>`;
            if(data.live) {
                btns.innerHTML += `<a href="${data.live}" target="_blank" rel="noopener noreferrer" class="btn" style="background:var(--text-blue)">Live Deployment <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
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
