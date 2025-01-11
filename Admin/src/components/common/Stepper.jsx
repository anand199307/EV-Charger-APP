import React from "react";
import "./Stepper.css";
import { useDispatch } from "react-redux";
import Button from "./Button";
import { useParams } from "react-router-dom";
import { Step } from "./StepperSteps";

function Stepper({
  details,
  stepperCancel,
  onSave,
  activeStepIndex,
  setActiveStepIndex,
  handleNext,
  steps,
}) {
  const handleSave = () => {
    onSave();
  };

  const handleBack = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
    }
  };

  return (
    <div className="App mt-[2.5vw]">
      <div className="box">
        <div className="steps">
          <ul className="nav">
            {steps?.map((step, index) => (
              <Step
                key={step.key}
                title={step.title}
                label={step.label}
                isActive={details && index === activeStepIndex}
                isDone={index < activeStepIndex}
              />
            ))}
          </ul>
        </div>
        {details && (
          <>
            <div className="step-component">
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
                  // to={`/host/${params.id}`}
                  onClick={stepperCancel}
                  font="0.833vw"
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
                // onClick={handleNext}
                onClick={
                  activeStepIndex === steps?.length - 1
                    ? handleSave
                    : handleNext
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Stepper;
