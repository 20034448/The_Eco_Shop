import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/home';
import Products from './pages/Products';
import HowItWorks from './pages/how-it-works';
import FAQs from './pages/faqs';
import Register from './pages/Register';
import ItemDetails from './pages/ItemDetails';
import Payment from './pages/Payment';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Logout from "./pages/Logout";
import Receipt from './pages/ReceiptPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Scrolltotop from './components/Scrolltotop';
import { useState, useEffect } from 'react';
import RequireAuth from './components/RequireAuth';
import React from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("user"));
  const location = useLocation();

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("user"));
    };
    checkLogin();
  }, [location]);

  return (
    <>
      <Scrolltotop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ItemDetails />} />
        <Route path="/product/:id" element={<ItemDetails />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/payment"
          element={
            <RequireAuth>
              <Payment />
            </RequireAuth>
          }
        />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
