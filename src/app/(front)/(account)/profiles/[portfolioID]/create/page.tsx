"use client";

import { useState } from "react";
import { createPost } from "@/server/post";
export default function CreatePost() {
    const [feedback, setFeedback] = useState({ success: false, message: '' })
  
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {


    console.log(typeof formData.get('title'))
    console.log(typeof formData.get('content'))
    
    try {
      const result = await createPost(formData);
      if (result) {
        setFeedback(result)
      }
    } catch (err: any) {
      setError(err.message);
    }
   
        
  };

  return (
    <div className="m-auto w-[90%] max-w-2xl p-6">
      <h1 className="text-2xl font-bold">Create a New Blog Post</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form action={handleSubmit} className="mt-4">
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          className="mb-4 w-full rounded border p-2"
          required
        />
        <textarea
          name="content"
          placeholder="Write your post in Markdown..."
          className="h-40 w-full rounded border p-2"
          required
        />
        <button
          type="submit"
          className="mt-4 w-full rounded bg-blue-600 p-2 text-white"
        >
Send data

        </button>
        {feedback.message && (
              <div
                className={`ml-5 mt-4 w-full p-3 text-start ${
                  feedback.success ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {feedback.message}
              </div>
            )}
      </form>
    </div>
  );
}
