import { Selector, t } from 'testcafe';
import { URL } from 'url';

export default class AuthLoginPage {
  constructor(
    config,
    user = {
      userNic: config.auth.userNic,
      userPass: config.auth.userPass,
    },
  ) {
    this.url = config.auth.url;
    this.baseUrl = config.baseUrl;
    this.userNic = user.userNic;
    this.userPass = user.userPass;

    const loginForm = Selector('#login-form');
    this.usernameInput = loginForm.find('input[type=text]');
    this.passwordInput = loginForm.find('input[type=password]');
    this.submitButton = loginForm.find('button[type=submit]');
  }

  getLoginUrl(onsuccess = this.baseUrl) {
    const url = new URL(this.url);
    url.searchParams.set('onsuccess', onsuccess);
    return url.toString();
  }

  getLogoutUrl() {
    const url = new URL(this.url);
    url.searchParams.set('action', 'disconnect');
    return url.toString();
  }

  async login() {
    await t
      .typeText(this.usernameInput, this.userNic)
      .typeText(this.passwordInput, this.userPass)
      .click(this.submitButton);
  }

  async logout() {
    await t.navigateTo(this.getLogoutUrl());
    await t.expect(this.passwordInput.visible).ok();
  }
}
