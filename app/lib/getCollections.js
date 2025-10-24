export async function getAllCollectionsWithProducts(storefront) {
  try {
    // 1️⃣ Get all collections (id, title, handle)
    const data = await storefront.query(`
      query {
        collections(first: 50) {
          nodes {
            id
            handle
            title
            description
          }
        }
      }
    `);

    const collections = data?.collections?.nodes || [];

    // 2️⃣ Fetch products for each collection
    const updatedCollections = await Promise.all(
      collections.map(async (col) => {
        const productsData = await storefront.query(`
          query ($handle: String!) {
            collection(handle: $handle) {
              products(first: 20) {
                nodes {
                  id
                  handle
                  title
                  featuredImage {
                    url
                    altText
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        `, { variables: { handle: col.handle } });

        return {
          ...col,
          products: productsData?.collection?.products || { nodes: [] },
        };
      })
    );

    return updatedCollections;
  } catch (err) {
    console.error("❌ Error fetching collections with products:", err);
    return [];
  }
}
