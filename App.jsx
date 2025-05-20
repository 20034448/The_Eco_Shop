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
import { useState, useEffect} from 'react';

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
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/Login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
        <Route path="/Cart" element={isLoggedIn ? <Cart /> : <Navigate to="/" />} />
        <Route path="/faqs" element={isLoggedIn ? <FAQs /> : <Navigate to="/" />} />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
        <Route path="/how-it-works" element={isLoggedIn ? <HowItWorks /> : <Navigate to="/" />} />
        <Route path="/Products/:id" element={<ItemDetails/>} />
        <Route path="/Payment" element={isLoggedIn ? <Payment /> : <Navigate to="/" />} />
        <Route path="/Products" element={isLoggedIn ? <Products /> : <Navigate to="/" />} />
        <Route path="/product/:id" element={isLoggedIn ? <ItemDetails /> : <Navigate to="/" />} />
        <Route path="/Register" element={<Register />} />
        
        
      </Routes>
    </>
  );
}

export default App;
