import { getFormatedDate } from '../utils/date.js';
import { OFFERS } from '../mock/data.js';
import { sortedPoints } from '../mock/point.js';
import SmartView from './smart.js';

const OFFER_NAME_LENGTH = 2;
const OFFER_NAME_WORD_LENGTH = 1;

const PointEditorModeButtons = {
  EDIT: 'Delete',
  CREATE: 'Cancel',
};

const destinationCitiesNames= new Set();
sortedPoints.forEach((point) => destinationCitiesNames.add(`<option value="${point.destination.name}"></option>`));

const getOfferName = (offerTitle) => {
  const tempName = offerTitle.split(' ');

  return (tempName.length <= OFFER_NAME_LENGTH) ?
    tempName.pop() :
    tempName.slice(-OFFER_NAME_LENGTH, -OFFER_NAME_WORD_LENGTH).pop();
};

const getDestinationList = () => Array.from(destinationCitiesNames).join('');

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
            <img class="event__type-icon" width="17" height="17" src="img/icons/${String(data.type).toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
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
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFormatedDate(data.dateFrom)}">
          —
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFormatedDate(data.dateTo)}">
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
  constructor(editMode, point) {
    super();

    this._data = EventPointEditor.parsePointToData(point);
    this._editMode = editMode;

    this._clickRollupHandler = this._clickRollupHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._changeEventTypeHandler = this._changeEventTypeHandler.bind(this);
    this._changeDestinationHandler = this._changeDestinationHandler.bind(this);
    this._changeDateFromHandler = this._changeDateFromHandler.bind(this);
    this._changeDateToHandler = this._changeDateToHandler.bind(this);
    this._changePriceHandler = this._changePriceHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createEventPointEditorTemplate(this._editMode, this._data);
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
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._changeEventTypeHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._changeDestinationHandler);
    this.getElement().querySelector('.event__field-group--time').addEventListener('input', this._changeDateFromHandler);
    this.getElement().querySelector('.event__field-group--time').addEventListener('input', this._changeDateToHandler);
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

  _getNewOffers(pointType) {
    const typeOffers = OFFERS.find((element) => element.type === pointType);

    return (typeOffers.offers && typeOffers.offers.length)
      ? typeOffers.offers
      : [];
  }

  _getNewDescription(newDestinationName) {
    const destinationDescription = sortedPoints.find((element) => element.destination.name === newDestinationName);

    return (destinationDescription.destination.description
        && destinationDescription.destination.description.length)
      ? destinationDescription.destination.description
      : '';
  }

  _getNewPhotos(newDestinationName) {
    const destinationDescription = sortedPoints.find((element) => element.destination.name === newDestinationName);

    return (destinationDescription.destination.pictures
        && destinationDescription.destination.pictures.length)
      ? destinationDescription.destination.pictures
      : [];
  }

  _changeEventTypeHandler(evt) {
    evt.preventDefault();
    const newOffers = this._getNewOffers(evt.target.value);

    this.updateData(
      {
        type: evt.target.value,
        offers: {
          offers: newOffers,
        },
        isOffers: Boolean(newOffers && newOffers.length),
      },
    );
  }

  _changeDestinationHandler(evt) {
    evt.preventDefault();
    const newDescription = this._getNewDescription(evt.target.value);
    const newPhotos = this._getNewPhotos(evt.target.value);

    this.updateData(
      {
        destination: {
          name: evt.target.value,
          description: newDescription,
          pictures: newPhotos,
        },
        isDescription: Boolean(newDescription && newDescription.length),
        isPhotos: Boolean(newPhotos && newPhotos.length),
      },
    );
  }

  _changeDateFromHandler(evt) {
    evt.preventDefault();

    this.updateData(
      {
        dateFrom: evt.target.value,
      },
      true);
  }

  _changeDateToHandler(evt) {
    evt.preventDefault();

    this.updateData(
      {
        dateFrom: evt.target.value,
      },
      true);
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
        isOffers: !!(point.offers.offers && point.offers.offers.length),
        isDescription: !!(point.destination.description && point.destination.description.length),
        isPhotos: !!(point.destination.pictures && point.destination.pictures.length),
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
