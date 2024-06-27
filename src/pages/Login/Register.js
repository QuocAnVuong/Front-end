import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import {
  LoginContext,
  LoginPageContext,
  UserContext,
} from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

function Register() {
  const initialValues = {
    Username: "",
    Email: "",
    Password: "",
    FirstName: "",
    LastName: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const { setUser } = useContext(UserContext);
  const { setIsLogin } = useContext(LoginContext);
  const { setDuringLogin } = useContext(LoginPageContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };
  useEffect(() => {
    setDuringLogin(true);
  }, [setDuringLogin]);

  const fetchMockData = async () => {
    try {
      console.log(formValues);
      const response = await fetch("https://progexbackend.onrender.com/user/register", {
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

  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);

  const validate = async () => {
    const data = await fetchMockData();
    console.log(data);
    if (data.validationErrors !== undefined) {
      const errorList = data.validationErrors;
      console.log(errorList);
      const errors = {};
      for (let i = 0; i < errorList.length; i++) {
        const error = errorList[i];
        switch (error.path) {
          case "Email":
            if (!errors.email) {
              errors.email = error.msg;
            }
            console.log("Email path");
            console.log(error.msg);
            break;
          case "Password":
            if (!errors.password) {
              errors.password = error.msg;
            }
            console.log("Password path");
            console.log(error.msg);
            break;
          case "confirmPassword":
            if (!errors.confirmPassword) {
              errors.confirmPassword = error.msg;
            }
            console.log("confirm path");
            console.log(error.msg);
            break;
          case "FirstName":
            if (!errors.name) {
              errors.name = error.msg;
            }
            console.log("FirstName path");
            console.log(error.msg);
            break;
          case "LastName":
            if (!errors.name) {
              errors.name = error.msg;
            }
            console.log("LastName path");
            console.log(error.msg);
            break;
          case "Username":
            if (!errors.username) {
              errors.username = error.msg;
            }
            console.log("UserName path");
            console.log(error.msg);
            break;
          default:
            console.log("NO path");
            break;
        }
        console.log(errors);
      }

      setFormErrors(errors);
    } else {
      setUser(data);
      setDuringLogin(false);
      setIsLogin(true);
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="w-full flex items-center justify-center flex-grow">
        <div className="w-[610px]">
          <p className="text-center font-bold text-[36px] mb-[30px]">SIGN UP</p>
          <form className="mb-[30px]" onSubmit={handleSubmit}>
            <div className="w-full flex items-center justify-between">
              <div>
                <p className="font-medium text-[24px] mb-[12px]">
                  First name *
                </p>
                <input
                  type="text"
                  id="FirstName"
                  name="FirstName"
                  value={formValues.FirstName}
                  onChange={handleChange}
                  className="w-[295px] h-[60px] border-[2.5px] p-[20px] rounded-[8px]
                  border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none font-normal 
                  text-[20px]"
                />
              </div>
              <div>
                <p className="font-medium text-[24px] mb-[12px]">Last name *</p>
                <input
                  type="text"
                  id="LastName"
                  name="LastName"
                  value={formValues.LastName}
                  onChange={handleChange}
                  className="w-[295px] h-[60px] border-[2.5px] p-[20px] rounded-[8px]
                  border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none font-normal text-[20px]"
                />
              </div>
            </div>
            <p className="font-medium text-[20px] text-red-700 mb-[30px]">
              {formErrors.name}
            </p>
            <div className="mb-[30px]">
              <p className="font-medium text-[24px] mb-[12px]">User Name</p>
              <input
                type="text"
                id="Username"
                name="Username"
                value={formValues.Username}
                onChange={handleChange}
                className="w-full h-[60px] border-[2.5px] p-[20px] rounded-[8px]
                  border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none font-normal 
                  text-[20px]"
              />
              <p className="font-medium text-[20px] text-red-700">
                {formErrors.username}
              </p>
            </div>
            <div className="mb-[30px]">
              <p className="font-medium text-[24px] mb-[12px]">Email address</p>
              <input
                type="text"
                id="Email"
                name="Email"
                value={formValues.Email}
                onChange={handleChange}
                className="w-full h-[60px] border-[2.5px] p-[20px] rounded-[8px]
                  border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none font-normal 
                  text-[20px]"
              />
              <p className="font-medium text-[20px] text-red-700">
                {formErrors.email}
              </p>
            </div>
            <div className="mb-[30px]">
              <p className="font-medium text-[24px] mb-[12px]">Password</p>
              <input
                type="password"
                id="Password"
                name="Password"
                value={formValues.Password}
                onChange={handleChange}
                className="w-full h-[60px] border-[2.5px] p-[20px] rounded-[8px]
                  border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none font-normal 
                  text-[20px]"
              />
              <p className="font-medium text-[20px] text-red-700">
                {formErrors.password}
              </p>
            </div>
            <div className="mb-[30px]">
              <p className="font-medium text-[24px] mb-[12px]">
                Confirm Password
              </p>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                className="w-full h-[60px] border-[2.5px] p-[20px] rounded-[8px]
                  border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none font-normal 
                  text-[20px]"
              />
              <p className="font-medium text-[20px] text-red-700">
                {formErrors.confirmPassword}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="w-[159px] h-[58px] bg-[#322C2B] rounded-[6px] text-[18px]
                flex items-center justify-center text-white font-normal cursor-pointer
                "
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
