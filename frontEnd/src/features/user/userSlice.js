import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";


const initialState = {
  user: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};


export const getuser = createAsyncThunk(
  "user/get-user",
  async (id, thunkAPI) => {
    try {
      return await userService.getUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const wishlist = createAsyncThunk(
  "wishlist/create-wishlist",
  async (id, thunkAPI ) => {
     
     try{
       return await userService.createWishlist(id);
    }catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const AddToCart = createAsyncThunk(
  "cart/create-cart",
  async (data, thunkAPI) => {
    try {
      
      return await userService.createCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
); 


export const updateCart = createAsyncThunk(
  "cart/update-cart",
  async (data, thunkAPI) => {
    try {
      
      return await userService.updateCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
); 

export const RemoveCart = createAsyncThunk(
  "cart/remove-cart",
  async (id, thunkAPI) => {
    try {
      return await userService.removeCart(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
); 

export const removeWishlist = createAsyncThunk(
  "wishlist/delete-wishlist",
  async (id, thunkAPI ) => {
     
     try{
       return await userService.removeWishlist(id);
    }catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "userInfo",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getuser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(getuser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
       .addCase(wishlist.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = true;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.updateCart = true;
        state.message = action.message;
      })
    ;
      
  },
});

export default userSlice.reducer;
