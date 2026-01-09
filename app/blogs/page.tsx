// app/blogs/page.tsx
import Link from "next/link";
import type { Post } from "@/app/api/posts/route";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { formatDate } from "@/lib/dateUtils";

export const revalidate = 60; // (optional) cache the page too

async function getPosts(): Promise<Post[]> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/posts`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to load posts");
  return res.json();
}

export default async function Blogs() {
  const posts = await getPosts();

  const getWordInfo = (content: string) => {
    const wordCount = content.trim().split(/\s+/g).length;
    const minutesToRead = Math.max(1, Math.round(wordCount / 100));
    return `${wordCount} words. ${minutesToRead} min read`;
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center bg-gray-200 z-20 text-gray-800">
      <div className="w-full flex flex-col items-start bg-gray-200">
        <h2 className="font-bold text-4xl px-5 md:px-44 pt-12 font-mono">
          Blogs
        </h2>
        <p className="text-gray-500 text-base px-5 md:px-44 pt-3 font-mono pb-5">
          Last Update : {posts[0] ? formatDate(posts[0].createdAt) : "—"}
        </p>
      </div>

      <div className="w-full px-5 bg-gray-200">
        <div className="w-full flex flex-col items-start" id="lowpad">
          {posts.map((post) => (
            <div
              key={post.title}
              className="px-5 p-5 border-4 w-5/6 bg-gray-50 rounded-lg border-gray-300 mb-5"
            >
              <Link href={`/blogs/${encodeURIComponent(post.slug)}`}>
                <p className="text-2xl font-bold text-left">{post.title}</p>
                <p className="pt-1 text-left">{formatDate(post.createdAt)}</p>
                <p className="pt-5 text-left">{getWordInfo(post.content)}</p>
                <p className="text-right">💗 {post.heartCount ?? 0} Hearts</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="relative botton-0 left-0 z-50 pb-0 -mb-1 -mt-1 bg-gray-50">
        {/* svg */}
      </div>
    </div>
  );
}
