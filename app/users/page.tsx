import React from "react";
import UserTable from "./UserTable";

const UsersPage = async () => {
  return (
    <>
      <h1>Users</h1>
      <UserTable />
      <main className="bg-green-500 text-white p-10">
        <h1 className="text-4xl font-bold">Tailwind should make this green!</h1>
      </main>
    </>
  );
};

export default UsersPage;
