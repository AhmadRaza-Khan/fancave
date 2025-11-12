import {Suspense, useId} from 'react';
import {Await, Link, NavLink, useAsyncValue} from 'react-router';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import { useState, useRef } from "react";
import { ChevronDown, ChevronUp, CircleUserRound, Headphones, Search, ShoppingCart, UserRound } from 'lucide-react';
import SearchBar from './SearchBar';
import { filterCollections } from '~/lib/filterCollections';
import HeaderTop from './HeaderTop';
/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart, publicStoreDomain, collections}) {
  const [openSearch, setOpenSearch] = useState(false);
  const {shop, menu} = header;
  
  return (
    <header className="w-full h-fit">
      <HeaderTop />
      <div className='w-full h-[0.5px] bg-gray-200'></div>
      <div className='max-w-7xl mx-auto px-6 lg:px-0 xl:px-0 2xl:px-0  flex 2xl:justify-between xl:justify-between lg:justify-between xl:items-center lg:items-center 2xl:items-center'>
      <HeaderMenuMobileToggle />

        <NavLink prefetch="intent" to="/" className="w-fit mr-[22vw] sm:mr-[30vw] md:mr-[32vw] 2xl:mr-0 xl:mr-0 lg:mr-0 flex mx-auto lg:mx-0 xl:mx-0 2xl:mx-0 flex-col items-center justify-center gap-1 xl:text-[10px] lg:text-[8px] md:text-[9px] sm:text-[7px] text-[7px] 2xl:text-[10px] font-thin " style={activeLinkStyle}>
          <img className='lg:w-52 xl:w-60 2xl:w-60 md:w-48 sm:w-36 w-36 aspect-auto' src="/logo.png" alt={shop.name} />
          <p className='text-nowrap font-mono hidden lg:block xl:block 2xl:block'>Trading Cards & Autographed Collectibles</p>
        </NavLink>

      <div className='flex justify-center items-center gap-10 pb-2 pt-3'>
        <div className='hidden lg:flex xl:flex 2xl:flex'><SearchBar setOpenSearch={setOpenSearch} /></div>
        <div className='gap-2 justify-center items-center w-fit h-fit hidden lg:flex xl:flex 2xl:flex '>
          <img className='h-8 w-8' src="/music.png" alt="music_icon" />
          <div className='flex flex-col items-start justify-center'>
            <p className='text-[10px] tracking-wider font-semibold text-nowrap'>HOW CAN WE HELP?</p>
            <a href="tel:+1234567890" className="text-gray-600 text-nowrap text-[11px]">
              +1 (636) 778-3848
            </a>
          </div>
        </div>
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} openSearch={openSearch} setOpenSearch={setOpenSearch} />
      </div>
      </div>
      <div className='w-full h-[0.5px] bg-gray-200'></div>

      <div className='flex lg:hidden xl:hidden 2xl:hidden mb-3'><SearchBar setOpenSearch={setOpenSearch} /></div>
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
        collections={collections}
      />
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
    }, 100);
  };

  const Dropdown = ({ title, name, items }) => (
  <div
    className="relative cursor-pointer py-3"
    onMouseEnter={() => handleMouseEnter(name)}
    onMouseLeave={handleMouseLeave}
  >
    <button className="font-light text-sm cursor-pointer flex items-center justify-center gap-1">
      {title} <ChevronDown className='h-5 w-5' />
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
    <div className='flex justify-center w-full items-center mx-auto'>
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
    <nav className="" role="navigation">

       {/* Search */}
      {/* <SearchToggle setOpenSearch={setOpenSearch} openSearch={openSearch} /> */}

      {/* Sign In / Account */}
      {/* <NavLink
        prefetch="intent"
        to="/account"
        className="px-2 lg:px-4 py-2 transition font-medium cursor-pointer"
      >
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            <UserRound className='h-4 w-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-7 xl:h-7 2xl:w-7 2xl:h-7' color="#000" />
          </Await>
        </Suspense>
      </NavLink> */}

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
      <Search className='h-4 w-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-7 xl:h-7 2xl:w-7 2xl:h-7' color="#000" />
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
      <ShoppingCart className='w-6 h-6' color="#000" />
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
      <h3 className='text-black text-xl'>☰</h3>
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
