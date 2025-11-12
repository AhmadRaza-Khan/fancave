import { Image } from "@shopify/hydrogen";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { AddToCartButton } from "./AddToCartButton";
import { useAside } from "./Aside";
import { filterCollections } from "~/lib/filterCollections";
import { CircleArrowLeft, CirclePlus, ChevronLeft, ChevronRight, ChevronDown, Search, ShoppingCart, Check } from "lucide-react";

export default function Section({ collections, title }) {
  console.log(collections)
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
    case "Trading Cards Singles":
      initialState = 7;
      sortedCollection = tradingCards;
      objectProp = "object-cover"
      break;
    case "Autographs":
      initialState = 18;
      sortedCollection = autographs;
      objectProp = "object-contain"
      break;
    case "TCG CARDS":
      initialState = 29;
      sortedCollection = boxes;
      objectProp = "object-contain"
      break;
    case "Sealed Wax Boxes":
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
  sortedCollection[0].title = "New Arrivals";

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeHandle, setActiveHandle] = useState(sortedCollection[0]?.handle);
  const { open } = useAside();

  // Scroll controls
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.78;
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

  

  return (
    <div className="flex flex-col items-start w-full md:w-[85vw] lg:w-[90vw] xl:w-[95vw] 2xl:[98vw] mx-auto h-auto 2xl:mb-20 xl:mb-20 md:mb-[60px] sm:mb-10 mb-10">
      {/* Section Title */}
      <span className="2xl:text-4xl xl:text-4xl lg:text-4xl md:text-[28px] sm:text-[28px] text-[22px] font-semibold lg:font-bold 2xl:font-bold xl:font-bold ml-6 md:ml-0 lg:ml-0 xl:ml-0 2xl:ml-0 mb-6 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-10 2xl:mb-10">{title}</span>

      <div className="pr-0 pb-0 mx-auto">
        <div className="bg-[#F5F6F6] rounded-tl-xl rounded-br-0 px-2 pt-2 flex flex-col items-start w-[90vw] md:w-[80vw] lg:w-[90vw] xl:w-[95vw] 2xl:[98vw]  mx-auto h-auto relative">
        {/* Button Group */}
      <div className="lg:flex hidden gap-4 overflow-x-auto pb-10 px-2 w-fit mx-auto">
        {sortedCollection.map((col, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              setActiveHandle(col.handle);
            }}
            className={`inline-block px-4 py-2 cursor-pointer skew-x-[-16deg] ${
              activeIndex === index
                ? "bg-black text-white"
                : "bg-[#F5F6F6] text-black"
            }`}
          >
            <span className={`inline-block skew-x-16 cursor-pointer ${ activeIndex === index ? "hover:text-white": "hover:text-gray-700"}`}>{col.title}</span>
          </button>
        ))}
      </div>

    <div className="relative inline-block mb-3 w-full lg:hidden">
          {/* Dropdown Button */}
          <button
            onClick={() => setOpenDrop(!openDrop)}
            className="w-full flex justify-between cursor-pointer items-center border border-gray-500 rounded-sm py-2 bg-[#F5F6F6] px-3 text-sm font-medium text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {sortedCollection[activeIndex]?.title || "Select Collection"}
            <ChevronDown
              className={`w-5 h-5 ml-2 transition-transform duration-200 ${openDrop ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {openDrop && (
            <div className="absolute left-0 mt-2 w-full bg-[#F5F6F6] border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
              {sortedCollection.map((col, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    setActiveHandle(col.handle);
                    setOpenDrop(false);
                  }}
                  className={`w-full text-nowrap flex items-center cursor-pointer text-left px-4 py-2 text-sm ${
                    index === activeIndex ? "bg-black text-white font-medium" : ""
                  }`}
                >
                  {col.title}
                  {
                    index === activeIndex &&
                    <div className="flex w-full justify-end items-center">
                    <Check />
                  </div>
                  }
                </button>
              ))}
            </div>
          )}
        </div>
        


      {/* Product Carousel */}
      <div className="relative w-full">
        {/* Scrollable area */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth scrollbar-hide gap-5 w-full"
        >
          {activeCollection?.products?.map((item, index) => {
            const selectedVariant = item?.variants?.nodes?.[0];
            if (!item?.featuredImage?.url) return null;

            return (
             <div
              key={index}
              className="flex bg-white flex-col cursor-pointer shadow-sm rounded-lg overflow-hidden group relative
              min-w-1/2 sm:min-w-1/2 md:min-w-1/2 lg:min-w-1/4 xl:min-w-1/4 2xl:min-w-1/4 mx-auto border border-black"
            >
              {/* Canvas Image box */}
              <NavLink
              to={`/products/${item.handle}`}
              className="relative w-full aspect-square flex items-center justify-center rounded-lg">
                <Image
                  sizes="85vw"
                  src={item.featuredImage?.url}
                  alt={item.title}
                  className={`${objectProp} group-hover:scale-110 transform transition-all ease-out duration-700 max-w-[85%] max-h-[85%]`}
                />
              </NavLink>

              <div className="absolute justify-center hidden lg:group-hover:flex xl:group-hover:flex 2xl:group-hover:flex items-center px-2 bottom-32 w-full h-fit">
                  <AddToCartButton
                   onClick={() => open("cart")} 
                   lines={[
                          {
                            merchandiseId: selectedVariant?.id,
                            quantity: 1,
                          },
                        ]}>
                    {selectedVariant?.availableForSale
                          ? 
                        <div className="bg-black mx-auto cursor-pointer flex text-xs items-center justify-center gap-2 text-white px-6 rounded-4xl py-3">
                        <ShoppingCart className="w-4 h-4" color="#fff" /> 
                        <p>Add to cart</p>
                        </div>
                          :
                          <div className="bg-black mx-auto flex text-xs items-center justify-center gap-2 text-white px-6 rounded-4xl py-3">"Sold Out"</div>
                          }

                  </AddToCartButton>
              </div>

                {/* Info */}
              <NavLink
              to={`/products/${item.handle}`}
                className="max-w-[85%] text-start lg:text-center xl:text-center 2xl:text-center mx-auto">
                  <p className="text-[15px] lg:text-[17px] xl:text-[17px] 2xl:text-[17px] font-medium text-wrap leading-tight line-clamp-2 xl:line-clamp-none 2xl:line-clamp-none lg:line-clamp-none">
                    {item.title}
                  </p>
                  <p className="text-[17px] lg:text-[19px] xl:text-[19px] 2xl:text-[19px] pb-2 lg:pt-1 xl:pt-1 2xl:pt-1 font-bold text-gray-700">
                    ${selectedVariant?.price?.amount || "—"}
                  </p>
                </NavLink>

                {/* add to cart mobile button */}
              <div className="flex lg:hidden xl:hidden mb-2 2xl:hidden border border-black rounded-sm my-0.5 py-1 justify-center items-center text-[10px] font-semibold w-[85%] mx-auto px-4">
                  <AddToCartButton
                   onClick={() => open("cart")} 
                   lines={[
                          {
                            merchandiseId: selectedVariant?.id,
                            quantity: 1,
                          },
                        ]}>
                    {selectedVariant?.availableForSale
                          ? 
                        <p>Add to cart</p>
                          :
                          <p>"Sold Out"</p>
                    }
                  </AddToCartButton>
              </div>
              </div>
            );
          })}
        </div>

        {/* Navigators */}
        {!atStart && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 cursor-pointer top-[45%] -translate-y-1/2 bg-black/20 hover:bg-white shadow-md p-3 rounded-full z-8"
          >
            <ChevronLeft color="#000" size={22} />
          </button>
        )}

        {!atEnd && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-5 cursor-pointer top-[45%] -translate-y-1/2 bg-black/20 hover:bg-white shadow-md p-3 rounded-full z-8"
          >
            <ChevronRight color="#000" size={22} />
          </button>
        )}
      </div>
      </div>
      </div>
    </div>
  );
}