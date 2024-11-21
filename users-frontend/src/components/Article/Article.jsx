import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Article() {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [error, setError] = useState(null);
  const [comment, setComment] = useState({ text: "", name: "" });
  const { id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // For local
        // const response = await axios.get(`/api/post/${id}`);
        const response = await axios.get(
          `https://blog-server-bpfu.onrender.com/post/${id}`
        );
        setArticle(response.data);
      } catch (error) {
        setError("Failed to fetch article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`/api/post/${id}/newComment`, {
        name: comment.name,
        content: comment.text,
      });

      if (response.status === 201 || response.status === 200) {
        const updatedArticle = await axios.get(`/api/post/${id}`);
        setArticle(updatedArticle.data);
        setComment((prev) => ({ name: "", text: "" }));
      }
    } catch (error) {
      console.error("Comment error: ", error);
      setError("Failed to add comment");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!article) return <p>Article not found</p>;

  return (
    <section className="article">
      <h1>{article.title}</h1>
      <section>
        <p>{article.content}</p>
      </section>
      <section className="comment">
        <h2>Comments</h2>
        <form onSubmit={handleCommentSubmit} className="commentBox">
          <input
            type="text"
            placeholder="Name"
            name="commentName"
            value={comment.name}
            onChange={(e) =>
              setComment((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Add comment..."
            name="commentText"
            value={comment.text}
            onChange={(e) =>
              setComment((prev) => ({ ...prev, text: e.target.value }))
            }
          />
          <button type="submit">Add</button>
        </form>
        {article.comments && article.comments.length > 0 ? (
          article.comments.map((comment, index) => {
            const responseDate = new Date(comment.createdAt);
            const formattedDate = responseDate.toLocaleDateString();
            const formattedTime = responseDate.toLocaleTimeString();
            return (
              <div key={index}>
                <h3>{comment.name}</h3>
                <span>{comment.content}</span>
                <span>
                  {formattedDate} {formattedTime}
                </span>
              </div>
            );
          })
        ) : (
          <p>No comments yet</p>
        )}
      </section>
    </section>
  );
}

export { Article };
