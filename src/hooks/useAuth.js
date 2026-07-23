import { useContext } from 'react';
import { AuthContext } from '../components/system/SessionProvider';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a SessionProvider');
  }

  return context;
};
