import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { formatDate } from '../../utils';

const CustomerInfo = () => {
    const [dateTime,setDateTime] = useState(new Date());
    const customerData = useSelector((state) => state.customer);

    // Get initials for button
    const initials = customerData.customerName
        ? customerData.customerName.split(' ').map(n => n[0]).join('').toUpperCase()
        : 'CN';

    return (
        <div className='flex items-center justify-between px-4 py-3'>
            <div className='flex flex-col items-start'>
                <h1 className='text-[#f5f5f5] text-md font-semibold tracking-wide'>
                    {customerData.customerName || 'Customer Name'}
                </h1>
                <p className='text-[#ababab] text-xs font-medium mt-1'>
                    {customerData.orderId ? `#${customerData.orderId} /Dine in` : '#N/A /Dine in'}
                </p>
                <p className='text-[#ababab] text-xs font-medium mt-1'>
                    {formatDate(dateTime)}
                </p>
            </div>
            <button className='bg-[#f6b100] p-3 text-xl font-bold rounded-lg'>
                {initials}
            </button>
        </div>
    )
}

export default CustomerInfo