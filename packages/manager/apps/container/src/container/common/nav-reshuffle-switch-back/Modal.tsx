import { useShell } from '@/context';
import React from 'react';

import { useTranslation } from 'react-i18next';

import style from './style.module.scss';

type Props = {
  onCancel(): void;
  onConfirm(showModal?: boolean): void;
};

function NavReshuffleSwitchBackModal({
  onCancel,
  onConfirm,
}: Props): JSX.Element {
  const { t } = useTranslation('beta-modal');
  const shell = useShell();
  const trackingPlugin = shell.getPlugin('tracking');

  return (
    <div
      className={style.backdrop}
      onClick={() => {
        onCancel();
      }}
    >
      <fieldset
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
        className={style.modal}
      >
        <h1 id="modalTitle">{t('beta_modal_switch_title')}</h1>
        <p id="modalDescription">{t('beta_modal_switch_infos')}</p>
        <div className="d-flex flex-row justify-content-between">
          <button
            type="button"
            className="oui-button oui-button_secondary float-right mr-2"
            onClick={() => {
              trackingPlugin.trackClick({
                name: 'topnav::switch_versionpopin::decline_survey',
                type: 'navigation',
              });
              onConfirm();
            }}
          >
            {t('beta_modal_switch_later')}
          </button>
          <button
            autoFocus
            type="button"
            className="oui-button oui-button_primary float-right"
            onClick={() => {
              trackingPlugin.trackClick({
                name: 'topnav::switch_version_popin::go_to_survey',
                type: 'navigation',
              });
              onConfirm(true);
            }}
          >
            {t('beta_modal_switch_accept')}
          </button>
        </div>
      </fieldset>
    </div>
  );
}

export default NavReshuffleSwitchBackModal;
