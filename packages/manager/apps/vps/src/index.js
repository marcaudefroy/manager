import 'script-loader!jquery'; // eslint-disable-line
import 'whatwg-fetch';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { useShellClient } from '@ovh-ux/shell';

useShellClient('telecom').then((shellClient) => {
  shellClient.environment.getEnvironment().then((environment) => {
    environment.setVersion(__VERSION__);
    shellClient.ux.startProgress();

    import(`./config-${environment.getRegion()}`)
      .catch(() => {})
      .then(() => import('./app.module'))
      .then(({ default: startApplication }) => {
        startApplication(document.body, shellClient);
      });
  });
});
