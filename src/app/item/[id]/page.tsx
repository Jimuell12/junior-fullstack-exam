'use client'
import React, { useEffect, useState } from 'react'
import { Item, ItemDetailsProps } from '../../types'

export default function ItemDetails({ params }: ItemDetailsProps) {
    const [data, setData] = useState<Item | null>(null);  // Single item, so use `Item | null`
    const [name, setName] = useState(data?.name || '');
    const [price, setPrice] = useState(data?.price || '');
    const [description, setDescription] = useState(data?.description || '');
    const [image, setImage] = useState(data?.image || '');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleItem = async () => {
            try {
                const response = await fetch(`https://jfsdexam.pythonanywhere.com/api/items/${params.id}`);

                if (response.ok) {
                    const data = await response.json();
                    setData(data);
                    if (data) {
                        setName(data.name);
                        setPrice(data.price);
                        setDescription(data.description);
                        setImage(data.image);
                    }
                } else if (response.status === 404) {
                    setError('Item not found');
                } else {
                    setError('An error occurred');
                }
            } catch (error) {
                setError('An error occurred');
            }
        }

        handleItem();
    }, [params.id]);

    const handleUpdate = async () => {

        const item = {
            name,
            price,
            description,
            image
        };

        const response = await fetch(`https://jfsdexam.pythonanywhere.com/api/items/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });

        if (response.ok) {
            alert('Item updated successfully');
        } else {
            alert('An error occurred');
        }

        const data = await response.json();
        console.log(data);
    }

    const handleDelete = async () => {
        const response = await fetch(`https://jfsdexam.pythonanywhere.com/api/items/${params.id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Item deleted successfully');
        } else {
            alert('An error occurred');
        }
    }

    return (
        <div>
            <div className="flex flex-row py-2 justify-between text-white items-center">
                <h1><strong>Create Item</strong></h1>
                <div className="p-1 rounded-full bg-gray-600/10 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </div>
            </div>
            <div className="flex gap-4 p-4 text-white overflow-x-scroll no-scrollbar bg-gray-50/5 bg-opacity-50 backdrop-blur-3xl rounded-3xl">
                <form className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-2 text-sm font-medium">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder='Name'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className="p-3 outline-none border-gray-600/10 border rounded-xl w-full bg-gray-800/20 text-white placeholder:text-[#f5f5f5]"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="price" className="mb-2 text-sm font-medium">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder='Price'
                                className="p-3 outline-none border-gray-600/10 border rounded-xl w-full bg-gray-800/20 text-white placeholder:text-[#f5f5f5]"
                            />
                        </div>
                        <div className="flex flex-col md:col-span-2">
                            <label htmlFor="description" className="mb-2 text-sm font-medium">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder='Description'
                                className="p-3 outline-none border-gray-600/10 border rounded-xl w-full bg-gray-800/20 text-white placeholder:text-[#f5f5f5]"
                            ></textarea>
                        </div>
                        <div className="flex flex-col md:col-span-2">
                            <label htmlFor="image" className="mb-2 text-sm font-medium">Image URL</label>
                            <input
                                type="text"
                                id="image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                name="image"
                                placeholder='Image URL'
                                className="p-3 outline-none border-gray-600/10 border rounded-xl w-full bg-gray-800/20 text-white placeholder:text-[#f5f5f5]"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={handleUpdate}
                            className="p-3 bg-gray-600/20 rounded-xl px-6 text-white hover:bg-gray-600/30 transition-colors duration-200"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="p-3 bg-gray-600/20 rounded-xl px-6 text-white hover:bg-gray-600/30 transition-colors duration-200"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export async function generateStaticParams() {
    try {
        const response = await fetch('https://jfsdexam.pythonanywhere.com/api/items');
        const items = await response.json();


        return items.map((item : Item) => ({
            id: item.id.toString() 
        }));
    } catch (error) {
        console.error('Failed to fetch items for static generation', error);
        return [];
    }
}
