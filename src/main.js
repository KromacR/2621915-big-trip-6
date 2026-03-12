import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';

const tripEventsContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();

const tripPresenter = new BoardPresenter({
  container: tripEventsContainer,
  pointsModel
});

tripPresenter.init();
