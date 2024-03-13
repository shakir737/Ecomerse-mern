import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import citiesService from "./cityService";



const initialState = {
  Cities: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};


export const getCities = createAsyncThunk(
  "cities/get-cities",
  async (thunkAPI) => {
    try {
      return await citiesService.getCitiesList();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const citiesSlice = createSlice({
  name: "cities",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getCities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.Cities = action.payload;
        state.message = "success";
      })
      .addCase(getCities.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });
      
  },
});

export default citiesSlice.reducer;
