import { Selector, t } from 'testcafe';
import ManagerParentPage from '../common/managerParent';

export default class TerminatePage extends ManagerParentPage {
  constructor() {
    super({ currentPageNameInUrl: '/#/billing/confirmTerminate' });
    this.orderErrorRadio = Selector(
      '[data-translate="billing_confirm_termination_reason_WRONG_ORDER"]',
    );
    this.doNotReplaceRadio = Selector(
      '[data-translate="billing_confirm_termination_future_use_NOT_REPLACING_SERVICE"]',
    );
    this.confirmTerminationFormButton = Selector(
      '[data-translate="billing_confirm_termination_terminate"]',
    ).parent('button');
  }

  async terminateProductForGood() {
    await t.expect(this.doNotReplaceRadio.visible).ok();
    await t.click(this.doNotReplaceRadio).click(this.orderErrorRadio);
    await t
      .expect(this.confirmTerminationFormButton.hasAttribute('disabled'))
      .notOk();
    await t.click(this.confirmTerminationFormButton);
  }
}
