const WAY_POINT_AMOUNT = 10;
const DAY_GAP = 0;
const TIME_GAP = 7;
const TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const OFFERS = [
  {
    type: 'taxi',
    offers: [
      {
        title: 'Upgrade to a business class',
        price: 190,
      },
      {
        title: 'Choose the radio station',
        price: 30,
      },
      {
        title: 'Choose temperature',
        price: 170,
      },
      {
        title: 'Drive quickly, I\'m in a hurry',
        price: 100,
      },
      {
        title: 'Drive slowly',
        price: 110,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        title: 'Infotainment system',
        price: 50,
      },
      {
        title: 'Order meal',
        price: 100,
      },
      {
        title: 'Choose seats',
        price: 190,
      },
    ],
  },
  {
    type: 'train',
    offers: [
      {
        title: 'Book a taxi at the arrival point',
        price: 110,
      },
      {
        title: 'Order a breakfast',
        price: 80,
      },
      {
        title: 'Wake up at a certain time',
        price: 140,
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        title: 'Choose meal',
        price: 120,
      },
      {
        title: 'Choose seats',
        price: 90,
      },
      {
        title: 'Upgrade to comfort class',
        price: 120,
      },
      {
        title: 'Upgrade to business class',
        price: 120,
      },
      {
        title: 'Add luggage',
        price: 170,
      },
      {
        title: 'Business lounge',
        price: 160,
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        title: 'Choose the time of check-in',
        price: 70,
      },
      {
        title: 'Choose the time of check-out',
        price: 190,
      },
      {
        title: 'Add breakfast',
        price: 110,
      },
      {
        title: 'Laundry',
        price: 140,
      },
      {
        title: 'Order a meal from the restaurant',
        price: 30,
      },
    ],
  },
  {
    type: 'ship',
    offers: [
      {
        title: 'Choose meal',
        price: 130,
      },
      {
        title: 'Choose seats',
        price: 160,
      },
      {
        title: 'Upgrade to comfort class',
        price: 170,
      },
      {
        title: 'Upgrade to business class',
        price: 150,
      },
      {
        title: 'Add luggage',
        price: 100,
      },
      {
        title: 'Business lounge',
        price: 40,
      },
    ],
  },
  {
    type: 'drive',
    offers: [
      {
        title: 'Choose comfort class',
        price: 110,
      },
      {
        title: 'Choose business class',
        price: 180,
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        title: 'Choose live music',
        price: 150,
      },
      {
        title: 'Choose VIP area',
        price: 70,
      },
    ],
  },
  {
    type: 'sightseeing',
    offers: [],
  },
  {
    type: 'transport',
    offers: [],
  },
];

const DESCRIPTIONS = [
  {
    name: 'Chamonix',
    description: 'Chamonix, middle-eastern paradise, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.02552617030977311',
        description: 'Chamonix street market',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0664632281299169',
        description: 'Chamonix parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.07350229469074754',
        description: 'Chamonix street market',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.10039793912121997',
        description: 'Chamonix parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.6325784179328275',
        description: 'Chamonix zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.5500593804811373',
        description: 'Chamonix central station',
      },
    ],
  },
  {
    name: 'Geneva',
    description: 'Geneva, is a beautiful city, middle-eastern paradise.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.648806396860327',
        description: 'Geneva embankment',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.024599268089686488',
        description: 'Geneva biggest supermarket',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.7004745322751194',
        description: 'Geneva zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.9187678664637844',
        description: 'Geneva central station',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.12225761909309041',
        description: 'Geneva park',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.18361439264468582',
        description: 'Geneva central station',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.8181469572615787',
        description: 'Geneva park',
      },
    ],
  },
  {
    name: 'Amsterdam',
    description: 'Amsterdam, with a beautiful old town, famous for its crowded street markets with the best street food in Asia.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.7617235103526749',
        description: 'Amsterdam park',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.595904969466631',
        description: 'Amsterdam parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.08467833559314109',
        description: 'Amsterdam street market',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.8988014913730948',
        description: 'Amsterdam central station',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.6973007645868792',
        description: 'Amsterdam embankment',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.451000634947597',
        description: 'Amsterdam zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.03937765592367359',
        description: 'Amsterdam central station',
      },
    ],
  },
  {
    name: 'Krakow',
    description: 'Krakow, is a capital of Krakow\'s sausage',
    pictures: [],
  },
  {
    name: 'Phoenix',
    description: '',
    pictures: [],
  },
];

const BasePrice = {
  MIN: 0,
  MAX: 10000,
};

export {
  WAY_POINT_AMOUNT,
  TYPES,
  DESCRIPTIONS,
  OFFERS,
  DAY_GAP,
  TIME_GAP,
  BasePrice
};
