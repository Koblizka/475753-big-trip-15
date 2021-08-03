import {
  TYPES,
  DESCRIPTIONS,
  OFFERS,
  MAX_DAYS_GAP,
  BasePrice
} from './data.js';
import {getRandomInteger} from '../utils/utils.js';
import dayjs from 'dayjs';
import {customAlphabet} from 'nanoid';

const nanoid = customAlphabet('1234567890', 5);

const getRandomType = () => TYPES[getRandomInteger(0, TYPES.length - 1)];

const getNormalizedDate = (daysGap) => dayjs().add(daysGap, 'day').format('YYYY/MM/DD HH:MM');

const getRandomArrivalDates = () => {
  const startDaysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const endDaysGap = getRandomInteger((startDaysGap < 0) ? 0 : startDaysGap, MAX_DAYS_GAP);

  return {
    dateFrom: getNormalizedDate(startDaysGap),
    dateTo: getNormalizedDate(endDaysGap),
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
