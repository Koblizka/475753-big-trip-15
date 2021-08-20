import MainMenuInfo from '../view/menu-trip-info.js';
import MainMenuNavigation from '../view/menu-trip-navigation.js';
import MainMenuFilters from '../view/menu-trip-filters.js';
import EventsSort from '../view/events-sort.js';
import EventsList from '../view/events-list.js';
import EmptyEventsList from '../view/events-list-empty.js';
import EventPoint from './point.js';
import {
  RenderPosition,
  render
} from '../utils/render.js';
import { updateItem } from '../utils/common.js';


export default class TripRoute {
  constructor(headerContainer, eventsContainer) {
    this._headerContainer = headerContainer;
    this._eventsContainer = eventsContainer;
    this._pointPresenter = new Map();

    this._mainMenuNavigation = new MainMenuNavigation();
    this._mainMenuFilters = new MainMenuFilters();
    this._eventsList = new EventsList();
    this._emptyEventsList = new EmptyEventsList();
    this._eventsSort = new EventsSort();

    this._handleEventPointUpdate = this._handleEventPointUpdate.bind(this);
    this._handleModChange = this._handleModChange.bind(this);
  }

  init(points) {
    this._points = points;

    this._renderMainMenuNavigation();
    this._renderMainMenuFilters();
    this._renderEvents();
  }

  _renderMainMenuNavigation() {
    this._navigationContainer = this._headerContainer.querySelector('.trip-controls__navigation');

    render(this._navigationContainer, this._mainMenuNavigation, RenderPosition.BEFOREEND);
  }

  _renderMainMenuFilters() {
    this._filtersContainer = this._headerContainer.querySelector('.trip-controls__filters');

    render(this._filtersContainer, this._mainMenuFilters, RenderPosition.BEFOREEND);
  }

  _renderMenuInfo() {
    this._mainMenuInfo = new MainMenuInfo(this._points);

    render(this._headerContainer, this._mainMenuInfo, RenderPosition.AFTERBEGIN);
  }

  _renderEventPoint(point) {
    const pointPresenter = new EventPoint(this._eventsList, this._handleEventPointUpdate, this._handleModChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _renderEventPoints() {
    this._points.forEach((point) => this._renderEventPoint(point), RenderPosition.BEFOREEND);
  }

  _handleEventPointUpdate(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _handleModChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _clearEventPoints() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderEmptyEventsList() {
    render(this._eventsContainer, this._emptyEventsList, RenderPosition.BEFOREEND);
  }

  _renderEventsSort() {
    render(this._eventsContainer, this._eventsSort, RenderPosition.BEFOREEND);
  }

  _renderEventsList() {
    render(this._eventsContainer, this._eventsList, RenderPosition.BEFOREEND);
  }

  _renderEvents() {
    if (!this._points.length) {
      this._renderEmptyEventsList();

      return;
    }

    this._renderMenuInfo();
    this._renderEventsSort();
    this._renderEventsList();
    this._renderEventPoints();
  }
}
