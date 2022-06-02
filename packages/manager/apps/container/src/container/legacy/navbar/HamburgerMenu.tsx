import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { TRANSLATE_NAMESPACE } from './constants';
import style from './navbar.module.scss';
import { Universe } from './service';
import { useShell } from '@/context';

type Props = {
  universe?: string;
  universes: Universe[];
};

function HamburgerMenu({ universe = '', universes }: Props): JSX.Element {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation(TRANSLATE_NAMESPACE);
  const shell = useShell();

  function onUniverseClick({
    event,
    destination,
  }: {
    event: React.MouseEvent<HTMLAnchorElement>;
    destination: string;
  }) {
    if (universe === destination) {
      event.preventDefault();
      shell.getPlugin('ux').requestClientSidebarOpen();
      setOpened(false);
    }
  }

  return (
    <div>
      <button
        role="button"
        type="button"
        className="oui-navbar-toggler oui-navbar-toggler_button"
        onClick={() => setOpened(!opened)}
        aria-expanded={opened}
      >
        <span className="oui-navbar-toggler__hamburger">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      <div
        className={`oui-navbar-menu_toggle oui-navbar-menu oui-navbar-menu_fixed ${opened &&
          style.hamburgerOpen}`}
        aria-expanded="true"
        role="menu"
      >
        {universes.map((u) => (
          <a
            className={`oui-navbar-link oui-navbar-link_${
              u.isPrimary ? 'primary' : 'secondary'
            }`}
            key={u.universe}
            href={u.url}
            onClick={(event) =>
              onUniverseClick({
                event,
                destination: u.universe,
              })
            }
          >
            {t(`navbar_universe_${u.universe}`)}
            {universe === u.universe ? (
              <span className="oui-icon oui-icon-chevron-right float-right"></span>
            ) : (
              ''
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

export default HamburgerMenu;
