// app/api/posts/[slug]/route.ts
import { NextResponse } from "next/server";
import { getAdminDB } from "@/lib/firebase-admin";

export const runtime = "nodejs";
export const revalidate = 60;

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const db = getAdminDB();
  const snap = await db
    .collection("users")
    .doc("YB9ePSwGJ0MrccRxcSuymOOYDM92")
    .collection("posts")
    .where("published", "==", true)
    .where("slug", "==", decodeURIComponent(slug))
    .limit(1)
    .get();

  if (snap.empty) return new NextResponse("Not found", { status: 404 });

  const x = snap.docs[0].data() as any;
  const createdAt = x?.createdAt?.toDate?.()
    ? x.createdAt.toDate().toISOString()
    : x?.createdAt?.seconds
    ? new Date(x.createdAt.seconds * 1000).toISOString()
    : new Date(0).toISOString();

  return NextResponse.json({
    title: x.title,
    slug: x.slug,
    content: x.content ?? "",
    heartCount: x.heartCount ?? 0,
    createdAt,
  });
}
