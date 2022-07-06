import ManagerParentPage from '../common/managerParent';

export default class BillsListPage extends ManagerParentPage {
  constructor() {
    super({
      currentPageNameInUrl: 'billing/history',
      elementDisplayedOnPage: '[id="dg-undefined"]',
    });
  }
}
