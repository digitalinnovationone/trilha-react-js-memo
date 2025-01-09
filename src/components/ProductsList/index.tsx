import { FC, useCallback, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Product } from "../../types/product";
import SearchIcon from "../../assets/icons/search.svg";
import "./styles.css";
import "../SearchTerm/styles.css";

type Props = {
  category: string;
};

// ALL STORE DISCOUNT
export const DISCOUNT_PERCENTAGE = 50;

const ProductsList: FC<Props> = ({ category }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputTerm, setInputTerm] = useState("");

  console.log("Component ProductList re-render");

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

  const addItemToCart = useCallback((productId: number) => {
    console.log("Add item to cart. ID:", productId);
  }, []);

  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((product) => ({
      ...product,
      priceWithDiscount: (product.price * DISCOUNT_PERCENTAGE) / 100,
    }));

  return (
    <>
      <div className="products__header">
        <h2 className="products__title">Choose products</h2>
        <form
          className="search"
          onSubmit={(e) => {
            e.preventDefault();
            setSearchTerm(inputTerm);
          }}
        >
          <img src={SearchIcon} className="search__icon" />

          <input
            type="text"
            placeholder="Search for product..."
            className="search__input"
            onChange={(e) => setInputTerm(e.target.value)}
          />
          <button type="submit" className="search__button">
            Search
          </button>
        </form>
      </div>
      {loading && <p>📦 Loading products...</p>}
      {!loading && (
        <div className="products">
          {filteredProducts.map(
            ({ id, image, title, price, priceWithDiscount }) => (
              <ProductItem
                key={id}
                id={id}
                image={image}
                title={title}
                price={price}
                priceWithDiscount={priceWithDiscount}
                onAddToCart={addItemToCart}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default ProductsList;

