import { SearchBarProps } from "@/interfaces/search-bar-interface";

export const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  return (
    <input
      type="text"
      placeholder="Search users..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-80 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};
