// app/blogs/page.tsx
import Link from "next/link";
import { getAdminDB } from "@/lib/firebase-admin";
import { formatDate } from "@/lib/dateUtils";

export const revalidate = 60; // ISR - regenerate every 60s

interface Post {
  title: string;
  content: string;
  slug: string;
  createdAt: string;
  heartCount?: number;
}

function toISO(value: any): string {
  if (value?.toDate && typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }
  if (value?.seconds != null) {
    const ms = value.seconds * 1000 + Math.floor((value.nanoseconds ?? 0) / 1e6);
    return new Date(ms).toISOString();
  }
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value;
  return new Date(0).toISOString();
}

async function getPosts(): Promise<Post[]> {
  const db = getAdminDB();
  const snap = await db
    .collection("users")
    .doc("YB9ePSwGJ0MrccRxcSuymOOYDM92")
    .collection("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .get();

  return snap.docs.map((d) => {
    const x = d.data() as any;
    return {
      title: x.title,
      content: x.content ?? "",
      slug: x.slug,
      heartCount: x.heartCount ?? 0,
      createdAt: toISO(x.createdAt),
    };
  });
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
