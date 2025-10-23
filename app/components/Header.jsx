import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import { useState, useRef } from "react";
import { Search, ShoppingCart, UserRound } from 'lucide-react';
/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart, publicStoreDomain, collections}) {
  const {shop, menu} = header;
  console.log(collections)
  return (
    <header className="navbar px-72 bg-black">
      <NavLink prefetch="intent" to="/" className="navbar-start" style={activeLinkStyle} end>
        <img src="/logo.png" alt={shop.name} />
      </NavLink>
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
        collections={collections}
      />
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
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

  // Categorize collections
  const autographs = collections.filter((c) =>
    c.handle.includes("autograph")
  );

  const tradingCards = collections.filter((c) =>
    ["card", "box", "pack", "singles", "slab", "graded", "ungraded"].some((kw) =>
      c.handle.includes(kw)
    )
  );

  const otherCollections = collections.filter(
    (c) => !autographs.includes(c) && !tradingCards.includes(c)
  );

  // Helpers to control dropdown visibility with delay
  const handleMouseEnter = (dropdown) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200); // delay to prevent flicker
  };

  const Dropdown = ({ title, name, items }) => (
    <div
      className="relative"
      onMouseEnter={() => handleMouseEnter(name)}
      onMouseLeave={handleMouseLeave}
    >
      <button className="font-medium text-white hover:text-gray-200">
        {title} ▾
      </button>

      {openDropdown === name && (
        <div className="absolute left-0 bg-white shadow-lg rounded-lg mt-2 w-56 z-50">
          {items.map((col) => (
            <a
              key={col.id}
              href={`/collections/${col.handle}`}
              onClick={close}
              className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
            >
              {col.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className='navbar-center'>
      <nav className="flex items-center gap-6 text-white" role="navigation">
      {autographs.length > 0 && (
        <Dropdown title="Autographs" name="autographs" items={autographs} />
      )}

      {tradingCards.length > 0 && (
        <Dropdown title="Trading Cards" name="tradingCards" items={tradingCards} />
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
function HeaderCtas({ isLoggedIn, cart }) {
  return (
    <nav className="navbar-end" role="navigation">
      <HeaderMenuMobileToggle />

       {/* Search */}
      <SearchToggle />

      {/* Sign In / Account */}
      <NavLink
        prefetch="intent"
        to="/account"
        className="px-4 py-2 transition font-medium"
      >
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            <UserRound color="#969292" />
          </Await>
        </Suspense>
      </NavLink>

      {/* Cart */}
      <CartToggle cart={cart} />
    </nav>
  );
}

function SearchToggle() {
  const { open } = useAside();
  return (
    <button
      onClick={() => open('search')}
      className="px-4 py-2 transition font-medium"
    >
      <Search color="#969292" />
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
      className="px-4 py-2 rounded-md relative transition font-medium flex items-center gap-2"
    >
      <ShoppingCart color="#969292" />
      <span className="bg-blue-600 absolute top-0 right-1 h-4 w-4 font-bold rounded-sm text-[11px] -mt-1 -mr-1 ">
        {count ?? 0}
      </span>
    </button>
  );
}


function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
    >
      <h3>☰</h3>
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
