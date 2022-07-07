import { Selector, t } from 'testcafe';
import { getPageUrl } from '../../utils/helpers';

export default class ManagerParentPage {
  constructor({ currentPageNameInUrl, elementDisplayedOnPage = '' } = {}) {
    this.currentPageNameInUrl = currentPageNameInUrl;
    this.navbarUser = Selector('[data-navi-id="user-menu"]');
    this.logoutLink = Selector('[data-navi-id="logout"]');
    this.elementDisplayedOnPage = Selector(elementDisplayedOnPage);
    this.iframeSelector = Selector('[id="privacy-iframe"]');
    this.cookieButtonAccept = Selector('[data-navi-id="cookie-accept"]');
    this.cookieButtonRefuse = Selector(
      '[class="deny oui-button oui-button_secondary"]',
    );
    this.ouiMessage = Selector('.oui-message');
    this.iframeContainer = Selector('[title="app"]');
  }

  async acceptCookies() {
    await t.expect(this.cookieButtonAccept.visible).ok();
    await t.click(this.cookieButtonAccept);
  }

  async refuseCookies() {
    await t.expect(this.cookieButtonRefuse.visible).ok();
    await t.click(this.cookieButtonRefuse);
  }

  async iframeInContainer() {
    await t.switchToIframe(this.iframeContainer);
  }

  async confirmCurrentPageDisplay() {
    await t.expect(this.elementDisplayedOnPage.visible).ok();
  }

  async confirmCurrentPage() {
    await t.expect(await getPageUrl()).contains(this.currentPageNameInUrl);
  }

  async toggleAccountMenu() {
    await t.expect(this.navbarUser.visible).ok();
    await t.click(this.navbarUser);
  }

  async disconnectFromManager() {
    if (await this.logoutLink.visible) {
      await t.click(this.logoutLink);
    } else {
      await t.click(this.navbarUser);
      await t.click(this.logoutLink);
    }
    await t.expect(await Selector('#login-form').visible).ok();
  }

  async confirmSuccessMessageDisplay() {
    const successAttribute = this.ouiMessage.find(
      '[class="oui-message__body oui-message__body_success"]',
    );
    const alertMessageFallback = Selector('[data-ng-class="ovhAlertType"]');
    if (await alertMessageFallback.exists) {
      await t.expect(alertMessageFallback.visible).ok();
    } else if (await successAttribute.exists) {
      await t.expect(successAttribute.visible).ok();
    } else {
      throw new Error('no success message displayed!');
    }
  }
}
