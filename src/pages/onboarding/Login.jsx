import { useEffect, useRef, useState } from "react";
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
import { Loader2 } from "lucide-react";
import BigGreenButton from "../../components/BigGreenButton.jsx"
import { Loader } from "lucide-react";

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
  const validateUsernameRef = useRef(false);
  const validatePasswordRef = useRef(false);
  const checkedRef = useRef();
  const { setUserId, setUserProfile } = useUserData();

  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
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
      user_uid: username.name,
      pwd: password.password,
    });

    const data = await res.json();
    if (res.ok) {
      setSessionStorage('access_token', data.access_token)
      setUserProfile(data.user_profile);
      navigate("/home/dashboard");
    } else {
      setLoginError({ status: true, msg: data.message });
    }
  };

  return (
    <div className="w-full flex justify-center items-center md:min-h-screen bg-white">
      <div className="w-full max-w-md space-y-5 p-6">
        {loginError.status && <p>{loginError.msg}</p>}
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-[#333333] leading-10">
          Welcome Back!
        </h2>

        <form className="" onSubmit={handleFormSubmit}>
          <div className="rounded-md text-base font-normal opacity-80 space-y-4 ">
            <CustomLabel
              htmlFor="username"
              labelText="Username"
              inputType="text"
              value={username.name}
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
              placeholder='Enter userId'
            >Username</CustomLabel>
            <CustomLabel
              htmlFor="password"
              labelText="Password"
              inputType="password"
              value={password.password}
              onChange={(event) =>
                setPassword({ ...password, password: event.target.value })
              }
              onBlur={() =>
                validatePassword(password, setPassword, validatePasswordRef)
              }
              isError={password.isError}
              errorMessage={password.error}
              placeholder='Enter password'
            >Password</CustomLabel>
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
              className="underline text-[#111111] font-medium text-sm cursor-pointer"
            >
              Forgot your password?
            </p>
          </div>

          <div className="flex w-fit gap-4 items-center ml-auto my-3">
            {loginLoading && <Loader className="animate-spin text-navBg2" />}

            <BigGreenButton
              type="submit"
            >
              Sign in
            </BigGreenButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
