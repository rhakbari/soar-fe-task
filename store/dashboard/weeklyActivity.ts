import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ChartData } from "chart.js";

interface ChartState {
  data: ChartData<"bar", number[], string> | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ChartState = {
  data: null,
  isLoading: false,
  error: null,
};

export const fetchWeeklyActivity = createAsyncThunk(
  "chart/fetchWeeklyActivity",
  async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/weekly-activity`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
);

const weeklyActivity = createSlice({
  name: "chart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeeklyActivity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeeklyActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeeklyActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to fetch data";
      });
  },
});
export const selectChartData = (state: RootState) => state.weeklyActivity.data;
export const selectChartIsLoading = (state: RootState) =>
  state.weeklyActivity.isLoading;
export const selectChartError = (state: RootState) =>
  state.weeklyActivity.error;

export default weeklyActivity.reducer;
