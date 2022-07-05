import React, { Suspense, useState } from 'react';

import LegacyContainer from '@/container/legacy';
import NavReshuffleContainer from '@/container/nav-reshuffle';
import { useShell } from '@/context';
import useContainer from '@/core/container';
import { ProductNavReshuffleProvider } from '@/core/product-nav-reshuffle';
import { ProgressProvider } from '@/context/progress';
import CookiePolicy from '@/cookie-policy/CookiePolicy';
import SSOAuthModal from '@/sso-auth-modal/SSOAuthModal';
import LiveChat from '@/components/LiveChat';

export default function Container(): JSX.Element {
  const {
    isLoading,
    betaVersion,
    useBeta,
    chatbotOpen,
    setChatbotOpen,
  } = useContainer();
  const shell = useShell();
  const tracking = shell.getPlugin('tracking');
  const locale = shell.getPlugin('i18n').getLocale();

  const isNavReshuffle = betaVersion && useBeta;
  if (isLoading) {
    return <></>;
  }
  if (isNavReshuffle) {
    if (betaVersion === 1) {
      tracking.trackMVTest({
        test: '[product-navigation-reshuffle]',
        waveId: 1,
        creation: '[full-services]',
      });
    } else if (betaVersion === 2) {
      tracking.trackMVTest({
        test: '[product-navigation-reshuffle]',
        waveId: 1,
        creation: '[customer-services]',
      });
    }

    shell.getPlugin('ux').showMenuSidebar();
  }
  return (
    <>
      <ProgressProvider>
        {isNavReshuffle ? (
          <ProductNavReshuffleProvider>
            <NavReshuffleContainer />
          </ProductNavReshuffleProvider>
        ) : (
          <>
            <LegacyContainer />
          </>
        )}
        <LiveChat
          locale={locale}
          open={chatbotOpen}
          onClose={() => shell.getPlugin('ux').closeChatbot()}
          style={{ position: 'absolute' }}
        ></LiveChat>
      </ProgressProvider>

      <Suspense fallback="">
        <SSOAuthModal />
      </Suspense>
      <Suspense fallback="...">
        <CookiePolicy shell={shell} />
      </Suspense>
    </>
  );
}
