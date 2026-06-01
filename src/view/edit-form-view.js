import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';

const createEditFormTemplate = (state, destination, allOffers) => {
  const {type, basePrice, dateFrom, dateTo, selectedOffersIds} = state;

  const createOfferSelectorTemplate = (offer) => {
    const isChecked = selectedOffersIds.includes(offer.id);
    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden"
               id="event-offer-${offer.id}-1"
               type="checkbox"
               name="event-offer-${offer.id}"
               ${isChecked ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${offer.id}-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `;
  };

  const offersForType = allOffers.find((offerGroup) => offerGroup.type === type)?.offers || [];
  const offersTemplate = offersForType.map((offer) => createOfferSelectorTemplate(offer)).join('');

  // Форматирование дат для отображения в input
  const formattedDateFrom = dateFrom ? dayjs(dateFrom).format('DD/MM/YYYY HH:mm') : '';
  const formattedDateTo = dateTo ? dayjs(dateTo).format('DD/MM/YYYY HH:mm') : '';

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type === 'taxi' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${type === 'bus' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${type === 'train' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${type === 'ship' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${type === 'drive' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${type === 'flight' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${type === 'check-in' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${type === 'sightseeing' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${type === 'restaurant' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1" autocomplete="off">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formattedDateFrom}" placeholder="DD/MM/YYYY HH:mm">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formattedDateTo}" placeholder="DD/MM/YYYY HH:mm">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${offersTemplate}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description || ''}</p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${(destination.pictures || []).map((pic) => `
                  <img class="event__photo" src="${pic.src}" alt="${pic.description || ''}">
                `).join('')}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>
  `;
};

export default class EditFormView extends AbstractStatefulView {
  #allOffers = null;
  #allDestinations = null;
  #onFormSubmit = null;
  #onCloseClick = null;
  #destination = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor(point, destination, allOffers, allDestinations, onFormSubmit, onCloseClick) {
    super();
    this._state = EditFormView.convertPointToState(point);
    this.#destination = destination;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#onFormSubmit = onFormSubmit;
    this.#onCloseClick = onCloseClick;

    this._setInnerHandlers();
  }

  static convertPointToState(point) {
    return {
      type: point.type,
      basePrice: point.basePrice,
      dateFrom: point.dateFrom,
      dateTo: point.dateTo,
      isFavorite: point.isFavorite,
      selectedOffersIds: [...point.offersIds],
      destinationId: point.destinationId
    };
  }

  get template() {
    return createEditFormTemplate(this._state, this.#destination, this.#allOffers);
  }

  _restoreHandlers() {
    this._setInnerHandlers();
    this.setEventListeners();
  }

  _setInnerHandlers() {
    this.onTypeChange = this.#handleTypeChange.bind(this);
    this.onOfferChange = this.#handleOfferChange.bind(this);
    this.onDestinationChange = this.#handleDestinationChange.bind(this);
  }

  setEventListeners() {
    const form = this.element.querySelector('form');
    if (form) {
      form.addEventListener('submit', this.#onFormSubmit);
    }

    const rollupBtn = this.element.querySelector('.event__rollup-btn');
    if (rollupBtn) {
      rollupBtn.addEventListener('click', this.#onCloseClick);
    }

    this.element.querySelectorAll('.event__type-input').forEach((input) => {
      input.addEventListener('change', this.onTypeChange);
    });

    this.element.querySelectorAll('.event__offer-checkbox').forEach((checkbox) => {
      checkbox.addEventListener('change', this.onOfferChange);
    });

    const destinationInput = this.element.querySelector('.event__input--destination');
    if (destinationInput) {
      destinationInput.addEventListener('change', this.onDestinationChange);
    }

    // Настройка flatpickr для даты начала
    const startDateInput = this.element.querySelector('#event-start-time-1');
    if (startDateInput) {
      this.#datepickerFrom = flatpickr(startDateInput, {
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
        locale: {
          firstDayOfWeek: 1
        },
        onChange: (selectedDates) => {
          if (selectedDates[0]) {
            const newDateFrom = dayjs(selectedDates[0]).format('YYYY-MM-DDTHH:mm');
            this.updateElement({ dateFrom: newDateFrom });

            // Обновляем minDate для даты конца
            if (this.#datepickerTo) {
              this.#datepickerTo.set('minDate', selectedDates[0]);
            }
          }
        }
      });
    }

    // Настройка flatpickr для даты конца
    const endDateInput = this.element.querySelector('#event-end-time-1');
    if (endDateInput) {
      this.#datepickerTo = flatpickr(endDateInput, {
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
        locale: {
          firstDayOfWeek: 1
        },
        onChange: (selectedDates) => {
          if (selectedDates[0]) {
            const newDateTo = dayjs(selectedDates[0]).format('YYYY-MM-DDTHH:mm');
            this.updateElement({ dateTo: newDateTo });
          }
        }
      });
    }

    // Устанавливаем начальные значения для datepicker
    if (this.#datepickerFrom && this._state.dateFrom) {
      this.#datepickerFrom.setDate(dayjs(this._state.dateFrom).toDate());
    }
    if (this.#datepickerTo && this._state.dateTo) {
      this.#datepickerTo.setDate(dayjs(this._state.dateTo).toDate());
    }
  }

  #handleTypeChange = (evt) => {
    evt.preventDefault();
    const newType = evt.target.value;
    this.updateElement({
      type: newType,
      selectedOffersIds: []
    });
  };

  #handleOfferChange = (evt) => {
    const offerId = evt.target.name.split('-').pop();
    const isChecked = evt.target.checked;

    const newSelectedOffersIds = [...this._state.selectedOffersIds];

    if (isChecked) {
      newSelectedOffersIds.push(offerId);
    } else {
      const index = newSelectedOffersIds.indexOf(offerId);
      if (index > -1) {
        newSelectedOffersIds.splice(index, 1);
      }
    }

    this.updateElement({ selectedOffersIds: newSelectedOffersIds });
  };

  #handleDestinationChange = (evt) => {
    const destinationName = evt.target.value;
    const newDestination = this.#allDestinations.find((dest) => dest.name === destinationName);

    if (newDestination) {
      this.#destination = newDestination;
      this.updateElement({
        destinationId: newDestination.id
      });
    }
  };

  reset(point) {
    this._state = EditFormView.convertPointToState(point);
    this.#destination = this.#allDestinations.find((dest) => dest.id === point.destinationId);
    this.updateElement({});

    // Обновляем значения datepicker при сбросе
    if (this.#datepickerFrom && point.dateFrom) {
      this.#datepickerFrom.setDate(dayjs(point.dateFrom).toDate());
    }
    if (this.#datepickerTo && point.dateTo) {
      this.#datepickerTo.setDate(dayjs(point.dateTo).toDate());
    }
  }

  removeDatepickers() {
    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  removeElement() {
    this.removeDatepickers();
    super.removeElement();
  }
}
