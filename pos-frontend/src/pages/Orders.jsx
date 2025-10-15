import React , {useState} from 'react'
import BottomNav from '../components/shared/BottomNav'
import OrderCard from '../components/orders/OrderCard'
import BackButton from '../components/shared/BackButton'

const Orders = () => {
  const [status, setStatus] = useState("all");
  return (
    <section className='bg-[#1F1F1F] h-[calc(100vh-5rem)] relative overflow-hidden '>
      <div className='flex justify-between items-center px-8 py-4 '>
        <div className='flex items-center gap-4'>
          <BackButton/>
          <h1 className='text-[#f5f5f5] text-2xl font-bold tracking-wider'>Orders</h1>
        </div>
        <div className='flex items-center justify-around gap-4'>
          <button onClick={()=> setStatus("all")} className={`text-[#ababab] text-lg ${status === "all" && "bg-[#383838] rounded-lg px-5 py-2"}rounded-lg px-5 py-2 font-semibold`}>ALL</button>
          <button onClick={()=> setStatus("progress")} className={`text-[#ababab] text-lg ${status === "progress" && "bg-[#383838] rounded-lg px-5 py-2"}rounded-lg px-5 py-2 font-semibold`}>In Progress</button>
          <button onClick={()=> setStatus("ready")} className={`text-[#ababab] text-lg ${status === "ready" && "bg-[#383838] rounded-lg px-5 py-2"}rounded-lg px-5 py-2 font-semibold`}>Ready</button>
          <button onClick={()=> setStatus("completed")} className={`text-[#ababab] text-lg ${status === "completed" && "bg-[#383838] rounded-lg px-5 py-2"}rounded-lg px-5 py-2 font-semibold`}>Completed</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-16 py-2 overflow-y-auto scrollbar-hide h-[calc(100vh-5rem-4rem)] pb-20">

        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
      </div>
       <div className="fixed bottom-0 left-0 w-full">
        <BottomNav />
      </div>
    </section>
  )
}

export default Orders
