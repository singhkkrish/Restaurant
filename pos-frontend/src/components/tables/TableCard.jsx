import React from 'react'
import { getRandomBG } from '../../utils'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateTable } from '../../redux/slices/customerSlice'
const TableCard = ({key, name,status,initials,seats}) => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleClick=(name)=>{
        if(status==='Booked') return;
        dispatch(updateTable({tableNo: name}));
        navigate(`/menu`);
    }
    const randomColor = getRandomBG();
    return (
        
        <div onClick={()=>handleClick(name)} key={key} className='w-[300px] hover:bg-[#1f1f1f] bg-[#262626] rounded-lg p-4 mb-4 cursor-pointer'>
            <div className='flex items-center justify-between px-1'>
                <h1 className='text-[#f5f5f5] text-xl font-semibold'>{name}</h1>
                 <p className={`${status ==='Booked' ?"text-green-600 bg-[#2e4a40]" : "bg-[#664a04] text-white"} px-2 py-1 rounded-lg`}>{status}</p>
            </div>
            <div className='flex items-center justify-center my-5'>
                 <h1 style={{ backgroundColor: randomColor }} className="text-white rounded-full w-16 h-16 flex items-center justify-center text-xl">{initials}</h1>
            </div>
            <p className="text-[#ababab] text-xs">Seats: <span className="text-[#f5f5f5]">{seats}</span></p>
        
        </div>
    )
}

export default TableCard
