import { useState } from "react";
import "./App.css";
import Categories from "./components/Categories";
import HeaderTitle from "./components/Header";
import ProductsList from "./components/ProductsList";
import SearchBar from "./components/SearchTerm";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  return (
    <>
      <header className="header">
        <HeaderTitle />
        <SearchBar onSearch={(term: string) => setSearchTerm(term)} />
      </header>
      <Categories onClick={(category: string) => setCategory(category)} />
      <ProductsList searchTerm={searchTerm} category={category} />
    </>
  );
}

export default App;

