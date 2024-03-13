import React,{useEffect, useState} from "react";
import { Box, useTheme, Button } from "@mui/material";
import {
  DownloadOutlined, AddOutlined
} from "@mui/icons-material";
import { useUsersListMutation} from "../../state/user/userapi";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import {AiOutlineDelete} from "react-icons/ai";
import {FiEdit2} from "react-icons/fi";
import FlexBetween from "../../components/FlexBetween";
import Modal from "../../components/modal";
const Customers = () => {
  const theme = useTheme();
  const [userList,{isLoading, isSuccess, data}] = useUsersListMutation();
  const [open, setOpen] = useState(false);
  const [child,setChild] = useState("user");
  const [updated, setUpdated] = useState(false);
  const [id, setID] = useState("");
  useEffect(() => {
    userList();
    console.log(data);
  },[])
  
  const setClicked = (clicked) => {
    setID(clicked.id);
    setOpen(true);
    }
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "firstname",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "mobile",
      headerName: "Phone Number",
      flex: 0.5,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
    {
      field: " ",
      headerName: "Edit",
      flex: 0.4,
      renderCell:(params) => {
        return (
          <>
          <Button sx={{  color: theme.palette.secondary[200]}} onClick={() => setClicked(params)}>
            <FiEdit2  className="" size={20}/>
          </Button>
          </>
        );
      },
    },
    {
      field: "  ",
      headerName: "Delete",
      flex: 0.4,
      renderCell:(params) => {
        return (
          <>
          <Button sx={{  color: theme.palette.secondary[200]}} >
            <AiOutlineDelete   size={20}/>
          </Button>
          </>
        );
      },
    },
  ];
  const rows = [ ];
  {
   data && data.forEach((item) => {
     rows.push({
       _id: item._id,
       firstname: item.firstname,
       mobile: item.mobile,
       email: item.email,
       country: item.country,
       role: item.role,

     })
   })
  }
  return (
    <Box m="1.5rem 2.5rem">
    <FlexBetween>
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      
      <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              hover: theme.palette.background.alt,
            }} onClick={() => setOpen(true)}
          >
            <AddOutlined sx={{ mr: "10px" }} />
            Add New Customer
          </Button>
        </Box>
        </FlexBetween>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
         {
        open ? (<Modal setOpen={setOpen} id={id} setID={setID} setUpdated={setUpdated} child={child}/>) : ( <div></div>)
      }
      </Box>
    </Box>
  );
};

export default Customers;
