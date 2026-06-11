import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import Model from './model/model.js';
import FilterModel from './model/filter-model.js';
import TripApiService from './trip-api-service.js';

const RANDOM_STRING_RADIX = 36;
const RANDOM_STRING_SLICE_START = 2;
const AUTHORIZATION = `Basic ${Math.random().toString(RANDOM_STRING_RADIX).slice(RANDOM_STRING_SLICE_START)}`;
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const tripApiService = new TripApiService(END_POINT, AUTHORIZATION);
const pointsModel = new Model({apiService: tripApiService});
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer: document.querySelector('.trip-controls__filters'),
  filterModel,
  pointsModel
});

const tripPresenter = new MainPresenter({
  pointsModel,
  filterModel
});

filterPresenter.init();
tripPresenter.init();
pointsModel.init();
