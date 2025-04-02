import { render, screen, waitFor } from '@testing-library/react';
import { UsersProvider, useUsers } from '@/provider/UsersProvider';
import '@testing-library/jest-dom/extend-expect';
import { fetchUsers } from '@/lib/fetchUsers';
import { ReactNode } from 'react';

jest.mock('@/lib/fetchUsers');

const MockComponent = ({ children }: { children?: ReactNode }) => {
  return (
    <UsersProvider>
      {children}
    </UsersProvider>
  );
};

test('fetches and provides users data', async () => {
  (fetchUsers as jest.Mock).mockResolvedValue([{ id: 1, name: 'Ervin Howell' }]);

  render(
    <MockComponent>
      <UsersProvider>
        <TestComponent />
      </UsersProvider>
    </MockComponent>
  );

  await waitFor(() => expect(screen.getByText('Ervin Howell')).toBeInTheDocument());
});

const TestComponent = () => {
  const { users } = useUsers();
  return <div>{users.length > 0 ? users[0].name : 'No Users'}</div>;
};