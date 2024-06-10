import React, { Children } from "react";
import {
  Box,
  Divider,
  Drawer,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "../assets/profile.jpeg";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    child: [
      {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      text: "Products",
      icon: <ShoppingCartOutlined />,
    },
  ]
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },

  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
    subMenuItems: [
      { text: 'All',   icon: <TrendingUpOutlined />,},
      { text: 'All',   icon: <TrendingUpOutlined />,},
      { text: 'All',   icon: <TrendingUpOutlined />,},
    ],
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <div className="border bg-[color:var(--backGround-color-light)] h-full dark:bg-[color:var(--backGround-color-dark)]">
    <div className="text-3xl text-center text-black dark:text-white mb-10">
    <spain> Admin Panel</spain>
   <div className="mt-7">
   <hr />
   </div>
    </div>
   
      {isSidebarOpen && (
        <div >
          <div className="w-full">
           
             <List>
              {navItems.map(({ text, icon, child}) => {
               
                const lcText = text.toLowerCase();
                if(!child) {
                 
                  return (
                   <div className="w-full hover:bg-[color:var(--hover-color)]">
                   <div className="flex ml-12 m-4">

                   <button  onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                    }}>
                    <div className="flex font-bold">
                   <div className="">
                    {icon}
                  </div>
                  <div className="ml-9 text-xl font-bold ">
                  { text}  
                   
                  </div>
                  </div>
                  </button>
                  
                   </div>
                   </div> 
                );
                } else {
                  return (
                    <>
                    <div className="w-full hover:bg-[color:var(--hover-color)]">
                   <div className="flex ml-12 m-4 relative">
                  <button
                      onClick={() => {
                        setOpen(!open);
                      }}>
                     
                     <div className="flex font-bold">
                   <div className="">
                    {icon}
                  </div>
                  <div className="ml-9 text-xl font-bold ">
                  { text}  
                   
                  </div>
                  <div className="absolute top-0 right-0">
                  {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
                  </div>
                  </div>
                     
                    </button>
                    </div>
                    </div>
                    { open ? (
                      <List>
                        {
                          child && child?.map(({text, icon}) => {
                            const childNavigate = text.toLowerCase();
                           return (
                            <div className="w-full hover:bg-[color:var(--hover-color)]">
                            <div className="flex ml-12 relative">
                            <button  onClick={() => {
                                  navigate(`/${childNavigate}`);
                                  setActive(childNavigate);
                              }}>
                       <div className="flex ml-2 font-bold">
                   <div className="">
                    {icon}
                  </div>
                  <div className="text-xl ml-9 font-bold ">
                  { text}  
                   
                  </div>
                  </div>
                      </button>
                            </div>
                          
                            </div>
                             
                            )
                        })
                        }
                      </List>
                     ) : (
                      <div></div>
                    )}
                     
                   
                   
                    </>
                  );
                }
               
              })}
            </List> 
          </div>
 
          <div className="w-full mt-20">
          <hr />
          </div>
          <Box position="absolute">
         
          
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
             
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
