import * as React from "react"
import {
  useNavigate,
  useLocation,
  Navigate,
  useSearchParams
} from "react-router-dom"

import { User, CookieSession } from '../session'

interface AuthContextType {
  user: User | null
  signin: (data: any, callback: VoidFunction) => void
  signout: (callback?: VoidFunction) => void
  token: () => string | null
}

const AuthContext = React.createContext<AuthContextType>(null!);
const session = new CookieSession("artemis_user")

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const usr = session.get()
  const [user, setUser] = React.useState<User | null>(usr)

  const signin = (data: any, callback: VoidFunction) => {
    session.set(data)
    setUser(data)
    callback()
  }

  const signout = (callback?: VoidFunction) => {
    session.remove()
    setUser(null)
    if (callback) callback()
  }

  const token = (): string | null => {
    return user?.token || null
  };

  const value = { user, signin, signout, token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function getToken(): string | null {
  const user = session.get()
  return user?.token || null
}

export function unauthorized() {
  session.remove()
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};
