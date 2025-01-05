import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface BalanceHistoryDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

export interface BalanceHistoryData {
  labels: string[];
  datasets: BalanceHistoryDataset[];
}

interface BalanceHistoryState {
  data: BalanceHistoryData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  initialized: boolean;
}

const initialState: BalanceHistoryState = {
  data: null,
  status: "idle",
  error: null,
  initialized: false,
};

export const fetchBalanceHistory = createAsyncThunk<
  BalanceHistoryData,
  void,
  { state: RootState; rejectValue: string }
>(
  "balanceHistory/fetchBalanceHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/balance-history`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch balance history");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { balanceHistory } = getState();
      return !balanceHistory.initialized && balanceHistory.status !== "loading";
    },
  }
);

const balanceHistorySlice = createSlice({
  name: "balanceHistory",
  initialState,
  reducers: {
    clearBalanceHistory: (state) => {
      state.data = null;
      state.error = null;
      state.initialized = false;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalanceHistory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBalanceHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.initialized = true;
      })
      .addCase(fetchBalanceHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch balance history";
      });
  },
});

export const { clearBalanceHistory } = balanceHistorySlice.actions;

// Selectors
export const selectBalanceHistoryData = (state: RootState) =>
  state.balanceHistory.data;
export const selectBalanceHistoryStatus = (state: RootState) =>
  state.balanceHistory.status;
export const selectBalanceHistoryError = (state: RootState) =>
  state.balanceHistory.error;
export const selectBalanceHistoryInitialized = (state: RootState) =>
  state.balanceHistory.initialized;

export default balanceHistorySlice.reducer;
