import React from 'react'
import {FaSearch} from "react-icons/fa"
import {FaUserCircle} from "react-icons/fa"
import {FaBell} from "react-icons/fa"
import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-8 bg-[#1a1a1a]">
      {/* Logo Section */}
      <div className='flex items-center gap-2'>
        <img src={logo} className='h-8 w-8' alt="restro logo" />
        <h1 className='test-lg font-semibold text-[#f5f5f5]'>Restro</h1>
      </div>
      {/* Search Bar */}
      <div className='flex items-center gap-4 bg-[#1F1F1F] rounded-[15px] px-5 py-2 w-[500px]'>
        <FaSearch className='text-[#f5f5f5]' />
        <input type="text" placeholder="Search" className='bg-[#1F1F1F] outline-none text-[#f5f5f5]' />
        
      </div>
      {/* logged user */}
      <div className='flex items-center gap-4'>
        <div className='bg-[#1F1F1F] rounded-[15px] p-3 cursor-pointer'>
          <FaBell className='text-[#f5f5f5] text-2xl'/>
        </div>
        <div className='flex items-center gap-3 cursor-pointer'>
          <FaUserCircle className='text-[#f5f5f5] text-4xl'/>
          <div className='flex flex-col items-start'>
            <h1 className='text-md text-[#f5f5f5] font-semibold'>Amrit Raj</h1>
            <p className='text-xs text-[#ababab] font-medium'>Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
