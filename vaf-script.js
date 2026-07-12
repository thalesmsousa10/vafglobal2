/* VAF Business Solution - Opção 4 (Atlantic Style - Multitone Blue) Script */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ANIMAÇÃO DE SCROLL DO HEADER
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.remove('bg-transparent', 'py-5');
                header.classList.add('bg-white/95', 'backdrop-blur-md', 'py-4', 'border-b', 'border-slate-200/80', 'shadow-md');
            } else {
                header.classList.remove('bg-white/95', 'backdrop-blur-md', 'py-4', 'border-b', 'border-slate-200/80', 'shadow-md');
                header.classList.add('bg-transparent', 'py-5');
            }
        });
    }

    // 2. MENU MOBILE HAMBÚRGUER
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains('hidden');
            if (isOpen) {
                mobileMenu.classList.add('hidden');
                hamburgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            } else {
                mobileMenu.classList.remove('hidden');
                hamburgerIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            }
        });
    }

    // 3. INTERACTION OBSERVER (SCROLL REVEAL)
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Se o elemento contiver contadores de números, iniciamos eles
                const counters = entry.target.querySelectorAll('.dynamic-counter');
                counters.forEach(counter => {
                    if (!counter.classList.contains('counted')) {
                        animateCounter(counter);
                    }
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

    // 4. ANIMADOR DE CONTADORES NUMÉRICOS
    function animateCounter(counter) {
        counter.classList.add('counted');
        const target = +counter.getAttribute('data-target');
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 segundos
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Efeito easeOutQuad
            const easeProgress = progress * (2 - progress);
            const currentValue = Math.floor(easeProgress * target);

            // Formatação do número
            if (target >= 1000) {
                counter.innerText = (currentValue / 1000).toFixed(1).replace('.', ',') + 'K' + suffix;
            } else {
                counter.innerText = currentValue + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                // Ajusta valor final certinho
                if (target >= 1000) {
                    if (target % 1000 === 0) {
                        counter.innerText = (target / 1000) + 'K' + suffix;
                    } else {
                        counter.innerText = (target / 1000).toFixed(1).replace('.', ',') + 'K' + suffix;
                    }
                } else {
                    counter.innerText = target + suffix;
                }
            }
        }
        requestAnimationFrame(update);
    }

    // 5. WIDGET DE ROTAS BILATERAIS INTERATIVO
    const routeCards = document.querySelectorAll('.route-card');
    const displayFob = document.getElementById('route-fob');
    const displayTransit = document.getElementById('route-transit');
    const displayVolume = document.getElementById('route-volume');
    const displayProducts = document.getElementById('route-products');
    const displayTitle = document.getElementById('route-active-title');

    const routeData = {
        'br-dxb': {
            title: 'Brasil ➔ Dubai (Oriente Médio)',
            fob: 'FOB / CIF / CFR',
            transit: '22 a 26 Dias',
            volume: '150.000 Ton/Ano',
            products: 'Açúcar Icumsa 45, Café Verde'
        },
        'br-pt': {
            title: 'Brasil ➔ Portugal (Portas da Europa)',
            fob: 'DDP / CIF / FOB',
            transit: '14 a 18 Dias',
            volume: '85.000 Sacas/Ano',
            products: 'Café Especial SCA 84+, Orgânicos'
        },
        'dxb-eu': {
            title: 'Dubai ➔ Europa (Trading Direto)',
            fob: 'FOB / CIF / Ex-Works',
            transit: '18 Dias Misto',
            volume: '$120M Volume Negócio',
            products: 'Trading Químico, Urea, Açúcar'
        }
    };

    if (routeCards && displayFob) {
        routeCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove ativo de todos os botões/cards
                routeCards.forEach(c => {
                    c.classList.remove('border-blue-600/80', 'bg-blue-50/50');
                    c.classList.add('border-slate-200');
                });
                
                // Adiciona ativo no clicado
                card.classList.remove('border-slate-200');
                card.classList.add('border-blue-600/80', 'bg-blue-50/50');

                // Atualiza os dados no display com animação de fade
                const routeId = card.getAttribute('data-route');
                const data = routeData[routeId];

                if (data) {
                    // Efeito fade
                    const panel = document.getElementById('route-display-panel');
                    if (panel) {
                        panel.style.opacity = '0.3';
                        panel.style.transform = 'scale(0.98)';
                        
                        setTimeout(() => {
                            displayTitle.innerText = data.title;
                            displayFob.innerText = data.fob;
                            displayTransit.innerText = data.transit;
                            displayVolume.innerText = data.volume;
                            displayProducts.innerText = data.products;
                            
                            panel.style.opacity = '1';
                            panel.style.transform = 'scale(1)';
                        }, 200);
                    }
                }
            });
        });
    }

    // 6. SELETOR DE IDIOMAS (SIMULAÇÃO)
    const btnPt = document.getElementById('btn-lang-pt');
    const btnEn = document.getElementById('btn-lang-en');

    if (btnPt && btnEn) {
        btnPt.addEventListener('click', () => {
            btnPt.classList.add('text-blue-600', 'font-bold');
            btnPt.classList.remove('text-slate-500');
            btnEn.classList.remove('text-blue-600', 'font-bold');
            btnEn.classList.add('text-slate-500');
        });
        
        btnEn.addEventListener('click', () => {
            btnEn.classList.add('text-blue-600', 'font-bold');
            btnEn.classList.remove('text-slate-500');
            btnPt.classList.remove('text-blue-600', 'font-bold');
            btnPt.classList.add('text-slate-500');
        });
    }

    // 7. FORMULÁRIO DE CONTATO (SIMULAÇÃO DE PROTOCOLO)
    const contactForm = document.getElementById('vaf-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            if (submitBtn) {
                const originalText = submitBtn.innerText;
                submitBtn.disabled = true;
                submitBtn.innerText = 'Processando Envio...';
                
                setTimeout(() => {
                    submitBtn.classList.remove('bg-blue-600');
                    submitBtn.classList.add('bg-emerald-600', 'text-white');
                    submitBtn.innerText = '✓ Solicitação Enviada';
                    
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('bg-emerald-600', 'text-white');
                        submitBtn.classList.add('bg-blue-600');
                        submitBtn.innerText = originalText;
                    }, 3000);
                }, 1500);
            }
        });
    }
});
