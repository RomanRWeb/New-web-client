import "./SearchBar.scss";
import React from "react";
import { SearchIcon } from "@app/common/icons/search";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  title?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onChange,
  value,
  title,
}: SearchBarProps) => {
  return (
    <div className="search-bar">
      <span>{title}</span>
      <div>
        <SearchIcon />
        <input onChange={(e) => onChange(e.target.value)} value={value} />
      </div>
    </div>
  );
};

export default SearchBar;
