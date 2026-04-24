import { getUsers } from "@/services/api";

export default async function Home() {
  const res = await getUsers();
  const users = res.data;

  return (
    <div>
      <h1>Users</h1>
      {users.map((user: any) => (
        <div key={user.id}>
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
}