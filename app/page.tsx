import Link from "next/link";
import ProductCard from "./components/ProductCard/ProductCard";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import cat from "@/public/images/cat.jpg";
import Image from "next/image";

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
      <div className="relative w-64 h-64 border-2 border-solid">
        <Image
          src={"https://bit.ly/react-cover"}
          alt={"react-cover"}
          // width={300} // width and height are needed for url images
          // height={300}
          fill={true}
          className="object-cover"
          // sizes="100vw" // define how much of the viewport the image takes
          sizes="(max-width: 480px) 100vw, (max-width:768px) 50vw, 33vw" // set the size for different size of screen
          quality={75} // default is 75, for background we can use 100
          priority // image uses lazy loading, adding this attribute allows the image to be loaded when we retrieve the page
        />
      </div>
    </main>
  );
}
