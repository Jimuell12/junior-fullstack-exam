'use client'
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Item } from "./types";

export default function Home() {
  const [data, setData] = useState<Item[]>([])
  const [error, setError] = useState<string | null>(null)
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const mouseDownHandler = (e: { pageX: number; }) => {
      isDown = true;
      el!.classList.add('active');
      startX = e.pageX - el!.offsetLeft;
      scrollLeft = el!.scrollLeft;
    };

    const mouseLeaveHandler = () => {
      isDown = false;
      el!.classList.remove('active');
    };

    const mouseUpHandler = () => {
      isDown = false;
      el!.classList.remove('active');
    };

    const mouseMoveHandler = (e: { preventDefault: () => void; pageX: number; }) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el!.offsetLeft;
      const walk = (x - startX) * 1.5;
      el!.scrollLeft = scrollLeft - walk;
    };

    el!.addEventListener('mousedown', mouseDownHandler);
    el!.addEventListener('mouseleave', mouseLeaveHandler);
    el!.addEventListener('mouseup', mouseUpHandler);
    el!.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      el!.removeEventListener('mousedown', mouseDownHandler);
      el!.removeEventListener('mouseleave', mouseLeaveHandler);
      el!.removeEventListener('mouseup', mouseUpHandler);
      el!.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jfsdexam.pythonanywhere.com/api/items", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setData(data);
        console.log(data)
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleItemdetail = (id: number) => {
    router.push(`/item/${id}`);
  };

  const handlecreateItem = () => {
    router.push('/create-item');
  };

  return (
    <>
      <div className="flex flex-row my-2 justify-between text-white items-center">
        <h1 className="text-xl tracking-wider"><strong>Top item List</strong></h1>
        <div className="p-1 rounded-full bg-gray-600/10 cursor-pointer" onClick={handlecreateItem}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>

        </div>
      </div>
      <div className="flex ">
        <input type="text" placeholder="Search.." className="p-2 my-5 outline-none border-gray-600/10 border rounded-xl w-full px-5 bg-gray-800/20 text-white placeholder:text-[#f5f5f5]" />
      </div>
      <div ref={scrollRef} className="flex gap-4 p-4 text-white no-scrollbar cursor-grab  active:cursor-grabbing overflow-x-scroll bg-gray-50/5 bg-opacity-50 backdrop-blur-3xl rounded-3xl">
        {data.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-52 h-full" onClick={() => { handleItemdetail(item.id) }}>
            <div className="space-y-1 backdrop-brightness-95 hover:bg-gray-600/20 border-gray-400/50 border p-4 rounded-3xl overflow-hidden my-4 select-none">
              <div className="h-36 w-full bg-gray-300 rounded-3xl mb-4 overflow-hidden">
                <img src={item.image} alt="item" className="w-full h-full object-cover" />
              </div>
              <div className="text-lg font-semibold">{item.name}</div>
              <div className="text-xs font-normal">
                {item.description.length > 30 ? `${item.description.substring(0, 30)}...` : item.description}
              </div>
              <div className="text-sm font-normal">₱{item.price}</div>
            </div>
          </div>
        ))}
      </div>

    </>

  );
}
