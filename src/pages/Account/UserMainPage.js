import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { UserContext } from "../../context/ContextProvider";
import MenuItem from "../../components/MenuItem/MenuItem";

function UserMainPage() {
  const { user } = useContext(UserContext);
  const [activeMenuItem, setActiveMenuItem] = useState("Profile");

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex">
        <div className="w-[340px] h-full bg-[#E4C59E] border-t border-black px-[25px] py-[20px] flex flex-col">
          <div className="flex mb-[60px]">
            <img
              src="/img/profile.png"
              alt=""
              className="w-[50px] h-[50px] mr-[15px]"
            />
            <div className="truncate">
              <p className="font-medium text-[24px]">{user.Username}</p>
              <p className="font-extralight text-[16px]">{user.Email}</p>
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex flex-col gap-y-[15px]">
              <MenuItem
                link={"/user/profile"}
                content={"Profile"}
                isActive={activeMenuItem === "Profile"}
                handleClick={() => handleMenuItemClick("Profile")}
              />
              {!user.isWriter ? (
                <div className="font-semibold">
                  <MenuItem
                    link={"/user/writer"}
                    content={"Sign up for Writer"}
                    isActive={activeMenuItem === "Sign up for Writer"}
                    handleClick={() =>
                      handleMenuItemClick("Sign up for Writer")
                    }
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-y-[15px]">
                  <MenuItem
                    link={"/user/wallet"}
                    content={"Your wallet"}
                    isActive={activeMenuItem === "Your wallet"}
                    handleClick={() => handleMenuItemClick("Your wallet")}
                  />
                  <MenuItem
                    link={"/user/article"}
                    content={"Your article"}
                    isActive={activeMenuItem === "Your article"}
                    handleClick={() => handleMenuItemClick("Your article")}
                  />
                  <MenuItem
                    link={"/user/income"}
                    content={"Income"}
                    isActive={activeMenuItem === "Income"}
                    handleClick={() => handleMenuItemClick("Income")}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-[58px] flex items-center pl-[44px]">
            Log out
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default UserMainPage;
