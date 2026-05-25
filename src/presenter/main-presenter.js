import {render, remove} from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import NoPointsView from '../view/no-points-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import Model from '../model/model.js';
import {FilterType} from '../const.js';

export default class MainPresenter {
  #filtersContainer = null;
  #eventsContainer = null;
  #model = null;
  #eventsList = null;
  #noPointsComponent = null;
  #currentFilter = FilterType.EVERYTHING;
  #pointPresenters = new Map();

  constructor() {
    this.#filtersContainer = document.querySelector('.trip-controls__filters');
    this.#eventsContainer = document.querySelector('.trip-events');
    this.#model = new Model();
  }

  init() {
    render(new FiltersView(), this.#filtersContainer);
    render(new SortView(), this.#eventsContainer);

    const eventsList = document.createElement('ul');
    eventsList.classList.add('trip-events__list');
    this.#eventsContainer.appendChild(eventsList);
    this.#eventsList = eventsList;

    this.#renderPoints();
  }

  #getFilteredPoints() {
    const points = this.#model.getPoints();

    switch (this.#currentFilter) {
      case FilterType.FUTURE:
        return points.filter((point) => new Date(point.dateFrom) > new Date());
      case FilterType.PRESENT:
        return points.filter((point) => {
          const now = new Date();
          return new Date(point.dateFrom) <= now && new Date(point.dateTo) >= now;
        });
      case FilterType.PAST:
        return points.filter((point) => new Date(point.dateTo) < new Date());
      default:
        return points;
    }
  }

  #renderPoints() {
    const points = this.#getFilteredPoints();

    if (points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
      this.#noPointsComponent = null;
    }

    points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(
      this.#eventsList,
      this.#model,
      this.#handlePointUpdate,
      this.#handleModeChange
    );

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handlePointUpdate = (updatedPoint) => {
    const pointPresenter = this.#pointPresenters.get(updatedPoint.id);
    pointPresenter.init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderNoPoints() {
    this.#noPointsComponent = new NoPointsView(this.#currentFilter);
    render(this.#noPointsComponent, this.#eventsList);
  }
}
