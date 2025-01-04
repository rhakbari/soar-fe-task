// store/transactionsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';

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
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TransactionsState = {
  items: [],
  status: 'idle',
  error: null
};

export const fetchTransactions = createAsyncThunk<
  Transaction[],
  void,
  { rejectValue: string }
>('transactions/fetchTransactions', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/transactions`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }
    return await response.json();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch transactions';
      });
  }
});

export const selectAllTransactions = (state: RootState) => state.transactions.items;
export const selectTransactionsStatus = (state: RootState) => state.transactions.status;
export const selectTransactionsError = (state: RootState) => state.transactions.error;

export default transactionsSlice.reducer;