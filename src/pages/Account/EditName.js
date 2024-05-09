import React, { useContext, useState } from "react";
import { UserContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

function EditName() {
  const { user, setUser } = useContext(UserContext);
  const initialValues = {
    FirstName: "",
    LastName: "",
    Email: user.Email,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const fetchMockData = async () => {
    try {
      console.log(formValues);
      const response = await fetch("http://localhost:3000/user/update-info", {
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
    if (data.validationErrors !== undefined) {
      const errorList = data.validationErrors;
      console.log(errorList);
      const errors = {};
      for (let i = 0; i < errorList.length; i++) {
        const error = errorList[i];
        switch (error.path) {
          case "FirstName":
            if (!errors.firstname) {
              errors.firstname = error.msg;
            }
            console.log("FirstName path");
            console.log(error.msg);
            break;
          case "LastName":
            if (!errors.lastname) {
              errors.lastname = error.msg;
            }
            console.log("LastName path");
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
        console.log("No Message");
        const newUser = user;
        newUser.FirstName = formValues.FirstName;
        newUser.LastName = formValues.LastName;
        setUser(newUser);
        navigate("/user/profile");
      } else {
        console.log("Something went wrong");
        const error = {};
        error.message = "Something went wrong";
        setFormErrors(error);
      }
    }
  };

  return (
    <div className="flex flex-col flex-grow items-center justify-center px-[226px]">
      <form onSubmit={handleSubmit}>
        <div className="w-[660px] border border-[#322C2B] rounded-[20px] px-[20px] py-[30px] gap-y-[40px] mb-[30px]">
          <p className="text-[24px] text-red-700">{formErrors.message}</p>
          <p className="font-bold text-[56px]">Name</p>

          <div className="mb-[30px] font-medium text-[24px]">
            <p className="mb-[12px]">First Name*</p>
            <input
              type="text"
              id="FirstName"
              name="FirstName"
              value={formValues.FirstName}
              onChange={handleChange}
              className="w-full h-[60px] border-[2.5px] p-[20px] rounded-[8px]
              border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none"
            />
            <p className="font-medium text-[20px] text-red-700 mb-[30px]">
              {formErrors.firstname}
            </p>
          </div>
          <div className="mb-[30px] font-medium text-[24px]">
            <p className="mb-[12px]">Last Name*</p>
            <input
              type="text"
              id="LastName"
              name="LastName"
              value={formValues.LastName}
              onChange={handleChange}
              className="w-full h-[60px] border-[2.5px] p-[20px] rounded-[8px]
              border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none"
            />
            <p className="font-medium text-[20px] text-red-700 mb-[30px]">
              {formErrors.lastname}
            </p>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <button className="w-[147px] h-[58px] bg-[#322C2B] rounded-[6px] flex items-center justify-center text-white text-[18px] mr-[30px]">
            Save
          </button>
          <div
            className="w-[147px] h-[58px] bg-[#CECECE] rounded-[6px] flex items-center justify-center text-[#586166] text-[18px]"
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

export default EditName;
