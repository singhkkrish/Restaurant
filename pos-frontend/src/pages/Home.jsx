import React from 'react'
import BottomNav from '../components/shared/BottomNav'
import Greetings from '../components/home/Greetings'
import {BsCashCoin} from "react-icons/bs"
import {GrInProgress} from "react-icons/gr"
import MiniCard from '../components/home/MiniCard'
import RecentOrders from '../components/home/RecentOrders'
import PopularDishes from '../components/home/PopularDishes'
const Home = () => {
  return (
    <section className='bg-[#1F1F1F] h-[calc(100vh-5rem)] overflow-hidden flex gap-3'>
      {/* left div */}
      <div className="flex-[3] ">
        <Greetings />
        <div className='flex items-center w-full gap-3 px-8 mt-8'>
          <MiniCard title="Total Earnings" icon={<BsCashCoin />} number={512} footerNum={1.6} />
          <MiniCard title="In Progress" icon={<GrInProgress />} number={16} footerNum={3.6} />
        </div>
        <RecentOrders />
      </div>
      {/* right div */}
      <div className="flex-[2]">
        <PopularDishes/>
      </div>
      <BottomNav />
    </section>
  )
}

export default Home
