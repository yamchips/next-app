import React from "react";

interface Address {
  street: string;
  city: string;
}

interface User {
  id: number;
  name: string;
  address: Address;
  email: string;
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
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <main className="bg-green-500 text-white p-10">
        <h1 className="text-4xl font-bold">Tailwind should make this green!</h1>
      </main>
    </>
  );
};

export default UsersPage;
