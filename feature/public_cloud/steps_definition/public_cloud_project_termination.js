import { Given, When } from '@cucumber/cucumber';
import PciAllProjectsPage from '../../../packages/manager/tools/testcafe/pages/publicCloud/pciAllProjectsPage';
import config from '../../../packages/manager/tools/testcafe/config';
import { userRole } from '../../../packages/manager/tools/testcafe/roles';
import getTerminateConfirmationLinkFromEmail from '../../../packages/manager/tools/testcafe/utils/scrapEmail';

const pciProjects = new PciAllProjectsPage();
const pciUser = {
  userNic: process.env.USER_NIC_PCI,
  userPass: process.env.USER_PASS_PCI,
};

When('The User requests a project termination', async () => {
  await pciProjects.selectFistrDropdownActionMenu();
  await pciProjects.selectTerminateLink();
});

Given('The User access the termination page', async (t) => {
  const targetUrl = await getTerminateConfirmationLinkFromEmail();
  const user = userRole(config, targetUrl[0], pciUser);
  await t.useRole(user);
  await pciProjects.removeCookieMsg();
});
