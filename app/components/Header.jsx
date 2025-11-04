import {Suspense, useId} from 'react';
import {Await, Link, NavLink, useAsyncValue} from 'react-router';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import { useState, useRef } from "react";
import { ChevronDown, ChevronUp, Search, ShoppingCart, UserRound } from 'lucide-react';
import SearchBar from './SearchBar';
import { filterCollections } from '~/lib/filterCollections';
/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart, publicStoreDomain, collections}) {
    const [openSearch, setOpenSearch] = useState(false);
  const {shop, menu} = header;
  return (
    <header className="navbar px-4 sm:px-10 md:px-16 lg:px-24 xl:px-40 2xl:px-60">
      {
        openSearch?  (
          <SearchBar setOpenSearch={setOpenSearch} />
        )
          :
        (
      <>
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/" className="navbar-center lg:navbar-start w-fit flex flex-col items-center justify-center gap-1 xl:text-xs lg:text-xs md:text-[10px] sm:text-[8px] text-[8px] 2xl:text-xs font-thin " style={activeLinkStyle} end>
        <img className='lg:w-60 xl:w-60 2xl:w-60 md:w-52 sm:w-40 w-40 aspect-auto' src="/logo.jpg" alt={shop.name} />
        <p>Trading Cards & Autographed Collectibles</p>
      </NavLink>
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
        collections={collections}
      />
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} openSearch={openSearch} setOpenSearch={setOpenSearch} />
      </>
          )
      }
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 * }}
 */


export function HeaderMenu({ collections = [] }) {
  const { close } = useAside();
  const [openDropdown, setOpenDropdown] = useState(null);
  const closeTimeout = useRef(null);
  const { autographs, tradingCards, otherCollections, boxes, singles } = filterCollections(collections);
  
  const handleMouseEnter = (dropdown) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  const Dropdown = ({ title, name, items }) => (
  <div
    className="relative cursor-pointer"
    onMouseEnter={() => handleMouseEnter(name)}
    onMouseLeave={handleMouseLeave}
  >
    <button className="font-sm flex items-center justify-center gap-1">
      {title} <ChevronDown color="#969292" />
    </button>

    {openDropdown === name && (
      <div
        className="absolute left-0 bg-white shadow-lg rounded-lg mt-2 z-50 p-2 flex flex-col gap-1 w-auto text-nowrap text-start max-h-80 overflow-auto"
      >
        {items.map((col) => (
          <NavLink
            key={col.id}
            to={`/collections/${col.handle}`}
            onClick={close}
            className="block px-3 py-2 text-gray-800 hover:bg-black hover:text-white rounded-md text-sm"
          >
            {col.title}
          </NavLink>
        ))}
      </div>
    )}
  </div>
);


  return (
    <div className='navbar-center'>
      <nav className="items-center gap-3 lg:gap-6 lg:mx-10 md:mx-8 mx-5 hidden xl:flex 2xl:flex lg:flex" role="navigation">
      {autographs.length > 0 && (
        <Dropdown title="Autographs" name="autographs" items={autographs} />
      )}

      {tradingCards.length > 0 && (
        <Dropdown title="Trading Cards" name="tradingCards" items={tradingCards} />
      )}

      {singles.length > 0 && (
        <Dropdown title="Singles" name="singles" items={singles} />
      )}

      {boxes.length > 0 && (
        <Dropdown title="Boxes" name="boxes" items={boxes} />
      )}



      {otherCollections.length > 0 && (
        <Dropdown title="More" name="others" items={otherCollections} />
      )}
    </nav>
    </div>
  );
}




/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({ isLoggedIn, cart , openSearch, setOpenSearch}) {
  return (
    <nav className="navbar-end" role="navigation">

       {/* Search */}
      <SearchToggle setOpenSearch={setOpenSearch} openSearch={openSearch} />

      {/* Sign In / Account */}
      <NavLink
        prefetch="intent"
        to="/account"
        className="px-2 lg:px-4 py-2 transition font-medium cursor-pointer"
      >
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            <UserRound color="#000" />
          </Await>
        </Suspense>
      </NavLink>

      {/* Cart */}
      <CartToggle cart={cart} />
    </nav>
  );
}

function SearchToggle({setOpenSearch}) {
  const { open } = useAside();
  return (
    <button
      onClick={() => setOpenSearch(true)}
      className="px-2 lg:px-4 py-2 transition font-medium cursor-pointer"
    >
      <Search color="#000" />
    </button>
  );
}

function CartBadge({ count }) {
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
      className="px-2 lg:px-4 py-2 rounded-md relative transition font-medium flex items-center gap-2 cursor-pointer"
    >
      <ShoppingCart color="#000" />
      {
        count > 0 &&
        <span className="bg-black text-white absolute top-0 right-1 h-4 w-4 font-bold rounded-sm text-[11px] -mt-1 -mr-1 ">
        {count}
      </span>
      }
    </button>
  );
}


function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="flex lg:hidden xl:hidden 2xl:hidden navbar-start"
      onClick={() => open('mobile')}
    >
      <h3 className='text-[#969292]'>☰</h3>
    </button>
  );
}



/**
 * @param {{count: number | null}}
 */


/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */

/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
