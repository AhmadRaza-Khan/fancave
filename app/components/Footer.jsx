import { Mail, Phone } from 'lucide-react';
import {Suspense} from 'react';
import {Await, NavLink} from 'react-router';

/**
 * @param {FooterProps}
 */
export function Footer({footer: footerPromise, header, publicStoreDomain, collections}) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="footer">
            {footer?.menu && header.shop.primaryDomain?.url && (
              <FooterMenu
                menu={footer.menu}
                primaryDomainUrl={header.shop.primaryDomain.url}
                publicStoreDomain={publicStoreDomain}
              />
            )}
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

/**
 * @param {{
 *   menu: FooterQuery['menu'];
 *   primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
 *   publicStoreDomain: string;
 * }}
 */
function FooterMenu({menu, primaryDomainUrl, publicStoreDomain}) {
  const footerSections = [
    {
      title: "Policies",
      items: FALLBACK_FOOTER_MENU.items.map((item) => ({
        id: item.id,
        title: item.title,
        url: item.url,
      })),
    },
    {
      title: "Company",
      items: PAGES_DATA,
    },
    {
      title: "Resource",
      items: [
        {title: "Blog", url: "#"},
        {title: "Newsletter", url: "#"},
        {title: "Events", url: "#"},
        {title: "Help center", url: "#"},
      ],
    },
    {
      title: "Follow Us",
      items: [
        {
          title: "Facebook",
          icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128
                8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89
                3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63
                1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22
                16.991 22 12z"
                clipRule="evenodd"
              ></path>
            </svg>
          ),
        },
        {
          title: "Instagram",
          icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049
                1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902
                4.902 0 011.153 1.772c.247.636.416 1.363.465
                2.427.048 1.067.06 1.407.06 4.123v.08c0
                2.643-.012 2.987-.06 4.043-.049 1.064-.218
                1.791-.465 2.427a4.902 4.902 0 01-1.153
                1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643
                0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902
                4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902
                4.902 0 011.153-1.772A4.902 4.902 0 015.45
                2.525c.636-.247 1.363-.416 2.427-.465C8.901
                2.013 9.256 2 11.685 2h.63z"
                clipRule="evenodd"
              ></path>
            </svg>
          ),
        },
        {
          title: "Twitter",
          icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253
              11.675-11.675 0-.178 0-.355-.012-.53A8.348
              8.348 0 0022 5.92a8.19 8.19 0
              01-2.357.646 4.118 4.118 0
              001.804-2.27 8.224 8.224 0
              01-2.605.996 4.107 4.107 0
              00-6.993 3.743 11.65 11.65 0
              01-8.457-4.287 4.106 4.106 0
              001.27 5.477A4.072 4.072 0
              012.8 9.713v.052a4.105 4.105 0
              003.292 4.022 4.095 4.095 0
              01-1.853.07 4.108 4.108 0
              003.834 2.85A8.233 8.233 0
              012 18.407a11.616 11.616 0
              006.29 1.84"></path>
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <footer className="relative w-full my-16 text-white" role="navigation">
      <div className="w-full px-8 mx-auto max-w-7xl">
        <div className="grid justify-between grid-cols-1 gap-4 md:grid-cols-2">
          {/* LEFT SIDE (Static) */}
          <div>
            <h5 className="mb-6 text-3xl font-semibold">Fancave Shop</h5>

            {/* Contact Info */}
            <div className="text-white flex justify-center items-center my-1 mt-12 w-fit gap-1">
              <Mail color="#fff" />
              <a href="mailto:help@fancave.com">help@fancave.com</a>
            </div>
            <div className="flex justify-center items-center w-fit my-1 gap-1">
              <Phone color="#fff" />
              <a href="tel:636-778-3848">636-778-3848</a>
            </div>

            {/* Signup */}
            <div className="flex flex-col items-start justify-center mt-5 gap-2">
              <p className="xs:text-xs sm:text-xs md:text-sm">
                Get notified about new releases, sales, and special events:
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Email Address"
                  className="input lg:min-w-[350px] placeholder:text-gray-600 bg-white"
                />
                <button className="btn bg-blue-600 text-white font-semibold">
                  Signup
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (Mapped) */}
          <div className="grid justify-between xl:grid-cols-4 2xl:grid-cols-4 grid-cols-2 lg:grid-cols-4 gap-5">
            {footerSections.map((section) => (
              <ul key={section.title}>
                <>
                {
                  section.title == "Follow Us" ?
                   <p className="block lg:mb-1 xl:mb-1 2xl:mb-1 lg:text-base xl:text-base 2xl:text-base text-sm font-semibold">{section.title}</p>
                    : 
                   <p className="block lg:mb-1 xl:mb-1 2xl:mb-1 lg:text-base xl:text-base 2xl:text-base text-sm font-semibold">{section.title}</p>
                }
                </>
                {section.title === "Follow Us" ? (
                  <div className="flex flex-col items-start justify-start my-5 w-full md:flex-row md:justify-between">
                    <div className="flex gap-3 text-white items-start justify-start">
                      {section.items.map((social) => (
                        <NavLink
                          key={social.title}
                          to="#"
                          className="block"
                        >
                          {social.icon}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  section.items.map((item) => (
                    <li key={item.id || item.title}>
                      <NavLink
                        to={item.url}
                        className="block 2xl:py-2 xl:py-2 lg:py-2 text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-sm"
                      >
                        {item.title}
                      </NavLink>
                    </li>
                  ))
                )}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}


const PAGES_DATA = [
    { 
      id: 1,
      title: "About Us",
      url: "/about"
    },
    { 
      id: 2,
      title: "Authentication",
      url: "/authentication"
    },
    { 
      id: 3,
      title: "FAQs",
      url: "/faqs"
    },
    { 
      id: 4,
      title: "Grading Submissions",
      url: "/grading"
    },
    { 
      id: 5,
      title: "Live Selling",
      url: "/live-selling"
    },
  ]


const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
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
    color: isPending ? 'grey' : 'white',
  };
}

/**
 * @typedef {Object} FooterProps
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {string} publicStoreDomain
 */

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
