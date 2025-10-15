import React from 'react'
import { popularDishes } from '../../constants'

const PopularDishes = () => {
  return (
    <div className="mt-8 pr-6">
      <div className="bg-[#1a1a1a] w-full rounded-lg flex flex-col h-[700px]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 flex-shrink-0">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Popular Dishes
          </h1>
          <a href="" className="text-[#0255ca] text-sm font-semibold">
            View all
          </a>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto scrollbar-hide pb-6">
          {popularDishes.map((dish) => (
            <div
              key={dish.id}
              className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4 mx-6 mt-4"
            >
              <h1 className='text-[#f5f5f5] font-bold text-xl mr-5'>{dish.id <10 ?`0${dish.id}` : dish.id}</h1>
              <img
                src={dish.image}
                alt={dish.name}
                className="h-[50px] w-[50px] rounded-full"
              />
              <div>
                <h1 className="text-[#f5f5f5] font-semibold tracking-wide">{dish.name}</h1>
                <p className="text-[#f5f5f5] text-sm font-semibold mt-1">
                  <span className='text-[#ababab]'>Orders: </span>{dish.numberOfOrders} 
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PopularDishes
