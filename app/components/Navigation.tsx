"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/users/new");
  };
  return (
    <div className="space-y-4">
      <Link href="/users/new" className="text-blue-600 underline">
        Go to New User (Link)
      </Link>
      <button
        onClick={handleClick}
        className="block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Go to New User (Button)
      </button>
    </div>
  );
};

export default Navigation;
