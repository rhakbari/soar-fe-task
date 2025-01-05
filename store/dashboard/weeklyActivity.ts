import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface WeeklyActivityDataset {
  label: string;
  data: number[];
  backgroundColor: string | string[];
  borderColor: string | string[];
  borderWidth: number;
}

interface WeeklyActivityData {
  labels: string[];
  datasets: WeeklyActivityDataset[];
}

interface ChartState {
  data: WeeklyActivityData | null;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: ChartState = {
  data: null,
  isLoading: false,
  error: null,
  initialized: false
};

export const fetchWeeklyActivity = createAsyncThunk<
  WeeklyActivityData,
  void,
  { state: RootState }
>(
  "chart/fetchWeeklyActivity",
  async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/weekly-activity`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  },
  {
    condition: (_, { getState }) => {
      const { weeklyActivity } = getState();
      return !weeklyActivity.initialized && !weeklyActivity.isLoading;
    },
  }
);

const weeklyActivity = createSlice({
  name: "chart",
  initialState,
  reducers: {
    resetWeeklyActivity: (state) => {
      state.data = null;
      state.error = null;
      state.initialized = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeeklyActivity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeeklyActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.initialized = true;
      })
      .addCase(fetchWeeklyActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to fetch data";
        state.initialized = true;
      });
  },
});

export const { resetWeeklyActivity } = weeklyActivity.actions;

// Selectors
export const selectChartData = (state: RootState) => state.weeklyActivity.data;
export const selectChartIsLoading = (state: RootState) => state.weeklyActivity.isLoading;
export const selectChartError = (state: RootState) => state.weeklyActivity.error;
export const selectChartInitialized = (state: RootState) => state.weeklyActivity.initialized;

export default weeklyActivity.reducer;