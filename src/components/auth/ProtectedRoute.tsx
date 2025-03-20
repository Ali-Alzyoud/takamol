import { IonSpinner } from '@ionic/react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { paths } from '../../utils/paths';


interface Props extends RouteProps {
  component: React.ComponentType<any>;
  restricted?: boolean;
}

export const ProtectedRoute = ({ component: Component, restricted = false, ...rest }: Props) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  return <Route
    {...rest}
    render={(props) =>
      isLoading ? (
        <div>
          <IonSpinner />
        </div>
      ) : isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={paths.login} />
      )
    }
  />
}

