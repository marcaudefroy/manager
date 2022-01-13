import controller from './controller';
import template from './template.html';

export default {
  bindings: {
    node: '<',
    user: '<',
    trackingPrefix: '<',
  },
  controller,
  template,
};
