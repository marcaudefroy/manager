import { RequestLogger } from 'testcafe';

const logger = RequestLogger({
  logResponseHeaders: true,
  logResponseBody: true,
});

export default logger;
