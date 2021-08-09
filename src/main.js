import MainMenuInfo from './view/menu-trip-info.js';
import MainMenuNavigation from './view/menu-trip-navigation.js';
import MainMenuFilters from './view/menu-trip-filters.js';
import EventsSort from './view/events-sort.js';
import EventsList from './view/events-list.js';
import EventPointEditor from './view/event-point-editor.js';
import EventsListItem from './view/events-list-item.js';
import EmptyEventsList from './view/events-list-empty.js';

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

  const onEscapeButtonDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceToPoint();
      document.removeEventListener('keydown', onEscapeButtonDown);
    }
  };

  pointItemElement.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceToEditMode();
    document.addEventListener('keydown', onEscapeButtonDown);
  });
  pointEditorElement.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceToPoint();
    document.removeEventListener('keydown', onEscapeButtonDown);
  });
  pointEditorElement.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceToPoint();
  });

  return render(listElement, pointItemElement, RenderPosition.BEFOREEND);
};

render(headerNavigationElement, new MainMenuNavigation().getElement(), RenderPosition.BEFOREEND);
render(headerFiltersElement, new MainMenuFilters().getElement(), RenderPosition.BEFOREEND);

if (sortedPoints.length === 0) {
  render(allEventsElement, new EmptyEventsList().getElement(), RenderPosition.BEFOREEND);
} else {
  render(headerMainInfoElement, new MainMenuInfo(sortedPoints).getElement(), RenderPosition.AFTERBEGIN);
  render(allEventsElement, new EventsSort().getElement(), RenderPosition.BEFOREEND);

  const eventsListElement = new EventsList().getElement();

  render(allEventsElement, eventsListElement, RenderPosition.BEFOREEND);

  sortedPoints.forEach((point) => renderEvent(eventsListElement, point), RenderPosition.BEFOREEND);
}
