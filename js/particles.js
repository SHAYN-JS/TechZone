/**
 * TechZone Global Particles & Reveal System
 * High-end animations for premium user experience
 */

class TechZoneEffects {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.particleCount = 60; // Zarrachalar soni
        this.init();
    }

    // Tizimni ishga tushirish
    init() {
        this.createPreloader(); // Yangi: Preloader yaratish
        this.createParticlesCanvas();
        this.setupParticles();
        this.setupScrollReveal();
        this.setupMagneticButtons(); // Yangi: Magnit tugmalar
        this.animate();

        // Sahifa to'liq yuklanganda preloaderni yashirish
        window.addEventListener('load', () => {
            setTimeout(() => this.hidePreloader(), 2000);
        });
    }

    // --- NEW: PRELOADER YARATISH ---
    createPreloader() {
        if (document.getElementById('preloader')) return;

        const preloader = document.createElement('div');
        preloader.id = 'preloader';
        preloader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">TECHZONE</div>
                <div class="loader-bar">
                    <div class="loader-progress"></div>
                </div>
            </div>
        `;
        document.body.appendChild(preloader);
    }

    hidePreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
        }
    }

    // --- NEW: MAGNETIC BUTTONS ---
    setupMagneticButtons() {
        const buttons = document.querySelectorAll('.btn, .auth-btn, .add-to-cart');
        buttons.forEach(btn => {
            btn.classList.add('magnetic-btn');
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Fon uchun canvas elementini yaratish
    createParticlesCanvas() {
        // Agar canvas allaqachon mavjud bo'lsa, uni ishlatish
        if (document.getElementById('particlesCanvas')) {
            this.canvas = document.getElementById('particlesCanvas');
        } else {
            // Yangi canvas yaratish va butun sahifa foniga o'rnatish
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'particlesCanvas';
            this.canvas.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1;';
            document.body.appendChild(this.canvas);
        }

        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        // Oyna o'lchami o'zgarganda canvasni ham moslashtirish
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // Zarrachalarni dastlabki holatini sozlash
    setupParticles() {
        class Particle {
            constructor(canvas) {
                this.canvas = canvas;
                this.reset();
            }

            // Zarrachani tasodifiy koordinatalar va rang bilan qayta sozlash
            reset() {
                this.x = Math.random() * this.canvas.width;
                this.y = Math.random() * this.canvas.height;
                this.size = Math.random() * 3 + 1; // Hajmi
                this.speedX = (Math.random() - 0.5) * 0.5; // X bo'yicha tezlik
                this.speedY = (Math.random() - 0.5) * 0.5; // Y bo'yicha tezlik
                this.opacity = Math.random() * 0.5 + 0.1; // Shaffoflik
                this.color = Math.random() > 0.5 ? '#10b981' : '#8b5cf6'; // Yashil yoki binafsha rang
            }

            // Harakatlantirish
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Devorlardan qaytish
                if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1;
            }

            // Chizish
            draw(ctx) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }

    // Zarrachalar o'rtasida chiziqlar chizish (to'r effekti)
    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Agar masofa 150px dan kam bo'lsa, chiziq chizish
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = '#10b981';
                    this.ctx.globalAlpha = 0.1 * (1 - distance / 150);
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                    this.ctx.globalAlpha = 1;
                }
            }
        }
    }

    // Animatsiya sikli
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });

        this.connectParticles();
        requestAnimationFrame(() => this.animate());
    }

    // Sahifani pastga scroll qilganda elementlarni chiqarish animatsiyasi
    setupScrollReveal() {
        // Animatsiya qilinishi kerak bo'lgan elementlar selektorlari
        const selectors = '.product-card, .category-card, .section-title, .auth-container, .cart-container';
        const revealElements = document.querySelectorAll(selectors);

        const revealOnScroll = () => {
            revealElements.forEach(el => {
                const windowHeight = window.innerHeight;
                const elementTop = el.getBoundingClientRect().top;
                const revealPoint = 150; // Element qancha masofada chiqishi

                if (elementTop < windowHeight - revealPoint) {
                    el.classList.add('revealed');
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }
            });
        };

        // Elementlarni dastlabki (yashirin) holatga keltirish
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        window.addEventListener('scroll', revealOnScroll);
        // Sahifa yuklanganda ko'rinib turgan elementlarni chiqarish
        setTimeout(revealOnScroll, 100);
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.techZoneEffects = new TechZoneEffects();
});
