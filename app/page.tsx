import { getUsers } from "@/services/api";
import UserCard from "@/components/UserCard";
export default async function Home() {
  try {
  const res = await getUsers();
  const users = res.data;

  return (
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">Users</h1>

        <div className="grid gap-4">
          {users.map((user: any) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-6">
        <p>Something went wrong while loading users.</p>
      </div>
    );
  }
}
