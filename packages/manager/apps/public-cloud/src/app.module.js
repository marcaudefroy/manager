/* eslint-disable import/no-webpack-loader-syntax, import/extensions */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import angular from 'angular';
import ngAnimate from 'angular-animate';
import uiRouter, { RejectType } from '@uirouter/angularjs';
import 'jquery-ui/ui/widget';
import 'jquery-ui/ui/widgets/mouse';
import 'jquery-ui/ui/widgets/draggable';
import 'script-loader!moment/min/moment.min.js';
import 'script-loader!angular-ui-validate/dist/validate.js';
import '@ovh-ux/ui-kit';
/* eslint-enable import/no-webpack-loader-syntax, import/extensions */

import get from 'lodash/get';
import has from 'lodash/has';
import isString from 'lodash/isString';

import navbar from '@ovh-ux/manager-navbar';
import ovhManagerAccountSidebar from '@ovh-ux/manager-account-sidebar';
import { registerCoreModule } from '@ovh-ux/manager-core';
import ovhManagerCookiePolicy from '@ovh-ux/manager-cookie-policy';
import ovhManagerMfaEnrollment from '@ovh-ux/mfa-enrollment';
import ovhManagerPci from '@ovh-ux/manager-pci';
import ngOvhApiWrappers from '@ovh-ux/ng-ovh-api-wrappers';
import ngOvhFeatureFlipping from '@ovh-ux/ng-ovh-feature-flipping';
import ngOvhUserPref from '@ovh-ux/ng-ovh-user-pref';
import ngUiRouterBreadcrumb from '@ovh-ux/ng-ui-router-breadcrumb';
import ngUiRouterLineProgress from '@ovh-ux/ng-ui-router-line-progress';
import ngOvhSsoAuthModalPlugin from '@ovh-ux/ng-ovh-sso-auth-modal-plugin';
import ngOvhPaymentMethod from '@ovh-ux/ng-ovh-payment-method';
import { detach as detachPreloader } from '@ovh-ux/manager-preloader';
import ovhNotificationsSidebar from '@ovh-ux/manager-notifications-sidebar';
import { isTopLevelApplication } from '@ovh-ux/manager-config';

import '@ovh-ux/ui-kit/dist/css/oui.css';

import 'ovh-ui-kit-bs/dist/css/oui-bs3.css';

import atInternet from './components/at-internet';
import darkMode from './components/dark-mode';

import './assets/theme/default/index.less';
import './index.scss';

import controller from './index.controller';
import service from './index.service';
import routing from './index.routes';

const getEnvironment = (shellClient) => {
  return shellClient.environment.getEnvironment();
};

const getLocale = (shellClient) => {
  return shellClient.i18n.getLocale();
};

export default async (containerEl, shellClient) => {
  const moduleName = 'ovhPublicCloudApp';

  const [environment, locale] = await Promise.all([
    getEnvironment(shellClient),
    getLocale(shellClient),
  ]);

  const coreCallbacks = {
    onLocaleChange: (lang) => {
      shellClient.i18n.setLocale(lang);
    },
  };

  angular
    .module(
      moduleName,
      [
        ...get(__NG_APP_INJECTIONS__, environment.getRegion(), []),
        atInternet,
        darkMode,
        ngAnimate,
        ngUiRouterBreadcrumb,
        isTopLevelApplication() ? ngUiRouterLineProgress : null,
        ngOvhApiWrappers,
        ngOvhFeatureFlipping,
        ngOvhPaymentMethod,
        ngOvhSsoAuthModalPlugin,
        ngOvhUserPref,
        navbar,
        'oui',
        ovhManagerAccountSidebar,
        registerCoreModule(environment, coreCallbacks),
        isTopLevelApplication() ? ovhManagerCookiePolicy : null,
        ovhManagerMfaEnrollment,
        ovhManagerPci,
        ovhNotificationsSidebar,
        uiRouter,
      ].filter(isString),
    ) // Remove null because __NG_APP_INJECTIONS__ can be null
    .controller('PublicCloudController', controller)
    .service('publicCloud', service)
    .config(
      /* @ngInject */ ($locationProvider) => $locationProvider.hashPrefix(''),
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
    .constant('ovhShell', shellClient)
    .config(
      /* @ngInject */ (ovhFeatureFlippingProvider) => {
        ovhFeatureFlippingProvider.setApplicationName(
          environment.getApplicationName(),
        );
      },
    )
    .config(routing)
    .config(
      /* @ngInject */ (ovhPaymentMethodProvider) => {
        ovhPaymentMethodProvider.setUserLocale(locale);
      },
    )
    .run(
      /* @ngInject */ ($translate) => {
        let lang = $translate.use();

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
    .config(
      /* @ngInject */ (ouiCalendarConfigurationProvider) => {
        const lang = locale;
        return import(`flatpickr/dist/l10n/${lang}.js`)
          .then((module) => {
            ouiCalendarConfigurationProvider.setLocale(module.default[lang]);
          })
          .catch(() => {});
      },
    )
    .run(
      /* @ngInject */ ($rootScope, $state) => {
        $state.defaultErrorHandler((error) => {
          if (error.type === RejectType.ERROR) {
            $rootScope.$emit('ovh::sidebar::hide');
            $state.go(
              'pci.error',
              {
                detail: {
                  message: get(error.detail, 'data.message'),
                  code: has(error.detail, 'headers')
                    ? error.detail.headers('x-ovh-queryId')
                    : null,
                },
              },
              { location: false },
            );
          }
        });
      },
    )
    .run(/* @ngTranslationsInject:json ./translations */)
    .run(
      /* @ngInject */ ($transitions) => {
        // replace ngOvhUiRouterLineProgress if in container
        if (!isTopLevelApplication()) {
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
        }
      },
    )
    .run(
      /* @ngInject */ ($rootScope, $transitions) => {
        const unregisterHook = $transitions.onSuccess({}, () => {
          if (isTopLevelApplication()) {
            detachPreloader();
          }
          $rootScope.$broadcast('app:started');
          unregisterHook();
        });
      },
    )
    .config(
      /* @ngInject */ (ovhFeatureFlippingProvider) => {
        ovhFeatureFlippingProvider.setApplicationName('public-cloud');
      },
    )
    .run(
      /* @ngInject */ ($rootScope) => {
        shellClient.ux.onOpenChatbot(() => {
          $rootScope.$emit('ovh-chatbot:open');
        });
      },
    );

  angular.bootstrap(containerEl, [moduleName], {
    strictDi: true,
  });

  return moduleName;
};
