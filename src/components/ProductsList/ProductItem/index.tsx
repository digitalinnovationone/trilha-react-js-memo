import { FC } from "react";
import "./styles.css";

type Props = {
  title: string;
  image: string;
  price: number;
};

const ProductItem: FC<Props> = ({ image, title, price }) => {
  return (
    <div className="product__item">
      <img src={image} alt={title} className="product__image" />
      <h3 className="product__title">{title}</h3>
      <p className="product__price">$ {price}</p>
      <button>Add to cart</button>
    </div>
  );
};

export default ProductItem;

