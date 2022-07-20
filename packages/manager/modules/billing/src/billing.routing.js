import controller from './billing.controller';
import template from './billing.html';
import {
  GUIDES_LIST,
  GUIDE_TRACKING_TAG,
} from './constants/guides-header.constants';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('app.account.billing', {
    url: '/billing',
    abstract: true,
    translations: { value: ['.'], format: 'json' },
    template,
    controller,
    resolve: {
      denyEnterprise: ($q, $state, currentUser) => {
        if (
          currentUser.isEnterprise &&
          $state.transition.to().name !== 'app.account.billing.autorenew.ssh'
        ) {
          return $q.reject({
            status: 403,
            message: 'Access forbidden for enterprise accounts',
            code: 'FORBIDDEN_BILLING_ACCESS',
          });
        }

        return false;
      },
      goToOrders: /* @ngInject */ ($state) => () =>
        $state.go('app.account.billing.orders'),

      guides: /* @ngInject */ (currentUser) => {
        Object.keys(GUIDES_LIST).forEach((key) => {
          Object.entries(GUIDES_LIST[key]).forEach(([subKey, value]) => {
            GUIDES_LIST[key][subKey].url =
              typeof value.url === 'object'
                ? value.url[currentUser.ovhSubsidiary] || value.url.DEFAULT
                : value.url;
          });
        });
        return { url: GUIDES_LIST, tracking: GUIDE_TRACKING_TAG };
      },

      trackClick: /* @ngInject */ (atInternet) => (hit) => {
        return atInternet.trackClick({
          name: hit,
          type: 'action',
        });
      },
    },
  });
};
