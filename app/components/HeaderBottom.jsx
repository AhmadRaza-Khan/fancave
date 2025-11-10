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
    <div className="w-full bg-[#2277c7]">
        <div className='max-w-7xl mx-auto'>
          <ul
            className="flex items-center justify-between overflow-x-auto w-full scrollbar-hide">
            {iconsData.map((item, idx) => (
            <li key={idx} className="text-white flex items-center justify-center gap-2 flex-none max-lg:w-1/2">
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
