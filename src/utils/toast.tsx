import {toast} from "react-toastify";
import React from "react";

interface ToastProps {
  variant: 'check' | 'close' | 'info' | 'warn';
  content?: string;
}

export const showToast = ({variant, content}: ToastProps) => {
  if (variant === 'check') {
    return toast.success(content, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  if (variant === 'close') {
    return toast.error(content, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return toast(content, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

}
