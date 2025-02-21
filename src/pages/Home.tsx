import {
  IonContent,
  IonPage,
  IonButton,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonButtons,
} from '@ionic/react';
import { globeOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import './Home.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  
  // Add this useEffect to set initial direction
  useEffect(() => {
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const handleGetStarted = () => {
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color="dark">
          <IonButtons slot="end">
            <IonButton fill="clear" color="light" onClick={toggleLanguage}>
              <IonIcon slot="start" icon={globeOutline} />
              {t('common.language')}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen className="ion-padding" color="dark">
        <div className="logo-container">
          <img src="/assets/logo.svg" alt="Takamol Logo" className="logo" />
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