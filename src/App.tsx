import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Admin from "./pages/Admin";
import Product from "./pages/Product";
import RequireAuth from "./components/RequireAuth";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    const createDB = async () => {
      try {
        await axios.post(
          "https://site--shop-test--m7by8jdn4xzv.code.run/create-db",
        );
        console.log("Base de données initialisée");
        localStorage.removeItem("token");
      } catch (error) {
        console.log("Erreur lors de l'initialisation", error);
      }
    };
    createDB();
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route
            path="/payment"
            element={
              <RequireAuth>
                <Payment />
              </RequireAuth>
            }
          />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
