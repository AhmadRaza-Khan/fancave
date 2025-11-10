import {Link, useFetcher} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import React, {useRef, useEffect} from 'react';
import {
  getEmptyPredictiveSearchResult,
  urlWithTrackingParams,
} from '~/lib/search';
import {useAside} from './Aside';

/**
 * Component that renders predictive search results
 * @param {SearchResultsPredictiveProps}
 * @return {React.ReactNode}
 */
export function SearchResultsPredictive({children}) {
  const aside = useAside();
  const {term, inputRef, fetcher, total, items} = usePredictiveSearch();

  /*
   * Utility that resets the search input
   */
  function resetInput() {
    if (inputRef.current) {
      inputRef.current.blur();
      inputRef.current.value = '';
    }
  }

  /**
   * Utility that resets the search input and closes the search aside
   */
  function closeSearch() {
    resetInput();
    aside.close();
  }

  return children({
    items,
    closeSearch,
    inputRef,
    state: fetcher.state,
    term,
    total,
  });
}

SearchResultsPredictive.Articles = SearchResultsPredictiveArticles;
SearchResultsPredictive.Collections = SearchResultsPredictiveCollections;
SearchResultsPredictive.Pages = SearchResultsPredictivePages;
SearchResultsPredictive.Products = SearchResultsPredictiveProducts;
SearchResultsPredictive.Queries = SearchResultsPredictiveQueries;
SearchResultsPredictive.Empty = SearchResultsPredictiveEmpty;

/**
 * @param {PartialPredictiveSearchResult<'articles'>}
 */
function SearchResultsPredictiveArticles({term, articles, closeSearch}) {
  if (!articles.length) return null;

  return (
    <div className="predictive-search-result text-black px-7" key="articles">
      <h5 className='text-black font-bold'>Articles</h5>
      <ul>
        {articles.map((article) => {
          const articleUrl = urlWithTrackingParams({
            baseUrl: `/blogs/${article.blog.handle}/${article.handle}`,
            trackingParams: article.trackingParameters,
            term: term.current ?? '',
          });

          return (
            <li className="predictive-search-result-item text-black" key={article.id}>
              <Link onClick={() => { closeSearch(); setOpenSearch(false) }} to={articleUrl}>
                {article.image?.url && (
                  <Image
                    alt={article.image.altText ?? ''}
                    src={article.image.url}
                    width={50}
                    height={50}
                  />
                )}
                <div>
                  <span>{article.title}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * @param {PartialPredictiveSearchResult<'collections'>}
 */
function SearchResultsPredictiveCollections({term, collections, closeSearch}) {
  if (!collections.length) return null;

  return (
    <div className="predictive-search-result text-black px-7" key="collections">
      <h5 className='text-black font-bold'>Collections</h5>
      <ul>
        {collections.map((collection) => {
          const collectionUrl = urlWithTrackingParams({
            baseUrl: `/collections/${collection.handle}`,
            trackingParams: collection.trackingParameters,
            term: term.current,
          });

          return (
            <li className="predictive-search-result-item text-black" key={collection.id}>
              <Link onClick={() => { closeSearch(); setOpenSearch(false) }} to={collectionUrl}>
                {collection.image?.url && (
                  <Image
                    alt={collection.image.altText ?? ''}
                    src={collection.image.url}
                    width={50}
                    height={50}
                  />
                )}
                <div>
                  <span className='text-black hover:text-blue-600'>{collection.title}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * @param {PartialPredictiveSearchResult<'pages'>}
 */
function SearchResultsPredictivePages({term, pages, closeSearch}) {
  if (!pages.length) return null;

  return (
    <div className="predictive-search-result text-black px-7" key="pages">
      <h5 className='text-black font-bold'>Pages</h5>
      <ul>
        {pages.map((page) => {
          const pageUrl = urlWithTrackingParams({
            baseUrl: `/${page.handle}`,
            trackingParams: page.trackingParameters,
            term: term.current,
          });

          return (
            <li className="predictive-search-result-item text-black" key={page.id}>
              <Link onClick={() => { closeSearch(); setOpenSearch(false) }} to={pageUrl}>
                <div>
                  <span className='text-black hover:text-blue-600'>{page.title}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * @param {PartialPredictiveSearchResult<'products'>}
 */
function SearchResultsPredictiveProducts({term, products, closeSearch}) {
  if (!products.length) return null;

  return (
    <div className="predictive-search-result text-black px-10" key="products">
      <h5 className='text-black font-bold'>Products</h5>
      <ul>
        {products.map((product) => {
          const productUrl = urlWithTrackingParams({
            baseUrl: `/products/${product.handle}`,
            trackingParams: product.trackingParameters,
            term: term.current,
          });

          const price = product?.selectedOrFirstAvailableVariant?.price;
          const image = product?.selectedOrFirstAvailableVariant?.image;
          return (
            <li className="predictive-search-result-item text-black" key={product.id}>
              <Link to={productUrl} onClick={() => { closeSearch(); setOpenSearch(false) }}>
                {image && (
                  <Image
                    alt={image.altText ?? ''}
                    src={image.url}
                    width={50}
                    height={50}
                  />
                )}
                <div>
                  <p className='text-black hover:text-blue-600'>{product.title}</p>
                  <small>{price && <Money data={price} />}</small>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * @param {PartialPredictiveSearchResult<'queries', never> & {
 *   queriesDatalistId: string;
 * }}
 */
function SearchResultsPredictiveQueries({queries, queriesDatalistId}) {
  if (!queries.length) return null;
return null;
  // return (
  //   <datalist id={queriesDatalistId}>
  //     {queries.map((suggestion) => {
  //       if (!suggestion) return null;

  //       return <option key={suggestion.text} value={suggestion.text} />;
  //     })}
  //   </datalist>
  // );
}

/**
 * @param {{
 *   term: React.MutableRefObject<string>;
 * }}
 */
function SearchResultsPredictiveEmpty({term}) {
  if (!term.current) {
    return null;
  }

  return (
    <p className='text-black py-2 px-10'>
      No results found for <q>{term.current}</q>
    </p>
  );
}

/**
 * Hook that returns the predictive search results and fetcher and input ref.
 * @example
 * '''ts
 * const { items, total, inputRef, term, fetcher } = usePredictiveSearch();
 * '''
 * @return {UsePredictiveSearchReturn}
 */
function usePredictiveSearch() {
  const fetcher = useFetcher({key: 'search'});
  const term = useRef('');
  const inputRef = useRef(null);

  if (fetcher?.state === 'loading') {
    term.current = String(fetcher.formData?.get('q') || '');
  }

  // capture the search input element as a ref
  useEffect(() => {
    if (!inputRef.current) {
      inputRef.current = document.querySelector('input[type="search"]');
    }
  }, []);

  const {items, total} =
    fetcher?.data?.result ?? getEmptyPredictiveSearchResult();

  return {items, total, inputRef, term, fetcher};
}

/** @typedef {PredictiveSearchReturn['result']['items']} PredictiveSearchItems */
/**
 * @typedef {{
 *   term: React.MutableRefObject<string>;
 *   total: number;
 *   inputRef: React.MutableRefObject<HTMLInputElement | null>;
 *   items: PredictiveSearchItems;
 *   fetcher: Fetcher<PredictiveSearchReturn>;
 * }} UsePredictiveSearchReturn
 */
/**
 * @typedef {Pick<
 *   UsePredictiveSearchReturn,
 *   'term' | 'total' | 'inputRef' | 'items'
 * > & {
 *   state: Fetcher['state'];
 *   closeSearch: () => void;
 * }} SearchResultsPredictiveArgs
 */
/**
 * @typedef {Pick<PredictiveSearchItems, ItemType> &
 *   Pick<SearchResultsPredictiveArgs, ExtraProps>} PartialPredictiveSearchResult
 * @template {keyof PredictiveSearchItems} ItemType
 * @template {keyof SearchResultsPredictiveArgs} [ExtraProps='term' | 'closeSearch']
 */
/**
 * @typedef {{
 *   children: (args: SearchResultsPredictiveArgs) => React.ReactNode;
 * }} SearchResultsPredictiveProps
 */

/** @template T @typedef {import('react-router').Fetcher<T>} Fetcher */
/** @typedef {import('~/lib/search').PredictiveSearchReturn} PredictiveSearchReturn */
