import React from "react";
import ResetPassword from "./ResetPassword";

const AuthResetPassword = () => {
  return (
    <div className="w-full h-[100vh] overflow-hidden flex">
      <div
        className="w-[50%] grid grid-flow-col self-center py-60"
        style={{
          background: `url(${require("../../../assets/Auth-Images/FaviconBG.png")})`,
        }}
      >
        <div className="w-[100%] grid grid-flow-col self-center">
          <ResetPassword />
        </div>
      </div>
      <div
        className="w-[50%]"
        style={{
          background: `url(${require("../../../assets/Auth-Images/GraphicSide.png")})`,
        }}
      ></div>
    </div>
  );
};

export default AuthResetPassword;
