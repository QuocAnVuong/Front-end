import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { LoginContext, UserContext } from "../../context/ContextProvider";
import MenuItem from "../../components/MenuItem/MenuItem";

export const ActiveContext = createContext(null);

function UserMainPage() {
  const { user, setUser } = useContext(UserContext);
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const [loading, setLoading] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState("Profile");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const response = await fetch("http://localhost:3000/init", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        setLoading(true);
        const data = await response.json();
        if (data.message === null || data.message !== "Token not found") {
          setUser(data);
          setIsLogin(true);
        }
        setLoading(false);
      } catch (error) {
        console.error("There was a problem fetching the mock data:", error);
      }
    };
    if (!isLogin) {
      fetchMockData();
    } else {
      setLoading(false);
    }
  }, [setUser, setIsLogin, isLogin, user]);

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };
  useEffect(() => {
    console.log(user);
  }, [user]);
  const fetchLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("There was a problem fetching the mock data:", error);
    }
  };
  const handleLogout = async () => {
    const data = await fetchLogout();
    if (data.message) {
      setIsLogin(false);
      setUser(null);
      navigate("/");
    }
  };

  return (
    <ActiveContext.Provider value={{ activeMenuItem, setActiveMenuItem }}>
      {loading ? (
        <div>...Loading</div>
      ) : (
        <div className="h-screen flex flex-col">
          <NavBar />
          <div className="flex-grow flex">
            <div
              className="h-full bg-[#E4C59E] border-t flex flex-col border-black 
            px-[13px] xl:px-[16px] 2xl:px-[19.5px] 3xl:px-[25px] 
            py-[10.5px] xl:py-[13px] 2xl:py-[15.5px] 3xl:py-[20px] 
            w-[177px] xl:w-[222px] 2xl:w-[266.5px] 3xl:w-[340px]"
            >
              <div
                className="flex 
              mb-[31px] xl:mb-[39px] 2xl:mb-[47px] 3xl:mb-[60px]"
              >
                <img
                  src={user.ProfileImg}
                  alt=""
                  className="w-[26px] xl:w-[32.5px] 2xl:w-[39px] 3xl:w-[50px] 
                    h-[26px] xl:h-[32.5px] 2xl:h-[39px] 3xl:h-[50px] 
                    mr-[8px] xl:mr-[9.5px] 2xl:mr-[11.5px] 3xl:mr-[15px] 
                    rounded-full"
                />
                <div className="truncate">
                  <p
                    className="font-medium 
                  text-[12.5px] xl:text-[15.5px] 2xl:text-[19px] 3xl:text-[24px]"
                  >
                    {user.Username}
                  </p>
                  <p
                    className="font-extralight 
                  text-[8px] xl:text-[10.5px] 2xl:text-[12.5px] 3xl:text-[16px]"
                  >
                    {user.Email}
                  </p>
                </div>
              </div>
              <div className="flex-grow">
                <div
                  className="flex flex-col 
                gap-y-[8px] xl:gap-y-[9.5px] 2xl:gap-y-[11.5px] 3xl:gap-y-[15px]"
                >
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
              <div
                className="w-full flex items-center hover:bg-[#803D3B] 
                h-[30px] xl:h-[38px] 2xl:h-[45.5px] 3xl:h-[58px] 
                rounded-[3px] xl:rounded-[4px] 2xl:rounded-[5px] 3xl:rounded-[6px] 
                pl-[23px] xl:pl-[28px] 2xl:pl-[34.5px] 3xl:pl-[44px]"
                onClick={handleLogout}
              >
                Log out
              </div>
            </div>
            <Outlet setActiveMenuItem={setActiveMenuItem} />
          </div>
        </div>
      )}
    </ActiveContext.Provider>
  );
}

export default UserMainPage;
