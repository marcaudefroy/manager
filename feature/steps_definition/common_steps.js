import { Then } from '@cucumber/cucumber';
import ManagerParentPage from '../../packages/manager/tools/testcafe/pages/common/managerParent';

Then('The User sees a confirmation message', async () => {
  const managerParent = new ManagerParentPage();
  await managerParent.confirmSuccessMessageDisplay();
});
