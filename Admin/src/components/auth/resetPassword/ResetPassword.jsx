import React, { useState } from "react";
import Vectorlogin from "../../../assets/Auth-Images/LoginVector.svg";
import ButtonAuth from "../../common/Button";
import InputBox from "../../common/InputBox";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  ResetPaswd,
  setToastState,
  setToastmsg,
} from "../../../store/slices/AuthSlice";
import Toast from "../../common/toast/Toast";

const ResetPassword = () => {
  const formData = {
    password: "",
    confirm_password: "",
    reset_password_token: "",
  };
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");
  // console.log(searchParams, token);
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
    const result = await dispatch(ResetPaswd(formValues));
    setErrorForm(Validation(formValues));
    if (Object.keys(errorForm).length === 0 && formValues.password.length > 4) {
      if (ResetPaswd.fulfilled.match(result)) {
        dispatch(setToastState(true));
        dispatch(setToastmsg("Passord has been reset Successfully"));
        navigate("/login");
      } else {
        dispatch(setToastState(true));
        dispatch(setToastmsg("Invalid credential"));
      }
    }
  };

  const Validation = (values) => {
    const error = {};
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!values.pwd) {
      error.pwd = "Password is required";
    } else if (values.pwd.length <= 4) {
      error.pwd = "Password should be more than 4 characters";
    } else if (!passwordRegex.test(values.pwd)) {
      error.pwd =
        "Password should contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit.";
    }

    setIssubmit(true);

    return error;
  };

  return (
    <>
      <div className="w-[50%] flex flex-col gap-[20px] items-center m-auto ">
        <div className="flex gap-[5px]">
          <img
            className="w-[3.125rem] h-[3.125rem]"
            src={Vectorlogin}
            alt="Vectorlogin"
          />
          <h1 className="text-[1.719vw] text-[#232D42]">Helios EVC</h1>
        </div>
        <div>
          <p className="text-[1.719vw] text-#000 text-center">
            Create New Password
          </p>
          <p className="text-#8A92A6 text-[0.833vw] text-[#8A92A6] text-center">
            Enter new Password for your account.
          </p>
        </div>
        <form className="flex flex-col gap-[1.563vw]" onSubmit={handleSubmit}>
          <div>
            <label className="my-3 text-[#8A92A6] text-start text-[0.833vw] flex self-start">
              Create New Password
            </label>
            <InputBox
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              login
            />
          </div>
          <div>
            <label className="my-3 text-[#8A92A6] text-start text-[0.833vw] flex self-start">
              Confirm New Password
            </label>
            <InputBox
              type="password"
              name="confirm_password"
              value={formValues.confirm_password}
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
        {/* <Toast
          message={toastMessage}
          showToast={showToast}
          setShowToast={setShowToast}
        /> */}
      </div>
    </>
  );
};

export default ResetPassword;
