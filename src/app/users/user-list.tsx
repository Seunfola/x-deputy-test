'use client';
import { useState, useMemo } from 'react';
import { User } from '@/interfaces/user-interface';
import { useUsers } from '@/provider/UsersProvider';
import { SearchBar } from '../components/search-bar';
import { Pagination } from '../components/pagination';

const USERS_PER_PAGE = 4;

export const UsersList = () => {
  const { users, loading, error } = useUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter users based on search input
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Calculate total pages for filtered users
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  // Get users for the current page
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  if (loading) return <p className="p-6 text-center">Loading users...</p>;
  if (error) return <p className="p-6 text-center text-red-500">Error: {error}</p>;
  if (!users.length) return <p className="p-6 text-center">No users found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users List</h1>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginatedUsers.map((user: User) => (
          <div key={user.id} className="p-4 border rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-700">@{user.username}</p>
            <p className="text-sm text-gray-700">Email: {user.email}</p>
            <p className="text-sm text-gray-700">Phone: {user.phone}</p>
            <p className="text-sm text-gray-700">Website: {user.website}</p>
            <p className="text-sm text-gray-700 font-semibold">Company: {user.company.name}</p>
            <p className="text-sm text-gray-700 font-semibold">
              Location: {user.address.geo.lat}, {user.address.geo.lng}
            </p>
            <p className="text-sm text-gray-700">
              Address: {user.address.street}, {user.address.city}
            </p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};
