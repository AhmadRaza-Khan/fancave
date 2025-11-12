import { ShieldCheck, Store, Truck, Users } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

const iconsData = [
  { title: 'EST. 2016', svg: <ShieldCheck /> },
  { title: 'FAST SHIPPING', svg: <Truck /> },
  { title: 'LOCALLY OWNED', svg: <Store /> },
  { title: 'FAMILY OWNED', svg: <Users /> },
];

const HeaderBottom = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    const interval = setInterval(() => {
      if (!container) return;

      // Scroll slightly forward every second
      container.scrollBy({ left: 100, behavior: 'smooth' });

      // If near the end, reset to start
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 5) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#2277c7]">
      <div className="max-w-7xl mx-auto">
        <ul
          ref={scrollRef}
          className="flex items-center justify-between overflow-x-auto w-full scrollbar-hide scroll-smooth"
        >
          {iconsData.map((item, idx) => (
            <li
              key={idx}
              className="text-white flex items-center justify-center gap-2 flex-none max-lg:w-1/2"
            >
              <div className="flex items-center justify-center w-11 h-11">
                {item.svg}
              </div>
              <div className="font-semibold 2xl:text-xs xl:text-xs lg:text-xs text-[10px] text-center whitespace-nowrap">
                {item.title}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeaderBottom;
