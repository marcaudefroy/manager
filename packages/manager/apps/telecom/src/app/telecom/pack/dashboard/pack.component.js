import controller from './pack.controller';
import template from './pack.html';

export default {
  controller,
  controllerAs: 'Pack',
  template,
  bindings: {
    resiliationNotification: '<',
  },
};
