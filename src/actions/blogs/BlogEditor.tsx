import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { toast } from "react-toastify";


// 👇 Custom image handler: prompts for image URL and inserts it
function imageHandler(this: any) {
  const url = prompt("Enter image URL:");
  if (url) {
    const range = this.quill.getSelection();
    this.quill.insertEmbed(range.index, "image", url, "user");
  }
}

// 👇 Modules with full toolbar + custom image handler
const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
    handlers: {
      image: imageHandler, // 👈 Add custom image URL support
    },
  },
};

// 👇 Supported formats
const formats = [
  "header", "font", "size",
  "bold", "italic", "underline", "strike",
  "color", "background",
  "script",
  "list", "bullet",
  "align",
  "blockquote", "code-block",
  "link", "image",
];

export default function BlogEditor() {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("Please write some content before publishing!");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/blog-editor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        toast.success("Blog published successfully!");
        setContent(""); // Clear the editor after successful submission
      } else {
        toast.error("Failed to publish blog. Please try again.");
      }
    } catch (error) {
      console.error("Error publishing blog:", error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-full mx-auto p-4">
      <h1 className="bg-slate-400 text-center py-12 text-3xl font-bold mb-6">
        Blog Editor
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div style={{ minHeight: "400px" }}>
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            theme="snow"
            placeholder="Write your awesome blog here..."
            style={{ height: "350px", marginBottom: "50px" }}
          />
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => setContent("")}
            disabled={isSubmitting}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Clear
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !content.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
