"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="flex bg-slate-200 p-5">
      <Link href="/" className="mr-5">
        Company Logo
      </Link>
      <Link href="/users" className="mr-5">
        Users
      </Link>
      <Link href="/admin" className="mr-5">
        Admin
      </Link>
      {status === "loading" && <div>Loading</div>}
      {status === "unauthenticated" && (
        <Link href="/api/auth/signin">Sign In</Link>
      )}
      {status === "authenticated" && <div>{session.user!.name}</div>}
    </div>
  );
};

export default NavBar;
