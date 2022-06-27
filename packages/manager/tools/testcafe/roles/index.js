import { Role } from 'testcafe';
import AuthLoginPage from '../pages/auth/login';

export function userRole(config, targetUrl, user) {
  const page = new AuthLoginPage(config, user);
  return Role(
    page.getLoginUrl(targetUrl),
    async () => {
      await page.login();
    },
    { preserveUrl: true },
  );
}

export async function userRoleDisconnect(config) {
  const page = new AuthLoginPage(config);
  await page.logout();
}

export default {
  userRole,
  userRoleDisconnect,
};
