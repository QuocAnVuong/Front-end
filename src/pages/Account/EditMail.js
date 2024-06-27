import React, { useContext, useState } from "react";
import { UserContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

function EditMail() {
  const { user, setUser } = useContext(UserContext);
  const initialValues = {
    FirstName: user.FirstName,
    LastName: user.LastName,
    Email: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const fetchMockData = async () => {
    try {
      console.log(formValues);
      const response = await fetch("https://progexbackend.onrender.com/user/update-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", mode: "cors",
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
          default:
            console.log("NO path");
            break;
        }
        console.log(errors);
      }
      setFormErrors(errors);
    } else {
      if (data.message !== "Token not found") {
        const newUser = user;
        newUser.Email = formValues.Email;
        setUser(newUser);
        navigate("/user/profile");
      } else {
        const error = {};
        error.message = "Something went wrong";
        setFormErrors(error);
      }
    }
  };

  return (
    <div
      className="flex flex-col flex-grow items-center justify-center 
    px-[118px] xl:px-[147.5px] 2xl:px-[177px] 3xl:px-[226px]"
    >
      <form onSubmit={handleSubmit}>
        <div
          className="border border-[#322C2B]
        rounded-[10.5px] xl:rounded-[13px] 2xl:rounded-[15.5px] 3xl:rounded-[20px] 
        px-[10.5px] xl:px-[13px] 2xl:px-[15.5px] 3xl:px-[20px] 
        py-[15.5px] xl:py-[19.5px] 2xl:py-[23.5px] 3xl:py-[30px] 
        gap-y-[21px] xl:gap-y-[26px] 2xl:gap-y-[31px] 3xl:gap-y-[40px] 
        mb-[15.5px] xl:mb-[19.5px] 2xl:mb-[23.5px] 3xl:mb-[30px]
        w-[345px] xl:w-[431px] 2xl:w-[517px] 3xl:w-[660px]"
        >
          <p className="text-[12.5px] xl:text-[15px] 2xl:text-[19px] 3xl:text-[24px] text-red-700">
            {formErrors.message}
          </p>
          <p className="font-bold text-[29px] xl:text-[36.5px] 2xl:text-[44px] 3xl:text-[56px]">
            Email
          </p>
          <div
            className="text-[12.5px] xl:text-[15px] 2xl:text-[19px] 3xl:text-[24px]
          mb-[15.5px] xl:mb-[19.5px] 2xl:mb-[23.5px] 3xl:mb-[30px]"
          >
            <p className="mb-[6px] xl:mb-[8px] 2xl:mb-[9.5px] 3xl:mb-[12px]">
              Email*
            </p>
            <input
              type="text"
              id="Email"
              name="Email"
              value={formValues.Email}
              onChange={handleChange}
              className="w-full border-[2.5px]
              border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none
              h-[31px] xl:h-[39px] 2xl:h-[47px] 3xl:h-[60px]
              p-[10.5px] xl:p-[13px] 2xl:p-[15.5px] 3xl:p-[20px] 
              rounded-[4px] xl:rounded-[5px] 2xl:rounded-[6px] 3xl:rounded-[8px]"
            />
            <p
              className="font-medium text-red-700
            mb-[15.5px] xl:mb-[19.5px] 2xl:mb-[23.5px] 3xl:mb-[30px]
            text-[10.5px] xl:text-[13px] 2xl:text-[15.5px] 3xl:text-[20px]"
            >
              {formErrors.email}
            </p>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            className="bg-[#322C2B] text-white flex items-center justify-center cursor-pointer
          w-[76px] xl:w-[96px] 2xl:w-[115px] 3xl:w-[147px] 
          h-[30px] xl:h-[37.8px] 2xl:h-[45.5px] 3xl:h-[58px] 
          rounded-[3px] xl:rounded-[4px] 2xl:rounded-[5px] 3xl:rounded-[6px] 
          text-[9.5px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px]
          mr-[15.5px] xl:mr-[19.5px] 2xl:mr-[23.5px] 3xl:mr-[30px]"
          >
            Save
          </button>
          <div
            className="bg-[#CECECE] flex items-center justify-center cursor-pointer
          w-[76px] xl:w-[96px] 2xl:w-[115px] 3xl:w-[147px] 
          h-[30px] xl:h-[37.8px] 2xl:h-[45.5px] 3xl:h-[58px] 
          rounded-[3px] xl:rounded-[4px] 2xl:rounded-[5px] 3xl:rounded-[6px] 
          text-[9.5px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px]"
            onClick={() => {
              navigate("/user/profile");
            }}
          >
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditMail;
