import { createMainMenuInfoTemplate } from './view/menu-trip-info';
import { createMainMenuNavigationTemplate } from './view/menu-trip-navigation';
import { createMainMenuFiltersTemplate } from './view/menu-trip-filters';
import { createEventsSortTemplate } from './view/events-sort';
import { createEventsListTemplate } from './view/events-list';
import { createEventPointEditorTemplate } from './view/event-point-editor';
import { createEventsListItemTemplate } from './view/events-list-item';
import { sortedPoints } from './mock/point.js';
import {
  RenderPosition,
  createElement,
  renderElement,
  renderTemplate
} from './utils/utils.js';

const PointEditorModeButtons = {
  EDIT: 'Delete',
  CREATE: 'Cancel',
};

const headerMainInfoElement = document.querySelector('.trip-main');
const headerNavigationElement = headerMainInfoElement.querySelector('.trip-controls__navigation');
const headerFiltersElement = headerMainInfoElement.querySelector('.trip-controls__filters');
const allEventsElement = document.querySelector('.trip-events');

renderTemplate(headerMainInfoElement, createMainMenuInfoTemplate(sortedPoints), 'afterbegin');
renderTemplate(headerNavigationElement, createMainMenuNavigationTemplate(), 'beforeend');
renderTemplate(headerFiltersElement, createMainMenuFiltersTemplate(), 'beforeend');
renderTemplate(allEventsElement, createEventsSortTemplate(), 'beforeend');
renderTemplate(allEventsElement, createEventsListTemplate(), 'beforeend');

const eventsListElement = allEventsElement.querySelector('.trip-events__list');

renderTemplate(eventsListElement, createEventPointEditorTemplate(PointEditorModeButtons.CREATE, sortedPoints[0]), 'beforeend');

sortedPoints.forEach((point) => renderTemplate(eventsListElement, createEventsListItemTemplate(point), 'beforeend'));
