import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import {
  LoginContext,
  LoginPageContext,
  UserContext,
} from "../../context/ContextProvider";

function NavBar() {
  const { duringLogin, setDuringLogin } = useContext(LoginPageContext);
  const { isLogin } = useContext(LoginContext);
  const { user } = useContext(UserContext);
  return (
    //lg: 1023 xl: 1279 2xl: 1535
    <div
      className="px-[135px] xl:px-[169px] 2xl:px-[203px] 3xl:px-[260px] 
    h-[69px] xl:h-[86px] 2xl:h-[103px] 3xl:h-[132px] 
    border-b border-black
    nav-bar-img"
    >
      <div
        className="px[37.5px] xl:px-[47px] 2xl:px-[56px] 3xl:px-[72px] 
      w-auto  flex items-center justify-between"
      >
        <Link
          to={"/"}
          onClick={() => {
            setDuringLogin(false);
          }}
          className="w-auto h-auto cursor-pointer"
        >
          <div
            className="
          w-[96.5px] xl:w-[120px] 2xl:w-[145px] 3xl:w-[185px] 
          h-[71px] xl:h-[89px] 2xl:h-[106.5px] 3xl:h-[136px]"
          >
            <img src={require("../../img/Logo=Logo4.png")} alt="" />
          </div>
        </Link>

        <div
          className="flex items-center justify-end 
            w-[230px] xl:w-[288px] 2xl:w-[345.5px] 3xl:w-[441px]
            gap-x-[46px] xl:gap-x-[57.5px] 2xl:gap-x-[69px] 3xl:gap-x-[88px]"
        >
          <Link
            to={"/"}
            className="cursor-pointer"
            onClick={() => {
              setDuringLogin(false);
            }}
          >
            Home
          </Link>
          <p className="cursor-pointer">About</p>
        </div>
        {duringLogin ? null : isLogin ? (
          <Link to={"/user/profile"}>
            <img
              src={user.ProfileImg}
              alt=""
              className="w-[50px] h-[50px] rounded-full"
            />
          </Link>
        ) : (
          <div className="w-auto h-auto">
            <Link
              to={"/login"}
              onClick={() => {
                setDuringLogin(true);
              }}
            >
              <button
                className="bg-white 
          w-[60.5px] xl:w-[75.6px] 2xl:w-[91px] 3xl:w-[116px] 
          h-[26px] xl:h-[32px] 2xl:h-[39px] 3xl:h-[50px] 
          text-black font-medium 
          text-[9px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[18px] 
          rounded-md cursor-pointer"
              >
                Login
              </button>
            </Link>
            <Link
              to={"/register"}
              onClick={() => {
                setDuringLogin(true);
              }}
            >
              <button
                className="bg-black 
          w-[60.5px] xl:w-[75.6px] 2xl:w-[91px] 3xl:w-[116px] 
          h-[26px] xl:h-[32px] 2xl:h-[39px] 3xl:h-[50px] text-white font-medium 
          text-[9px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[18px] 
          ml-6 rounded-md cursor-pointer"
              >
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
