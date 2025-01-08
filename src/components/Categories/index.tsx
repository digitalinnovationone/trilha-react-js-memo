import { FC, useEffect, useState } from "react";
import "./styles.css";

type Props = {
  onClick: (category: string) => void;
};

const Categories: FC<Props> = ({ onClick }) => {
  const [active, setActive] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>(["all"]);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await fetch(
        "https://fakestoreapi.com/products/categories"
      );

      if (!result.ok) {
        throw new Error("Error to fetch categories from API");
      }

      const data = await result.json();
      setCategories(["all", ...data]);
    };

    try {
      fetchCategories();
    } catch (err) {
      console.error("Error to fetch categories list", err);
      // setCategories([]);
    }
  }, []);

  if (!categories.length) {
    return null;
  }

  return (
    <ul className="categories">
      {categories.map((category, index) => (
        <li
          key={index}
          onClick={() => {
            setActive(category);
            onClick(category);
          }}
          className={`categories__item ${
            category === active ? "categories__item--active" : ""
          }`}
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

export default Categories;

