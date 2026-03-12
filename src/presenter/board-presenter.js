import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/edit-point-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  constructor(config) {
    this.container = config.container;
    this.pointsModel = config.pointsModel;
    this.filterContainer = document.querySelector('.trip-controls__filters');
    this.filterComponent = new FilterView();
    this.sortComponent = new SortView();
    this.eventListComponent = new EventListView();
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];
    this.destinations = [...this.pointsModel.getDestinations()];
    this.offers = [...this.pointsModel.getOffers()];

    render(this.filterComponent, this.filterContainer);
    render(this.sortComponent, this.container);
    render(this.eventListComponent, this.container);

    const eventsListElement = this.eventListComponent.getElement();

    const firstPoint = this.boardPoints[0];
    const firstDestination = this.destinations.find((d) => d.id === firstPoint.destination);
    const firstOffers = this.offers.find((o) => o.type === firstPoint.type).offers;

    render(new PointEditView({
      point: firstPoint,
      destination: firstDestination,
      offers: firstOffers
    }), eventsListElement);

    for (let i = 1; i < this.boardPoints.length; i++) {
      const point = this.boardPoints[i];
      const destination = this.destinations.find((d) => d.id === point.destination);
      const typeOffers = this.offers.find((o) => o.type === point.type).offers;
      const pointOffers = typeOffers.filter((offer) => point.offers.includes(offer.id));

      render(new PointView({
        point,
        destination,
        offers: pointOffers
      }), eventsListElement);
    }
  }
}
