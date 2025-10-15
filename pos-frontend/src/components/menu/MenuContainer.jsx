import React, { useState } from 'react'
import { menus } from '../../constants'
import { GrRadialSelected } from 'react-icons/gr'
import { FaShoppingCart } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { removeItem, addItems } from "../../redux/slices/cartSlice";

const MenuContainer = () => {
    const [selected, setSelected] = useState(menus[0])
    const [itemCounts, setItemCounts] = useState({})
    const dispatch = useDispatch();

    const increment = (menuId, itemId) => {
        setItemCounts((prev) => {
            const key = `${menuId}-${itemId}`
            const currentCount = prev[key] || 0
            if (currentCount >= 4) return prev // max 4
            return { ...prev, [key]: currentCount + 1 }
        })
    }

    const decrement = (menuId, itemId) => {
        setItemCounts((prev) => {
            const key = `${menuId}-${itemId}`
            const currentCount = prev[key] || 0
            if (currentCount > 0) {
                return { ...prev, [key]: currentCount - 1 }
            }
            return prev
        })
    }

    const handleAddToCart = (item) => {
        const key = `${selected.id}-${item.id}`;
        const count = itemCounts[key] || 0;
        if (count === 0) return; // nothing to add

        const { name, price } = item;
        const newObj = {
            id: new Date(),
            name,
            pricePerQuantity: price,
            quantity: count,
            price: price * count
        };

        dispatch(addItems(newObj));

        setItemCounts((prev) => ({ ...prev, [key]: 0 })); // reset only this item
    }

    return (
        <>
            <div className="grid grid-cols-4 gap-4 px-10 py-4 mb-0 w-100%">
                {menus.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer"
                            style={{ backgroundColor: item.bgColor }}
                            onClick={() => setSelected(item)}
                        >
                            <div className="flex items-center justify-between w-full">
                                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                                    {item.icon} {item.name}
                                </h1>
                                {selected.id === item.id && (
                                    <GrRadialSelected className="text-white" size={20} />
                                )}
                            </div>
                            <p className="text-[#ababab] text-sm font-semibold">
                                {item.items.length} Items
                            </p>
                        </div>
                    )
                })}
            </div>

            <hr className="border-[#2a2a2a] border-t-2 mt-1" />

            <div className="grid grid-cols-4 gap-4 px-10 py-2 w-100%">
                {selected?.items.map((menuItem) => {
                    const key = `${selected.id}-${menuItem.id}`
                    const count = itemCounts[key] || 0

                    return (
                        <div
                            key={key}
                            className="flex flex-col items-start justify-between p-4 rounded-lg h-[150px] cursor-pointer bg-[#1a1a1a] hover:bg-[#2a2a2a]"
                        >
                            <div className="flex items-start justify-between w-full">
                                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                                    {menuItem.name}
                                </h1>
                                <button onClick={() => handleAddToCart(menuItem)} className="bg-[#2e4a40] text-[#02ca3a] p-2 rounded-lg">
                                    <FaShoppingCart size={20} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between w-full">
                                <p className="text-[#f5f5f5] text-xl font-bold">
                                    ₹{menuItem.price}
                                </p>
                                <div className="flex items-center justify-between rounded-lg gap-6 py-3 px-4 bg-[#1f1f1f]">
                                    <button
                                        onClick={() => decrement(selected.id, menuItem.id)}
                                        className="text-yellow-500 text-2xl"
                                    >
                                        &minus;
                                    </button>
                                    <span className="text-white">{count}</span>
                                    <button
                                        onClick={() => increment(selected.id, menuItem.id)}
                                        className="text-yellow-500 text-2xl"
                                    >
                                        &#43;
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default MenuContainer
