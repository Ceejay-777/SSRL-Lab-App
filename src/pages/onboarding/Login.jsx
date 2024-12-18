import React, { useEffect, useRef, useState } from "react";
import { useUserData } from "../../Modules/UserContext.jsx";
import {
  validateUsername,
  validatePassword,
} from "../../Modules/verifyForm.js";
import { useRequest } from "../../Modules/useRequest.js";
import CustomLabel from "../../components/CustomLabel.jsx";
import { useNavigate } from "react-router-dom";
import {
  getSessionStorage,
  setSessionStorage,
} from "../../Modules/getSessionStorage.js";

const Login = () => {
  const [username, setUsername] = useState({
    name: "AdemideSSRL692",
    isError: false,
    error: "",
  });
  const [password, setPassword] = useState({
    password: "rJu7aZKFe2yH",
    isError: false,
    error: "",
  });
  const [
    sendLoginRequest,
    loginLoading,
    setLoginLoading,
    loginError,
    setLoginError,
  ] = useRequest();
  const [
    sendSessionRequest,
    sessionLoading,
    setSessionLoading,
    sessionError,
    setSessionError,
  ] = useRequest();
  const validateUsernameRef = useRef(false);
  const validatePasswordRef = useRef(false);
  const checkedRef = useRef();
  const { setUserId, setUserProfile } = useUserData();

  const navigate = useNavigate();

  const getSession = async () => {
    const res = await sendSessionRequest(`session/new/${getSessionStorage("session_id", "") || "new"}`);
    const sess = await res.json();
    if (res.ok) {
      if (Object.keys(sess.old_session).length === 0 || sess.old_session.expired === "true") {
        setSessionStorage("session_id", sess.new_session.session_id);
    }
    }
  };

  useEffect(() => {
    getSession()
  }, []);

  const handleFormSubmit = (event) => {
    // getSession()
    event.preventDefault();
    validateUsername(username, setUsername, validateUsernameRef);
    if (validateUsernameRef) setUserId(username.username);
    validatePassword(password, setPassword, validatePasswordRef);

    if (validateUsernameRef.current && validatePasswordRef.current) {
      setUserId(username.name);
      validateUser();
    }
  };

  const validateUser = async () => {
    const res = await sendLoginRequest("login", "POST", {
      user_id: username.name,
      pwd: password.password,
    });

    const data = await res.json();
    if (res.ok) {
      setUserProfile(data.user_profile);
      navigate("/home/dashboard");
    } else {
      setLoginError({ status: true, msg: data.message });
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md space-y-5 p-6">
        {loginError.status && <p>{loginError.msg}</p>}
        <h2 className="text-center text-3xl font-semibold text-[#333333] leading-10">
          Welcome Back!
        </h2>

        <form className="" onSubmit={handleFormSubmit}>
          <div className="rounded-md text-base font-normal opacity-80 space-y-4 ">
            <CustomLabel
              htmlFor="username"
              labelText="Username"
              inputType="text"
              inputValue={username.name}
              onChange={(event) =>
                setUsername({ ...username, name: event.target.value })
              }
              onBlur={() => {
                console.log(username.name);
                setUserId(username.name);
                validateUsername(username, setUsername, validateUsernameRef);
              }}
              isError={username.isError}
              errorMessage={username.error}
              labelCLassName="text-[#666666] inline-block"
              inputClassName="appearance-none relative block w-full px-3 py-1 border border-[#666666] rounded-lg text-[#111111] opacity-35 focus:outline-none focus:opacity-100 focus:text-black"
              placeholder='Enter userId'
            />
            <CustomLabel
              htmlFor="password"
              labelText="Password"
              inputType="password"
              inputValue={password.password}
              onChange={(event) =>
                setPassword({ ...password, password: event.target.value })
              }
              onBlur={() =>
                validatePassword(password, setPassword, validatePasswordRef)
              }
              isError={password.isError}
              errorMessage={password.error}
              labelCLassName="text-[#666666] inline-block"
              inputClassName="appearance-none relative block w-full px-3 py-1 border border-[#666666] rounded-lg text-[#111111] opacity-35 focus:outline-none focus:opacity-100 focus:text-black"
              placeholder='Enter password'
            />
          </div>

          <div className="flex items-center mt-3 gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 border-[#111111] rounded-sm"
              ref={checkedRef}
            />
            <label htmlFor="remember_me" className="text-sm text-[#333333]">
              Keep me signed in
            </label>
          </div>

          <div className=" mt-6">
            <p
              onClick={() => navigate("/forgotpassword")}
              className="underline text-[#111111] font-medium text-sm"
            >
              Forgot your password?
            </p>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-[#053F05F0] text-white mt-6 px-1 py-2 font-bold text-xl capitalize rounded-xl  w-32"
            >
              Sign in
            </button>
            {loginLoading && <p>Loading...</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
