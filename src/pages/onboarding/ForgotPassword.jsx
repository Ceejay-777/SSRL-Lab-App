import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import forgotPassword from "../../assets/ForgotPassword.svg"; // Importing the image
import Backtosignin from "../../assets/Backtosignin.svg"; // Importing the image
import CustomLabel from "../../components/CustomLabel.jsx";
import { validateEmail } from "../../Modules/verifyForm.js";
import { useRequest } from "../../Modules/useRequest.js";
import { useUserData } from "../../Modules/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner.jsx";
import BigGreenButton from "../../components/BigGreenButton.jsx";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState({ email: "", isError: false, msg: "" });
  const validateEmailRef = useRef();
  const [sendForgetRequest, forgotLoading] = useRequest();
  const [
    sendCredRequest,
    credLoading,
    setCredLoading,
    credError,
    setCredError,
  ] = useRequest();
  const { userId } = useUserData();
  const navigate = useNavigate();

  const handleForgetPassword = (event) => {
    event.preventDefault();
    validateEmail(email, setEmail, validateEmailRef);

    if (validateEmailRef.current) {
      confirmCredentials();
    }
  };

  const confirmCredentials = async () => {
    // console.log(userId);
    const res = await sendCredRequest("forgot_password", "POST", {
      uid: userId,
      email: email.email,
    });

    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
      setTimeout(() => {
        navigate("/sendOTP");
      }, 2000);
    } else {
      setCredError({ status: true, msg: data.message });
    }
  };

  return (
    <div className="flex w-full items-center justify-center bg-white md:min-h-screen">
      {/* forgot password tab */}
      <div className="m w-full max-w-md space-y-6 p-6">
        {credError.status && <p>{credError.msg}</p>}
        <div className="flex items-center justify-center">
          <img src={forgotPassword} alt="forgot Password" />
        </div>

        <h2 className="text-center text-3xl font-semibold leading-10 text-[#333333]">
          Forgot Password
        </h2>
        <p className="py-1 text-center text-sm font-medium text-[#666666] opacity-75">
          Enter your Email and we&apos;ll send you a link to reset your password
        </p>

        <form className="space-y-8" onSubmit={handleForgetPassword} noValidate>
          <CustomLabel
            htmlFor="email"
            labelText="Email:"
            inputType="email"
            inputValue={email.email}
            onChange={(event) =>
              setEmail({ ...email, email: event.target.value })
            }
            onBlur={() => validateEmail(email, setEmail, validateEmailRef)}
            isError={email.isError}
            errorMessage={email.msg}
            placeholder="Enter email address"
          >
            Email Address
          </CustomLabel>

          <div className="mt-2 flex items-center justify-end gap-4">
            {credLoading && <Spinner />}
            <BigGreenButton type="submit">Submit</BigGreenButton>
          </div>
        </form>

        <div className="mt-2 flex items-center justify-center gap-3 text-center text-base font-medium">
          <img src={Backtosignin} alt="BacK" />

          <Link
            to="/"
            className="text-base font-medium text-[#666666] opacity-75"
          >
            Back to Sign in{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
