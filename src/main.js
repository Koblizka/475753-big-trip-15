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
  render,
  replace
} from './utils/render.js';
const 
const headerMainInfoElement = document.querySelector('.trip-main');
const headerNavigationElement = headerMainInfoElement.querySelector('.trip-controls__navigation');
const headerFiltersElement = headerMainInfoElement.querySelector('.trip-controls__filters');
const allEventsElement = document.querySelector('.trip-events');

const renderEvent = (listElement, point) => {
  const pointEditorElement = new EventPointEditor(PointEditorModeButtons.EDIT, point);
  const pointItemElement = new EventsListItem(point);

  const replaceToEditMode = () => {
    replace(pointEditorElement, pointItemElement);
  };

  const replaceToPoint = () => {
    replace(pointItemElement, pointEditorElement);
  };

  const onEscapeButtonDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceToPoint();
      document.removeEventListener('keydown', onEscapeButtonDown);
    }
  };

  pointItemElement.setClickHandler(() => {
    replaceToEditMode();
    document.addEventListener('keydown', onEscapeButtonDown);
  });
  pointEditorElement.setClickHandler(() => {
    replaceToPoint();
    document.removeEventListener('keydown', onEscapeButtonDown);
  });
  pointEditorElement.setFormSubmitHandler(() => {
    replaceToPoint();
    document.removeEventListener('keydown', onEscapeButtonDown);
  });

  return render(listElement, pointItemElement, RenderPosition.BEFOREEND);
};

const renderEventsList = (points) => {
  const eventsListElement = new EventsList().getElement();

  if (!points.length) {
    render(allEventsElement, new EmptyEventsList().getElement(), RenderPosition.BEFOREEND);

    return;
  }

  render(headerMainInfoElement, new MainMenuInfo(points), RenderPosition.AFTERBEGIN);
  render(allEventsElement, new EventsSort(), RenderPosition.BEFOREEND);
  render(allEventsElement, eventsListElement, RenderPosition.BEFOREEND);

  points.forEach((point) => renderEvent(eventsListElement, point), RenderPosition.BEFOREEND);
};

render(headerNavigationElement, new MainMenuNavigation(), RenderPosition.BEFOREEND);
render(headerFiltersElement, new MainMenuFilters(), RenderPosition.BEFOREEND);
renderEventsList(sortedPoints);
