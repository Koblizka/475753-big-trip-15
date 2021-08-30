import {
  OFFERS,
  DESTINATIONS
} from '../mock/data.js';

const OFFER_NAME_LENGTH = 2;
const OFFER_NAME_WORD_LENGTH = 1;

const getOfferName = (offerTitle) => {
  const tempName = offerTitle.split(' ');

  return (tempName.length <= OFFER_NAME_LENGTH)
    ? tempName.pop()
    : tempName.slice(-OFFER_NAME_LENGTH, -OFFER_NAME_WORD_LENGTH).pop();
};

const getNewDestinationFieldValue = (lookingValue, lookingField) => {
  const destinationField = DESTINATIONS.find((element) => element.name === lookingValue);

  return (destinationField[lookingField]
      && destinationField[lookingField].length)
    ? destinationField[lookingField]
    : null;
};

const getNewOffers = (lookingValue) => {
  const typeOffers = OFFERS.find((element) => element.type === lookingValue);

  return (typeOffers.offers && typeOffers.offers.length)
    ? typeOffers.offers
    : null;
};

export {
  getOfferName,
  getNewDestinationFieldValue,
  getNewOffers
};
