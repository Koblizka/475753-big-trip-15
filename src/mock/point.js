import {
  TYPES,
  DESCRIPTIONS,
  OFFERS,
  MAX_DAYS_GAP,
  BasePrice
} from './data.js';
import {getRandomInteger} from '../utils/utils.js';
import {dayjs} from 'dayjs';
import {customAlphabet} from 'nanoid';

const nanoid = customAlphabet('1234567890', 5);

const getRandomType = () => TYPES[getRandomInteger(0, TYPES.length)];

const getRandomArrivalDates = () => {
  const startDaysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const endDaysGap = getRandomInteger(startDaysGap, MAX_DAYS_GAP);

  return {
    dateFrom: dayjs().add(startDaysGap, 'day').toDate(),
    dateTo: dayjs().add(endDaysGap, 'day').toDate(),
  };
};

export const generatePoint = () => ({
  type: getRandomType(),
  basePrice: getRandomType(BasePrice.MIN, BasePrice.MAX),
  dateFrom: getRandomArrivalDates.dateFrom,
  dateTo: getRandomArrivalDates.dateTo,
  destination: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length)],
  id: nanoid(),
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers: OFFERS[getRandomInteger(0, OFFERS.length)],
});
