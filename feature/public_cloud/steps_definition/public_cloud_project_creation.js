import { Given, When, Then } from '@cucumber/cucumber';
import PciOnboarding from '../../../packages/manager/tools/testcafe/pages/publicCloud/pciOnboardingPage';
import config from '../../../packages/manager/tools/testcafe/config';
import { userRole } from '../../../packages/manager/tools/testcafe/roles';

const pciOnboarding = new PciOnboarding();

Given('The User access the manager public cloud projects page', async (t) => {
  const targetUrl = `${config.baseUrl}/public-cloud/#/pci/projects/`;
  const user = userRole(config, targetUrl);
  await t.useRole(user);
  await pciOnboarding.removeCookieMsg();
});

When('The user clicks on the button "create a project"', async () => {
  await pciOnboarding.clickCreateNewProject();
});

Then(
  'The user sees the first step of the pci project creation wizard',
  async () => {
    await pciOnboarding.isContinueButtonClickable(false);
  },
);

When('The user accepts the contracts', async () => {
  await pciOnboarding.clickContractCheckBox();
});

When('The user sees the continue button enabled', async () => {
  await pciOnboarding.isContinueButtonClickable(true);
});

When('The user clicks on continue', async (t) => {
  await t.click(pciOnboarding.continueButton);
});

Then('The user is redirected to the second step', async (t) => {
  await t.expect(pciOnboarding.createProjectButtonStep2.visible).ok();
});

Then('The user sees his registered {string}', async (t, [stringParam]) => {
  await PciOnboarding.isPaymentMethodVisible(stringParam);
});

When('The user confirms the project creation', async () => {
  await pciOnboarding.clickCreateProjectButton();
});

Then('The user sees the pending project creation loader', async () => {
  await pciOnboarding.isProjectCreating();
});
