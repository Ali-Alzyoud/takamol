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
} from '@ionic/react';
import { arrowForward, key } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import './Login.css';
import { useHistory } from 'react-router-dom';
import { paths } from '../utils/paths';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO:Add your login logic here
    try {
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSignupClick = () => {
    history.push(paths.signup);
  };


  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar >
          <IonButtons slot="start">
            <IonBackButton defaultHref={paths.home} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="login-container">
          <h1>{t('auth.loginTitle')}</h1>
          <p className="subtitle">{t('auth.loginSubtitle')}</p>

          <form onSubmit={handleSubmit} className="login-form">
            <IonInput
              label={t('auth.username')}
              labelPlacement="floating"
              fill="solid"
              className="custom-input"
            />

            <IonInput
              label={t('auth.password')}
              labelPlacement="stacked"
              type="password"
              fill="solid"
              className="custom-input"
            />

            <IonButton
              expand="block"
              className="sign-in-button"
              type="submit"
            >
              {t('auth.signIn')}
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
  );
};

export default Login;