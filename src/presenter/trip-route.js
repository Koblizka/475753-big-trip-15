import EventsSort from '../view/events-sort.js';
import EventsList from '../view/events-list.js';
import EmptyEventsList from '../view/events-list-empty.js';
import {
  RenderPosition,
  SortType,
  render
} from '../utils/render.js';
import { updateItem } from '../utils/common.js';
import EventPoint from './point.js';
import MenuInfo from './info.js';
import {getDateDifference} from '../utils/date.js';

export default class TripRoute {
  constructor(eventsContainer) {
    this._eventsContainer = eventsContainer;
    this._currentSortType = SortType.DAY;

    this._pointPresenter = new Map();
    this._eventsList = new EventsList();
    this._emptyEventsList = new EmptyEventsList();
    this._eventsSort = new EventsSort();

    this._handleEventPointUpdate = this._handleEventPointUpdate.bind(this);
    this._handleModChange = this._handleModChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(points) {
    this._points = points.slice();
    this._sourcedPoints = points.slice();

    this._renderEvents();
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
    this._sourcedPoints = updateItem(this._sourcedPoints, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _handleModChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearEventPoints();
    this._renderEventPoints();
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this._points.sort((pointA, pointB) => pointB.basePrice - pointA.basePrice);
        break;
      case SortType.TIME:
        this._points.sort((pointA, pointB) => getDateDifference(pointB.dateFrom, pointB.dateTo) - getDateDifference(pointA.dateFrom, pointA.dateTo));
        break;
      default:
        this._points = this._sourcedPoints.slice();
    }

    this._currentSortType = sortType;
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
    this._eventsSort.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderEventsList() {
    render(this._eventsContainer, this._eventsList, RenderPosition.BEFOREEND);
  }

  _renderMenuInfo() {
    this._menuInfo = new MenuInfo();
    this._menuInfo.init(this._points);
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
