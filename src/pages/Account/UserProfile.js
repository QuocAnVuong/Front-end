import React, { useContext } from "react";
import { UserContext } from "../../context/ContextProvider";
import { Link } from "react-router-dom";

function UserProfile() {
  const { user } = useContext(UserContext);
  return (
    <div className=" flex flex-col flex-grow items-center justify-center px-[226px] gap-y-[30px]">
      <div className="border border-[#322C2B] w-full rounded-[20px] px-[25px] py-[30px]">
        <p className="font-bold text-[56px] mb-[40px]">Basic Information</p>
        <div className="flex flex-col gap-y-[40px]">
          <div className="flex text-[32px] items-center">
            <p className="mr-[40px]">
              Profile picture:&nbsp;&nbsp;&nbsp;&nbsp;A profile picture helps
              personalize your account
            </p>
            <img
              src="/img/profile.png"
              alt=""
              className="w-[100px] h-[100px] rounded-full"
            />
          </div>
          <div className="flex text-[32px] items-center">
            <p className="mr-[40px]">
              Name:
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;{user.FirstName} {user.LastName}
            </p>
            <Link to={"/user/edit-name"}>
              <img src="/img/edit.png" alt="" className="w-[40px] h-[40px]" />
            </Link>
          </div>
          <div className="flex text-[32px] items-center">
            <p className="mr-[40px]">
              Username:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {user.Username}
            </p>
            <img src="/img/edit.png" alt="" className="w-[40px] h-[40px]" />
          </div>
        </div>
      </div>
      <div className="border border-[#322C2B] w-full rounded-[20px] px-[25px] py-[30px]">
        <p className="font-bold text-[56px] mb-[40px]">Contact Information</p>
        <div className="flex text-[32px] items-center">
          <p className="mr-[40px]">
            Email:
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;{user.Email}
          </p>
          <Link to={"/user/edit-mail"}>
            <img src="/img/edit.png" alt="" className="w-[40px] h-[40px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
