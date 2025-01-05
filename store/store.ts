import { configureStore } from "@reduxjs/toolkit";
import weeklyActivity from "./dashboard/weeklyActivity";
import transactions from "./dashboard/transaction";
import creditCards from "./dashboard/creditCard";
import balanceHistory from "./dashboard/balanceHistory";
import expense from "./dashboard/expenseChart";

export const store = configureStore({
  reducer: {
    weeklyActivity,
    transactions,
    creditCards,
    balanceHistory,
    expense,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
