import React, { useState } from 'react'
import BottomNav from '../components/shared/BottomNav'
import BackButton from '../components/shared/BackButton'
import { MdRestaurantMenu } from 'react-icons/md'
import MenuContainer from '../components/menu/MenuContainer'
import CustomerInfo from '../components/menu/CustomerInfo'
import CartInfo from '../components/menu/CartInfo'
import Bill from '../components/menu/Bill'
import { useSelector } from 'react-redux'
const Menu = () => {
    const customerData = useSelector((state) => state.customer);
    return (
        <section className='bg-[#1F1F1F] h-[calc(100vh-5rem)] overflow-hidden flex gap-3'>
            {/* left div */}
            <div className="flex-[3] ">
                <div className='flex justify-between items-center px-8 py-4 '>
                    <div className='flex items-center gap-4'>
                        <BackButton />
                        <h1 className='text-[#f5f5f5] text-2xl font-bold tracking-wider'>Menu</h1>
                    </div>
                    <div className='flex items-center justify-around gap-4'>
                        <div className='flex items-center gap-3 cursor-pointer'>
                            <MdRestaurantMenu className='text-[#f5f5f5] text-4xl' />
                            <div className='flex flex-col items-start'>
                                <h1 className='text-md text-[#f5f5f5] font-semibold'>{customerData.customerName || 'Customer Name'}</h1>
                                <p className='text-xs text-[#ababab] font-medium'>Table No:{customerData.table?.tableNo || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <MenuContainer />
            </div>
            {/* right div */}
            <div className="flex-[1] bg-[#1a1a1a] mt-4 mr-3 h-[calc(100vh-5rem)] rounded-lg flex flex-col pb-20">
                {/* Customer Info - Fixed at the top */}
                <div className="sticky top-0 z-10 bg-[#1a1a1a]">
                    <CustomerInfo />
                    <hr className='border-[#2a2a2a] border-t-2' />
                </div>
                {/* Cart Items - Scrollable middle */}
                <div className="flex-1 overflow-y-auto ">
                    <CartInfo />
                </div>
                <hr className='border-[#2a2a2a] border-t-2' />
                {/* Bill - Always at the bottom, not sticky */}
                <div>
                    <Bill />
                </div>
            </div>
            <BottomNav />
        </section>
    )
}
export default Menu