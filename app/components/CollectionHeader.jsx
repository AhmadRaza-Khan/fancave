import React from "react";

const CollectionHeader = ({ collection }) => {
  const img = collection?.products?.nodes?.[0]?.featuredImage?.url;

  return (
    <div
      className="hero h-[40vh]"
      style={{
        backgroundImage: img ? `url(${img})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-full">
          <h1 className="mb-5 text-5xl">{collection.title}</h1>
          <p className="mb-5 w-[50vw] text-center mx-auto">
            {collection.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CollectionHeader;
