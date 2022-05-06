import { Selector, t } from 'testcafe';

export default async function checkBoxSelection(checkBox) {
  const checkBoxLabel = Selector(checkBox)
    .parent()
    .find('label');
  const checkBoxSelector = checkBoxLabel.parent('oui-checkbox').find('input');
  if (await checkBoxSelector.hasClass('ng-empty')) {
    await t.click(checkBoxLabel);
    await t.expect(checkBoxSelector.hasClass('ng-not-empty')).ok();
  } else if (checkBoxSelector.hasClass('ng-not-empty')) {
    await t.click(checkBoxLabel);
    await t.expect(checkBoxSelector.hasClass('ng-empty')).ok();
  }
}
