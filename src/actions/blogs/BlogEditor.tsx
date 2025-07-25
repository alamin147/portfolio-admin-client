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

  // Blog fields state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [shortDes, setShortDes] = useState("");
  const [readTime, setReadTime] = useState("");

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("Please write some content before publishing!");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a title!");
      return;
    }

    if (!category.trim()) {
      toast.error("Please enter a category!");
      return;
    }

    const blogData = {
      title,
      category,
      imgUrl,
      shortDes,
      content,
      readTime,
      time: new Date()
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/blog-editor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        toast.success("Blog published successfully!");
        // Clear all fields after successful submission
        setContent("");
        setTitle("");
        setCategory("");
        setImgUrl("");
        setReadTime("");
        setShortDes("");
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
        {/* Blog Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter blog title"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Category *
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter blog category"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Read time *
            </label>
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter blog readtime (e.g., 5)"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Image URL
            </label>
            <input
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter image URL"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Short Description
            </label>
            <input
              type="text"
              value={shortDes}
              onChange={(e) => setShortDes(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter short description"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Content *
          </label>
        </div>

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
            onClick={() => {
              setContent("");
              setTitle("");
              setCategory("");
              setImgUrl("");
              setShortDes("");
                setReadTime("");
            }}
            disabled={isSubmitting}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Clear
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !content.trim() || !title.trim() || !category.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
