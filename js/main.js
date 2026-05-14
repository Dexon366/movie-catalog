// main.js — точка входа

console.log("main.js загружен");

function initApp() {
    console.log("initApp запущена");

    if (typeof loadFavorites === 'function') {
        loadFavorites();
    }

    if (typeof renderMovies === 'function') {
        renderMovies();
    } else {
        console.error("renderMovies не функция!");
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}