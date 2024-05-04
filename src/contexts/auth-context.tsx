"use client";
import { fetchUserProfile } from "@/services/user.service";
import { usePathname, useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAppContext } from "./app-context";
export type UserData = {
  isAuthenticated: boolean;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
};
interface AuthContextData {
  isAuthenticating: boolean;
  user: UserData;
  setUser: (user: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({
  isAuthenticating: true,
  user: {
    isAuthenticated: false,
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    roles: [],
  },
  logout: () => {},
  setUser: () => {},
});
export type AuthContextProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthContextProps) => {
  const router = useRouter();

  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [user, setUser] = useState<UserData>({
    isAuthenticated: false,
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    roles: [],
  });

  const logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser({
      isAuthenticated: false,
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      roles: [],
    });
    toast.success("Đăng xuất thành công!", {
      duration: 2000,
      position: "top-right",
    });
    router.push("/");
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsAuthenticating(true);
        const userData = await fetchUserProfile();
        if (userData) {
          setUser({
            isAuthenticated: true,
            ...userData,
          });
        }
      } catch (err) {
        setIsError(true);
      }
      setIsAuthenticating(false);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (isError) {
      toast("Bạn chưa đăng nhập!", {
        duration: 2000,
        icon: "🖐",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  }, [isError]);

  const valueToShare = {
    isAuthenticating,
    user,
    setUser,
    logout,
  };

  return (
    <AuthContext.Provider value={valueToShare}>{children}</AuthContext.Provider>
  );
};
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export default AuthContext;
