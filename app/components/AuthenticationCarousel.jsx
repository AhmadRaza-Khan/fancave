import { ChevronRight } from 'lucide-react'
import { useRef, useState, useEffect } from "react";

export default function AuthenticationCarousel() {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  const scroll = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollAmount = slider.clientWidth * 0.8;
    slider.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => slider.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div className="w-full bg-[linear-gradient(to_right,black_5%,#1f2937_100%)] text-white relative scrollbar-hide overflow-hidden">
      <div className="container mx-auto relative px-4">
        {/* Left Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-1 md:left-5 xl:left-20 2xl:left-20 lg:left-20 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-2 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Right Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-1 md:right-5 xl:right-20 2xl:right-20 lg:right-20 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-2 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Carousel */}
        <div
          ref={sliderRef}
          className="flex items-center px-8 justify-between overflow-x-auto mx-auto w-[60vw] space-x-20 snap-x snap-mandatory scrollbar-hide scroll-smooth"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className=" flex items-center justify-center gap-5 p-2 rounded-2xl snap-center"
            >
              <item.icon className="w-8 h-8 text-white" />
              <div className='flex flex-col text-start gap-1 justify-center text-nowrap'>
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-xs text-gray-300">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Data for cards
const items = [
  {
    title: "Fast Shipping",
    subtitle: "We ship TWICE Daily",
    icon: (props) => (
      <svg {...props} viewBox="0 0 16 16" fill="currentColor">
        <path d="M15.64 6.92L9.5 5.12V4a.5.5 0 00-.5-.5H1a.5.5 0 00-.5.5v8.5c0 .28.22.5.5.5h1.27a2.1 2.1 0 004.06 0h3.94a2.1 2.1 0 004.06 0h1.17a.5.5 0 00.5-.5V7.4a.5.5 0 00-.36-.48zM4.3 13.6a1.1 1.1 0 110-2.2 1.1 1.1 0 010 2.2zM6.33 12a2.1 2.1 0 00-4.06 0H1.5V4.5h7V12H6.33zm5.97 1.6a1.1 1.1 0 110-2.2 1.1 1.1 0 010 2.2zM15 12h-.67a2.1 2.1 0 00-4.06 0H9.5V6.17l5.5 1.6V12z" />
      </svg>
    ),
  },
  {
    title: "Family Owned Business",
    subtitle: "From Our Family to Yours",
    icon: (props) => (
      <svg {...props} viewBox="0 0 16 16" fill="currentColor">
        <path d="M8.86 4.38a2.78 2.78 0 013.72-.3c1.4 1.2 1.2 3.11.19 4.13L7.98 13.1c-.05.06-.1.06-.19 0L3.01 8.2a2.8 2.8 0 01.19-4.1c1.06-.9 2.7-.76 3.74.28l.96.98.96-.98z" />
      </svg>
    ),
  },
  {
    title: "Authenticity Guarantee",
    subtitle: "Authentic Everything!",
    icon: (props) => (
      <svg {...props} viewBox="0 0 16 16" stroke="currentColor" fill="none">
        <circle cx="8" cy="8" r="6.67" />
        <path d="m11 6-4 4L5 8.18" />
      </svg>
    ),
  },
  {
    title: "Need Help? Easy...",
    subtitle: "help@fancave.com",
    icon: (props) => (
      <svg {...props} viewBox="0 0 16 16" stroke="currentColor" fill="none">
        <path d="M3.72,5.57,7,7.87l3.28-2.3" />
        <path d="M.43,10.82V4.26A1.32,1.32,0,0,1,1.75,2.94h10.5a1.32,1.32,0,0,1,1.32,1.32v6.56a1.32,1.32,0,0,1-1.32,1.32H1.75A1.32,1.32,0,0,1,.43,10.82Z" />
      </svg>
    ),
  },
  {
    title: "Retail Store - Kirkwood, MO.",
    subtitle: "Shop Small - Shop Local!",
    icon: (props) => (
      <svg {...props} viewBox="0 0 16 16" fill="currentColor">
        <path d="M6.72 14.63L7.5 14l.78.63-.78.96-.78-.96zm1.41-1.44L7.5 14s-.25-.3-.63-.81C5.63 11.54 3 7.8 3 5.79 3 3.14 5.01 1 7.5 1S12 3.14 12 5.79c0 2.02-2.63 5.75-3.87 7.4z" />
        <path d="M7.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      </svg>
    ),
  },
];

