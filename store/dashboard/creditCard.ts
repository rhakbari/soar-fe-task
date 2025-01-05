import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface CreditCardData {
  cardNumber: string;
  expiry: string;
  balance: string;
  cardHolder: string;
  color: string;
}

interface CreditCardsState {
  data: CreditCardData[];
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: CreditCardsState = {
  data: [],
  isLoading: false,
  error: null,
  initialized: false,
};

export const fetchCreditCards = createAsyncThunk<
  CreditCardData[],
  void,
  { state: RootState }
>(
  "creditCards/fetch",
  async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/credit-card`
    );
    if (!response.ok) throw new Error("Failed to fetch credit cards");
    return await response.json();
  },
  {
    condition: (_, { getState }) => {
      const { creditCards } = getState();
      // Only fetch if not already initialized and not currently loading
      return !creditCards.initialized && !creditCards.isLoading;
    },
  }
);

const creditCardsSlice = createSlice({
  name: "creditCards",
  initialState,
  reducers: {
    clearCreditCards: (state) => {
      state.data = [];
      state.error = null;
      state.initialized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreditCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCreditCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.initialized = true;
      })
      .addCase(fetchCreditCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to fetch credit cards";
        state.initialized = true;
      });
  },
});

// Action creators
export const { clearCreditCards } = creditCardsSlice.actions;

// Selectors
export const selectCreditCards = (state: RootState) => state.creditCards;
export const selectCreditCardsData = (state: RootState) => state.creditCards.data;
export const selectCreditCardsLoading = (state: RootState) => state.creditCards.isLoading;
export const selectCreditCardsError = (state: RootState) => state.creditCards.error;
export const selectCreditCardsInitialized = (state: RootState) => state.creditCards.initialized;

export default creditCardsSlice.reducer;