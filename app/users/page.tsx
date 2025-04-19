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
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return (
    <>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} lives on {user.address.street} in {user.address.city}.
          </li>
        ))}
      </ul>
    </>
  );
};

export default UsersPage;
