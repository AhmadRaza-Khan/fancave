import {Await, useLoaderData, Link} from 'react-router';
import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import {ProductItem} from '~/components/ProductItem';
import { Hero } from '~/components/Hero';
import Section from '~/components/Section';
import { getAllCollectionsWithProducts } from '~/lib/getCollections';
import OnSaleProducts from '~/components/OnSaleProducts';
import VideoSection from '~/components/VideoSection';
import CollectionsCarousel from '~/components/CollectionsCarousel';
import HeroSection2 from '~/components/HeroSection2';
import Icons from '~/components/Icons';
import NewsLetter from '~/components/NewsLetter';
import HeaderBottom from '~/components/HeaderBottom';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: 'Fancave | Home'}];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({context}) {
  const allCollections = await getAllCollectionsWithProducts(context.storefront);
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
    allCollections: allCollections,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {

  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <div className="home">
      <HeaderBottom />
      {/* <Hero /> */}
      <VideoSection />
      <CollectionsCarousel collections={data.allCollections} />
      <Section collections={data.allCollections} title={"Trading Cards Singles"} />
      <HeroSection2 />
      <OnSaleProducts collections={data.allCollections} title={"Trading Cards on Sale"} image={'url("/one_image.jpg")'} />
      <Section collections={data.allCollections} title={"Autographs"} />
      <OnSaleProducts collections={data.allCollections} title={"Autographs on Sale"} image={'url("/one_image.jpg")'} />
      <Section collections={data.allCollections} title={"Sealed Wax Boxes"} />
      <OnSaleProducts collections={data.allCollections} title={"Boxes on Sale"} image={'url("/one_image.jpg")'} />
      <Section collections={data.allCollections} title={"TCG CARDS"} />
      {/* <OnSaleProducts collections={data.allCollections} title={"Boxes on Sale"} image={'url("/one_image.jpg")'} /> */}
      {/* <Section collections={data.allCollections} title={"Best Selling"} />
      <OnSaleProducts collections={data.allCollections} title={"Items on Sale"} image={'url("/one_image.jpg")'} /> */}
      <Icons />
      {/* <OnSaleProducts collections={data.allCollections} allowedHandles={boxes} title={"Boxes on Sale"} image={'url("/boxes.jpg")'} /> */}
      {/* <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} /> */}
      <NewsLetter />
    </div>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({products}) {
  return (

    
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
