import "./styles.css";
import SearchIcon from "../../assets/icons/search.svg";
import { FC } from "react";

type Props = {
  onSearch: (term: string) => void;
};

const SearchBar: FC<Props> = ({ onSearch }) => {
  return (
    <div className="search">
      <img src={SearchIcon} className="search__icon" />
      <input
        type="text"
        placeholder="Search for product..."
        className="search__input"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

