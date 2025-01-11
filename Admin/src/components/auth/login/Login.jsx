import React, { useState, useEffect } from "react";
import Vectorlogin from "../../../assets/Auth-Images/LoginVector.svg";
import InputBox from "../../common/InputBox";
import Button from "../../common/Button";
import { Link, useNavigate } from "react-router-dom";
import {
  doLogin,
  resetAuth,
  setToastState,
  setToastmsg,
} from "../../../store/slices/AuthSlice";
import { useDispatch } from "react-redux";
import storage from "redux-persist/lib/storage";
import { readUser } from "../../../services/localStorage.service";

const Login = () => {
  const formData = { email: "", password: "" };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { isAuthencation, error } = useSelector((state) => state.auth);
  const [formValues, setFormValue] = useState(formData);
  const [errorForm, setErrorForm] = useState({});
  const [isSubmit, setIssubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValues, [name]: value });
  };

  useEffect(() => {
    dispatch(resetAuth());
    // localStorage.clear();
    storage.removeItem("persist:root");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorForm(Validation(formValues));
    if (Object.keys(errorForm).length === 0 && formValues.password.length > 4) {
      const result = await dispatch(doLogin(formValues));
      if (doLogin.fulfilled.match(result)) {
        dispatch(setToastState(true));
        dispatch(setToastmsg("Signed in successfully"));
        setTimeout(() => {
          navigate("/dashboard");
          // const userlogin = readUser();
          // if (userlogin.role === 0) {
          //   navigate("/dashboard");
          // } else if (userlogin.role === 2 || userlogin.role === 3) {
          //   navigate("/host");
          // }
        }, 1000);
      } else {
        dispatch(setToastmsg("Invalid credentials"));
        dispatch(setToastState(true));
      }
    }
  };

  const Validation = (values) => {
    const error = {};
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

    if (!values.email) {
      error.email = "Please enter your email to login";
    } else if (!emailRegex.test(values.email)) {
      error.email = "Email format is not correct";
    }

    if (!values.password) {
      error.password = "Please enter your password to login";
    } else if (values.password.length <= 4) {
      error.password = "Password should be more than 4 characters";
    } else if (!passwordRegex.test(values.password)) {
      error.password =
        "Password should contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit.";
    }

    setIssubmit(true);

    return error;
  };

  return (
    <div className="w-[50%] flex flex-col gap-[20px] m-auto auth_main">
      <div className="flex justify-center gap-[5px]">
        <img
          className="w-[2.604vw] h-[5vh]"
          src={Vectorlogin}
          alt="Vectorlogin"
        />
        <h1 className="text-[1.719vw] text-[#232D42]">Helios EVC</h1>
      </div>
      <div>
        <p className="text-[1.719vw] text-#000 text-center">Sign In</p>
        <p className="text-#8A92A6 text-[0.833vw] text-[#8A92A6] text-center">
          Sign in to stay connected.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[1.563vw] sign_in"
      >
        <div>
          <label
            htmlFor="email"
            className="my-3 text-[#8A92A6] text-start text-[0.833vw] flex self-start"
          >
            Email
          </label>
          <InputBox
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            // required
            login
          />
          {errorForm.email && (
            <div className="text-red-500">{errorForm.email}</div>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="my-3 text-[#8A92A6] text-[0.833vw] flex self-start"
          >
            Password
          </label>
          <InputBox
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            // required
            login
          />
          {errorForm.password && (
            <div className="text-red-500">{errorForm.password}</div>
          )}
        </div>
        <div className="forpass flex justify-between">
          <div className=" flex gap-[10px] items-center">
            <input required type="checkbox" className="cursor-pointer chk" />
            <label className="text-[0.833vw] text-[#8A92A6] remember">
              Remember me?
            </label>
          </div>
          <div>
            <Link
              to="/forgotPassword"
              className="text-[#8CC63F] text-[0.833vw] cursor-pointer pass"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <Button
          backgroundColor="#8CC63F"
          content="Sign in"
          width="9.792vw"
          type="submit"
          font="0.833vw"
          radius="10px"
        />
      </form>
    </div>
  );
};

export default Login;
