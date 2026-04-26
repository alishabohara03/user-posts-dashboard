
import Link from "next/link";
import { User } from "@/types";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="user-card">
      <div className="user-avatar">{initials}</div>
      <div className="user-info">
        <h2 className="user-name">{user.name}</h2>
        <p className="user-email">✉ {user.email}</p>
        <p className="user-company">{user.company.name}</p>
      </div>
      <Link href={`/users/${user.id}`} className="view-posts-btn">
        View Posts →
      </Link>
    </div>
  );
}
