export async function getAllCollectionsWithProducts(storefront) {
  try {
   const data = await storefront.query(`
      query {
        collections(first: 50, sortKey: UPDATED_AT, reverse: true) {
          nodes {
            id
            handle
            title
            description
            image {
              url
              altText
            }
          }
        }
      }
    `);

    const collections = data?.collections?.nodes || [];

    const updatedCollections = await Promise.all(
      collections.map(async (col) => {
        const productsData = await storefront.query(
          `
          query ($handle: String!) {
            collection(handle: $handle) {
              products(first: 20) {
                nodes {
                  id
                  handle
                  title
                  description
                  availableForSale
                  tags
                  featuredImage {
                    url
                    altText
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                    maxVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  options {
                    name
                    values
                  }
                  variants(first: 50) {
                    nodes {
                      id
                      title
                      availableForSale
                      sku
                      price {
                        amount
                        currencyCode
                      }
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                      selectedOptions {
                        name
                        value
                      }
                      image {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        `,
          { variables: { handle: col.handle } }
        );

        return {
          ...col,
          products: productsData?.collection?.products?.nodes || [],
        };
      })
    );

    return updatedCollections;
  } catch (err) {
    console.error("❌ Error fetching collections with products:", err);
    return [];
  }
}
