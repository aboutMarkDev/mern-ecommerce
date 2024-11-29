import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ProductsProvider from "./context/Products.tsx";
import UserProvider from "./context/User.tsx";
import { QueryProvider } from "./lib/react-query/QueryProvider.tsx";
import AdminProvider from "./context/Admin.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AdminProvider>
          <UserProvider>
            <ProductsProvider>
              <App />
            </ProductsProvider>
          </UserProvider>
        </AdminProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>
);
