import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { filterCollections } from "~/lib/filterCollections";

export default function CollectionsCarousel({ collections }) {
  const scrollRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const { filteredAllCollections } = filterCollections(collections);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setAtStart(scrollLeft < 10);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const allCollections = filteredAllCollections.reverse();

  const fallbackImages = [
  '/collection/Baseball_singles.png',
  '/collection/Basket_ball_singles.png',
  '/collection/Case_hitss.png',
  '/collection/football_singles.png',
  '/collection/pokemon_singles.png',
  '/collection/St_Louis_Blues.png',
];

function getFallbackImage(index) {
  const totalFallbacks = fallbackImages.length;
  return fallbackImages[index % totalFallbacks];
}

  return (
    <section className="w-full bg-[#F5F6F6] relative 2xl:mb-20 xl:mb-20 md:mb-[60px] sm:mb-10 mb-10">
    <p className="ml-9 lg:ml-[2.1vw] xl:ml-[2.1vw] 2xl:ml-[2.1vw] text-start mb-6 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-10 2xl:mb-10 2xl:text-4xl xl:text-4xl lg:text-4xl md:text-[28px] sm:text-[28px] text-[22px] font-semibold lg:font-bold 2xl:font-bold xl:font-bold">Shop by Category </p>

        {/* Collection cards */}
        <div className="relative w-full px-10">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide relative z-0"
          >
            {allCollections?.map((collection, idx) => {
  
            const imageUrl = collection?.image?.url || getFallbackImage(idx);

            return (
              <NavLink
                key={collection.id}
                to={`/collections/${collection.handle}`}
                className="flex bg-white flex-col cursor-pointer shadow-sm rounded-lg overflow-hidden group relative
                          min-w-2/3 sm:min-w-1/2 md:min-w-1/4 lg:min-w-1/5 xl:min-w-1/5 h-fit 2xl:min-w-1/5 mx-auto"
              >
                <div className="absolute inset-0 hover:scale-105 bg-black/40"></div>
                {/* Image */}
                <div className="w-full aspect-square bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={collection.title}
                    className="w-full h-full object-contain hover:scale-105 transition-all ease-in-out duration-300"
                  />
                </div>

                <div className="flex flex-col gap-3 text-white items-start justify-center h-fit w-fit absolute bottom-5 left-5">
                  <h3 className="text-sm 2xl:text-base font-semibold xl:text-base">{collection.title}</h3>
                  <p className="text-xs">Discover premium collection</p>
                  <NavLink to={`/collections/${collection.handle}`} className="flex gap-2 text-xs lg:text-sm xl:text-sm 2xl:text-sm px-4 py-1 xl:py-2 2xl:py-2 items-center justify-center rounded-lg border-white border font-semibold hover:text-black hover:bg-white text-white bg-transparent">
                    <p>Explore</p> <MoveRight className="hover:text-white" size={14} />
                  </NavLink>
                </div>
              </NavLink>
            );
          })}

            
          </div>


          {/* Navigators */}
          {!atStart && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg p-2 rounded-full z-8 transition"
            >
              <ChevronLeft color="#000" size={24} />
            </button>
          )}

          {!atEnd && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg p-2 rounded-full z-8 transition"
            >
              <ChevronRight color="#000" size={24} />
            </button>
          )}
        </div>

    {/* <div className="flex items-center justify-end mr-10 mt-0.5">
      <NavLink
        to="/collections"
        className="flex items-center justify-center leading-none border border-black text-black hover:bg-black hover:text-white font-bold text-nowrap xl:text-[16px] lg:text-[16px] 2xl:text-[16px] text-sm lg:text-sm px-1 lg:px-4 xl:px-4 2xl:px-4 py-2 sm:py-2 md:py-3 lg:py-4 xl:py-5 2xl:py-5 duration-100 ease-linear transition-all"
      >
        VISIT ALL CATEGORIES
      </NavLink>
    </div> */}
    </section>
  );
}
