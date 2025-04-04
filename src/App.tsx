import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { TermsAndPrivacy } from './components/terms/TermsAndPrivacy';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DiscussionPage } from './pages/Discussion';
import { TopicPage } from './pages/Topic';

import './i18n';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

import '@ionic/react/css/palettes/dark.always.css';
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './theme/global.css';
import { paths } from './utils/paths';
import PublicRoute from './components/auth/PublicRoute';

const queryClient = new QueryClient();

setupIonicReact();

const App: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <QueryClientProvider client={queryClient}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>

            {/* Public Routes */}
            <PublicRoute exact path={paths.login} component={Login} authRestricted />
            <PublicRoute exact path={paths.signup} component={Signup} authRestricted />
            <PublicRoute exact path={paths.terms} component={TermsAndPrivacy} />
            <PublicRoute path={paths.home} component={Home} exact />

            {/* Protected Routes */}
            <ProtectedRoute component={TopicPage} path={`${paths.topic}/:id`} />
            <ProtectedRoute component={DiscussionPage} path={paths.discussions} />


            {/* Fallback Route - Redirect to home if no route matches */}
            <Route
              render={() => <Redirect to={paths.home} />}
            />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </QueryClientProvider>
  );
};

export default App;
