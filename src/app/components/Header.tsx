import React from 'react'

export const Header = ({title, tooltip} : {title: string, tooltip: string}) => {
  return (
    <div className="flex flex-row my-2 justify-between text-white items-center">
    <h1 className="text-xl tracking-wider"><strong>{title}</strong></h1>
    <div className="p-1 rounded-full bg-gray-600/10 cursor-pointer" title={tooltip}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
      </svg>

    </div>
  </div>
  )
}
