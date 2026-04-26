
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
  isLocal?: boolean;
}

export default function PostCard({ post, isLocal = false }: PostCardProps) {
  return (
    <div className={`post-card ${isLocal ? "post-card--local" : ""}`}>
      {isLocal && <span className="local-badge">New</span>}
      <h3 className="post-title">{post.title}</h3>
      <p className="post-body">{post.body}</p>
    </div>
  );
}
