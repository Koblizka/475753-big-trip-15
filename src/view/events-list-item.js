import {
  getDayMonthFormatDate,
  getTime,
  getDateDifference,
  getDuration
} from '../utils/date.js';

const getOffer = (offer) => (
  `<li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    +€&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </li>`
);

const getOffers = (offers) => offers.map((offer) => getOffer(offer)).join('');

const getOffersList = (offers) => (
  `<h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">${getOffers(offers)}</ul>`
);

export const createEventsListItemTemplate = (point) => {
  const {
    offers,
  } = point.offers;

  const isOffers = (getOffers(offers) && offers.length)
    ? getOffersList(offers)
    : '';

  const dateDiference = getDateDifference(point.dateFrom, point.dateTo);
  const duration = getDuration(dateDiference).join(' ');

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${point.dateFrom}">${getDayMonthFormatDate(point.dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${String(point.type).toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${point.type} ${point.destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${point.dateFrom}">${getTime(point.dateFrom)}</time>
          —
          <time class="event__end-time" datetime="${point.dateTo}">${getTime(point.dateTo)}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>
      <p class="event__price">
        €&nbsp;<span class="event__price-value">${point.basePrice}</span>
      </p>
        ${isOffers}
      <button class="event__favorite-btn" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};
