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
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
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
    ],
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
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
    subMenuItems: [
      { text: "All", icon: <TrendingUpOutlined /> },
      { text: "All", icon: <TrendingUpOutlined /> },
      { text: "All", icon: <TrendingUpOutlined /> },
    ],
  },
];

const Sidebar = ({ user, drawerWidth, isSidebarOpen, setIsSidebarOpen }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <>
      <div className=" fixed border flex flex-col bg-[color:var(--backGround-color-light)] h-full dark:bg-[color:var(--backGround-color-dark)]  ">
        <div className="text-3xl text-center text-black dark:text-white mb-10">
          <spain> Admin Panel</spain>
        </div>

        <div className="overflow-y-scroll">
          <List>
            {navItems.map(({ text, icon, child }) => {
              const lcText = text.toLowerCase();
              if (!child) {
                return (
                  <div
                    className={`${
                      lcText === active ? "bg-[#008000]" : ""
                    } w-full hover:bg-[color:var(--hover-color)]`}
                  >
                    <div
                      className="flex ml-3 mt-4 cursor-pointer"
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                    >
                      <button>
                        <div className="flex font-bold p-1">
                          <div className="">{icon}</div>
                          <div className="ml-9 text-xl font-bold ">{text}</div>
                        </div>
                      </button>
                    </div>
                  </div>
                );
              } else {
                return (
                  <>
                    <div className="w-full hover:bg-[color:var(--hover-color)]">
                      <div
                        className="flex ml-3 relative cursor-pointer"
                        onClick={() => {
                          setOpen(!open);
                        }}
                      >
                        <button>
                          <div className="flex justify-between font-bold p-1 ">
                            <div className="">{icon}</div>
                            <div className="ml-9 text-xl font-bold ">
                              {text}
                            </div>
                            <div className="absolute top-0 right-0">
                              {open ? (
                                <ExpandLessOutlinedIcon />
                              ) : (
                                <ExpandMoreOutlinedIcon />
                              )}
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                    {open ? (
                      <List>
                        {child &&
                          child?.map(({ text, icon }) => {
                            const childNavigate = text.toLowerCase();
                            return (
                              <div
                                className={`${
                                  childNavigate === active ? "bg-[#008000]" : ""
                                } w-full hover:bg-[color:var(--hover-color)]`}
                              >
                                <div
                                  className="flex ml-6 relative cursor-pointer"
                                  onClick={() => {
                                    navigate(`/${childNavigate}`);
                                    setActive(childNavigate);
                                  }}
                                >
                                  <button>
                                    <div className="flex ml-3 gap-4 p-1 cursor-pointer">
                                      <div className="">{icon}</div>
                                      <div className="text-sm font-medium ml-4 ">
                                        {text}
                                      </div>
                                    </div>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
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

        <div className="mb-4 flex justify-between pr-15 bg-white dark:bg-[color:var(--backGround-color-dark)] gap-10 ">
          <div className="ml-10 mr-10">
            <Box
              component="img"
              alt="profile"
              src={profileImage}
              height="40px"
              width="40px"
              borderRadius="50%"
              sx={{ objectFit: "cover" }}
            />
          </div>

          <div className="ml-10 pr-7">
            <SettingsOutlined
              sx={{
                color: theme.palette.secondary[300],
                fontSize: "25px ",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
