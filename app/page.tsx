import Link from "next/link";
import ProductCard from "./components/ProductCard/ProductCard";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function Home() {
  await wait(2000);
  return (
    <main>
      <h1>Hello world</h1>
      <Link href="/users">Users</Link>
      <ProductCard />
    </main>
  );
}
