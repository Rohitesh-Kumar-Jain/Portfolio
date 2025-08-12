        // Loading screen
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loading').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loading').style.display = 'none';
                }, 500);
            }, 1500);
        });

        // Custom cursor
        const cursor = document.getElementById('cursor');
        const cursorTrail = document.getElementById('cursorTrail');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';

            setTimeout(() => {
                cursorTrail.style.left = e.clientX - 4 + 'px';
                cursorTrail.style.top = e.clientY - 4 + 'px';
            }, 50);
        });

        // Hover effects for cursor
        document.querySelectorAll('a, button, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = '#8b5cf6';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = '#00fff9';
            });
        });

        // Neural network background
        function createNeuralNetwork() {
            const neuralBg = document.getElementById('neuralBg');
            const neurons = [];
            const connections = [];

            // Create neurons
            for (let i = 0; i < 50; i++) {
                const neuron = document.createElement('div');
                neuron.className = 'neuron';
                neuron.style.left = Math.random() * 100 + '%';
                neuron.style.top = Math.random() * 100 + '%';
                neuron.style.animationDelay = Math.random() * 3 + 's';
                neuralBg.appendChild(neuron);
                neurons.push(neuron);
            }

            // Create connections
            for (let i = 0; i < 30; i++) {
                const connection = document.createElement('div');
                connection.className = 'connection';
                connection.style.left = Math.random() * 100 + '%';
                connection.style.top = Math.random() * 100 + '%';
                connection.style.width = Math.random() * 200 + 100 + 'px';
                connection.style.transform = `rotate(${Math.random() * 360}deg)`;
                connection.style.animationDelay = Math.random() * 4 + 's';
                neuralBg.appendChild(connection);
            }
        }

        createNeuralNetwork();

        // Smooth scrolling
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

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        document.querySelectorAll('.section, .project-card, .skill-category').forEach(el => {
            observer.observe(el);
        });

        // Header scroll effect
        let lastScrollY = window.scrollY;
        const header = document.querySelector('header');

        window.addEventListener('scroll', () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            if (window.scrollY > 50) {
                header.style.background = 'rgba(10, 10, 15, 0.95)';
            } else {
                header.style.background = 'rgba(10, 10, 15, 0.8)';
            }

            lastScrollY = window.scrollY;
        });

        // Parallax effect for floating elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-element');

            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Dynamic typing effect for hero intro
        function typeWriter(element, text, speed = 100) {
            element.innerHTML = '';
            element.style.opacity = '1';
            let i = 0;

            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }

            type();
        }

        // Initialize typing effect after loading
        setTimeout(() => {
            const heroIntro = document.querySelector('.hero-intro');
            if (heroIntro) {
                typeWriter(heroIntro, "Hello, I'm Rohitesh Kumar Jain", 80);
            }
        }, 2000);

        // Interactive project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `translateY(-10px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
        });

        // Add random glitch effect
        function glitchEffect() {
            const glitchElements = document.querySelectorAll('.hero-title, .logo');

            setInterval(() => {
                if (Math.random() > 0.95) {
                    glitchElements.forEach(el => {
                        el.style.textShadow = `
                            ${Math.random() * 5}px 0 #ff0000,
                            ${Math.random() * -5}px 0 #00ffff
                        `;

                        setTimeout(() => {
                            el.style.textShadow = 'none';
                        }, 150);
                    });
                }
            }, 1000);
        }

        glitchEffect();

        // Easter egg: Konami code
        let konamiCode = '';
        const konamiSequence = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';

        document.addEventListener('keydown', (e) => {
            konamiCode += e.code;

            if (konamiCode.length > konamiSequence.length) {
                konamiCode = konamiCode.slice(-konamiSequence.length);
            }

            if (konamiCode === konamiSequence) {
                document.body.style.filter = 'hue-rotate(180deg)';
                createMatrixRain();

                setTimeout(() => {
                    document.body.style.filter = 'none';
                    document.querySelectorAll('.matrix-char').forEach(el => el.remove());
                }, 5000);

                konamiCode = '';
            }
        });

        function createMatrixRain() {
            const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const char = document.createElement('div');
                    char.className = 'matrix-char';
                    char.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                    char.style.position = 'fixed';
                    char.style.left = Math.random() * window.innerWidth + 'px';
                    char.style.top = '-20px';
                    char.style.color = '#00ff00';
                    char.style.fontSize = '20px';
                    char.style.zIndex = '9999';
                    char.style.pointerEvents = 'none';
                    char.style.fontFamily = 'monospace';

                    document.body.appendChild(char);

                    const fallDuration = 2000 + Math.random() * 3000;
                    char.animate([
                        { transform: 'translateY(-20px)', opacity: 1 },
                        { transform: `translateY(${window.innerHeight + 20}px)`, opacity: 0 }
                    ], {
                        duration: fallDuration,
                        easing: 'linear'
                    }).onfinish = () => char.remove();

                }, i * 100);
            }
        }

        // Add hover sound effects
        function addSoundEffects() {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();

            function playBeep(frequency = 800, duration = 100) {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.frequency.value = frequency;
                oscillator.type = 'sine';

                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration / 1000);
            }

            document.querySelectorAll('.nav-links a, .cta-button, .project-link').forEach(el => {
                el.addEventListener('mouseenter', () => playBeep(1000, 50));
            });

            document.querySelectorAll('.project-card').forEach(el => {
                el.addEventListener('mouseenter', () => playBeep(600, 100));
            });
        }

        document.addEventListener('click', addSoundEffects, { once: true });

        // Performance monitoring
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log(`🚀 Page loaded in ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
                }, 0);
            });
        }

        // Add mobile touch effects
        if ('ontouchstart' in window) {
            document.querySelectorAll('.project-card, .skill-category').forEach(card => {
                card.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.98)';
                });

                card.addEventListener('touchend', function() {
                    this.style.transform = 'scale(1)';
                });
            });
        }