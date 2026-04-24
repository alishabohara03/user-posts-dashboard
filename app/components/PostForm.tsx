"use client";

import { useState } from "react";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    if (!title || !body) return alert("All fields required");

    const existing = JSON.parse(localStorage.getItem("posts") || "[]");

    localStorage.setItem(
      "posts",
      JSON.stringify([...existing, { title, body }])
    );

    setTitle("");
    setBody("");
  };

  return (
    <div className="border p-4 rounded mb-4">
      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Add Post
      </button>
    </div>
  );
}