import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { MapDispatch, RootState } from "./store";

// Use throughout your map instead of plain `useDispatch` and `useSelector`
export const useMapDispatch = () => useDispatch<MapDispatch>();
export const useMapSelector: TypedUseSelectorHook<RootState> = useSelector;

const map = { useMapDispatch, useMapSelector };

export default map;
