import MainMenuInfo from '../view/menu-trip-info.js';
import MainMenuNavigation from '../view/menu-trip-navigation.js';
import MainMenuFilters from '../view/menu-trip-filters.js';

import {
  RenderPosition,
  render
} from '../utils/render.js';

export default class MenuInfo {
  constructor () {
    this._headerContainer = document.querySelector('.trip-main');

    this._mainMenuNavigation = new MainMenuNavigation();
    this._mainMenuFilters = new MainMenuFilters();
  }

  init(points){
    this._points = points;

    this._mainMenuInfo = new MainMenuInfo(this._points);

    this._renderMainMenuNavigation();
    this._renderMainMenuFilters();
    this._renderMenuInfo();
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
    render(this._headerContainer, this._mainMenuInfo, RenderPosition.AFTERBEGIN);
  }
}
