// UI || CONTEXT
export type LatestType = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
};

export type ProductCollectionType = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  size: string[];
  variations: { name: string; imageUrl: string }[];
  category: "Men" | "Women" | "Kids";
  subCategory: "Tops" | "Bottoms" | "Full Outfit";
  createdAt?: Date;
  updatedAt?: Date;
};

export type ProductsType = {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  subCategory: string;
  price: string;
  variations: {
    id: string;
    name: string;
    imageUrl: string;
  }[];
  sizes?: string[];
};

export type CartType = {
  cartProductId: string;
  productId: string;
  name: string;
  imageUrl: string;
  price: string;
  size?: string;
  quantity: number;
  deliveryOption: CDeliveryOptionType;
};

export interface IProduct {
  name: string;
  productStatus: string;
  quantity: number;
  price: string;
  size: string;
  _id: string;
  imageUrl: string;
  deliveryOption: {
    date: string;
    fee: number;
  };
}

export type OrderType = {
  _id: string;
  userId: string;
  totalFee: string;
  status: string;
  shippingAddress: string;
  paymentMethod: string;
  products: IProduct[];
};

// Constants
export type CDeliveryOptionType = {
  date: string;
  value: string;
  fee: number;
};

/* APIs & React-Queries */

// User
export type RegisterUserDataType = {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
};

export type LoginUserDataType = {
  email: string;
  password: string;
};

export type UserDataTableType = {
  _id: string;
  name: string;
  email: string;
  password?: string;
  contactNumber: string;
  imageUrl: string;
};

// Admin
export type AdminSignUpDataType = {
  username: string;
  email: string;
  password: string;
};

export type AdminSignInDataType = {
  username: string;
  password: string;
};

// Orders
export type OrderDetailsType = {
  userId: string;
  total: string;
  cart: ICart[];
  address: string;
};

interface IDeliveryOption {
  date: string;
  fee: number;
}

interface ICart {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  quantity: number;
  size?: string;
  deliveryOption: IDeliveryOption;
}

// Products
export type ProductDataType = {
  name: string;
  category: string;
  subcat: string;
  price: string;
  sizeOpt: string[];
};

export type EditProductDataType = {
  updatedName: string;
  updatedDescription: string;
  updatedPrice: string;
  updatedSizes: string[];
  updatedCategory: string;
  updatedSubcategory: string;
};

// Select Input
export interface IOption {
  value: string;
  label: string;
}
