import { useState, lazy} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
const Home = lazy(() => import('./pages/home/Home')) ;
const Login = lazy(() => import('./components/Login'));
const Main  = lazy(() => import('./layout/Main'));
const Menu = lazy(() => import('./pages/menuPage/Menu'));
const CartPage = lazy(() => import('./pages/menuPage/CartPage'));
const CheckoutForm = lazy(() => import( './pages/menuPage/CheckoutForm'));
const  Payment = lazy(() => import( './pages/menuPage/Payment' ));
const  UserProfile = lazy(() => import('./pages/dashboard/UserProfile'));
const  Signup = lazy(() => import( './components/Signup' ));
const Dashboard = lazy(() => import( './pages/dashboard/sealer/Dashboard'));
const Orders = lazy(() => import( './pages/dashboard/sealer/Orders' ));
const Products = lazy(() => import( './pages/dashboard/sealer/Products' ));

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
