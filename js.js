// Efeito de digitação
const words = ["memórias", "momentos", "conquistas", "sonhos"];
const typingElement = document.getElementById('changingText');
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    
    typingElement.textContent = currentWord.substring(0, charIndex);
    typingElement.style.borderRight = isDeleting ? 'none' : `2px solid ${getComputedStyle(typingElement).color}`;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 150);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 100);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, isDeleting ? 1000 : 500);
    }
};

// Carrossel
class Carousel {
    constructor() {
        this.index = 0;
        this.interval = null;
        this.images = document.querySelectorAll('.carousel-images img');
        this.indicators = document.querySelector('.carousel-indicators');
        this.initIndicators();
        this.start();
        this.showSlide(0);
    }

    initIndicators() {
        this.images.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.addEventListener('click', () => this.showSlide(i));
            this.indicators.appendChild(dot);
        });
    }

    showSlide(index) {
        this.index = index;
        document.querySelector('.carousel-images').style.transform = `translateX(-${index * 100}%)`;
        document.querySelectorAll('.carousel-indicators span').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    start() {
        this.interval = setInterval(() => {
            this.index = (this.index + 1) % this.images.length;
            this.showSlide(this.index);
        }, 5000);
    }
}

// Contador de Tempo Corrigido
function calculateTimeTogether() {
    const startDate = new Date('2023-09-26T12:00:00');
    const currentDate = new Date();
    
    let years = currentDate.getFullYear() - startDate.getFullYear();
    let months = currentDate.getMonth() - startDate.getMonth();
    let days = currentDate.getDate() - startDate.getDate();

    // Ajuste de meses negativos
    if (months < 0) {
        years--;
        months += 12;
    }

    // Ajuste de dias negativos
    if (days < 0) {
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += lastMonth.getDate();
        months--;
    }

    // Garantir valores não negativos
    years = Math.max(years, 0);
    months = Math.max(months, 0);
    days = Math.max(days, 0);

    return { years, months, days };
}

function updateCounter() {
    const time = calculateTimeTogether();
    document.getElementById('years').textContent = time.years;
    document.getElementById('months').textContent = time.months;
    document.getElementById('days').textContent = time.days;
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    new Carousel();
    updateCounter();
    setInterval(updateCounter, 3600000); // Atualiza a cada hora
});
