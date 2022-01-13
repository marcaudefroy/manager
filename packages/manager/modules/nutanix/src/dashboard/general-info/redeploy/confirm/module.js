import angular from 'angular';
import 'angular-translate';
import '@ovh-ux/ng-translate-async-loader';
import '@ovh-ux/ui-kit';

import component from './component';
import routing from './routing';

const moduleName = 'ovhManagerNutanixDashboardGeneralInfoRedeployConfirm';

angular
  .module(moduleName, [
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
    'oui',
  ])
  .config(routing)
  .component('nutanixDashboardGeneralInfoRedeployConfirmComponent', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
