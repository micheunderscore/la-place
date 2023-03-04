import gmapReducer from "@/features/map/gmapSlice";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    search: gmapReducer,
  },
});

export type MapDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type MapThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
