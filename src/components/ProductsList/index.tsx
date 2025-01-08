import { FC, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import "./styles.css";
import { Product } from "../../types/product";

type Props = {
  searchTerm: string;
  category: string;
};

const ProductsList: FC<Props> = ({ searchTerm, category }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

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
      <h2 className="products__title">Choose products</h2>
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

