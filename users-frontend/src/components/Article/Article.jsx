import { useParams } from "react-router-dom";
import { content } from "../Main/content";

function Article() {
  const { id } = useParams();
  const article = content[id - 1];

  return (
    <section className="article">
      <h1>{article.header}</h1>
      <section>
        {article.text.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>
      <section className="comment">
        <h2>Comments</h2>
        <form action="" className="commentBox">
          <input type="text" placeholder="Name" name="commentName" />
          <input type="text" placeholder="Add comment..." name="commentText" />
          <button>Add</button>
        </form>
        {article.comments.map((comment, index) => (
          <div key={index}>
            <h3>{comment.user}</h3>
            <span>{comment.comment}</span>
            <span>{comment.date}</span>
          </div>
        ))}
      </section>
    </section>
  );
}

export { Article };
