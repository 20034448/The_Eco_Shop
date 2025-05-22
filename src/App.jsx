import { Route, Routes, Navigate } from 'react-router-dom';
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
import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("user"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/Home" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/products" element={isLoggedIn ? <Products /> : <Navigate to="/login" />} />
        <Route path="/products/:id" element={<ItemDetails />} />
        <Route path="/product/:id" element={isLoggedIn ? <ItemDetails /> : <Navigate to="/login" />} />
        <Route path="/how-it-works" element={isLoggedIn ? <HowItWorks /> : <Navigate to="/login" />} />
        <Route path="/faqs" element={isLoggedIn ? <FAQs /> : <Navigate to="/login" />} />
        <Route path="/cart" element={isLoggedIn ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/payment" element={isLoggedIn ? <Payment /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;