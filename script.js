// ===== SCRIPT INTERATIVO MEMORIAL BOLÍVIA =====

document.addEventListener('DOMContentLoaded', function() {
    // Ativa efeito de scroll suave na navegação
    setupSmoothScroll();
    
    // Ativa animação de elementos ao scroll
    setupScrollAnimation();
    
    // Adiciona classe ativa ao link de navegação
    setupActiveNavigation();
});

// ===== SMOOTH SCROLL =====
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                
                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 80; // Offset para navbar sticky
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ANIMAÇÃO AO SCROLL =====
function setupScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observa elementos que devem ter animação
    const elementsToAnimate = document.querySelectorAll(
        '.biography-card, .golpe-card, .repressao-card, .resistencia-card, .content-block'
    );
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// ===== NAVEGAÇÃO ATIVA =====
function setupActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        // Identifica qual seção está visível
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        // Remove classe active de todos e adiciona ao atual
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== FUNÇÃO PARA EXPANDIR/COLAPSAR BIOGRAFIAS =====
function toggleBiografia(element) {
    const biografiaContent = element.querySelector('.biografia-content');
    const biografiaCard = element;
    
    if (biografiaContent.style.maxHeight) {
        biografiaContent.style.maxHeight = null;
        biografiaCard.classList.remove('expanded');
    } else {
        biografiaContent.style.maxHeight = biografiaContent.scrollHeight + 'px';
        biografiaCard.classList.add('expanded');
    }
}

// ===== BUSCA SIMPLES NA PÁGINA =====
function searchContent() {
    const searchTerm = prompt('O que você deseja procurar?');
    if (!searchTerm) return;
    
    const bodyText = document.body.innerText.toLowerCase();
    
    if (bodyText.includes(searchTerm.toLowerCase())) {
        alert(`Encontrado: "${searchTerm}" aparece na página.`);
        // Realça o primeiro resultado
        highlightText(searchTerm);
    } else {
        alert(`"${searchTerm}" não foi encontrado na página.`);
    }
}

// ===== REALÇAR TEXTO =====
function highlightText(text) {
    const elements = document.querySelectorAll('p, h3, h4, li, span');
    const regex = new RegExp(`(${text})`, 'gi');
    let found = false;
    
    elements.forEach(el => {
        if (el.innerText.match(regex) && !found) {
            el.style.backgroundColor = 'yellow';
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            found = true;
            
            // Remove realce após 3 segundos
            setTimeout(() => {
                el.style.backgroundColor = '';
            }, 3000);
        }
    });
}

// ===== IMPRESSÃO DA PÁGINA =====
function printPage() {
    window.print();
}

// ===== COMPARTILHAMENTO SOCIAL (EXEMPLO) =====
function shareOnSocial(platform) {
    const url = window.location.href;
    const title = 'Memorial das Ditaduras na Bolívia';
    let shareUrl = '';
    
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// ===== VOLTAR AO TOPO =====
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== BOTÃO "VOLTAR AO TOPO" FLUTUANTE =====
function setupScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTopBtn';
    button.innerHTML = '↑ Topo';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #1a3a52;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 5px;
        cursor: pointer;
        display: none;
        z-index: 999;
        font-weight: 600;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', scrollToTop);
    
    button.addEventListener('mouseover', () => {
        button.style.backgroundColor = '#f57f17';
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.backgroundColor = '#1a3a52';
        button.style.transform = 'scale(1)';
    });
}

// ===== ESTATÍSTICAS DA PÁGINA =====
function getPageStatistics() {
    const paragraphs = document.querySelectorAll('p').length;
    const headings = document.querySelectorAll('h1, h2, h3, h4').length;
    const links = document.querySelectorAll('a').length;
    const images = document.querySelectorAll('img').length;
    
    console.log('📊 Estatísticas da Página:');
    console.log(`- Parágrafos: ${paragraphs}`);
    console.log(`- Títulos: ${headings}`);
    console.log(`- Links: ${links}`);
    console.log(`- Imagens: ${images}`);
    
    return {
        paragraphs,
        headings,
        links,
        images
    };
}

// ===== ADICIONA BOTÃO DE SCROLL AO TOPO =====
document.addEventListener('DOMContentLoaded', setupScrollToTopButton);

// ===== CLASSE ATIVA NA NAV =====
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: #f57f17 !important;
            border-bottom-color: #f57f17 !important;
        }
    `;
    document.head.appendChild(style);
});

// ===== MODO ESCURO (OPCIONAL) =====
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Carrega preferência de modo escuro
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
});

// ===== ESTILOS PARA DARK MODE =====
const darkModeStyles = `
    body.dark-mode {
        background-color: #1a1a1a;
        color: #e0e0e0;
    }
    
    body.dark-mode section {
        background-color: #2a2a2a;
        border-bottom-color: #444;
    }
    
    body.dark-mode .content-block {
        background-color: #333;
        color: #e0e0e0;
    }
    
    body.dark-mode .golpe-card,
    body.dark-mode .repressao-card,
    body.dark-mode .resistencia-card,
    body.dark-mode .percepcao-item,
    body.dark-mode .referencias-category {
        background-color: #333;
        color: #e0e0e0;
    }
    
    body.dark-mode .biografia-card {
        background-color: #333;
    }
    
    body.dark-mode .biografia-content {
        background-color: #2a2a2a;
        color: #e0e0e0;
    }
    
    body.dark-mode .timeline-content {
        background-color: #333;
    }
`;

const darkModeStyle = document.createElement('style');
darkModeStyle.textContent = darkModeStyles;
document.head.appendChild(darkModeStyle);

// ===== CARREGAMENTO INICIAL =====
console.log('✅ Memorial Virtual das Ditaduras na Bolívia carregado com sucesso!');
console.log('📍 Digite getPageStatistics() no console para ver estatísticas da página.');
