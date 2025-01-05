import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ChartData } from "chart.js";

interface ExpenseDataset {
  data: number[];
  backgroundColor: string[];
  hoverBackgroundColor: string[];
}

interface ExpenseChartData extends ChartData {
  labels: string[];
  datasets: ExpenseDataset[];
}

interface ExpenseState {
  data: ExpenseChartData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  initialized: boolean;
}

const initialState: ExpenseState = {
  data: null,
  status: "idle",
  error: null,
  initialized: false,
};

export const fetchExpenseData = createAsyncThunk<
  ExpenseChartData,
  void,
  { state: RootState; rejectValue: string }
>(
  "expense/fetchExpenseData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/expense-data`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch expense data");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { expense } = getState();
      return !expense.initialized && expense.status !== "loading";
    },
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    clearExpenseData: (state) => {
      state.data = null;
      state.error = null;
      state.initialized = false;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenseData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchExpenseData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.initialized = true;
      })
      .addCase(fetchExpenseData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch expense data";
      });
  },
});

export const { clearExpenseData } = expenseSlice.actions;

export const selectExpenseData = (state: RootState) => state.expense.data;
export const selectExpenseStatus = (state: RootState) => state.expense.status;
export const selectExpenseError = (state: RootState) => state.expense.error;
export const selectExpenseInitialized = (state: RootState) =>
  state.expense.initialized;

export default expenseSlice.reducer;
