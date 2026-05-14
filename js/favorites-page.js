function renderFavorites() {
    const grid = document.getElementById('favorites-grid');
    if (!grid) return;

    // Получаем избранное через глобальную переменную favorites (из favorites.js)
    const favoriteMovies = getAllFavorites ? getAllFavorites() : favorites;

    if (favoriteMovies.length === 0) {
        grid.innerHTML = `
            <div class="no-results" style="grid-column:1/-1; text-align:center; padding:60px;">
                😢 Здесь пока ничего нет.<br>
                Добавьте фильмы в избранное на <a href="index.html">главной странице</a>.
            </div>
        `;
        return;
    }

    grid.innerHTML = '';

    favoriteMovies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';

        const posterHtml = movie.posterUrl
            ? `<div class="movie-poster" style="background-image: url('${movie.posterUrl}'); background-size: cover; background-position: center;"></div>`
            : `<div class="movie-poster">🎬</div>`;

        card.innerHTML = `
            ${posterHtml}
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-year">${movie.year}</div>
                <div class="movie-rating">⭐ ${movie.rating}</div>
                <div class="movie-genre">${movie.genre}</div>
                <button class="favorite-btn remove-fav" data-id="${movie.id}">🗑️ Удалить из избранного</button>
            </div>
        `;

        // Клик по карточке — открываем модалку (можно подключить modal.js, но для простоты оставим пока)
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-fav')) return;
            if (typeof openModal === 'function') {
                openModal(movie);
            } else {
                console.warn("openModal не найдена, проверь подключение modal.js");
            }
        });

        grid.appendChild(card);
    });

    // Обработчики для кнопок удаления
    document.querySelectorAll('.remove-fav').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const movieId = parseInt(btn.dataset.id);
            removeFromFavorites(movieId);
            renderFavorites(); // перерисовываем
            updateFavoriteCount(); // обновляем счётчик в шапке
        });
    });
}

// Инициализация при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadFavorites();
        renderFavorites();
        updateFavoriteCount();
    });
} else {
    loadFavorites();
    renderFavorites();
    updateFavoriteCount();
}