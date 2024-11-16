import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PostForm() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePost = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/admin/post/1", {
        title: formData.title,
        content: formData.content,
        authorId: 1,
      });
      if (response.status === 201 || response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      setError("Failed to create post.");
      console.error(error);
    }
  };

  return (
    <section className="form">
      <form onSubmit={handlePost}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Message</label>
          <input
            type="text"
            name="content"
            id="content"
            value={formData.content}
            onChange={handleInputChange}
            required
          />
        </div>
        <button>Post</button>
      </form>
    </section>
  );
}

export { PostForm };
