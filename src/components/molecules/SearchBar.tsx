import React from 'react';
import { Search } from 'lucide-react';
import Input from '../atoms/Input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  rightElement?: React.ReactNode;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Buscar...',
  className = '',
  rightElement,
}) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        leftIcon={<Search className="w-4 h-4" />}
        containerClassName="flex-1"
      />
      {rightElement}
    </div>
  );
};

export default SearchBar;
