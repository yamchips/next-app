import { sort } from "fast-sort";
import Link from "next/link";

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

interface Props {
  sortOrder: string;
}

const UserTable = async ({ sortOrder }: Props) => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users"
    // default setting is cache: 'force-cache'
    // { cache: "no-store" }, // don't store data in cache
    // { cache: "no-cache" }, // use cache, but check data validity before using it
    // { next: { revalidate: 10 }, // Cache: refresh every 10 seconds, only in fetch function, axios doesn't have this
    // }
  );
  const users: User[] = await res.json();

  const sortedUsers = sort(users).asc(
    sortOrder === "email" ? (user) => user.email : (user) => user.name
  );

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            <Link href="/users?sortOrder=name">Name</Link>
          </th>
          <th>
            <Link href="/users?sortOrder=email">Email</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
