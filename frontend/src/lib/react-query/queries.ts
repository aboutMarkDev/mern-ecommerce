import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addNewAddress,
  addProduct,
  adminLogout,
  checkAndUpdateOrderStatus,
  deleteOneAddress,
  deleteOrder,
  deleteProductById,
  deleteUserById,
  editProductById,
  getAllOrders,
  getAllProducts,
  getAllUsers,
  getCurrentUser,
  getOrderById,
  getOrderByUserId,
  getProductById,
  getUserById,
  loginUser,
  logoutUser,
  placeOrder,
  registerUser,
  signInAdmin,
  signUpAdmin,
  updateAdminProfile,
  updateProductStatus,
  updateUser,
} from "../api";
import {
  AdminSignInDataType,
  AdminSignUpDataType,
  EditProductDataType,
  LoginUserDataType,
  OrderDetailsType,
  RegisterUserDataType,
} from "../../types/index.types";

// User Queries
export const useCreateUser = () => {
  return useMutation({
    mutationFn: (userData: RegisterUserDataType) => registerUser(userData),
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (userData: LoginUserDataType) => loginUser(userData),
  });
};

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: ["getUserById", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};

export const useUpdateUserById = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => updateUser(formData, userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCurrentUser"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getUserById", data?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllUsers"],
      });
    },
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers,
  });
};

export const useAddNewAddress = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newAddress: string) => addNewAddress(userId, newAddress),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAllUsers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getCurrentUser"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getUserById", data?.id],
      });
    },
  });
};

export const useDeleteOneAddress = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (address: string) => deleteOneAddress(userId, address),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAllUsers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getCurrentUser"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getUserById", data?.id],
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteUserById(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllUsers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getCurrentUser"],
      });
    },
  });
};

//Orders Queries
export const usePlaceOrder = () => {
  return useMutation({
    mutationFn: (orderDetails: OrderDetailsType) => placeOrder(orderDetails),
  });
};

export const useGetOrderByUserId = (userId: string) => {
  return useQuery({
    queryKey: ["getOrderByUserId", userId],
    queryFn: () => getOrderByUserId(userId),
    enabled: !!userId,
  });
};

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ["getAllOrders"],
    queryFn: getAllOrders,
  });
};

export const useGetOrderById = (orderId: string) => {
  return useQuery({
    queryKey: ["getOrderById", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });
};

export const useUpdateProductStatus = (orderId: string, userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedStatus: string[]) =>
      updateProductStatus(orderId, updatedStatus),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getOrderByUserId", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllOrders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getOrderById", data?.id],
      });
    },
  });
};

export const useCheckAndUpdateOrder = (orderId: string, userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => checkAndUpdateOrderStatus(orderId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getOrderByUserId", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllOrders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getOrderById", data?.id],
      });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => deleteOrder(orderId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAllOrders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getOrderById", data?.id],
      });
    },
  });
};

// Product Queries
export const useAddProduct = () => {
  return useMutation({
    mutationFn: (productData: FormData) => addProduct(productData),
  });
};

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["getAllProducts"],
    queryFn: getAllProducts,
  });
};

export const useGetProductById = (productId: string) => {
  return useQuery({
    queryKey: ["getProductById", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });
};

export const useEditProductById = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (editProductData: EditProductDataType) =>
      editProductById(productId, editProductData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAllProducts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getProductById", data?.id],
      });
    },
  });
};

export const useDeleteProductById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => deleteProductById(productId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAllProducts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getProductById", data?.id],
      });
    },
  });
};

// Admin Queries
export const useSignUpAdmin = () => {
  return useMutation({
    mutationFn: (adminData: AdminSignUpDataType) => signUpAdmin(adminData),
  });
};

export const useSignInAdmin = () => {
  return useMutation({
    mutationFn: (adminData: AdminSignInDataType) => signInAdmin(adminData),
  });
};

export const useLogoutAdmin = () => {
  return useMutation({
    mutationFn: adminLogout,
  });
};

export const useUpdateAdminProfile = (adminId: string) => {
  return useMutation({
    mutationFn: (adminData: FormData) => updateAdminProfile(adminId, adminData),
  });
};
