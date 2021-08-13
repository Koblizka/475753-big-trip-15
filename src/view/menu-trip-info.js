import {getDayMonthFormatDate} from '../utils/date.js';
import Abstract from '../view/abstract.js';

const POINTS_TO_SHOW = 3;
const PointsOnRoute = {
  FIRST: 0,
  SECOND: 1,
};

const getTripRoute = (routePoints) => (
  `${routePoints[PointsOnRoute.FIRST].destination.name} &mdash; ${(routePoints.length <= POINTS_TO_SHOW) ? routePoints[PointsOnRoute.SECOND].destination.name : '...'} &mdash; ${routePoints[routePoints.length - 1].destination.name}`
);

const getTripDuration = (routePoints) => {
  const dateFromUnits = getDayMonthFormatDate(routePoints[PointsOnRoute.FIRST].dateFrom).split(' ');
  const dateToUnits = getDayMonthFormatDate(routePoints[routePoints.length - 1].dateTo).split(' ');

  const startingMonth = dateFromUnits[0];
  const endingMonth = dateToUnits[0];
  const sartingDate = dateFromUnits[1];
  const endingDate = dateToUnits[1];

  return (startingMonth === endingMonth)
    ? `${startingMonth} ${sartingDate}&nbsp;&mdash;&nbsp;${endingDate}`
    : `${startingMonth} ${sartingDate}&nbsp;&mdash;&nbsp;${endingMonth} ${endingDate}`;
};

const getTotalTripPrice = (routePoints) => routePoints.reduce((acc, currentPoint) => acc + currentPoint.basePrice, 0);

const createMainMenuInfoTemplate = (points) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getTripRoute(points)}</h1>

      <p class="trip-info__dates">${getTripDuration(points)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalTripPrice(points)}</span>
    </p>
  </section>`
);

export default class MainMenuInfo extends Abstract{
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createMainMenuInfoTemplate(this._points);
  }
}
