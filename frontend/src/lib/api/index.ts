import api from "../../config/axiosConfig";
import {
  AdminSignInDataType,
  AdminSignUpDataType,
  EditProductDataType,
  LoginUserDataType,
  OrderDetailsType,
  RegisterUserDataType,
} from "../../types/index.types";

// User Api
export const registerUser = async (userData: RegisterUserDataType) => {
  const { data } = await api.post("/users/sign-up", userData);
  return data;
};

export const loginUser = async (userData: LoginUserDataType) => {
  const { data } = await api.post("/users/sign-in", userData);
  return data;
};

export const logoutUser = async () => {
  const { data } = await api.post("/users/logout");
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/users/current");
  return data;
};

export const getUserById = async (userId: string) => {
  const { data } = await api.get(`/users/${userId}`);
  return data;
};

export const updateUser = async (formData: FormData, userId: string) => {
  const { data } = await api.patch(`/users/${userId}`, formData);
  return data;
};

export const getAllUsers = async () => {
  const { data } = await api.get("/users/all");
  return data;
};

export const addNewAddress = async (userId: string, newAddress: string) => {
  const { data } = await api.post(`/users/addAddress/${userId}`, {
    newAddress,
  });
  return data;
};

export const deleteOneAddress = async (userId: string, address: string) => {
  const { data } = await api.delete(`/users/deleteAddress/${userId}`, {
    data: { address },
  });
  return data;
};

export const deleteUserById = async (userId: string) => {
  const { data } = await api.delete(`/users/delete/${userId}`);
  return data;
};

//Orders Api
export const placeOrder = async (orderDetails: OrderDetailsType) => {
  const { data } = await api.post("/orders/placed-order", orderDetails);
  return data;
};

export const getOrderByUserId = async (userId: string) => {
  const { data } = await api.get(`/orders/user/${userId}`);
  return data;
};

export const getAllOrders = async () => {
  const { data } = await api.get("/orders/all");
  return data;
};

export const getOrderById = async (orderId: string) => {
  const { data } = await api.get(`/orders/${orderId}`);
  return data;
};

export const updateProductStatus = async (
  orderId: string,
  updatedStatus: string[]
) => {
  const { data } = await api.patch(`/orders/statusUpdate/${orderId}`, {
    updatedStatus,
  });
  return data;
};

export const checkAndUpdateOrderStatus = async (orderId: string) => {
  const { data } = await api.patch(`/orders/checkAndUpdateOrder/${orderId}`);
  return data;
};

export const deleteOrder = async (orderId: string) => {
  const { data } = await api.delete(`/orders/delete/${orderId}`);
  return data;
};

// Products Api
export const addProduct = async (productData: FormData) => {
  const { data } = await api.post("/product/add", productData);
  return data;
};

export const getAllProducts = async () => {
  const { data } = await api.get("/product/all");
  return data;
};

export const getProductById = async (productId: string) => {
  const { data } = await api.get(`/product/${productId}`);
  return data;
};

export const editProductById = async (
  productId: string,
  editProductData: EditProductDataType
) => {
  const { data } = await api.patch(
    `/product/edit/${productId}`,
    editProductData
  );
  return data;
};

export const deleteProductById = async (productId: string) => {
  const { data } = await api.delete(`/product/delete/${productId}`);
  return data;
};

// Admin Api
export const getCurrentAdmin = async () => {
  const { data } = await api.get("/admin");
  return data;
};

export const signUpAdmin = async (adminData: AdminSignUpDataType) => {
  const { data } = await api.post("/admin/sign-up", adminData);
  return data;
};

export const signInAdmin = async (adminData: AdminSignInDataType) => {
  const { data } = await api.post("/admin/sign-in", adminData);
  return data;
};

export const adminLogout = async () => {
  const { data } = await api.post("/admin/sign-out");
  return data;
};

export const updateAdminProfile = async (
  adminId: string,
  adminData: FormData
) => {
  const { data } = await api.patch(`/admin/${adminId}`, adminData);
  return data;
};
