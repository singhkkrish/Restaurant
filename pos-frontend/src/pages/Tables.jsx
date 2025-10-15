import React, { useState } from 'react'
import BottomNav from '../components/shared/BottomNav'
import BackButton from '../components/shared/BackButton'
import TableCard from '../components/tables/TableCard'
import { tables } from '../constants'
const Tables = () => {
  const [status, setStatus] = useState("all")
  return (
    <section className='bg-[#1F1F1F] h-[calc(100vh-5rem)] overflow-hidden '>
      <div className='flex justify-between items-center px-8 py-4 '>
        <div className='flex items-center gap-4'>
          <BackButton />
          <h1 className='text-[#f5f5f5] text-2xl font-bold tracking-wider'>Tables</h1>
        </div>
        <div className='flex items-center justify-around gap-4'>
          <button onClick={() => setStatus("all")} className={`text-[#ababab] text-lg ${status === "all" && "bg-[#383838] rounded-lg px-5 py-2"}rounded-lg px-5 py-2 font-semibold`}>ALL</button>
          <button onClick={() => setStatus("booked")} className={`text-[#ababab] text-lg ${status === "booked" && "bg-[#383838] rounded-lg px-5 py-2"}rounded-lg px-5 py-2 font-semibold`}>Booked</button>
        </div>
      </div>
      <div className="overflow-y-auto scrollbar-hide h-[calc(100vh-5rem-4rem)] pb-24">
        <div
          className="grid 
      grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
      gap-8
      px-8 lg:px-16   /* 👈 Controls left & right space */
      pt-2
      justify-items-stretch
    "
        >
          {
            tables.map((table) => {
              return (
                <TableCard key={table.id} id={table.id} name={table.name} status={table.status} initials={table.initial} seats={table.seats} />
              )
            })
          }
        </div>
      </div>


      <BottomNav />

    </section>
  )
}

export default Tables
