import React from "react";
import "./NavBar.css";

function NavBar() {
  return (
    //lg: 1023 xl: 1279 2xl: 1535
    <div className="lg:px-[135px] xl:px-[169px] 2xl:px-[203px] 3xl:px-[260px] lg:h-[69px] xl:h-[86px] 2xl:h-[103px] 3xl:h-[132px] nav-bar-img">
      <div className="lg:px[37.5px] xl:px-[47px] 2xl:px-[56px] 3xl:px-[72px] w-auto  grid grid-cols-3 items-center lg:gap-x-[101px] xl:gap-x-[127px] 2xl:gap-x-[152px] 3xl:gap-x-[195px]">
        <div className="w-auto h-auto">
          <div className="lg:w-[96.5px] xl:w-[120px] 2xl:w-[145px] 3xl:w-[185px] lg:h-[71px] xl:h-[89px] 2xl:h-[106.5px] 3xl:h-[136px]">
            <img src={require("../../img/Logo=Logo4.png")} alt="" />
          </div>
        </div>

        <div className="w-auto h-auto flex place-content-around items-center">
          <p>Home</p>
          <p>About</p>
        </div>

        <div className="w-auto h-auto">
          <button className="bg-white lg:w-[60.5px] xl:w-[75.6px] 2xl:w-[91px] 3xl:w-[116px] lg:h-[26px] xl:h-[32px] 2xl:h-[39px] 3xl:h-[50px] text-black font-medium lg:text-[9px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[18px] rounded-md">
            Login
          </button>
          <button className="bg-black lg:w-[60.5px] xl:w-[75.6px] 2xl:w-[91px] 3xl:w-[116px] lg:h-[26px] xl:h-[32px] 2xl:h-[39px] 3xl:h-[50px] text-white font-medium lg:text-[9px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[18px] ml-6 rounded-md">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
