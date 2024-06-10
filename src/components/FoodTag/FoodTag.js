import React from "react";

function FoodTag({ value, id, handleDelete }) {
  return (
    <div
      className="flex items-center justify-center text-ellipsis overflow-hidden
      w-[116px] xl:w-[145px] 2xl:w-[174px] 3xl:w-[222px] 
      h-[31px] xl:h-[39px] 2xl:h-[47px] 3xl:h-[60px] 
      bg-[#AF8260] relative 
      pr-[31px] xl:pr-[39px] 2xl:pr-[47px] 3xl:pr-[60px] 
      border border-[#000] 
      rounded-[15.5px] xl:rounded-[19.5px] 2xl:rounded-[23.5px] 3xl:rounded-[30px] 
      mb-[29px] xl:mb-[36.5px] 2xl:mb-[44px] 3xl:mb-[56px]
        "
    >
      <div className="w-[75px] xl:w-[96px] 2xl:w-[117px] 3xl:w-[152px]">
        <p
          className="font-bold truncate
      text-[15.5px] xl:text-[19.5px] 2xl:text-[23.5px] 3xl:text-[30px] 
      text-white text-center"
        >
          {value}
        </p>
      </div>

      <img
        src={require("../../img/Minus.png")}
        alt=""
        className="absolute top-0 right-0
        h-[31px] xl:h-[39px] 2xl:h-[47px] 3xl:h-auto 
        w-[31px] xl:w-[39px] 2xl:w-[47px] 3xl:w-auto 
        "
        onClick={(e) => handleDelete(id)}
      />
    </div>
  );
}

export default FoodTag;
