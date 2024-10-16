import React from "react";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "../../components/BreakdownChart";
import OverviewChart from "../../components/OverviewChart";
import { useGetDashboardQuery } from "../../state/api";
import StatBox from "../../components/StatBox";
import UserCard from "../../components/UserCard";
import CountChart from "./../../components/CountChart";
import AttendanceChart from "./../../components/AttendanceChart";
import FinanceChart from "../../components/FinanceChart";
import EventCalendar from "../../components/EventCalendar";
import Announcements from "./../../components/Announcements";
const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <div className="m-5">
      <div className="flex justify-between">
        <div>
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </div>
        <div>
          <button className="button">
            <DownloadOutlined />
            Download Reports
          </button>
        </div>
      </div>

      <div className="flex gap-4 justify-between mt-4">
        <div className="flex flex-col lg:w-3/4">
          <div className="flex flex-between gap-3">
            <UserCard type="student" />
            <UserCard type="teacher" />
            <UserCard type="parent" />
            <UserCard type="staff" />
          </div>
          <div className="flex gap-4 flex-col lg:flex-row mt-4">
            {/* COUNT CHART */}
            <div className="w-full lg:w-1/3 h-[450px]">
              <CountChart />
            </div>
            {/* ATTENDANCE CHART */}
            <div className="w-full lg:w-2/3 h-[450px]">
              <AttendanceChart />
            </div>
          </div>
          <div className="w-full h-[500px] mt-4">
            <FinanceChart />
          </div>
        </div>
        <div className="w-full lg:w-1/4 flex flex-col gap-4">
          <EventCalendar />
          <Announcements />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
