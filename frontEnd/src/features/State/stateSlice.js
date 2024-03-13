import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import stateService from "./stateService";



const initialState = {
  States: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};


export const getStates = createAsyncThunk(
  "states/get-states",
  async (thunkAPI) => {
    try {
      return await stateService.getStatesList();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const stateSlice = createSlice({
  name: "states",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getStates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStates.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.States = action.payload;
        state.message = "success";
      })
      .addCase(getStates.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });
      
  },
});

export default stateSlice.reducer;
