import { useEffect, useId, useRef, useState } from "react";
import { SearchFormPredictive } from "./SearchFormPredictive";
import { SearchResultsPredictive } from "./SearchResultsPredictive";
import { Link } from "react-router";
import { Search, X } from "lucide-react";

export default function SearchBar({setOpenSearch}) {
  const queriesDatalistId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
  function handleClickOutside(event) {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsVisible(false);
      setHasResults(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <div
      ref={containerRef}
      className={`2xl:w-fit xl:w-fit lg:w-fit w-screen flex justify-center items-center relative z-50`}
    >
      <SearchFormPredictive>
        {({ fetchResults, goToSearch, inputRef }) => (
          
          <div className="flex items-center justify-center border border-gray-200 2xl:w-[350px] xl:w-[350px] lg:w-80 w-[92vw] md:w-[95vw] mx-auto lg:mx-0 xl:mx-0 2xl:mx-0 px-5 h-fit relative">
            <input
              className="placeholder-black placeholder:text-sm text-black w-full h-12 border-none outline-none focus:ring-0"
              ref={inputRef}
              name="q"
              type="search"
              autoComplete="off" 
              list={queriesDatalistId}
              placeholder="What are you looking for?"
              onFocus={() => setIsVisible(true)}
              onChange={(e) => {
                fetchResults(e);
                if (e.target.value.trim() !== "") {
                  setHasResults(true);
                } else {
                  setHasResults(false);
                }
              }}
             />

             <div
                className={`absolute right-1 top-0.5 w-fit transition-all ease-in-out duration-300 rounded-sm gap-5 flex items-center justify-center`}
              >
              <div className={`h-24 relative w-24 rounded-sm flex items-center justify-center`}>
               <div className={`absolute top-0 2xl:right-0 xl:right-0 lg:right-0 transition-all duration-300 ${isVisible? "right-10": "right-0"} h-11 w-11 rounded-sm flex items-center justify-center bg-blue-400`}>
                {
                !loading ? 
                <Search color="white" className="h-4 w-4" />
                :
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
               }
               </div>
                <X size={32}
                  onClick={() => {setIsVisible(false); setHasResults(false); if (inputRef?.current) inputRef.current.value = ""; }}
                  className={`absolute right-0 top-1 2xl:hidden xl:hidden lg:hidden transition-all duration-300 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                />
              </div>
              </div>
          </div>
        )}
      </SearchFormPredictive>

     {/* Results Section */}
{isVisible && (
  <div className="mt-4 2xl:w-full xl:w-full lg:w-full md:w-full w-[92vw]  max-h-[60vh] bg-white rounded-b-xl overflow-y-auto scrollbar-minimal border-t z-50 absolute top-8 border-gray-200">
    {/* Static Popular Searches Text */}
    {!hasResults && (
      <div className="px-5 py-4 gap-5 bg-white flex flex-col w-[92vw] mx-auto h-32 items-start justify-center">
        <p className="text-sm">Popular searches</p>
        <p className="text-xs">Most searched for product</p>
      </div>
    )}

    <SearchResultsPredictive>
      {({ items, total, term, state, closeSearch }) => {
        const { articles, collections, pages, products, queries } = items;

        if (state === "loading" && term.current) {
          setLoading(true);
        } else {
          setLoading(false);
        }

        if (!total) {
          return <SearchResultsPredictive.Empty term={term} />;
        }

        return (
          <div className="flex flex-col p-1 bg-white text-black">
            <SearchResultsPredictive.Queries
              queries={queries}
              queriesDatalistId={queriesDatalistId}
            />
            <SearchResultsPredictive.Products
              products={products}
              closeSearch={closeSearch}
              term={term}
            />
            <SearchResultsPredictive.Collections
              collections={collections}
              closeSearch={closeSearch}
              term={term}
            />
            <SearchResultsPredictive.Pages
              pages={pages}
              closeSearch={closeSearch}
              term={term}
            />
            <SearchResultsPredictive.Articles
              articles={articles}
              closeSearch={closeSearch}
              term={term}
            />
          </div>
        );
      }}
    </SearchResultsPredictive>
  </div>
)}

    </div>
  );
}
