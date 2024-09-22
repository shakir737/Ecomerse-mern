import React, { Suspense, useContext, useState, useEffect, lazy } from "react";
import { Outlet } from "react-router-dom";
const Navbar = lazy(() => import( "../components/Navbar"));
import "../../src/App.css";
const  Footer = lazy(() => import( "../components/Footer"));

const Main = () => {
  const [isSticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
   <> 
   <Navbar/>    
   <Outlet />
   <Footer />
   </>
);
};

export default Main;
