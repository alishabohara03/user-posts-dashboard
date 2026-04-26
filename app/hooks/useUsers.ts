
import { useEffect, useState } from "react";
import { fetchUsers } from "@/services/api";
import { useStore } from "@/store/useStore";
import { User } from "@/types";

export function useUsers() {
  const { users, setUsers } = useStore();
  const [apiIsLoading, setApiIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (users.length > 0) return; // already fetched
    const load = async () => {
      setApiIsLoading(true);
      setError(null);
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch {
        setError("Something went wrong");
      } finally {
        setApiIsLoading(false);
      }
    };
    load();
  }, [setUsers, users.length]);

  const filteredUsers: User[] = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  });

  return { users: filteredUsers, apiIsLoading, error, searchQuery, setSearchQuery };
}
