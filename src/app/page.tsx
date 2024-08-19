'use client'
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Item } from "./types";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { ItemCards } from "./components/ItemCards";

export default function Home() {
  const [data, setData] = useState<Item[]>([])
  const [filteredData, setFilteredData] = useState<Item[]>([])
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState<string>('');

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
        setFilteredData(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleItemdetail = (id: number) => {
    router.push(`/item/${id}`);
  };

  const handleSearch = (search: string) => {
    setSearch(search);
    if (search === '') {
      return;
    }
    const filteredData = data.filter((item) => {
      console.log(item.name.toLowerCase().includes(search.toLowerCase()));
      return [item.name.toLowerCase().includes(search.toLowerCase()), item.description.toLowerCase().includes(search.toLowerCase())].some((value) => value);
    });
    setFilteredData(filteredData);
  }

  return (
    <>
      <Header title="Top Items List" tooltip="List of items" />
      <Search search={search} onSearchChange={handleSearch} />
      <div ref={scrollRef} className="flex gap-4 p-4 text-white no-scrollbar cursor-grab  active:cursor-grabbing overflow-x-scroll bg-gray-50/5 bg-opacity-50 backdrop-blur-3xl rounded-3xl">
        {filteredData.map((item) => (
          <ItemCards key={item.id} item={item} onClick={() => handleItemdetail(item.id)} />
        ))}
      </div>
    </>

  );
}
