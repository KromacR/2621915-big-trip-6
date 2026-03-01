import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/edit-point-view.js';
import CreationFormView from '../view/create-form-view.js';
import { render } from '../render.js';

const POINT_COUNT = 3;

export default class BoardPresenter {
  constructor(config) {
    this.container = config.container;
    this.filterContainer = document.querySelector('.trip-controls__filters');
    this.filterComponent = new FilterView();
    this.sortComponent = new SortView();
    this.eventListComponent = new EventListView();
  }

  init() {
    render(this.filterComponent, this.filterContainer);
    render(this.sortComponent, this.container);
    render(this.eventListComponent, this.container);

    const eventsListElement = this.eventListComponent.getElement();
    render(new PointEditView(), eventsListElement);
    render(new CreationFormView(), eventsListElement);

    for (let i = 0; i < POINT_COUNT; i++) {
      render(new PointView(), eventsListElement);
    }
  }
}
