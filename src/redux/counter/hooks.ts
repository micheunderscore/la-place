import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { CounterDispatch, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useCounterDispatch = () => useDispatch<CounterDispatch>();
export const useCounterSelector: TypedUseSelectorHook<RootState> = useSelector;

const counter = { useCounterDispatch, useCounterSelector };

export default counter;
