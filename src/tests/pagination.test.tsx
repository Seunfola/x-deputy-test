import { Pagination } from '@/app/components/pagination';
import { render, screen, fireEvent } from '@testing-library/react';

test('calls onPageChange when clicking next', () => {
  const onPageChange = jest.fn();
  render(<Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />)

  fireEvent.click(screen.getByText('Next'));

  expect(onPageChange).toHaveBeenCalledWith(2);
});
