import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from './pages/home/Home';
import Login from './components/Login';
import Main from './layout/Main';
import Menu from './pages/menuPage/Menu';
import CartPage from './pages/menuPage/CartPage';
import CheckoutForm from './pages/menuPage/CheckoutForm';
import Payment from './pages/menuPage/Payment';
import UserProfile from './pages/dashboard/UserProfile';
import Signup from './components/Signup';
import Dashboard from './pages/dashboard/sealer/Dashboard';
import Orders from './pages/dashboard/sealer/Orders';
import Products from './pages/dashboard/sealer/Products';

function App() {
  

  return (
    <>
 <BrowserRouter>
      <Routes>
         <Route path="/" element={<Main />} >
         <Route index element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/menu" element={<Menu />} />
         <Route path="/cart-page" element={<CartPage />} />
         <Route path="/checkOut" element={<Payment />} />
         <Route path="/update-profile" element={<UserProfile />} />
         <Route path="/sealer" element={<Dashboard />} />
         <Route path="/sealer/orders" element={<Orders />} />
         <Route path="/sealer/products" element={<Products />} />
         
          </Route>
      </Routes>
    </BrowserRouter>
    </>
   
  )
}

export default App
