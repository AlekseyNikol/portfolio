const slider = document.querySelector('.slider');
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.arrow-left');
const nextBtn = document.querySelector('.arrow-right');
const dotsContainer = document.querySelector('.dots');

let index = 1;
let interval;

/* =========================
   КЛОНИРОВАНИЕ СЛАЙДОВ
========================= */
const firstClone = images[0].cloneNode(true);
const lastClone = images[images.length - 1].cloneNode(true);

slides.appendChild(firstClone);
slides.insertBefore(lastClone, images[0]);

const allSlides = document.querySelectorAll('.slides img');

/* =========================
   СТАРТОВАЯ ПОЗИЦИЯ
========================= */
slides.style.transform = `translateX(-${index * 100}%)`;

/* =========================
   СОЗДАНИЕ ТОЧЕК
========================= */
images.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');

    dot.addEventListener('click', () => {
        stopAutoSlide();
        index = i + 1; // +1 из-за клона
        updateSlider();
        startAutoSlide();
    });

    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

/* =========================
   ОБНОВЛЕНИЕ СЛАЙДЕРА
========================= */
function updateSlider() {
    slides.style.transition = 'transform 0.5s ease-in-out';
    slides.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));

    let dotIndex = index - 1;
    if (dotIndex >= images.length) dotIndex = 0;
    if (dotIndex < 0) dotIndex = images.length - 1;

    dots[dotIndex].classList.add('active');
}

/* =========================
   НАВИГАЦИЯ
========================= */
function nextSlide() {
    index++;
    updateSlider();
}

function prevSlide() {
    index--;
    updateSlider();
}

/* =========================
   БЕСКОНЕЧНАЯ ПЕТЛЯ
========================= */
slides.addEventListener('transitionend', () => {
    if (allSlides[index] === firstClone) {
        slides.style.transition = 'none';
        index = 1;
        slides.style.transform = `translateX(-${index * 100}%)`;
    }

    if (allSlides[index] === lastClone) {
        slides.style.transition = 'none';
        index = images.length;
        slides.style.transform = `translateX(-${index * 100}%)`;
    }
});

/* =========================
   АВТОПРОКРУТКА
========================= */
function startAutoSlide() {
    interval = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
    clearInterval(interval);
}

/* =========================
   КНОПКИ
========================= */
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

/* =========================
   СТАРТ
========================= */
startAutoSlide();

