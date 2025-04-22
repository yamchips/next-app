import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ sortOrder: string }>;
}

// [[]] means the parameters are optional, ... means it can accept varying number of parameters

const ProductPage = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const { sortOrder } = await searchParams;
  const validPaths = ["", "dashboard", "settings", "users/list"];
  const path = slug?.join("/") || "";
  if (!validPaths.includes(path)) {
    notFound();
  }
  return (
    <div>
      ProductPage: slug is {slug}, sort order is {sortOrder}.
    </div>
  );
};

export default ProductPage;
