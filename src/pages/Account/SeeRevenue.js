import React, { useEffect, useState } from "react";
import RevenueTag from "../../components/RevenueTag/RevenueTag";

function SeeRevenue() {
  const testRevenue = {
    id: 4,
    created_at: "2024-04-30T09:15:44.011694+00:00",
    UserID: 3,
    Amount: 500000,
    Note: "Advertisement",
    Currency: "VND",
  };
  const [loading, setLoading] = useState(true);
  const [revenueList, setRevenueList] = useState([]);
  const fetchRevenue = async () => {
    try {
      const response = await fetch(
        "https://progexbackend.onrender.com/writer/get-royalties",
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
      setRevenueList(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.error("There was a problem fetching the Revenue data:", error);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div
      className=" flex flex-col flex-grow items-center justify-center px-[118px]
xl:px-[147.5px] 2xl:px-[177px] 3xl:px-[226px] gap-y-[15.5px]
xl:gap-y-[19.5px] 2xl:gap-y-[23.5px] 3xl:gap-y-[30px]"
    >
      <div className="w-full">
        <p
          className="font-bold text-[33.5px] xl:text-[42px] 2xl:text-[50px] 3xl:text-[64px]
          mt-[10.5px] xl:mt-[13px] 2xl:mt-[15.5px] 3xl:mt-[20px]
        mb-[30px] xl:mb-[37px] 2xl:mb-[44.5px] 3xl:mb-[57px]"
        >
          Revenue List {`(${revenueList.length})`}
        </p>
        {revenueList.map((revenue) => (
          <RevenueTag key={revenue.id} revenue={testRevenue} />
        ))}
      </div>
    </div>
  );
}

export default SeeRevenue;
