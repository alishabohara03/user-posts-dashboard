"use client";

import { useRouter } from "next/navigation";
import { User } from "@/types";

interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  const router = useRouter();

  return (
    <div className="border rounded-md p-4 shadow-sm flex flex-col gap-2">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="text-sm text-gray-600">{user.company.name}</p>

      <button onClick={() => router.push(`/users/${user.id}`)}
         className="mt-3 px-4 py-2 text-sm rounded bg-black text-white hover:bg-gray-800"
        >
        View Posts
      </button>
    </div>
  );
}
