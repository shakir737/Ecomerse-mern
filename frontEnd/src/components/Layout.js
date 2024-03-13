import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import HeaderNew from './HeaderNew';
const Layout = () => {
  return (
    <>
      <HeaderNew activeHeading={1} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
