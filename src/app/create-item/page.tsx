'use client'
import React, { useState } from 'react'
import { Header } from '../components/Header';

export default function CreateItem() {
  const [message, setMessage]  = useState<[string, string]>(['', '']);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as string;
    
    const item = {
      name,
      price,
      description,
      image
    };

    const response = await fetch('https://jfsdexam.pythonanywhere.com/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });

    const res = await response.json();

    if (response.status === 200) {
      setMessage(['success', res.message]);
    } else {
      setMessage(['error', res.message]);
    }

  }
  
  return (
    <>
      <Header title="Create New Item" tooltip="Add new in the list" />
      <div className="flex gap-4 p-4 text-white overflow-x-scroll no-scrollbar bg-gray-50/5 bg-opacity-50 backdrop-blur-3xl rounded-3xl">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 text-sm font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder='Name'
                className="p-3 outline-none border-gray-600/10 border rounded-xl w-full bg-gray-800/20 text-white placeholder:text-[#f5f5f5]"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="price" className="mb-2 text-sm font-medium">Price</label>
              <input
                type="number"
                id="price"
                min={1}
                name="price"
                placeholder='Price'
                className="p-3 outline-none border-gray-600/10 border rounded-xl w-full bg-gray-800/20 text-white placeholder:text-[#f5f5f5]"
              />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="description" className="mb-2 text-sm font-medium">Description</label>
              <textarea
                id="description"
                name="description"
                rows={3}
                placeholder='Description'
                className="p-3 outline-none border-gray-600/10 border rounded-xl w-full bg-gray-800/20 text-white placeholder:text-[#f5f5f5]"
              ></textarea>
            </div>
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="image" className="mb-2 text-sm font-medium">Image URL</label>
              <input
                type="text"
                id="image"
                name="image"
                placeholder='Image URL'
                className="p-3 outline-none border-gray-600/10 border rounded-xl w-full bg-gray-800/20 text-white placeholder:text-[#f5f5f5]"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4 items-center">
            <p>
              {message[0] === 'success' ? (
                <span className="text-green-500">{message[1]}</span>
              ) : message[0] === 'error' ? (
                <span className="text-red-500">{message[1]}</span>
              ) : message[1]}
            </p>
            <button
              type="submit"
              className="p-3 bg-gray-600/20 rounded-xl px-6 text-white hover:bg-gray-600/30 transition-colors duration-200"
            >
              Create
            </button>
          </div>
        </form>
      </div>

    </>
  )
}
