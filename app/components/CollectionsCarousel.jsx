import { ChevronLeft, ChevronRight } from "lucide-react";
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

  return (
    <section className="w-full bg-[#F5F6F6] lg:pt-6 xl:pt-6 2xl:pt-6 pt-3 md:pt-4 relative">
    <p className="ml-[2.5vw] lg:ml-[2.1vw] xl:ml-[2.1vw] 2xl:ml-[2.1vw] 2xl:text-2xl xl:text-2xl text-start mb-4 lg:text-2xl md:text-xl sm:text-lg xs:text-md text-sm font-bold">Shop by Category </p>
      <div className="max-w-[95vw] mx-auto px-6 bg-linear-to-b from-[#F5F6F6] to-black from-50% to-50%">

        {/* Collection cards */}
        <div className="relative w-full">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar white-scroll relative z-0"
          >
            {allCollections?.map((collection) =>
              collection?.image?.url ||
              collection?.products?.[0]?.variants?.nodes?.[0]?.image?.url ? (
                <NavLink
                  key={collection.id}
                  to={`/collections/${collection.handle}`}
                  className="shrink-0 w-50 h-32 lg:w-80 lg:h-56 xl:w-80 xl:h-56 2xl:w-80 2xl:h-56 overflow-hidden bg-white border flex items-end justify-end relative border-gray-500 rounded-md shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Image */}
                  <div
                    style={{
                      transform: `rotate(-45deg) scale(1.05)`,
                    }}
                    className="absolute -bottom-11 -right-8 w-fit h-fit overflow-hidden rounded-t-md z-10"
                  >
                    <img
                      src={
                        collection?.image?.url ||
                        collection?.products?.[0]?.variants?.nodes?.[0]?.image?.url
                      }
                      alt={collection.title}
                      className="w-32 lg:w-52 xl:w-52 2xl:w-52 object-contain transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div
                    style={{
                      transform: `rotate(-45deg) scale(1.05)`,
                    }}
                    className="absolute -bottom-8 -right-14 w-fit h-fit overflow-hidden rounded-t-md"
                  >
                    <img
                      src={
                        collection?.products?.[1]?.variants?.nodes?.[0]?.image?.url
                      }
                      alt={collection.title}
                      className="w-32 lg:w-52 xl:w-52 2xl:w-52 object-contain transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Title */}
                  <div className="p-4 absolute top-1 left-1 lg:top-3 lg:left-3 xl:top-3 xl:left-3 2xl:top-3 2xl:left-3 text-center">
                    <h3 className="xl:text-md 2xl:text-md lg:text-md text-[8px] md:text-xs text-black font-semibold tracking-wide hover:text-gray-600 uppercase">
                      {collection.title}
                    </h3>
                  </div>
                </NavLink>
              ) : null
            )}
          </div>

          {/* Navigators */}
          {!atStart && (
            <button
              onClick={() => scroll("left")}
              className="absolute -left-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg p-2 rounded-full z-20 transition"
            >
              <ChevronLeft color="#000" size={24} />
            </button>
          )}

          {!atEnd && (
            <button
              onClick={() => scroll("right")}
              className="absolute -right-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg p-2 rounded-full z-20 transition"
            >
              <ChevronRight color="#000" size={24} />
            </button>
          )}
        </div>
      </div>
    <div className="flex items-center justify-end mr-[2.1vw] my-2">
      <NavLink
        to="/collections"
        className="flex items-center justify-center leading-none border border-black text-black hover:bg-black hover:text-white font-bold text-nowrap text-[7px] md:text-[10px] lg:text-sm xl:text-sm 2xl:text-sm px-1 lg:px-4 xl:px-4 2xl:px-4 py-2 sm:py-2 md:py-3 lg:py-4 xl:py-5 2xl:py-5 duration-100 ease-linear transition-all"
      >
        VISIT ALL CATEGORIES
      </NavLink>
    </div>
    </section>
  );
}
