import { ShieldCheck, Store, Truck, Users } from 'lucide-react';
import React from 'react';

const iconsData = [
  {
    title: 'EST. 2016',
    svg: (
      <ShieldCheck />
    ),
  },
  {
  title: 'FAST SHIPPING',
  svg: (
       <Truck />
  ),
},

  {
    title: 'LOCALLY OWNED',
    svg: (
      <Store />
    ),
  },
  {
    title: 'FAMILY OWNED',
    svg: (
      <Users />
    ),
  },
];




const HeaderBottom = () => {
  return (
    <div className="w-full bg-[#2277c7] 2xl:px-[350px] xl:px-[400px] lg:px-60 px-10 max-lg:px-4 max-xl:px-4 max-2xl:px-4">
        <ul
            className="
            flex items-center justify-between
            overflow-x-auto
            max-lg:gap-4
            max-lg:justify-start
            max-lg:max-w-full
            scrollbar-hide
            "
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

  );
};

export default HeaderBottom;
