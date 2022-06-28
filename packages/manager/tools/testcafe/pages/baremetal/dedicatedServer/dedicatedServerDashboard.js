import { Selector } from 'testcafe';
import ManagerParentPage from '../../common/managerParent';

export default class ServersListDashboard extends ManagerParentPage {
  constructor() {
    super({ currentPageNameInUrl: '/#/dedicated/server' });
    this.tableListItems = Selector('[id="dg-servers"]');
  }
}
