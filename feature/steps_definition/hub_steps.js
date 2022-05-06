import { Given, When, Then } from '@cucumber/cucumber';
import HubPage from '../../packages/manager/tools/testcafe/pages/hub/hubPage';
import config from '../../packages/manager/tools/testcafe/config';
import { userRole } from '../../packages/manager/tools/testcafe/roles';

const hubPage = new HubPage();

Given('The User access the manager home page', async (t) => {
  const targetUrl = `${config.baseUrl}/#/hub`;
  const user = userRole(config, targetUrl);
  await t.useRole(user);
});

When('The User clicks on his product renewal dropdown button', async () => {
  await hubPage.confirmCurrentPage();
  await hubPage.removeCookieMsg();
});

Then('The User sees the renewal management options links', async () => {
  await hubPage.dropdownProductAutomaticRenew(config.dataset.hubProduct);
});

Then(
  'The User confirms the EU and CA available actions links are correct',
  async () => {
    await hubPage.confirmBillsLink();
  },
);
