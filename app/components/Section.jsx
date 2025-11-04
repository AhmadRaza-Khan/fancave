import { Image } from "@shopify/hydrogen";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { AddToCartButton } from "./AddToCartButton";
import { useAside } from "./Aside";
import { filterCollections } from "~/lib/filterCollections";
import { CircleArrowLeft, CirclePlus, ChevronLeft, ChevronRight, ChevronDown, Search, ShoppingCart, Check } from "lucide-react";

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
  const [activeHandle, setActiveHandle] = useState(collections[initialState]?.handle);
  const { open } = useAside();

  // Scroll controls
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 1.08;
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
    <div className="flex flex-col items-start w-full md:w-[85vw] lg:w-[90vw] xl:w-[95vw] 2xl:[98vw] lg:my-12 xl:my-12 2xl:my-12 my-3 mx-auto h-auto">
      {/* Section Title */}
      <span className="2xl:text-3xl xl:text-3xl lg:text-3xl md:text-2xl sm:text-lg text-lg font-bold mb-3 ml-3 md:ml-0 lg:ml-0 xl:ml-0 2xl:ml-0">{title}</span>

      <div className="pr-0 pb-0 mx-auto">
        <div className="bg-[#F5F6F6] rounded-tl-xl rounded-br-0 px-2 pt-2 flex flex-col items-start w-[90vw] md:w-[80vw] lg:w-[90vw] xl:w-[95vw] 2xl:[98vw]  mx-auto h-auto relative">
        {/* Button Group */}
      <div className="lg:flex hidden gap-4 overflow-x-auto pb-5 px-2 w-fit mx-auto">
        {sortedCollection.slice(0, 6).filter((_, idx) => idx !== 2).map((col, index) => (
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
            className="w-full flex justify-between cursor-pointer items-center border border-gray-500 rounded-sm py-2 bg-[#F5F6F6] px-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
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
             <NavLink
              to={`/products/${item.handle}`}
              key={index}
              className="flex bg-white flex-col cursor-pointer shadow-sm rounded-lg overflow-hidden group relative
              min-w-1/2 sm:min-w-1/2 md:min-w-1/2 lg:min-w-1/4 xl:min-w-1/4 2xl:min-w-1/4 mx-auto"
            >
              {/* Canvas Image box */}
              <div className="relative w-full aspect-square flex items-center justify-center rounded-lg">
                <Image
                  sizes="100vw"
                  src={item.featuredImage?.url}
                  alt={item.title}
                  className={`${objectProp} group-hover:scale-110 transform transition-all ease-out duration-700 max-w-[85%] max-h-[85%]`}
                />
              </div>

              {/* <div className="absolute bg-transparent group-hover:flex px-2 hidden top-[5vh] left-[14vw] lg:left-[5vw] xl:left-[5vw] 2xl:left-[5vw] md:left-[8vw]">
                <NavLink to={`/products/${item.handle}`} className="bg-black rounded-full p-2 w-fit h-fit">
                    <Search color="#fff" className="w-5 h-5" />
                  </NavLink>
              </div> */}

              <div className="absolute justify-center hidden items-center group-hover:flex px-2 bottom-32 w-full h-fit">
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
                        <div className="bg-black mx-auto flex text-xs items-center justify-center gap-2 text-white px-6 rounded-4xl py-3">
                        <ShoppingCart className="w-4 h-4" color="#fff" /> 
                        <p>Add to cart</p>
                        </div>
                          :
                          <div className="bg-black mx-auto flex text-xs items-center justify-center gap-2 text-white px-6 rounded-4xl py-3">"Sold Out"</div>
                          }

                  </AddToCartButton>
              </div>

                {/* Info */}
                <div className="max-w-[22vw] text-start lg:text-center xl:text-center 2xl:text-center md:max-w-[30vw] lg:max-w-[15vw] mx-auto">
                  <p className="text-xs lg:text-sm xl:text-sm 2xl:text-sm text-wrap leading-tight line-clamp-2 md:line-clamp-none xl:line-clamp-none 2xl:line-clamp-none lg:line-clamp-none">
                    {item.title}
                  </p>
                  <p className="text-sm pb-2 lg:pt-1 xl:pt-1 2xl:pt-1 font-bold text-gray-700">
                    ${selectedVariant?.price?.amount || "—"}
                  </p>
                </div>

                {/* add to cart mobile button */}
              <div className="flex lg:hidden xl:hidden 2xl:hidden border border-black rounded-sm my-1 py-1 justify-center items-center text-[10px] mx-auto font-semibold max-w-[25w] md:w-[30vw] sm:w-[28vw] px-2">
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
                        <div className="flex items-center justify-center gap-1">
                        <ShoppingCart className="w-[18px] h-4" /> 
                        <p>Add to cart</p>
                        </div>
                          :
                          <div className="flex items-center justify-center">"Sold Out"</div>
                    }
                  </AddToCartButton>
              </div>
              </NavLink>
            );
          })}
        </div>

        {/* Navigators */}
        {!atStart && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 top-[45%] -translate-y-1/2 bg-black/20 hover:bg-white shadow-md p-3 rounded-full z-8"
          >
            <ChevronLeft color="#000" size={22} />
          </button>
        )}

        {!atEnd && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-5 top-[45%] -translate-y-1/2 bg-black/20 hover:bg-white shadow-md p-3 rounded-full z-8"
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

/* Hide scrollbar globally (add to your globals.css)
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*/

  // const [showAll, setShowAll] = useState(false);
  // const visibleCollections = sortedCollection.slice(0, 5);
  // const remainingCollections = sortedCollection.slice(5);
  // const displayedCollections = showAll ? remainingCollections : visibleCollections;


   {/* {sortedCollection.length > 5 && (
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
            className="bg-white text-black border border-black inline-block px-4 py-2 skew-x-[-14deg]"
          >
            {showAll ? (
              <div className="flex justify-center items-center gap-1 skew-x-14 font-semibold">
                <CircleArrowLeft color="#000" />
                <p>Back</p>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-1 skew-x-14 font-semibold">
                <CirclePlus color="#000" />
                <p>More</p>
              </div>
            )}
          </button>
        )} */}

{/* <div className={`absolute bottom-0 left-0 w-fit mx-auto right-0 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out bg-white/50 backdrop-blur-xs flex flex-col items-center justify-center px-3 py-2 gap-3 opacity-0 group-hover:opacity-100`}>
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
                  </div> */}