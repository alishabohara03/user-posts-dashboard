"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/services/api";
import UserCard from "@/components/UserCard";
import { User } from "@/types";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [apiIsLoading, setApiIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data);
        setFilteredUsers(res.data);
      } catch {
        setError(true);
      } finally {
        setApiIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);

    const filtered = users.filter(
      (u) =>
        u.name.toLowerCase().includes(value.toLowerCase()) ||
        u.email.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  if (apiIsLoading) return <p className="p-6">Loading users...</p>;

  if (error) return <p className="p-6">Something went wrong</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Users</h1>

      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search by name or email"
        className="border p-2 w-full mb-4 rounded"
      />

      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}