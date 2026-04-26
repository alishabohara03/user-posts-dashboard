
"use client";

import { useUsers } from "@/hooks/useUsers";
import UserCard from "@/components/UserCard";
import SearchBar from "@/components/SearchBar";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default function HomePage() {
  const { users, apiIsLoading, error, searchQuery, setSearchQuery } = useUsers();

  return (
    <main className="page">
      <div className="page-header">
        <h1 className="page-title">
          <span className="title-accent">Users</span> Dashboard
        </h1>
        <p className="page-subtitle">Browse users and explore their posts</p>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {apiIsLoading && <Loading text="Loading users..." />}
      {error && <Error message={error} />}

      {!apiIsLoading && !error && (
        <>
          {users.length === 0 ? (
            <div className="state-container">
              <p className="state-text">No users match your search.</p>
            </div>
          ) : (
            <>
              <p className="result-count">
                {users.length} user{users.length !== 1 ? "s" : ""} found
              </p>
              <div className="users-grid">
                {users.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </main>
  );
}