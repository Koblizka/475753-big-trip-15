import { sortedPoints } from './mock/point.js';
import TripRoute from './presenter/trip-route.js';

const headerMainInfoElement = document.querySelector('.trip-main');
const allEventsElement = document.querySelector('.trip-events');

const tripRoute = new TripRoute(headerMainInfoElement, allEventsElement);

tripRoute.init(sortedPoints);
