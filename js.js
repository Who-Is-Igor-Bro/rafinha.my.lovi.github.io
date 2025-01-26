const words = ["memórias", "sensações", "momentos"];
const element = document.getElementById("changingText");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  // Atualiza o texto
  element.textContent = currentWord.slice(0, charIndex);

  if (!isDeleting && charIndex < currentWord.length) {
    // Digitando
    charIndex++;
    setTimeout(typeEffect, 150); // Velocidade de digitação
  } else if (isDeleting && charIndex > 0) {
    // Apagando
    charIndex--;
    setTimeout(typeEffect, 100); // Velocidade de apagar
  } else {
    // Muda para o próximo estado
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length; // Vai para a próxima palavra
    }
    setTimeout(typeEffect, 1000); // Pausa antes de apagar/recomeçar
  }
}

// Inicia a animação
typeEffect();

let currentIndex = 0;
const images = document.querySelectorAll('.carousel-images img');
const dots = document.querySelectorAll('.carousel-indicators .dot');

function showImage(index) {
  // Alinha a posição das imagens
  document.querySelector('.carousel-images').style.transform = `translateX(-${index * 100}%)`;

  // Adiciona a classe 'active' ao indicador
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Função para trocar a imagem a cada 3 segundos
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

// Função para alterar a imagem ao clicar no indicador
function setImage(index) {
  currentIndex = index;
  showImage(currentIndex);
}

// Função para configurar os cliques nos indicadores
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => setImage(index));
});

// Inicia o carrossel
setInterval(nextImage, 3000); // Troca de imagem a cada 3 segundos

// Exibe a primeira imagem
showImage(currentIndex);
////////////////////////

// Definindo a data inicial (26 de setembro de 2024, ao meio-dia)
const startDate = new Date("2023-09-26T12:00:00");

function updateElapsedTime() {
    const now = new Date();
    
    // Calcular diferença inicial
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();

    // Ajustar meses negativos
    if (months < 0) {
        years--;
        months += 12;
    }

    // Ajustar dias negativos
    if (days < 0) {
        months--;
        // Obter o último dia do mês anterior
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
    }

    // Ajustar horas e minutos
    if (hours < 0) {
        days--;
        hours += 24;
    }
    if (minutes < 0) {
        hours--;
        minutes += 60;
    }

    // Exibir os valores calculados
    document.getElementById('years').textContent = `${years} Ano${years !== 1 ? 's' : ''}`;
    document.getElementById('months').textContent = `${months} Mês${months !== 1 ? 'es' : ''}`;
    document.getElementById('days').textContent = `${days} Dia${days !== 1 ? 's' : ''}`;
    document.getElementById('hours').textContent = `${hours} Hora${hours !== 1 ? 's' : ''}`;
   
}

// Chamar a função para mostrar imediatamente
updateElapsedTime();