import { FC, memo } from "react";
import "./styles.css";
import { DISCOUNT_PERCENTAGE } from "..";
import { Product } from "../../../types/product";

type Props = {
  product: Product;
};

const ProductItem: FC<Props> = ({ product: { image, title, price } }) => {
  console.log("Component ProductItem re-render");

  return (
    <div className="product__item">
      <img src={image} alt={title} className="product__image" />
      <h3 className="product__title">{title}</h3>
      <p className="product__price">
        $ {price.toFixed(2)}{" "}
        <span className="product__discount">🎫 -{DISCOUNT_PERCENTAGE}%</span>
      </p>
      <button>Add to cart</button>
    </div>
  );
};

export default memo(ProductItem);

