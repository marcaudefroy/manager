import { Given, When, Then } from '@cucumber/cucumber';
import PciOnboarding from '../../../packages/manager/tools/testcafe/pages/publicCloud/pciOnboardingPage';
import config from '../../../packages/manager/tools/testcafe/config';
import { userRole } from '../../../packages/manager/tools/testcafe/roles';
import PciAllProjectsPage from '../../../packages/manager/tools/testcafe/pages/publicCloud/pciAllProjectsPage';

const pciOnboarding = new PciOnboarding();
const pciUser = {
  userNic: process.env.USER_NIC_PCI,
  userPass: process.env.USER_PASS_PCI,
};
const pciVoucher = process.env.PCI_VOUCHER;

Given('The User access the manager public cloud projects page', async (t) => {
  const targetUrl = `${config.baseUrl}/public-cloud/#/pci/projects/`;
  const user = userRole(config, targetUrl, pciUser);
  await t.useRole(user);
  await pciOnboarding.acceptCookies();
});

Given(
  'The User is on the first step of the pci project creation wizard',
  async (t) => {
    const targetUrl = `${config.baseUrl}/public-cloud/#/pci/projects/`;
    const user = userRole(config, targetUrl, pciUser);
    await t.useRole(user);
    await pciOnboarding.acceptCookies();
    await pciOnboarding.clickCreateNewProject();
  },
);

Given(
  'The User is on the second step of the pci project creation wizard',
  async (t) => {
    const targetUrl = `${config.baseUrl}/public-cloud/#/pci/projects/`;
    const user = userRole(config, targetUrl, pciUser);
    await t.useRole(user);
    await pciOnboarding.acceptCookies();
    await pciOnboarding.clickCreateNewProject();
    await pciOnboarding.clickContractCheckBox();
    await t.click(pciOnboarding.continueButton);
  },
);

Given(
  'The User access the manager public cloud projects page with a voucher parameter',
  async (t) => {
    const targetUrl = `${config.baseUrl}/public-cloud/#/pci/projects/?voucher=${pciVoucher}`;
    const user = userRole(config, targetUrl, pciUser);
    await t.useRole(user);
    await pciOnboarding.acceptCookies();
  },
);

When('The User clicks on the button "voucher"', async (t) => {
  await t.click(PciOnboarding(this.voucherZone));
});

When('The User types a valid voucher', async () => {
  pciOnboarding.typeVoucher(pciVoucher);
});

When('The User clicks on the button "add"', async () => {
  await pciOnboarding.addVoucher();
});

When('The User clicks on the button "create a project"', async () => {
  await pciOnboarding.clickCreateNewProject();
});

When('The User clicks on the button "back"', async () => {
  await pciOnboarding.goBack();
});

Then(
  'The User sees the first step of the pci project creation wizard',
  async () => {
    await pciOnboarding.isContinueButtonClickable(false);
  },
);

Then('The User clicks outside of the voucher field', async (t) => {
  await t.click(pciOnboarding.voucherInput, { offsetX: 50, offsetY: 50 });
});

Then("The User can't add an other voucher", async (t) => {
  await t.expect(pciOnboarding.voucherAddButton.hasAttribute('disabled')).ok();
  await t.expect(pciOnboarding.voucherAddButton.hasAttribute('readonly')).ok();
});

When('The User accepts the contracts', async () => {
  await pciOnboarding.clickContractCheckBox();
});

When('The User sees the continue button enabled', async () => {
  await pciOnboarding.isContinueButtonClickable(true);
});

When('The User clicks on continue', async (t) => {
  await t.click(pciOnboarding.continueButton);
});

Then('The User is redirected to the second step', async (t) => {
  await t.expect(pciOnboarding.createProjectButtonStep2.visible).ok();
});

Then('The User sees his registered {string}', async (t, [stringParam]) => {
  await PciOnboarding.isPaymentMethodVisible(stringParam);
});

Then('The User sees the success message with the voucher amount', async () => {
  await pciOnboarding.voucherIsValid();
});

Then('The User sees the voucher error message', async (t) => {
  await t.expect(pciOnboarding.invalidVoucherMessage.visible).ok();
});

Then("The User sees that the voucher isn't added", async (t) => {
  await t
    .expect(pciOnboarding.voucherAddButton.hasAttribute('disabled'))
    .notOk();
  await t
    .expect(pciOnboarding.voucherAddButton.hasAttribute('readonly'))
    .notOk();
});

When('The User confirms the project creation', async () => {
  await pciOnboarding.clickCreateProjectButton();
});

Then('The User sees the pending project creation loader', async () => {
  await pciOnboarding.isProjectCreating();
});

Then('The User is back to the projects list', async (t) => {
  await t.expect(PciAllProjectsPage(this.h1Title).visible).ok();
});

Then(
  'The User is back to the first step of the pci project creation wizard',
  async (t) => {
    await t.expect(PciOnboarding(this.clickContractCheckBox).visible).ok();
  },
);
