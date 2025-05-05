import React, { useEffect, useRef, useState } from "react";
import InputError from "../../components/InputError";
import { validateOTP } from "../../Modules/verifyForm";
import { useRequest } from "../../Modules/useRequest";
import toast from "react-hot-toast";
import { useUserData } from "../../Modules/UserContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import BigGreenButton from "../../components/BigGreenButton";

const OTP = () => {
  const [otp, setOtp] = useState({
    otp: new Array(6).fill(""),
    isError: false,
    error: "",
  });

  const otpRef = useRef(false);
  const { userId } = useUserData();
  const navigate = useNavigate();
  const [sendOTPRequest, otpLoading, setOtpLoading, otpError, setOtpError] =
    useRequest();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp({
      ...otp,
      otp: otp.otp.map((d, id) => (id === index ? element.value : d)),
    });

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleBackkey = (element, index) => {
    if (element.key === "Backspace" && otp.otp[index] === "") {
      if (element.target.previousSibling) {
        element.preventDefault();
        element.target.previousSibling.focus();
        setOtp({
          ...otp,
          otp: otp.otp.map((d, id) => (id === index - 1 ? "" : d)),
        });
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateOTP(otp, setOtp, otpRef);

    if (!otpRef.current) {
      toast.error("Invalid OTP");
      return;
    }

    const strOtp = otp.otp.join("");

    console.log(strOtp);
    const res = await sendOTPRequest("confirm/otp", "POST", {
      otp: strOtp,
      uid: userId,
    });

    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
      setTimeout(() => {
        navigate("/resetPassword");
      }, 2000);
      // Go to reset password page
    } else {
      setOtpError({ status: true, msg: data.message });
    }
  };

  return (
    <div className="flex w-full items-center justify-center bg-white md:min-h-screen">
      <div className="w-full max-w-md space-y-5 p-6">
        {otpError.status && <p>{otpError.msg}</p>}
        <h2 className="text-center text-3xl font-semibold leading-10 text-[#333333]">
          Enter OTP
        </h2>
        <p className="py-1 text-center text-sm font-medium text-[#666666] opacity-75">
          Enter the OTP sent to your email address
        </p>

        <form onSubmit={handleSubmit} className="text-center">
          <div className="flex justify-center space-x-2 text-base font-normal opacity-80">
            {otp.otp.map((data, index) => {
              return (
                <input
                  type="text"
                  key={index}
                  value={data}
                  maxLength="1"
                  className="h-10 w-10 rounded-lg border border-[#666666] text-center text-[#111111] focus:text-black focus:outline-none"
                  onChange={(e) => {
                    handleChange(e.target, index);
                  }}
                  onFocus={(e) => {
                    e.target.select();
                  }}
                  onKeyDown={(e) => handleBackkey(e, index)}
                />
              );
            })}
          </div>
          {otp.isError && <InputError>{otp.error}</InputError>}

          <div className="mt-6 flex items-center justify-end text-center gap-4">
            {otpLoading && <Spinner />}
            <BigGreenButton type="submit">Verify OTP</BigGreenButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTP;
