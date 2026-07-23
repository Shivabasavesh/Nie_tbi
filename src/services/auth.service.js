// This file is deprecated. Auth is now handled by Convex Auth natively via hooks.
// See src/hooks/useAuth.js and src/components/system/SessionProvider.jsx.

export const signInWithPassword = async () => {
  throw new Error("Deprecated. Use useAuthActions().signIn()");
};

export const signOut = async () => {
  throw new Error("Deprecated. Use useAuth().signOut()");
};

export const getSession = async () => {
  throw new Error("Deprecated. Auth state is managed via ConvexAuthProvider");
};

export const onAuthStateChange = () => {
  throw new Error("Deprecated. Listen to useAuth() instead");
};
