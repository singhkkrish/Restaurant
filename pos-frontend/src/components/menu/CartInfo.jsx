import React from 'react'
import { FaNotesMedical } from 'react-icons/fa'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, addItems } from "../../redux/slices/cartSlice";
import { useEffect, useRef } from 'react';
const CartInfo = () => {
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cart);
    const scrollRef = useRef();
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            })  ;
        }
    },[cartData])
    const handleRemove = (itemId) => {
       dispatch(removeItem({ id: itemId }));
    }

    return (
        <div className='px-0 py-0 h-full flex flex-col'>
            <div className="bg-[#1a1a1a] pt-4 pb-4 px-4 border-b border-[#333]">
                <h1 className='text-lg text-[#e4e4e4] font-semibold tracking-wide'>Order Details</h1>
            </div>

            <div className='flex-1 overflow-y-auto scrollbar-hide px-4 py-5' ref={scrollRef}>
                {
                    cartData.length === 0 ? (
                        <p className='text-[#ababab] text-sm flex justify-center items-center h-[250px]'>
                            No items in the cart. Start adding items!
                        </p>
                    ) : cartData.map((item) => (
                        <div key={item.id} className='bg-[#1f1f1f] rounded-lg px-4 py-4 mb-2'>
                            <div className='flex items-center justify-between'>
                                <h1 className='text-[#ababab] font-semibold tracking-wide text-md'>{item.name}</h1>
                                <p className='text-[#ababab] font-semibold'>x{item.quantity}</p>
                            </div>
                            <div className='flex items-center justify-between mt-3'>
                                <div className='flex items-center gap-3'>
                                    <RiDeleteBin2Fill 
                                        className="text-[#ababab] cursor-pointer"
                                        size={20}
                                        onClick={() => handleRemove(item.id)}
                                    />
                                    <FaNotesMedical className="text-[#ababab] cursor-pointer" size={20} />
                                </div>
                                <p className='text-[#f5f5f5] text-md font-bold'>₹{item.price}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CartInfo
