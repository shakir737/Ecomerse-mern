import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    // buildeer
    //   .addCase(login.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(login.fulfilled, (state, action) => {
    //     state.isError = false;
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     state.isAuthenticated = true;
    //     state.user = action.payload;
    //     state.message = "success";
    //   })
    //   .addCase(login.rejected, (state, action) => {
    //     state.isError = true;
    //     state.isSuccess = false;
    //     state.message = action.error;
    //     state.isLoading = false;
    //   })
    //   .addCase(getOrders.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(getOrders.fulfilled, (state, action) => {
    //     state.isError = false;
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     state.orders = action.payload;
    //     state.message = "success";
    //   })
    //   .addCase(getOrders.rejected, (state, action) => {
    //     state.isError = true;
    //     state.isSuccess = false;
    //     state.message = action.error;
    //     state.isLoading = false;
    //   })
    //   .addCase(getOrderByUser.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(getOrderByUser.fulfilled, (state, action) => {
    //     state.isError = false;
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     state.orderbyuser = action.payload;
    //     state.message = "success";
    //   })
    //   .addCase(getOrderByUser.rejected, (state, action) => {
    //     state.isError = true;
    //     state.isSuccess = false;
    //     state.message = action.error;
    //     state.isLoading = false;
    //   });
  },
});

export default wishlistSlice.reducer;
