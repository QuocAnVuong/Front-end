import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

function PasswordRecovery() {
  const [newPassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="w-full flex items-center justify-center flex-grow">
        <div className="w-[610px]">
          <p className="text-center font-bold text-[36px] mb-[30px]">
            Password Recovery
          </p>
          <form className="mb-[30px]">
            <div className="mb-[30px]">
              <p className="font-medium text-[24px] mb-[12px]">New password</p>
              <input
                type="password"
                id="newPasword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                className="w-full h-[60px] border-[2.5px] p-[20px] rounded-[8px]
              border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none"
              />
            </div>
            <div className="mb-[30px]">
              <p className="font-medium text-[24px] mb-[12px]">
                Confirm new password
              </p>
              <input
                type="password"
                id="checkPassword"
                name="checkPassword"
                value={checkPassword}
                onChange={(e) => {
                  setCheckPassword(e.target.value);
                }}
                className="w-full h-[60px] border-[2.5px] p-[20px] rounded-[8px]
              border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none"
              />
            </div>
            <Link to={"/login"}>
              <button
                type="submit"
                className="w-full h-[58px] bg-[#322C2B] rounded-[6px] text-[18px]
                flex items-center justify-center text-white font-normal cursor-pointer
                "
              >
                Finish
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordRecovery;
