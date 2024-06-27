import React, { useEffect, useState } from "react";
//import { UserContext } from "../../context/ContextProvider";
import { Link } from "react-router-dom";

function Wallet() {
  const [loading, setLoading] = useState(true);
  const [userBank, setBank] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://progexbackend.onrender.com/writer/get-bankinfo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      setLoading(true);
      const data = await response.json();
      console.log(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("There was a problem fetching the mock data:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setBank(data[0]);
    };
    getData();
  }, []);

  function formatAccountNumber(accountNumber) {
    if (typeof accountNumber !== "string") {
      return "Invalid Account Number";
    }

    const maskedSection = accountNumber.slice(0, -2).replace(/\d/g, "*");
    const visibleSection = accountNumber.slice(-2);
    return `${maskedSection}${visibleSection}`;
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div
      className=" flex flex-col flex-grow items-center justify-center px-[118px]
    xl:px-[147.5px] 2xl:px-[177px] 3xl:px-[226px] gap-y-[15.5px]
    xl:gap-y-[19.5px] 2xl:gap-y-[23.5px] 3xl:gap-y-[30px]"
    >
      <div
        className="border border-[#322C2B] w-full 
    rounded-[10.5px] xl:rounded-[13px] 2xl:rounded-[15.5px] 3xl:rounded-[20px]  
    px-[13px] xl:px-[16px] 2xl:px-[19.5px] 3xl:px-[25px] 
    py-[15.5px] xl:py-[19.5px] 2xl:py-[23.5px] 3xl:py-[30px]"
      >
        <div
          className="flex items-center justify-between 
      mb-[21px] xl:mb-[26px] 2xl:mb-[31px] 3xl:mb-[40px]"
        >
          <p
            className="font-bold 
      text-[29px] xl:text-[36.5px] 2xl:text-[44px] 3xl:text-[56px] 
      "
          >
            Bank account information
          </p>
          <Link to={"/user/edit-wallet"}>
            <img
              src="/img/edit.png"
              alt=""
              className="w-[21px] xl:w-[26px] 2xl:w-[31px] 3xl:w-[40px] 
            h-[21px] xl:h-[26px] 2xl:h-[31px] 3xl:h-[40px]"
            />
          </Link>
        </div>
        <div
          className="flex flex-col 
      gap-y-[21px] xl:gap-y-[26px] 2xl:gap-y-[31px] 3xl:gap-y-[40px]"
        >
          <div
            className="flex items-center 
        text-[16.5px] xl:text-[21px] 2xl:text-[25px] 3xl:text-[32px]"
          >
            <p className="mr-[21px] xl:mr-[26px] 2xl:mr-[31px] 3xl:mr-[40px]">
              Bank
              name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {userBank.BankName}
            </p>
          </div>
          <div
            className="flex items-center
        text-[16.5px] xl:text-[21px] 2xl:text-[25px] 3xl:text-[32px]"
          >
            <p className="mr-[21px] xl:mr-[26px] 2xl:mr-[31px] 3xl:mr-[40px]">
              Account number:
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {formatAccountNumber(userBank.BankNumber)}
            </p>
          </div>
          <div
            className="flex items-center 
        text-[16.5px] xl:text-[21px] 2xl:text-[25px] 3xl:text-[32px]"
          >
            <p className="mr-[21px] xl:mr-[26px] 2xl:mr-[31px] 3xl:mr-[40px]">
              Account
              holder:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {userBank.AccountHolder}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
