import { Selector, t } from 'testcafe';
import ManagerParentPage from '../../common/managerParent';

export default class DedicatedServerGeneralInformationTab extends ManagerParentPage {
  constructor() {
    super({ currentPageNameInUrl: '/#/dedicated/server' });
    this.generalInformationTile = Selector(
      '[data-translate="server_informations_general"]',
    );
  }

  async confirmDisplayName() {
    await t.expect(this.generalInformationTile.visible).ok();
  }
}
