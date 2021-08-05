import {
  WAY_POINT_AMOUNT,
  TYPES,
  DESCRIPTIONS,
  OFFERS,
  DAY_GAP,
  TIME_GAP,
  BasePrice
} from './data.js';
import {
  getRandomInteger,
  getDate,
  sortByDate
} from '../utils/utils.js';
import {customAlphabet} from 'nanoid';

const nanoid = customAlphabet('1234567890', 5);

const getRandomType = () => TYPES[getRandomInteger(0, TYPES.length - 1)];

const getRandomArrivalDates = () => {
  const startDaysGap = getRandomInteger(-DAY_GAP, DAY_GAP);
  const endDaysGap = getRandomInteger((startDaysGap < 0) ? 0 : startDaysGap, DAY_GAP);

  return {
    dateFrom: getDate(startDaysGap, getRandomInteger(-TIME_GAP, TIME_GAP), getRandomInteger(-TIME_GAP, TIME_GAP)),
    dateTo: getDate(endDaysGap, getRandomInteger(-TIME_GAP, TIME_GAP), getRandomInteger(-TIME_GAP, TIME_GAP)),
  };
};

export const generatePoint = () => ({
  type: getRandomType(),
  basePrice: getRandomInteger(BasePrice.MIN, BasePrice.MAX),
  dateFrom: getRandomArrivalDates().dateFrom,
  dateTo: getRandomArrivalDates().dateTo,
  destination: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  id: nanoid(),
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers: OFFERS[getRandomInteger(0, OFFERS.length - 1)],
});

const points = new Array(WAY_POINT_AMOUNT).fill().map(() => generatePoint());

export const sortedPoints = sortByDate(points);
