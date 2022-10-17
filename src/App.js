import "./App.css";
import "antd/dist/antd.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/admin";
import React from "react";
import { path } from "./constants/path";
import HomeClient from "./pages/user";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import UserManager from "./pages/admin/systems/userManager";
import OrderManager from "./pages/admin/systems/orderManager";
import ProductManager from "./pages/admin/systems/productManager";
import CategoryManager from "./pages/admin/systems/categoryManager";
import News from "./pages/user/News";
import Contact from "./pages/user/Contact";
import Introduct from "./pages/user/Introduct";
import HeaderClient from "./components/Users/Header";
import Product from "./pages/user/Products/Product";
import ProductList from "./pages/user/Products";
import Success from "./pages/user/Success";
import ProductPage from "./pages/user/ProductPage";

function App() {
  const user = useSelector((state) =>
    state.user.currentUser != null ? true : false
  );
  const admin = useSelector((state) =>
    user ? (state.user.currentUser.isAdmin ? true : false) : false
  );
  console.log(admin);
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path={path.HOME} element={<HomeClient />}>
            <Route path="product/:id" element={<Product />} />
            <Route path="products/:category" element={<ProductPage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="news" element={<News />} />
            <Route path="introduct" element={<Introduct />} />
            <Route path="success" element={<Success />} />
          </Route>
          <Route path={path.ADMIN} element={<Home />}>
            <Route path="orders" element={<OrderManager />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="profile" element={<UserManager />} />
            <Route path="category" element={<CategoryManager />} />
          </Route>
          *
          {/*<Route
            path={path.LOGIN}
            element={
              admin ? <Navigate to={"/admin"} /> : <Navigate to={"/login"} />
            }
          />*/}
          <Route path={path.LOGIN} element={<Login />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>404 Page not found 😂😂😂</p>
              </main>
            }
          />
          {user ? (
            admin ? (
              <Route path={path.ADMIN} element={<Navigate to={"/admin"} />} />
            ) : (
              <Route path={path.HOME} element={<HomeClient />} />
            )
          ) : (
            <Route path={path.LOGIN} element={<Login />} />
          )}
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
