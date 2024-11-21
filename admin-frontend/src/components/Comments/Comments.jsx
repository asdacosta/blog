import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Comments() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // const response = await axios.get("/api");
        const response = await axios.get(
          "https://blog-server-bpfu.onrender.com"
        );
        setArticles(response.data);
      } catch (error) {
        setError("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (articleId, commentId) => {
    try {
      // For local
      // const response = await axios.delete(
      //   `/api/admin/comments/${articleId}/${commentId}`
      // );
      const response = await axios.delete(
        `https://blog-server-bpfu.onrender.com/admin/comments/${articleId}/${commentId}`
      );
      if (response.status === 200 || response.status === 204) {
        setArticles((prevArticles) =>
          prevArticles.map((article) =>
            article.id === articleId
              ? {
                  ...article,
                  comments: article.comments.filter(
                    (comment) => comment.id !== commentId
                  ),
                }
              : article
          )
        );
      }
    } catch (error) {
      setError("Failed to delete comment");
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      {articles.map((article) => (
        <div key={article.id} className="postBox">
          <span>Title: {article.title}</span>
          {article.comments.length > 0 ? (
            article.comments.map((comment) => (
              <div key={comment.id} className="post">
                <span>Username: {comment.name}</span>
                <span>Comment: {comment.content}</span>
                <button onClick={() => handleDelete(article.id, comment.id)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <span>No Comments</span>
          )}
        </div>
      ))}
    </section>
  );
}

export { Comments };
