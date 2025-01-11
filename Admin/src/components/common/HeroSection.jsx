import React from "react";
import graphic from "../../assets/Graphic.svg";
import ProgressBarCard from "../../pages/admin/home/ProgressBarCard";
import PromoCodeBar from "../../pages/admin/promocode/PromoCodeBar";
import Button from "./Button";
import { useParams } from "react-router-dom";
import hostIcon from "../../assets/sidebar/Location.svg";
const HeroSection = ({ activateStepper, title, activate }) => {
  const backgroundImageStyle = {
    backgroundImage: `url(${graphic})`,
    borderRadius: "0rem 0rem 1rem 1rem",
  };

  const routePath = window.location.pathname;
  const params = useParams();
  let buttonsToRender;

  if (!activateStepper) {
    buttonsToRender =
      // <div className="flex gap-4">
      //   <Button
      //     backgroundColor="white"
      //     content="Cancel"
      //     width="125px"
      //     cancel={true}
      //     radius="0.25rem"
      //     color="#8A92A6"
      //     border="1px solid #D0D5DD"
      //     onClick={activate}
      //     font="1rem"
      //   />
      //   <Button
      //     backgroundColor="#8CC63F"
      //     content="Save"
      //     width="101px"
      //     save={true}
      //     radius="0.25rem"
      //     color="white"
      //     to="/host"
      //     font="1rem"
      //   />
      // </div>
      "";
  } else {
    switch (routePath) {
      case `/host/${params.id}`:
        buttonsToRender = (
          <div className="flex gap-4">
            <Button
              backgroundColor="white"
              content="Back"
              width="4.635vw"
              back={true}
              radius="0.25rem"
              color="#8A92A6"
              border="1px solid #D0D5DD"
              to="/host"
              font="0.729vw"
            />
            <Button
              backgroundColor="#8CC63F"
              content="Edit"
              width="5.26vw"
              edit={true}
              radius="0.25rem"
              color="white"
              font="0.833vw"
              onClick={activateStepper}
            />
          </div>
        );
        break;

      case "/properties":
        buttonsToRender = (
          <Button
            backgroundColor="#8CC63F"
            content="Add new"
            width="7.5vw"
            searchicon={true}
            radius="0.25rem"
            to="/propertiesaddnew"
            color="white"
            font="0.833vw"
          />
        );
        break;

      case `/customers/${params.id}`:
        buttonsToRender = (
          <Button
            backgroundColor="white"
            content="Back"
            width="4.635vw"
            back={true}
            radius="0.25rem"
            color="#8A92A6"
            border="1px solid #D0D5DD"
            to="/customers"
            font="0.729vw"
          />
        );
        break;

      // case "/host":
      //   buttonsToRender = (
      //     <Button
      //       backgroundColor="#8CC63F"
      //       content="Add new"
      //       width="144px"
      //       searchicon={true}
      //       radius="0.25rem"
      //       to="/hostaddnew"
      //       color="white"
      //       font="1rem"
      //     />
      //   );
      //   break;

      default:
        buttonsToRender = null;
        break;
    }
  }

  return (
    <div
      style={backgroundImageStyle}
      className="text-white h-[24.6vh] p-[1.25vw]"
    >
      <div>
        <h2 className="text-[1.875vw] font-bold">Hello Helios!</h2>
        <p className="text-[0.833vw]">
          We are on a mission to electrify the future: Powering the world with
          sustainable energy.
        </p>
      </div>
      {routePath === "/dashboard" ? (
        <div>
          <ProgressBarCard />
        </div>
      ) : routePath === "/promocode" ? (
        <div>
          <PromoCodeBar />
        </div>
      ) : (
        <div
          className="w-[100%] h-[7.68vh] p-[1.25vw] bg-white rounded-lg mt-[3.083vw] flex justify-between"
          style={{ boxShadow: "0px 10px 30px 0px rgba(17, 38, 146, 0.05)" }}
        >
          <div className="flex gap-2 items-center">
            <img src={hostIcon} alt="icon" className="w-[1.458vw]" />
            <p className="text-black text-[1.25vw] font-semibold">{title}</p>
          </div>

          {buttonsToRender}
        </div>
      )}
    </div>
  );
};

export default HeroSection;
