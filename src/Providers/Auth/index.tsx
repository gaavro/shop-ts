import { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  signIn: (userData: User) => void;
  auth: string;
  error: boolean;
}

interface User {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const token = localStorage.getItem("token") || "";
  const history = useHistory();
  const [auth, setAuth] = useState(token);
  const [error, setError] = useState(false);

  const signIn = (data: User) => {
    api
      .post("/sessions/", data)
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        setAuth(response.data.accessToken);
        history.push("/dashboard");
      })
      .catch((err) => setError(true));
  };

  return (
    <AuthContext.Provider value={{ auth, signIn, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
