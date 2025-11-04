import { ChevronRight } from 'lucide-react'
import { useRef, useState, useEffect } from "react";
import AuthenticationBody from '~/components/AuthenticationBody';
import PagesCarousel from '~/components/PagesCarousel';

export function loader(){}

export default function Authentication() {
  
  return (
   <div>
    <PagesCarousel />
    <AuthenticationBody />
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className='w-full text-center border border-gray-300 py-2 mb-10 border-l-0 border-r-0 mt-10'
    > Back to top </button>
   </div>
  );
}
