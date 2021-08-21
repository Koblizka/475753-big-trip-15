import { sortedPoints } from './mock/point.js';
import TripRoute from './presenter/trip-route.js';

const allEventsElement = document.querySelector('.trip-events');

const tripRoute = new TripRoute(allEventsElement);

tripRoute.init(sortedPoints);
