export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('nasha.dashboard.general-information.edit-name', {
    url: 'edit-name',
    component: 'nashaComponentsEditName',
    resolve: {
      breadcrumb: () => null,
      close: /* @ngInject */ (goToDashboard) => (success) =>
        goToDashboard({ success }),
      dismiss: /* @ngInject */ (goToDashboard) => (error) =>
        goToDashboard({ error }),
    },
  });
};
