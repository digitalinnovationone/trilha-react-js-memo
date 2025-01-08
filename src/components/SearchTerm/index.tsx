import "./styles.css";
import SearchIcon from "../../assets/icons/search.svg";
import { FC, useState } from "react";

type Props = {
  onSearch: (term: string) => void;
};

const SearchBar: FC<Props> = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  return (
    <div className="search">
      <img src={SearchIcon} className="search__icon" />
      <input
        type="text"
        placeholder="Search for product..."
        className="search__input"
        onChange={(e) => setTerm(e.target.value)}
      />
      <button onClick={() => onSearch(term)} className="search__button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;

