import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import countryService from "./countryService";


const initialState = {
  countries: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};


export const getCountries = createAsyncThunk(
  "countries/get-countries",
  async (thunkAPI) => {
    try {
      return await countryService.getCountriesList();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const countriesSlice = createSlice({
  name: "countries",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getCountries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.countries = action.payload;
        state.message = "success";
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });
      
  },
});

export default countriesSlice.reducer;
