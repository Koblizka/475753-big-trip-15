import {
  createMainMenuInfoTemplate,
  createMainMenuTripControlTemplate,
  createMainMenuFiltersTemplate,
  createEventsSortTemplate,
  createEventsListTemplate,
  createEventsListItemTemplate,
  createEventPointEditorTemplate,
  createEventEditorOfferTemplate,
  createEventEditorDestinationTemplate,
  createEventEditorDetailsTemplate
} from './utility/view-templates-proxy.js';

const WAY_POINT_AMOUNT = 3;
const WITH_PHOTOS = 'yes';

const headerMainInfoElement = document.querySelector('.trip-main');
const headerNavigationElement = headerMainInfoElement.querySelector('.trip-controls__navigation');
const headerFiltersElement = headerMainInfoElement.querySelector('.trip-controls__filters');
const allEventsElement = document.querySelector('.trip-events');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(headerMainInfoElement, createMainMenuInfoTemplate(), 'afterbegin');
render(headerNavigationElement, createMainMenuTripControlTemplate(), 'beforeend');
render(headerFiltersElement, createMainMenuFiltersTemplate(), 'beforeend');
render(allEventsElement, createEventsSortTemplate(), 'beforeend');
render(allEventsElement, createEventsListTemplate(), 'beforeend');

const eventsListElement = allEventsElement.querySelector('.trip-events__list');

render(eventsListElement, createEventPointEditorTemplate(), 'beforeend');

const eventEditorElement = eventsListElement.querySelector('.event--edit');

render(eventEditorElement, createEventEditorDetailsTemplate(), 'beforeend');

const eventDetailsElement = eventEditorElement.querySelector('.event__details');

render(eventDetailsElement, createEventEditorOfferTemplate(), 'beforeend');
render(eventDetailsElement, createEventEditorDestinationTemplate(WITH_PHOTOS), 'beforeend');

for (let i = 0; i < WAY_POINT_AMOUNT; i++) {
  render(eventsListElement, createEventsListItemTemplate(), 'beforeend');
}
