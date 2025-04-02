'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import { User } from '@/interfaces/user-interface';
import { UserContextProps } from '@/interfaces/user-context-interface';
import { fetchUsers } from '@/lib/fetchUsers';

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data as User[]);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
    
  };

  useEffect(() => {
    refetch();
  }, []);

  const value = useMemo(() => ({ users, loading, error, refetch }), [users, loading, error]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};
