import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const initialState = {
  seller: "",
  isLoading: false,
  isSeller: false,
  isSuccess: false,
  isError: false,
};

export const sellerSlice = createSlice({
  name: "seller",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
   
  },
});

export default sellerSlice.reducer;
