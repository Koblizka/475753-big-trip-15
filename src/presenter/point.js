import EventPointEditor from '../view/event-point-editor.js';
import EventsListItem from '../view/events-list-item.js';
import {PointEditorModeButtons} from '../view/event-point-editor.js';
import {
  RenderPosition,
  render,
  replace,
  remove
} from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDIT: 'EDIT',
};

export default class EventPoint {
  constructor(pointContainer, changeData, changeMode) {
    this._pointContainer = pointContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointEditorElement = null;
    this._pointItemElement = null;
    this._mode = Mode.DEFAULT;

    this._handlerEscapeButtonDown = this._handlerEscapeButtonDown.bind(this);
    this._handlerPointToFormChange = this._handlerPointToFormChange.bind(this);
    this._handlerFormToPointChange = this._handlerFormToPointChange.bind(this);
    this._handlerFavoriteClick = this._handlerFavoriteClick.bind(this);
    this._handlerSubmitForm = this._handlerSubmitForm.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointEditorElement = this._pointEditorElement;
    const prevPointItemElement = this._pointItemElement;

    this._pointEditorElement = new EventPointEditor(PointEditorModeButtons.EDIT, this._point);
    this._pointItemElement = new EventsListItem(this._point);

    this._pointItemElement.setClickRollupHandler(this._handlerPointToFormChange);
    this._pointEditorElement.setClickRollupHandler(this._handlerFormToPointChange);
    this._pointEditorElement.setFormSubmitHandler(this._handlerSubmitForm);
    this._pointItemElement.setFavoriteClickHandler(this._handlerFavoriteClick);

    if (prevPointEditorElement === null || prevPointItemElement === null) {
      render(this._pointContainer, this._pointItemElement, RenderPosition.BEFOREEND);

      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointItemElement, prevPointItemElement);
    }

    if (this._mode === Mode.EDIT) {
      replace(this._pointEditorElement, prevPointEditorElement);
    }

    remove(prevPointEditorElement);
    remove(prevPointItemElement);
  }

  destroy() {
    remove(this._pointEditorElement);
    remove(this._pointItemElement);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceToPoint();
    }
  }

  _handlerFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }

  _handlerEscapeButtonDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceToPoint();
      document.removeEventListener('keydown', this._handlerEscapeButtonDown);
    }
  }

  _handlerPointToFormChange() {
    this._replaceToEditMode();
  }

  _handlerFormToPointChange() {
    this._replaceToPoint();
  }

  _handlerSubmitForm() {
    this._changeData(this._point);
    this._replaceToPoint();
  }

  _replaceToEditMode() {
    replace(this._pointEditorElement, this._pointItemElement);
    document.addEventListener('keydown', this._handlerEscapeButtonDown);

    this._changeMode();
    this._mode = Mode.EDIT;
  }

  _replaceToPoint() {
    replace(this._pointItemElement, this._pointEditorElement);
    document.removeEventListener('keydown', this._handlerEscapeButtonDown);
    this._mode = Mode.DEFAULT;
  }
}
