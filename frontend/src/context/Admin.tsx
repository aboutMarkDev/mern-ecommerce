import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentAdmin } from "../lib/api";

const initialAdmin = {
  id: "",
  username: "",
  email: "",
  imageUrl: "",
};

interface IAdmin {
  id: string;
  username: string;
  email: string;
  imageUrl: string;
}

type AdminContextType = {
  admin: IAdmin;
  setAdmin: React.Dispatch<React.SetStateAction<IAdmin>>;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  checkAdminAuth: () => Promise<boolean>;
};

const initialState = {
  admin: initialAdmin,
  setAdmin: () => {},
  isAdminAuthenticated: false,
  setIsAdminAuthenticated: () => {},
  isLoading: true,
  setIsLoading: () => {},
  checkAdminAuth: async () => false as boolean,
};

const AdminContext = createContext<AdminContextType>(initialState);

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<IAdmin>(initialAdmin);
  const [isAdminAuthenticated, setIsAdminAuthenticated] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAdminAuth = async () => {
    try {
      const fetchAdmin = await getCurrentAdmin();
      if (fetchAdmin) {
        setAdmin({
          id: fetchAdmin._id,
          username: fetchAdmin.username,
          email: fetchAdmin.email,
          imageUrl: fetchAdmin.imageUrl,
        });
        setIsAdminAuthenticated(true);

        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const value = {
    admin,
    setAdmin,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    isLoading,
    setIsLoading,
    checkAdminAuth,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminProvider;

export const useAdminContext = () => useContext(AdminContext);
