import { IonButton, IonContent, IonPage } from '@ionic/react';
import styles from './TermsAndPrivacy.module.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const TermsAndPrivacy = (onAccept: { onAccept: VoidFunction }) => {
  const { t } = useTranslation();

  return (
    <IonPage>
      <IonContent>
        <div className={styles.container}>
          <div className={styles.logo}>
            <img src="/assets/logo.svg" alt={t('common.logo')} />
          </div>

          <h1 className={styles.title}>{t('terms.title')}</h1>

          <section className={styles.section}>
            <h2>{t('terms.privacy.title')}</h2>
            <p>{t('terms.privacy.description')}</p>
          </section>

          <section className={styles.section}>
            <h2>{t('terms.collective.title')}</h2>
            <p>{t('terms.collective.description')}</p>
          </section>

          <section className={styles.section}>
            <h2>{t('terms.transparency.title')}</h2>
            <p>
              {t('terms.transparency.description.start')}{' '}
              <Link to="/terms" className={styles.link}>
                {t('terms.links.terms')}
              </Link>{' '}
              {t('terms.transparency.description.and')}{' '}
              <Link to="/privacy" className={styles.link}>
                {t('terms.links.privacy')}
              </Link>
              {t('terms.transparency.description.end')}
            </p>
          </section>

          <IonButton
            expand="block"
            className={styles.acceptButton}
            onClick={onAccept.onAccept}
          >
            {t('terms.accept')}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}; 