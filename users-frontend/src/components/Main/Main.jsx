import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import blogTemplate from "../../assets/blog.jpg";

function Main() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // For local
        // const response = await axios.get("/api");
        const response = await axios.get(
          "https://blog-server-bpfu.onrender.com"
        );
        setArticles(response.data);
      } catch (error) {
        setError("Failed to fetch article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <main>
      <h1>Everything Coding</h1>
      <section className="cardsBox">
        {articles.map((article, index) => (
          <section key={index}>
            <img src={blogTemplate} alt="Blog Template" />
            <div>
              <h4>{article.title}</h4>
              <div className="cardText">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M160 368c26.5 0 48 21.5 48 48l0 16 72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6L448 368c8.8 0 16-7.2 16-16l0-288c0-8.8-7.2-16-16-16L64 48c-8.8 0-16 7.2-16 16l0 288c0 8.8 7.2 16 16 16l96 0zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3l0-21.3 0-6.4 0-.3 0-4 0-48-48 0-48 0c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L448 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-138.7 0L208 492z" />
                  </svg>{" "}
                  {article.comments.length}
                </span>
                <Link to={`/post/${article.id}`}>
                  <span>
                    Read{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </section>
        ))}
      </section>
    </main>
  );
}

export { Main };
