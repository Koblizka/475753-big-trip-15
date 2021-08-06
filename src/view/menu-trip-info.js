import {getDayMonthFormatDate} from '../utils/utils.js';

const TRIP_ROUTE_LENGTH = 3;

export const createMainMenuInfoTemplate = (points) => {
  const tripRoute = `${points[0].destination.name} &mdash; ${points.length > TRIP_ROUTE_LENGTH ? '...' : points[1].destination.name} &mdash; ${points[points.length - 1].destination.name}`;

  const dateFromUnits = getDayMonthFormatDate(points[0].dateFrom).split(' ');
  const dateToUnits = getDayMonthFormatDate(points[points.length - 1].dateFrom).split(' ');

  const tripDuration = dateFromUnits[0] === dateToUnits[0]
    ? `${dateFromUnits[0]} ${dateFromUnits[1]}&nbsp;&mdash;&nbsp;${dateToUnits[1]}`
    : `${dateFromUnits[0]} ${dateFromUnits[1]}&nbsp;&mdash;&nbsp;${dateToUnits[0]} ${dateToUnits[1]}`;

  const getTotalTripPrice = points.reduce((acc, currentPoint) => acc + currentPoint.basePrice, 0);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripRoute}</h1>

      <p class="trip-info__dates">${tripDuration}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalTripPrice}</span>
    </p>
  </section>`;
};
