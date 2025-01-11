import React, { useState } from "react";
import Vectorlogin from "../../../assets/Auth-Images/LoginVector.svg";
import ButtonAuth from "../../common/Button";
import InputBox from "../../common/InputBox";
import {
  ForgotPaswd,
  setToastState,
  setToastmsg,
} from "../../../store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const formData = { email: "" };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValue] = useState(formData);
  const [errorForm, setErrorForm] = useState({});
  const [isSubmit, setIssubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(ForgotPaswd(formValues?.email));
    setErrorForm(Validation(formValues).email);
    if (Object.keys(errorForm).length === 0 && formValues.email.length > 4) {
      if (ForgotPaswd.fulfilled.match(result)) {
        dispatch(setToastState(true));
        dispatch(setToastmsg("Passord has been reset Successfully"));
        navigate("/resetPassword");
      } else {
        dispatch(setToastState(true));
        dispatch(setToastmsg("Invalid credentials"));
      }
    }
  };

  const Validation = (values) => {
    const error = {};
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

    if (!values.email) {
      error.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      error.email = "Email format is not correct";
    }

    setIssubmit(true);

    return error;
  };

  return (
    <>
      <div className="w-[50%] flex flex-col gap-[20px] items-center m-auto ">
        <div className="flex gap-[5px]">
          <img
            className="w-[2.604vw] h-[5vh]"
            src={Vectorlogin}
            alt="Vectorlogin"
          />
          <h1 className="text-[1.719vw] text-[#232D42]">Helios EVC</h1>
        </div>
        <div>
          <p className="text-[1.719vw] text-center text-#000">Reset Password</p>
          <p className="text-#8A92A6 text-center text-[0.833vw] text-[#8A92A6]  ">
            Enter your email address and we’ll send you an email with
            instructions to reset your password.
          </p>
        </div>
        <form className="flex flex-col gap-[1.563vw]" onSubmit={handleSubmit}>
          <div>
            <label className="my-3 text-[#8A92A6] text-start text-[0.833vw] flex self-start">
              Email
            </label>
            <InputBox
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              login
            />
          </div>
          <ButtonAuth
            backgroundColor="#8CC63F"
            content="Sign in"
            width="9.792vw"
          />
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
