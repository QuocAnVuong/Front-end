import React, { useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./SearchResult.css";
import { useState } from "react";

function SearchResult() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [flavor, setFlavor] = useState("");
  const [type, setType] = useState("");

  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const tempResult = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value.toLowerCase())
          );
        });
        setResult(tempResult);
      });
  };
  const handleSearchChange = (value) => {
    setSearch(value);
    fetchData(value);
  };
  const handleClickSearch = (value) => {
    setSearch(value);
  };
  function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
  }
  const handleFlavorChange = (value) => {
    setFlavor(value);
    selectElement("flavor", "None");
  };
  const handleTypeChange = (value) => {
    setType(value);
    selectElement("type", "None");
  };

  return (
    <div>
      <NavBar />
      <p className="font-bold text-[64px] mt-[42px] mb-[63px] text-center">
        Let's Craft Your Dish
      </p>
      <div className="grid grid-cols-2 px-[57px]">
        <div className="border-4 rounded-[20px] border-[#803D3B] w-[907px] px-[55px]">
          <p className="font-bold text-[42px] text-center mt-[53px] mb-[57px]">
            Dish Preference
          </p>
          <form>
            <div>
              <div className=" relative w-[801px] h-[73px]  flex items-center p-[14px] rounded-[20px] border border-[#000] mb-[67px]">
                <img
                  src={require("../../img/Search.png")}
                  alt=""
                  className="ml-[20px] mr-[63px]"
                />
                <input
                  type="search"
                  className="text-[34px] font-light justify-center border-none bg-transparent focus:outline-none"
                  placeholder="Add your ingredients"
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <div className="absolute top-[73px] left-[-5px] z-10 text-center w-[810px] text-[34px] bg-white opacity-100">
                  <ul>
                    {result.map((result, id) => (
                      <li
                        key={id}
                        className="border border-t-0 border-[#3f3f3] hover:bg-[#b4b1b1]"
                        onClick={(e) => {
                          setSearch(result.name);
                        }}
                      >
                        {result.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative w-[801px] h-[73px] mb-[67px]">
              <select
                name="flavor"
                id="flavor"
                className="border border-[#000] rounded-[20px] w-[803px] h-[73px] text-center text-[34px] font-light cursor-pointer pr-[4rem]"
                onChange={(e) => handleFlavorChange(e.target.value)}
              >
                <option value="None">Select your preferred flavor</option>
                <option value="spicy">Spicy</option>
                <option value="spicy">Spicy</option>
                <option value="spicy">Spicy</option>
              </select>
              <span className="block bg-white h-5/6 w-16 absolute top-1 right-1 rounded-[20px] pointer-events-none custom-arrow"></span>
            </div>
            <div className="relative w-[801px] h-[73px] mb-[67px]">
              <select
                name="type"
                id="type"
                className="border border-[#000] rounded-[20px] w-[803px] h-[73px] text-center text-[34px] font-light cursor-pointer pr-[4rem]"
                onChange={(e) => handleTypeChange(e.target.value)}
              >
                <option value="None">Choose your type of dish</option>
                <option value="chinese">Chinese</option>
                <option value="chinese">Chinese</option>
                <option value="chinese">Chinese</option>
              </select>
              <span className="block bg-white h-5/6 w-16 absolute top-1 right-1 rounded-[20px] pointer-events-none custom-arrow"></span>
            </div>
          </form>
        </div>
        <div className="border-4 rounded-[20px] border-[#803D3B] w-[907px] "></div>
      </div>
    </div>
  );
}

export default SearchResult;
