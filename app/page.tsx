import Link from "next/link";
import ProductCard from "./components/ProductCard/ProductCard";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function Home() {
  await wait(2000);
  const session = await getServerSession(authOptions);
  return (
    <main>
      <h1>Hello {session && session.user!.name}</h1>
      <Link href="/users">Users</Link>
      <ProductCard />
    </main>
  );
}
