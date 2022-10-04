export interface ProductsEntity {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images?: (string)[] | null;
}
export interface Product {
  products: ProductsEntity[];
  skip: number;
  total: number;
  limit: number;
}
