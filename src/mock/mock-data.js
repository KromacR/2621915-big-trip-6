const destinations = [
  {
    id: '1',
    name: 'Amsterdam',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    pictures: [
      {src: 'https://loremflickr.com/248/152?random=1'},
      {src: 'https://loremflickr.com/248/152?random=2'},
      {src: 'https://loremflickr.com/248/152?random=3'}
    ]
  },
  {
    id: '2',
    name: 'Geneva',
    description: 'Cras aliquet varius magna, non porta ligula feugiat eget.',
    pictures: [
      {src: 'https://loremflickr.com/248/152?random=4'},
      {src: 'https://loremflickr.com/248/152?random=5'},
      {src: 'https://loremflickr.com/248/152?random=6'}
    ]
  },
  {
    id: '3',
    name: 'Chamonix',
    description: 'Fusce tristique felis at fermentum pharetra.',
    pictures: [
      {src: 'https://loremflickr.com/248/152?random=7'},
      {src: 'https://loremflickr.com/248/152?random=8'},
      {src: 'https://loremflickr.com/248/152?random=9'}
    ]
  }
];

const offers = [
  {
    type: 'taxi',
    offers: [
      {id: '1', title: 'Order Uber', price: 20}
    ]
  },
  {
    type: 'flight',
    offers: [
      {id: '4', title: 'Add luggage', price: 50},
      {id: '5', title: 'Switch to comfort', price: 80}
    ]
  },
  {
    type: 'drive',
    offers: [
      {id: '8', title: 'Rent a car', price: 200}
    ]
  },
  {
    type: 'check-in',
    offers: [
      {id: '11', title: 'Add breakfast', price: 50}
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {id: '14', title: 'Book tickets', price: 40},
      {id: '15', title: 'Lunch in city', price: 30}
    ]
  }
];

const points = [
  {
    id: '1',
    type: 'taxi',
    destinationId: '1',
    offersIds: ['1'],
    basePrice: 20,
    dateFrom: '2019-03-18T10:30',
    dateTo: '2019-03-18T11:00',
    isFavorite: true
  },
  {
    id: '2',
    type: 'flight',
    destinationId: '3',
    offersIds: ['4', '5'],
    basePrice: 160,
    dateFrom: '2019-03-18T12:25',
    dateTo: '2019-03-18T13:35',
    isFavorite: false
  },
  {
    id: '3',
    type: 'drive',
    destinationId: '3',
    offersIds: ['8'],
    basePrice: 160,
    dateFrom: '2019-03-18T14:30',
    dateTo: '2019-03-18T16:05',
    isFavorite: true
  }
];

export{destinations, offers, points};
