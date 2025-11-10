import { Image } from "@shopify/hydrogen";
import { useEffect, useRef, useState } from "react";
import { AddToCartButton } from "./AddToCartButton";
import { filterCollections } from "~/lib/filterCollections";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavLink } from "react-router";

export default function OnSaleProducts({ collections, allowedHandles, title, image }) {
  const { autographs, tradingCards, boxes, otherCollections, singles } =
    filterCollections(collections);

  let sortedCollection;
  switch (title) {
    case "Trading Cards on Sale":
      sortedCollection = tradingCards;
      break;
    case "Autographs on Sale":
      sortedCollection = autographs;
      break;
    case "TCG CARDS":
      sortedCollection = boxes;
      break;
    case "Boxes on Sale":
      sortedCollection = singles;
      break;
    case "Items on Sale":
      sortedCollection = boxes;
      break;
    default:
      break;
  }

  const discountedAll = [];
  sortedCollection.forEach((collection) => {
    const discountedProducts = collection.products.filter((product) =>
      product?.variants?.nodes?.some(
        (variant) => variant?.compareAtPrice !== null
      )
    );
    discountedAll.push(...discountedProducts);
  });

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // handle dynamic scroll buttons
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="2xl:mb-20 xl:mb-20 md:mb-[60px] sm:mb-10 mb-10 w-full h-auto">
      {discountedAll.length > 0 && (
        <>
      <h3 className="2xl:text-4xl xl:text-4xl ml-6 lg:text-4xl md:text-[28px] sm:text-[28px] text-[22px] font-semibold lg:font-bold 2xl:font-bold xl:font-bold md:ml-16 lg:ml-10 xl:ml-10 2xl:ml-10 mb-6 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-10 2xl:mb-10">
            {title}
      </h3>
        <div
          style={{
            backgroundImage: image,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
          }}
          className="flex flex-col items-center justify-center w-full h-auto"
        >
          <div className="bg-black/40 relative flex flex-col items-center py-5 justify-center w-full h-auto">
          {/* Scroll Left Button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-1 top-44 lg:top-[183px] -translate-y-1/2 z-10 bg-white hover:scale-105 cursor-pointer text-gray-800 shadow-md rounded-full p-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-6 max-w-[90vw] px-1.5 scrollbar-hide"
            style={{
              scrollbarWidth: "thin",
              msOverflowStyle: "none",
            }}
          >
            {discountedAll.map((item, index) => {
              const selectedVariant = item?.variants?.nodes?.[0];
              if (!item?.featuredImage?.url) return null;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-5 bg-white rounded-xl lg:h-auto xl:h-auto 2xl:h-auto md:h-auto min-h-[220px] shadow-sm snap-start min-w-[340px] max-w-[340px] flex-none"
                >
                  
                  {/* Left section */}
                  <div className="flex flex-col items-start gap-6 w-[55%]">
                    <h2 className="text-xs text-wrap">
                      {item.title}
                    </h2>

                    <div className="flex flex-col gap-4 items-start">
                      <div className="flex gap-2 items-center">
                        <span className="text-sm line-through text-gray-700">
                          ${selectedVariant?.compareAtPrice?.amount}
                        </span>
                        <span className="text-sm text-black">
                          ${selectedVariant?.price?.amount || "—"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <NavLink
                          to={`/products/${item.handle}`}
                          className="bg-black font-normal text-white px-3 btn py-1 rounded-lg hover:bg-gray-950 transition text-sm"
                        >
                          View
                        </NavLink>

                        <button className="bg-white font-normal text-black btn cursor-pointer border border-black px-3 py-1 rounded-lg hover:bg-black hover:text-white transition text-sm">
                          <AddToCartButton
                            disabled={!selectedVariant?.availableForSale}
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
                  </div>

                  {/* Right section */}
                  <div className="relative w-[40%] flex justify-end">
                    <div className="bg-red-600 rounded-2xl border absolute -top-3 right-3 text-white py-1 px-3">
                      <p className="text-xs font-semibold text-center">
                        -{Math.round(
                          ((selectedVariant?.compareAtPrice?.amount - selectedVariant?.price?.amount) /
                            selectedVariant?.compareAtPrice?.amount) * 100
                        )}%

                      </p>
                    </div>

                    <img
                      src={item.featuredImage?.url}
                      alt={item.title}
                      className="w-32 h-32 object-cover rounded-xl"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-1 top-44 lg:top-[183px] -translate-y-1/2 z-10 bg-white hover:scale-105 cursor-pointer text-gray-800 shadow-md rounded-full p-2"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
          </div>
        </div>
        </>
      )}
    </div>
  );
}
