import React, { useEffect, useState } from "react";
import HeroSection from "../../../components/common/HeroSection";
import hostIcon from "../../../assets/sidebar/Location.svg";
import Form from "../../../components/common/Form";
import { useDispatch, useSelector } from "react-redux";
import { editHost } from "../../../store/slices/HostSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BankInfo from "./BankInfo";
import Button from "../../../components/common/Button";
import { Step } from "../../../components/common/StepperSteps";
import "../../../components/common/Stepper.css";

const HostAddnew = (props) => {
  const save = useSelector((state) => state.host.save);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isStepperActive, setStepperActive] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  // console.log("save", save);
  // const selectedCustomerId = location?.state?.selectCostomer?.id;
  // console.log(selectedCustomerId);

  const { id } = useParams();
  // console.log(id);

  const [steps] = useState([
    {
      key: "firstStep",
      title: "Company Info",
      label: "Short step description",
      component: (
        <Form
          showOptions={true}
          // selectCostomer={location?.state?.selectCostomer}
        />
      ),
    },
    {
      key: "secondStep",
      title: "Bank Info",
      label: "Short step description",
      component: <BankInfo />,
    },
  ]);

  const handleSave = async () => {
    try {
      const response = await dispatch(editHost({ payload: save, id: id }));
      // console.log("API response:", response, save, id);
      // console.log(save);
    } catch (error) {
      console.error("Error occurred while calling the API:", error);
    }
    navigate("/host");
  };

  const handleBack = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
    }
  };

  const handleNext = async () => {
    const currentStep = steps[activeStepIndex];

    if (currentStep?.key === "firstStep") {
      const requiredFields = [
        "host_name",
        "phone_number",
        "email",
        "address_line1",
        "country",
        "state",
        "City",
        "taxNumber",
        "gstNumber",
      ];

      const isFieldsFilled = requiredFields?.every(
        (field) => save?.[field] !== ""
      );

      if (!isFieldsFilled) {
        alert("Please fill in all required fields before proceeding.");
        return;
      }

      if (isFieldsFilled) {
        setActiveStepIndex(activeStepIndex + 1);
      }
    }

    if (currentStep.key === "secondStep") {
      const requiredFields = ["bank_account", "bank_name", "ifsc_code"];
      const isFieldsFilled = requiredFields?.every(
        (field) => save[field] !== ""
      );

      if (!isFieldsFilled) {
        alert("Please fill in all required fields before proceeding.");
        return;
      }

      if (isFieldsFilled) {
        setActiveStepIndex(activeStepIndex + 1);
      }
    }
  };

  return (
    <>
      {location?.state?.view ? (
        <>
          <HeroSection
            title="Host"
            icon={hostIcon}
            activateStepper={() => setStepperActive(true)}
          />
          <Form selectCostomer={location?.state?.selectCostomer} />
        </>
      ) : (
        <>
          <div>
            <HeroSection title="Host" />
            <div className="App mt-[2.5vw]">
              <div className="box">
                <div className="steps">
                  <ul className="nav">
                    {steps?.map((step, index) => (
                      <Step
                        key={step.key}
                        title={step.title}
                        label={step.label}
                        isActive={index === activeStepIndex}
                        isDone={index < activeStepIndex}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <>
              <div className="step-component w-[95%] m-auto">
                {steps?.map((step, index) => (
                  <div
                    key={step.key}
                    style={{
                      display: index === activeStepIndex ? "block" : "none",
                    }}
                  >
                    {step.component}
                  </div>
                ))}
              </div>

              <div className="btn-component">
                {activeStepIndex === 0 ? (
                  <Button
                    backgroundColor="white"
                    content="Cancel"
                    width="6.51vw"
                    cancel={true}
                    radius="0.25rem"
                    color="#8A92A6"
                    border="1px solid #D0D5DD"
                    font="0.833vw"
                    to="/host"
                  />
                ) : (
                  <Button
                    backgroundColor="white"
                    content="Back"
                    width="4.635vw"
                    back={true}
                    radius="0.25rem"
                    color="#8A92A6"
                    border="1px solid #D0D5DD"
                    font="0.729vw"
                    onClick={handleBack}
                    disabled={activeStepIndex === 0}
                  />
                )}

                <Button
                  backgroundColor="#8CC63F"
                  content={
                    activeStepIndex === steps?.length - 1 ? "Save" : "Next"
                  }
                  width="5.26vw"
                  save={true}
                  radius="0.25rem"
                  color="white"
                  font="0.833vw"
                  onClick={
                    activeStepIndex === steps?.length - 1
                      ? handleSave
                      : handleNext
                  }
                />
              </div>
            </>
          </div>
        </>
      )}
    </>
  );
};

export default HostAddnew;
