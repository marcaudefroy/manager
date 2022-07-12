import { TABS } from '../../additional-ips.constants';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state(
    'pci.projects.project.additional-ips.floating-ips.terminate',
    {
      url: '/:serviceName/terminate',
      views: {
        modal: {
          component: 'pciAdditionalIpsTerminate',
        },
      },
      layout: 'modal',
      resolve: {
        breadcrumb: /* @ngInject */ () => null,
        floatingip: /* @ngInject */ (serviceName, floatingIps) =>
          floatingIps.find(({ id }) => id === serviceName),
        goBack: /* @ngInject */ (goToAdditionalIps) => (message, type) =>
          goToAdditionalIps(message, type, TABS.FLOATING_IP),
        ip: /* @ngInject */ (floatingip) => floatingip?.ip,
        serviceName: /* @ngInject */ ($transition$) =>
          $transition$.params().serviceName,
        terminateIp: /* @ngInject */ ($http, floatingip, projectId) => (
          serviceName,
        ) =>
          $http.delete(
            `/cloud/project/${projectId}/region/${floatingip.region}/floatingip/${serviceName}`,
          ),
      },
    },
  );
};
