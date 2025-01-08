import { FC, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Product } from "../../types/product";
import SearchBar from "../SearchTerm";
import "./styles.css";

type Props = {
  category: string;
};

const ProductsList: FC<Props> = ({ category }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);

    const fetchCategories = async () => {
      const sufixUrl = category !== "all" ? `/category/${category}` : "";
      const result = await fetch(
        `https://fakestoreapi.com/products${sufixUrl}`
      );

      if (!result.ok) {
        throw new Error("Error to fetch products from API");
      }

      const data = await result.json();
      setProducts(data);
      setLoading(false);
    };

    try {
      fetchCategories();
    } catch (err) {
      console.error("Error to fetch products list", err);
      setProducts([]);
      setLoading(false);
    }
  }, [category]);

  return (
    <>
      <div className="products__header">
        <h2 className="products__title">Choose products</h2>
        <SearchBar onSearch={(term: string) => setSearchTerm(term)} />
      </div>
      {loading && <p>📦 Loading products...</p>}
      {!loading && (
        <div className="products">
          {products
            .filter((p) =>
              p.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) => (
              <ProductItem
                image={product.image}
                title={product.title}
                price={product.price}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default ProductsList;

