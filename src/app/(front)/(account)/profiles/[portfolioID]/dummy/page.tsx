import prisma from "@/lib/db";
import { findUserById } from "@/server/user";
import Link from "next/link";


export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  // findUserById(autho)

  return (
    <div className="m-auto w-[90%] max-w-3xl p-6">
      <h1 className="text-3xl font-bold">Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="mb-6 border-b pb-4">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-sm text-gray-500">By {post.authorId}</p>
            <div className="prose">
              {/* <ReactMarkdown>{post.content}</ReactMarkdown> */}
              <Link href={post.slug}>Link</Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
