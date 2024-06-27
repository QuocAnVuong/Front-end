import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { LoginPageContext } from "../../context/ContextProvider";

function PasswordRecovery() {
  const initialValues = {
    Email: "",
    OTP: "",
    Password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const { setDuringLogin } = useContext(LoginPageContext);
  const [cases, setCases] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCases("Submit");
  };
  const handleSendOTP = (e) => {
    e.preventDefault();
    setCases("OTP");
  };

  useEffect(() => {
    setDuringLogin(true);
  }, [setDuringLogin]);

  const fetchFormSubmit = async () => {
    try {
      console.log(formValues);
      const response = await fetch(
        "https://progexbackend.onrender.com/user/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem fetching the mock data:", error);
    }
  };
  const fetchOTP = async () => {
    try {
      const body = {};
      body.Email = formValues.Email;
      console.log(body);
      const response = await fetch("https://progexbackend.onrender.com/user/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
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

  useEffect(() => {
    validate();
  }, [cases]);

  const validate = async () => {
    let data;
    console.log(cases);
    if (cases === "Submit") {
      data = await fetchFormSubmit();
    } else if (cases === "OTP") {
      data = await fetchOTP();
    } else {
      return;
    }
    console.log(data);
    if (data.validationErrors !== undefined) {
      const errorList = data.validationErrors;
      console.log(errorList);
      const errors = {};
      for (let i = 0; i < errorList.length; i++) {
        const error = errorList[i];
        switch (error.path) {
          case "Email":
            if (!errors.Email) {
              errors.Email = error.msg;
            }
            console.log("Email path");
            console.log(error.msg);
            break;
          case "Password":
            if (!errors.Password) {
              errors.Password = error.msg;
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
          case "OTP":
            if (!errors.OTP) {
              errors.OTP = error.msg;
            }
            console.log("OTP path");
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
      if (cases === "Submit") {
        setCases("");
        navigate("/login");
      }
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="w-full flex items-center justify-center flex-grow">
        <div className="w-[610px]">
          <p className="text-center font-bold text-[36px] mb-[30px]">
            Password Recovery
          </p>
          <form className="mb-[30px]" onSubmit={handleSubmit}>
            <div className="mb-[30px]">
              <p className="font-medium text-[24px] mb-[12px]">Email address</p>
              <input
                type="text"
                id="Email"
                name="Email"
                value={formValues.Email}
                onChange={handleChange}
                className="w-full h-[60px] border-[2.5px] p-[20px] rounded-[8px]
              border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none"
              />
              <p className="font-medium text-[20px] text-red-700">
                {formErrors.Email}
              </p>
            </div>
            <div
              className="w-full flex items-center justify-center cursor-pointer"
              onClick={handleSendOTP}
            >
              <div className="w-[260px] h-[58px] bg-[#322C2B] rounded-[6px] text-white flex items-center justify-center">
                Send OTP
              </div>
            </div>
            <div className="mb-[30px]">
              <p className="font-medium text-[24px] mb-[12px]">OTP</p>
              <input
                type="text"
                id="OTP"
                name="OTP"
                value={formValues.OTP}
                onChange={handleChange}
                className="w-full h-[60px] border-[2.5px] p-[20px] rounded-[8px]
              border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none"
              />
              <p className="font-medium text-[20px] text-red-700">
                {formErrors.OTP}
              </p>
            </div>
            <div className="mb-[30px]">
              <p className="font-medium text-[24px] mb-[12px]">New password</p>
              <input
                type="password"
                id="Password"
                name="Password"
                value={formValues.Password}
                onChange={handleChange}
                className="w-full h-[60px] border-[2.5px] p-[20px] rounded-[8px]
              border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none"
              />
              <p className="font-medium text-[20px] text-red-700">
                {formErrors.Password}
              </p>
            </div>
            <div className="mb-[30px]">
              <p className="font-medium text-[24px] mb-[12px]">
                Confirm new password
              </p>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                className="w-full h-[60px] border-[2.5px] p-[20px] rounded-[8px]
              border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none"
              />
              <p className="font-medium text-[20px] text-red-700">
                {formErrors.confirmPassword}
              </p>
            </div>
            <button
              type="submit"
              className="w-full h-[58px] bg-[#322C2B] rounded-[6px] text-[18px]
                flex items-center justify-center text-white font-normal cursor-pointer
                "
            >
              Finish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordRecovery;
