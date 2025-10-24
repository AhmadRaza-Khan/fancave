import { useId, useState } from "react";
import { SearchFormPredictive } from "./SearchFormPredictive";
import { SearchResultsPredictive } from "./SearchResultsPredictive";
import { Link } from "react-router";

export default function SearchBar({setOpenSearch}) {
  const queriesDatalistId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  return (
    <div
      className={`w-screen flex justify-center items-center relative bg-black z-50`}
    >
      <SearchFormPredictive>
        {({ fetchResults, goToSearch, inputRef }) => (
          
          <div className="flex items-center bg-black gap-4 w-full">
            <label className="input bg-black outline-blue-600 border-white">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="6"
                fill="none"
                stroke="white"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              className="placeholder-gray-300 text-white"
              ref={inputRef}
              name="q"
              type="search"
              list={queriesDatalistId}
              placeholder="Search products..."
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
          </label>

              <button
                onClick={() => setOpenSearch(false)}
                className="text-gray-500 hover:text-gray-700 font-bold text-xl"
              >
                X
              </button>
          </div>
        )}
      </SearchFormPredictive>

      {/* Results Section */}
      {isVisible && hasResults && (
        <div className="mt-4 max-h-[60vh] overflow-y-auto border-t z-50 absolute top-8 bg-black text-white border-gray-200 pt-3">
          <SearchResultsPredictive>
            {({ items, total, term, state, closeSearch }) => {
              const { articles, collections, pages, products, queries } = items;

              if (state === "loading" && term.current) {
                return <div className="text-gray-500 text-sm">Loading...</div>;
              }

              if (!total) {
                return (
                  <SearchResultsPredictive.Empty term={term} />
                );
              }

              return (
                <div className="flex">
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
                  {term.current && total ? (
                    <Link
                      onClick={closeSearch}
                      to={`/search?q=${term.current}`}
                      className="block text-blue-600 hover:underline mt-3 text-sm"
                    >
                      View all results for “{term.current}” →
                    </Link>
                  ) : null}
                </div>
              );
            }}
          </SearchResultsPredictive>
        </div>
      )}
    </div>
  );
}
