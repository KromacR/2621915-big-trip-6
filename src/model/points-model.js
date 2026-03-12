import { getRandomPoint, mockDestinations, mockOffers } from '../mock/mock-data.js';

const POINT_COUNT = 3;

export default class PointsModel {
  points = Array.from({ length: POINT_COUNT }, getRandomPoint);
  destinations = mockDestinations;
  offers = mockOffers;

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
