import React, { useState } from "react";

function IngredientTag({
  ingredientValue,
  id,
  handleDelete,
  onchangeQuantity,
}) {
  const [quantity, setQuantity] = useState("");
  const handleChange = (e) => {
    setQuantity(e.target.value);
    onchangeQuantity(id, e.target.value);
  };
  return (
    <div
      className="w-full flex justify-center
  h-[31px] xl:h-[39px] 2xl:h-[47px] 3xl:h-[60px]"
    >
      <div
        className="w-7/12 border-[#803D3B] bg-[#F5F5DC] border-[2.5px] h-full flex items-center justify-center
      rounded-l-[15.5px] xl:rounded-l-[19.5px] 2xl:rounded-l-[23.5px] 3xl:rounded-l-[30px] 
      "
      >
        {ingredientValue}
      </div>
      <input
        type="text"
        value={quantity}
        onChange={handleChange}
        placeholder="Type in the Quantity"
        className="w-4/12 border-[2.5px]
              border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none
              h-[31px] xl:h-[39px] 2xl:h-[47px] 3xl:h-[60px]
              p-[10.5px] xl:p-[13px] 2xl:p-[15.5px] 3xl:p-[20px] 
              rounded-r-[15.5px] xl:rounded-r-[19.5px] 2xl:rounded-r-[23.5px] 3xl:rounded-r-[30px]"
      />
      <img
        src="/img/Minus.png"
        alt=""
        className="w-auto h-auto cursor-pointer"
        onClick={(e) => handleDelete(id)}
      />
    </div>
  );
}

export default IngredientTag;
