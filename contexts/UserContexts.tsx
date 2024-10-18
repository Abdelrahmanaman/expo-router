import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import type { Models } from "react-native-appwrite";

type UserDocument = {
  accountId: string;
  email: string;
  username: string;
  avatarUrl: string;
};

type User = Models.Document & UserDocument;
type UserContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
};
type UserProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType | null>(null);
export function useUser() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser.success) {
        setIsLoggedIn((prev) => false);
        setUser(null);
      } else {
        setIsLoggedIn((prev) => true);
        setUser(currentUser as User);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
