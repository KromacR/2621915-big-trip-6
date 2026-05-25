import AbstractView from '../framework/view/abstract-view.js';

const createSortTemplate = () => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">

    <div class="trip-sort__item  trip-sort__item--day">
      <input
        data-sort-type="day"
        id="sort-day"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        checked
      >
      <label class="trip-sort__btn" for="sort-day">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input
        id="sort-event"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        disabled
      >
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input
        data-sort-type="time"
        id="sort-time"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
      >
      <label class="trip-sort__btn" for="sort-time">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input
        data-sort-type="price"
        id="sort-price"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
      >
      <label class="trip-sort__btn" for="sort-price">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input
        id="sort-offer"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        disabled
      >
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>

  </form>
`;

export default class SortView extends AbstractView {
  constructor(onSortTypeChange) {
    super();
    this._onSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.dataset.sortType) {
      return;
    }

    this._onSortTypeChange(evt.target.dataset.sortType);
  };
}
