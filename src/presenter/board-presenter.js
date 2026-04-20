import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/edit-point-view.js';
import { render, replace } from '../framework/render.js';

export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #filterContainer = null;

  #filterComponent = new FilterView();
  #sortComponent = new SortView();
  #eventListComponent = new EventListView();

  #boardPoints = [];
  #destinations = [];
  #offers = [];

  constructor(config) {
    this.#container = config.container;
    this.#pointsModel = config.pointsModel;
    this.#filterContainer = document.querySelector('.trip-controls__filters');
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.getPoints()];
    this.#destinations = [...this.#pointsModel.getDestinations()];
    this.#offers = [...this.#pointsModel.getOffers()];

    render(this.#filterComponent, this.#filterContainer);
    render(this.#sortComponent, this.#container);
    render(this.#eventListComponent, this.#container);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  }

  #renderPoint(point) {
    const destination = this.#destinations.find((d) => d.id === point.destination);
    const typeOffers = this.#offers.find((o) => o.type === point.type).offers;
    const pointOffers = typeOffers.filter((offer) => point.offers.includes(offer.id));

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      destination,
      offers: pointOffers,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new PointEditView({
      point,
      destination,
      offers: pointOffers,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onRollupClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#eventListComponent.element);
  }
}
