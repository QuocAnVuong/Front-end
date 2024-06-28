import React, { useEffect, useState } from "react";
import DishTag from "../../components/DishTag/DishTag";

function LikedArticle() {
  const [menu, setMenu] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [number, setNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberArr, setNumberArr] = useState([1, 2, 3, 4]);
  const [displayMenu, setDisplayMenu] = useState([]);

  //Fetch Data
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(
          "https://progexbackend.onrender.com/user/get-liked-article",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", 
          }
        );
        setLoading(true);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLoading(false);
        console.log(data);
        setMenu(data);
      } catch (error) {
        console.error("There was a problem fetching the mock data:", error);
      }
    };

    fetchMenuData();
  }, []);

  //Set Number
  useEffect(() => {
    setNumber(menu.length);
  }, [menu]);

  //Set Number Array on Current Page
  useEffect(() => {
    let maxPage = Math.ceil(number / 8); // Calculate the maximum number of pages
    if (maxPage === 0) {
      maxPage = 1; // If there are no items, default to 1 page
    }

    setNumberArr(() => {
      const newNumberArr = [];
      let startPage = 1;
      if (maxPage > 3 && currentPage < maxPage - 3) {
        startPage = currentPage;
      } else if (maxPage > 3) {
        startPage = maxPage - 3;
      }

      for (let i = startPage; i <= Math.min(startPage + 3, maxPage); i++) {
        newNumberArr.push(i);
      }
      return newNumberArr;
    });
  }, [currentPage, number]);

  //Change display Menu on current Page
  useEffect(() => {
    let maxPage = Math.ceil(number / 8); // Calculate the maximum number of pages
    if (maxPage === 0) {
      maxPage = 1; // If there are no items, default to 1 page
    }
    let newDisplayMenu = [];
    const startingIndex = (currentPage - 1) * 8;
    if (currentPage < maxPage) {
      newDisplayMenu = menu.slice(startingIndex, startingIndex + 8);
    } else {
      newDisplayMenu = menu.slice(startingIndex);
    }
    setDisplayMenu(newDisplayMenu);
  }, [currentPage, menu, number]);

  const onVectorClick = (id) => {
    if (id === "left") {
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      }
    } else {
      let maxPage = number / 8;
      if (number % 8 !== 0) {
        maxPage += 1;
      }
      if (currentPage !== maxPage) {
        setCurrentPage(currentPage + 1);
      }
    }
  };
  const onNumberClick = (value) => {
    setCurrentPage(value);
  };

  return (
    <div
      className="flex flex-col flex-grow items-center justify-center 
    px-[118px] xl:px-[147.5px] 2xl:px-[177px] 3xl:px-[226px]"
    >
      <div
        className="font-bold 
        text-[33.5px] xl:text-[42px] 2xl:text-[50px] 3xl:text-[64px] 
        mt-[10.5px] xl:mt-[13px] 2xl:mt-[15.5px] 3xl:mt-[20px] 
        mb-[30px] xl:mb-[37px] 2xl:mb-[44.5px] 3xl:mb-[57px]"
      >
        Your Liked Articles {`(${number})`}
      </div>
      <div
        className="grid grid-cols-4 
        gap-y-[13px] xl:gap-y-[16px] 2xl:gap-y-[19.5px] 3xl:gap-y-[25px] 
        gap-x-[13px] xl:gap-x-[16px] 2xl:gap-x-[19.5px] 3xl:gap-x-[25px]
        pb-[50px] xl:pb-[38px] 2xl:pb-[45.5px] 3xl:pb-[58px]"
      >
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          displayMenu.map((dish, id) => <DishTag dish={dish} key={id} />)
        )}
      </div>
      <div
        className="flex items-center justify-center 
        mb-[10.5px] xl:mb-[13px] 2xl:mb-[15.5px] 3xl:mb-[20px]"
      >
        <img
          src={require("../../img/Vector-left.png")}
          alt=""
          className="cursor-pointer"
          id="left"
          onClick={(e) => onVectorClick(e.target.id)}
        />

        {numberArr.map((page, id) => (
          <div
            id={page}
            key={id}
            className={`${
              page !== currentPage
                ? "border-[#803D3B] text-[#803D3B]"
                : "border-[#343D42] text-[#343D42]"
            } 
              text-[8px] xl:text-[10.5px] 2xl:text-[12.5px] 3xl:text-[16px] 
              font-normal border  
              ml-[5px] xl:ml-[6.5px] 2xl:ml-[8px] 3xl:ml-[10px] 
              w-[16.5px] xl:w-[21px] 2xl:w-[25px] 3xl:w-[32px] 
              h-[16.5px] xl:h-[21px] 2xl:h-[25px] 3xl:h-[32px] 
              flex items-center justify-center rounded-full 
              `}
            onClick={() => onNumberClick(page)}
          >
            <span>{page}</span>
          </div>
        ))}

        <img
          src={require("../../img/Vector-right.png")}
          alt=""
          id="right"
          className="ml-[5px] xl:ml-[6.5px] 2xl:ml-[8px] 3xl:ml-[10px] 
            cursor-pointer"
          onClick={(e) => onVectorClick(e.target.id)}
        />
      </div>
    </div>
  );
}

export default LikedArticle;
