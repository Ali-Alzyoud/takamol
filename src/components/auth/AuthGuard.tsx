import { FC, PropsWithChildren, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { IonSpinner } from '@ionic/react';
import { useAuthStore } from '../../store/auth';
import { paths } from '../../utils/paths';

export const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, isLoading, refreshSession } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <IonSpinner />
      </div>
    );
  }

  // TODO: uncomment this when we have a login page
  // if (!isAuthenticated) {
  //   return <Redirect to={{ pathname: paths.login, state: { from: location } }} />;
  // }

  return <>{children}</>;
}; 