import { RequestLogger } from 'testcafe';

const logger = RequestLogger([/ovh/], {
  logResponseHeaders: true,
});

export default logger;
