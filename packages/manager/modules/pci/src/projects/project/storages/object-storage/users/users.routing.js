export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('pci.projects.project.storages.object-storage.users', {
    url: '/users',
    views: {
      containersView: 'pciProjectStorageObjectStorageUsers',
    },
    params: {
      userDetails: null,
      userCredential: null,
    },
    resolve: {
      userDetails: /* @ngInject */ ($transition$) =>
        $transition$.params().userDetails,
      userCredential: /* @ngInject */ ($transition$) =>
        $transition$.params().userCredential,
      goToUsersAndRoles: /* @ngInject */ (
        $state,
        atInternet,
        trackingPrefix,
      ) => () => {
        atInternet.trackClick({
          name: `${trackingPrefix}s3-policies-users::add`,
          type: 'action',
        });
        return $state.go('pci.projects.project.users');
      },
      goToDeleteUser: /* @ngInject */ ($state) => (user) =>
        $state.go('pci.projects.project.storages.object-storage.users.delete', {
          userId: user.id,
        }),
      goToImportPolicy: /* @ngInject */ ($state) => (user) =>
        $state.go(
          'pci.projects.project.storages.object-storage.users.import-policy',
          {
            userId: user.id,
          },
        ),
      downloadOpenStackRclone: /* @ngInject */ ($state, projectId) => (user) =>
        $state.go(
          'pci.projects.project.storages.object-storage.users.download-rclone',
          {
            projectId,
            userId: user.id,
          },
        ),
      goToUsersBanner: /* @ngInject */ ($state, projectId) => (
        reload = false,
        userDetails,
        userCredential,
      ) =>
        $state.go(
          'pci.projects.project.storages.object-storage.users',
          {
            projectId,
            userDetails,
            userCredential,
          },
          {
            reload,
          },
        ),
      goToAddUser: /* @ngInject */ ($state) => () =>
        $state.go('pci.projects.project.storages.object-storage.users.add'),
      goToUsers: /* @ngInject */ (CucCloudMessage, $state, projectId) => (
        message = false,
        type = 'success',
      ) => {
        const reload = message && type === 'success';

        const promise = $state.go(
          'pci.projects.project.storages.object-storage.users',
          {
            projectId,
          },
          {
            reload,
          },
        );

        if (message) {
          promise.then(() =>
            CucCloudMessage[type](
              message,
              'pci.projects.project.storages.object-storage.users',
            ),
          );
        }

        return promise;
      },
      breadcrumb: /* @ngInject */ ($translate) =>
        $translate.instant(
          'pci_projects_project_storages_containers_s3_users_label',
        ),
    },
    atInternet: {
      rename: 'pci::projects::project::storages::objects::s3-policies-users',
    },
  });
};
