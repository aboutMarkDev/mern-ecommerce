import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/api";

const initialUser = {
  id: "",
  name: "",
  email: "",
  contactNumber: "",
  imageUrl: "",
  shippingAddress: [],
};

type UserType = {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  imageUrl: string;
  shippingAddress: string[];
};

type UserContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  checkUserAuth: () => Promise<boolean>;
};

const initialUserState = {
  user: initialUser,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isLoading: true,
  setIsLoading: () => {},
  checkUserAuth: async () => false as boolean,
};

const UserContext = createContext<UserContextType>(initialUserState);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>(initialUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  //Async func for fetching current user via token
  const checkUserAuth = async () => {
    try {
      const fetchUser = await getCurrentUser();
      if (fetchUser) {
        setUser({
          id: fetchUser._id,
          name: fetchUser.name,
          email: fetchUser.email,
          contactNumber: fetchUser.contactNumber,
          imageUrl: fetchUser.imageUrl,
          shippingAddress: fetchUser.shippingAddress,
        });
        setIsAuthenticated(true);

        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  const value = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
    checkUserAuth,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;

export const useUserContext = () => useContext(UserContext);
