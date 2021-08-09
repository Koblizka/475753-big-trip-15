import MainMenuInfo from './view/menu-trip-info.js';
import MainMenuNavigation from './view/menu-trip-navigation.js';
import MainMenuFilters from './view/menu-trip-filters.js';
import EventsSort from './view/events-sort.js';
import EventsList from './view/events-list.js';
import EventPointEditor from './view/event-point-editor.js';
import EventsListItem from './view/events-list-item.js';

import {PointEditorModeButtons} from './view/event-point-editor.js';
import { sortedPoints } from './mock/point.js';
import {
  RenderPosition,
  renderElement
} from './utils/utils.js';

const headerMainInfoElement = document.querySelector('.trip-main');
const headerNavigationElement = headerMainInfoElement.querySelector('.trip-controls__navigation');
const headerFiltersElement = headerMainInfoElement.querySelector('.trip-controls__filters');
const allEventsElement = document.querySelector('.trip-events');

renderElement(headerMainInfoElement, new MainMenuInfo(sortedPoints).getElement(), RenderPosition.AFTERBEGIN);
renderElement(headerNavigationElement, new MainMenuNavigation().getElement(), RenderPosition.BEFOREEND);
renderElement(headerFiltersElement, new MainMenuFilters().getElement(), RenderPosition.BEFOREEND);
renderElement(allEventsElement, new EventsSort().getElement(), RenderPosition.BEFOREEND);

const eventsListElement = new EventsList().getElement();

renderElement(allEventsElement, eventsListElement, RenderPosition.BEFOREEND);
renderElement(eventsListElement, new EventPointEditor(PointEditorModeButtons.CREATE, sortedPoints[0]).getElement(), RenderPosition.BEFOREEND);

sortedPoints.forEach((point) => renderElement(eventsListElement, new EventsListItem(point).getElement(), RenderPosition.BEFOREEND));
