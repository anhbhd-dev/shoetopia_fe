import { ReactNode, createContext, useEffect, useState } from "react";

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
  //   const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);
  //   const toast = useToast();

  //   const { pathname } = useLocation();
  const [user, setUser] = useState<UserData>({
    isAuthenticated: false,
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    roles: [],
  });

  const logout = async () => {
    localStorage.removeItem("adminAccessToken");
    localStorage.removeItem("adminRefreshToken");
    setUser({
      isAuthenticated: false,
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      roles: [],
    });
    // toast({
    //   title: "Đăng xuất thành công",
    //   status: "success",
    //   duration: 1500,
    //   isClosable: true,
    // });
    // navigate("admin/auth/login");
  };
  //   useEffect(() => {
  //     const getUser = async () => {
  //       try {
  //         setIsAuthenticating(true);
  //         const userData = await fetchUserProfile();
  //         if (userData) {
  //           setUser({
  //             isAuthenticated: true,
  //             ...userData,
  //           });
  //         }
  //       } catch (err) {
  //         if (pathname !== "/admin/auth/login") {
  //           toast({
  //             title: "Vui lòng đăng nhập lại",
  //             description: (err as Error).message, // Ép kiểu err thành Error
  //             status: "warning",
  //             duration: 1500,
  //             isClosable: true,
  //           });
  //         }
  //         navigate("admin/auth/login");
  //       }
  //       setIsAuthenticating(false);
  //     };

  //     getUser();
  //   }, [navigate, pathname, toast]);

  const valueToShare = {
    isAuthenticating,
    user,
    setUser,
    logout,
  };

  if (isAuthenticating) return null;

  return (
    <AuthContext.Provider value={valueToShare}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
