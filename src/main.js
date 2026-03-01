import BoardPresenter from './presenter/board-presenter.js';

const tripEventsContainer = document.querySelector('.trip-events');
const tripPresenter = new BoardPresenter({ container: tripEventsContainer });

tripPresenter.init();
