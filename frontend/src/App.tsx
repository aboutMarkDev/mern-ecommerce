import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import RootLayout from "./root/RootLayout";
import Home from "./root/pages/Home";
import About from "./root/pages/About";
import SignIn from "./auth/user/SignIn";
import SignUp from "./auth/user/SignUp";
import UserProfile from "./root/pages/UserProfile";
import UpdateProfile from "./root/pages/UpdateProfile";
import ProductsCollection from "./root/pages/ProductsCollection";
import ViewProduct from "./root/pages/ViewProduct";
import CartV2 from "./root/pages/CartV2";
import AdminRootLayout from "./admin/AdminRootLayout";
import Products from "./admin/pages/Products";
import Orders from "./admin/pages/Orders";
import Users from "./admin/pages/Users";
import ASignIn from "./auth/admin/ASignIn";
import AUpdateProfile from "./admin/pages/AUpdateProfile";
import ProductDetails from "./admin/pages/ProductDetails";
import EditProduct from "./admin/pages/EditProduct";
import AddProduct from "./admin/pages/AddProduct";
import ProductManagement from "./admin/pages/ProductManagement";
import Confirmation from "./root/pages/Confirmation";
import NotFound from "./root/NotFound";

const App = () => {
  return (
    <>
      {/* <AxiosInterceptor /> */}
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" index element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* New Versions */}
          <Route path="/products" element={<ProductsCollection />} />
          <Route path="/view" element={<ViewProduct />} />
          <Route path="/cart" element={<CartV2 />} />

          {/* User Auth */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* Private */}
          <Route path="/user/*" element={<UserProfile />} />

          <Route path="/user/update_profile" element={<UpdateProfile />} />
        </Route>
        {/* Confirmation Page */}
        <Route path="/confirmation" element={<Confirmation />} />

        {/* Admin Auth */}
        <Route path="/admin/auth" element={<ASignIn />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRootLayout />}>
          <Route index element={<Products />} />
          <Route path="/admin/add_product" element={<AddProduct />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route
            path="/admin/product_management"
            element={<ProductManagement />}
          />
          <Route path="/admin/users" element={<Users />} />

          <Route
            path="/admin/update_admin_profile"
            element={<AUpdateProfile />}
          />
          <Route path="/admin/product_view" element={<ProductDetails />} />
          <Route path="/admin/product_edit" element={<EditProduct />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
