import {render, replace, remove} from '../framework/render.js';
import EventView from '../view/event-view.js';
import EditFormView from '../view/edit-form-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

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
  #mode = Mode.DEFAULT;

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

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm() {
    this.#onModeChange();
    this.#mode = Mode.EDITING;

    this.#editFormComponent = new EditFormView(
      this.#point,
      this.#destination,
      this.#model.getOffers(),
      this.#model.getDestinations(),
      this.#handleFormSubmit,
      this.#handleCloseClick
    );

    replace(this.#editFormComponent, this.#pointComponent);
    this.#editFormComponent.setEventListeners();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint() {
    if (this.#editFormComponent === null) {
      return;
    }

    document.removeEventListener('keydown', this.#escKeyDownHandler);

    const editFormComponent = this.#editFormComponent;
    this.#editFormComponent = null;
    this.#mode = Mode.DEFAULT;

    replace(this.#pointComponent, editFormComponent);
    remove(editFormComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#editFormComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
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

    const state = this.#editFormComponent._state;
    const updatedPoint = {
      ...this.#point,
      type: state.type,
      basePrice: state.basePrice,
      dateFrom: state.dateFrom,
      dateTo: state.dateTo,
      isFavorite: state.isFavorite,
      offersIds: state.selectedOffersIds,
      destinationId: state.destinationId
    };

    this.#onDataChange(updatedPoint);
    this.#replaceFormToPoint();
  };

  #handleCloseClick = () => {
    this.#editFormComponent.reset(this.#point);
    this.#replaceFormToPoint();
  };

  destroy() {
    if (this.#pointComponent) {
      remove(this.#pointComponent);
    }

    if (this.#editFormComponent) {
      remove(this.#editFormComponent);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  }
}
