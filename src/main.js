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
  render
} from './utils/utils.js';

const headerMainInfoElement = document.querySelector('.trip-main');
const headerNavigationElement = headerMainInfoElement.querySelector('.trip-controls__navigation');
const headerFiltersElement = headerMainInfoElement.querySelector('.trip-controls__filters');
const allEventsElement = document.querySelector('.trip-events');

const renderEvent = (listElement, point) => {
  const pointEditorElement = new EventPointEditor(PointEditorModeButtons.EDIT, point).getElement();
  const pointItemElement = new EventsListItem(point).getElement();

  const replaceToEditMode = () => {
    listElement.replaceChild(pointEditorElement, pointItemElement);
  };
  const replaceToPoint = () => {
    listElement .replaceChild(pointItemElement, pointEditorElement);
  };

  pointItemElement.querySelector('.event__rollup-btn').addEventListener('click', replaceToEditMode);
  pointEditorElement.querySelector('.event__rollup-btn').addEventListener('click', replaceToPoint);
  pointEditorElement.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceToPoint();
  });

  return render(listElement, pointItemElement, RenderPosition.BEFOREEND);
};

render(headerMainInfoElement, new MainMenuInfo(sortedPoints).getElement(), RenderPosition.AFTERBEGIN);
render(headerNavigationElement, new MainMenuNavigation().getElement(), RenderPosition.BEFOREEND);
render(headerFiltersElement, new MainMenuFilters().getElement(), RenderPosition.BEFOREEND);
render(allEventsElement, new EventsSort().getElement(), RenderPosition.BEFOREEND);

const eventsListElement = new EventsList().getElement();

render(allEventsElement, eventsListElement, RenderPosition.BEFOREEND);

sortedPoints.forEach((point) => renderEvent(eventsListElement, point), RenderPosition.BEFOREEND);
