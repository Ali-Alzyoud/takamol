import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonProgressBar,
  IonToolbar
} from '@ionic/react';
import { arrowBackOutline, arrowForward, key } from 'ionicons/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, } from 'react-router-dom';
import { useAlert } from '../hooks/useAlert';
import { useAuthStore } from '../store/auth';
import { paths } from '../utils/paths';
import './Login.css';

const Login: React.FC = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();

  const { showAlert } = useAlert();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const { login, isLoading, } = useAuthStore();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({
        username,
        password,
      });
    } catch (error) {
      showAlert(error);
    }
  };

  const handleSignupClick = () => {
    history.push(paths.signup);
  };


  return (
    <>
      {isLoading && <IonProgressBar type="indeterminate"></IonProgressBar>}
      <IonPage>

        <IonHeader className="ion-no-border ion-padding-top ion-padding-horizontal">
          <IonToolbar >
            <IonButtons slot="start">
              <IonBackButton defaultHref={paths.home} text={""} icon={i18n.language === 'ar' ? arrowForward : arrowBackOutline} />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="login-container">
            <h1>{t('auth.loginTitle')}</h1>
            <p className="subtitle">{t('auth.loginSubtitle')}</p>

            <form onSubmit={handleSubmit} className="login-form">
              <IonInput
                label={t('auth.username')}
                labelPlacement="floating"
                fill="solid"
                autoFocus
                className="custom-input"
                value={username}
                onIonInput={(e) => setUsername(e.detail.value || '')}
              />

              <IonInput
                label={t('auth.password')}
                labelPlacement="stacked"
                type="password"
                fill="solid"
                className="custom-input"
                value={password}
                onIonInput={(e) => setPassword(e.detail.value || '')}
              />

              <IonButton
                expand="block"
                className="sign-in-button"
                type="submit"
              >
                {t(isLoading ? 'loading' : 'auth.signIn')}
                <IonIcon icon={arrowForward} slot="end" />
              </IonButton>
            </form>

            <div className="signup-section">
              <p className="new-user-text">{t('auth.newToTakamol')}</p>
              <IonButton
                expand="block"
                fill="outline"
                className="passkey-button"
                onClick={handleSignupClick}
              >
                {t('auth.signUpWithPasskey')}
                <IonIcon icon={key} slot="end" />
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Login;