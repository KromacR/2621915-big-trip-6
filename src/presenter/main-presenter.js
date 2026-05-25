import {render, remove} from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import NoPointsView from '../view/no-points-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import Model from '../model/model.js';
import {FilterType, SortType} from '../const.js';

export default class MainPresenter {
  #filtersContainer = null;
  #eventsContainer = null;
  #model = null;
  #eventsList = null;
  #noPointsComponent = null;
  #currentFilter = FilterType.EVERYTHING;
  #currentSortType = SortType.DAY;
  #pointPresenters = new Map();

  constructor() {
    this.#filtersContainer = document.querySelector('.trip-controls__filters');
    this.#eventsContainer = document.querySelector('.trip-events');
    this.#model = new Model();
  }

  init() {
    render(new FiltersView(), this.#filtersContainer);

    this.sortComponent = new SortView(this.#handleSortTypeChange);
    render(this.sortComponent, this.#eventsContainer);

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

  #sortPoints(points) {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...points].sort((a, b) =>
          (new Date(b.dateTo) - new Date(b.dateFrom)) -
          (new Date(a.dateTo) - new Date(a.dateFrom))
        );

      case SortType.PRICE:
        return [...points].sort((a, b) => b.basePrice - a.basePrice);

      case SortType.DAY:
      default:
        return [...points].sort((a, b) =>
          new Date(a.dateFrom) - new Date(b.dateFrom)
        );
    }
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPoints() {
    const points = this.#sortPoints(this.#getFilteredPoints());

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

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderPoints();
  };

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
