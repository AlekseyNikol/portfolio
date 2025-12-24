const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.arrow-left');
const nextBtn = document.querySelector('.arrow-right');
const dotsContainer = document.querySelector('.dots');

const slideWidth = 735 + 20;
let index = 1; // Начинаем с первого «настоящего» слайда после клона
let interval;

// Клонирование первого и последнего слайдов
const firstClone = images[0].cloneNode(true);
const lastClone = images[images.length - 1].cloneNode(true);

slides.appendChild(firstClone);
slides.insertBefore(lastClone, images[0]);

// Обновляем список изображений после клонирования
const allSlides = document.querySelectorAll('.slides img');

// Устанавливаем стартовую позицию
slides.style.transform = `translateX(${-slideWidth * index}px)`;

// Создание точек
images.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');

    dot.addEventListener('click', () => {
        stopAutoSlide();
        index = i + 1; // +1 из-за клона в начале
        updateSlider();
        startAutoSlide();
    });

    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// Обновление слайдера
function updateSlider() {
    slides.style.transition = 'transform 0.5s ease-in-out';
    slides.style.transform = `translateX(${-index * slideWidth}px)`;
    dots.forEach(dot => dot.classList.remove('active'));
    // Активная точка учитывает клон
    let dotIndex = index - 1;
    if (dotIndex >= images.length) dotIndex = 0;
    if (dotIndex < 0) dotIndex = images.length - 1;
    dots[dotIndex].classList.add('active');
}

// Навигация
function nextSlide() {
    index++;
    updateSlider();
}

function prevSlide() {
    index--;
    updateSlider();
}

// Событие для «петли» после анимации
slides.addEventListener('transitionend', () => {
    if (allSlides[index].isSameNode(firstClone)) {
        slides.style.transition = 'none';
        index = 1;
        slides.style.transform = `translateX(${-index * slideWidth}px)`;
    }
    if (allSlides[index].isSameNode(lastClone)) {
        slides.style.transition = 'none';
        index = images.length;
        slides.style.transform = `translateX(${-index * slideWidth}px)`;
    }
});

// Автопрокрутка
function startAutoSlide() {
    interval = setInterval(nextSlide, 2000);
}

function stopAutoSlide() {
    clearInterval(interval);
}

// Кнопки
nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
});

prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
});

// Старт
startAutoSlide();
