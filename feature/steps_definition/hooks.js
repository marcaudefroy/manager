import { Before, After } from '@cucumber/cucumber';
/* import {
  config,
  userRoleDisconnect,
  getNetworkLogs,
  logger,
} from '@ovh-ux/testcafe-manager'; */

import config from '../../packages/manager/tools/testcafe/config';
import { userRoleDisconnect } from '../../packages/manager/tools/testcafe/roles';
import { getNetworkLogs } from '../../packages/manager/tools/testcafe/utils/helpers';
import logger from '../../packages/manager/tools/testcafe/utils/commonData';

// for each test in order to log networkcalls
Before(async (t) => {
  await t.addRequestHooks(logger);
});

// after each test in order to generate JSON and HTML
// Do not use AfterAll or you won't get the result for each tests
After(async () => {
  await getNetworkLogs(logger);
});

After({ tags: '@logout' }, async () => {
  await userRoleDisconnect(config);
});
