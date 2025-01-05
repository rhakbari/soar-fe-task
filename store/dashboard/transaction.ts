import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Transaction {
  id: number;
  name: string;
  date: string;
  amount: number;
  icon: string;
  bgColor: string;
}

interface TransactionsState {
  items: Transaction[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  initialized: boolean;
}

const initialState: TransactionsState = {
  items: [],
  status: "idle",
  error: null,
  initialized: false,
};

export const fetchTransactions = createAsyncThunk<
  Transaction[],
  void,
  { state: RootState; rejectValue: string }
>(
  "transactions/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/transactions`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { transactions } = getState();
      // Only fetch if not already initialized and not currently loading
      return !transactions.initialized && transactions.status !== "loading";
    },
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    clearTransactions: (state) => {
      state.items = [];
      state.error = null;
      state.initialized = false;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.initialized = true;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch transactions";
      });
  },
});

export const { clearTransactions } = transactionsSlice.actions;

export const selectAllTransactions = (state: RootState) =>
  state.transactions.items;
export const selectTransactionsStatus = (state: RootState) =>
  state.transactions.status;
export const selectTransactionsError = (state: RootState) =>
  state.transactions.error;
export const selectTransactionsInitialized = (state: RootState) =>
  state.transactions.initialized;

export default transactionsSlice.reducer;
