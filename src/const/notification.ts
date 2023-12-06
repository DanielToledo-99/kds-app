import { ToastOptions, TypeOptions } from "react-toastify";
export const NOTIFICATION: {
  [k in TypeOptions | "updateLoading" | "loading"]?: Partial<ToastOptions>;
} = {
  success: {
    type: "success",
    autoClose: 2000,
    closeOnClick: true,
    position: "bottom-left",
  },
  error: {
    type: "error",
    autoClose: 2000,
    closeOnClick: true,
    position: "bottom-left",
  },
  warning: {},
  info: {
    autoClose: 1800,
    closeOnClick: true,
    position: "bottom-left",
  },
  loading: {
    type: "success",
    position: "bottom-left",
  },
  updateLoading: {
    isLoading: false,
    autoClose: 2300,
    closeOnClick: true,
  },
};
