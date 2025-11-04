import {Await, Link} from 'react-router';
import {Suspense, useId, useState} from 'react';
import {Aside, useAside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {CartMain} from '~/components/CartMain';
import {NavLink} from 'react-router';
import {filterCollections} from '~/lib/filterCollections';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';
import {SearchResultsPredictive} from '~/components/SearchResultsPredictive';
import Section from './Section';
import { Hero } from './Hero';
import ProgressBar from './ProgressBar';
import { Check, ChevronDown } from 'lucide-react';

/**
 * @param {PageLayoutProps}
 */
export function PageLayout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain,
  collections
}) {
  return (
    <Aside.Provider>
      <ProgressBar />
      <CartAside cart={cart} />
      <MobileMenuAside header={header} publicStoreDomain={publicStoreDomain} collections={collections} />
      {header && (
        <Header
          header={header}
          cart={cart}
          isLoggedIn={isLoggedIn}
          publicStoreDomain={publicStoreDomain}
          collections={collections}
        />
      )}
      <main>{children}</main>
      <Footer
        footer={footer}
        header={header}
        publicStoreDomain={publicStoreDomain}
        collections={collections}
      />
    </Aside.Provider>
  );
}

/**
 * @param {{cart: PageLayoutProps['cart']}}
 */
function CartAside({cart}) {
  return (
    <Aside type="cart" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

/**
 * @param {{
 *   header: PageLayoutProps['header'];
 *   publicStoreDomain: PageLayoutProps['publicStoreDomain'];
 * }}
 */


export function MobileMenuAside({header, publicStoreDomain, collections = []}) {
  const {close} = useAside();
  const {autographs, tradingCards, otherCollections, boxes, singles} = filterCollections(collections);

  return (
    header.menu &&
    header.shop.primaryDomain?.url && (
      <Aside type="mobile" heading="MENU">
        <div className="text-white h-fit">
          <HeaderMenu
            menu={header.menu}
            viewport="mobile"
            primaryDomainUrl={header.shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
          />

          <div className="border-gray-700 min-h-screen overflow-y-auto gap-2 flex flex-col">
            {autographs.length > 0 && (
              <CollectionSection title="Autographs" items={autographs} close={close} />
            )}
            {tradingCards.length > 0 && (
              <CollectionSection title="Trading Cards" items={tradingCards} close={close} />
            )}
            {singles.length > 0 && (
              <CollectionSection title="Singles" items={singles} close={close} />
            )}
            {boxes.length > 0 && (
              <CollectionSection title="Boxes" items={boxes} close={close} />
            )}
            {otherCollections.length > 0 && (
              <CollectionSection title="More" items={otherCollections} close={close} />
            )}
          </div>
        </div>
      </Aside>
    )
  );
}

function CollectionSection({title, items, close}) {
    const [openDrop , setOpenDrop] = useState(false)
  return (
        <div className="relative inline-block w-full lg:hidden">
          <button
            onClick={() => setOpenDrop(!openDrop)}
            className="w-full cursor-pointer flex justify-between items-center py-2 text-lg font-bold text-black"
          >
            {title}
            <ChevronDown
             className={`w-6 h-6 ml-2 transition-transform duration-200 ${openDrop ? "rotate-180" : ""}`}
            />
          </button>

          {openDrop && (
            <div className="absolute left-0 mt-2 w-full text-black bg-white rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
              {items.map((col, index) => (
                <NavLink
                  to={`/collections/${col.handle}`}
                  key={index}
                  onClick={() => {
                    setOpenDrop(false);
                    close()
                  }}
                  className={`w-full text-nowrap flex items-center text-left px-4 py-2 text-sm hover:text-white hover:bg-black font-medium`}
                >
                  {col.title}
                </NavLink>
              ))}
            </div>
          )}
        </div>
  );
}


/**
 * @typedef {Object} PageLayoutProps
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 * @property {React.ReactNode} [children]
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
