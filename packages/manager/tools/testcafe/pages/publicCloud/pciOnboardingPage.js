import { Selector, t } from 'testcafe';
import ManagerParentPage from '../common/managerParent';
import checkBoxSelection from '../component/uikit/checkbox';

export default class PciOnboarding extends ManagerParentPage {
  constructor() {
    super({ currentPageNameInUrl: '/#/pci/' });
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
    this.backToProjectListButton = Selector(
      '[data-translate="pci_project_new_config_btn_return_to_projects"]',
    );
    this.backToStepOneButton = Selector(
      '[data-translate="pci_project_new_payment_btn_return"]',
    );
    this.voucherZone = Selector(
      '[data-translate="pci_projects_new_voucher_question"]',
    );
    this.voucherInput = Selector('[id="voucher"]');
    this.voucherAddButton = Selector(
      '[data-translate="pci_projects_new_voucher_form_add"]',
    );
    this.successVoucherMessage = Selector(
      '[data-translate="pci_projects_new_voucher_form_field_add_success"]',
    );
    this.deleteVoucher = Selector('[class="oui-icon oui-icon-trash ng-scope"]');
    this.invalidVoucherMessage = Selector(
      '[data-translate="pci_projects_new_voucher_form_field_error_invalid"]',
    );
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

  async typeVoucher(value) {
    await t.expect(this.voucherInput.visible).ok();
    await t.typeText(value, this.voucherInput);
  }

  async addVoucher() {
    await t.expect(this.voucherAddButton.hasAttribute('disabled')).notOk();
    await t.click(this.voucherAddButton);
  }

  async voucherIsValid() {
    await t.expect(this.successVoucherMessage.visible).ok();
    await t.expect(this.successVoucherMessage.find('span')).contains('10 €');
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
    await t
      .expect(this.projectCreatingMainTilte.visible)
      .ok({ timeout: 40000 });
    await t.expect(this.spinnerCreating.visible).ok();
  }

  async goBack() {
    if (await this.backToProjectListButton.exists) {
      await t.click(this.backToProjectListButton);
    } else if (await this.backToStepOneButton.exists) {
      await t.click(this.backToStepOneButton);
    }
  }
}
