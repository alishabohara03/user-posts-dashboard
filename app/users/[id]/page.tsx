import { getPostsByUser } from "@/services/api";

export default async function UserPosts({ params }: any) {
  try {
    const res = await getPostsByUser(params.id);
    const posts = res.data;

    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">User Posts</h1>

        <div className="grid gap-4">
          {posts.map((post: any) => (
            <div key={post.id} className="border p-4 rounded">
              <h2 className="font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-6">
        <p>Something went wrong while loading posts.</p>
      </div>
    );
  }
}
