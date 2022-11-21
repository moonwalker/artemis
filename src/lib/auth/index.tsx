import * as React from "react"
import {
  useNavigate,
  useLocation,
  Navigate,
  useSearchParams
} from "react-router-dom"
import { token } from '../token'

interface AuthContextType {
  // user: {
  //   login: string,
  //   image: string
  // }
  // token: string,
  user: any,
  signin: (data: any, callback: VoidFunction) => void;
  signout: (callback?: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let usr
  const stored = localStorage.getItem("artemis_user")
  if (stored != null) {
    usr = JSON.parse(stored)
  }
  const [user, setUser] = React.useState<any>(usr)

  const signin = (data: any, callback: VoidFunction) => {
    token.set(data.token)
    delete data.token
    localStorage.setItem("artemis_user", JSON.stringify(data))
    setUser(data)
    callback()
  };

  const signout = (callback?: VoidFunction) => {
    token.remove()
    localStorage.removeItem("artemis_user")
    setUser(null)
    if (callback) callback()
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
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
  const [searchParams] = useSearchParams();

  if (!auth.user) {
    const code = searchParams.get("code")
    if (!!code) {
      return <Navigate to="/authenticate" state={{ from: location, code: code }} replace />;
    }
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
