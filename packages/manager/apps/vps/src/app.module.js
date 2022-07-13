/* eslint-disable import/extensions, import/no-webpack-loader-syntax */
import 'script-loader!jquery';
import 'script-loader!moment/min/moment.min.js';
import 'script-loader!jsurl/lib/jsurl';
import 'script-loader!bootstrap/dist/js/bootstrap';
/* eslint-enable import/extensions, import/no-webpack-loader-syntax */

import { isString, get } from 'lodash-es';

import angular from 'angular';
import cloudUniverseComponents from '@ovh-ux/ng-ovh-cloud-universe-components';
import ngUiRouterBreadcrumb from '@ovh-ux/ng-ui-router-breadcrumb';
import ovhManagerVps from '@ovh-ux/manager-vps';
import { registerCoreModule } from '@ovh-ux/manager-core';
import ngOvhPaymentMethod from '@ovh-ux/ng-ovh-payment-method';

import ngOvhSsoAuth from '@ovh-ux/ng-ovh-sso-auth';
import ngOvhSsoAuthModalPlugin from '@ovh-ux/ng-ovh-sso-auth-modal-plugin';

import '@ovh-ux/ui-kit/dist/css/oui.css';
import 'ovh-ui-kit-bs/dist/css/oui-bs3.css';

export default async (containerEl, shellClient) => {
  const moduleName = 'vpsApp';

  shellClient.i18n.onLocaleChange(() => {
    window.top.location.reload();
  });

  const [environment, locale] = await Promise.all([
    shellClient.environment.getEnvironment(),
    shellClient.i18n.getLocale(),
  ]);

  angular
    .module(
      moduleName,
      [
        cloudUniverseComponents,
        ngUiRouterBreadcrumb,
        registerCoreModule(environment, {
          onLocaleChange: (lang) => {
            shellClient.i18n.setLocale(lang);
          },
        }),
        ovhManagerVps,
        ngOvhPaymentMethod,
        ngOvhSsoAuth,
        ngOvhSsoAuthModalPlugin,
        ...get(__NG_APP_INJECTIONS__, environment.getRegion(), []),
      ].filter(isString),
    )
    .config(
      /* @ngInject */ ($locationProvider) => {
        $locationProvider.hashPrefix('');
      },
    )
    .config(
      /* @ngInject */ (CucConfigProvider) => {
        CucConfigProvider.setRegion(environment.getRegion());
      },
    )
    .config(
      /* @ngInject */ (ovhPaymentMethodProvider) => {
        ovhPaymentMethodProvider.setUserLocale(environment.getUserLocale());
      },
    )
    .config(
      /* @ngInject */ ($qProvider) => {
        $qProvider.errorOnUnhandledRejections(false);
      },
    )
    .config(
      /* @ngInject */ ($urlRouterProvider) => {
        $urlRouterProvider.otherwise('/vps');
      },
    )
    .config(
      /* @ngInject */ (ssoAuthModalPluginFctProvider) => {
        ssoAuthModalPluginFctProvider.setOnLogout(() => {
          shellClient.auth.logout();
        });
        ssoAuthModalPluginFctProvider.setOnReload(() => {
          shellClient.navigation.reload();
        });
      },
    )
    .config(
      /* @ngInject */ (ssoAuthenticationProvider) => {
        ssoAuthenticationProvider.setOnLogin(() => {
          shellClient.auth.login();
        });
        ssoAuthenticationProvider.setOnLogout(() => {
          shellClient.auth.logout();
        });
      },
    )
    .run(
      /* @ngInject */ () => {
        let lang = locale;

        if (['en_GB', 'es_US', 'fr_CA'].includes(lang)) {
          lang = lang.toLowerCase().replace('_', '-');
        } else {
          [lang] = lang.split('_');
        }

        return import(`script-loader!moment/locale/${lang}.js`).then(() =>
          moment.locale(lang),
        );
      },
    )
    .run(
      /* @ngInject */ ($transitions) => {
        $transitions.onBefore({}, (transition) => {
          if (
            !transition.ignored() &&
            transition.from().name !== '' &&
            transition.entering().length > 0
          ) {
            shellClient.ux.startProgress();
          }
        });

        $transitions.onSuccess({}, () => {
          shellClient.ux.stopProgress();
        });

        $transitions.onError({}, (transition) => {
          if (!transition.error().redirected) {
            shellClient.ux.stopProgress();
          }
        });
      },
    )
    .run(
      /* @ngInject */ ($rootScope, $transitions) => {
        const unregisterHook = $transitions.onSuccess({}, async () => {
          await shellClient.ux.hidePreloader();
          $rootScope.$broadcast('app:started');
          unregisterHook();
        });
      },
    );

  angular.bootstrap(containerEl, [moduleName], {
    strictDi: true,
  });

  return moduleName;
};
