import { FC, memo } from "react";
import "./styles.css";
import { DISCOUNT_PERCENTAGE } from "..";

type Props = {
  id: number;
  image: string;
  title: string;
  price: number;
  priceWithDiscount: number;
  onAddToCart: (productId: number) => void;
};

const ProductItem: FC<Props> = ({
  id,
  image,
  title,
  price,
  priceWithDiscount,
  onAddToCart,
}) => {
  console.log("Component ProductItem re-render");

  return (
    <div className="product__item">
      <img src={image} alt={title} className="product__image" />
      <h3 className="product__title">{title}</h3>
      <p className="product__price">
        $ {(priceWithDiscount ?? price).toFixed(2)}{" "}
        {!!priceWithDiscount && (
          <span className="product__discount">🎫 -{DISCOUNT_PERCENTAGE}%</span>
        )}
      </p>
      <button onClick={() => onAddToCart(id)}>Add to cart</button>
    </div>
  );
};

export default memo(ProductItem);

