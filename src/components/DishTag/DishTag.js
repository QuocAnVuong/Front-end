import React from "react";
import { Link } from "react-router-dom";

function DishTag({ dish }) {
  return (
    <Link
      className="border-[3px] border-[#803D3B] 
      rounded-[10.5px] xl:rounded-[13px] 2xl:rounded-[15.5px] 3xl:rounded-[20px] 
      w-[145px] xl:w-[181px] 2xl:w-[217px] 3xl:w-[277px] 
      h-[172.5px] xl:h-[215.5px] 2xl:h-[258.5px] 3xl:h-[330px]
      p-[10.5px] xl:p-[13px] 2xl:p-[15.5px] 3xl:p-[20px] 
      flex flex-col justify-between
    "
      to={`/search-result/${dish.ArticleID}`}
    >
      <img src={dish.Image} alt="" className="w-full h-auto rounded-[8px]" />
      <div className="w-full h-auto">
        <p
          className="text-[#404040] truncate
        text-[12.5px] xl:text-[15.5px] 2xl:text-[19px] 3xl:text-[24px] 
        font-semibold"
        >
          {dish.Title}
        </p>
        <p
          className="text-[#404040] 
          text-[6px] xl:text-[8px] 2xl:text-[9.5px] 3xl:text-[12px] 
        font-medium"
        >
          Cook time: {dish.Duration} minutes
        </p>
        <p
          className="text-[#404040] 
          text-[6px] xl:text-[8px] 2xl:text-[9.5px] 3xl:text-[12px] 
        font-medium"
        >
          Serving: {dish.Serving}
        </p>
      </div>
    </Link>
  );
}

export default DishTag;
