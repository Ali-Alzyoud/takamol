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
  IonProgressBar,
} from '@ionic/react';
import { arrowBackOutline, arrowForward } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useHistory } from 'react-router-dom';
import './Signup.css';
import { paths } from '../utils/paths';
import { TermsAndPrivacy } from '../components/terms/TermsAndPrivacy';
import { useAuthStore } from '../store/auth';
import { useAlert } from '../hooks/useAlert';
import { useIonAlert } from '@ionic/react';
import { RegisterResponse } from '../types/auth';

const Signup: React.FC = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const { showAlert } = useAlert();
  const { register } = useAuthStore();
  const [presentAlert] = useIonAlert();
  
  const [username, setUsername] = useState('');
  const [passkey, setPasskey] = useState('');
  const [invitePassword, setInvitePassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showingTerms, setShowingTerms] = useState(false);

  const signupMutation = useMutation<RegisterResponse>({
    mutationFn: async () => {
      const response = await register({
        username,
        email,
        password,
        invite_code: passkey,
        invite_password: invitePassword,
      });
      return response;
    },
    onSuccess: (data) => {
      presentAlert({
        header: t('auth.signupSuccess'),
        message: data.message,
        buttons: [
          {
            text: t('common.ok'),
            handler: () => {
              history.replace(paths.login);
            },
          },
        ],
      });
    },
    onError: (error) => {
      showAlert(error);
    },
  });

  function onClickSignup() {
    if(!acceptedTerms) {
      setShowingTerms(true);
      return;
    }
    signupMutation.mutate();
  }

  const handleAcceptTerms = () => {
    setShowingTerms(false);
    setAcceptedTerms(true);
    signupMutation.mutate();
  };

  if(showingTerms) return <TermsAndPrivacy onAccept={handleAcceptTerms} />

  return (
    <IonPage>
      <IonHeader className="ion-no-border ion-padding">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={paths.login} text={""} icon={i18n.language === 'ar' ? arrowForward : arrowBackOutline} />
          </IonButtons>
        </IonToolbar>
        {signupMutation.isPending && <IonProgressBar type="indeterminate" />}
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="signup-container">
          <h1>{t('auth.signupTitle')}</h1>
          <p className="welcome-text">{t('auth.welcomeMessage')}</p>
          <p className="description-text">{t('auth.passkeyDescription')}</p>

        <div className="input-container">
          <IonInput
            label={t('auth.username')}
            labelPlacement="floating"
            fill="solid"
            className="custom-input"
            value={username}
            onIonInput={e => setUsername(e.detail.value || '')} 
            disabled={signupMutation.isPending}
          />
        </div>

        <div className="input-container">
          <IonInput
            label={t('email')}
            labelPlacement="floating"
            fill="solid"
            className="custom-input"
            value={email}
            onIonInput={e => setEmail(e.detail.value || '')} 
            disabled={signupMutation.isPending}
          />
        </div>

        <div className="input-container">
          <IonInput
            label={t('password')}
            labelPlacement="floating"
            fill="solid"
            className="custom-input"
            type="password"
            value={password}
            onIonInput={e => setPassword(e.detail.value || '')}
            disabled={signupMutation.isPending}
          />
        </div>

        <div className="passkey-input-container">
          <IonInput
            label={t('auth.passkey')}
            labelPlacement="floating"
            fill="solid"
            className="custom-input"
            value={passkey}
            onIonInput={e => setPasskey(e.detail.value || '')}
            disabled={signupMutation.isPending}
          />
        </div>

        <div className="input-container">
          <IonInput
            label={t('auth.invitePassword')}
            labelPlacement="floating"
            fill="solid"
            className="custom-input"
            value={invitePassword}
            onIonInput={e => setInvitePassword(e.detail.value || '')}
            disabled={signupMutation.isPending}
          />
        </div>

        <IonButton
          expand="block"
          className="signup-button"
          onClick={onClickSignup}
          disabled={!passkey || !email || !password || !username || !invitePassword || signupMutation.isPending}
        >
          {signupMutation.isPending ? t('common.loading') : t('auth.signUp')}
          <IonIcon icon={arrowForward} slot="end" />
        </IonButton>
      </div>
    </IonContent>
  </IonPage>
  );
};

export default Signup;