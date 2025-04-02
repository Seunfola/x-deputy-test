import { UsersProvider } from '@/provider/UsersProvider';
import React from 'react';
import { UsersList } from './users/user-list';

const Home = () => {
  return (
    <UsersProvider>
      <main className="min-h-screen bg-gray-50">
        <UsersList />
      </main>
    </UsersProvider>
  );
};

export default Home;
