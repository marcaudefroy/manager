import { When } from '@cucumber/cucumber';
import TerminatePage from '../../../packages/manager/tools/testcafe/pages/billing/terminatePage';

When('The User validates the termination form', async () => {
  const terminate = new TerminatePage();
  await terminate.terminateProductForGood();
});
