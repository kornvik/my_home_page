// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { getAdminDB } from "@/lib/firebase-admin";

export const runtime = "nodejs"; // ensure Node runtime (Admin SDK isn't Edge)
export const dynamic = "force-dynamic"; // don't prerender API routes

export type Post = {
  title: string;
  content: string;
  slug: string;
  createdAt: string; // ISO string for easy JSON/SSR
  heartCount?: number;
};

// normalize Firestore timestamps to ISO, handling a few shapes
function toISO(value: any): string {
  // Firestore Admin Timestamp: has toDate()
  if (value?.toDate && typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }
  // Firestore client Timestamp-like: { seconds, nanoseconds }
  if (value?.seconds != null) {
    const ms =
      value.seconds * 1000 + Math.floor((value.nanoseconds ?? 0) / 1e6);
    return new Date(ms).toISOString();
  }
  // Already a Date
  if (value instanceof Date) return value.toISOString();
  // Already a string
  if (typeof value === "string") return value;
  // Fallback
  return new Date(0).toISOString();
}

export async function GET() {
  const db = getAdminDB();

  const snap = await db
    .collection("users")
    .doc("YB9ePSwGJ0MrccRxcSuymOOYDM92")
    .collection("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .get();

  const posts: Post[] = snap.docs.map((d) => {
    const x = d.data() as any;
    // console.log(x)
    return {
      title: x.title,
      content: x.content ?? "",
      slug: x.slug,
      heartCount: x.heartCount ?? 0,
      createdAt: toISO(x.createdAt),
    };
  });

  return NextResponse.json(posts);
}
