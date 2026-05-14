// Массив избранных фильмов (глобальный)
let favorites = [];

// Загрузка избранного из localStorage при запуске
function loadFavorites() {
    const stored = localStorage.getItem('movie-favorites');
    if (stored) {
        favorites = JSON.parse(stored);
    } else {
        favorites = [];
    }
    updateFavoriteCount();
}

// Сохранение избранного в localStorage
function saveFavorites() {
    localStorage.setItem('movie-favorites', JSON.stringify(favorites));
    updateFavoriteCount();
}

// Проверка, находится ли фильм в избранном
function isFavorite(movieId) {
    return favorites.some(fav => fav.id === movieId);
}

// Добавление фильма в избранное
function addToFavorites(movie) {
    if (!isFavorite(movie.id)) {
        favorites.push(movie);
        saveFavorites();
        return true;
    }
    return false;
}

// Удаление фильма из избранного
function removeFromFavorites(movieId) {
    const initialLength = favorites.length;
    favorites = favorites.filter(movie => movie.id !== movieId);
    if (favorites.length !== initialLength) {
        saveFavorites();
        return true;
    }
    return false;
}

// Переключение состояния избранного (добавить/удалить)
function toggleFavorite(movie) {
    if (isFavorite(movie.id)) {
        removeFromFavorites(movie.id);
        return false; // фильм удалён из избранного
    } else {
        addToFavorites(movie);
        return true; // фильм добавлен в избранное
    }
}

// Обновление счётчика избранного в шапке сайта
function updateFavoriteCount() {
    const countElement = document.getElementById('favorite-count');
    if (countElement) {
        countElement.textContent = favorites.length;
    }
}

// Получение всех избранных фильмов
function getAllFavorites() {
    return [...favorites];
}