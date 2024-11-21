import { useEffect, useState } from "react";
import axios from "axios";

function Published() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/api/post/published");
        setArticles(response.data);
      } catch (error) {
        setError("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleUnpublish = async (id) => {
    try {
      // For local
      // const response = await axios.post(`/api/admin/published/unpublish/${id}`);
      const response = await axios.post(
        `https://blog-server-bpfu.onrender.com/admin/published/unpublish/${id}`
      );
      if (response.status === 201 || response.status === 200) {
        setArticles((prev) => prev.filter((article) => article.id !== id));
      }
    } catch (error) {
      setError("Failed to unpublish post");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="postBox">
      {articles.map(
        (article) =>
          article.published && (
            <div key={article.id} className="post">
              <span>Title: {article.title}</span>
              <button onClick={() => handleUnpublish(article.id)}>
                Unpublish
              </button>
            </div>
          )
      )}
    </section>
  );
}

export { Published };
