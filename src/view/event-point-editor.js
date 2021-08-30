import { getFormatedDate} from '../utils/date.js';
import {
  getOfferName,
  getNewDestinationFieldValue,
  getNewOffers
} from '../utils/point.js';
import {
  TYPES,
  DESTINATIONS } from '../mock/data.js';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const PointEditorModeButtons = {
  EDIT: 'Delete',
  CREATE: 'Cancel',
};

const getDestinationItem = (destinationName) => `<option value="${destinationName.name}"></option>`;

const getDestinationList = () => DESTINATIONS.map((destination) => getDestinationItem(destination)).join('');

const getEventType = (eventTypeData, currentType) => {
  const lowerCaseType = eventTypeData.toLowerCase();

  return (
    `<div class="event__type-item">
      <input id="event-type-${lowerCaseType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowerCaseType}" ${lowerCaseType === currentType.toLowerCase() ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${lowerCaseType}" for="event-type-${lowerCaseType}-1">${eventTypeData}</label>
    </div>`
  );
};

const getEventTypeGroup = (currentType) => TYPES.map((type) => getEventType(type, currentType)).join('');

const getRollupButton = (buttonMode) => {
  if (buttonMode === PointEditorModeButtons.EDIT) {
    return (
      `<button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
      </button>`
    );
  }
};

const getOffer = (offer) => (
  `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getOfferName(offer.title)}-1"
    type="checkbox" name="event-offer-${getOfferName(offer.title)}">
    <label class="event__offer-label" for="event-offer-${getOfferName(offer.title)}-1">
      <span class="event__offer-title">${offer.title}</span>
      +€&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`
);

const getOffers = (offers) => offers.map((offer) => getOffer(offer)).join('');

const getOffersList = (offers) => (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${getOffers(offers)}
    </div>
  </section>`
);

const getPhoto = (photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;

const getPhotos = (photos) => photos.map((photo) => getPhoto(photo)).join('');

const getPhotosList = (photos) => (
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${getPhotos(photos)}
    </div>
  </div>`
);

const getDescription = (description) => `<p class="event__destination-description">${description}</p>`;

const getDestination = ({description, pictures}, isDescription, isPhotos) => (
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${isDescription ? getDescription(description) : ''}
    ${isPhotos ? getPhotosList(pictures) : ''}
  </section>`
);

const getDetails = ({offers, destination, isOffers, isDescription, isPhotos}) => (
  `<section class="event__details">
    ${isOffers ? getOffersList(offers.offers) : ''}
    ${(isDescription || isPhotos) ? getDestination(destination, isDescription, isPhotos) : ''}
  </section>`
);

const createEventPointEditorTemplate = (editorModeButton, data) => (
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${data.type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${getEventTypeGroup(data.type)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${data.type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${data.destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${getDestinationList()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${data.dateFrom}">
          —
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${data.dateTo}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${data.basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${editorModeButton}</button>
        ${getRollupButton(editorModeButton)}
      </header>
        ${getDetails(data)}
    </form>
  </li>`
);

export {PointEditorModeButtons};
export default class EventPointEditor extends SmartView{
  constructor(mode, point) {
    super();

    this._data = point;
    this._mode = mode;
    this._datepickrFrom = null;
    this._datepickrTo = null;

    this._clickRollupHandler = this._clickRollupHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._changeEventTypeHandler = this._changeEventTypeHandler.bind(this);
    this._changeDestinationHandler = this._changeDestinationHandler.bind(this);
    this._changeDateFromHandler = this._changeDateFromHandler.bind(this);
    this._changeDateToHandler = this._changeDateToHandler.bind(this);
    this._changePriceHandler = this._changePriceHandler.bind(this);

    this._setInnerHandlers();

    this._setDatepickrFrom();
    this._setDatepickrTo();
  }

  getTemplate() {
    return createEventPointEditorTemplate(this._mode, EventPointEditor.parsePointToData(this._data));
  }

  reset(point) {
    this.updateData(
      EventPointEditor.parsePointToData(point),
    );
  }

  setClickRollupHandler(callback) {
    this._callback.rollupClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._clickRollupHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickrFrom();
    this._setDatepickrTo();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _setDatepickrFrom() {
    if (this._datepickrFrom) {
      this._datepickrFrom.destroy();
      this._datepickrFrom = null;
    }

    this._datepickrFrom = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'j/m/Y H:i',
        defaultDate: getFormatedDate(this._data.dateFrom),
        onChange: this._changeDateFromHandler,
        minDate: getFormatedDate(this._data.dateFrom),
      },
    );
  }

  _setDatepickrTo() {
    if (this._datepickrTo) {
      this._datepickrTo.destroy();
      this._datepickrTo = null;
    }

    this._datepickrTo = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'j/m/Y H:i',
        defaultDate: getFormatedDate(this._data.dateTo),
        onChange: this._changeDateToHandler,
        minDate: getFormatedDate(this._data.dateFrom),
      },
    );
  }

  _changeDateFromHandler([userDate]) {
    this.updateData(
      {
        dateFrom: userDate,
        dateTo: (this._data.dateTo < userDate) ? userDate : this._data.dateTo,
      },
    );
  }

  _changeDateToHandler([userDate]) {
    this.updateData(
      {
        dateTo: userDate,
      },
    );
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._changeEventTypeHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._changeDestinationHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('input', this._changePriceHandler);
  }

  _clickRollupHandler(evt) {
    evt.preventDefault();
    this._callback.rollupClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventPointEditor.parseDataToPoint(this._data));
  }

  _changeEventTypeHandler(evt) {
    evt.preventDefault();

    this.updateData(
      {
        type: evt.target.value,
        offers: {
          offers: getNewOffers(evt.target.value),
        },
      },
    );
  }

  _changeDestinationHandler(evt) {
    evt.preventDefault();

    this.updateData(
      {
        destination: {
          name: evt.target.value,
          description: getNewDestinationFieldValue(evt.target.value, 'description'),
          pictures: getNewDestinationFieldValue(evt.target.value, 'pictures'),
        },
      },
    );
  }

  _changePriceHandler(evt) {
    evt.preventDefault();

    this.updateData(
      {
        basePrice: evt.target.value,
      },
      true);
  }

  static parsePointToData(point) {

    return Object.assign(
      {},
      point,
      {
        isOffers: Boolean(point.offers.offers && point.offers.offers.length),
        isDescription: Boolean(point.destination.description && point.destination.description.length),
        isPhotos: Boolean(point.destination.pictures && point.destination.pictures.length),
      },
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    delete data.isOffers;
    delete data.isDescription;
    delete data.isPhotos;

    return data;
  }
}
