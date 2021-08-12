import Abstract from '../view/abstract.js';

const emptyEventsListTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class EmptyEventsList extends Abstract {
  getTemplate() {
    return emptyEventsListTemplate();
  }
}
