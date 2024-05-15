import React, { useContext } from "react";
import { UserContext } from "../../context/ContextProvider";
import { Link } from "react-router-dom";

function UserProfile() {
  const { user } = useContext(UserContext);
  return (
    <div
      className=" flex flex-col flex-grow items-center justify-center 
    px-[118px] xl:px-[147.5px] 2xl:px-[177px] 3xl:px-[226px] 
    gap-y-[15.5px] xl:gap-y-[19.5px] 2xl:gap-y-[23.5px] 3xl:gap-y-[30px]"
    >
      <div
        className="border border-[#322C2B] w-full 
      rounded-[10.5px] xl:rounded-[13px] 2xl:rounded-[15.5px] 3xl:rounded-[20px]  
      px-[13px] xl:px-[16px] 2xl:px-[19.5px] 3xl:px-[25px] 
      py-[15.5px] xl:py-[19.5px] 2xl:py-[23.5px] 3xl:py-[30px]"
      >
        <p
          className="font-bold 
        text-[29px] xl:text-[36.5px] 2xl:text-[44px] 3xl:text-[56px] 
        mb-[21px] xl:mb-[26px] 2xl:mb-[31px] 3xl:mb-[40px]"
        >
          Basic Information
        </p>
        <div
          className="flex flex-col 
        gap-y-[21px] xl:gap-y-[26px] 2xl:gap-y-[31px] 3xl:gap-y-[40px]"
        >
          <div
            className="flex items-center 
          text-[16.5px] xl:text-[21px] 2xl:text-[25px] 3xl:text-[32px]"
          >
            <p className="mr-[21px] xl:mr-[26px] 2xl:mr-[31px] 3xl:mr-[40px]">
              Profile picture:&nbsp;&nbsp;&nbsp;&nbsp;A profile picture helps
              personalize your account
            </p>
            <Link to={"/user/edit-image"}>
              <img
                src={user.ProfileImg}
                alt=""
                className="
                w-[52px] xl:w-[65px] 2xl:w-[78px] 3xl:w-[100px] 
                h-[52px] xl:h-[65px] 2xl:h-[78px] 3xl:h-[100px] 
                rounded-full"
              />
            </Link>
          </div>
          <div
            className="flex items-center
          text-[16.5px] xl:text-[21px] 2xl:text-[25px] 3xl:text-[32px]"
          >
            <p className="mr-[21px] xl:mr-[26px] 2xl:mr-[31px] 3xl:mr-[40px]">
              Name:
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;{user.FirstName} {user.LastName}
            </p>
            <Link to={"/user/edit-name"}>
              <img
                src="/img/edit.png"
                alt=""
                className="w-[21px] xl:w-[26px] 2xl:w-[31px] 3xl:w-[40px] 
              h-[21px] xl:h-[26px] 2xl:h-[31px] 3xl:h-[40px]"
              />
            </Link>
          </div>
          <div
            className="flex items-center 
          text-[16.5px] xl:text-[21px] 2xl:text-[25px] 3xl:text-[32px]"
          >
            <p className="mr-[21px] xl:mr-[26px] 2xl:mr-[31px] 3xl:mr-[40px]">
              Username:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {user.Username}
            </p>
            <img
              src="/img/edit.png"
              alt=""
              className="w-[21px] xl:w-[26px] 2xl:w-[31px] 3xl:w-[40px] 
              h-[21px] xl:h-[26px] 2xl:h-[31px] 3xl:h-[40px]"
            />
          </div>
        </div>
      </div>
      <div
        className="border border-[#322C2B] w-full 
      rounded-[10.5px] xl:rounded-[13px] 2xl:rounded-[15.5px] 3xl:rounded-[20px]  
      px-[13px] xl:px-[16px] 2xl:px-[19.5px] 3xl:px-[25px] 
      py-[15.5px] xl:py-[19.5px] 2xl:py-[23.5px] 3xl:py-[30px]"
      >
        <p
          className="font-bold 
        text-[29px] xl:text-[36.5px] 2xl:text-[44px] 3xl:text-[56px] 
        mb-[21px] xl:mb-[26px] 2xl:mb-[31px] 3xl:mb-[40px]"
        >
          Contact Information
        </p>
        <div
          className="flex items-center 
        text-[16.5px] xl:text-[21px] 2xl:text-[25px] 3xl:text-[32px]"
        >
          <p className="mr-[21px] xl:mr-[26px] 2xl:mr-[31px] 3xl:mr-[40px]">
            Email:
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;{user.Email}
          </p>
          <Link to={"/user/edit-mail"}>
            <img
              src="/img/edit.png"
              alt=""
              className="w-[21px] xl:w-[26px] 2xl:w-[31px] 3xl:w-[40px] 
              h-[21px] xl:h-[26px] 2xl:h-[31px] 3xl:h-[40px]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
