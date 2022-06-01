import angular from 'angular';
import { ListLayoutHelper } from '@ovh-ux/manager-ng-layout-helpers';

import packMove from '../move';
import packResiliation from '../resiliation';
import xdsl from '../xdsl';
import migration from '../migration';
import slots from '../slots';

import { PACK } from './pack.constant';
import routing from './pack.routing';
import component from './pack.component';

const moduleName = 'ovhManagerTelecomPack';

angular
  .module(moduleName, [
    ListLayoutHelper.moduleName,
    migration,
    packMove,
    packResiliation,
    slots,
    xdsl,
  ])
  .constant('PACK', PACK)
  .config(routing)
  .component('packDashboard', component)
  .run(/* @ngTranslationsInject:json ./translations */)
  .run(/* @ngTranslationsInject:json ../translations */);

export default moduleName;
