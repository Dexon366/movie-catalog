// Получаем элементы модального окна
const modal = document.getElementById('modal');
const modalPoster = document.getElementById('modal-poster');
const modalTitle = document.getElementById('modal-title');
const modalYear = document.getElementById('modal-year');
const modalRating = document.getElementById('modal-rating');
const modalGenre = document.getElementById('modal-genre');
const modalDuration = document.getElementById('modal-duration');
const modalDirector = document.getElementById('modal-director');
const modalDescription = document.getElementById('modal-description');
const modalFavBtn = document.getElementById('modal-fav-btn');
const modalTrailerBtn = document.getElementById('modal-trailer-btn');
const modalClose = document.querySelector('.modal-close');

let currentMovie = null;

// Открытие модального окна
function openModal(movie) {
    if (!modal) return;

    currentMovie = movie;

    // Заполняем данные
    modalTitle.textContent = movie.title;
    modalYear.textContent = movie.year || '—';
    modalRating.textContent = movie.rating ? `⭐ ${movie.rating}` : '⭐ —';
    modalGenre.textContent = movie.genre || '—';
    modalDuration.textContent = movie.duration || '—';
    modalDirector.textContent = movie.director || '—';
    modalDescription.textContent = movie.description || 'Описание отсутствует';

    // Постер
    if (movie.posterUrl && movie.posterUrl !== '') {
        modalPoster.style.backgroundImage = `url('${movie.posterUrl}')`;
        modalPoster.style.backgroundSize = 'cover';
        modalPoster.style.backgroundPosition = 'center';
        modalPoster.style.backgroundRepeat = 'no-repeat';
        modalPoster.textContent = '';
    } else {
        modalPoster.style.backgroundImage = 'none';
        modalPoster.textContent = '🎬';
        modalPoster.style.display = 'flex';
        modalPoster.style.alignItems = 'center';
        modalPoster.style.justifyContent = 'center';
        modalPoster.style.fontSize = '64px';
    }

    // Обновляем кнопку избранного
    updateModalFavButton();

    // Показываем окно
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // запрещаем скролл фона
}

// Закрытие модального окна
function closeModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // возвращаем скролл
        currentMovie = null;
    }
}

// Обновление кнопки избранного в модальном окне
function updateModalFavButton() {
    if (!modalFavBtn || !currentMovie) return;

    if (isFavorite(currentMovie.id)) {
        modalFavBtn.textContent = '❤️ В избранном';
        modalFavBtn.classList.add('active');
    } else {
        modalFavBtn.textContent = '🤍 В избранное';
        modalFavBtn.classList.remove('active');
    }
}

// Обработчик кнопки избранного в модалке
if (modalFavBtn) {
    modalFavBtn.addEventListener('click', () => {
        if (currentMovie) {
            toggleFavorite(currentMovie);
            updateModalFavButton();
            // Обновляем карточки на главной (если функция существует)
            if (typeof renderMovies === 'function') {
                renderMovies();
            }
        }
    });
}

// Обработчик кнопки трейлера
if (modalTrailerBtn) {
    modalTrailerBtn.addEventListener('click', () => {
        if (currentMovie && currentMovie.trailerUrl) {
            window.open(currentMovie.trailerUrl, '_blank');
        } else if (currentMovie) {
            alert('Трейлер для этого фильма пока не добавлен.');
        }
    });
}

// Закрытие по крестику
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// Закрытие по клику на фон
if (modal) {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Закрытие по Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && modal.style.display === 'flex') {
        closeModal();
    }
});