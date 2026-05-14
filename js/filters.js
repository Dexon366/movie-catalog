// Глобальные переменные для состояния фильтров
let currentGenre = 'all';
let currentSearch = '';

// Функция обновления положения полоски
function updateSliderPosition(activeBtn) {
    const slider = document.getElementById('genre-slider');
    if (!slider || !activeBtn) return;

    const btnRect = activeBtn.getBoundingClientRect();
    const containerRect = activeBtn.parentElement.getBoundingClientRect();

    const leftPos = btnRect.left - containerRect.left;
    const width = btnRect.width;

    slider.style.left = `${leftPos}px`;
    slider.style.width = `${width}px`;
}

// Поиск
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        if (typeof renderMovies === 'function') {
            renderMovies();
        }
    });
}

// Фильтрация по жанру с анимацией
const genreButtons = document.querySelectorAll('.genre-btn');
if (genreButtons.length > 0) {
    // Устанавливаем начальную позицию полоски для активной кнопки
    const activeBtn = document.querySelector('.genre-btn.active');
    if (activeBtn) {
        setTimeout(() => updateSliderPosition(activeBtn), 10);
    }

    genreButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Меняем активный класс
            genreButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Передвигаем полоску
            updateSliderPosition(btn);

            // Обновляем жанр и перерисовываем
            currentGenre = btn.dataset.genre;
            if (typeof renderMovies === 'function') {
                renderMovies();
            }
        });
    });
}

// При изменении размера окна — пересчитываем позицию полоски
window.addEventListener('resize', () => {
    const activeBtn = document.querySelector('.genre-btn.active');
    if (activeBtn) {
        updateSliderPosition(activeBtn);
    }
});