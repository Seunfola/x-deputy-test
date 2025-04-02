import { SearchBar } from '@/app/components/search-bar';
import { render, screen, fireEvent } from '@testing-library/react';

test('calls onSearchChange on input change', () => {
  const onSearchChange = jest.fn();
  render(<SearchBar searchTerm="" onSearchChange={onSearchChange} />);
  
  fireEvent.change(screen.getByPlaceholderText('Search users...'), { target: { value: 'John' } });
  
  expect(onSearchChange).toHaveBeenCalledWith('John');
});
