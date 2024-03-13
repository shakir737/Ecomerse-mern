import React, { useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import {
  DownloadOutlined, AddOutlined
} from "@mui/icons-material";
import { useGetProductMutation } from "../../state/products/productsApi";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import {AiOutlineDelete} from "react-icons/ai";
import {FiEdit2} from "react-icons/fi";
import FlexBetween from "../../components/FlexBetween";
import Modal from "../../components/modal";
const Products = () => {
  const theme = useTheme();
  const [getProduct,{data, isSuccess, isLoading}] = useGetProductMutation();
  const [open, setOpen] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [id, setID] = useState("");
  const [child, setChild] = useState("product");
  useEffect(() => {
    getProduct();
  },[])
  useEffect(() => {
    getProduct();
    setUpdated(false);
  },[updated])
  
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
      field: "title",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "brand",
      headerName: "Brand",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Decription",
      flex: 1,
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
       slug: item.slug,
       title: item.title,
       description: item.description,
       brand: item.brand,
       category: item.category,

     })
   })
  }
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="PRODUCTS" subtitle="List Of Products" />

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
            Add New Product
          </Button>
        </Box>
      </FlexBetween>
      {
        open ? (<Modal setOpen={setOpen} id={id} setID={setID} setUpdated={setUpdated} child={child} />) : ( <div></div>)
      }
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
            color: theme.palette.secondary[200],
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
      </Box>
    </Box>
  );
};

export default Products;
