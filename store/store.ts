import { configureStore } from "@reduxjs/toolkit";
import weeklyActivity from "./dashboard/weeklyActivity";
import transactionsReducer from "./dashboard/transaction";
import creditCards from './dashboard/creditCard'
export const store = configureStore({
  reducer: {
    weeklyActivity,
    transactions: transactionsReducer,
    creditCards,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
