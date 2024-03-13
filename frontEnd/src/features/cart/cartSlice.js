import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import cartService from "./cartService";


export const getCarts = createAsyncThunk(
  "cart/get-carts",
  async (thunkAPI) => {
    try {
      return await cartService.getCarts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createCart = createAsyncThunk(
  "cart/create-cart",
  async (cartData, thunkAPI) => {
    try {
      return await cartService.createCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
 export const deleteFromCart = createAsyncThunk(
  "cart/get-cart",
  async (data, thunkAPI) => {
    try {
        return await cartService.removeFromCart(data)
     } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
   }
 );
export const resetState = createAction("Reset_all");

const initialState = {
  cart: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCarts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCarts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getCarts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createCart = action.payload;
      })
      .addCase(createCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default cartSlice.reducer;
