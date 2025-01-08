export type Product = {
  id: number;
  title: string;
  price: number;
  priceWithDiscount?: number;
  image: string;
  description: string;
  category: string;
  rating: {
    count: number;
    rate: number;
  };
};

