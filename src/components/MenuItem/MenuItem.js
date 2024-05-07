import React from "react";
import { Link } from "react-router-dom";

function MenuItem(props) {
  return (
    <Link to={props.link}>
      <div
        className="w-full h-[58px] flex items-center pl-[44px] relative transition-all group"
        onClick={props.handleClick}
      >
        <span
          className={`absolute inset-y-0 left-0 w-[20px] ${
            props.isActive ? "bg-[#803D3B]" : "group-hover:bg-[#803D3B]"
          } rounded-l-[6px]`}
        />
        <span
          className={`absolute inset-y-0 left-[20px] w-[270px] ${
            props.isActive ? "bg-[#AF8260]" : "group-hover:bg-[#803D3B]"
          } rounded-r-[6px]`}
        />
        <p className="z-10 text-[18px]">{props.content}</p>
      </div>
    </Link>
  );
}

export default MenuItem;
