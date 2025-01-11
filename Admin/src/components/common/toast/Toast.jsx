import React, { useEffect } from "react";
import "./Toast.css";
import { useDispatch, useSelector } from "react-redux";
import { setToastState } from "../../../store/slices/AuthSlice";

const Toast = () => {
  const toastcontent = useSelector((state) => state.auth.toastState);
  const toastmessage = useSelector((state) => state.auth.toastmsg);
  const dispatch = useDispatch();

  useEffect(() => {
    if (toastcontent) {
      setTimeout(() => {
          dispatch(setToastState(false));
        //   dispatch(setToastmsg(''));
        // setShowToast(false);
      }, 3000);
    }
  }, [toastcontent]);

  return (
    <div className={`toast ${toastcontent ? "show" : ""}`}>{toastmessage}</div>
  );
};

export default Toast;
