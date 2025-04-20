import React from "react";

interface Props {
  params: { slug: string[] };
  searchParams: { sortOrder: string };
}

// [[]] means the parameters are optional, ... means it can accept varying number of parameters

const ProductPage = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const { sortOrder } = await searchParams;
  return (
    <div>
      ProductPage: slug is {slug}, sort order is {sortOrder}.
    </div>
  );
};

export default ProductPage;
