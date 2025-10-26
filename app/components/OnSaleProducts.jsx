import { Image } from "@shopify/hydrogen";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { AddToCartButton } from "./AddToCartButton";
import { useAside } from "./Aside";
import { filterCollections } from "~/lib/filterCollections";

export default function OnSaleProducts({ collections, allowedHandles, title, image }) {
  const { autographs, tradingCards, boxes, otherCollections, singles } = filterCollections(collections);

   let sortedCollection;
   switch (title) {
     case "Trading Cards on Sale":
       sortedCollection = tradingCards;
       break;
     case "Autographs on Sale":
       sortedCollection = autographs;
       break;
     case "Boxes on Sale":
       sortedCollection = boxes;
       break;
     case "Singles on Sale":
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

  const discountedProducts = collection.products.filter(
    (product) =>
      product?.variants?.nodes?.some(
        (variant) => variant?.compareAtPrice !== null
      )
  );

  discountedAll.push(...discountedProducts);
});

  return (
    <>
    {
      discountedAll.length > 0 && 
      <div
      style={{
        backgroundImage: image,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
      }}
      className="flex flex-col items-center justify-center w-full h-auto py-5"
      >
  <span className="2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl xs:text-lg font-bold mb-5 text-center">{title}</span>

  {/* carousel */}
  <div className="flex overflow-x-auto space-x-6 max-w-[90vw] px-6 snap-x snap-mandatory scroll-smooth scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
    {discountedAll.map((item, index) => {
      const selectedVariant = item?.variants?.nodes?.[0];
      if (!item?.featuredImage?.url) return null;

      return (
        <div
          key={index}
          className="flex items-center justify-between p-5 bg-white rounded-xl shadow-sm snap-start min-w-[360px] max-w-[360px] flex-none"
        >
          {/* Left section */}
          <div className="flex flex-col items-start gap-6 w-[55%]">
            <h2 className="text-xs font-semibold text-wrap">{item.title}</h2>

            <div className="flex flex-col gap-4 items-start">
              <div className="flex gap-2 items-center">
                <span className="text-sm font-medium line-through text-gray-700">
                  ${selectedVariant?.compareAtPrice?.amount}
                </span>
                <span className="text-sm font-bold text-black">
                  ${selectedVariant?.price?.amount || "—"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`/products/${item.handle}`}
                  className="bg-blue-600 text-white px-3 btn py-1 rounded-lg hover:bg-blue-800 transition text-sm"
                >
                  View
                </a>

                <button className="bg-white text-black  btn border border-black px-3 py-1 rounded-lg hover:bg-blue-600 hover:text-white transition text-sm">
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
          </div>

          {/* Right section */}
          <div className="relative w-[40%] flex justify-end">
            <div className="bg-white rounded-2xl border absolute -top-2 right-3 border-blue-500 py-1 px-3">
              <p className="text-blue-500 text-xs font-semibold text-center">
                Sale
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
</div>
    }
    </>
  );
}
