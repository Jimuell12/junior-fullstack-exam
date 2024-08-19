'use client'
import React, { useEffect, useState } from 'react'
import { Item, ItemDetailsProps } from '../../types'
import { useRouter } from 'next/navigation';
import { Header } from '@/app/components/Header';

export default function ItemDetails({ params }: ItemDetailsProps) {
    const [data, setData] = useState<Item | null>(null);
    const [name, setName] = useState(data?.name || '');
    const [price, setPrice] = useState(data?.price || '');
    const [description, setDescription] = useState(data?.description || '');
    const [image, setImage] = useState(data?.image || '');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<[string, string]>(['', '']);
    const route = useRouter();

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

        const res = await response.json();

        if (response.status === 200) {
            setMessage(['success', res.message]);
        } else {
            setMessage(['error', res.message]);
        }
    }

    const handleDelete = async () => {
        const response = await fetch(`https://jfsdexam.pythonanywhere.com/api/items/${params.id}`, {
            method: 'DELETE'
        });

        const res = await response.json();

        if (response.status === 200) {
            setMessage(['success', res.message]);

            route.push('/');
        } else {
            setMessage(['error', "An error occurred"]);
        }
    }

    return (
        <div>
            <Header title="Item Details" tooltip="Update or Delete specific item in the list" />
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
                    <div className="flex justify-end mt-4 items-center">
                        <p>
                            {message[0] === 'success' ? (
                                <span className="text-green-500">{message[1]}</span>
                            ) : message[0] === 'error' ? (
                                <span className="text-red-500">{message[1]}</span>
                            ) : message[1]}
                        </p>
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
