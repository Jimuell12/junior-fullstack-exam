import React, { FC } from 'react'
import { ItemCardProps } from '../types';


export const ItemCards : FC<ItemCardProps> = ({item, onClick}) => {
  return (
    <div key={item.id} className="flex-shrink-0 w-52 h-full" onClick={onClick}>
      <div className="space-y-1 backdrop-brightness-95 hover:bg-gray-600/20 border-gray-400/50 border p-4 rounded-3xl overflow-hidden my-4 select-none">
        <div className="h-36 w-full bg-gray-300 rounded-3xl mb-4 overflow-hidden">
          <img src={item.image} alt="item" className="w-full h-full object-cover" />
        </div>
        <div className="text-lg font-semibold">{item.name}</div>
        <div className="text-xs font-normal">
          {item.description.length > 30 ? `${item.description.substring(0, 30)}...` : item.description}
        </div>
        <div className="text-sm font-normal">{item.price.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' }).trim()}</div>
      </div>
    </div>
  )
}