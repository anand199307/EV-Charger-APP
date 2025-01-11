import React from "react";
import Login from "./Login";

const AuthLogin = () => {
  return (
    <div className="w-full h-[100vh] overflow-hidden flex">
      <div
        className="w-[50%] h-[100%] grid grid-flow-col self-center"
        style={{
          background: `url(${require("../../../assets/Auth-Images/FaviconBG.png")})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          // border: "1px solid red",
        }}
      >
        {/* <div className="auth_main"> */}
        <Login />
        {/* </div> */}
      </div>
      <div
        className="w-[50%]"
        style={{
          background: `url(${require("../../../assets/Auth-Images/GraphicSide.png")})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
};

export default AuthLogin;
