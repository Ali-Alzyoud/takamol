import {
  IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';
import { arrowBackOutline, arrowForward, key, qrCode } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import './Signup.css';
import { paths } from '../utils/paths';
const Signup: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'passkey' | 'qr'>('passkey');
  const [passkey, setPasskey] = useState('');

  const handleSignup = () => {
    // TODO: Implement signup logic here
    console.log('Signing up with passkey:', passkey);
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border ion-padding">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={paths.login} text={""} icon={i18n.language === 'ar' ? arrowForward : arrowBackOutline} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="signup-container">
          <h1>{t('auth.signupTitle')}</h1>
          <p className="welcome-text">{t('auth.welcomeMessage')}</p>
          <p className="description-text">{t('auth.passkeyDescription')}</p>

          <div className="signup-method-selector">
            <IonSegment value={activeTab} onIonChange={e => setActiveTab(e.detail.value as 'passkey' | 'qr')}>
              <IonSegmentButton value="passkey">
                <IonIcon icon={key} />
                <div className="segment-label">{t('auth.enterPasskey')}</div>
              </IonSegmentButton>
              <IonSegmentButton value="qr">
                <IonIcon icon={qrCode} />
                <div className="segment-label">{t('auth.scanQRCode')}</div>
              </IonSegmentButton>
            </IonSegment>
          </div>

          {activeTab === 'passkey' && (
            <div className="passkey-input-container">
              <IonInput
                label={t('auth.passkey')}
                labelPlacement="floating"
                fill="solid"
                className="custom-input"
                value={passkey}
                onIonInput={e => setPasskey(e.detail.value || '')}
              />
            </div>
          )}

          {activeTab === 'qr' && (
            <div className="qr-container">
              {/* Add QR scanner component here */}
            </div>
          )}

          <IonButton
            expand="block"
            className="signup-button"
            onClick={handleSignup}
            disabled={!passkey && activeTab === 'passkey'}
          >
            {t('auth.signUp')}
            <IonIcon icon={arrowForward} slot="end" />
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Signup;