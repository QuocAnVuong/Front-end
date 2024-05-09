import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LoginContext,
  LoginPageContext,
  UserContext,
} from "../../context/ContextProvider";

function Landing() {
  const { setDuringLogin } = useContext(LoginPageContext);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const { isLogin, setIsLogin } = useContext(LoginContext);

  //Fetch Data
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

  return (
    <div className="min-w-screen min-h-screen">
      <img
        src="img/Landing-page.png"
        alt=""
        className="w-full h-full fixed top-0 left-0 -z-10"
      />
      <p
        className="font-bold text-white text-center 
      text-[37px] xl:text-[47px] 2xl:text-[56px] 3xl:text-[72px] 
      pt-[21px] xl:pt-[26px] 2xl:pt-[31px] 3xl:pt-[40px]"
      >
        My Fridge
      </p>
      <p
        className="font-medium text-[#322C2B] text-center
      text-[17px] xl:text-[22px] 2xl:text-[26.5px] 3xl:text-[34px]
      mt-[10.5px] xl:mt-[13px] 2xl:mt-[15.5px] 3xl:mt-[20px]"
      >
        Start cooking with what you have, effortlessly. Try My Fridge today
      </p>
      <div className="w-full flex items-center justify-center">
        {loading ? (
          <div> Loading ...</div>
        ) : (
          <div
            className="bg-white border-none
        w-[895px] xl:w-[1118.5px] 2xl:w-[1342.5px] 3xl:w-[1713px] 
        rounded-t-[61.5px] xl:rounded-t-[77px] 2xl:rounded-t-[92.5px] 3xl:rounded-t-[118px] 
        px-[73px] xl:px-[91.5px] 2xl:px-[110px] 3xl:px-[140px]"
          >
            <div
              className="flex justify-between items-center 
          px-[37px] xl:px-[47px] 2xl:px-[56px] 3xl:px-[72px] 
          mb-[23px] xl:mb-[29px] 2xl:mb-[34.5px] 3xl:mb-[44px]
          text-[8px] xl:text-[10.5px] 2xl:text-[12.5px] 3xl:text-[16px]
          "
            >
              <img
                src="img/Logo.png"
                alt=""
                className="cursor-pointer
            w-[96.5px] xl:w-[121px] 2xl:w-[145px] 3xl:w-[185px]
            h-[71px] xl:h-[89px] 2xl:h-[106.5px] 3xl:h-[136px]
            "
              />
              <div
                className="flex items-center justify-end 
            w-[230px] xl:w-[288px] 2xl:w-[345.5px] 3xl:w-[441px]
            gap-x-[46px] xl:gap-x-[57.5px] 2xl:gap-x-[69px] 3xl:gap-x-[88px]"
              >
                <p className="cursor-pointer">Home</p>
                <p className="cursor-pointer">About</p>
              </div>
              {isLogin ? (
                <Link to={"/user/profile"}>
                  <img
                    src={user.ProfileImg}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full cursor-pointer"
                  />
                </Link>
              ) : (
                <div className="flex items-center">
                  <Link
                    to={"/login"}
                    onClick={() => {
                      setDuringLogin(true);
                    }}
                    className="flex justify-center items-center border-none bg-white cursor-pointer
              w-[60.5px] xl:w-[75.5px] 2xl:w-[91px] 3xl:w-[116px] 
              h-[26px] xl:h-[32.5px] 2xl:h-[39px] 3xl:h-[50px] 
              mr-[12.5px] xl:mr-[15.5px] 2xl:mr-[19px] 3xl:mr-[24px] 
              rounded-[3px] xl:rounded-[4px] 2xl:rounded-[5px] 3xl:rounded-[6px]"
                  >
                    Login
                  </Link>
                  <Link
                    to={"/register"}
                    onClick={() => {
                      setDuringLogin(true);
                    }}
                    className="text-white flex justify-center items-center border-none bg-[#322C2B] cursor-pointer
              w-[60.5px] xl:w-[75.5px] 2xl:w-[91px] 3xl:w-[116px] 
              h-[26px] xl:h-[32.5px] 2xl:h-[39px] 3xl:h-[50px] 
              rounded-[3px] xl:rounded-[4px] 2xl:rounded-[5px] 3xl:rounded-[6px]"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
            <div className="flex relative justify-between items-center">
              <div>
                <p
                  className="text-[#322C2B] font-bold whitespace-normal 
              w-[323px] xl:w-[404px] 2xl:w-[485px] 3xl:w-[619px] 
              text-[30px] xl:text-[36.5px] 2xl:text-[44px] 3xl:text-[56px] 
              pb-[26px] xl:pb-[32.5px] 2xl:pb-[39px] 3xl:pb-[50px]"
                >
                  Discover Your Culinary Potential with My Fridge!
                </p>
                <p
                  className="text-[#322C2B] font-medium whitespace-normal 
              w-[323px] xl:w-[404px] 2xl:w-[485px] 3xl:w-[619px] 
              text-[14.5px] xl:text-[18px] 2xl:text-[22px] 3xl:text-[28px] 
              mb-[22px] xl:mb-[27.5px] 2xl:mb-[33px] 3xl:mb-[42px]"
                >
                  Simply input the ingredients lingering in your fridge, and let
                  us do the rest. Our innovative platform instantly generates
                  delicious recipes tailored to your available ingredients.
                </p>
                <Link
                  to={"/search"}
                  className="bg-[#322C2B] text-white flex items-center justify-center
                w-[110px] xl:w-[137px] 2xl:w-[164.5] 3xl:w-[210px] 
                h-[30px] xl:h-[38px] 2xl:h-[45.4px] 3xl:h-[58px] 
                rounded-[3px] xl:rounded-[4px] 2xl:rounded-[5px] 3xl:rounded-[6px]
                text-[8px] xl:text-[10.5px] 2xl:text-[12.5px] 3xl:text-[16px]
                "
                >
                  Discover Now
                </Link>
                <p
                  className="font-bold text-[#322C2B] 
              text-[9.5px] xl:text-[11.5px] 2xl:text-[14px] 3xl:text-[18px] 
              mt-[15.5px] xl:mt-[19.5px] 2xl:mt-[23.5px] 3xl:mt-[30px] 
              mb-[26px] xl:mb-[32.5px] 2xl:mb-[39px] 3xl:mb-[50px]"
                >
                  Become member in our community?{" "}
                  <span className="text-[#E4C59E] cursor-pointer">Sign up</span>
                </p>
              </div>
              <div>
                <img
                  src="img/Noodle.png"
                  alt=""
                  className="relative z-10
              w-[262px] xl:w-[328px] 2xl:w-[393.5px] 3xl:w-[502px]
              h-[262px] xl:h-[328px] 2xl:h-[393.5px] 3xl:h-[502px]
              "
                />
              </div>
              <img
                src="img/Dots.png"
                alt=""
                className="absolute
              top-[17px] xl:top-[21.5px] 2xl:top-[26px] 3xl:top-[33px] 
              left-[286px] xl:left-[358px] 2xl:left-[430px] 3xl:left-[548px]
              w-[55px] xl:w-[68.5px] 2xl:w-[82px] 3xl:w-[105px]
              h-[41px] xl:h-[51px] 2xl:h-[61px] 3xl:h-[78px]

              "
              />
              <img
                src="img/Dots.png"
                alt=""
                className="absolute
              top-[136.5px] xl:top-[171px] 2xl:top-[205px] 3xl:top-[262px] 
              left-[397px] xl:left-[496px] 2xl:left-[595.5px] 3xl:left-[760px]
              w-[55px] xl:w-[68.5px] 2xl:w-[82px] 3xl:w-[105px]
              h-[41px] xl:h-[51px] 2xl:h-[61px] 3xl:h-[78px]
              "
              />
              <img
                src="img/Dots.png"
                alt=""
                className="absolute
              top-[9px] xl:top-[11px] 2xl:top-[13px] 3xl:top-[17px] 
              left-[740px] xl:left-[925px] 2xl:left-[1110.5px] 3xl:left-[1417px]
              w-[55px] xl:w-[68.5px] 2xl:w-[82px] 3xl:w-[105px]
              h-[41px] xl:h-[51px] 2xl:h-[61px] 3xl:h-[78px]
              "
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Landing;
