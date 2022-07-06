import ManagerParentPage from '../../common/managerParent';

export default class DedicatedHomePage extends ManagerParentPage {
  constructor() {
    super({ currentPageNameInUrl: '/#/dedicated/configuration' });
  }
}
