import { Selector, t } from 'testcafe';
import ManagerParentPage from '../common/managerParent';

export default class HubPage extends ManagerParentPage {
  constructor() {
    super({
      currentPageNameInUrl: '/#/',
      elementDisplayedOnPage: '[data-navi-id="hub-welcome-title"]',
    });
    this.paymentStatusBlock = Selector('[data-navi-id="paymentStatus-block"]');
    this.ordersBlock = Selector('[data-navi-id="lastOrder-block"]');
    this.allOrdersList = this.ordersBlock.find(
      '[data-navi-id="lastOrder-go-to-orders"]',
    );
    this.totalBills = Selector('[data-navi-id="totalBills-block"]');
    this.linkToBills = this.totalBills.find(
      '[data-navi-id="totalBills-go-to-bills"]',
    );
    this.renewConfigurationLink = Selector(
      '[data-navi-id="go-to-configure-renew"]',
    );
    this.anticipatePaymentLink = Selector(
      '[data-navi-id="go-to-anticipate-payment"]',
    );
  }

  async goToRenewPage() {
    const goToRenewLink = this.paymentStatusBlock.child(2).find('a');
    await t.click(goToRenewLink);
  }

  async clickDropdownProductAutomaticRenew(product) {
    const productToSelect = this.paymentStatusBlock.find(
      `[data-navi-id="paymentStatus-${product}"]`,
    );
    const produtDropdown = Selector(
      `[data-navi-id="paymentStatus-${product}-dropdown"]`,
    );
    await t.expect(productToSelect.visible).ok();
    await t.click(produtDropdown);
  }

  async dropdownProductAutomaticRenewContent(product) {
    const renewConfigurationHref = this.renewConfigurationLink.getAttribute(
      'href',
    );
    const anticipatePaymentHref = this.anticipatePaymentLink.getAttribute(
      'href',
    );
    await t
      .expect(renewConfigurationHref)
      .contains(
        `/manager/#/dedicated/billing/autorenew/update?serviceId=${product}`,
      );
    await t
      .expect(anticipatePaymentHref)
      .contains(`/cgi-bin/order/renew.cgi?domainChooser=${product}`);
  }

  async goToOrdersList() {
    await t.click(this.allOrdersList);
  }

  async confirmOrdersListLink() {
    const allOrdersListHref = this.allOrdersList.getAttribute('href');
    await t
      .expect(allOrdersListHref)
      .contains('/manager/#/dedicated/#/billing/orders');
  }

  async goToDocs() {
    await t.expect(this.helpLink.visible).ok();
    await t.click(this.helpLink);
  }

  async goToBills() {
    await t.expect(this.linkToBills.visible).ok();
    await t.click(this.linkToBills);
  }

  async confirmBillsLink() {
    const linkToBillsHref = this.linkToBills.getAttribute('href');
    await t
      .expect(linkToBillsHref)
      .contains('manager/#/dedicated/billing/history');
  }

  static async gotToProductsCatalog() {
    const catalogLink = Selector('a[href*="#/hub/catalog"]');
    await t.expect(catalogLink.visible).ok();
    await t.click(catalogLink);
  }

  static async accessProductListDashboard(type) {
    const productBlock = Selector(`[data-navi-id="${type}-block"]`);
    const goToProductList = productBlock.find('button');
    await t.click(goToProductList);
  }

  // eslint-disable-next-line class-methods-use-this
  async goToProductPage(product) {
    const productSelector = Selector(
      `[data-navi-id="paymentStatus-${product}"]`,
    ).find('a');
    await t.click(productSelector);
  }
}
