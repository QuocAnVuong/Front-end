import React from "react";
import { Link } from "react-router-dom";

function MenuItem(props) {
  return (
    <Link to={props.link}>
      <div
        className="w-full flex items-center relative transition-all group 
        h-[30px] xl:h-[38px] 2xl:h-[45.5px] 3xl:h-[58px] 
        pl-[23px] xl:pl-[28px] 2xl:pl-[34.5px] 3xl:pl-[44px]"
        onClick={props.handleClick}
      >
        <span
          className={`absolute inset-y-0 left-0 
          w-[10.5px] xl:w-[13px] 2xl:w-[15.5px] 3xl:w-[20px] 
          rounded-l-[3px] xl:rounded-l-[4px] 2xl:rounded-l-[5px] 3xl:rounded-l-[6px]
          ${props.isActive ? "bg-[#803D3B]" : "group-hover:bg-[#803D3B]"}`}
        />
        <span
          className={`absolute inset-y-0 
          left-[10.5px] xl:left-[13px] 2xl:left-[15.5px] 3xl:left-[20px] 
          w-[141px] xl:w-[176px] 2xl:w-[211.5px] 3xl:w-[270px] 
          rounded-r-[3px] xl:rounded-r-[4px] 2xl:rounded-r-[5px] 3xl:rounded-r-[6px] 
          ${props.isActive ? "bg-[#AF8260]" : "group-hover:bg-[#803D3B]"}`}
        />
        <p
          className="z-10 
        text-[9.5px] xl:text-[11.5px] 2xl:text-[14px] 3xl:text-[18px]"
        >
          {props.content}
        </p>
      </div>
    </Link>
  );
}

export default MenuItem;
