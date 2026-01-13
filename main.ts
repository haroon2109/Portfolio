import gsap from 'gsap';

// Entrance Animations
window.addEventListener('DOMContentLoaded', () => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    tl.from('nav', {
        y: -100,
        opacity: 0,
    })
        .from('.hero-left h1', {
            x: -100,
            opacity: 0,
        }, '-=0.8')
        .from('.portrait', {
            scale: 0.8,
            opacity: 0,
        }, '-=1')
        .from('.brushstroke', {
            rotate: -20,
            scale: 0.5,
            opacity: 0,
        }, '-=1.2')
        .from('.hero-right', {
            x: 100,
            opacity: 0,
        }, '-=1');

    // Scroll Animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.from(entry.target, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .cert-card, section .section-title').forEach(el => {
        observer.observe(el);
    });
});
