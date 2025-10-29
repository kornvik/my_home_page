"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { formatDate } from "@/lib/dateUtils";
import "github-markdown-css/github-markdown-light.css";


interface Post {
  title: string;
  slug: string;
  content: string;
  heartCount: number;
  createdAt: string;
}

const Post = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const [html, setHtml] = useState<string>("");
  const [error, setError] = useState<string>("");
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    console.log('fetching')
    console.log(slug);
    if (!slug) return;

    (async () => {
      try {
        const res = await fetch(`/api/posts/${encodeURIComponent(slug)}`);

        if (!res.ok) {
          if (res.status === 404) {
            setError("Post not found");
          } else {
            setError("Failed to load post");
          }
          setPost(null);
          setHtml("");
          return;
        }

        const p: Post = await res.json();
        setPost(p);

        // render + sanitize markdown
        if (p?.content) {
          console.log("Original markdown:", p.content); // Check markdown
          const dirty = marked.parse(p.content);
          const rendered = typeof dirty === "string" ? dirty : await dirty;
          setHtml(DOMPurify.sanitize(rendered));
        } else {
          setHtml("");
        }
      } catch (e) {
        console.error(e);
        setError("An error occurred");
        setPost(null);
        setHtml("");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);


  return (
    <div className="w-full h-full flex flex-col justify-start items-center bg-gray-200 z-20 text-gray-800">
      <div className="w-full flex flex-col items-start bg-gray-200">
        <h2 className="font-bold text-4xl px-5 md:px-44 pt-12 font-mono">
          Blogs
        </h2>
        <p className="text-gray-500 text-base px-5 md:px-44 pt-3 font-mono pb-5">
          {post ? `Posted: ${formatDate(post.createdAt)}` : "Loading..."}
        </p>
      </div>

      {loading ? (
        <div className="w-full bg-gray-200">
          <img src="/assets/spinner2.gif" alt="loading" className="mx-auto" />
        </div>
      ) : error ? (
        <div className="w-full bg-gray-200 px-5">
          <div className="mx-5 mt-5 rounded-lg border-gray-300 border-4 bg-gray-100 py-5 px-5 text-center mb-10">
            <p className="text-xl text-red-600">{error}</p>
          </div>
        </div>
      ) : post ? (
        <article className="w-full px-5 bg-gray-200">
          <div className="mx-5 mt-5 rounded-lg border-gray-300 border-4 bg-gray-100 py-5 px-5 text-left mb-10">
            <h1 className="font-bold 2xl:text-6xl lg:text-4xl md:text-3xl text-xl mb-4">
              {post.title}
            </h1>
            <div className="text-left lg:text-xl md:text-lg text-base mb-6">
              <time>{formatDate(post.createdAt)}</time>
              <span className="pl-5">💗 {post.heartCount} Hearts</span>
            </div>
            <div
              className="markdown-body mt-8"
              style={{ backgroundColor: "transparent" }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </article>
      ) : null}
    </div>
  );
};

export default Post;
