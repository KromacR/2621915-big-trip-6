const CITIES = ['Amsterdam', 'Geneva', 'Chamonix'];

const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'
];

const OFFERS = {
  taxi: ['Extra luggage', 'Child seat'],
  bus: ['Wi-Fi', 'Snacks'],
  train: ['First class', 'Dining car'],
  ship: ['Cabin upgrade', 'Excursion'],
  drive: ['GPS', 'Child seat'],
  flight: ['Add luggage', 'Priority check-in'],
  'check-in': ['Breakfast included', 'Late check-out'],
  sightseeing: ['Guide', 'Skip the line'],
  restaurant: ['Wine pairing', 'Dessert']
};


const mockDestinations = CITIES.map((city, index) => ({
  id: `dest-${index}`,
  description: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)],
  name: city,
  pictures: [
    {
      src: `https://loremflickr.com/248/152?random=${Math.random()}`,
      description: `${city} view`
    }
  ]
}));

const mockOffers = Object.entries(OFFERS).map(([type, titles]) => ({
  type,
  offers: titles.map((title, index) => ({
    id: `offer-${type}-${index + 1}`,
    title,
    price: Math.floor(Math.random() * 200) + 20
  }))
}));

const getRandomElement = (items) =>
  items[Math.floor(Math.random() * items.length)];

const getRandomDate = () => {
  const start = new Date(2019, 2, 18);
  const end = new Date(2019, 2, 25);

  return new Date(start.getTime() + Math.random() * (end - start));
};

const formatDate = (date) => {
  const pad = (n) => n.toString().padStart(2, '0');

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const getRandomOffers = (offers) => {
  const shuffled = [...offers].sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * (offers.length + 1));

  return shuffled.slice(0, count).map((offer) => offer.id);
};

const getRandomPoint = () => {
  const type = getRandomElement(TYPES);

  const typeOffers =
    mockOffers.find((offer) => offer.type === type)?.offers ?? [];

  const dateFrom = getRandomDate();
  const dateTo = new Date(
    dateFrom.getTime() + Math.random() * 3 * 60 * 60 * 1000
  );

  return {
    id: crypto.randomUUID(),
    type,
    destination: getRandomElement(mockDestinations).id,
    basePrice: Math.floor(Math.random() * 1000) + 100,
    dateFrom: formatDate(dateFrom),
    dateTo: formatDate(dateTo),
    isFavorite: Math.random() > 0.5,
    offers: getRandomOffers(typeOffers)
  };
};

const generatePoints = (count = 5) =>
  Array.from({ length: count }, getRandomPoint);

export { mockDestinations, mockOffers, getRandomPoint, generatePoints };
