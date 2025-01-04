import { configureStore } from "@reduxjs/toolkit";
import weeklyActivity from "./dashboard/weeklyActivity";
import transactionsReducer from "./dashboard/transaction";

export const store = configureStore({
  reducer: {
    weeklyActivity,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
