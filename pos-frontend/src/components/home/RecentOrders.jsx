import React from 'react'
import { FaSearch } from 'react-icons/fa'
import OrderList from './OrderList'
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders } from "../../https/index";

const RecentOrders = () => {
  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrders();
    },
    placeholderData: keepPreviousData
  })

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" })
  }
  return (
    <div className="px-8 mt-6">
      {/* Card */}
      <div className="bg-[#1a1a1a] w-full h-[450px] rounded-lg flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Recent Orders
          </h1>
          <a href="" className="text-[#0255ca] text-sm font-semibold">
            View all
          </a>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4 bg-[#1F1F1F] rounded-[15px] px-6 py-4 mx-6">
          <FaSearch className="text-[#f5f5f5]" />
          <input
            type="text"
            placeholder="Search recent orders"
            className="bg-[#1F1F1F] outline-none text-[#f5f5f5] flex-1"
          />
        </div>

        {/* Orders List - scrollable */}
        <div className="flex-1 mt-7 px-6 overflow-y-auto scrollbar-hide">          
          {
            resData?.data.data.length > 0 ? (
              resData.data.data.map((order) => {
                return <OrderList key={order._id} order={order} />
              })
            ) : <p className="col-span-3 text-gray-500">No orders available</p>
          }
        </div>
      </div>
    </div>
  )
}

export default RecentOrders
