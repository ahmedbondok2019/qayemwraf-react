import { useDispatch, useSelector } from "react-redux";

// Custom hooks to be used instead of plain useDispatch and useSelector
export const useAppDispatch = () => useDispatch();
export const useAppSelector = (selector) => useSelector(selector);
