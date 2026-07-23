import React, { createContext } from 'react';
import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";

export const AuthContext = createContext({
  session: null,
  user: null,
  isLoading: true,
  signOut: async () => {},
});

export const SessionProvider = ({ children }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signOut } = useAuthActions();

  // We map Convex Auth state to the legacy Supabase shape.
  // Since the app only checks if user is truthy, providing `isAuthenticated` is sufficient.
  return (
    <AuthContext.Provider value={{ 
      session: isAuthenticated ? {} : null, 
      user: isAuthenticated ? {} : null, 
      isLoading,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};
