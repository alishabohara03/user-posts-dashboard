
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchPostsByUser, fetchUserById } from "@/services/api";
import { useStore } from "@/store/useStore";
import { Post, User } from "@/types";
import PostCard from "@/components/PostCard";
import PostForm from "@/components/PostForm";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

const POSTS_PER_PAGE = 5;

export default function UserPostsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const userId = Number(id);

  const { posts, setPosts, localPosts, clearPosts } = useStore();
  const [user, setUser] = useState<User | null>(null);
  const [apiIsLoading, setApiIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    clearPosts();
    const load = async () => {
      setApiIsLoading(true);
      setError(null);
      try {
        const [userData, postsData] = await Promise.all([
          fetchUserById(userId),
          fetchPostsByUser(userId),
        ]);
        setUser(userData);
        setPosts(postsData);
      } catch {
        setError("Something went wrong");
      } finally {
        setApiIsLoading(false);
      }
    };
    load();
  }, [userId]);

  // Merge local posts for this user
  const userLocalPosts = localPosts.filter((p) => p.userId === userId);
  const allPosts = [...userLocalPosts, ...posts];

  // Pagination
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedApiPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );
  const displayedPosts = [...userLocalPosts, ...paginatedApiPosts];

  return (
    <main className="page">
      <button className="back-btn" onClick={() => router.back()}>
        ← Back to Users
      </button>

      {apiIsLoading && <Loading text="Loading posts..." />}
      {error && <Error message={error} />}

      {!apiIsLoading && !error && user && (
        <>
          <div className="page-header">
            <div className="user-hero">
              <div className="user-avatar large">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div>
                <h1 className="page-title">{user.name}</h1>
                <p className="page-subtitle">
                  {user.email} · {user.company.name}
                </p>
              </div>
            </div>
          </div>

          <PostForm userId={userId} />

          <div className="posts-section">
            <h2 className="section-title">
              Posts
              <span className="post-count">{allPosts.length}</span>
            </h2>

            {displayedPosts.length === 0 ? (
              <div className="state-container">
                <p className="state-text">No posts yet.</p>
              </div>
            ) : (
              <div className="posts-list">
                {displayedPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    isLocal={userLocalPosts.some((p) => p.id === post.id)}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="page-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  ← Prev
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}
