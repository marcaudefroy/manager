import config from '../../../../../tools/testcafe/config';
import getTerminateConfirmationLinkFromEmail from '../../../../../tools/testcafe/utils/scrapEmail';
import {
  userRole,
  userRoleDisconnect,
} from '../../../../../tools/testcafe/roles';
import PciAllProjectsPage from '../../../../../tools/testcafe/pages/publicCloud/pciAllProjectsPage';

fixture('check hub page')
  .meta({
    service: ['ovh.com-manager', 'ca.ovh.com-manager'],
    type: 'regression',
    severity: 'critical',
    priority: 'high',
    scope: 'hub',
  }) // f
  .page(config.baseUrl)
  .beforeEach(async (t) => {
    const targetUrl = await getTerminateConfirmationLinkFromEmail();
    const user = userRole(config, targetUrl[0]);
    console.log(targetUrl[0]);
    await t.useRole(user);
  });

// The product must be in automatic renewal
test('read my mail', async (t) => {
  const pciProjects = new PciAllProjectsPage();
  await pciProjects.removeCookieMsg();
  await t.debug();
}).after(async () => {
  await userRoleDisconnect(config);
});
