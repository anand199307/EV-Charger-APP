import React from "react";
import Button from "../../components/common/Button";

const PageNotFound = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center m-auto h-[100vh]">
      <h1 className="font-bold text-7xl">404 Error</h1>
      <h1 className="font-bold text-8xl">Page Not Found</h1>
      <Button
        backgroundColor="#8CC63F"
        content="Back to login page"
        width="300px"
        type="submit"
        back={true}
        to="/"
      />
    </div>
  );
};

export default PageNotFound;
