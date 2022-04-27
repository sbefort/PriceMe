import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { CalculateResultItem } from '../types/CalculateResultItem';
import { UserMe } from '../types/UserMe';

interface InitialContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  errorResponse: any;
  setErrorResponse: Dispatch<SetStateAction<any>>;
  user?: UserMe;
  setUser: Dispatch<SetStateAction<UserMe | undefined>>;
  favorites: CalculateResultItem[];
  setFavorites: Dispatch<SetStateAction<CalculateResultItem[]>>;
}

interface Props {
  children: React.ReactNode;
}

const AppContext = createContext<InitialContext>({
  isLoading: false,
  setIsLoading: () => {},
  errorResponse: undefined,
  setErrorResponse: () => {},
  user: undefined,
  setUser: () => {},
  favorites: [],
  setFavorites: () => {},
});

export const AppContextProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorResponse, setErrorResponse] = useState();
  const [user, setUser] = useState<UserMe>();
  const [favorites, setFavorites] = useState<CalculateResultItem[]>([]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        errorResponse,
        setErrorResponse,
        user,
        setUser,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
