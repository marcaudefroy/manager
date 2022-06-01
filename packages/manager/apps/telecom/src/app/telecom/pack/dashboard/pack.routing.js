import { ListLayoutHelper } from '@ovh-ux/manager-ng-layout-helpers';

console.log(ListLayoutHelper);

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('telecom.packs.pack', {
    url: `/:packName?${ListLayoutHelper.urlQueryParams}`,
    params: ListLayoutHelper.stateParams,
    componentProvider: /* @ngInject */ (packName) => {
      return packName === 'sdsl' ? 'managerListLayout' : 'packDashboard';
    },
    resolve: {
      resiliationNotification() {
        return {};
      },
      $title(translations, $translate, OvhApiPackXdsl, $stateParams) {
        return $stateParams.packName !== 'sdsl'
          ? OvhApiPackXdsl.v6()
              .get({
                packId: $stateParams.packName,
              })
              .$promise.then((data) =>
                $translate.instant(
                  'pack_xdsl_page_title',
                  { name: data.description || $stateParams.packName },
                  null,
                  null,
                  'escape',
                ),
              )
              .catch(() =>
                $translate.instant('pack_xdsl_page_title', {
                  name: $stateParams.packName,
                }),
              )
          : Promise.resolve($translate.instant('pack_xdsl_sdsl_page_title'));
      },
      goToPack: /* @ngInject */ ($state) => () =>
        $state.go('telecom.packs.pack'),
      packName: /* @ngInject */ ($transition$) =>
        $transition$.params().packName,
      breadcrumb: /* @ngInject */ (packName) => packName,

      ...ListLayoutHelper.stateResolves,
      apiPath: () => '/xdsl',
      defaultFilterColumn: () => 'description',
      dataModel: () => 'xdsl.Access',
      staticResources: () => true,
      resources: /* @ngInject */ ($http, apiPath, packName) => {
        return packName === 'sdsl'
          ? $http
              .get(apiPath, {
                headers: {
                  'X-Pagination-Mode': 'CachedObjectList-Pages',
                  'X-Pagination-Filter':
                    'packName:isnil=1&accessType:in=adsl,sdsl,vdsl',
                },
              })
              .then(({ data }) => data)
          : Promise.resolve([]);
      },
      header: /* @ngInject */ ($translate) =>
        $translate.instant('pack_xdsl_sdsl_page_title'),
      customizableColumns: /* @ngInject */ (packName) => packName === 'sdsl',
      hideBreadcrumb: /* @ngInject */ (packName) => packName === 'sdsl',
    },
    translations: {
      value: [
        '.',
        './common',
        '../task',
        '../pack/slots/emailPro',
        '../pack/slots/task',
      ],
      format: 'json',
    },
  });
};
