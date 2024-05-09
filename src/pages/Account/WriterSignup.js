import React, { useContext, useState } from "react";
import { UserContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { ActiveContext } from "./UserMainPage";

function WriterSignup() {
  const { setActiveMenuItem } = useContext(ActiveContext);
  const { user, setUser } = useContext(UserContext);
  const initialValues = {
    BankNumber: "",
    BankName: "",
    AccountHolder: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const fetchMockData = async () => {
    try {
      console.log(formValues);
      const response = await fetch("http://localhost:3000/writer/add-writer", {
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
    if (!data.success) {
      const error = {};
      error.banknumber = data.error;
      setFormErrors(error);
    }
    if (data.message) {
      const newUser = user;
      newUser.isWriter = true;
      setUser(newUser);
      setActiveMenuItem("Profile");
      navigate("/user/profile");
    }
  };

  return (
    <div className="flex flex-col flex-grow items-center justify-center px-[226px]">
      <form onSubmit={handleSubmit}>
        <div className="w-[660px] border border-[#322C2B] rounded-[20px] px-[20px] py-[30px] gap-y-[40px] mb-[30px]">
          <p className="text-[24px] text-red-700">{formErrors.message}</p>
          <p className="font-bold text-[56px]">
            Add a personal checking account
          </p>
          <div className="mb-[30px] font-medium text-[24px]">
            <p className="mb-[12px]">Bank name*</p>
            <input
              type="text"
              id="BankName"
              name="BankName"
              value={formValues.BankName}
              onChange={handleChange}
              className="w-full h-[60px] border-[2.5px] p-[20px] rounded-[8px]
              border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none"
            />
            <p className="font-medium text-[20px] text-red-700 mb-[30px]">
              {formErrors.bankname}
            </p>
          </div>
          <div className="mb-[30px] font-medium text-[24px]">
            <p className="mb-[12px]">Bank Number*</p>
            <input
              type="text"
              id="BankNumber"
              name="BankNumber"
              value={formValues.BankNumber}
              onChange={handleChange}
              className="w-full h-[60px] border-[2.5px] p-[20px] rounded-[8px]
              border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none"
            />
            <p className="font-medium text-[20px] text-red-700 mb-[30px]">
              {formErrors.banknumber}
            </p>
          </div>
          <div className="mb-[30px] font-medium text-[24px]">
            <p className="mb-[12px]">Account holder*</p>
            <input
              type="text"
              id="AccountHolder"
              name="AccountHolder"
              value={formValues.AccountHolder}
              onChange={handleChange}
              className="w-full h-[60px] border-[2.5px] p-[20px] rounded-[8px]
              border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none"
            />
            <p className="font-medium text-[20px] text-red-700 mb-[30px]">
              {formErrors.accountholder}
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
              setActiveMenuItem("Profile");
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

export default WriterSignup;
