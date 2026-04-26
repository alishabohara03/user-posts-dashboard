
"use client";

import { useState } from "react";
import { z } from "zod";
import { useStore } from "@/store/useStore";
import { Post } from "@/types";

const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title too long"),
  body: z.string().min(10, "Body must be at least 10 characters"),
});

interface PostFormProps {
  userId: number;
}

export default function PostForm({ userId }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const addLocalPost = useStore((s) => s.addLocalPost);

  const handleSubmit = () => {
    const result = postSchema.safeParse({ title, body });
    if (!result.success) {
      const fieldErrors: { title?: string; body?: string } = {};
      result.error.issues.forEach((e) => {
        const field = e.path[0] as "title" | "body";
        fieldErrors[field] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const newPost: Post = {
      id: Date.now(),
      userId,
      title: title.trim(),
      body: body.trim(),
    };

    // Store in Zustand + localStorage
    addLocalPost(newPost);
    const stored = JSON.parse(localStorage.getItem("localPosts") || "[]");
    localStorage.setItem("localPosts", JSON.stringify([newPost, ...stored]));

    setTitle("");
    setBody("");
    setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="post-form">
      <h2 className="form-title"> Add New Post</h2>

      <div className="form-group">
        <label htmlFor="post-title">Title</label>
        <input
          id="post-title"
          type="text"
          placeholder="Enter post title..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title)
              setErrors((prev) => ({ ...prev, title: undefined }));
          }}
          className={errors.title ? "input-error" : ""}
        />
        {errors.title && <span className="field-error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="post-body">Body</label>
        <textarea
          id="post-body"
          placeholder="Write your post content..."
          value={body}
          rows={4}
          onChange={(e) => {
            setBody(e.target.value);
            if (errors.body)
              setErrors((prev) => ({ ...prev, body: undefined }));
          }}
          className={errors.body ? "input-error" : ""}
        />
        {errors.body && <span className="field-error">{errors.body}</span>}
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Publish Post
      </button>

      {submitted && <p className="success-msg">✓ Post added successfully!</p>}
    </div>
  );
}
