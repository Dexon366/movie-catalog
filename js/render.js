// Функция отрисовки карточек (использует глобальные переменные movies, filters, currentGenre, currentSearch)
function renderMovies() {
    const grid = document.getElementById('movies-grid');
    if (!grid) return;

    // 1. Фильтрация фильмов
    let filtered = movies.filter(movie => {
        // Фильтр по жанру (если выбран не "все")
        if (currentGenre !== 'all' && movie.genre !== currentGenre) {
            return false;
        }
        // Поиск по названию (без учёта регистра)
        if (currentSearch && !movie.title.toLowerCase().includes(currentSearch.toLowerCase())) {
            return false;
        }
        return true;
    });

    // 2. Сортировка по рейтингу (от большего к меньшему)
    filtered.sort((a, b) => b.rating - a.rating);

    // 3. Если фильмов нет — показываем сообщение
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="no-results">😢 Ничего не найдено. Попробуйте изменить параметры поиска.</div>';
        return;
    }

    // 4. Отрисовка каждой карточки
    grid.innerHTML = '';

    filtered.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.dataset.id = movie.id;

        // Постер (если есть ссылка — используем, если нет — заглушка)
        const posterHtml = movie.posterUrl
            ? `<div class="movie-poster" style="background-image: url('${movie.posterUrl}'); background-size: cover;"></div>`
            : `<div class="movie-poster">🎬</div>`;

        // Определяем текст кнопки избранного
        const favButtonText = isFavorite(movie.id) ? '❤️ В избранном' : '🖤 В избранное';

        card.innerHTML = `
            ${posterHtml}
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-year">${movie.year}</div>
                <div class="movie-rating">${movie.rating}</div>
                <div class="movie-genre">${movie.genre}</div>
                <button class="favorite-btn" data-id="${movie.id}">${favButtonText}</button>
            </div>
        `;

        // Открытие модального окна при клике на карточку (не на кнопку)
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('favorite-btn')) return;
            openModal(movie);
        });

        grid.appendChild(card);
    });

    // 5. Навешиваем обработчики на кнопки избранного
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const movieId = parseInt(btn.dataset.id);
            const movie = movies.find(m => m.id === movieId);
            if (movie) {
                toggleFavorite(movie);
                renderMovies(); // перерисовываем, чтобы обновить текст кнопки
            }
        });
    });
}

// Сообщение "Ничего не найдено" в стиле Кинопоиска
const styleNoResults = document.createElement('style');
styleNoResults.textContent = `
    .no-results {
        grid-column: 1 / -1;
        text-align: center;
        padding: 60px 20px;
        font-size: 18px;
        color: #666;
        background: #f9f9f9;
        border-radius: 16px;
        margin: 40px 0;
    }
`;
document.head.appendChild(styleNoResults);