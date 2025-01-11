import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { doLogout } from "../../store/slices/AuthSlice";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doLogout());
  }, [dispatch]);

  return <Navigate to="/login" replace />;
};

export default Logout;
