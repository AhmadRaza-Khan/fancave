import { Image } from "@shopify/hydrogen";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";


export default function Section({ collections, allowedHandles, title }) {

    const tradingCards = collections.filter((c) => 
      allowedHandles.includes(c.handle)
    );
    let initialState;

    switch (title) {
      case "Trading Cards":
        initialState = 7;
        break;
      case "Autographs":
        initialState = 9;
        break;
      case "Boxes":
        initialState = 29;
        break;
      default:
        initialState = 0;
        break;
    }
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeHandle, setActiveHandle] = useState(collections[initialState]?.handle);
    const [products, setProducts] = useState([]);
    
const activeCollection = collections.find(
  (col) => col.handle === activeHandle
);
console.log(collections)
  return (
    <div className="flex flex-col items-start w-[70vw] mx-auto h-auto">
      <span className="text-4xl font-bold my-5">{title}</span>

      <div className="carousel rounded-box gap-5 w-[50vw]">
        {tradingCards.map((col, index) => (
          <div className="carousel-item p-2" key={index+1}>
            <button
              onClick={() => {setActiveIndex(index), setActiveHandle(col.handle)}}
              className={`btn rounded-tl-3xl rounded-br-3xl border-black transition-all duration-200 ${
                activeIndex === index
                  ? "shadow-[4px_4px_0_0_rgba(0,0,0,0.8)]"
                  : "shadow-none"
              }`}
            >
              {col.title}
            </button>
          </div>
        ))}
      </div>
            {/* products carousel */}
                <div className="carousel rounded-box w-[70vw]">
                    {
                        activeCollection.products.nodes.map((item, index)=> (
                            <>
                            { item?.featuredImage?.url &&
                                <div key={index+1} className="card bg-base-100 w-96 shadow-sm carousel-item">
                            <figure className="">
                                <img
                                src={item.featuredImage?.url}
                                alt={item.title}
                                className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{item.title}</h2>
                            </div>
                            </div>
                            }
                            </>
                        ))
                    }
                </div>
    </div>
  );
}
