import counterReducer from "@/features/counter/counterSlice";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type CounterDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type CounterThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
