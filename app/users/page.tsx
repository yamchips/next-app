import React from "react";
import UserTable from "./UserTable";

interface Props {
  searchParams: Promise<{ sortOrder: string }>;
}

const UsersPage = async ({ searchParams }: Props) => {
  const { sortOrder } = await searchParams;
  return (
    <>
      <h1>Users</h1>
      <UserTable sortOrder={sortOrder} />
      <main className="bg-green-500 text-white p-10">
        <h1 className="text-4xl font-bold">Tailwind should make this green!</h1>
      </main>
    </>
  );
};

export default UsersPage;
