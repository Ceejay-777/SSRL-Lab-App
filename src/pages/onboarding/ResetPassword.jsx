import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CustomLabel from "../../components/CustomLabel";
import { validatePassword } from "../../Modules/verifyForm";
import { useRequest } from "../../Modules/useRequest";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BigGreenButton from "../../components/BigGreenButton";
import Spinner from "../../components/Spinner";
import { useUserData } from "../../Modules/UserContext";

const ResetPassword = () => {
  const [password, setPassword] = useState({
    password: "",
    isError: false,
    error: "",
  });
  const [confPassword, setConfPassword] = useState({
    password: "",
    isError: false,
    error: "",
  });
  const validatePasswordRef = useRef(false);
  const validateConfPasswordRef = useRef(false);
  const passwordRef = useRef("");
  const confPasswordRef = useRef("");

  const [
    sendResetRequest,
    resetLoading,
    setResetLoading,
    resetError,
    setResetError,
  ] = useRequest();

  const navigate = useNavigate();
  const { userId } = useUserData();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    validatePassword(password, setPassword, validatePasswordRef);
    validatePassword(confPassword, setConfPassword, validateConfPasswordRef);
    console.log(passwordRef.current, confPasswordRef.current);

    if (validatePasswordRef.current && validatePassword.current) {
      if (passwordRef.current !== confPasswordRef.current) {
        setConfPassword({
          ...confPassword,
          isError: true,
          error: "Passwords do not match",
        });
      } else {
        setPassword({ ...password, isError: false, error: "" });
        setConfPassword({ ...confPassword, isError: false, error: "" });
        resetPassword();
      }
    }

    resetPassword();
  };

  const resetPassword = async () => {
    const res = await sendResetRequest("change_password", "PATCH", {
      new_pwd: passwordRef.current,
      uid: userId,
    });

    const data = await res.json();
    console.log(data);
    if (res.ok) {
      toast.success(data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      console.log(data.message);
      setResetError({ status: true, msg: data.message });
    }
  };

  return (
    <div className="flex w-full items-center justify-center bg-white md:min-h-screen">
      {/* reset password tab */}
      <div className="mt-12 w-full max-w-md space-y-5 p-6 pt-4">
        {resetError.status && <p>{resetError.msg}</p>}
        <h2 className="text-center text-2xl font-semibold leading-10 text-[#333333]">
          Reset Account Password
        </h2>
        <p className="py-1 text-center text-sm font-medium text-[#666666] opacity-75">
          Enter your Email and we&apos;ll send you a link to reset your password
        </p>

        <form className="" noValidate onSubmit={handleFormSubmit}>
          <div className="space-y-4 rounded-md text-base font-normal opacity-80 shadow-sm">
            <CustomLabel
              htmlFor="password"
              labelText="New password"
              inputType="text"
              inputValue={password.password}
              onChange={(event) => {
                setPassword({ ...password, password: event.target.value });
                passwordRef.current = event.target.value;
              }}
              onBlur={() =>
                validatePassword(password, setPassword, validatePasswordRef)
              }
              isError={password.isError}
              errorMessage={password.error}
              labelCLassName="text-[#666666] inline-block"
              inputClassName="appearance-none relative block w-full px-3 py-1 border border-[#666666] rounded-lg text-[#111111] opacity-35 focus:outline-none focus:opacity-100 focus:text-black"
              placeholder="Enter new password"
            >
              Enter New Password:
            </CustomLabel>
            <CustomLabel
              htmlFor="password"
              labelText="Confirm password"
              inputType="text"
              inputValue={confPassword.password}
              onChange={(event) => {
                setConfPassword({
                  ...confPassword,
                  password: event.target.value,
                });
                confPasswordRef.current = event.target.value;
              }}
              onBlur={() =>
                validatePassword(
                  confPassword,
                  setConfPassword,
                  validateConfPasswordRef,
                )
              }
              isError={confPassword.isError}
              errorMessage={confPassword.error}
              labelCLassName="text-[#666666] inline-block"
              inputClassName="appearance-none relative block w-full px-3 py-1 border border-[#666666] rounded-lg text-[#111111] opacity-35 focus:outline-none focus:opacity-100 focus:text-black"
              placeholder="Confirm new password"
            >
              Confirm new password
            </CustomLabel>
          </div>

          <div className="mt-6 flex items-center justify-end gap-4">
            {resetLoading && <Spinner />}
            <BigGreenButton type="submit">Reset Password</BigGreenButton>
          </div>
        </form>
        <div className="mt-1 flex items-center justify-end">
          {/* <Link
            to="/"
            className="mt-6 w-28 rounded-xl bg-[#053F05F0] px-1 py-2 text-center text-base font-bold capitalize text-white"
          >
            Sign in
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
