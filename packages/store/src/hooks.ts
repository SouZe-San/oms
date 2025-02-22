import { useDispatch, useStore, useSelector } from "react-redux";
import { AppDispatch, RootState, AppStore } from "./store";

// use this Hooks instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
