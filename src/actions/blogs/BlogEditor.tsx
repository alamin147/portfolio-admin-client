import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image"], // Image URL support
    ["clean"],
  ],
};

export default function BlogEditor() {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!content.trim()) {
      setMessage("Please write some content before publishing.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/blog-editor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        setMessage("Blog published successfully!");
        setContent(""); // Clear the editor
      } else {
        setMessage("Failed to publish blog. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        placeholder="Write your blog..."
      />
      {message && (
        <div className={`mt-2 p-2 rounded ${
          message.includes("successfully")
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}>
          {message}
        </div>
      )}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`mt-4 px-4 py-2 rounded text-white ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSubmitting ? "Publishing..." : "Publish"}
      </button>
    </div>
  );
}
