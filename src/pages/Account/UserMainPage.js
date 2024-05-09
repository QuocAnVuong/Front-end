import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
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
            <div className="w-[340px] h-full bg-[#E4C59E] border-t border-black px-[25px] py-[20px] flex flex-col">
              <div className="flex mb-[60px]">
                <img
                  src={user.ProfileImg}
                  alt=""
                  className="w-[50px] h-[50px] mr-[15px] rounded-full"
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
              <div
                className="w-full h-[58px] flex items-center pl-[44px] hover:bg-[#803D3B] rounded-[6px]"
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
