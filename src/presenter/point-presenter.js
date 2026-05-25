import {render, replace, remove} from '../framework/render.js';
import EventView from '../view/event-view.js';
import EditFormView from '../view/edit-form-view.js';

export default class PointPresenter {
  #eventsListContainer = null;
  #pointComponent = null;
  #editFormComponent = null;
  #point = null;
  #destination = null;
  #offers = null;
  #model = null;
  #onDataChange = null;
  #onModeChange = null;

  constructor(eventsListContainer, model, onDataChange, onModeChange) {
    this.#eventsListContainer = eventsListContainer;
    this.#model = model;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;
    this.#destination = this.#model.getDestinationById(point.destinationId);
    this.#offers = this.#model.getOffersByType(point.type)
      .filter((offer) => point.offersIds.includes(offer.id));

    this.#renderPoint();
  }

  resetView() {
    if (this.#editFormComponent) {
      this.#replaceFormToPoint();
    }
  }

  #renderPoint() {
    const prevPointComponent = this.#pointComponent;

    this.#pointComponent = new EventView(
      this.#point,
      this.#destination,
      this.#offers,
      this.#handleEditClick,
      this.#handleFavoriteClick
    );

    if (prevPointComponent) {
      replace(this.#pointComponent, prevPointComponent);
      remove(prevPointComponent);
    } else {
      render(this.#pointComponent, this.#eventsListContainer);
    }

    this.#pointComponent.setEventListeners();
  }

  #replacePointToForm() {
    const prevEditFormComponent = this.#editFormComponent;

    this.#editFormComponent = new EditFormView(
      this.#point,
      this.#destination,
      this.#offers,
      this.#handleFormSubmit,
      this.#handleFormClose
    );

    if (prevEditFormComponent) {
      replace(this.#editFormComponent, prevEditFormComponent);
      remove(prevEditFormComponent);
    } else {
      replace(this.#editFormComponent, this.#pointComponent);
    }

    this.#editFormComponent.setEventListeners();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint() {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#editFormComponent.element.replaceWith(this.#pointComponent.element);
    remove(this.#editFormComponent);
    this.#editFormComponent = null;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#onModeChange();
    this.#replacePointToForm();
  };

  #handleFavoriteClick = () => {
    const updatedPoint = {
      ...this.#point,
      isFavorite: !this.#point.isFavorite
    };
    this.#onDataChange(updatedPoint);
  };

  #handleFormSubmit = (evt) => {
    evt.preventDefault();
    this.#replaceFormToPoint();
  };

  #handleFormClose = () => {
    this.#replaceFormToPoint();
  };
}
