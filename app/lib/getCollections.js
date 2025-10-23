export async function getAllCollections(storefront) {
  console.log("called the funcions")
  try {
    const data = await storefront.query(COLLECTIONS_QUERY);
    console.log("GraphQL raw data:", data);
    return data?.collections?.nodes || [];
  } catch (err) {
    console.error("Error fetching collections:", err);
    return [];
  }
}

const COLLECTIONS_QUERY = `#graphql
  query GetAllCollections {
    collections(first: 100) {
      nodes {
        id
        handle
        title
      }
    }
  }
`;
