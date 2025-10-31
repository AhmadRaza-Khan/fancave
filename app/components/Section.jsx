import { Image } from "@shopify/hydrogen";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { AddToCartButton } from "./AddToCartButton";
import { useAside } from "./Aside";
import { filterCollections } from "~/lib/filterCollections";
import { CircleArrowLeft, CirclePlus, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export default function Section({ collections, title }) {
  const scrollRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [openDrop , setOpenDrop] = useState(false)
  const [atEnd, setAtEnd] = useState(false);
  const { autographs, tradingCards, boxes, otherCollections, singles } =
    filterCollections(collections);

  // Determine which collection to show
  let initialState;
  let sortedCollection;
  let objectProp;
  switch (title) {
    case "Trading Cards":
      initialState = 7;
      sortedCollection = tradingCards;
      objectProp = "object-cover"
      break;
    case "Autographs":
      initialState = 18;
      sortedCollection = [...autographs].reverse();
      objectProp = "object-contain"
      break;
    case "Boxes":
      initialState = 29;
      sortedCollection = boxes;
      objectProp = "object-contain"
      break;
    case "Singles":
      initialState = 34;
      sortedCollection = singles;
      objectProp = "object-contain"
      break;
    case "Best Selling":
      initialState = 1;
      sortedCollection = otherCollections;
      objectProp = "object-contain"
      break;
    default:
      initialState = 0;
      sortedCollection = collections;
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [activeHandle, setActiveHandle] = useState(collections[initialState]?.handle);
  const { open } = useAside();

  // Scroll controls
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Track scroll position
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

  const activeCollection = collections.find((col) => col.handle === activeHandle);

  const visibleCollections = sortedCollection.slice(0, 5);
  const remainingCollections = sortedCollection.slice(5);
  const displayedCollections = showAll ? remainingCollections : visibleCollections;

  return (
    <div className="flex flex-col items-start w-[70vw] md:w-[80vw] lg:w-[90vw] xl:w-[95vw] 2xl:[98vw]  mx-auto h-auto relative">
      {/* Section Title */}
      <span className="2xl:text-2xl xl:text-2xl lg:text-2xl md:text-xl sm:text-lg xs:text-md text-sm font-bold mb-5">{title}</span>

      {/* Button Group */}
      <div className="lg:flex hidden gap-4 overflow-x-auto pb-3 px-2 w-full">
        {displayedCollections.map((col, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              setActiveHandle(col.handle);
            }}
            className={`text-xs text-nowrap py-2 px-2 border font-semibold rounded-sm border-black transition-all duration-200 ${
              activeIndex === index
                ? "lg:shadow-[-4px_4px_0_0_rgba(0,0,0,0.8)] shadow-[-2px_2px_0_0_rgba(0,0,0,0.8)]"
                : "shadow-none"
            }`}
          >
            {col.title}
          </button>
        ))}
        {sortedCollection.length > 5 && (
          <button
            onClick={() => {
              if (showAll) {
                setShowAll(false);
                setActiveHandle(sortedCollection[0].handle);
                setActiveIndex(0);
              } else {
                setShowAll(true);
                setActiveHandle(sortedCollection[5].handle);
                setActiveIndex(0);
              }
            }}
            className="text-xs text-nowrap py-2 px-2 border font-semibold rounded-sm border-black transition-all duration-200"
          >
            {showAll ? (
              <div className="flex justify-center items-center gap-1">
                <CircleArrowLeft color="#000" />
                <p>Back</p>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-1">
                <CirclePlus color="#000" />
                <p>More</p>
              </div>
            )}
          </button>
        )}
      </div>

    <div className="relative inline-block w-full lg:hidden">
          {/* Dropdown Button */}
          <button
            onClick={() => setOpenDrop(!openDrop)}
            className="w-full flex justify-between items-center border border-gray-500 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {sortedCollection[activeIndex]?.title || "Select Collection"}
            <ChevronDown
              className={`w-4 h-4 ml-2 transition-transform duration-200 ${openDrop ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {openDrop && (
            <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
              {sortedCollection.map((col, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    setActiveHandle(col.handle);
                    setOpenDrop(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    index === activeIndex ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  {col.title}
                </button>
              ))}
            </div>
          )}
        </div>
        


      {/* Product Carousel */}
      <div className="relative w-full mt-4">
        {/* Scrollable area */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto pb-3 gap-5 w-full scroll-smooth hide-scrollbar"
        >
          {activeCollection?.products?.map((item, index) => {
            const selectedVariant = item?.variants?.nodes?.[0];
            if (!item?.featuredImage?.url) return null;

            return (
              <div
                key={index}
                className="min-w-[180px] max-w-[180px] flex flex-col bg-white shadow-sm rounded-2xl overflow-hidden group relative"
              >
                {/* Image */}
                <div className="relative w-full bg-white/10 overflow-hidden rounded-lg">
                  <Image
                    src={item.featuredImage?.url}
                    alt={item.title}
                    className={`max-w-[180px] rounded-t-2xl scale-110`}
                  />
                  {/* Hover buttons */}
                  <div className={`absolute bottom-0 left-0 w-fit mx-auto right-0 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out bg-white/50 backdrop-blur-xs flex flex-col items-center justify-center px-3 py-2 gap-3 opacity-0 group-hover:opacity-100`}>
                    <NavLink
                      to={`/products/${item.handle}`}
                      className="w-full bg-blue-600 text-white py-2 px-3 text-nowrap text-center rounded-md text-sm font-medium hover:bg-blue-700 transition-all"
                    >
                      View Product
                    </NavLink>
                    <button className="w-full bg-white text-black border border-black py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-all">
                      <AddToCartButton
                        disabled={!selectedVariant?.availableForSale}
                        onClick={() => open("cart")}
                        lines={[
                          {
                            merchandiseId: selectedVariant?.id,
                            quantity: 1,
                          },
                        ]}
                      >
                        {selectedVariant?.availableForSale
                          ? "Add to Cart"
                          : "Sold Out"}
                      </AddToCartButton>
                    </button>
                  </div>
                </div>
                {/* Info */}
                <div className="max-w-[150px] mx-auto">
                  <p className="text-xs font-semibold text-wrap leading-tight">
                    {item.title}
                  </p>
                  <p className="text-sm font-bold text-gray-700">
                    ${selectedVariant?.price?.amount || "—"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigators */}
        {!atStart && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 top-[45%] -translate-y-1/2 bg-black/20 hover:bg-white shadow-md p-3 rounded-full z-10"
          >
            <ChevronLeft color="#000" size={22} />
          </button>
        )}

        {!atEnd && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-5 top-[45%] -translate-y-1/2 bg-black/20 hover:bg-white shadow-md p-3 rounded-full z-10"
          >
            <ChevronRight color="#000" size={22} />
          </button>
        )}
      </div>
    </div>
  );
}

/* Hide scrollbar globally (add to your globals.css)
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*/
