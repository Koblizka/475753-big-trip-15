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

    this._handleEscapeButtonDown = this._handleEscapeButtonDown.bind(this);
    this._handlePointToFormChange = this._handlePointToFormChange.bind(this);
    this._handleFormToPointChange = this._handleFormToPointChange.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleSubmitForm = this._handleSubmitForm.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointEditorElement = this._pointEditorElement;
    const prevPointItemElement = this._pointItemElement;

    this._pointEditorElement = new EventPointEditor(PointEditorModeButtons.EDIT, this._point);
    this._pointItemElement = new EventsListItem(this._point);

    this._pointItemElement.setClickRollupHandler(this._handlePointToFormChange);
    this._pointEditorElement.setClickRollupHandler(this._handleFormToPointChange);
    this._pointEditorElement.setFormSubmitHandler(this._handleSubmitForm);
    this._pointItemElement.setFavoriteClickHandler(this._handleFavoriteClick);

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

  _handleFavoriteClick() {
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

  _handleEscapeButtonDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceToPoint();
      document.removeEventListener('keydown', this._handleEscapeButtonDown);
    }
  }

  _handlePointToFormChange() {
    this._replaceToEditMode();
  }

  _handleFormToPointChange() {
    this._replaceToPoint();
  }

  _handleSubmitForm() {
    this._changeData(this._point);
    this._replaceToPoint();
  }

  _replaceToEditMode() {
    replace(this._pointEditorElement, this._pointItemElement);
    document.addEventListener('keydown', this._handleEscapeButtonDown);

    this._changeMode();
    this._mode = Mode.EDIT;
  }

  _replaceToPoint() {
    replace(this._pointItemElement, this._pointEditorElement);
    document.removeEventListener('keydown', this._handleEscapeButtonDown);
    this._mode = Mode.DEFAULT;
  }
}
