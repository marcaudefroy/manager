import { Selector, t } from 'testcafe';

export default class Navbar {
  constructor() {
    this.navbar = Selector('.oui-navbar');
    this.profileNavBar = Selector(
      '[class="oui-navbar-link oui-navbar-link_icon oui-navbar-link_tertiary undefined"]',
    );
    this.helpBlock = Selector('[data-navi-id="help-block"]');
    this.helpLink = this.helpBlock.find(
      '[data-navi-id="helpBlock-link-to-guides"]',
    );
    this.shortcuts = Selector(
      '[data-navi-id="account-sidebar-shortcuts-block"]',
    );
  }

  async expandAndCollapseNavbar() {
    await t.click(this.profileNavBar);
  }

  async accessBills() {
    const billSelector = Selector(this.shortcuts).find(
      '.oui-icon-receipt_concept',
    );
    await t.click(billSelector);
  }
}
