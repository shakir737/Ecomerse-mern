import React, { useState } from "react";
import { Box, useMediaQuery, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useGetUserQuery } from "../../state/api";
import { Toaster } from 'react-hot-toast'
const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const token = useSelector((state) => state.auth);
  const { data } = useGetUserQuery(token);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%" className=" bg-white dark:bg-[#031156]">
      <CssBaseline />
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
         <Toaster position='top-center' reverseOrder={false}  />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
