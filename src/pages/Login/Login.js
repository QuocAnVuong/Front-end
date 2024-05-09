import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import {
  LoginContext,
  LoginPageContext,
  UserContext,
} from "../../context/ContextProvider";

function Login() {
  const initialValues = {
    Username: "",
    Password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const { setIsLogin } = useContext(LoginContext);
  const { setDuringLogin } = useContext(LoginPageContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setDuringLogin(true);
  }, [setDuringLogin]);

  const fetchMockData = async () => {
    try {
      console.log(formValues);
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formValues),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem fetching the mock data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };

  const validate = async () => {
    const data = await fetchMockData();
    console.log(data);
    if (data.message !== undefined) {
      const error = {};
      if (data.message === "User not found") {
        error.username = "Username not found";
      } else if (data.message === "Incorrect Password") {
        error.password = data.message;
      } else {
        console.log(data.message);
      }
      setFormErrors(error);
    } else {
      setIsLogin(true);
      setDuringLogin(false);
      setUser(data);
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="w-full flex items-center justify-center flex-grow">
        <div className="w-[610px]">
          <p className="text-center font-bold text-[36px] mb-[30px]">SIGN IN</p>
          <form className="mb-[30px]" onSubmit={handleSubmit}>
            <div className="mb-[30px]  text-[24px]">
              <p className="mb-[12px] font-medium">Username</p>
              <input
                type="text"
                id="Username"
                name="Username"
                value={formValues.Username}
                onChange={handleChange}
                className="w-full h-[60px] border-[2.5px] p-[20px] rounded-[8px]
              border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none font-normal"
              />

              <p className="font-medium text-[20px] text-red-700 mb-[30px]">
                {formErrors.username}
              </p>
            </div>
            <div className="mb-[30px] font-medium text-[24px]">
              <p className="mb-[12px]">Password</p>
              <input
                type="password"
                id="Password"
                name="Password"
                value={formValues.Password}
                onChange={handleChange}
                className="w-full h-[60px] border-[2.5px] p-[20px] rounded-[8px]
              border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none"
              />

              <p className="font-medium text-[20px] text-red-700 mb-[30px]">
                {formErrors.password}
              </p>
            </div>
            <button
              type="submit"
              className="w-full h-[58px] bg-[#322C2B] rounded-[6px] text-[18px]
                flex items-center justify-center text-white font-normal cursor-pointer
                "
            >
              Login
            </button>
          </form>
          <Link to={"/password-recovery"}>
            <p className="w-full font-normal text-center text-[20px] mb-[30px] cursor-pointer">
              Forget password?
            </p>
          </Link>
          <Link to={"/register"}>
            <div className="w-full flex items-center justify-center cursor-pointer">
              <button className="w-[260px] h-[58px] bg-[#322C2B] rounded-[6px] text-white flex items-center justify-center">
                Create new account
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
