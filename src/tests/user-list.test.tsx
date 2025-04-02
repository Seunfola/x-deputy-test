import { render, screen, waitFor } from '@testing-library/react';
import { UsersProvider } from '@/provider/UsersProvider';
import { UsersList } from '@/app/users/user-list';

jest.mock('@/lib/fetchUsers', () => ({
  fetchUsers: jest.fn().mockResolvedValue([
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      address: {
        street: 'Victor Plains',
        suite: 'Suite 879',
        city: 'Wisokyburgh',
        zipcode: '90566-7771',
        geo: { lat: '-43.9509', lng: '-34.4618' },
      },
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
      company: { name: 'Deckow-Crist', catchPhrase: '', bs: '' },
    },
  ]),
}));

test('renders Ervin Howell details correctly', async () => {
  render(
    <UsersProvider>
      <UsersList />
    </UsersProvider>
  );

  await waitFor(() => expect(screen.getByText('Ervin Howell')).toBeInTheDocument());

  expect(screen.getByText('@Antonette')).toBeInTheDocument();
  expect(screen.getByText(/Email: Shanna@melissa.tv/)).toBeInTheDocument();
  expect(screen.getByText(/Phone: 010-692-6593 x09125/)).toBeInTheDocument();
  expect(screen.getByText(/Website: anastasia.net/)).toBeInTheDocument();
  expect(screen.getByText(/Company: Deckow-Crist/)).toBeInTheDocument();
  expect(screen.getByText(/Location: -43.9509, -34.4618/)).toBeInTheDocument();
  expect(screen.getByText(/Address: Victor Plains, Wisokyburgh/)).toBeInTheDocument();
});
