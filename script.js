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
            title: 'Sukoon AI — The "Stripe for Misinformation"',
            img: 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'600\' height=\'400\' viewBox=\'0 0 600 400\'><rect width=\'100%\' height=\'100%\' fill=\'%23818CF8\'/><text x=\'50%\' y=\'45%\' font-family=\'sans-serif\' font-size=\'36\' fill=\'%23fff\' font-weight=\'900\' text-anchor=\'middle\'>Sukoon AI</text><text x=\'50%\' y=\'60%\' font-family=\'sans-serif\' font-size=\'18\' fill=\'%23fff\' font-weight=\'bold\' text-anchor=\'middle\'>Anti-Misinformation Platform</text></svg>',
            tags: ['Next.js', 'FastAPI', 'Qdrant', 'RAG', 'Celery', 'Gemini 2.5 Flash', 'LangGraph'],
            desc: 'Sukoon AI is an API-first platform that automatically intercepts, verifies, and neutralizes viral misinformation and deepfakes. It uses a specialized RAG pipeline directly indexing authoritative fact-checkers.',
            detailsHTML: `
                <div style="background: #EEF2FF; border: 2px solid #000; box-shadow: 3px 3px 0px #000; padding: 12px 16px; border-radius: 6px; font-weight: 800; font-size: 0.95rem; color: #4338CA; margin-bottom: 20px;">
                    Sukoon AI — The "Stripe for Misinformation"
                </div>

                <h4 style="font-size:1.15rem; font-weight:900; margin-top:20px; margin-bottom:10px; text-transform:uppercase; border-bottom:2px solid #000; padding-bottom:6px;">📌 Project Overview & The Moat</h4>
                <p style="line-height:1.6; margin-bottom:14px;"><strong>Sukoon AI is an API-first platform that automatically intercepts, verifies, and neutralizes viral misinformation, deepfakes, and hate speech.</strong> We provide the "Stripe for Misinformation"—equipping social platforms (Meta, X, WhatsApp) and massive Newsrooms with a localized, legally defensible RAG verification engine.</p>
                <p style="line-height:1.6; margin-bottom:20px;">Unlike generic LLMs that hallucinate, Sukoon AI is anchored by a specialized RAG pipeline directly indexing authoritative Indian fact-checkers like <strong>PIB Fact Check</strong>, <strong>Alt News</strong>, and <strong>BOOM Live</strong>. By performing a semantic vector search against locally verified facts first via a hosted Qdrant database, we instantly retrieve debunked claims in milliseconds, saving massive token costs and preventing contradictory advice.</p>

                <h4 style="font-size:1.15rem; font-weight:900; margin-top:24px; margin-bottom:12px; text-transform:uppercase; border-bottom:2px solid #000; padding-bottom:6px;">🧠 Explainable AI (XAI) Architecture</h4>
                <ul style="list-style:none; padding:0; margin:0 0 24px 0; display:grid; gap:10px;">
                    <li style="background:#F8F9FA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:12px 16px; border-radius:6px; font-size:0.92rem;">
                        <strong style="color:#EF4444;">🛡️ Toxicity Scan:</strong> Confirms the incoming claim doesn't violate safety guardrails (Perspective API / ShieldGemma).
                    </li>
                    <li style="background:#F8F9FA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:12px 16px; border-radius:6px; font-size:0.92rem;">
                        <strong style="color:#3B82F6;">🔍 Fact Grounding:</strong> Highlights exactly which trusted database entries contradicted the claim (Qdrant Vector Search).
                    </li>
                    <li style="background:#F8F9FA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:12px 16px; border-radius:6px; font-size:0.92rem;">
                        <strong style="color:#F59E0B;">📊 Confidence Gauge:</strong> A visual percentage indicating how certain the model is based on cross-referencing (Gemini JSON).
                    </li>
                    <li style="background:#F8F9FA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:12px 16px; border-radius:6px; font-size:0.92rem;">
                        <strong style="color:#10B981;">📝 Verification Trace:</strong> A structured, natural language breakdown of the AI's logical reasoning steps.
                    </li>
                </ul>

                <h4 style="font-size:1.15rem; font-weight:900; margin-top:24px; margin-bottom:12px; text-transform:uppercase; border-bottom:2px solid #000; padding-bottom:6px;">🏗️ Architecture & Orchestration</h4>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:20px;">
                    <div style="background:#FAFAFA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:14px; border-radius:6px;">
                        <h5 style="font-weight:900; font-size:0.95rem; margin-bottom:8px; color:#4338CA;">🤖 Multi-Agent Ecosystem</h5>
                        <ul style="margin:0; padding-left:18px; font-size:0.88rem; line-height:1.6;">
                            <li><strong>Google ADK & MCP</strong>: Open-source runtime execution and universal dataset protocols.</li>
                            <li><strong>LangGraph</strong>: Stateful agent orchestration for complex multi-turn forensic analysis.</li>
                            <li><strong>Langfuse</strong>: Enterprise-grade telemetry, mapping execution traces and cost analytics.</li>
                            <li><strong>Prism & Agent Memory Guard</strong>: Autonomous firewall against prompt injections.</li>
                        </ul>
                    </div>
                    <div style="background:#FAFAFA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:14px; border-radius:6px;">
                        <h5 style="font-weight:900; font-size:0.95rem; margin-bottom:8px; color:#D946EF;">⚙️ Core Infrastructure</h5>
                        <ul style="margin:0; padding-left:18px; font-size:0.88rem; line-height:1.6;">
                            <li><strong>Gemini 2.5 Flash</strong>: Verification truth engine strictly constrained by Pydantic JSON schemas.</li>
                            <li><strong>Supabase & pgvector</strong>: Open-source PostgreSQL RAG memory bank.</li>
                            <li><strong>Playwright & BS4</strong>: Hybrid scraping stack for dynamic/static content rendering.</li>
                            <li><strong>Celery & SQLite</strong>: Localized task queue for highly efficient async processing on Cloud Run.</li>
                        </ul>
                    </div>
                </div>

                <h4 style="font-size:1.15rem; font-weight:900; margin-top:24px; margin-bottom:12px; text-transform:uppercase; border-bottom:2px solid #000; padding-bottom:6px;">🔄 Agentic Verification Loop</h4>
                <div style="background:#000; color:#00D1FF; padding:16px; border-radius:6px; font-family:monospace; font-size:0.85rem; line-height:1.7; overflow-x:auto; margin-bottom:24px; border:2px solid #000; box-shadow:4px 4px 0px #FFD100; white-space:pre;">
                 User
                  │
      ┌───────────┴───────────┐
      │ Text │ URL │ Image │ Video
      └───────────┬───────────┘
                  │
          FastAPI Backend
                  │
        Content Extraction Layer
                  │
 ┌───────────────┼────────────────┐
 │               │                │
OCR           Speech         Metadata
 │               │                │
 └───────────────┼────────────────┘
                 │
      Claim Extraction Model
                 │
        Evidence Retrieval
                 │
     Fact Verification Engine
                 │
 Confidence + Reasoning
                 │
     AI Explanation Generator
                 │
          Frontend Result
                </div>

                <h4 style="font-size:1.15rem; font-weight:900; margin-top:24px; margin-bottom:12px; text-transform:uppercase; border-bottom:2px solid #000; padding-bottom:6px;">💻 Tech Stack & Design Philosophy</h4>
                <p style="line-height:1.6; margin-bottom:14px;"><strong>Frontend:</strong> Next.js 15 (App Router), React, Tailwind CSS, ShadCN, Framer Motion<br>
                <strong>Backend API:</strong> FastAPI, WebSockets<br>
                <strong>Async Processing & DB:</strong> Celery, Redis, PostgreSQL, Qdrant</p>
                <p style="line-height:1.6; margin-bottom:14px;"><strong>"Clinical & Calm" UI:</strong> Sukoon AI deals with high-anxiety viral content. The UI entirely avoids bright "startup" colors in favor of muted earth tones, deep navy, and clinical teal to instantly de-escalate emotional states.</p>

                <div style="background:#000; color:#00D1FF; padding:16px; border-radius:6px; font-family:monospace; font-size:0.85rem; line-height:1.7; overflow-x:auto; margin-bottom:14px; border:2px solid #000; box-shadow:4px 4px 0px #FFD100;">
                    # Running the MVP Locally<br>
                    $ cd backend<br>
                    $ uvicorn app.main:app --reload --port 8000<br>
                    <br>
                    $ cd frontend<br>
                    $ npm run dev
                </div>
            `,
            github: 'https://github.com/haroon2109/Sukoon-AI',
            live: 'https://sukoon-ai-pied.vercel.app/'
        },
        'relief-grid': {
            title: 'ReliefGrid — Precision Logistics for Crisis Coordination & Disaster Response',
            img: 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'600\' height=\'400\' viewBox=\'0 0 600 400\'><rect width=\'100%\' height=\'100%\' fill=\'%23FF60B5\'/><text x=\'50%\' y=\'45%\' font-family=\'sans-serif\' font-size=\'36\' fill=\'%23fff\' font-weight=\'900\' text-anchor=\'middle\'>ReliefGrid</text><text x=\'50%\' y=\'60%\' font-family=\'sans-serif\' font-size=\'18\' fill=\'%23fff\' font-weight=\'bold\' text-anchor=\'middle\'>Disaster Relief Spatial Mapping</text></svg>',
            tags: ['React', 'Firebase', 'Gemini AI', 'Leaflet', 'Express.ts', 'Tailwind CSS'],
            desc: 'An AI-powered logistics and resource allocation platform designed for Indian NGOs to optimize crisis response. Leverages Google Gemini AI for real-time supply-demand mapping.',
            detailsHTML: `
                <div style="background: #FDF2F8; border: 2px solid #000; box-shadow: 3px 3px 0px #000; padding: 12px 16px; border-radius: 6px; font-weight: 800; font-size: 0.95rem; color: #BE185D; margin-bottom: 20px;">
                    ReliefGRID 🌐 — Precision Logistics for Crisis Coordination & Disaster Response
                </div>

                <h4 style="font-size:1.15rem; font-weight:900; margin-top:20px; margin-bottom:10px; text-transform:uppercase; border-bottom:2px solid #000; padding-bottom:6px;">📌 Project Overview & The "Why"</h4>
                <p style="line-height:1.6; margin-bottom:14px;"><strong>An AI-powered logistics and resource allocation platform designed for Indian NGOs to optimize crisis response.</strong> ReliefGRID is an intelligence-driven logistics platform designed to bridge the gap between donors, NGOs, and ground-level field operations.</p>
                <p style="line-height:1.6; margin-bottom:20px;">In the chaos of a disaster, data fragmentation is the greatest barrier to aid. Traditional disaster relief often suffers from overlapping efforts and "dark spots" where aid never reaches. ReliefGRID solves this by automating the ingestion of field intel and providing real-time geospatial visualization of demand saturation.</p>

                <h4 style="font-size:1.15rem; font-weight:900; margin-top:24px; margin-bottom:12px; text-transform:uppercase; border-bottom:2px solid #000; padding-bottom:6px;">🛠️ The "What": Core Capabilities</h4>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:24px;">
                    <div style="background:#F8F9FA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:14px; border-radius:6px;">
                        <h5 style="font-weight:900; font-size:0.95rem; margin-bottom:8px; color:#DB2777;">🎙️ Multimodal Intel Ingestion</h5>
                        <p style="font-size:0.88rem; line-height:1.5; margin-bottom:0;">Uses advanced NLP to extract actionable data (e.g., "5 boxes of water needed") from unstructured inputs like Voice notes (Tamil), paper surveys via OCR, and WhatsApp messages.</p>
                    </div>
                    <div style="background:#F8F9FA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:14px; border-radius:6px;">
                        <h5 style="font-weight:900; font-size:0.95rem; margin-bottom:8px; color:#2563EB;">🧠 Smart Matching & Deduplication</h5>
                        <p style="font-size:0.88rem; line-height:1.5; margin-bottom:0;">The "Brain" automatically deduplicates aid requests within a 500m radius and scores them based on urgency, preventing resource waste.</p>
                    </div>
                    <div style="background:#F8F9FA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:14px; border-radius:6px;">
                        <h5 style="font-weight:900; font-size:0.95rem; margin-bottom:8px; color:#059669;">🗺️ Geospatial Demand Center</h5>
                        <p style="font-size:0.88rem; line-height:1.5; margin-bottom:0;">A high-precision Leaflet-based command center featuring Proximity Heatmaps, Dispatch Tracker for drones/trucks, and Live Resource Pins.</p>
                    </div>
                    <div style="background:#F8F9FA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:14px; border-radius:6px;">
                        <h5 style="font-weight:900; font-size:0.95rem; margin-bottom:8px; color:#D97706;">⛓️ Transparent Impact Ledger</h5>
                        <p style="font-size:0.88rem; line-height:1.5; margin-bottom:0;">Every delivery is logged to an immutable ledger using a QR Handshake between drivers and volunteers, providing a cryptographic audit for donors.</p>
                    </div>
                </div>

                <h4 style="font-size:1.15rem; font-weight:900; margin-top:24px; margin-bottom:12px; text-transform:uppercase; border-bottom:2px solid #000; padding-bottom:6px;">🚀 Technology Stack</h4>
                <ul style="list-style:none; padding:0; margin:0 0 24px 0; display:grid; gap:10px;">
                    <li style="background:#FAFAFA; border:2px solid #000; padding:10px 14px; border-radius:6px; font-size:0.92rem;">
                        <strong>Frontend:</strong> React 19, Vite, Tailwind CSS, Framer Motion
                    </li>
                    <li style="background:#FAFAFA; border:2px solid #000; padding:10px 14px; border-radius:6px; font-size:0.92rem;">
                        <strong>Maps & Backend:</strong> Leaflet.js, React-Leaflet, Express.ts, TSX
                    </li>
                    <li style="background:#FAFAFA; border:2px solid #000; padding:10px 14px; border-radius:6px; font-size:0.92rem;">
                        <strong>Database & Auth:</strong> Firebase Firestore, Firebase Authentication
                    </li>
                    <li style="background:#FAFAFA; border:2px solid #000; padding:10px 14px; border-radius:6px; font-size:0.92rem;">
                        <strong>AI/Intelligence:</strong> Gemini 1.5 Flash (Extracting structured data from multimodal inputs)
                    </li>
                </ul>

                <h4 style="font-size:1.15rem; font-weight:900; margin-top:24px; margin-bottom:12px; text-transform:uppercase; border-bottom:2px solid #000; padding-bottom:6px;">💻 Local Development</h4>
                <div style="background:#000; color:#00D1FF; padding:16px; border-radius:6px; font-family:monospace; font-size:0.85rem; line-height:1.7; overflow-x:auto; margin-bottom:24px; border:2px solid #000; box-shadow:4px 4px 0px #FFD100;">
                    $ npm install<br>
                    <br>
                    # Environment Configuration (.env):<br>
                    VITE_FIREBASE_API_KEY=your_key<br>
                    VITE_GEMINI_API_KEY=your_key<br>
                    VITE_GOOGLE_MAPS_API_KEY=your_key<br>
                    <br>
                    $ npm run dev
                </div>

                <div style="text-align: center; font-size: 0.95rem; color: #4B5563; border-top: 1px dashed #D1D5DB; padding-top: 16px; margin-top: 20px;">
                    <strong>👥 Proudly built for the smart logistics community by:</strong><br>
                    Mohammed Absal, Madhavan & Haroon
                </div>
            `,
            github: 'https://github.com/haroon2109/ReliefGrid',
            live: ''
        },
        'agri-ai': {
            title: 'Agri AI — Enterprise Voice-Intent Agriculture Platform',
            img: 'assets/agri-ai.png',
            tags: ['React', 'FastAPI', 'Google Gemini API', 'Whisper ASR', 'Docker', 'Asynchronous Queues'],
            desc: 'Engineered a zero-cost enterprise voice-intent agricultural assistant for Tamil Nadu farmers. Reduced voice query latency by 45% over constrained 2G networks by implementing asynchronous FastAPI queue handlers and lightweight audio payload compression. Integrates real-time weather telemetry and AI crop diagnostic pipelines.',
            detailsHTML: `
                <div style="background: #E6F9F2; border: 2px solid #000; box-shadow: 3px 3px 0px #000; padding: 12px 16px; border-radius: 6px; font-weight: 800; font-size: 0.95rem; color: #047857; margin-bottom: 20px;">
                    🌾 AgriAI: The Intelligent Farming Companion (Next-Gen)
                </div>

                <h4 style="font-size:1.15rem; font-weight:900; margin-top:20px; margin-bottom:10px; text-transform:uppercase; border-bottom:2px solid #000; padding-bottom:6px;">📌 Project Overview & Purpose</h4>
                <p style="line-height:1.6; margin-bottom:14px;"><strong>AgriAI: An Enterprise-Grade Farming Assistant for Tamil Nadu.</strong> Built on a Zero-Cost Architecture with Voice Intent, 2G Optimization (Data-Light Mode), and Async Workflows. Bridging the gap between Silicon Valley Tech and the Thanjavur Field.</p>
                <p style="line-height:1.6; margin-bottom:20px;">AgriAI is a professional-grade, microservices-based agricultural platform. It blends cutting-edge AI (Satellite monitoring, Disease Detection) with deep cultural wisdom, now powered by a modern React frontend and a robust Node.js API.</p>

                <h4 style="font-size:1.15rem; font-weight:900; margin-top:24px; margin-bottom:12px; text-transform:uppercase; border-bottom:2px solid #000; padding-bottom:6px;">✨ Key Features</h4>
                <ul style="list-style:none; padding:0; margin:0 0 24px 0; display:grid; gap:10px;">
                    <li style="background:#F8F9FA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:12px 16px; border-radius:6px; font-size:0.92rem;">
                        <strong style="color:#FF1493;">🤖 AI Advisor:</strong> Real-time advice and market updates.
                    </li>
                    <li style="background:#F8F9FA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:12px 16px; border-radius:6px; font-size:0.92rem;">
                        <strong style="color:#00D1FF;">🌿 Disease Scanner:</strong> Mobile-first crop health diagnosis.
                    </li>
                    <li style="background:#F8F9FA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:12px 16px; border-radius:6px; font-size:0.92rem;">
                        <strong style="color:#10B981;">🗺️ Yield Forecaster:</strong> Satellite-powered regional yield mapping.
                    </li>
                    <li style="background:#F8F9FA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:12px 16px; border-radius:6px; font-size:0.92rem;">
                        <strong style="color:#8A2BE2;">💰 Agri-Market:</strong> Secure shop for fertilizers and tools.
                    </li>
                    <li style="background:#F8F9FA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:12px 16px; border-radius:6px; font-size:0.92rem;">
                        <strong style="color:#FFB020;">☀️ Sunlight Mode:</strong> Ultra-high contrast UI for direct sunlight use.
                    </li>
                </ul>

                <h4 style="font-size:1.15rem; font-weight:900; margin-top:24px; margin-bottom:12px; text-transform:uppercase; border-bottom:2px solid #000; padding-bottom:6px;">🏗️ Architecture: Professional Microservices</h4>
                <p style="line-height:1.6; margin-bottom:14px;">The platform uses a scalable, containerized architecture:</p>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:20px;">
                    <div style="background:#FAFAFA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:14px; border-radius:6px;">
                        <h5 style="font-weight:900; font-size:0.95rem; margin-bottom:8px; color:#FF1493;">⚙️ Backend & API (Heart & Brain)</h5>
                        <ul style="margin:0; padding-left:18px; font-size:0.88rem; line-height:1.6;">
                            <li><strong>Core API (Node.js/Express)</strong>: JWT Auth, E-commerce, ML Proxy.</li>
                            <li><strong>ML Backend (FastAPI)</strong>: Yield Prediction, Disease Risk.</li>
                            <li><strong>Database (PostgreSQL/Supabase)</strong>: Users, products, analytics.</li>
                        </ul>
                    </div>
                    <div style="background:#FAFAFA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:14px; border-radius:6px;">
                        <h5 style="font-weight:900; font-size:0.95rem; margin-bottom:8px; color:#00D1FF;">🖥️ Frontend (Face)</h5>
                        <ul style="margin:0; padding-left:18px; font-size:0.88rem; line-height:1.6;">
                            <li><strong>React + Tailwind</strong>: For a premium, responsive UI.</li>
                            <li><strong>Sunlight Mode</strong>: Specifically designed for field conditions.</li>
                        </ul>
                    </div>
                </div>

                <h4 style="font-size:1.15rem; font-weight:900; margin-top:24px; margin-bottom:12px; text-transform:uppercase; border-bottom:2px solid #000; padding-bottom:6px;">🚀 How to Run & Project Structure</h4>
                <div style="background:#000; color:#00D1FF; padding:16px; border-radius:6px; font-family:monospace; font-size:0.85rem; line-height:1.7; overflow-x:auto; margin-bottom:14px; border:2px solid #000; box-shadow:4px 4px 0px #FFD100;">
                    $ git clone https://github.com/haroon2109/AgriAI.git<br>
                    $ cd AgriAI<br>
                    $ docker-compose up --build<br><br>
                    # Access Points:<br>
                    - Frontend: http://localhost:3000<br>
                    - Core API: http://localhost:5000/api<br>
                    - ML Docs: http://localhost:8000/docs
                </div>
                <p style="font-size:0.9rem; margin-bottom:24px;"><strong>Structure:</strong> <code>frontend_react/</code> (React Dashboard), <code>backend_node/</code> (Node.js API), <code>backend_api/</code> (ML Service), <code>legacy_archive/</code> (Streamlit Prototype).</p>
                
                <div style="text-align: center; font-weight: bold; margin-top: 30px; font-size: 1.1rem; color: #E11D48;">
                    Built with ❤️ for the farmers of Tamil Nadu.
                </div>
            `,
            github: 'https://github.com/haroon2109/AgriAI',
            live: 'https://agriai-frontend-57v0.onrender.com/'
        },
        'kagaz-ai': {
            title: '📄 KAGAZ-AI — AI-Powered Multimodal Worksheet Evaluation & Pedagogical Analytics',
            img: 'assets/kagaz-ai-architecture.png',
            tags: ['FastAPI', 'Gemini 1.5 Flash', 'Celery + Redis', 'Next.js', 'PostgreSQL', 'Google.org Top 30', 'Multimodal Vision AI'],
            desc: 'Engineered an end-to-end vision-to-text platform using Gemini 1.5 Flash to autonomously evaluate messy handwritten student worksheets, detect learning gaps, and surface macro classroom analytics—offloading heavy compute via Celery + Redis.',
            detailsHTML: `
                <div style="background: #E6F9F2; border: 2px solid #000; box-shadow: 3px 3px 0px #000; padding: 12px 16px; border-radius: 6px; font-weight: 800; font-size: 0.95rem; color: #047857; margin-bottom: 20px;">
                    🏆 Recognized as a Top 30 National Finalist in SahAI for Shiksha (Backed by Google.org & Wadhwani AI)
                </div>

                <h4 style="font-size:1.15rem; font-weight:900; margin-top:20px; margin-bottom:10px; text-transform:uppercase; border-bottom:2px solid #000; padding-bottom:6px;">📌 Project Overview & Purpose</h4>
                <p style="line-height:1.6; margin-bottom:14px;">Kagaz-AI is an advanced full-stack AI platform engineered to bridge physical educational materials and digital analytics. Built for teachers and academic institutions, the system processes uploaded or captured handwritten student worksheets, applies localized optical character recognition (OCR), autonomously evaluates structural math and text answers, detects student pedagogical gaps, and surfaces comprehensive classroom intelligence.</p>
                <p style="line-height:1.6; margin-bottom:20px;">Instead of relying on rigid, resource-heavy legacy OCR pipelines that fail on handwritten documents, Kagaz-AI utilizes an <strong>End-to-End Multimodal Vision-to-Text Architecture via Gemini 1.5 Flash</strong>.</p>

                <h4 style="font-size:1.15rem; font-weight:900; margin-top:24px; margin-bottom:12px; text-transform:uppercase; border-bottom:2px solid #000; padding-bottom:6px;">🚀 Key Architectural Features</h4>
                <ul style="list-style:none; padding:0; margin:0 0 24px 0; display:grid; gap:10px;">
                    <li style="background:#F8F9FA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:12px 16px; border-radius:6px; font-size:0.92rem;">
                        <strong style="color:#FF1493;">📷 Multi-Modal Worksheet Ingestion:</strong> Supports direct camera capture compression algorithms or bulk image uploads for handwritten assignments.
                    </li>
                    <li style="background:#F8F9FA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:12px 16px; border-radius:6px; font-size:0.92rem;">
                        <strong style="color:#00D1FF;">🧠 AI-Powered Vision-to-Text:</strong> Eliminates cascading OCR errors and achieves near-human accuracy on unstructured handwriting in a single inference cycle by utilizing an End-to-End Multimodal Vision-to-Text Architecture.
                    </li>
                    <li style="background:#F8F9FA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:12px 16px; border-radius:6px; font-size:0.92rem;">
                        <strong style="color:#10B981;">⚡ Compute Offloading (Celery + Redis):</strong> Leverages Celery backend queues to smoothly process complex image extraction tasks and offload heavy visual computation to Google's specialized TPU infrastructure without stalling client requests.
                    </li>
                    <li style="background:#F8F9FA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:12px 16px; border-radius:6px; font-size:0.92rem;">
                        <strong style="color:#8A2BE2;">📊 Pedagogical Gap Analysis:</strong> Goes beyond generic pass/fail grading by extracting deeper student learning behaviors, specific error tracking, and macro dashboard analytics for whole classes.
                    </li>
                    <li style="background:#F8F9FA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:12px 16px; border-radius:6px; font-size:0.92rem;">
                        <strong style="color:#FFB020;">🌐 Zero-Shot Adaptability & Multi-Lingual:</strong> Handles unstructured document layouts instantly without extra training data and features local indexing capabilities for offline environments.
                    </li>
                </ul>

                <h4 style="font-size:1.15rem; font-weight:900; margin-top:24px; margin-bottom:12px; text-transform:uppercase; border-bottom:2px solid #000; padding-bottom:6px;">🛠️ End-to-End Data Processing Flow</h4>
                <div style="background:#000; color:#00D1FF; padding:16px; border-radius:6px; font-family:monospace; font-size:0.85rem; line-height:1.7; overflow-x:auto; margin-bottom:24px; border:2px solid #000; box-shadow:4px 4px 0px #FFD100;">
                    1. [Next.js Client] ➔ Upload handwritten worksheet / Camera Capture<br>
                    2. [FastAPI Router] ➔ POST Document Image payload to REST endpoint<br>
                    3. [FastAPI Router] ➔ Offload vision inference task to Celery Queue<br>
                    4. [Redis Broker]   ➔ Manage async task state & broker messaging<br>
                    5. [Celery Worker]  ➔ Execute Vision-to-Text inference via Gemini 1.5 Flash<br>
                    6. [Gemini 1.5]     ➔ Extract text, grade answers & detect learning gaps<br>
                    7. [Celery Worker]  ➔ Persist structured results to PostgreSQL (Supabase)<br>
                    8. [FastAPI Router] ➔ Query parsed analysis results from database<br>
                    9. [Next.js UI]     ➔ Render interactive teacher dashboard & macro analytics
                </div>

                <h4 style="font-size:1.15rem; font-weight:900; margin-top:24px; margin-bottom:12px; text-transform:uppercase; border-bottom:2px solid #000; padding-bottom:6px;">🛠️ Technology Stack Breakdown</h4>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:20px;">
                    <div style="background:#FAFAFA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:14px; border-radius:6px;">
                        <h5 style="font-weight:900; font-size:0.95rem; margin-bottom:8px; color:#FF1493;">⚙️ Backend & Async Engine</h5>
                        <ul style="margin:0; padding-left:18px; font-size:0.88rem; line-height:1.6;">
                            <li><strong>FastAPI (Python 3.10)</strong>: High-throughput async REST endpoints</li>
                            <li><strong>Celery + Redis</strong>: Distributed background worker queues</li>
                            <li><strong>PostgreSQL (Supabase)</strong>: Relational schema persistence</li>
                            <li><strong>Google Gemini 1.5 Flash</strong>: Vision-to-Text AI model</li>
                        </ul>
                    </div>
                    <div style="background:#FAFAFA; border:2px solid #000; box-shadow:3px 3px 0px #000; padding:14px; border-radius:6px;">
                        <h5 style="font-weight:900; font-size:0.95rem; margin-bottom:8px; color:#00D1FF;">🖥️ Frontend & Analytics Dashboard</h5>
                        <ul style="margin:0; padding-left:18px; font-size:0.88rem; line-height:1.6;">
                            <li><strong>Next.js (App Router)</strong>: Server-rendered React client</li>
                            <li><strong>Tailwind CSS & shadcn/ui</strong>: Clean UI design system</li>
                            <li><strong>Recharts</strong>: Dynamic classroom performance charts</li>
                            <li><strong>Vercel Edge Platform</strong>: Global CDN deployment</li>
                        </ul>
                    </div>
                </div>
            `,
            github: 'https://github.com/haroon2109/Kagaz-AI',
            live: 'https://kagaz-ai.vercel.app/'
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
            document.getElementById('modal-desc').innerHTML = data.detailsHTML || data.desc;

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
