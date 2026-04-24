interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="border p-4 rounded">
      <h2 className="font-semibold">{post.title}</h2>
      <p className="text-sm text-gray-600 mt-2">
        {post.body.slice(0, 120)}...
      </p>
    </div>
  );
}