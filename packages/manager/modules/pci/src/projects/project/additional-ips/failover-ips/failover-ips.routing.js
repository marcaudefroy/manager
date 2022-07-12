export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('pci.projects.project.additional-ips.failover-ips', {
    url: '/failover-ips?ip',
    views: {
      ipView: 'pciProjectAdditionalIpsFailoverIps',
    },
    params: {
      ip: {
        dynamic: true,
        type: 'string',
      },
    },
    resolve: {
      breadcrumb: /* @ngInject */ () => null,
      additionalIp: /* @ngInject */ ($transition$) => $transition$.params().ip,
      additionalIpsRegions: /* @ngInject */ (failoverIps) =>
        Array.from(new Set(failoverIps.map(({ geoloc }) => geoloc))),
      failoverIps: /* @ngInject */ (additionalIps) => additionalIps.failoverIps,
      goToEditInstance: /* @ngInject */ ($state, projectId) => (serviceName) =>
        $state.go('pci.projects.project.additional-ips.failover-ips.edit', {
          projectId,
          serviceName,
        }),
      goToTerminate: /* @ngInject */ ($state, projectId) => (serviceName) =>
        $state.go(
          'pci.projects.project.additional-ips.failover-ips.terminate',
          {
            projectId,
            serviceName,
          },
        ),
      goToInstance: /* @ngInject */ ($state, projectId) => (instanceId) =>
        $state.href('pci.projects.project.instances.instance', {
          projectId,
          instanceId,
        }),
      goToImportFailoverIps: /* @ngInject */ ($state, projectId) => () =>
        $state.go('pci.projects.project.additional-ips.imports', {
          projectId,
        }),
    },
  });
};
