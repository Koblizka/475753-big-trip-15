import Abstract from '../view/abstract.js';

const createEventsListTemplate = () => '<ul class="trip-events__list"></ul>';
export default class EventsLis extends Abstract {
  getTemplate() {
    return createEventsListTemplate();
  }
}
