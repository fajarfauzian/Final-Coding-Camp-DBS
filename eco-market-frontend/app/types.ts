export interface IProduct {
  id: number;
  uuid: string;
  name: string;
  price: number;
  picture: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: number;
  uuid: string;
  name: string;
  email: string;
  password: string;
  profile_picture: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICart {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  note: string;
  picture: string;
}

export interface OrderProductProps {
  selectedProduct: IProduct;
  itemInCart?: ICart | null;
  handleAddToCart: (productItem: IProduct) => void;
  handleRemoveFromCart: (productItem: IProduct) => void;
}
