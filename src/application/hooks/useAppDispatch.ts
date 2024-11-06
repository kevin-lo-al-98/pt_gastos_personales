import { useDispatch } from "react-redux";
import type { AppDispatch } from "../application/redux/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
