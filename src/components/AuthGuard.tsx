import { FC, PropsWithChildren, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { IonSpinner } from '@ionic/react';
import { useAuthStore } from '../store/auth';

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

  if (!isAuthenticated) {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }

  return <>{children}</>;
}; 