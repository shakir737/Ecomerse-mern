import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useGetUserQuery } from "../../state/api";
import { Toaster } from "react-hot-toast";
const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const token = useSelector((state) => state.auth);
  const { data } = useGetUserQuery(token);

  return (
    <div
      className={`bg-white dark:bg-[color:var(--backGround-color-dark)] w-screen h-full flex`}
    >
      {isSidebarOpen ? (
        <>
          <div className=" w-[15%]">
            <Sidebar
              user={data || {}}
              drawerWidth="15%"
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </div>
          <div className=" w-[85%]">
            <Navbar
              user={data || {}}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <Toaster position="top-center" reverseOrder={false} />
            <Outlet />
          </div>
        </>
      ) : (
        <div className=" w-[100%] bg-white dark:bg-[color:var(--backGround-color-dark)]">
          <Navbar
            user={data || {}}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Toaster position="top-center" reverseOrder={false} />
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Layout;
