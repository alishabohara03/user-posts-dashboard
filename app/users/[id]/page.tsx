import { getPostsByUser } from "@/services/api";

export default async function UserPosts({ params }: any) {
  const res = await getPostsByUser(params.id);
  const posts = res.data;

  return (
    <div>
      <h1>User Posts</h1>
      {posts.map((post: any) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
        </div>
      ))}
    </div>
  );
}