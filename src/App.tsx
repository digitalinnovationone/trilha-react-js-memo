import { useState } from "react";
import "./App.css";
import Categories from "./components/Categories";
import HeaderTitle from "./components/Header";
import ProductsList from "./components/ProductsList";

function App() {
  const [category, setCategory] = useState("all");

  return (
    <>
      <header className="header">
        <HeaderTitle />
      </header>
      <Categories onClick={(category: string) => setCategory(category)} />
      <ProductsList category={category} />
    </>
  );
}

export default App;

