// Refactored main.js into a modular structure for readability and maintenance
(function () {
    const App = {
        cache: {},

        init() {
            this.cacheDOM();
            this.initLoading();
            this.initCursor();
            this.initHoverCursorEffects();
            this.initNeuralBg();
            this.initSmoothScroll();
            this.initObservers();
            this.initHeaderScroll();
            this.initParallax();
            this.initTypeWriter();
            this.initProjectCardInteractions();
            this.initGlitchEffect();
            // this.initKonami();
            this.initSoundEffectsLazy();
            this.initPerformanceMonitoring();
            this.initTouchEffects();
            this.initAskUI();
        },

        cacheDOM() {
            this.cache.loading = document.getElementById('loading');
            this.cache.cursor = document.getElementById('cursor');
            this.cache.cursorTrail = document.getElementById('cursorTrail');
            this.cache.neuralBg = document.getElementById('neuralBg');
            this.cache.header = document.querySelector('header');
        },

        // Loading screen
        initLoading() {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    if (this.cache.loading) this.cache.loading.style.opacity = '0';
                    setTimeout(() => {
                        if (this.cache.loading) this.cache.loading.style.display = 'none';
                    }, 500);
                }, 1500);
            });
        },

        // Custom cursor + trail
        initCursor() {
            const cursor = this.cache.cursor;
            const trail = this.cache.cursorTrail;
            if (!cursor || !trail) return;

            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX - 10 + 'px';
                cursor.style.top = e.clientY - 10 + 'px';

                // Use requestAnimationFrame for smoother trailing
                window.requestAnimationFrame(() => {
                    trail.style.left = e.clientX - 4 + 'px';
                    trail.style.top = e.clientY - 4 + 'px';
                });
            });
        },

        initHoverCursorEffects() {
            const cursor = this.cache.cursor;
            if (!cursor) return;

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
        },

        // Neural background
        initNeuralBg() {
            const neuralBg = this.cache.neuralBg;
            if (!neuralBg) return;

            for (let i = 0; i < 50; i++) {
                const neuron = document.createElement('div');
                neuron.className = 'neuron';
                neuron.style.left = Math.random() * 100 + '%';
                neuron.style.top = Math.random() * 100 + '%';
                neuron.style.animationDelay = Math.random() * 3 + 's';
                neuralBg.appendChild(neuron);
            }

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
        },

        // Smooth scroll for anchor links
        initSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });
        },

        initObservers() {
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

            document.querySelectorAll('.section, .project-card, .skill-category').forEach(el => {
                observer.observe(el);
            });
        },

        // Header scroll behavior with a simple debounce
        initHeaderScroll() {
            let lastScrollY = window.scrollY;
            const header = this.cache.header;
            if (!header) return;

            window.addEventListener('scroll', () => {
                const currentY = window.scrollY;
                if (currentY > lastScrollY && currentY > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }

                header.style.background = currentY > 50 ? 'rgba(10, 10, 15, 0.95)' : 'rgba(10, 10, 15, 0.8)';
                lastScrollY = currentY;
            });
        },

        // Parallax effect for floating elements
        initParallax() {
            const parallaxHandler = () => {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.floating-element');
                parallaxElements.forEach((element, index) => {
                    const speed = 0.5 + (index * 0.1);
                    element.style.transform = `translateY(${scrolled * speed}px)`;
                });
            };

            window.addEventListener('scroll', parallaxHandler);
        },

        // Typing effect
        initTypeWriter() {
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

            setTimeout(() => {
                const heroIntro = document.querySelector('.hero-intro');
                if (heroIntro) {
                    typeWriter(heroIntro, "Hello, I'm Rohitesh Kumar Jain", 80);
                }
            }, 2000);
        },

        // Interactive project cards
        initProjectCardInteractions() {
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
        },

        // Glitch effect
        initGlitchEffect() {
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
        },

        // Konami code easter egg
        // initKonami() {
        //     let konamiCode = '';
        //     const konamiSequence = 'ArrowUpArrowUpArrowDownArrowDown';
        //
        //     document.addEventListener("keydown", (e) => {
        //         if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
        //
        //         konamiCode += e.code;
        //         if (konamiCode.length > konamiSequence.length) {
        //             konamiCode = konamiCode.slice(-konamiSequence.length);
        //         }
        //
        //         if (konamiCode === konamiSequence) {
        //             document.body.style.filter = "hue-rotate(180deg)";
        //             this.createMatrixRain();
        //             setTimeout(() => {
        //                 document.body.style.filter = "none";
        //                 document.querySelectorAll(".matrix-char").forEach(el => el.remove());
        //             }, 5000);
        //             konamiCode = "";
        //         }
        //     });
        // },
        //
        // createMatrixRain() {
        //     const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        //
        //     for (let i = 0; i < 50; i++) {
        //         setTimeout(() => {
        //             const char = document.createElement('div');
        //             char.className = 'matrix-char';
        //             char.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        //             char.style.position = 'fixed';
        //             char.style.left = Math.random() * window.innerWidth + 'px';
        //             char.style.top = '-20px';
        //             char.style.color = '#00ff00';
        //             char.style.fontSize = '20px';
        //             char.style.zIndex = '9999';
        //             char.style.pointerEvents = 'none';
        //             char.style.fontFamily = 'monospace';
        //
        //             document.body.appendChild(char);
        //
        //             const fallDuration = 2000 + Math.random() * 3000;
        //             char.animate([
        //                 { transform: 'translateY(-20px)', opacity: 1 },
        //                 { transform: `translateY(${window.innerHeight + 20}px)`, opacity: 0 }
        //             ], {
        //                 duration: fallDuration,
        //                 easing: 'linear'
        //             }).onfinish = () => char.remove();
        //
        //         }, i * 100);
        //     }
        // },

        // Sound effects lazy initialization on first click
        initSoundEffectsLazy() {
            const playOnHoverSelector = '.nav-links a, .cta-button, .project-link';
            const playOnHoverCardSelector = '.project-card';

            const onceHandler = () => {
                this.addSoundEffects(playOnHoverSelector, playOnHoverCardSelector);
            };

            document.addEventListener('click', onceHandler, { once: true });
        },

        addSoundEffects(hoverSelector, cardSelector) {
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

            document.querySelectorAll(hoverSelector).forEach(el => {
                el.addEventListener('mouseenter', () => playBeep(1000, 50));
            });

            document.querySelectorAll(cardSelector).forEach(el => {
                el.addEventListener('mouseenter', () => playBeep(600, 100));
            });
        },

        initPerformanceMonitoring() {
            if ('performance' in window) {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        const perfData = performance.getEntriesByType('navigation')[0];
                        if (perfData) {
                            console.log(`🚀 Page loaded in ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
                        }
                    }, 0);
                });
            }
        },

        initTouchEffects() {
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
        },

        // Ask LLM UI integration
        initAskUI() {
            const input = document.getElementById("askInput");
            const button = document.getElementById("askButton");
            const messages = document.getElementById("chatMessages");

            console.log("Initializing Ask UI...");
            if (!input || !button || !messages) {
                console.error("Chatbox elements not found:", { input, button, messages });
                return;
            }

            let conversation = [
                { role: "system", content: "You are Rohitesh Kumar Jain. Answer as him." }
            ];

            let typingEl = null;

            function addMessage(text, cls) {
                console.log("Adding message:", text);
                const div = document.createElement("div");
                div.className = `chat-msg ${cls}`;
                div.textContent = text;
                messages.appendChild(div);
                messages.scrollTop = messages.scrollHeight;
                return div;
            }

            function showTyping() {
                console.log("Showing typing indicator...");
                typingEl = document.createElement("div");
                typingEl.className = "chat-msg chat-ai";
                typingEl.innerHTML = "Typing<span class='dots'>...</span>";
                messages.appendChild(typingEl);
                messages.scrollTop = messages.scrollHeight;
            }

            function removeTyping() {
                console.log("Removing typing indicator...");
                if (typingEl) typingEl.remove();
                typingEl = null;
            }

            async function send(textFromChip = null) {
                const q = textFromChip || input.value.trim();
                if (!q) {
                    console.warn("Empty input, skipping send.");
                    return;
                }
                input.value = "";

                addMessage(q, "chat-user");
                conversation.push({ role: "user", content: q });

                showTyping();

                try {
                    const res = await fetch("https://rohitesh-ai-gateway.thekumarjain.workers.dev", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ message: q })
                    });

                    const data = await res.json();
                    removeTyping();

                    const answer = data.choices?.[0]?.message?.content || "No response";
                    conversation.push({ role: "assistant", content: answer });

                    console.log("Received answer:", answer);
                    streamAnswer(answer);
                } catch (error) {
                    console.error("Error during fetch:", error);
                    removeTyping();
                    addMessage("The AI service is starting....\n" +
                        "To keep costs low, it runs on a single instance that sleeps when idle. First requests may take ~60 seconds.", "chat-ai");
                }
            }

            function streamAnswer(text) {
                console.log("Streaming answer:", text);
                const div = document.createElement("div");
                div.className = "chat-msg chat-ai";
                messages.appendChild(div);

                let i = 0;
                const timer = setInterval(() => {
                    div.textContent += text[i++];
                    messages.scrollTop = messages.scrollHeight;
                    if (i >= text.length) clearInterval(timer);
                }, 18);
            }

            button.onclick = () => {
                console.log("Send button clicked.");
                send();
            };
            input.onkeydown = e => {
                if (e.key === "Enter") {
                    console.log("Enter key pressed.");
                    send();
                }
            };

            document.querySelectorAll("#chatSuggestions button").forEach(btn => {
                btn.onclick = () => {
                    console.log("Suggestion clicked:", btn.innerText);
                    send(btn.innerText);
                };
            });
        },
    };

    // Start the app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => App.init());
    } else {
        App.init();
    }

})();