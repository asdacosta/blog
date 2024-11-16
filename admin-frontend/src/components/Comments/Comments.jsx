import { useEffect, useState } from "react";
import axios from "axios";

function Comments() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/api");
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
      const response = await axios.delete(`/api/post/comments/${id}`);
      if (response.status === 201 || response.status === 200) {
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
      setError("Failed to unpublish post");
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
