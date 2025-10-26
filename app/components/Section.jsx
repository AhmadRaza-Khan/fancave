import { Image } from "@shopify/hydrogen";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { AddToCartButton } from "./AddToCartButton";
import { useAside } from "./Aside";
import { filterCollections } from "~/lib/filterCollections";

export default function Section({ collections, title }) {
  const { autographs, tradingCards, boxes, otherCollections, singles } = filterCollections(collections);

  let initialState;
  let sortedCollection;
  switch (title) {
    case "Trading Cards":
      initialState = 7;
      sortedCollection = tradingCards;
      break;
    case "Autographs":
      initialState = 9;
      sortedCollection = autographs;
      break;
    case "Boxes":
      initialState = 29;
      sortedCollection = boxes;
      break;
    case "Singles":
      initialState = 34;
      sortedCollection = singles;
      break;
    case "Best Selling":
      initialState = 1;
      sortedCollection = otherCollections;
      break;
    default:
      initialState = 0;
      break;
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeHandle, setActiveHandle] = useState(
    collections[initialState]?.handle
  );
  const { open } = useAside();

  const activeCollection = collections.find(
    (col) => col.handle === activeHandle
  );

  return (
    <div className="flex flex-col items-start w-[90vw] md:w-[80vw] lg:w-[70vw] mx-auto h-auto">
      <span className="2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl xs:text-lg  my-5">{title}</span>

      {/* Collection selector carousel */}
      <div className="carousel rounded-box gap-5 w-[90vw] md:w-[70vw] lg:w-[50vw]">
        {sortedCollection.map((col, index) => (
          <div className="carousel-item p-2" key={index + 1}>
            <button
              onClick={() => {
                setActiveIndex(index);
                setActiveHandle(col.handle);
              }}
              className={`btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl border-black transition-all duration-200 ${
                activeIndex === index
                  ? "lg:shadow-[-4px_4px_0_0_rgba(0,0,0,0.8)] shadow-[-2px_2px_0_0_rgba(0,0,0,0.8)]"
                  : "shadow-none"
              }`}

            >
              {col.title}
            </button>
          </div>
        ))}
      </div>

      {/* Products carousel */}
      <div className="carousel gap-10 rounded-box w-[90vw] md:w-[80vw] lg:w-[70vw]">
        {activeCollection?.products?.map((item, index) => {
          const selectedVariant = item?.variants?.nodes?.[0];
          if (!item?.featuredImage?.url) return null;

          return (
            <div
  key={index + 1}
  className="bg-base-100 w-96 shadow-sm flex items-center flex-col carousel-item group relative overflow-hidden"
>
  <div className="relative rounded-2xl -mb-4">
    <img
      src={item.featuredImage?.url}
      alt={item.title}
      className="rounded-xl w-full h-full object-cover"
    />

    {/* Hidden buttons (slide-up on hover, same as before) */}
    <div className="absolute bottom-5 left-0 px-3 right-0 mx-auto max-w-52 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out bg-black/10 backdrop-blur-sm flex flex-col items-center justify-center py-4 gap-3 opacity-0 group-hover:opacity-100">
      <a
        href={`/products/${item.handle}`}
        className="btn btn-wide bg-blue-600 text-white border-none hover:bg-blue-800 transition"
      >
        View Product
      </a>

      <button className="btn btn-wide bg-white text-black border-black hover:bg-primary/80 transition">
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
          {selectedVariant?.availableForSale ? "Add to Cart" : "Sold Out"}
        </AddToCartButton>
      </button>
    </div>
  </div>

  <div className="flex flex-col w-[209px] items-start">
    <p className="text-[18px] leading-tight">{item.title}</p>
    <p className="text-lg font-semibold text-[#374151]">
      ${selectedVariant?.price?.amount || "—"}
    </p>
  </div>
</div>

          );
        })}
      </div>
    </div>
  );
}
