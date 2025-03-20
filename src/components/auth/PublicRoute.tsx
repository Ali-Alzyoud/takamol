import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { paths } from '../../utils/paths';
interface PublicRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  authRestricted?: boolean; // if true, an authenticated user gets redirected away
}

const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component, authRestricted = false, ...rest }) => {
  const { isAuthenticated } = useAuthStore();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && authRestricted ? (
          <Redirect to={paths.discussions} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
