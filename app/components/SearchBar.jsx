import { useId, useState } from "react";
import { SearchFormPredictive } from "./SearchFormPredictive";
import { SearchResultsPredictive } from "./SearchResultsPredictive";
import { Link } from "react-router";
import { Search } from "lucide-react";

export default function SearchBar({setOpenSearch}) {
  const queriesDatalistId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  return (
    <div
      className={`w-screen flex justify-center items-center relative z-50`}
    >
      <SearchFormPredictive>
        {({ fetchResults, goToSearch, inputRef }) => (
          
          <div className="flex items-center gap-4 bg-white justify-center w-full">
            <label className="input outline-blue-600 bg-white border-black border w-[70vw] sm:w-[70vw] md:w-[60vw] lg:w-[40vw] xl:w-[40vw] 2xl:w-[40vw]">
            <Search />
            <input
              className="placeholder-gray-600 text-black bg-white w-full"
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
                className="text-black font-bold text-xl"
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
                <div className="flex flex-col lg:flex-row xl:flex-row 2xl:flex-row">
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
