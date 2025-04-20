import React from "react";

interface Props {
  params: { slug: string[] };
}

// [[]] means the parameters are optional, ... means it can accept varying number of parameters

const ProductPage = async ({ params }: Props) => {
  const { slug } = await params;
  return <div>ProductPage {slug} </div>;
};

export default ProductPage;
