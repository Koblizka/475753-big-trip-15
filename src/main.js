import { createMainMenuInfoTemplate } from './view/menu-trip-info';
import { createMainMenuNavigationTemplate } from './view/menu-trip-navigation';
import { createMainMenuFiltersTemplate } from './view/menu-trip-filters';
import { createEventsSortTemplate } from './view/events-sort';
import { createEventsListTemplate } from './view/events-list';
import { createEventPointEditorTemplate } from './view/event-point-editor';
import { createEventsListItemTemplate } from './view/events-list-item';

import { generatePoint } from './mock/point.js';

const WAY_POINT_AMOUNT = 20;

const headerMainInfoElement = document.querySelector('.trip-main');
const headerNavigationElement = headerMainInfoElement.querySelector('.trip-controls__navigation');
const headerFiltersElement = headerMainInfoElement.querySelector('.trip-controls__filters');
const allEventsElement = document.querySelector('.trip-events');
const points = new Array(WAY_POINT_AMOUNT).fill().map(() => generatePoint());

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(headerMainInfoElement, createMainMenuInfoTemplate(), 'afterbegin');
render(headerNavigationElement, createMainMenuNavigationTemplate(), 'beforeend');
render(headerFiltersElement, createMainMenuFiltersTemplate(), 'beforeend');
render(allEventsElement, createEventsSortTemplate(), 'beforeend');
render(allEventsElement, createEventsListTemplate(), 'beforeend');

const eventsListElement = allEventsElement.querySelector('.trip-events__list');
console.log(points[0]);
render(eventsListElement, createEventPointEditorTemplate('none', points[0]), 'beforeend');

for (let i = 0; i < WAY_POINT_AMOUNT; i++) {
  render(eventsListElement, createEventsListItemTemplate(), 'beforeend');
}


// console.log(points);
