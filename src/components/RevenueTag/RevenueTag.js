import React from "react";

function RevenueTag({ revenue }) {
  const getDay = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return formattedDate;
  };

  return (
    <div>
      <div
        className="border border-[#322C2B] w-full 
rounded-[10.5px] xl:rounded-[13px] 2xl:rounded-[15.5px] 3xl:rounded-[20px]  
px-[13px] xl:px-[16px] 2xl:px-[19.5px] 3xl:px-[25px] 
py-[15.5px] xl:py-[19.5px] 2xl:py-[23.5px] 3xl:py-[30px]
mb-[15px] xl:mb-[19px] 2xl:mb-[22px] 3xl:mb-[25px]"
      >
        <div
          className="flex flex-col 
gap-y-[21px] xl:gap-y-[26px] 2xl:gap-y-[31px] 3xl:gap-y-[40px]"
        >
          <div
            className="flex items-center 
  text-[16.5px] xl:text-[21px] 2xl:text-[25px] 3xl:text-[32px]"
          >
            <p className="mr-[21px] xl:mr-[26px] 2xl:mr-[31px] 3xl:mr-[40px]">
              <span className="font-bold">From:</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {getDay(revenue.created_at)}
            </p>
          </div>
          <div
            className="flex items-center 
  text-[16.5px] xl:text-[21px] 2xl:text-[25px] 3xl:text-[32px]"
          >
            <p className="mr-[21px] xl:mr-[26px] 2xl:mr-[31px] 3xl:mr-[40px]">
              <span className="font-bold">Ammount:</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {revenue.Amount} {revenue.Currency}
            </p>
          </div>
          <div
            className="flex items-center 
  text-[16.5px] xl:text-[21px] 2xl:text-[25px] 3xl:text-[32px]"
          >
            <p className="mr-[21px] xl:mr-[26px] 2xl:mr-[31px] 3xl:mr-[40px]">
              <span className="font-bold">Note:</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {revenue.Note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueTag;
