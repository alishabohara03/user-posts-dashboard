"use client";

import { useRouter } from "next/navigation";

export default function UserCard({ user }: any) {
  const router = useRouter();

  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>{user.company.name}</p>

      <button onClick={() => router.push(`/users/${user.id}`)}>
        View Posts
      </button>
    </div>
  );
}
