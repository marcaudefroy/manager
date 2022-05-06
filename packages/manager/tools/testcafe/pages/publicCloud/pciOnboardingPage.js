import { Selector, t } from 'testcafe';
import ManagerParentPage from '../common/managerParent';
import checkBoxSelection from '../component/uikit/checkbox';

export default class PciOnboarding extends ManagerParentPage {
  constructor() {
    super({ currentPageNameInUrl: '/#/pci/' });
    this.tableListItems = Selector('[data-navi-id="DEDICATED_SERVER-list"]');
    this.createProjectButton = Selector(
      '[data-translate="pci_projects_create_project"]',
    );
    this.contratCheckbox = Selector('[data-translate="order_contracts_label"]');
    this.continueButton = Selector(
      '[data-translate="pci_project_new_config_btn_continue"]',
    )
      .parent()
      .find('button');
    this.createProjectButtonStep2 = Selector(
      '[data-translate="pci_project_new_payment_btn_continue_default"]',
    );
    this.projectCreatingMainTilte = Selector(
      '[data-translate="pci_projects_creating_main_title"]',
    );
    this.spinnerCreating = Selector('[class="spinner mx-auto"]');
    this.smallSpiner = Selector('[class="oui-spinner__image"]');
  }

  async clickCreateNewProject() {
    await t.expect(this.createProjectButton.visible).ok();
    await t.click(this.createProjectButton);
  }

  async clickContractCheckBox() {
    await t.expect(this.continueButton.visible).ok();
    await checkBoxSelection(this.contratCheckbox);
  }

  async isContinueButtonClickable(bool) {
    if (bool) {
      await t.expect(this.continueButton.hasAttribute('disabled')).notOk();
    } else {
      await t.expect(this.continueButton.hasAttribute('disabled')).ok();
    }
  }

  static async isPaymentMethodVisible(paymentMethod) {
    let paymentType = '';
    switch (paymentMethod) {
      case 'credit card':
        paymentType = `[alt='{"paymentType":"CREDIT_CARD"}']`;
        break;
      case 'paypal':
        paymentType = `[alt='{"paymentType":"PAYPAL"}']`;
        break;
      default:
        break;
    }
    await t.expect(Selector(paymentType).visible).ok();
  }

  async clickCreateProjectButton() {
    await t
      .expect(this.createProjectButtonStep2.hasAttribute('disabled'))
      .notOk();
    await t.click(this.createProjectButtonStep2);
  }

  async isProjectCreating() {
    await t.expect(this.projectCreatingMainTilte.visible).ok();
    await t.expect(this.spinnerCreating.visible).ok();
  }
}
