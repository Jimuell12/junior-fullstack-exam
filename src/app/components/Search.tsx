import React, { FC } from 'react'
import { SearchProps } from '../types'

export const Search : FC<SearchProps> = ({search, onSearchChange}) => {
  return (
    <div className="flex ">
    <input type="text" value={search} onChange={(e)=>{onSearchChange(e.target.value)}} placeholder="Search.." className="p-2 my-5 outline-none border-gray-600/10 border rounded-xl w-full px-5 bg-gray-800/20 text-white placeholder:text-[#f5f5f5]" />
  </div>
  )
}

