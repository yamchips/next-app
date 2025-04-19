import React from "react";

interface Address {
  street: string;
  city: string;
}

interface User {
  id: number;
  name: string;
  address: Address;
}

const UsersPage = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users"
    // default setting is cache: 'force-cache'
    // { cache: "no-store" }, // don't store data in cache
    // { cache: "no-cache" }, // use cache, but check data validity before using it
    // { next: { revalidate: 10 }, // Cache: refresh every 10 seconds, only in fetch function, axios doesn't have this
    // }
  );
  const users: User[] = await res.json();

  return (
    <>
      <h1>Users</h1>
      <p>{new Date().toLocaleTimeString()}</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} lives on {user.address.street} in {user.address.city}.
          </li>
        ))}
      </ul>
      <main className="bg-green-500 text-white p-10">
        <h1 className="text-4xl font-bold">Tailwind should make this green!</h1>
      </main>
    </>
  );
};

export default UsersPage;
