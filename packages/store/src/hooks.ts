import { useDispatch, useStore, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState, AppStore } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;