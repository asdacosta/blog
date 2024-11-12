import { useParams } from "react-router-dom";
import { content } from "../Main/content";
import { useEffect, useState } from "react";
import axios from "axios";

function Article() {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`/api/post/${id}`);
        setArticle(response.data);
        console.log("Here's it: ", response.data);
      } catch (error) {
        setError("Failed to fetch article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [id]);

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
        <form action="" className="commentBox">
          <input type="text" placeholder="Name" name="commentName" />
          <input type="text" placeholder="Add comment..." name="commentText" />
          <button>Add</button>
        </form>
        {article.comments.map((comment, index) => {
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
        })}
      </section>
    </section>
  );
}

export { Article };
