import {
  TYPES,
  DESTINATION_CITIES,
  DESCRIPTIONS,
  OFFERS,
  BasePrice,
} from './data.js';
import {getRandomInteger} from '../utils/utils.js';
import dayjs from 'dayjs';

const getRandomType = () => TYPES[getRandomInteger(0, TYPES.length)];

const getRandomArrivalDates = () => {
  
};

export const generatePoint = () => {
  type: getRandomType(),
  basePrice: getRandomType(BasePrice.MIN, BasePrice.MAX),
  dateFrom:,
  dateTo:,
  destination:,
  id:,
  is_favorite:,
  offers: [],
};
