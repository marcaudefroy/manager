import controller from './delete.controller';
import template from './delete.template.html';

export default {
  bindings: {
    close: '<',
    partition: '<',
    partitionApiUrl: '<',
  },
  controller,
  template,
};
