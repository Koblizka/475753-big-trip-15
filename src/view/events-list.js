import Abstract from '../view/abstract.js';

const createEventsListTemplate = () => '<ul class="trip-events__list"></ul>';
export default class EventsList extends Abstract {
  getTemplate() {
    return createEventsListTemplate();
  }
}
