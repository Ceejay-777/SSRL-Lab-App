export const validateUsername = (
  username,
  setUsername,
  validateUsernameRef
) => {
  const regName = /^[a-zA-Z]*SSRL\d{3}$/;
  if (!username.name) {
    setUsername({
      ...username,
      isError: true,
      error: "Please input your username",
    });
    validateUsernameRef.current = false;
    // console.log("Identity error: Input identiy")
    return;
  }

  if (!regName.test(username.name)) {
    setUsername({
      ...username,
      isError: true,
      error: "Invalid username",
    });
    validateUsernameRef.current = false;
    // console.log("Identity error: Invalid identiy")
    return;
  }
  validateUsernameRef.current = true;
  // console.log("Good to go")
  setUsername({ ...username, isInputElement: false, error: "" });
};

export const validateEmail = (email, setEmail, validateEmailRef) => {
  if (!email.email) {
    setEmail({
      ...email,
      isError: true,
      msg: "Please input your email",
    });
    validateEmailRef.current = false;
    return;
  }
  const reg = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  if (!reg.test(email.email)) {
    setEmail({
      ...email,
      isError: true,
      msg: "Invalid email",
    });
    validateEmailRef.current = false;
    return;
  }
  setEmail({
    ...email,
    isError: false,
    errorMsg: "",
  });
  validateEmailRef.current = true;
};

// export const validatePhone = (phoneNum, setPhoneNum, validatedPhoneRef) => {
//   if (!phoneNum.val) {
//     setPhoneNum({
//       ...phoneNum,
//       isError: true,
//       errorMsg: "Please input your phone number",
//     });
//     validatedPhoneRef.current = false;
//     return;
//   }
//   const reg = /^\d{11}$/;
//   if (!reg.test(phoneNum.val)) {
//     setPhoneNum({
//       ...phoneNum,
//       isError: true,
//       errorMsg: "Invalid phone number",
//     });
//     console.log("Invalid phone num", reg.test(phoneNum.val));
//     validatedPhoneRef.current = false;
//     return;
//   }
//   setPhoneNum({
//     ...phoneNum,
//     isError: false,
//     errorMsg: "",
//   });
//   validatedPhoneRef.current = true;
// };

export const validatePassword = (
  password,
  setPassword,
  validatePasswordRef
) => {
  if (!password.password) {
    setPassword({
      ...password,
      isError: true,
      error: "Please input your password",
    });
    validatePasswordRef.current = false;
    // console.log("Pass Error: Input your password")
    return;
  }
  setPassword({
    ...password,
    isError: false,
    error: "",
  });
  validatePasswordRef.current = true;
  // console.log("Good to go")
};

export const validateOTP = (otp, setOtp, otpRef) => {
  if (otp.otp.includes("")) {
    setOtp({
      ...otp,
      isError: true,
      error: "Please ensure all fields are filled",
    });
    otpRef.current = false;
  } else {
    setOtp({ ...otp, isError: false, error: "" });
    // console.log(otp.otp.join(""));
    otpRef.current = true;
  }
};
