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
      const response = await fetch("http://localhost:3000/user/update-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    <div className="flex flex-col flex-grow items-center justify-center px-[226px]">
      <form onSubmit={handleSubmit}>
        <div className="w-[660px] border border-[#322C2B] rounded-[20px] px-[20px] py-[30px] gap-y-[40px] mb-[30px]">
          <p className="text-[24px] text-red-700">{formErrors.message}</p>
          <p className="font-bold text-[56px]">Email</p>
          <div className="mb-[30px] font-medium text-[24px]">
            <p className="mb-[12px]">Email*</p>
            <input
              type="text"
              id="Email"
              name="Email"
              value={formValues.Email}
              onChange={handleChange}
              className="w-full h-[60px] border-[2.5px] p-[20px] rounded-[8px]
              border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none"
            />
            <p className="font-medium text-[20px] text-red-700 mb-[30px]">
              {formErrors.email}
            </p>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <button className="w-[147px] h-[58px] bg-[#322C2B] rounded-[6px] flex items-center justify-center text-white text-[18px] mr-[30px]">
            Save
          </button>
          <div className="w-[147px] h-[58px] bg-[#CECECE] rounded-[6px] flex items-center justify-center text-[#586166] text-[18px]">
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditMail;
