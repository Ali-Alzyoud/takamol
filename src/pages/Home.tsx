import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { globeOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { paths } from '../utils/paths';
import './Home.css';


const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();


  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const handleGetStarted = () => {
    history.push(paths.login);
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border ion-padding">
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton className='button-round' fill="outline" onClick={toggleLanguage} >
              <IonIcon slot="start" icon={globeOutline} />
              {t('common.language')}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="logo-container">
          <IonImg src="/assets/logo.svg" alt="Takamol Logo" className="logo" />
        </div>

        <div className="button-container">
          <IonButton
            expand="block"
            className="get-started-button"
            shape="round"
            size="large"
            onClick={handleGetStarted}
          >
            {t('common.getStarted')}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;