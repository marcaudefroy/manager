import { Selector, t } from 'testcafe';
import ManagerParentPage from '../common/managerParent';

export default class PciAllProjectsPage extends ManagerParentPage {
  constructor() {
    super({ currentPageNameInUrl: '/#/pci/projects' });
    this.h1Title = Selector('[data-translate="pci_projects"]');
    this.dropdownItem = Selector('.oui-dropdown');
    this.confirmSuppressionButton = Selector(
      '[class="oui-button oui-button_l oui-button_primary ng-binding ng-scope"]',
    );
  }

  async selectFistrDropdownActionMenu() {
    await t.click(this.dropdownItem.nth(0));
  }

  async selectTerminateLink() {
    await t.click(
      this.dropdownItem
        .nth(0)
        .find('[data-translate="pci_projects_project_delete"]'),
    );
    await t.click(this.confirmSuppressionButton);
  }
}
